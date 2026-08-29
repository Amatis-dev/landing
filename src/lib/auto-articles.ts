import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import Parser from "rss-parser";
import { put } from "@vercel/blob";
import prisma from "@/lib/db";

// Daily auto-posting pipeline for amatisberry.ir.
//
// This is a port of the figureforge (3dshop) no-API-key article module:
//   * discovery    -> curated RSS feeds (no key)
//   * scrape       -> fetch article html, extract headings/paragraphs/lists
//   * translation  -> free Google translate endpoint (no key)
//   * cover        -> download og:image, fall back to an inline SVG title cover
//   * persist      -> inserts fa/en/de/ar rows sharing a groupId
//
// Local model adapted from the landing schema: one flat BlogPost row per
// locale, content stored as HTML, siblings grouped by groupId.

const UA = "AmatisAutoBot/1.0 (+https://amatisberry.ir)";
const MAX_BODY_CHARS = 7000;
const MAX_ARTICLES_PER_RUN = 2;
const LOCALES = ["fa", "en", "de", "ar"] as const;
type Locale = (typeof LOCALES)[number];

const parser: Parser = new Parser({
  timeout: 15000,
  headers: { "User-Agent": UA },
});

// ---------- Source feeds (business / marketing / SEO / web) ----------

const FEEDS: { url: string; name: string; topic: string }[] = [
  { url: "https://blog.hubspot.com/rss.xml", name: "HubSpot Blog", topic: "marketing" },
  { url: "https://www.searchenginejournal.com/feed/", name: "Search Engine Journal", topic: "seo" },
  { url: "https://moz.com/blog/feed", name: "Moz Blog", topic: "seo" },
  { url: "https://neilpatel.com/feed/", name: "Neil Patel", topic: "marketing" },
  { url: "https://www.smartinsights.com/feed/", name: "Smart Insights", topic: "marketing" },
  { url: "https://www.smashingmagazine.com/feed/", name: "Smashing Magazine", topic: "web" },
  { url: "https://css-tricks.com/feed/", name: "CSS-Tricks", topic: "web" },
  { url: "https://smallbiztrends.com/feed", name: "Small Business Trends", topic: "business" },
];

// Per-locale display tags for each topic.
const TOPIC_TAGS: Record<string, Record<Locale, string>> = {
  seo: { en: "SEO", fa: "سئو", de: "SEO", ar: "سيو" },
  marketing: { en: "Marketing", fa: "بازاریابی", de: "Marketing", ar: "تسويق" },
  web: { en: "Web Development", fa: "توسعه وب", de: "Webentwicklung", ar: "تطوير الويب" },
  business: { en: "Business", fa: "کسب‌وکار", de: "Business", ar: "الأعمال" },
};

function normalizeTopic(topic?: string): string {
  return TOPIC_TAGS[topic || ""] ? topic! : "business";
}

type Candidate = {
  url: string;
  title?: string;
  snippet?: string;
  image?: string;
  sourceName?: string;
  topic: string;
};

async function discover(): Promise<Candidate[]> {
  const candidates: Candidate[] = [];
  for (const feed of FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      for (const item of parsed.items.slice(0, 4)) {
        if (!item.title || !item.link) continue;
        const image =
          item.enclosure?.url ||
          item.content?.match(/<img[^>]+src="([^"]+)"/)?.[1] ||
          undefined;
        candidates.push({
          url: item.link,
          title: item.title,
          snippet: item.contentSnippet?.slice(0, 400),
          image,
          sourceName: parsed.title || feed.name,
          topic: feed.topic,
        });
      }
    } catch {
      // feed failed — keep going with the others
    }
  }
  return candidates;
}

// ---------- Scraping ----------

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;|&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "…")
    .replace(/&middot;/g, "·")
    .replace(/&times;/g, "×")
    .replace(/&minus;/g, "−")
    .replace(/&nbsp;/g, " ")
    .replace(/&#\d+;/g, (m) => {
      const code = parseInt(m.slice(2, -1), 10);
      return String.fromCharCode(code);
    });
}

function absUrl(href: string, base: string): string {
  if (!href) return "";
  if (href.startsWith("data:")) return href;
  try {
    return new URL(href, base).href;
  } catch {
    return href;
  }
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

// Converts a small inline HTML snippet into a markdown-ish string, keeping
// links and bold so they survive translation and can be re-rendered to HTML.
function inlineToMarkdown(html: string, baseUrl: string): string {
  let text = html;
  text = text.replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, inner) => {
    const url = absUrl(href, baseUrl);
    const content = stripTags(decodeEntities(inner)).trim();
    return content ? `[${content}](${url})` : "";
  });
  text = text.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, _tag, inner) => {
    return `**${stripTags(decodeEntities(inner)).trim()}**`;
  });
  text = stripTags(text);
  text = decodeEntities(text);
  text = text.replace(/\s+/g, " ").trim();
  return text;
}

type Block =
  | { kind: "h2" | "h3" | "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "blockquote"; text: string };

function extractBlocks(html: string, baseUrl: string): Block[] {
  let cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<aside[\s\S]*?<\/aside>/gi, "")
    .replace(/<form[\s\S]*?<\/form>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  const articleMatch = cleaned.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) cleaned = articleMatch[1];
  else {
    const mainMatch = cleaned.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
    if (mainMatch) cleaned = mainMatch[1];
  }

  const blocks: Block[] = [];
  const seen = new Set<string>();

  cleaned.replace(/<h([23])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_m, level, inner) => {
    const text = inlineToMarkdown(inner, baseUrl);
    if (text && !seen.has(text)) {
      seen.add(text);
      blocks.push({ kind: level === "2" ? "h2" : "h3", text });
    }
    return "";
  });

  cleaned.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (_m, inner) => {
    const text = stripTags(decodeEntities(inner)).replace(/\s+/g, " ").trim();
    if (text && !seen.has(text)) {
      seen.add(text);
      blocks.push({ kind: "blockquote", text });
    }
    return "";
  });

  cleaned.replace(/<(ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_m, _type, listContent) => {
    const items: string[] = [];
    listContent.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_lm: string, liInner: string) => {
      const text = inlineToMarkdown(liInner, baseUrl);
      if (text && !seen.has(text)) {
        seen.add(text);
        items.push(text);
      }
      return "";
    });
    if (items.length > 0) blocks.push({ kind: "list", items });
    return "";
  });

  cleaned.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_m, inner) => {
    const text = inlineToMarkdown(inner, baseUrl);
    if (text && text.length > 20 && !seen.has(text)) {
      seen.add(text);
      blocks.push({ kind: "p", text });
    }
    return "";
  });

  return blocks;
}

function extractMeta(html: string): {
  title: string | null;
  image: string | null;
  siteName: string | null;
  description: string | null;
} {
  const getMeta = (prop: string): string | null => {
    const regex = new RegExp(`<meta[^>]*(?:property|name)=["']${prop}["'][^>]*content=["']([^"']*)["']`, "i");
    const match = html.match(regex);
    if (match?.[1]) return decodeEntities(match[1]).trim();
    const regex2 = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*(?:property|name)=["']${prop}["']`, "i");
    const match2 = html.match(regex2);
    return match2?.[1] ? decodeEntities(match2[1]).trim() : null;
  };
  return {
    title: getMeta("og:title") || getMeta("twitter:title"),
    image: getMeta("og:image") || getMeta("twitter:image"),
    siteName: getMeta("og:site_name"),
    description: getMeta("og:description") || getMeta("description"),
  };
}

function removeCoverImage(markdown: string, imageUrl: string | null): string {
  if (!imageUrl) return markdown;
  const norm = (url: string) => {
    try {
      const u = new URL(url);
      return `${u.hostname.replace(/^www\./, "")}${u.pathname.replace(/\/+$/, "")}`.toLowerCase();
    } catch {
      return url.toLowerCase();
    }
  };
  const coverNorm = norm(imageUrl);
  const cleaned = markdown
    .split("\n")
    .filter((line) => {
      const m = line.trim().match(/^!\[[^\]]*\]\(([^)\s]+)\)$/);
      return !(m && norm(m[1]) === coverNorm);
    })
    .join("\n");
  return cleaned.replace(/\n{3,}/g, "\n\n").trim();
}

async function scrape(url: string): Promise<{
  title: string;
  siteName: string | null;
  image: string | null;
  description: string | null;
  blocks: Block[];
} | null> {
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return null;

    const html = await res.text();
    const meta = extractMeta(html);
    const blocks = extractBlocks(html, url);
    const image = meta.image ? absUrl(meta.image, url) : null;

    return {
      title:
        meta.title ||
        stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "") ||
        "Untitled",
      siteName: meta.siteName || (() => { try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return "Web"; } })(),
      image,
      description: meta.description?.slice(0, 500) || null,
      blocks,
    };
  } catch {
    return null;
  }
}

// ---------- No-key translation (Google free endpoint) ----------

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function gtxUrl(text: string, target: string): string {
  return `https://translate.googleapis.com/translate_a/single?client=chrome-ex&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(text.slice(0, 4500))}`;
}

async function gtxTranslate(text: string, target: string): Promise<string | null> {
  if (!text.trim()) return text;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await fetch(gtxUrl(text, target), {
        headers: { "User-Agent": UA },
        signal: AbortSignal.timeout(20000),
      });
      if (res.status === 429) {
        await sleep(3000 * (attempt + 1));
        continue;
      }
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.[0])) {
          const out = data[0]
            .map((s: unknown) => (Array.isArray(s) ? String(s[0] ?? "") : ""))
            .join("");
          if (out) return out;
        }
      }
    } catch {
      // fall through, retry
    }
    await sleep(1000 * (attempt + 1));
  }
  return null;
}

async function translateChunked(text: string, target: string): Promise<string | null> {
  if (!text.trim()) return text;
  const chunks: string[] = [];
  if (text.length < 4000) {
    chunks.push(text);
  } else {
    const paragraphs = text.split(/\n\n+/);
    let current = "";
    for (const p of paragraphs) {
      if (current.length + p.length + 2 > 3800) {
        if (current) chunks.push(current);
        current = p;
      } else {
        current = current ? `${current}\n\n${p}` : p;
      }
    }
    if (current) chunks.push(current);
  }
  const results: string[] = [];
  for (let i = 0; i < chunks.length; i++) {
    if (i > 0) await sleep(500);
    const result = await gtxTranslate(chunks[i], target);
    if (!result) return null;
    results.push(result);
  }
  return results.join("\n\n");
}

// ---------- Rendering (landing stores HTML content) ----------

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Re-render the markdown-ish inline text (from translation) back to HTML,
// supporting **bold** and [text](url) links, then HTML-escape the rest.
function inlineToHtml(md: string): string {
  let out = esc(md.replace(/\*\*(.+?)\*\*/g, "**$1**"));
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(
    /\[([^\]]*)\]\(([^)\s]+)\)/g,
    (_, label: string, href: string) => `<a href="${esc(href)}">${esc(label)}</a>`,
  );
  return out;
}

function blocksToHtml(blocks: Block[]): string {
  const html: string[] = [];
  for (const b of blocks) {
    if (b.kind === "h2") html.push(`<h2>${inlineToHtml(b.text)}</h2>`);
    else if (b.kind === "h3") html.push(`<h3>${inlineToHtml(b.text)}</h3>`);
    else if (b.kind === "blockquote") html.push(`<blockquote>${inlineToHtml(b.text)}</blockquote>`);
    else if (b.kind === "list")
      html.push(`<ul>${b.items.map((item) => `<li>${inlineToHtml(item)}</li>`).join("")}</ul>`);
    else html.push(`<p>${inlineToHtml(b.text)}</p>`);
  }
  return html.join("\n");
}

// ---------- Cover image ----------

// Probes the extension from the download. We keep the original bytes and store
// the cover in Vercel Blob (persistent on serverless); when no Blob token is
// present (local runs) we fall back to writing under public/.
async function persistCover(buffer: Buffer, ext: string, base: string): Promise<string | null> {
  const filename = `auto-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  const pathname = `covers/${filename}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(pathname, buffer, { access: "public", addRandomSuffix: false });
    return blob.url;
  }

  const dir = path.join(process.cwd(), "public", "assets", "images");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  return `/assets/images/${filename}`;
}

async function downloadCover(imageUrl: string, base: string): Promise<string | null> {
  if (!imageUrl) return null;
  try {
    const res = await fetch(imageUrl, { headers: { "User-Agent": UA } });
    if (!res.ok) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 1000 || buffer.length > 8 * 1024 * 1024) return null;
    const ct = res.headers.get("content-type") || "";
    const ext = ct.includes("png") ? "png" : ct.includes("webp") ? "webp" : ct.includes("gif") ? "gif" : "jpg";
    return await persistCover(buffer, ext, base);
  } catch {
    return null;
  }
}

function wrapTitle(title: string, maxLen: number): string[] {
  const words = title.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxLen) {
      if (line) lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines.slice(0, 4);
}

function buildCoverSvg(title: string, tag: string): string {
  const lines = wrapTitle(title, 34);
  const fontSize = lines.length > 2 ? 52 : 72;
  const titleY = lines.length > 2 ? 430 : 460;
  const gap = fontSize + 20;
  const titleBlocks = lines
    .map((l, i) => `<text x="800" y="${titleY + i * gap}" text-anchor="middle" font-size="${fontSize}" font-weight="900" fill="#ffffff" font-family="Vazirmatn, Inter, 'Segoe UI', sans-serif">${esc(l)}</text>`)
    .join("\n    ");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="850" viewBox="0 0 1600 850">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6c5ce7"/>
      <stop offset="1" stop-color="#2d3436"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.4" r="0.6">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="850" fill="url(#bg)"/>
  <rect width="1600" height="850" fill="url(#glow)"/>
  <circle cx="1350" cy="180" r="140" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="3"/>
  <circle cx="200" cy="680" r="180" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="3"/>
  <text x="800" y="220" text-anchor="middle" font-size="36" font-weight="700" fill="#ffffff" fill-opacity="0.85" font-family="Inter, 'Segoe UI', sans-serif" letter-spacing="4">${esc(tag.toUpperCase())}</text>
  ${titleBlocks}
  <text x="800" y="760" text-anchor="middle" font-size="30" fill="#ffffff" fill-opacity="0.55" font-family="Inter, 'Segoe UI', sans-serif" letter-spacing="2" style="direction:ltr">A M A T I S &nbsp;·&nbsp; B L O G</text>
</svg>`;
}

async function makeCover(imageUrl: string | undefined, base: string, title: string, tag: string): Promise<string | null> {
  const stem = base.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").slice(0, 60) || "article";
  const downloaded = imageUrl ? await downloadCover(imageUrl, base) : null;
  if (downloaded) return downloaded;
  return await persistCover(
    Buffer.from(buildCoverSvg(decodeEntities(title), tag)),
    "svg",
    `${stem}-cover.svg`,
  );
}

// ---------- Helpers ----------

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

function djb2(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
}

function readingMinutes(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 190));
}

function validateTranslation(text: string | null | undefined, locale: "fa" | "de" | "ar"): boolean {
  if (!text || !text.trim()) return false;
  const letters = text.match(/[A-Za-z\u00C0-\u024F\u0400-\u04FF\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/g);
  if (!letters || letters.length === 0) return false;
  if (locale === "fa" || locale === "ar") {
    const rtl = letters.filter((c) => /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(c)).length;
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    return wordCount <= 12 ? letters.some((c) => /[\u0600-\u06FF]/.test(c)) : rtl / letters.length >= 0.45;
  }
  // German: reject content that came back as Cyrillic (Google glitch).
  return !/[\u0400-\u04FF]/.test(text);
}

// ---------- Main pipeline ----------

export type AutoArticleResult = {
  slug: string;
  title: string;
  status: "imported" | "skipped" | "failed";
  error?: string;
};

type TranslatedLocale = { title: string; body: string; excerpt: string };

function firstParagraphText(blocks: Block[]): string {
  for (const b of blocks) {
    if (b.kind === "p" && b.text.length > 40) return b.text;
  }
  return "";
}

// Excerpts are plain-text fields rendered with their text escaped, so strip any
// markdown-ish markup (links/bold) that survived scraping or translation.
function cleanExcerpt(text: string): string {
  return text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 300);
}

async function insertArticle(meta: {
  title: string;
  description: string | null;
  url: string;
  topic: string;
  cover: string | null;
  groupId: string;
  readMinutes: number;
  blocks: Block[];
  translated: Partial<Record<"fa" | "de" | "ar", TranslatedLocale>>;
}): Promise<void> {
  const tag = TOPIC_TAGS[meta.topic] || TOPIC_TAGS.business;
  const baseHtml = blocksToHtml(meta.blocks);
  const sourceName = (() => { try { return new URL(meta.url).hostname.replace(/^www\./, ""); } catch { return "Web"; } })();
  const enExcerpt =
    cleanExcerpt(meta.description?.slice(0, 300) || firstParagraphText(meta.blocks)) || meta.title;

  for (const locale of LOCALES) {
    const isEn = locale === "en";
    const tr = meta.translated[locale as "fa" | "de" | "ar"];

    const title = isEn ? meta.title : tr!.title;
    const excerpt = isEn ? enExcerpt : tr!.excerpt || enExcerpt;
    const bodyHtml = isEn
      ? baseHtml
      : `${tr!.body}<hr/><p><em>${sourceRefText(meta.url, sourceName, locale)}</em></p>`;

    await prisma.blogPost.create({
      data: {
        slug: `${meta.groupId}-${locale}`,
        title,
        excerpt,
        content: bodyHtml,
        coverImage: meta.cover,
        tag: (tag as Record<Locale, string>)[locale],
        lang: locale,
        readMinutes: meta.readMinutes,
        published: true,
        publishedAt: new Date(),
        groupId: meta.groupId,
      },
    });
  }
}

function sourceRefText(url: string, siteName: string, locale: Locale): string {
  const label = locale === "fa" ? "منبع" : locale === "ar" ? "المصدر" : locale === "de" ? "Quelle" : "Source";
  const article = locale === "fa" ? "مقاله اصلی" : locale === "ar" ? "المقال الأصلي" : locale === "de" ? "Originalartikel" : "Original Article";
  return `${label}: <a href="${esc(url)}">${esc(siteName)} — ${article}</a>`;
}

export async function importAutoArticle(candidate: Candidate): Promise<AutoArticleResult> {
  const topic = normalizeTopic(candidate.topic);
  const groupId = `auto-${slugify(candidate.title || "article")}-${djb2(candidate.url)}`;

  const existingGroup = await prisma.blogPost.findFirst({
    where: { groupId, published: true },
    select: { id: true },
  });
  if (existingGroup) return { slug: groupId, title: candidate.title || groupId, status: "skipped" };

  const scraped = await scrape(candidate.url);
  if (!scraped || scraped.blocks.length === 0) {
    return { slug: groupId, title: candidate.title || groupId, status: "failed", error: "scrape_failed" };
  }

  const cover = await makeCover(scraped.image || candidate.image, candidate.url.slice(-8), scraped.title, TOPIC_TAGS[topic].en);

  const enText = blocksToHtml(scraped.blocks).replace(/<[^>]+>/g, "").trim();
  const readingTime = readingMinutes(blocksToHtml(scraped.blocks));
  const enFirstPara = firstParagraphText(scraped.blocks) || enText.slice(0, 300);

  const translated: Partial<Record<"fa" | "de" | "ar", TranslatedLocale>> = {};
  for (const locale of ["fa", "de", "ar"] as const) {
    const title = await gtxTranslate(scraped.title, locale);
    if (!title) return { slug: groupId, title: scraped.title, status: "failed", error: "translation_failed" };
    const body = await translateChunked(enText, locale);
    if (!body) return { slug: groupId, title: scraped.title, status: "failed", error: "translation_failed" };
    const excerpt = await gtxTranslate(enFirstPara.slice(0, 300), locale);

    if (!validateTranslation(title, locale) || !validateTranslation(body, locale)) {
      return { slug: groupId, title: scraped.title, status: "failed", error: "translation_failed" };
    }

    translated[locale] = {
      title,
      body: body.split(/\n\n+/).map((p) => `<p>${inlineToHtml(p)}</p>`).join("\n"),
      excerpt: cleanExcerpt(excerpt && validateTranslation(excerpt, locale) ? excerpt : title),
    };
  }

  await insertArticle({
    title: scraped.title,
    description: scraped.description,
    url: candidate.url,
    topic,
    cover,
    groupId,
    readMinutes: readingTime,
    blocks: scraped.blocks,
    translated,
  });

  return { slug: groupId, title: scraped.title, status: "imported" };
}

export async function importAutoArticles(max = MAX_ARTICLES_PER_RUN): Promise<AutoArticleResult[]> {
  const candidates = await discover();
  const results: AutoArticleResult[] = [];
  for (const candidate of candidates) {
    if (results.filter((r) => r.status === "imported").length >= max) break;
    try {
      results.push(await importAutoArticle(candidate));
    } catch (err) {
      console.error("[auto-articles] import failed", candidate.url, err);
      results.push({ slug: "?", title: candidate.title || "?", status: "failed", error: "error" });
    }
  }
  return results;
}

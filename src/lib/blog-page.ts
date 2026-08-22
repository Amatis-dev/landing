import type { BlogPost } from "@prisma/client";

type PublicPost = Pick<
  BlogPost,
  "slug" | "title" | "excerpt" | "content" | "coverImage" | "tag" | "lang" | "readMinutes" | "publishedAt"
>;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function formatPostDate(date: Date, lang: string): string {
  const locale = lang === "fa" ? "fa-IR-u-ca-persian" : lang === "ar" ? "ar" : lang === "de" ? "de-DE" : "en-GB";
  try {
    return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" }).format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

const POST_STYLES = `
  <style>
    .post-wrap{max-width:780px;margin:0 auto;}
    .post-crumb{display:flex;gap:.5rem;align-items:center;font-size:.85rem;opacity:.75;margin-bottom:1.2rem;flex-wrap:wrap;}
    .post-crumb a{color:inherit;text-decoration:none;}
    .post-crumb a:hover{text-decoration:underline;}
    .post-title{font-size:clamp(1.8rem,4vw,2.6rem);line-height:1.25;margin:.9rem 0 1rem;font-weight:900;}
    .post-meta{display:flex;gap:.9rem;align-items:center;font-size:.88rem;opacity:.8;flex-wrap:wrap;}
    .post-tag-pill{display:inline-flex;padding:.28rem .85rem;border-radius:999px;font-size:.78rem;font-weight:800;background:var(--accent,#6c5ce7);color:#fff;}
    .post-cover{width:100%;border-radius:18px;margin:2rem 0;display:block;aspect-ratio:16/8.5;object-fit:cover;}
    .post-body{font-size:1.02rem;line-height:1.95;opacity:.92;}
    .post-body h2{font-size:1.45rem;font-weight:900;margin:2.2rem 0 .8rem;line-height:1.4;}
    .post-body h3{font-size:1.15rem;font-weight:800;margin:1.6rem 0 .6rem;}
    .post-body p{margin:0 0 1.05rem;}
    .post-body ul,.post-body ol{margin:0 0 1.2rem;padding-inline-start:1.4rem;display:grid;gap:.45rem;}
    .post-body li::marker{color:var(--accent,#6c5ce7);font-weight:800;}
    .post-body a{color:var(--accent,#8b7cf7);}
    .post-cta{margin-top:3rem;padding:2rem;border-radius:18px;text-align:center;background:linear-gradient(135deg,rgba(108,92,231,.16),rgba(108,92,231,.05));border:1px solid rgba(108,92,231,.25);}
    .post-cta h3{font-size:1.3rem;font-weight:900;margin-bottom:.6rem;}
    .post-cta p{opacity:.8;margin-bottom:1.2rem;}
    .btn-pill{display:inline-block;padding:.85rem 1.9rem;border-radius:999px;font-weight:800;color:#fff!important;background:var(--accent,#6c5ce7);text-decoration:none;}
  </style>`;

const NAV = `
  <a class="nav-pill" href="/">Home</a>
  <a class="nav-pill" href="/showcase.html">Showcase</a>
  <a class="nav-pill active" href="/blogs.html">Blogs</a>
  <a class="nav-pill" href="/pricing.html">Plans &amp; Prices</a>
  <a class="nav-pill" href="/connect-with-us.html">Connect With Us</a>`;

const FOOTER = `
  <footer class="site-footer">
    <div class="container-page">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="brand" href="/"><span class="brand-mark">A</span><span class="brand-word">Amatis</span></a>
          <p>Amatis is a business consultancy agency helping companies grow with strategy, marketing and technology.</p>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="/what-we-offer.html">What We Offer</a></li>
            <li><a href="/showcase.html">Showcase</a></li>
            <li><a href="/blogs.html">Blogs</a></li>
            <li><a href="/connect-with-us.html">Connect With Us</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:info@amatisberry.ir">info@amatisberry.ir</a></li>
            <li><a href="/connect-with-us.html">Send a Message</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} Amatis. All rights reserved.</span></div>
    </div>
  </footer>`;

export function renderPostPage(post: PublicPost): string {
  const dir = post.lang === "fa" || post.lang === "ar" ? "rtl" : "ltr";
  const date = formatPostDate(new Date(post.publishedAt), post.lang);
  const minutes = new Intl.NumberFormat(
    post.lang === "fa" ? "fa-IR" : post.lang === "ar" ? "ar" : "en",
  ).format(post.readMinutes);
  const cover = post.coverImage
    ? `<img class="post-cover" src="${escapeHtml(post.coverImage)}" alt="">`
    : "";

  return `<!doctype html>
<html lang="${escapeHtml(post.lang)}" dir="${dir}" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(post.title)} · Amatis</title>
  <meta name="description" content="${escapeHtml(post.excerpt)}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(post.title)}">
  <meta property="og:description" content="${escapeHtml(post.excerpt)}">
  <link rel="shortcut icon" href="/assets/images/favicon.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@600;700;800;900;1000&family=Vazirmatn:wght@600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/style.css">
  ${POST_STYLES}
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="/">
        <span class="brand-mark">A</span><span class="brand-word">Amatis</span>
      </a>
      <nav class="site-nav" aria-label="Main">${NAV}</nav>
      <div class="header-actions">
        <button class="icon-btn" type="button" data-theme-toggle aria-label="Switch theme">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        </button>
      </div>
    </div>
  </header>

  <main>
    <section class="py-section">
      <div class="container-page post-wrap">
        <nav class="post-crumb" aria-label="Breadcrumb">
          <a href="/">Home</a> <span>/</span> <a href="/blogs.html">Blogs</a> <span>/</span> <span>${escapeHtml(post.title)}</span>
        </nav>
        <span class="post-tag-pill">${escapeHtml(post.tag || "Blog")}</span>
        <h1 class="post-title">${escapeHtml(post.title)}</h1>
        <div class="post-meta">
          <span><strong>Amatis</strong></span><span>•</span><span>${date}</span><span>•</span><span>${minutes} min read</span>
        </div>
        ${cover}
        <div class="post-body">${post.content}</div>
        <div class="post-cta">
          <h3>Ready to grow your business?</h3>
          <p>Talk to the Amatis team about your project — free consultation.</p>
          <a class="btn-pill" href="/connect-with-us.html">Connect With Us</a>
        </div>
      </div>
    </section>
  </main>

  ${FOOTER}
  <script src="/assets/js/main.js"></script>
</body>
</html>`;
}

// Seeds starter blog posts for amatisberry.ir.
// Idempotent: upserts by slug on every build; repo is the source of truth.
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function readMinutes(html) {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 190));
}

const P1 = `
<p>اپلیکیشن موبایل دیگر یک لوکس نیست؛ برای بسیاری از کسب‌وکارها به کانال اصلی فروش و ارتباط با مشتری تبدیل شده است. اما بیشتر پروژه‌های شکست‌خورده، نه به‌خاطر ضعف فنی، بلکه به‌خاطر برنامه‌ریزی اشتباه شکل گرفته‌اند.</p>
<h2>۱. مسئله را تعریف کنید، نه ویژگی را</h2>
<p>پیش از هر چیز مشخص کنید اپلیکیشن قرار است دقیقاً چه مشکلی را حل کند: افزایش فروش تکراری؟ کاهش تماس‌های پشتیبانی؟ سلف‌سرویس مشتری؟ اگر نتوانید هدف را در یک جمله خلاصه کنید، هنوز برای ساخت آماده نیستید.</p>
<h2>۲. تحقیق بازار و رقبا</h2>
<ul>
<li>سه رقیب اصلی را نصب کنید و نقاط ضعفشان را یادداشت بزنید.</li>
<li>با حداقل ده نفر از مشتریان واقعی صحبت کنید.</li>
<li>نسخهٔ حداقلی قابل عرضه (MVP) را روی کاغذ بکشید.</li>
</ul>
<h2>۳. انتخاب فناوری: نیتیو یا کراس‌پلتفرم؟</h2>
<p>برای اکثر پروژه‌ها فریمورک‌های کراس‌پلتفرم مانند React Native یا Flutter از نظر هزینه و سرعت به‌صرفه‌ترند. اگر به سخت‌افزار دستگاه یا پردازش سنگین نیاز دارید، توسعه نیتیو iOS و Android توجیه پیدا می‌کند.</p>
<h2>۴. بودجه و زمان‌بندی واقع‌بینانه</h2>
<p>یک MVP باکیفیت معمولاً بین دو تا چهار ماه ساخته می‌شود. بودجه را مرحله‌بندی کنید و برای بازارسازی پس از انتشار دست‌کم ۲۰٪ کنار بگذارید؛ بهترین اپلیکیشن هم بدون کاربر هیچ است.</p>
<p><strong>آماده شروع هستید؟</strong> تیم اماتیس از تحلیل ایده تا طراحی، توسعه و پشتیبانی کنار شماست — <a href="/connect-with-us.html">درخواست مشاوره رایگان</a>.</p>`;

const P2 = `
<p>بیشتر مشتریان پیش از اولین تماس، شما را در گوگل جستجو می‌کنند. برداشت آن‌ها در همان چند ثانیهٔ اول از صفحهٔ اصلی، تصمیم «تماس یا عدم تماس» را می‌سازد. وب‌سایت شرکتی شما فروشندهٔ شبانه‌روزی‌تان است.</p>
<h2>سه ستون سایت شرکتی مؤثر</h2>
<ul>
<li><strong>اعتماد:</strong> نمونه‌کار واقعی، معرفی تیم و راه‌های ارتباطی شفاف.</li>
<li><strong>سرعت:</strong> بیش از سه ثانیه تأخیر یعنی از دست رفتن نیمی از بازدیدکننده‌ها.</li>
<li><strong>مسیر روشن:</strong> هر صفحه باید دقیقاً یک اقدام بخواهد؛ تماس، فرم یا رزرو جلسه.</li>
</ul>
<h2>اشتباه‌های رایج</h2>
<p>اسلایدرهای سنگین بی‌محتوا، شعارهای مبهم بدون سند و عدد، منوی شلوغ با ده‌ها زیرشاخه، و غفلت از نسخهٔ موبایل که امروز بیش از نصف ترافیک را می‌برد.</p>
<h2>سئو را از روز اول لحاظ کنید</h2>
<p>عنوان‌های صفحه، توضیحات متا، ساختار هدینگ‌ها، سرعت و نسخهٔ موبایل پایهٔ سئوی تکنیکال هستند. افزودن سئو بعد از ساخت یعنی خرابی و بازسازی؛ از ابتدا در طراحی بگنجانیدش.</p>
<h2>محتوایی که کار می‌کند</h2>
<p>به‌جای توصیف خدمات، نتایج را نشان دهید: مطالعهٔ موردی با عدد و تصویر، نظرات مشتریان و مقالات تخصصی مثل همین مطلب. محتوای واقعی هم مخاطب را متقاعد می‌کند و هم رتبهٔ گوگل را بالا می‌برد.</p>
<p><strong>سایتی می‌خواهید که بفروشد؟</strong> <a href="/connect-with-us.html">با اماتیس صحبت کنید</a> — از طراحی تا سئو و پشتیبانی.</p>`;

const P3 = `
<p>راه‌اندازی فروشگاه اینترنتی از آنچه به نظر می‌رسد ساده‌تر است، به شرطی که ترتیب کارها را درست رعایت کنید. بیشتر فروشگاه‌های شکست‌خورده محصول خوبی داشتند، اما زیرساخت و بازاریابی ضعیف.</p>
<h2>۱. انتخاب مدل و پلتفرم</h2>
<p>اگر کنترل کامل تجربهٔ کاربری و مقیاس‌پذیری بلندمدت می‌خواهید، فروشگاه اختصاصی با فریمورک‌های مدرن انتخاب درستی است. سرویس‌های آماده ورود سریع به بازار را ممکن می‌کنند، اما در رشد و شخصی‌سازی محدودتان می‌کنند.</p>
<h2>۲. تجربهٔ خرید بی‌اصطکاک</h2>
<ul>
<li>فرایند پرداخت را حداکثر سه مرحله‌ای نگه دارید.</li>
<li>قیمت و زمان ارسال را قبل از ثبت‌نام نشان دهید.</li>
<li>پیگیری سفارش بدون تماس با پشتیبانی ممکن باشد.</li>
</ul>
<h2>۳. درگاه پرداخت و لجستیک</h2>
<p>ترکیب چند درگاه بانکی همراه با کیف پول، نرخ موفقیت پرداخت را بالا می‌برد. برای ارسال، از روز اول قرارداد با بیش از یک سرویس پستی/پیک ببندید؛ قطعی سرویس ارسال نباید فروش شما را متوقف کند.</p>
<h2>۴. بازاریابی که فروش می‌آورد</h2>
<p>قبل از افتتاح، لیست ایمیل و شبکه‌های اجتماعی را گرم کنید. بعد از افتتاح، سئوی صفحات محصول و بازاریابی محتوایی ارزان‌ترین رشد پایدار را می‌دهند و تبلیغات کلیکی شتاب‌دهندهٔ آن است. نرخ تبدیل را هفتگی بسنجید و صفحهٔ محصول را مدام تست کنید.</p>
<p><strong>قصد راه‌اندازی فروشگاه دارید؟</strong> <a href="/connect-with-us.html">از مشاورهٔ رایگان اماتیس استفاده کنید</a> تا از روز اول مسیر درست را بروید.</p>`;

const P4 = `
<p>Crypto exchanges remain one of the most demanding products in software: financial-grade reliability, adversarial security and round-the-clock operations. Here is a realistic breakdown before you commit a budget.</p>
<h2>CEX or DEX?</h2>
<p>A centralized exchange gives you speed, fiat ramps and full control of the order book — at the cost of custody responsibility and licensing. A DEX removes custody and leans on smart contracts, but inherits chain constraints and thinner UX. Many teams now ship a hybrid: non-custodial settlement behind a centralized interface.</p>
<h2>The core stack</h2>
<ul>
<li><strong>Matching engine:</strong> deterministic order matching with replayable audit logs.</li>
<li><strong>Custody:</strong> MPC or HSM-backed wallets with a clear hot/warm/cold policy and withdrawal velocity limits.</li>
<li><strong>Liquidity:</strong> market-maker agreements, external aggregation, or both — without depth, traders leave within minutes.</li>
<li><strong>Risk engine:</strong> real-time position monitoring, kill switches and rate limits per account and per IP.</li>
</ul>
<h2>Security is the product</h2>
<p>Plan for penetration tests before launch and continuous bug-bounty after it. Enforce withdrawal allow-listing, device binding and step-up authentication for sensitive actions. Most post-launch incidents trace back to secrets management and unmonitored admin tooling, not exotic cryptography.</p>
<h2>Compliance early, not later</h2>
<p>KYC/AML flows affect onboarding UX, data residency and even which chains you can list. Engage legal counsel for target jurisdictions during architecture design; retrofitting compliance is far more expensive than designing for it.</p>
<p><strong>Evaluating an exchange project?</strong> <a href="/connect-with-us.html">Talk to Amatis</a> — we design, build and harden exchange platforms end to end.</p>`;

const P5 = `
<p>Search still sends the highest-intent traffic most businesses get — but ranking in 2026 looks different from 2019. AI-generated summaries, stricter quality signals and Core Web Vitals have reshuffled the checklist. Here is what actually moves the needle now.</p>
<h2>1. Nail technical foundations</h2>
<ul>
<li>Crawl budget: fix broken links, redirect chains and duplicate templates.</li>
<li>Speed: serve LCP under 2.5s on mobile; compress images and defer non-critical scripts.</li>
<li>Structured data: Product, FAQ and Article markup win rich results and AI citations.</li>
</ul>
<h2>2. Content that earns rankings</h2>
<p>Publish pages that answer a specific query better than anything currently on page one. One deep, genuinely useful article beats ten thin posts. Refresh top pages quarterly — decayed content quietly slides down results.</p>
<h2>3. Entities over keywords</h2>
<p>Search engines map brands, products and authors as entities. Consistent company details across your site, Google Business Profile and industry directories strengthen how confidently systems recommend you.</p>
<h2>4. Measure what matters</h2>
<p>Track conversions from organic sessions, not just positions. A rank-4 page that sells beats a rank-1 page that bounces. Set up Search Console goals and review them monthly.</p>
<p><strong>Want SEO built into your platform instead of bolted on?</strong> <a href="/connect-with-us.html">Amatis builds sites that rank by design</a>.</p>`;

const POSTS = [
  {
    slug: "mobile-app-for-business-fa",
    lang: "fa",
    tag: "توسعه اپلیکیشن",
    coverImage: "/assets/images/news-1.jpg",
    title: "چطور برای کسب‌وکار خود اپلیکیشن موبایل بسازیم؟ راهنمای گام‌به‌گام",
    excerpt:
      "از ایده و تحلیل بازار تا انتخاب فناوری، هزینه و انتشار در استورها؛ هر آنچه پیش از سفارش اپلیکیشن موبایل باید بدانید.",
    content: P1,
  },
  {
    slug: "corporate-website-design-fa",
    lang: "fa",
    tag: "طراحی سایت",
    coverImage: "/assets/images/news-2.jpg",
    title: "طراحی وب‌سایت شرکتی؛ ویترین دیجیتالی که مشتری را به خریدار تبدیل می‌کند",
    excerpt:
      "یک سایت شرکتی خوب فقط زیبا نیست؛ سریع است، اعتماد می‌سازد و مخاطب را به اقدام می‌رساند. این‌طور بسازیدش.",
    content: P2,
  },
  {
    slug: "online-store-guide-fa",
    lang: "fa",
    tag: "فروشگاه آنلاین",
    coverImage: "/assets/images/news-3.jpg",
    title: "فروشگاه اینترنتی حرفه‌ای؛ از ایده تا اولین فروش",
    excerpt:
      "انتخاب پلتفرم، درگاه پرداخت، لجستیک و بازاریابی؛ نقشهٔ راه عملی راه‌اندازی فروشگاه آنلاین در بازار ایران.",
    content: P3,
  },
  {
    slug: "crypto-exchange-development-en",
    lang: "en",
    tag: "Blockchain & Crypto",
    coverImage: "/assets/images/news-details.jpg",
    title: "Building a Crypto Exchange in 2026: Security, Liquidity and Compliance",
    excerpt:
      "What it really takes to launch a CEX or DEX today: matching engine, custody, liquidity bootstrapping and the regulatory checklist.",
    content: P4,
  },
  {
    slug: "seo-checklist-2026-en",
    lang: "en",
    tag: "SEO & Marketing",
    coverImage: "/assets/images/our-service-1.jpg",
    title: "SEO Checklist for 2026: What Actually Moves the Needle",
    excerpt:
      "Technical foundations, content depth and entity building — the updated playbook for ranking higher this year.",
    content: P5,
  },
];

async function seedPosts() {
  let i = 0;
  for (const p of POSTS) {
    const data = {
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content.trim(),
      coverImage: p.coverImage,
      tag: p.tag,
      lang: p.lang,
      readMinutes: readMinutes(p.content),
      published: true,
      publishedAt: new Date(Date.now() - i * 36 * 60 * 60 * 1000),
    };
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      update: data,
      create: { ...data, slug: p.slug },
    });
    i++;
  }
  console.log(`seed: ensured ${POSTS.length} blog posts.`);
}

if (require.main === module) {
  seedPosts()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}

module.exports = { seedPosts };

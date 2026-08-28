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


// ---------- English translations of the Persian articles ----------

const P1en = `
<p>Mobile apps are no longer a luxury — for many businesses they have become the main channel for sales and customer relationships. Yet most failed projects break down not because of weak engineering, but because of poor planning. Here is the full path, step by step.</p>
<h2>1. Define the problem, not the features</h2>
<p>Before anything else, decide exactly which problem your app solves: repeat purchases? fewer support calls? customer self-service? If you cannot summarize the goal in one sentence, you are not ready to build.</p>
<h2>2. Research the market and competitors</h2>
<ul>
<li>Install your three main competitors and note their weaknesses.</li>
<li>Talk to at least ten real customers.</li>
<li>Sketch the minimum viable product (MVP) on paper.</li>
</ul>
<h2>3. Choosing technology: native or cross-platform?</h2>
<p>For most projects, cross-platform frameworks like React Native or Flutter win on cost and speed. If you need deep device hardware access or heavy processing, native iOS and Android development is justified.</p>
<h2>4. Realistic budget and timeline</h2>
<p>A quality MVP usually takes two to four months. Split the budget into phases and reserve at least 20% for post-launch marketing — even the best app is nothing without users.</p>
<p><strong>Ready to start?</strong> The Amatis team covers everything from idea analysis to design, development and support — <a href="/connect-with-us.html">request a free consultation</a>.</p>`;

const P2en = `
<p>Most customers search for you on Google before the first call. Their impression from the first few seconds of your homepage decides whether they contact you or leave. Your corporate website is a salesperson that works around the clock.</p>
<h2>Three pillars of an effective corporate site</h2>
<ul>
<li><strong>Trust:</strong> real case studies, team introductions and clear contact channels.</li>
<li><strong>Speed:</strong> more than three seconds of load time loses half your visitors.</li>
<li><strong>A clear path:</strong> every page should ask for exactly one action — call, form or booking.</li>
</ul>
<h2>Common mistakes</h2>
<p>Heavy sliders with no useful content, vague "we are the best" slogans without proof, menus crowded with dozens of sub-items, and neglecting mobile — which today carries more than half of all traffic.</p>
<h2>SEO belongs in day one</h2>
<p>Page titles, meta descriptions, heading structure, speed and mobile experience are the foundations of technical SEO. Bolting SEO on after launch means breaking and rebuilding; design it in from the start.</p>
<h2>Content that works</h2>
<p>Instead of describing services, show results: case studies with numbers and images, customer testimonials, and expert articles like this one. Real content convinces visitors and lifts Google rankings at the same time.</p>
<p><strong>Want a website that sells?</strong> <a href="/connect-with-us.html">Talk to Amatis</a> — from design to SEO and support.</p>`;

const P3en = `
<p>Launching an online store is easier than it looks — provided you do things in the right order. Most failed stores had good products but weak infrastructure and marketing.</p>
<h2>1. Model and platform</h2>
<p>If you want full control over the shopping experience and long-term scalability, a custom-built store on modern frameworks is the right call. Ready-made services get you to market fast, but limit growth and customization.</p>
<h2>2. Frictionless checkout</h2>
<ul>
<li>Keep checkout to three steps maximum.</li>
<li>Show price and delivery time before registration.</li>
<li>Make order tracking possible without contacting support.</li>
</ul>
<h2>3. Payments and logistics</h2>
<p>Combining several payment gateways with a wallet balance raises payment success rates. For shipping, sign contracts with more than one courier from day one — an outage at your carrier must never stop your sales.</p>
<h2>4. Marketing that sells</h2>
<p>Warm up your email list and social channels before launch. After launch, product-page SEO and content marketing are the cheapest sustainable growth; paid ads accelerate it. Measure conversion weekly and keep testing your product pages.</p>
<p><strong>Planning a store?</strong> <a href="/connect-with-us.html">Use Amatis' free consultation</a> to start on the right path from day one.</p>`;

// ---------- German translations ----------

const P1de = `
<p>Mobile Apps sind kein Luxus mehr – für viele Unternehmen sind sie zum wichtigsten Vertriebs- und Kommunikationskanal geworden. Die meisten gescheiterten Projekte scheitern nicht an der Technik, sondern an der Planung. Der gesamte Weg, Schritt für Schritt:</p>
<h2>1. Definieren Sie das Problem, nicht die Funktionen</h2>
<p>Klären Sie zuerst, welches Problem Ihre App lösen soll: Wiederholungskäufe? Weniger Support-Anrufe? Self-Service für Kunden? Wer das Ziel nicht in einem Satz zusammenfassen kann, ist noch nicht bereit.</p>
<h2>2. Markt- und Wettbewerbsanalyse</h2>
<ul>
<li>Installieren Sie die drei wichtigsten Wettbewerber und notieren Sie deren Schwächen.</li>
<li>Sprechen Sie mit mindestens zehn echten Kunden.</li>
<li>Skizzieren Sie Ihr MVP auf Papier.</li>
</ul>
<h2>3. Technologie: nativ oder plattformübergreifend?</h2>
<p>Für die meisten Projekte gewinnen Cross-Platform-Frameworks wie React Native oder Flutter bei Kosten und Geschwindigkeit. Bei anspruchsvoller Hardware-Anbindung ist native Entwicklung gerechtfertigt.</p>
<h2>4. Realistisches Budget</h2>
<p>Ein qualitatives MVP dauert in der Regel zwei bis vier Monate. Reservieren Sie mindestens 20 % des Budgets für das Marketing nach dem Launch.</p>
<p><strong>Bereit loszulegen?</strong> Das Amatis-Team begleitet Sie von der Ideeanalyse bis zu Design, Entwicklung und Support — <a href="/connect-with-us.html">kostenlose Beratung anfordern</a>.</p>`;

const P2de = `
<p>Die meisten Kunden suchen Sie bei Google, bevor sie anrufen. Der Eindruck der ersten Sekunden entscheidet über Kontakt oder Absprung. Ihre Unternehmens-Website ist ein Verkäufer, der rund um die Uhr arbeitet.</p>
<h2>Die drei Säulen einer wirksamen Website</h2>
<ul>
<li><strong>Vertrauen:</strong> echte Fallstudien, Team und klare Kontaktwege.</li>
<li><strong>Geschwindigkeit:</strong> mehr als drei Sekunden Ladezeit kosten die Hälfte der Besucher.</li>
<li><strong>Klarer Pfad:</strong> jede Seite sollte genau eine Handlung fordern.</li>
</ul>
<h2>Häufige Fehler</h2>
<p>Schwere Slider ohne Nutzwert, vage Werbeslogans ohne Belege, überfrachtete Menüs und die Vernachlässigung von Mobile – heute mehr als die Hälfte des Traffics.</p>
<h2>SEO ab Tag eins</h2>
<p>Seitentitel, Meta-Beschreibungen, Überschriftenstruktur, Tempo und mobile Erfahrung sind das Fundament. SEO nachträglich einzubauen bedeutet Abbau und Neuaufbau.</p>
<p><strong>Sie wollen eine Website, die verkauft?</strong> <a href="/connect-with-us.html">Sprechen Sie mit Amatis</a>.</p>`;

const P3de = `
<p>Ein Online-Shop zu starten ist einfacher als gedacht – wenn die Reihenfolge stimmt. Gescheiterte Shops hatten meist gute Produkte, aber schwache Infrastruktur und Marketing.</p>
<h2>1. Modell und Plattform</h2>
<p>Wer volle Kontrolle über das Einkaufserlebnis und langfristige Skalierung will, fährt mit einem individuell entwickelten Shop am besten. Fertiglösungen sind schnell, begrenzen aber Wachstum.</p>
<h2>2. Reibungsloser Checkout</h2>
<ul>
<li>Maximal drei Schritte bis zum Kauf.</li>
<li>Preis und Lieferzeit vor der Registrierung zeigen.</li>
<li>Sendungsverfolgung ohne Support-Kontakt ermöglichen.</li>
</ul>
<h2>3. Zahlungen und Logistik</h2>
<p>Mehrere Zahlungsdienstleister erhöhen die Erfolgsquote. Schließen Sie von Anfang an Verträge mit mehr als einem Versanddienstleister ab.</p>
<p><strong>Sie planen einen Shop?</strong> <a href="/connect-with-us.html">Nutzen Sie die kostenlose Beratung von Amatis</a>.</p>`;

const P4de = `
<p>Krypto-Börsen gehören zu den anspruchsvollsten Produkten im Softwarebereich: Zuverlässigkeit auf Finanzniveau, feindliche Sicherheit und 24/7-Betrieb. Eine realistische Einordnung vor dem Budget-Engagement:</p>
<h2>CEX oder DEX?</h2>
<p>Eine zentralisierte Börse bietet Geschwindigkeit, Fiat-Rampen und volle Kontrolle über das Orderbuch – zum Preis von Verwahrungsverantwortung und Lizenzierung. Eine DEX entfernt die Verwahrung, erbt aber Chain-Einschränkungen. Viele Teams fahren heute Hybrid.</p>
<h2>Der Kern-Stack</h2>
<ul>
<li><strong>Matching Engine:</strong> deterministische Orderausführung mit prüfbaren Logs.</li>
<li><strong>Custody:</strong> MPC- oder HSM-Wallets mit klarer Hot/Warm/Cold-Politik.</li>
<li><strong>Liquidität:</strong> Market-Maker-Vereinbarungen oder Aggregation – ohne Tiefe verlassen Händler die Plattform in Minuten.</li>
<li><strong>Risk-Engine:</strong> Echtzeitüberwachung, Kill-Switches und Rate-Limits.</li>
</ul>
<h2>Sicherheit ist das Produkt</h2>
<p>Penetrationstests vor dem Launch, Bug-Bounty danach. Die meisten Vorfälle gehen auf Secrets-Management und unüberwachte Admin-Tools zurück, nicht auf exotische Kryptografie.</p>
<h2>Compliance früh</h2>
<p>KYC/AML beeinflusst Onboarding, Datenresidenz und welche Chains gelistet werden können. Rechtliche Beratung gehört in die Architekturphase.</p>
<p><strong>Börsenprojekt geplant?</strong> <a href="/connect-with-us.html">Sprechen Sie mit Amatis</a>.</p>`;

const P5de = `
<p>Die Suche liefert weiterhin den kaufkräftigsten Traffic – aber Rankings sehen 2026 anders aus als 2019. KI-Zusammenfassungen, strengere Qualitätssignale und Core Web Vitals haben die Checkliste verändert.</p>
<h2>1. Technisches Fundament</h2>
<ul>
<li>Crawl-Budget: kaputte Links und Redirect-Ketten beheben.</li>
<li>Tempo: LCP unter 2,5 s auf Mobilgeräten; Bilder komprimieren.</li>
<li>Strukturierte Daten: Product-, FAQ- und Article-Markup gewinnen Rich Results.</li>
</ul>
<h2>2. Inhalt, der Rankings verdient</h2>
<p>Veröffentlichen Sie Seiten, die eine konkrete Frage besser beantworten als alles auf Seite eins. Ein tiefer Artikel schlägt zehn dünne. Top-Seiten vierteljährlich aktualisieren.</p>
<h2>3. Entitäten statt Keywords</h2>
<p>Suchmaschinen erfassen Marken und Autoren als Entitäten. Konsistente Firmendaten stärken die Empfehlungsfähigkeit.</p>
<h2>4. Richtig messen</h2>
<p>Konversionen aus organischem Traffic verfolgen, nicht nur Positionen. Eine Platz-4-Seite, die verkauft, schlägt eine Platz-1-Seite mit Absprüngen.</p>
<p><strong>SEO eingebaut statt aufgesetzt?</strong> <a href="/connect-with-us.html">Amatis baut Websites, die von Grund auf ranken</a>.</p>`;

// ---------- Arabic translations ----------

const P1ar = `
<p>لم تعد تطبيقات الجوال رفاهية؛ فقد أصبحت لكثير من الشركات القناة الرئيسية للبيع والتواصل مع العملاء. ومع ذلك فإن معظم المشاريع الفاشلة تعود إلى سوء التخطيط لا ضعف التقنية. إليك المسار كاملاً خطوة بخطوة.</p>
<h2>١. حدّد المشكلة لا الميزات</h2>
<p>قرر بدقة أي مشكلة سيحلها تطبيقك: زيادة المشتريات المتكررة؟ تقليل مكالمات الدعم؟ خدمة ذاتية للعملاء؟ من لا يستطيع تلخيص الهدف في جملة واحدة لم يعد جاهزاً بعد.</p>
<h2>٢. ابحث في السوق والمنافسين</h2>
<ul>
<li>جرّب أهم ثلاثة منافسين ودوّن نقاط ضعفهم.</li>
<li>تحدث مع عشرة عملاء حقيقيين على الأقل.</li>
<li>ارسم الحد الأدنى من المنتج القابل للإطلاق على الورق.</li>
</ul>
<h2>٣. التقنية: أصلي أم متعدد المنصات؟</h2>
<p>لمعظم المشاريع تتفوق أطر العمل متعددة المنصات مثل React Native وFlutter في التكلفة والسرعة، بينما يُفضَّل التطوير الأصلي عند الحاجة لعمق عتاد الجهاز.</p>
<h2>٤. ميزانية وجدول واقعيان</h2>
<p>يستغرق المنتج الأول الجيد شهرين إلى أربعة عادةً، وخصّص ٢٠٪ من الميزانية للتسويق بعد الإطلاق على الأقل.</p>
<p><strong>جاهز للبدء؟</strong> فريق أماتيس يرافقك من تحليل الفكرة حتى التصميم والتطوير والدعم — <a href="/connect-with-us.html">اطلب استشارة مجانية</a>.</p>`;

const P2ar = `
<p>يبحث معظم العملاء عنك في جوجل قبل أول اتصال، وانطباع الثواني الأولى من صفحتك الرئيسية يحدد إن تواصلوا معك أو غادروا. موقعك المؤسسي بائع يعمل على مدار الساعة.</p>
<h2>ثلاث ركائز لموقع مؤسسي فعّال</h2>
<ul>
<li><strong>الثقة:</strong> دراسات حالة حقيقية وتعريف بالفريق وقنوات تواصل واضحة.</li>
<li><strong>السرعة:</strong> أكثر من ثلاث ثوانٍ تحميل يفقدك نصف الزوار.</li>
<li><strong>مسار واضح:</strong> كل صفحة يجب أن تطلب إجراءً واحداً محدداً.</li>
</ul>
<h2>أخطاء شائعة</h2>
<p>سلايدرات ثقيلة بلا محتوى مفيد، شعارات مبهمة بلا براهين، قوائم مزدحمة بعشرات العناوين، وإهمال نسخة الجوال التي تحمل اليوم أكثر من نصف الزيارات.</p>
<h2>تحسين محركات البحث من اليوم الأول</h2>
<p>عناوين الصفحات والأوصاف وبنية الترويسات والسرعة هي أساس السيو. إضافته بعد الإطلاق تعني الهدم وإعادة البناء.</p>
<p><strong>تريد موقعاً يبيع؟</strong> <a href="/connect-with-us.html">تحدث مع أماتيس</a>.</p>`;

const P3ar = `
<p>إطلاق متجر إلكتروني أسهل مما يبدو — بشرط تنفيذ الأمور بالترتيب الصحيح. معظم المتاجر الفاشلة امتلكت منتجات جيدة لكن بنية تحتية وتسويقاً ضعيفين.</p>
<h2>١. النموذج والمنصة</h2>
<p>من يريد تحكماً كاملاً بتجربة الشراء وقابلية توسع طويلة الأمد فالحل الأنسب متجر مخصص بأطر عمل حديثة. الخدمات الجاهزة سريعة لكنها تحدّ النمو.</p>
<h2>٢. شراء بسلاسة</h2>
<ul>
<li>اجعل إتمام الشراء ثلاث خطوات كحد أقصى.</li>
<li>اعرض السعر وزمن التوصيل قبل التسجيل.</li>
<li>مكّن تتبع الطلب دون التواصل مع الدعم.</li>
</ul>
<h2>٣. الدفع واللوجستيات</h2>
<p>دمج عدة بوابات دفع يرفع نسب نجاح العملية، وتعاقد مع أكثر من شركة شحن منذ اليوم الأول حتى لا يتوقف بيعك بسبب انقطاع خدمة واحدة.</p>
<p><strong>تخطط لمتجر؟</strong> <a href="/connect-with-us.html">استفد من الاستشارة المجانية من أماتيس</a>.</p>`;

const P4ar = `
<p>تبقى منصات تداول العملات الرقمية من أصعب المنتجات البرمجية: موثوقية بمستوى المؤسسات المالية، وأمان في مواجهة خصوم حقيقيين، وتشغيل متواصل. إليك صورة واقعية قبل الالتزام بالميزانية.</p>
<h2>منصة مركزية أم لامركزية؟</h2>
<p>المنصة المركزية تمنحك السرعة والتحكم الكامل بدفتر الأوامر — مقابل مسؤولية الحفظ والترخيص. اللامركزية تنقل الحفظ إلى العقود الذكية لكنها ترث قيود الشبكة. كثير من الفرق تعتمد اليوم نموذجاً هجيناً.</p>
<h2>المكونات الأساسية</h2>
<ul>
<li><strong>محرك المطابقة:</strong> تنفيذ أوامر محدد مع سجلات تدقيق قابلة لإعادة التشغيل.</li>
<li><strong>الحفظ:</strong> محافظ MPC أو HSM بسياسة واضحة للمحافظ الساخنة والباردة.</li>
<li><strong>السيولة:</strong> اتفاقيات صنّاع سوق أو تجميع خارجي — دون عمق يغادر المتداولون خلال دقائق.</li>
<li><strong>محرك المخاطر:</strong> مراقبة فورية ومفاتيح إيقاف وحدود معدل.</li>
</ul>
<h2>الأمن هو المنتج</h2>
<p>اختبرات اختراق قبل الإطلاق وبرنامج مكافآت بعده. معظم الحوادث تعود إلى إدارة الأسرار وأدوات الإدارة غير المراقبة، لا إلى تشفير غريب.</p>
<h2>الامتثال مبكراً</h2>
<p>تؤثر متطلبات اعرف عميلك على تجربة التسجيل وحجم البيانات وسلاسل البلوكتشين الممكن إدراجها. أشرك المستشار القانوني في مرحلة التصميم.</p>
<p><strong>تخطط لمنصة تداول؟</strong> <a href="/connect-with-us.html">تحدث مع أماتيس</a>.</p>`;

const P5ar = `
<p>لا يزال البحث يرسل أعلى زيارات نية شرائية — لكن الترتيب في ٢٠٢٦ اختلف عن ٢٠١٩. الملخصات الذكية وإشارات الجودة الأصرم قلبت القائمة رأساً على عقب.</p>
<h2>١. الأساس التقني</h2>
<ul>
<li>روابط مكسورة وسلاسل تحويل: أصلحها.</li>
<li>السرعة: LCP أقل من ٢٫٥ ثانية على الجوال وضغط الصور.</li>
<li>البيانات المنظمة: Product وFAQ وArticle تكسب نتائج غنية واستشهادات ذكاء اصطناعي.</li>
</ul>
<h2>٢. محتوى يستحق الترتيب</h2>
<p>انشر صفحات تجيب عن سؤال محدد أفضل مما هو موجود في الصفحة الأولى. مقال عميق واحد يتفوق على عشرة مقالات سطحية، وحدّث صفحاتك الأهم كل ثلاثة أشهر.</p>
<h2>٣. الكيانات لا الكلمات المفتاحية</h2>
<p>محركات البحث تبني خرائط للعلامات والمؤلفين ككيانات؛ اتساق بيانات شركتك عبر الموقع والدلائل يقوي ثقة الأنظمة بالتوصية بك.</p>
<h2>٤. قِس ما يهم</h2>
<p>تتبع التحويلات من الزيارات العضوية لا المواقع فقط. صفحة في المركز الرابع تبيع خير من مركز أول يرتد.</p>
<p><strong>تريد سيواً مدمجاً بمنصتك لا مضافاً عليها؟</strong> <a href="/connect-with-us.html">أماتيس تبني مواقع تصعد بالتصميم</a>.</p>`;

// ---------- Persian translations of the English articles ----------

const P4fa = `
<p>صرافی‌های ارز دیجیتال از دشوارترین محصولات نرم‌افزاری هستند: قابلیت اطمینان در سطح مؤسسات مالی، امنیت در برابر مهاجمان واقعی و بهره‌برداری شبانه‌روزی. قبل از خرج کردن بودجه، این تصویر واقعی را داشته باشید.</p>
<h2>صرافی متمرکز یا غیرمتمرکز؟</h2>
<p>صرافی متمرکز سرعت، درگاه پول فیات و کنترل کامل دفتر سفارش‌ها را می‌دهد — به بهای مسئولیت نگهداری دارایی و اخذ مجوز. صرافی غیرمتمرکز نگهداری را حذف می‌کند اما محدودیت‌های زنجیره و تجربه کاربری ضعیف‌تر را به ارث می‌برد. بسیاری از تیم‌ها امروز مدل ترکیبی را انتخاب می‌کنند.</p>
<h2>ستون‌های اصلی</h2>
<ul>
<li><strong>موتور معاملات:</strong> اجرای قطعی سفارش‌ها با لاگ‌های قابل ممیزی.</li>
<li><strong>نگهداری دارایی:</strong> کیف‌پول‌های MPC یا HSM با سیاست شفاف سرد/گرم و سقف برداشت.</li>
<li><strong>نقدینگی:</strong> قرارداد با مارکت‌میکرها یا تجمیع خارجی؛ بدون عمق، معامله‌گر در چند دقیقه می‌رود.</li>
<li><strong>موتور ریسک:</strong> پایش لحظه‌ای موقعیت‌ها، کلید توقف و محدودیت نرخ.</li>
</ul>
<h2>امنیت خودِ محصول است</h2>
<p>تست نفوذ قبل از انتشار و باگ‌بانتی پس از آن. بیشتر حوادث پس از راه‌اندازی ریشه در مدیریت اسرار و ابزارهای ادمین بدون پایش دارند، نه رمزنگاری‌های عجیب.</p>
<h2>مقررات را زودتر شروع کنید</h2>
<p>الزامات احراز هویت روی تجربه ثبت‌نام، محل ذخیره داده و لیست شبکه‌های قابل پذیرش اثر می‌گذارد. مشاور حقوقی باید در فاز معماری حضور داشته باشد.</p>
<p><strong>قصد ساخت صرافی دارید؟</strong> <a href="/connect-with-us.html">با اماتیس صحبت کنید</a>.</p>`;

const P5fa = `
<p>جستجوی گوگل هنوز باکیفیت‌ترین ترافیک برای کسب‌وکارهاست — اما رتبه گرفتن در ۲۰۲۶ با گذشته زمین تا آسمان فرق کرده است. خلاصه‌سازی هوش مصنوعی، سیگنال‌های کیفیت سخت‌گیرانه‌تر و Core Web Vitals چک‌لیست را عوض کرده‌اند.</p>
<h2>۱. پایه‌های تکنیکال را محکم کنید</h2>
<ul>
<li>لینک‌های شکسته و زنجیره ریدایرکت‌ها را اصلاح کنید.</li>
<li>LCP زیر ۲٫۵ ثانیه در موبایل؛ تصاویر را فشرده کنید.</li>
<li>داده‌های ساختاریافته Product و FAQ و Article نتایج ویژه می‌آورند.</li>
</ul>
<h2>۲. محتوایی که رتبه می‌گیرد</h2>
<p>صفحاتی منتشر کنید که یک پرسش مشخص را بهتر از هر چیزی که الان صفحه اول است جواب دهد. یک مقاله عمیق از ده مقاله سطحی ارزشمندتر است و صفحات مهم را هر سه ماه به‌روز کنید.</p>
<h2>۳. موجودیت بسازید، نه فقط کلمه کلیدی</h2>
<p>موتورها برندها و نویسندگان را به‌عنوان موجودیت می‌شناسند. اطلاعات سازگار شرکت در سایت، پروفایل گوگل و دایرکتوری‌ها اعتماد سیستم‌ها را برای توصیه به شما بالا می‌برد.</p>
<h2>۴. چیزی را بسنجید که مهم است</h2>
<p>تبدیل کاربر به مشتری از کانال ارگانیک را رصد کنید نه فقط جای کلمات را. صفحه رتبه چهارمی که می‌فروشد از رتبه یکی که کاربر فراری می‌دهد بهتر است.</p>
<p><strong>سئوی ساخته‌شده در بستر سایت می‌خواهید نه سئوی الحاقی؟</strong> <a href="/connect-with-us.html">اماتیس سایتی می‌سازد که از روز اول رتبه می‌گیرد</a>.</p>`;

const ARTICLES = [
  {
    group: "mobile-app-business",
    cover: "/assets/images/news-1.jpg",
    tr: {
      fa: { slug: "mobile-app-for-business-fa", title: "چطور برای کسب‌وکار خود اپلیکیشن موبایل بسازیم؟ راهنمای گام‌به‌گام", excerpt: "از ایده و تحلیل بازار تا انتخاب فناوری، هزینه و انتشار در استورها؛ هر آنچه پیش از سفارش اپلیکیشن موبایل باید بدانید.", content: P1, tag: "توسعه اپلیکیشن" },
      en: { slug: "mobile-app-for-business-en", title: "How to Build a Mobile App for Your Business: A Step-by-Step Guide", excerpt: "From idea and market research to technology choice, budget and store release — everything to know before commissioning a mobile app.", content: P1en, tag: "App Development" },
      de: { slug: "mobile-app-for-business-de", title: "Wie man eine Mobile App für sein Unternehmen entwickelt: Schritt für Schritt", excerpt: "Von Idee und Marktanalyse bis Technologie, Budget und Store-Launch — alles, was Sie vor der Entwicklung wissen müssen.", content: P1de, tag: "App-Entwicklung" },
      ar: { slug: "mobile-app-for-business-ar", title: "كيف تبني تطبيق جوال لعملك؟ دليل خطوة بخطوة", excerpt: "من الفكرة وتحليل السوق إلى اختيار التقنية والميزانية والنشر؛ كل ما تحتاج معرفته قبل بناء التطبيق.", content: P1ar, tag: "تطوير التطبيقات" },
    },
  },
  {
    group: "corporate-website-design",
    cover: "/assets/images/news-2.jpg",
    tr: {
      fa: { slug: "corporate-website-design-fa", title: "طراحی وب‌سایت شرکتی؛ ویترین دیجیتالی که مشتری را به خریدار تبدیل می‌کند", excerpt: "یک سایت شرکتی خوب فقط زیبا نیست؛ سریع است، اعتماد می‌سازد و مخاطب را به اقدام می‌رساند. این‌طور بسازیدش.", content: P2, tag: "طراحی سایت" },
      en: { slug: "corporate-website-design-en", title: "Corporate Website Design: The Digital Shopfront That Turns Visitors into Buyers", excerpt: "A good corporate site is not just beautiful — it is fast, builds trust and moves visitors to act. Here is how to build it.", content: P2en, tag: "Web Design" },
      de: { slug: "corporate-website-design-de", title: "Unternehmens-Website: Das digitale Schaufenster, das Besucher zu Käufern macht", excerpt: "Eine gute Unternehmens-Website ist nicht nur schön — sie ist schnell, schafft Vertrauen und führt zum Handeln.", content: P2de, tag: "Webdesign" },
      ar: { slug: "corporate-website-design-ar", title: "تصميم الموقع المؤسسي؛ واجهة رقمية تحول الزائر إلى مشترٍ", excerpt: "الموقع الجيد ليس جميلاً فقط؛ بل سريع ويبني الثقة ويدفع الزائر للتصرف. هكذا تبنيه.", content: P2ar, tag: "تصميم المواقع" },
    },
  },
  {
    group: "online-store-guide",
    cover: "/assets/images/news-3.jpg",
    tr: {
      fa: { slug: "online-store-guide-fa", title: "فروشگاه اینترنتی حرفه‌ای؛ از ایده تا اولین فروش", excerpt: "انتخاب پلتفرم، درگاه پرداخت، لجستیک و بازاریابی؛ نقشهٔ راه عملی راه‌اندازی فروشگاه آنلاین در بازار ایران.", content: P3, tag: "فروشگاه آنلاین" },
      en: { slug: "online-store-guide-en", title: "Building a Professional Online Store: From Idea to First Sale", excerpt: "Platform choice, payments, logistics and marketing — a practical roadmap for launching an online store.", content: P3en, tag: "E-commerce" },
      de: { slug: "online-store-guide-de", title: "Professioneller Online-Shop: Von der Idee bis zum ersten Verkauf", excerpt: "Plattformwahl, Zahlungen, Logistik und Marketing — ein praktischer Fahrplan für den Shop-Launch.", content: P3de, tag: "E-Commerce" },
      ar: { slug: "online-store-guide-ar", title: "متجر إلكتروني احترافي؛ من الفكرة إلى أول عملية بيع", excerpt: "اختيار المنصة وبوابات الدفع واللوجستيات والتسويق؛ خارطة طريق عملية لإطلاق متجرك.", content: P3ar, tag: "التجارة الإلكترونية" },
    },
  },
  {
    group: "crypto-exchange-development",
    cover: "/assets/images/news-details.jpg",
    tr: {
      fa: { slug: "crypto-exchange-development-fa", title: "ساخت صرافی ارز دیجیتال در ۲۰۲۶؛ امنیت، نقدینگی و مقررات", excerpt: "برای راه‌اندازی صرافی متمرکز یا غیرمتمرکز به چه چیزهایی واقعاً نیاز دارید؟ موتور معاملات، نگهداری دارایی، نقدینگی و چک‌لیست مقرراتی.", content: P4fa, tag: "بلاکچین و کریپتو" },
      en: { slug: "crypto-exchange-development-en", title: "Building a Crypto Exchange in 2026: Security, Liquidity and Compliance", excerpt: "What it really takes to launch a CEX or DEX today: matching engine, custody, liquidity bootstrapping and the regulatory checklist.", content: P4, tag: "Blockchain & Crypto" },
      de: { slug: "crypto-exchange-development-de", title: "Aufbau einer Krypto-Börse 2026: Sicherheit, Liquidität und Compliance", excerpt: "Was es wirklich braucht, um heute eine CEX oder DEX zu starten: Matching Engine, Custody, Liquidität und Regulatorik.", content: P4de, tag: "Blockchain & Krypto" },
      ar: { slug: "crypto-exchange-development-ar", title: "بناء منصة تداول عملات رقمية في ٢٠٢٦: الأمن والسيولة والامتثال", excerpt: "ما تحتاجه فعلاً لإطلاق منصة مركزية أو لامركزية اليوم: محرك المطابقة والحفظ والسيولة وقائمة الامتثال.", content: P4ar, tag: "البلوك تشين والكريبتو" },
    },
  },
  {
    group: "seo-checklist-2026",
    cover: "/assets/images/seo-checklist.jpg",
    tr: {
      fa: { slug: "seo-checklist-2026-fa", title: "چک‌لیست سئو ۲۰۲۶؛ چه چیزی واقعاً رتبه می‌آورد؟", excerpt: "مبانی تکنیکال، عمق محتوا و ساخت موجودیت؛ پلی‌بوک به‌روزشده برای رتبه گرفتن در امسال.", content: P5fa, tag: "سئو و مارکتینگ" },
      en: { slug: "seo-checklist-2026-en", title: "SEO Checklist for 2026: What Actually Moves the Needle", excerpt: "Technical foundations, content depth and entity building — the updated playbook for ranking higher this year.", content: P5, tag: "SEO & Marketing" },
      de: { slug: "seo-checklist-2026-de", title: "SEO-Checkliste 2026: Was wirklich zählt", excerpt: "Technisches Fundament, Inhaltstiefe und Entitäten-Aufbau — das aktualisierte Playbook für bessere Rankings.", content: P5de, tag: "SEO & Marketing" },
      ar: { slug: "seo-checklist-2026-ar", title: "قائمة تحسين محركات البحث ٢٠٢٦: ما الذي يحرّك النتائج فعلاً", excerpt: "الأسس التقنية وعمق المحتوى وبناء الكيانات — دليل محدث للترتيب الأعلى هذا العام.", content: P5ar, tag: "سيو وتسويق" },
    },
  },
];

async function seedPosts() {
  let dayOffset = 0;
  for (const a of ARTICLES) {
    for (const [lang, t] of Object.entries(a.tr)) {
      const data = {
        slug: t.slug,
        title: t.title,
        excerpt: t.excerpt,
        content: String(t.content || "").trim(),
        coverImage: a.cover,
        lang,
        readMinutes: readMinutes(String(t.content || "")),
        published: Boolean(String(t.content || "").trim()),
        publishedAt: new Date(Date.now() - dayOffset * 36 * 60 * 60 * 1000),
        groupId: a.group,
      };
      await prisma.blogPost.upsert({
        where: { slug: t.slug },
        update: data,
        create: data,
      });
    }
    dayOffset++;
  }
  console.log("seed: ensured blog posts in 4 languages.");
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

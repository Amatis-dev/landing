# -*- coding: utf-8 -*-
"""
Generates one dedicated page per service for amatisberry.ir.

- Reads service copy from services_data.py + services_data_more.py
- Downloads a themed image per service (loremflickr) into public/assets/images/svc/
- Writes public/<file>.html for every service, based on the shared site template
- Injects per-service i18n keys (svc.*) into public/assets/js/i18n.js (en/de/fa/ar)
- Repoints the desktop megamenu in all *.html pages to the new pages
- Makes the offer cards on what-we-offer.html link to the new pages

Run from the repository root:  python3 scripts/generate_service_pages.py
Idempotent: safe to re-run (images are not re-downloaded when present).
"""
import io
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
IMG_DIR = os.path.join(PUBLIC, "assets", "images", "svc")
I18N_PATH = os.path.join(PUBLIC, "assets", "js", "i18n.js")

sys.path.insert(0, os.path.join(ROOT, "scripts"))
from services_data import SERVICES  # noqa: E402
from services_data_more import SERVICES_ALL  # noqa: E402

SERVICES = list(SERVICES) + list(SERVICES_ALL)

# key -> page file for the desktop megamenu + offer cards
LINK_MAP = {
    "services.apps.android": "android-app.html",
    "services.apps.ios": "ios-app.html",
    "services.apps.pwa": "web-app-pwa.html",
    "services.apps.ecom": "ecommerce-app.html",
    "services.apps.classifieds": "classifieds-app.html",
    "services.apps.reader": "book-reader-app.html",
    "services.apps.tourism": "tourism-app.html",
    "services.apps.taxi": "taxi-app.html",
    "services.apps.booking": "flight-hotel-app.html",
    "services.websites.corporate": "corporate-website.html",
    "services.websites.classifieds": "classifieds-website.html",
    "services.websites.marketplace": "marketplace-website.html",
    "services.websites.store": "online-store.html",
    "services.websites.restaurant": "restaurant-website.html",
    "services.websites.news": "news-website.html",
    "services.websites.medical": "medical-website.html",
    "services.websites.tourism": "tourism-website.html",
    "services.websites.reader": "book-reader-website.html",
    "services.websites.wordpress": "wordpress.html",
    "services.ecommerce.store": "online-store.html",
    "services.ecommerce.marketplace": "marketplace-website.html",
    "services.ecommerce.subscription": "subscription-store.html",
    "services.ecommerce.shopify": "shopify-store.html",
    "services.blockchain.cex": "crypto-exchange.html",
    "services.blockchain.dex": "dex.html",
    "services.blockchain.p2p": "p2p-exchange.html",
    "services.blockchain.otc": "otc-exchange.html",
    "services.blockchain.gateway": "crypto-payment-gateway.html",
    "services.blockchain.contracts": "smart-contracts.html",
    "services.blockchain.airdrop": "airdrop-platform.html",
    "services.blockchain.app": "exchange-app.html",
    "services.more.uiux": "uiux-design.html",
    "services.more.seo": "seo-marketing.html",
    "services.more.dashboards": "dashboards-admin.html",
    "services.more.support": "maintenance-support.html",
}

CAT_TITLE_KEY = {
    "apps": "services.apps.title",
    "websites": "services.websites.title",
    "ecommerce": "services.ecommerce.title",
    "blockchain": "services.blockchain.title",
    "more": "services.more.title",
}

LOCALES = ["en", "de", "fa", "ar"]
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"

TICK_SVG = (
    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
    'stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
)


def slug_to_js(slug):
    parts = slug.split("-")
    return parts[0] + "".join(p.capitalize() for p in parts[1:])


# ---------------------------------------------------------------------------
# Megamenu (desktop) with per-service page links
# ---------------------------------------------------------------------------
def build_dropdown():
    cat_order = ["apps", "websites", "ecommerce", "blockchain"]
    by_cat = {}
    for svc in SERVICES:
        by_cat.setdefault(svc["cat"], []).append(svc)

    cols = []
    for cat in cat_order:
        items = by_cat.get(cat, [])
        cols.append((CAT_TITLE_KEY[cat], items, cat))

    more_items = by_cat.get("more", [])

    def col_html(title_key, items, cat):
        out = ['                <div class="nav-dd-col">']
        out.append('                  <p class="nav-dd-title" data-i18n="%s">%s</p>' % (title_key, LABELS[title_key]))
        for svc in items:
            key = svc["title_key"]
            out.append('                  <a href="%s"><span data-i18n="%s">%s</span></a>' % (svc["file"], key, LABELS[key]))
        out.append("                </div>")
        return "\n".join(out)

    more_html = ['                <div class="nav-dd-more">']
    more_html.append('                  <span class="nav-dd-more-label" data-i18n="services.more.title">%s</span>' % LABELS["services.more.title"])
    for svc in more_items:
        key = svc["title_key"]
        more_html.append('                  <a href="%s"><span data-i18n="%s">%s</span></a>' % (svc["file"], key, LABELS[key]))
    more_html.append("                </div>")

    parts = ['        <div class="nav-dropdown">']
    parts.append('          <span class="nav-pill" data-nav-key="what-we-offer" tabindex="0">')
    parts.append('            <span data-i18n="nav.whatWeOffer">What We Offer</span>')
    parts.append('            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>')
    parts.append("          </span>")
    parts.append('          <div class="nav-dropdown-panel">')
    parts.append("            <div class=\"nav-dropdown-panel-inner\">")
    parts.append("              <div class=\"nav-dd-grid\">")
    for title_key, items, cat in cols:
        parts.append(col_html(title_key, items, cat))
    parts.append("              </div>")
    parts.extend(more_html)
    parts.append('              <a class="nav-dd-cta" href="what-we-offer.html" data-i18n="services.viewAll">View All Services</a>')
    parts.append("            </div>")
    parts.append("          </div>")
    parts.append("        </div>")
    return "\n".join(parts) + "\n"


# Labels used as static fallback text (English) in menus.
LABELS = {
    "services.apps.title": "App Development",
    "services.websites.title": "Website Design",
    "services.ecommerce.title": "E-commerce",
    "services.blockchain.title": "Blockchain & Crypto",
    "services.more.title": "More Services",
}
for svc in SERVICES:
    cat = svc["cat"]
    for sub in svc["title_key"].split(".")[-1:]:
        pass
    LABELS[svc["title_key"]] = svc["title_en"]


# ---------------------------------------------------------------------------
# Shared header / footer / page template
# ---------------------------------------------------------------------------
HEADER_TOP = """  <!-- ======================= HEADER ======================= -->
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html" data-nav-key="home">
        <span class="brand-mark">AB</span>
        <span class="brand-word" data-i18n="brand">AmatisBerry</span>
      </a>

      <nav class="site-nav" aria-label="Main navigation">
        <a class="nav-pill" href="index.html" data-nav-key="home" data-i18n="nav.home">Home</a>
        <a class="nav-pill" href="showcase.html" data-nav-key="showcase" data-i18n="nav.showcase">Showcase</a>
"""

HEADER_MID = """        <a class="nav-pill" href="pricing.html" data-nav-key="pricing" data-i18n="nav.pricing">Plans &amp; Prices</a>
        <a class="nav-pill" href="blogs.html" data-nav-key="blogs" data-i18n="nav.blogs">Blogs</a>
        <a class="nav-pill" href="who-are-we.html" data-nav-key="who-are-we" data-i18n="nav.whoAreWe">Who Are We</a>
        <a class="nav-pill" href="connect-with-us.html" data-nav-key="connect" data-i18n="nav.connect">Connect With Us</a>
      </nav>

      <div class="header-actions">
        <div class="lang-switcher">
          <button class="lang-trigger" type="button" aria-haspopup="true" aria-label="Choose language">
            <span class="lang-globe">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </span>
            <span class="lang-label" data-lang-label>English</span>
            <span class="lang-caret">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </span>
          </button>
          <div class="lang-panel">
            <button class="lang-option" type="button" data-lang-option="en">
              <span class="lang-meta"><span class="lang-code" data-lang-code>EN</span><span data-lang-name>English</span></span>
              <span class="lang-active-pill" data-lang-active>Active</span>
            </button>
            <button class="lang-option" type="button" data-lang-option="de">
              <span class="lang-meta"><span class="lang-code" data-lang-code>DE</span><span data-lang-name>Deutsch</span></span>
              <span class="lang-active-pill" data-lang-active>Active</span>
            </button>
            <button class="lang-option" type="button" data-lang-option="fa">
              <span class="lang-meta"><span class="lang-code" data-lang-code>FA</span><span data-lang-name>فارسی</span></span>
              <span class="lang-active-pill" data-lang-active>Active</span>
            </button>
            <button class="lang-option" type="button" data-lang-option="ar">
              <span class="lang-meta"><span class="lang-code" data-lang-code>AR</span><span data-lang-name>العربية</span></span>
              <span class="lang-active-pill" data-lang-active>Active</span>
            </button>
          </div>
        </div>

        <button class="icon-btn" type="button" data-theme-toggle aria-label="Switch theme">
          <svg class="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <svg class="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
        </button>

        <button class="hamburger" type="button" aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </div>
  </header>
"""

MOBILE_MENU = """  <!-- ======================= MOBILE MENU ======================= -->
  <nav class="mobile-menu" aria-label="Mobile navigation">
    <a href="index.html" data-nav-key="home" data-i18n="nav.home">Home</a>
    <div>
      <button class="mm-acc" type="button">
        <span data-i18n="nav.whatWeOffer">What We Offer</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="mm-sub">
        <a href="what-we-offer.html#apps" data-i18n="services.apps.title">App Development</a>
        <a href="what-we-offer.html#websites" data-i18n="services.websites.title">Website Design</a>
        <a href="what-we-offer.html#ecommerce" data-i18n="services.ecommerce.title">E-commerce</a>
        <a href="what-we-offer.html#blockchain" data-i18n="services.blockchain.title">Blockchain &amp; Crypto</a>
        <a href="what-we-offer.html#more" data-i18n="services.more.title">More Services</a>
        <a href="what-we-offer.html" data-i18n="services.viewAll">View All Services</a>
      </div>
    </div>
    <a href="pricing.html" data-nav-key="pricing" data-i18n="nav.pricing">Plans &amp; Prices</a>
    <a href="showcase.html" data-nav-key="showcase" data-i18n="nav.showcase">Showcase</a>
    <a href="blogs.html" data-nav-key="blogs" data-i18n="nav.blogs">Blogs</a>
    <a href="who-are-we.html" data-nav-key="who-are-we" data-i18n="nav.whoAreWe">Who Are We</a>
    <a href="connect-with-us.html" data-nav-key="connect" data-i18n="nav.connect">Connect With Us</a>
  </nav>
"""

FOOTER = """  <!-- ======================= FOOTER ======================= -->
  <footer class="site-footer">
    <div class="container-page">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="brand" href="index.html">
            <span class="brand-mark">AB</span>
            <span class="brand-word" data-i18n="brand">AmatisBerry</span>
          </a>
          <p data-i18n="footer.tagline">AmatisBerry is a business consultancy agency helping companies grow with strategy, marketing and technology.</p>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.colServices">Services</h4>
          <ul>
            <li><a href="what-we-offer.html" data-i18n="footer.links.services.0">What We Offer</a></li>
            <li><a href="what-we-offer.html#apps" data-i18n="services.apps.title">App Development</a></li>
            <li><a href="what-we-offer.html#websites" data-i18n="services.websites.title">Website Design</a></li>
            <li><a href="what-we-offer.html#blockchain" data-i18n="services.blockchain.title">Blockchain &amp; Crypto</a></li>
            <li><a href="pricing.html" data-i18n="nav.pricing">Plans &amp; Prices</a></li>
            <li><a href="blogs.html" data-i18n="footer.links.services.3">Blogs</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.colCompany">Company</h4>
          <ul>
            <li><a href="index.html" data-i18n="footer.links.company.0">Home</a></li>
            <li><a href="showcase.html" data-i18n="footer.links.company.1">Showcase</a></li>
            <li><a href="who-are-we.html" data-i18n="footer.links.company.2">Who Are We</a></li>
            <li><a href="connect-with-us.html" data-i18n="footer.links.company.3">Connect With Us</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.colContact">Contact</h4>
          <ul>
            <li><a href="index.html#schedule" data-i18n="footer.links.contact.0">Schedule a Call</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span data-i18n="footer.rights">© {year} AmatisBerry. All rights reserved.</span>
        <div class="footer-langs">
          <a href="index.html" data-footer-lang="en">English</a><span class="sep">/</span>
          <a href="index.html" data-footer-lang="de">Deutsch</a><span class="sep">/</span>
          <a href="index.html" data-footer-lang="fa">فارسی</a><span class="sep">/</span>
          <a href="index.html" data-footer-lang="ar">العربية</a>
        </div>
      </div>
    </div>
  </footer>
"""

BACK_TO_TOP = """  <!-- ======================= BACK TO TOP ======================= -->
  <button class="back-to-top" type="button" aria-label="Back to top">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 15 6-6 6 6"/></svg>
  </button>
"""


def esc(text):
    return (text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            .replace('"', "&quot;"))


# ---------------------------------------------------------------------------
# Images
# ---------------------------------------------------------------------------
FALLBACKS = {
    "apps": "assets/images/service-1.jpg",
    "websites": "assets/images/service-2.jpg",
    "ecommerce": "assets/images/our-service-1.png",
    "blockchain": "assets/images/protfolio-1.jpg",
    "more": "assets/images/service-3.png",
}


def download_image(slug, keyword):
    os.makedirs(IMG_DIR, exist_ok=True)
    dest = os.path.join(IMG_DIR, slug + ".jpg")
    if os.path.exists(dest) and os.path.getsize(dest) > 15000:
        return "assets/images/svc/" + slug + ".jpg"
    url = "https://loremflickr.com/1200/800/%s" % keyword
    try:
        r = subprocess.run(
            ["curl", "-sL", "-m", "40", "-A", UA, "-o", dest, url],
            capture_output=True, timeout=60,
        )
        if r.returncode != 0:
            return None
        if os.path.getsize(dest) < 15000:
            os.remove(dest)
            return None
        with open(dest, "rb") as f:
            head = f.read(12)
        if b"\xff\xd8" not in head and b"PNG" not in head:
            os.remove(dest)
            return None
        return "assets/images/svc/" + slug + ".jpg"
    except Exception:
        return None


# ---------------------------------------------------------------------------
# Page generation
# ---------------------------------------------------------------------------
def build_page(svc, img):
    slug = svc["file"][:-5]  # strip .html
    js_slug = slug_to_js(slug)  # camelCase key used in i18n.js (svc.*)
    en = svc["c"]["en"]
    title = esc(svc["title_en"])
    head_meta = """    <title>%s · AmatisBerry</title>
   <meta name="description" content="%s">""" % (esc(svc["title_en"]), esc(svc["desc"]))

    features = "\n".join(
        '              <li><span class="tick">%s</span><span data-i18n="svc.%s.f%d">%s</span></li>'
        % (TICK_SVG, js_slug, i, esc(en["f%d" % i])) for i in range(1, 6)
    )

    body = """    <section class="page-hero">
      <div class="hero-grid-pattern"></div>
      <div class="container-page">
        <span class="kicker-pill"><span class="dot"></span><span data-i18n="%(cat_title)s"></span></span>
        <h1 data-i18n="%(title_key)s">%(title)s</h1>
        <p data-i18n="svc.%(slug)s.subtitle">%(subtitle)s</p>
      </div>
    </section>
    <section class="py-section">
      <div class="container-page">
        <div class="split-layout">
          <div class="detail-body reveal">
            <span class="kicker-pill"><span class="dot"></span><span data-i18n="%(cat_title)s"></span></span>
            <h2 data-i18n="%(title_key)s">%(title)s</h2>
            <p data-i18n="svc.%(slug)s.p1">%(p1)s</p>
            <ul class="feature-list">
%(features)s
            </ul>
            <p data-i18n="svc.%(slug)s.p2">%(p2)s</p>
            <div class="detail-cta">
              <a class="btn-primary lg" href="connect-with-us.html" data-i18n="services.ctaButton">Book a Free Consultation</a>
            </div>
          </div>
          <div class="split-media reveal"><img src="%(img)s" alt="%(title)s"></div>
        </div>
      </div>
    </section>
    <section class="py-section">
      <div class="container-page">
        <div class="schedule-panel reveal">
          <div>
            <h2 data-i18n="services.ctaTitle">Ready to start your project?</h2>
          </div>
          <div class="schedule-actions">
            <a class="btn-white" href="connect-with-us.html" data-i18n="services.ctaButton">Book a Free Consultation</a>
          </div>
        </div>
      </div>
    </section>
""" % {
        "cat_title": CAT_TITLE_KEY[svc["cat"]],
        "title_key": svc["title_key"],
        "title": title,
        "slug": js_slug,
        "subtitle": esc(en["subtitle"]),
        "p1": esc(en["p1"]),
        "p2": esc(en["p2"]),
        "features": features,
        "img": img,
    }

    dropdown = DROPDOWN_BLOCK
    html = """<!doctype html>
<html lang="fa" dir="rtl" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
%(head_meta)s
  <link rel="shortcut icon" href="assets/images/favicon.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@600;700;800;900;1000&family=Vazirmatn:wght@600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>

%(header_top)s
%(dropdown)s
%(header_mid)s
%(mobile_menu)s

  <main>
%(body)s
  </main>
%(footer)s
%(back_to_top)s

  <script src="assets/js/i18n.js"></script>
  <script src="assets/js/main.js"></script>
  <!-- ======================= GOATCOUNTER ANALYTICS ======================= -->
  <script data-goatcounter="https://amatis.goatcounter.com/count"
          async src="//gc.zgo.at/count.js"></script>
</body>
</html>
""" % {
        "head_meta": head_meta,
        "header_top": HEADER_TOP,
        "dropdown": dropdown,
        "header_mid": HEADER_MID,
        "mobile_menu": MOBILE_MENU,
        "body": body,
        "footer": FOOTER,
        "back_to_top": BACK_TO_TOP,
    }
    return html


# ---------------------------------------------------------------------------
# i18n authoring
# ---------------------------------------------------------------------------
def js_str(value):
    value = value.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ")
    return '"%s"' % value


def js_obj(fields):
    return ",\n".join("        %s: %s" % (k, js_str(v)) for k, v in fields.items())


def build_svc_block(locale):
    lines = ["    /*__SVC_START__*/", "    svc: {"]
    for svc in SERVICES:
        slug = svc["file"][:-5]
        js_name = slug_to_js(slug)
        c = svc["c"][locale]
        fields = {}
        for key in ["subtitle", "p1", "p2"]:
            fields[key] = c[key]
        for i in range(1, 6):
            fields["f%d" % i] = c["f%d" % i]
        lines.append("      %s: {" % js_name)
        lines.append(js_obj(fields))
        lines.append("      },")
    lines.append("    },")
    lines.append("    /*__SVC_END__*/")
    return "\n".join(lines)


def inject_svc(i18n_content):
    """Replace the sentinel-wrapped svc block for each locale (safe, brace-preserving)."""
    i18n_content = re.sub(
        r'/\*__SVC_START__\*/[\s\S]*?/\*__SVC_END__\*/', '', i18n_content)
    out = []
    for loc in LOCALES:
        marker = "    %s: {\n" % loc
        idx = i18n_content.index(marker)
        out.append(i18n_content[: idx + len(marker)])
        out.append(build_svc_block(loc))
        i18n_content = i18n_content[idx + len(marker):]
    out.append(i18n_content)
    return "".join(out)


# ---------------------------------------------------------------------------
# Patch existing pages
# ---------------------------------------------------------------------------
def patch_nav_hrefs(content):
    """Point each megamenu service link to its dedicated page."""
    for key, page in LINK_MAP.items():
        content = content.replace(
            '<a href="what-we-offer.html#apps"><span data-i18n="%s">' % key, '<a href="%s"><span data-i18n="%s">' % (page, key))
    # the old nav always linked to the category anchor; also catch generic anchors
    content = re.sub(r'<a href="what-we-offer\.html#(apps|websites|ecommerce|blockchain|more)"><span data-i18n="(services\.[a-z0-9]+\.[a-z0-9]+)">',
                     lambda m: '<a href="%s"><span data-i18n="%s">' % (LINK_MAP.get(m.group(2), "what-we-offer.html#%s" % m.group(1)), m.group(2)),
                     content)
    return content


def patch_offer_cards(content):
    """Make every offer card on what-we-offer.html link to its page."""
    pattern = re.compile(
        r'<article class="offer-card card-hover reveal">(.*?)</article>', re.DOTALL)

    def repl(m):
        inner = m.group(1)
        km = re.search(r'data-i18n="(services\.[a-z0-9]+\.[a-z0-9]+)"', inner)
        if km and km.group(1) in LINK_MAP:
            page = LINK_MAP[km.group(1)]
            return '<a class="offer-card card-hover reveal" href="%s">%s</a>' % (page, inner)
        return m.group(0)

    return pattern.sub(repl, content)


def patch_html_file(path):
    with io.open(path, "r", encoding="utf-8") as f:
        content = f.read()
    new = patch_nav_hrefs(content)
    if "offer-card" in new:
        new = patch_offer_cards(new)
    if new != content:
        with io.open(path, "w", encoding="utf-8") as f:
            f.write(new)
        return True
    return False


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    global DROPDOWN_BLOCK
    DROPDOWN_BLOCK = build_dropdown()

    # 1. images
    img_status = []
    for svc in SERVICES:
        img = download_image(svc["file"][:-5], svc["img"])
        if not img:
            img = FALLBACKS[svc["cat"]]
            img_status.append("FALLBACK %-40s %s" % (svc["file"], svc["img"]))
        else:
            img_status.append("ok       %-40s %s" % (svc["file"], svc["img"]))
        svc["_img"] = img
    print("== images ==")
    print("\n".join(img_status))

    # 2. pages
    written = []
    for svc in SERVICES:
        path = os.path.join(PUBLIC, svc["file"])
        content = build_page(svc, svc["_img"])
        with io.open(path, "w", encoding="utf-8") as f:
            f.write(content)
        written.append(svc["file"])
    print("== generated %d pages ==" % len(written))
    print(" ".join(written))

    # 3. i18n
    with io.open(I18N_PATH, "r", encoding="utf-8") as f:
        i18n = f.read()
    new_i18n = inject_svc(i18n)
    if new_i18n != i18n:
        with io.open(I18N_PATH, "w", encoding="utf-8") as f:
            f.write(new_i18n)
        print("== i18n.js updated ==")
    else:
        print("== i18n.js unchanged ==")

    # 4. patch existing pages
    patched = []
    for fn in sorted(os.listdir(PUBLIC)):
        if fn.endswith(".html"):
            p = os.path.join(PUBLIC, fn)
            if patch_html_file(p):
                patched.append(fn)
    print("== patched pages ==")
    print(" ".join(patched))

    print("DONE")


if __name__ == "__main__":
    main()
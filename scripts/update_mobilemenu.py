import glob

OLD_MM_SUB = '''      <div class="mm-sub">
        <a href="web-design.html" data-i18n="nav.webDesign">Web Design</a>
        <a href="wordpress.html" data-i18n="nav.wordpress">WordPress Website</a>
      </div>'''

NEW_MM_SUB = '''      <div class="mm-sub">
        <a href="what-we-offer.html#apps" data-i18n="services.apps.title">App Development</a>
        <a href="what-we-offer.html#websites" data-i18n="services.websites.title">Website Design</a>
        <a href="what-we-offer.html#ecommerce" data-i18n="services.ecommerce.title">E-commerce</a>
        <a href="what-we-offer.html#blockchain" data-i18n="services.blockchain.title">Blockchain &amp; Crypto</a>
        <a href="what-we-offer.html#more" data-i18n="services.more.title">More Services</a>
        <a href="what-we-offer.html" data-i18n="services.viewAll">View All Services</a>
      </div>'''

for path in sorted(glob.glob("*.html")):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    if OLD_MM_SUB not in content:
        print(f"SKIP (mm-sub not found): {path}")
        continue
    content = content.replace(OLD_MM_SUB, NEW_MM_SUB)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"UPDATED: {path}")

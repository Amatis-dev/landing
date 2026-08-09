import glob

OLD_FOOTER = '''            <li><a href="what-we-offer.html" data-i18n="footer.links.services.0">What We Offer</a></li>
            <li><a href="web-design.html" data-i18n="footer.links.services.1">Web Design</a></li>
            <li><a href="wordpress.html" data-i18n="footer.links.services.2">WordPress Website</a></li>
            <li><a href="blogs.html" data-i18n="footer.links.services.3">Blogs</a></li>'''

NEW_FOOTER = '''            <li><a href="what-we-offer.html" data-i18n="footer.links.services.0">What We Offer</a></li>
            <li><a href="what-we-offer.html#apps" data-i18n="services.apps.title">App Development</a></li>
            <li><a href="what-we-offer.html#websites" data-i18n="services.websites.title">Website Design</a></li>
            <li><a href="what-we-offer.html#blockchain" data-i18n="services.blockchain.title">Blockchain &amp; Crypto</a></li>
            <li><a href="blogs.html" data-i18n="footer.links.services.3">Blogs</a></li>'''

for path in sorted(glob.glob("*.html")):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    if OLD_FOOTER not in content:
        print(f"SKIP (footer not found): {path}")
        continue
    content = content.replace(OLD_FOOTER, NEW_FOOTER)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"UPDATED: {path}")

import glob

OLD_START = '        <div class="nav-dropdown">'
OLD_END = "        </div>\n"

NEW_BLOCK = '''        <div class="nav-dropdown">
          <span class="nav-pill" data-nav-key="what-we-offer" tabindex="0">
            <span data-i18n="nav.whatWeOffer">What We Offer</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </span>
          <div class="nav-dropdown-panel">
            <div class="nav-dropdown-panel-inner">
              <div class="nav-dd-grid">
                <div class="nav-dd-col">
                  <p class="nav-dd-title" data-i18n="services.apps.title">App Development</p>
                  <a href="what-we-offer.html#apps"><span data-i18n="services.apps.android">Android App</span></a>
                  <a href="what-we-offer.html#apps"><span data-i18n="services.apps.ios">iOS App</span></a>
                  <a href="what-we-offer.html#apps"><span data-i18n="services.apps.pwa">Web App &amp; PWA</span></a>
                  <a href="what-we-offer.html#apps"><span data-i18n="services.apps.ecom">E-commerce App</span></a>
                  <a href="what-we-offer.html#apps"><span data-i18n="services.apps.classifieds">Classifieds App</span></a>
                  <a href="what-we-offer.html#apps"><span data-i18n="services.apps.reader">Book Reader App</span></a>
                  <a href="what-we-offer.html#apps"><span data-i18n="services.apps.tourism">Tourism App</span></a>
                  <a href="what-we-offer.html#apps"><span data-i18n="services.apps.taxi">Taxi Booking App</span></a>
                  <a href="what-we-offer.html#apps"><span data-i18n="services.apps.booking">Flight &amp; Hotel Booking</span></a>
                </div>
                <div class="nav-dd-col">
                  <p class="nav-dd-title" data-i18n="services.websites.title">Website Design</p>
                  <a href="what-we-offer.html#websites"><span data-i18n="services.websites.corporate">Corporate Website</span></a>
                  <a href="what-we-offer.html#websites"><span data-i18n="services.websites.classifieds">Classifieds Website</span></a>
                  <a href="what-we-offer.html#websites"><span data-i18n="services.websites.marketplace">Marketplace Website</span></a>
                  <a href="what-we-offer.html#websites"><span data-i18n="services.websites.store">Online Store</span></a>
                  <a href="what-we-offer.html#websites"><span data-i18n="services.websites.restaurant">Restaurant Website</span></a>
                  <a href="what-we-offer.html#websites"><span data-i18n="services.websites.news">News Website</span></a>
                  <a href="what-we-offer.html#websites"><span data-i18n="services.websites.medical">Medical Website</span></a>
                  <a href="what-we-offer.html#websites"><span data-i18n="services.websites.tourism">Tourism Website</span></a>
                  <a href="what-we-offer.html#websites"><span data-i18n="services.websites.reader">Book Reader Website</span></a>
                  <a href="what-we-offer.html#websites"><span data-i18n="services.websites.wordpress">WordPress Website</span></a>
                </div>
                <div class="nav-dd-col">
                  <p class="nav-dd-title" data-i18n="services.ecommerce.title">E-commerce</p>
                  <a href="what-we-offer.html#ecommerce"><span data-i18n="services.ecommerce.store">Online Store</span></a>
                  <a href="what-we-offer.html#ecommerce"><span data-i18n="services.ecommerce.marketplace">Multi-vendor Marketplace</span></a>
                  <a href="what-we-offer.html#ecommerce"><span data-i18n="services.ecommerce.subscription">Subscription Store</span></a>
                  <a href="what-we-offer.html#ecommerce"><span data-i18n="services.ecommerce.shopify">Shopify Store</span></a>
                </div>
                <div class="nav-dd-col">
                  <p class="nav-dd-title" data-i18n="services.blockchain.title">Blockchain &amp; Crypto</p>
                  <a href="what-we-offer.html#blockchain"><span data-i18n="services.blockchain.cex">Crypto Exchange</span></a>
                  <a href="what-we-offer.html#blockchain"><span data-i18n="services.blockchain.dex">Decentralized Exchange (DEX)</span></a>
                  <a href="what-we-offer.html#blockchain"><span data-i18n="services.blockchain.p2p">P2P Exchange</span></a>
                  <a href="what-we-offer.html#blockchain"><span data-i18n="services.blockchain.otc">OTC Exchange</span></a>
                  <a href="what-we-offer.html#blockchain"><span data-i18n="services.blockchain.gateway">Crypto Payment Gateway</span></a>
                  <a href="what-we-offer.html#blockchain"><span data-i18n="services.blockchain.contracts">Smart Contracts &amp; Tokens</span></a>
                  <a href="what-we-offer.html#blockchain"><span data-i18n="services.blockchain.airdrop">Airdrop Platform</span></a>
                  <a href="what-we-offer.html#blockchain"><span data-i18n="services.blockchain.app">Exchange App</span></a>
                </div>
              </div>
              <div class="nav-dd-more">
                <span class="nav-dd-more-label" data-i18n="services.more.title">More Services</span>
                <a href="what-we-offer.html#more"><span data-i18n="services.more.uiux">UI/UX Design</span></a>
                <a href="what-we-offer.html#more"><span data-i18n="services.more.seo">SEO &amp; Digital Marketing</span></a>
                <a href="what-we-offer.html#more"><span data-i18n="services.more.dashboards">Dashboards &amp; Admin Panels</span></a>
                <a href="what-we-offer.html#more"><span data-i18n="services.more.support">Maintenance &amp; Support</span></a>
              </div>
              <a class="nav-dd-cta" href="what-we-offer.html" data-i18n="services.viewAll">View All Services</a>
            </div>
          </div>
        </div>
'''

files = sorted(glob.glob("*.html"))
for path in files:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    start = content.index(OLD_START)
    end = content.index(OLD_END, start) + len(OLD_END)
    old_block = content[start:end]
    if "nav-dd-grid" in old_block:
        print(f"SKIP (already updated): {path}")
        continue
    new_content = content[:start] + NEW_BLOCK + content[end:]
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"UPDATED: {path}")

/* ============================================================
   Amatis — i18n engine
   Languages: en (default), de, fa, ar
   ============================================================ */
window.AMATIS_I18N = (function () {
  "use strict";

  var locales = ["en", "de", "fa", "ar"];
  var defaultLocale = "fa";
  var langKey = "amatis-lang";
  var rtl = { fa: true, ar: true };

  var labels = {
    en: "English",
    de: "Deutsch",
    fa: "\u0641\u0627\u0631\u0633\u06cc",
    ar: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
  };
  var codes = { en: "EN", de: "DE", fa: "FA", ar: "AR" };

  var dict = {
    en: {
      meta: {
        title: "Amatis \u00b7 Business Consultancy Agency",
        description:
          "Amatis is a business consultancy agency helping companies grow with strategy, marketing and technology.",
      },
      brand: "Amatis",
      nav: {
        home: "Home",
        showcase: "Showcase",
        whatWeOffer: "What We Offer",
        webDesign: "Web Design",
        wordpress: "WordPress Website",
        blogs: "Blogs",
        whoAreWe: "Who Are We",
        connect: "Connect With Us",
        pricing: "Plans & Prices",
        chooseLanguage: "Choose language",
        active: "Active",
      },

      services: {
        "title": "Our Services",
        "subtitle": "Every kind of digital product your business needs — built end-to-end.",
        "viewAll": "View All Services",
        "apps": {
          "title": "App Development",
          "lead": "Native Android & iOS, cross-platform and web apps built with modern stacks.",
          "android": "Android App",
          "ios": "iOS App",
          "pwa": "Web App & PWA",
          "ecom": "E-commerce App",
          "classifieds": "Classifieds App",
          "reader": "Book Reader App",
          "tourism": "Tourism App",
          "taxi": "Taxi Booking App",
          "booking": "Flight & Hotel Booking"
        },
        "websites": {
          "title": "Website Design",
          "lead": "Custom-coded or WordPress websites for every industry.",
          "corporate": "Corporate Website",
          "classifieds": "Classifieds Website",
          "marketplace": "Marketplace Website",
          "store": "Online Store",
          "restaurant": "Restaurant Website",
          "news": "News Website",
          "medical": "Medical Website",
          "tourism": "Tourism Website",
          "reader": "Book Reader Website",
          "wordpress": "WordPress Website"
        },
        "ecommerce": {
          "title": "E-commerce",
          "lead": "Online stores and marketplaces with payments built in.",
          "store": "Online Store",
          "marketplace": "Multi-vendor Marketplace",
          "subscription": "Subscription Store",
          "shopify": "Shopify Store"
        },
        "blockchain": {
          "title": "Blockchain & Crypto",
          "lead": "Exchanges, payment gateways and smart contracts on blockchain.",
          "cex": "Crypto Exchange",
          "dex": "Decentralized Exchange (DEX)",
          "p2p": "P2P Exchange",
          "otc": "OTC Exchange",
          "gateway": "Crypto Payment Gateway",
          "contracts": "Smart Contracts & Tokens",
          "airdrop": "Airdrop Platform",
          "app": "Exchange App"
        },
        "more": {
          "title": "More Services",
          "lead": "Design, growth and care that keeps your product ahead.",
          "uiux": "UI/UX Design",
          "seo": "SEO & Digital Marketing",
          "dashboards": "Dashboards & Admin Panels",
          "support": "Maintenance & Support"
        }
      },
      pricing: {
        "title": "Plans & Prices",
        "subtitle": "Transparent, fixed-price plans for every service we build — start to launch.",
        "cta": "Free Consultation",
        "from": "from",
        "unit": "M Toman",
        "apps": {
          "title": "App Development",
          "lead": "Pick the plan that matches your product stage — from MVP to full-scale platform.",
          "plans": [
            {
              "name": "Starter App",
              "tag": "MVP & single platform",
              "old": "110",
              "price": "90",
              "features": [
                "Native Android or iOS",
                "MVP scope & core flows",
                "Standard UI/UX",
                "Basic admin panel",
                "Store submission",
                "1 month of support"
              ]
            },
            {
              "name": "Professional App",
              "tag": "Most popular",
              "old": "170",
              "price": "140",
              "features": [
                "Android + iOS",
                "Custom UI/UX design",
                "Admin panel & dashboard",
                "Payments & push notifications",
                "Analytics integration",
                "3 months of support"
              ]
            },
            {
              "name": "Enterprise App",
              "tag": "Full-scale platform",
              "old": "250",
              "price": "210",
              "features": [
                "Cross-platform or native",
                "Offline & sync capabilities",
                "Advanced admin & reports",
                "Third-party integrations",
                "Security & performance audit",
                "12 months of support"
              ]
            }
          ]
        },
        "websites": {
          "title": "Website Design",
          "lead": "Sites that convert — from landing pages to full editorial platforms.",
          "plans": [
            {
              "name": "Starter Website",
              "tag": "Up to 8 pages",
              "old": "50",
              "price": "40",
              "features": [
                "Responsive design",
                "Up to 8 pages",
                "Contact form",
                "Basic SEO setup",
                "Speed optimization",
                "1 month of support"
              ]
            },
            {
              "name": "Business Website",
              "tag": "CMS & blog",
              "old": "90",
              "price": "70",
              "features": [
                "Up to 20 pages",
                "CMS / WordPress",
                "Blog & news section",
                "Multi-language",
                "Analytics & forms",
                "3 months of support"
              ]
            },
            {
              "name": "Custom Platform",
              "tag": "Web app & dashboard",
              "old": "150",
              "price": "120",
              "features": [
                "Custom web application",
                "User accounts & roles",
                "API integrations",
                "Advanced dashboard",
                "Custom modules",
                "6 months of support"
              ]
            }
          ]
        },
        "ecommerce": {
          "title": "E-commerce",
          "lead": "Stores and marketplaces built to sell — carts, payments and fulfillment included.",
          "plans": [
            {
              "name": "Basic Store",
              "tag": "Launch your shop",
              "old": "100",
              "price": "80",
              "features": [
                "Product catalog",
                "Cart & checkout",
                "One payment gateway",
                "Order management",
                "Customer accounts",
                "1 month of support"
              ]
            },
            {
              "name": "Advanced Store",
              "tag": "Scale & optimize",
              "old": "160",
              "price": "130",
              "features": [
                "Multiple gateways",
                "Discount & coupon engine",
                "Inventory & warehouse",
                "Shipping & tracking",
                "Reports & analytics",
                "3 months of support"
              ]
            },
            {
              "name": "Marketplace",
              "tag": "Multi-vendor",
              "old": "260",
              "price": "220",
              "features": [
                "Multi-vendor selling",
                "Seller panels & commissions",
                "Escrow & payouts",
                "Reviews & ratings",
                "Returns management",
                "6 months of support"
              ]
            }
          ]
        },
        "blockchain": {
          "title": "Blockchain & Crypto",
          "lead": "Secure exchanges, gateways and smart contracts on leading networks.",
          "plans": [
            {
              "name": "Token & Contracts",
              "tag": "Erc-20 / bep-20",
              "old": "110",
              "price": "90",
              "features": [
                "Token development",
                "Smart contracts",
                "Staking or airdrop",
                "Wallet integration",
                "Audit support",
                "1 month of support"
              ]
            },
            {
              "name": "Payment Gateway",
              "tag": "Accept crypto",
              "old": "190",
              "price": "160",
              "features": [
                "Crypto payment gateway",
                "Merchant dashboard",
                "API & plugins",
                "Automatic settlement",
                "Multi-currency",
                "3 months of support"
              ]
            },
            {
              "name": "Crypto Exchange",
              "tag": "CEX / OTC / P2P",
              "old": "320",
              "price": "280",
              "features": [
                "Order book engine",
                "Wallets & KYC",
                "P2P / OTC trading",
                "Admin panel",
                "Security hardening",
                "6 months of support"
              ]
            }
          ]
        },
        "more": {
          "title": "More Services",
          "lead": "Design, growth and care that keeps your product ahead of the competition.",
          "plans": [
            {
              "name": "UI/UX Design",
              "tag": "Design system",
              "old": "75",
              "price": "60",
              "features": [
                "UX audit & research",
                "Wireframes & prototypes",
                "Design system",
                "Interactive mockups",
                "Developer handoff",
                "Revision rounds"
              ]
            },
            {
              "name": "SEO & Marketing",
              "tag": "Growth plan",
              "old": "65",
              "price": "50",
              "features": [
                "Technical SEO",
                "Keyword strategy",
                "Content plan",
                "Performance tracking",
                "Monthly reporting",
                "Ad campaign setup"
              ]
            },
            {
              "name": "Maintenance & Support",
              "tag": "Monthly care",
              "old": "30",
              "price": "25",
              "features": [
                "Monthly updates",
                "Bug fixing",
                "Security patches",
                "Backup management",
                "Priority support",
                "Per-month billing"
              ]
            }
          ]
        }
      },
      svcdesc: {
        apps: {
          android: "Native Android apps built with Kotlin and modern architecture, from MVP to full-scale products.",
          ios: "Native iOS apps with Swift and SwiftUI, polished to App Store standards.",
          pwa: "Fast, installable web apps and PWAs that work on any device and browser.",
          ecom: "Feature-rich shopping apps with carts, payments, orders and push notifications.",
          classifieds: "Classifieds and listing apps with chat, search, filters and secure posting.",
          reader: "Book reader apps for ebooks and audiobooks with synced libraries and subscriptions.",
          tourism: "Tourism and travel apps with tours, itineraries, maps and local experiences.",
          taxi: "Ride-hailing apps with live tracking, driver dispatch and in-app payments.",
          booking: "Flight and hotel booking apps with availability, pricing and instant confirmation.",
        },
        websites: {
          corporate: "Polished corporate websites that present your company with confidence.",
          classifieds: "Classifieds websites like the big listing platforms — search, post, chat.",
          marketplace: "Marketplace websites with multi-vendor stores, carts and checkout.",
          store: "Fast online stores with product catalogs, payments and shipping.",
          restaurant: "Restaurant websites with menus, table reservation and online ordering.",
          news: "News and media websites with editorial workflows and fast delivery.",
          medical: "Medical and clinic websites with online booking and patient portals.",
          tourism: "Travel and tourism websites with tours, hotels and trip booking.",
          reader: "Book reader websites for selling and streaming ebooks and audiobooks.",
          wordpress: "WordPress websites built and tuned for speed, SEO and easy editing.",
        },
        ecommerce: {
          store: "Custom online stores with seamless checkout and full admin control.",
          marketplace: "Multi-vendor marketplaces where many sellers sell on one platform.",
          subscription: "Subscription stores for memberships, boxes and recurring revenue.",
          shopify: "Shopify stores configured and customized to your brand.",
        },
        blockchain: {
          cex: "Centralized crypto exchanges with order books, wallets and KYC.",
          dex: "Decentralized exchanges with on-chain swaps and liquidity pools.",
          p2p: "Peer-to-peer exchange platforms matching buyers and sellers directly.",
          otc: "OTC desks for large, private crypto trades with dedicated support.",
          gateway: "Crypto payment gateways to accept digital assets on your platform.",
          contracts: "Smart contract and token development on leading blockchains.",
          airdrop: "Airdrop and token distribution platforms with automated campaigns.",
          app: "Exchange apps with charts, trading and portfolio management.",
        },
        more: {
          uiux: "Product and interface design that users love — wireframes to hi-fi.",
          seo: "SEO and digital marketing that grows your organic traffic and sales.",
          dashboards: "Admin panels and dashboards to run your business with data.",
          support: "Maintenance, hosting and support that keeps everything running.",
        },
      },
      hero: {
        eyebrow: "Business Consultancy \u00b7 Digital Solutions",
        titleStart: "Your ",
        titleGrad: "Consultancy",
        titleEnd: " Partner for Growth.",
        statBadge: "10+",
        statText: "Years of working experience taking care of your business goals",
        lead: "Amatis helps ambitious businesses grow with strategy, marketing and technology. From the first idea to a launched product, we are your partner at every step.",
        ctaPrimary: "Explore Our Services",
        ctaSecondary: "View Showcase",
        chips: [
          "Business Consultancy",
          "Digital Marketing",
          "Market Analysis",
          "Web Development",
          "AI Solutions",
        ],
        note: "Free consultation for every new project",
        cardTitle: "Amatis",
        cardSub: "Business Consultancy Agency",
        mini1Label: "Clients served",
        mini1Value: "350+",
        mini2Label: "Projects delivered",
        mini2Value: "870+",
        imgAlt: "Amatis \u2014 Business Consultancy",
      },
      marquee: {
        m1: "Business Consultancy   \u2022   Digital Marketing   \u2022   Market Analysis   \u2022   Web Development   \u2022   ",
        m2: "Strategy   \u2022   Branding   \u2022   UI/UX Design   \u2022   AI Solutions   \u2022   Growth   \u2022   ",
      },
      offer: {
        kicker: "What We Offer",
        title: "Services to Rock Your Business",
        subtitle:
          "A full range of services to take care of your business goals \u2014 from strategy to execution.",
        card1: {
          icon: "\ud83d\udcbc",
          title: "Business Consultancy",
          desc: "Strategic advice to help you set the right goals and grow with confidence.",
        },
        card2: {
          icon: "\ud83d\udce3",
          title: "Digital Marketing",
          desc: "Campaigns that build your brand and turn attention into customers.",
        },
        card3: {
          icon: "\ud83d\udcca",
          title: "Market Analysis",
          desc: "Data-driven insights and clear reporting to understand your market.",
        },
        card4: {
          icon: "\ud83d\udee0\ufe0f",
          title: "Web Development",
          desc: "Fast, secure and beautiful websites that tell your story.",
        },
        link: "Learn More",
        button: "View All Services",
      },
      blog: {
        kicker: "Insights",
        title: "Tech Blog",
        subtitle: "News and guides to help your business grow.",
        post1: {
          title: "How to choose the right digital partner for your business",
          date: "6 December 2025",
          author: "Isabela Moreira",
        },
        post2: {
          title: "5 digital marketing trends to watch this year",
          date: "2 December 2025",
          author: "Lucas Silva",
        },
        post3: {
          title: "Why every business needs a great website",
          date: "29 November 2025",
          author: "Amatis Studio",
        },
        readMore: "Read More",
        viewAll: "View All Blogs",
      },
      schedule: {
        eyebrow: "Free consultation",
        title: "Schedule Now to Get Started",
        subtitle:
          "Book a free consultation with our team and let's talk about your project.",
        button: "Book Now",
        chips: ["Free consultation", "No commitment", "Fast reply"],
      },
      footer: {
        tagline:
          "Amatis is a business consultancy agency helping companies grow with strategy, marketing and technology.",
        colServices: "Services",
        colCompany: "Company",
        colContact: "Contact",
        links: {
          services: ["What We Offer", "Web Design", "WordPress Website", "Blogs"],
          company: ["Home", "Showcase", "Who Are We", "Connect With Us"],
          contact: ["Contact Us", "Schedule a Call", "About Us", "Blog"],
        },
        rights: "\u00a9 {year} Amatis. All rights reserved.",
      },
      showcase: {
        kicker: "Showcase",
        title: "Our Work Speaks",
        subtitle:
          "A selection of projects we are proud of \u2014 websites, branding and creative work.",
        filters: ["All", "Websites", "Branding", "Creative"],
        item1: { title: "Corporate Website", cat: "Websites" },
        item2: { title: "Brand Identity", cat: "Branding" },
        item3: { title: "Mobile App", cat: "Websites" },
        item4: { title: "Creative Campaign", cat: "Creative" },
        item5: { title: "E-commerce Store", cat: "Websites" },
        item6: { title: "Marketing Visuals", cat: "Creative" },
      },
      wwo: {
        kicker: "What We Offer",
        title: "A Full Range of Services",
        subtitle:
          "Everything your business needs to grow online \u2014 all under one roof.",
        button: "Book a Consultation",
        link: "Learn More",
        p1: "We combine business thinking, design and technology to deliver results. Every engagement starts with listening to your goals and ends with measurable outcomes.",
      },
      wd: {
        kicker: "Web Design",
        title: "Designs That Turn Visitors Into Customers",
        subtitle: "From web design to a complete online presence.",
        p1: "Your website is your digital storefront. We design fast, accessible and conversion-focused websites that tell your story and turn visitors into customers.",
        f1: "Modern, conversion-focused design",
        f2: "Responsive on every device",
        f3: "Fast loading and SEO-friendly",
        f4: "Easy content management",
        ctaTitle: "Ready to redesign your website?",
        ctaButton: "Book Now",
      },
      wp: {
        kicker: "WordPress Website",
        title: "WordPress Websites That Just Work",
        subtitle: "Professional WordPress development and support.",
        p1: "From custom themes to full e-commerce, we build WordPress websites that are secure, fast and simple for your team to manage.",
        f1: "Custom WordPress themes",
        f2: "Secure and performance-optimized",
        f3: "Easy to update and maintain",
        f4: "Ongoing support and care",
        ctaTitle: "Let's build your WordPress site",
        ctaButton: "Book Now",
      },
      blogList: {
        kicker: "Blogs",
        title: "Latest News & Insights",
        subtitle: "Guides, news and ideas to help your business grow.",
        loading: "Loading articles…",
        error: "Couldn't load articles. Please try again.",
        empty: "No articles yet — check back soon!",
        minRead: "min read",
        readMore: "Read More",
      },
      waw: {
        kicker: "Who Are We",
        title: "We Take Care of Your Business Goals",
        p1: "Amatis is a business consultancy agency with more than 10 years of experience. We help companies grow by combining strategy, marketing and technology.",
        p2: "From market analysis to web development, we stay by your side at every step \u2014 with transparency, quality and measurable results.",
        counter1: "Clients",
        counter2: "Satisfaction",
        counter3: "Projects",
        value1: { icon: "\ud83c\udfaf", title: "Focus on Quality", desc: "Only the best work, delivered with care." },
        value2: { icon: "\ud83e\udd1d", title: "Customer Trust", desc: "Transparency in price, process and results." },
        value3: { icon: "\u26a1", title: "Speed", desc: "Fast execution without compromising quality." },
        ctaTitle: "Let's work together",
        ctaButton: "Connect With Us",
      },
      connect: {
        kicker: "Connect With Us",
        title: "Let's Talk About Your Project",
        subtitle:
          "Have a project in mind or a question? Our team is here for you.",
        phone: "Phone",
        phoneValue: "+852 2569 7974",
        email: "Email",
        emailValue: "hello@amatisberry.ir",
        address: "Address",
        addressValue: "21 King Street, Melbourne, Victoria 1202, Australia",
        hours: "Support hours",
        hoursValue: "Mon \u2013 Fri, 9:00 \u2013 18:00",
        formTitle: "Send Us a Message",
        formName: "Name",
        formEmail: "Email",
        formSubject: "Subject",
        formMessage: "Message",
        formSubmit: "Send Message",
        formSent: "Your message has been sent successfully. We will reply soon.",
        errorGeneric: "Something went wrong. Please try again later.",
        scheduleTitle: "Schedule a Free Consultation",
        scheduleText: "Prefer to talk? Book a free consultation and we will call you back.",
        scheduleButton: "Schedule Now",
      },
    },

    de: {
      meta: {
        title: "Amatis \u00b7 Unternehmensberatung",
        description:
          "Amatis ist eine Unternehmensberatung, die Unternehmen mit Strategie, Marketing und Technologie beim Wachstum unterst\u00fctzt.",
      },
      brand: "Amatis",
      nav: {
        home: "Startseite",
        showcase: "Referenzen",
        whatWeOffer: "Unsere Leistungen",
        webDesign: "Webdesign",
        wordpress: "WordPress-Website",
        blogs: "Blog",
        whoAreWe: "\u00dcber uns",
        connect: "Kontakt",
        pricing: "Pläne & Preise",
        chooseLanguage: "Sprache w\u00e4hlen",
        active: "Aktiv",
      },

      services: {
        "title": "Unsere Dienstleistungen",
        "subtitle": "Jede Art von digitalem Produkt, das Ihr Unternehmen braucht — von der Idee bis zur fertigen Umsetzung.",
        "viewAll": "Alle Dienstleistungen ansehen",
        "apps": {
          "title": "App-Entwicklung",
          "lead": "Android-, iOS-, Cross-Platform- und Web-Apps mit modernen Technologien.",
          "android": "Android-App",
          "ios": "iOS-App",
          "pwa": "Web-App & PWA",
          "ecom": "E-Commerce-App",
          "classifieds": "Kleinanzeigen-App",
          "reader": "E-Book-Reader-App",
          "tourism": "Tourismus-App",
          "taxi": "Taxi- & Transport-App",
          "booking": "Flug- & Hotelbuchung"
        },
        "websites": {
          "title": "Website-Design",
          "lead": "Individuelle oder WordPress-Websites für jede Branche.",
          "corporate": "Unternehmenswebsite",
          "classifieds": "Kleinanzeigen-Website",
          "marketplace": "Marktplatz-Website",
          "store": "Online-Shop",
          "restaurant": "Restaurant-Website",
          "news": "Nachrichten-Website",
          "medical": "Medizinische Website",
          "tourism": "Tourismus-Website",
          "reader": "Buch-Reader-Website",
          "wordpress": "WordPress-Website"
        },
        "ecommerce": {
          "title": "E-Commerce",
          "lead": "Online-Shops und Marktplätze mit integrierter Bezahlung.",
          "store": "Online-Shop",
          "marketplace": "Multi-Vendor-Marktplatz",
          "subscription": "Abonnement-Shop",
          "shopify": "Shopify-Shop"
        },
        "blockchain": {
          "title": "Blockchain & Krypto",
          "lead": "Börsen, Zahlungs-Gateways und Smart Contracts auf der Blockchain.",
          "cex": "Krypto-Börse",
          "dex": "Dezentrale Börse (DEX)",
          "p2p": "P2P-Börse",
          "otc": "OTC-Börse",
          "gateway": "Krypto-Zahlungs-Gateway",
          "contracts": "Smart Contracts & Token",
          "airdrop": "Airdrop-Plattform",
          "app": "Börsen-App"
        },
        "more": {
          "title": "Weitere Dienstleistungen",
          "lead": "Design, Wachstum und Betreuung, die Ihr Produkt voranbringen.",
          "uiux": "UI/UX-Design",
          "seo": "SEO & Digital-Marketing",
          "dashboards": "Dashboards & Admin-Panels",
          "support": "Wartung & Support"
        }
      },
      pricing: {
        "title": "Pläne & Preise",
        "subtitle": "Transparente Festpreise für jeden unserer Services — vom Start bis zum Launch.",
        "cta": "Kostenlose Beratung",
        "from": "ab",
        "unit": "Mio. Toman",
        "apps": {
          "title": "App-Entwicklung",
          "lead": "Wählen Sie den Plan, der zur Phase Ihres Produkts passt — vom MVP bis zur Plattform.",
          "plans": [
            {
              "name": "Starter-App",
              "tag": "MVP & eine Plattform",
              "old": "110",
              "price": "90",
              "features": [
                "Natives Android oder iOS",
                "MVP-Umfang & Kern-Flows",
                "Standard-UI/UX",
                "Basis-Admin-Panel",
                "Store-Einreichung",
                "1 Monat Support"
              ]
            },
            {
              "name": "Professional-App",
              "tag": "Am beliebtesten",
              "old": "170",
              "price": "140",
              "features": [
                "Android + iOS",
                "Individuelles UI/UX",
                "Admin-Panel & Dashboard",
                "Zahlungen & Push-Benachrichtigungen",
                "Analytics-Integration",
                "3 Monate Support"
              ]
            },
            {
              "name": "Enterprise-App",
              "tag": "Vollwertige Plattform",
              "old": "250",
              "price": "210",
              "features": [
                "Cross-Platform oder nativ",
                "Offline- & Sync-Fähigkeiten",
                "Erweitertes Admin & Reports",
                "Drittanbieter-Integrationen",
                "Sicherheits- & Performance-Audit",
                "12 Monate Support"
              ]
            }
          ]
        },
        "websites": {
          "title": "Website-Design",
          "lead": "Websites, die konvertieren — von Landing-Pages bis zu vollwertigen Redaktions-Plattformen.",
          "plans": [
            {
              "name": "Starter-Website",
              "tag": "Bis zu 8 Seiten",
              "old": "50",
              "price": "40",
              "features": [
                "Responsives Design",
                "Bis zu 8 Seiten",
                "Kontaktformular",
                "Basis-SEO",
                "Geschwindigkeits-Optimierung",
                "1 Monat Support"
              ]
            },
            {
              "name": "Business-Website",
              "tag": "CMS & Blog",
              "old": "90",
              "price": "70",
              "features": [
                "Bis zu 20 Seiten",
                "CMS / WordPress",
                "Blog & News-Bereich",
                "Mehrsprachig",
                "Analytics & Formulare",
                "3 Monate Support"
              ]
            },
            {
              "name": "Custom-Plattform",
              "tag": "Web-App & Dashboard",
              "old": "150",
              "price": "120",
              "features": [
                "Individuelle Web-App",
                "Benutzerkonten & Rollen",
                "API-Integrationen",
                "Erweitertes Dashboard",
                "Individuelle Module",
                "6 Monate Support"
              ]
            }
          ]
        },
        "ecommerce": {
          "title": "E-Commerce",
          "lead": "Shops und Marktplätze, die verkaufen — Warenkorb, Zahlungen und Versand inklusive.",
          "plans": [
            {
              "name": "Basis-Shop",
              "tag": "Shop starten",
              "old": "100",
              "price": "80",
              "features": [
                "Produktkatalog",
                "Warenkorb & Checkout",
                "Ein Zahlungs-Gateway",
                "Bestellverwaltung",
                "Kundenkonten",
                "1 Monat Support"
              ]
            },
            {
              "name": "Fortgeschrittener Shop",
              "tag": "Skalieren",
              "old": "160",
              "price": "130",
              "features": [
                "Mehrere Gateways",
                "Rabatt- & Coupon-System",
                "Lager & Inventar",
                "Versand & Tracking",
                "Reports & Analysen",
                "3 Monate Support"
              ]
            },
            {
              "name": "Marktplatz",
              "tag": "Multi-Vendor",
              "old": "260",
              "price": "220",
              "features": [
                "Multi-Vendor-Verkauf",
                "Verkäufer-Panels & Provisionen",
                "Treuhand & Auszahlungen",
                "Bewertungen",
                "Retouren-Management",
                "6 Monate Support"
              ]
            }
          ]
        },
        "blockchain": {
          "title": "Blockchain & Krypto",
          "lead": "Sichere Börsen, Gateways und Smart Contracts auf führenden Netzwerken.",
          "plans": [
            {
              "name": "Token & Contracts",
              "tag": "Erc-20 / bep-20",
              "old": "110",
              "price": "90",
              "features": [
                "Token-Entwicklung",
                "Smart Contracts",
                "Staking oder Airdrop",
                "Wallet-Integration",
                "Audit-Unterstützung",
                "1 Monat Support"
              ]
            },
            {
              "name": "Zahlungs-Gateway",
              "tag": "Krypto akzeptieren",
              "old": "190",
              "price": "160",
              "features": [
                "Krypto-Zahlungs-Gateway",
                "Merchant-Dashboard",
                "API & Plugins",
                "Automatische Abrechnung",
                "Multi-Währung",
                "3 Monate Support"
              ]
            },
            {
              "name": "Krypto-Börse",
              "tag": "CEX / OTC / P2P",
              "old": "320",
              "price": "280",
              "features": [
                "Order-Book-Engine",
                "Wallets & KYC",
                "P2P / OTC-Handel",
                "Admin-Panel",
                "Security-Härtung",
                "6 Monate Support"
              ]
            }
          ]
        },
        "more": {
          "title": "Weitere Services",
          "lead": "Design, Wachstum und Betreuung, die Ihr Produkt voranbringen.",
          "plans": [
            {
              "name": "UI/UX-Design",
              "tag": "Design-System",
              "old": "75",
              "price": "60",
              "features": [
                "UX-Audit & Recherche",
                "Wireframes & Prototypen",
                "Design-System",
                "Interaktive Mockups",
                "Developer-Handoff",
                "Revisionsrunden"
              ]
            },
            {
              "name": "SEO & Marketing",
              "tag": "Wachstumsplan",
              "old": "65",
              "price": "50",
              "features": [
                "Technisches SEO",
                "Keyword-Strategie",
                "Content-Plan",
                "Performance-Tracking",
                "Monatliche Reports",
                "Ad-Campaign-Setup"
              ]
            },
            {
              "name": "Wartung & Support",
              "tag": "Monatliche Betreuung",
              "old": "30",
              "price": "25",
              "features": [
                "Monatliche Updates",
                "Fehlerbehebung",
                "Sicherheits-Patches",
                "Backup-Management",
                "Prioritäts-Support",
                "Monatliche Abrechnung"
              ]
            }
          ]
        }
      },
      svcdesc: {
        apps: {
          android: "Native Android-Apps mit Kotlin und moderner Architektur — vom MVP bis zum vollständigen Produkt.",
          ios: "Native iOS-Apps mit Swift und SwiftUI, bereit für den App Store.",
          pwa: "Schnelle, installierbare Web-Apps und PWAs für jedes Gerät und jeden Browser.",
          ecom: "Funktionsreiche Shopping-Apps mit Warenkorb, Zahlung, Bestellungen und Push.",
          classifieds: "Kleinanzeigen-Apps mit Chat, Suche, Filtern und sicherem Inserieren.",
          reader: "Lese-Apps für E-Books und Hörbücher mit Sync und Abos.",
          tourism: "Tourismus-Apps mit Touren, Routen, Karten und lokalen Erlebnissen.",
          taxi: "Fahrdienst-Apps mit Live-Tracking, Disposition und In-App-Zahlung.",
          booking: "Buchungs-Apps für Flüge und Hotels mit Verfügbarkeit und Sofortbestätigung.",
        },
        websites: {
          corporate: "Hochwertige Unternehmenswebsites, die Ihr Unternehmen professionell präsentieren.",
          classifieds: "Kleinanzeigen-Websites wie die großen Plattformen — suchen, inserieren, chatten.",
          marketplace: "Marktplatz-Websites mit Multi-Vendor-Shops, Warenkorb und Checkout.",
          store: "Schnelle Onlineshops mit Katalog, Zahlung und Versand.",
          restaurant: "Restaurant-Websites mit Menü, Reservierung und Online-Bestellung.",
          news: "Nachrichten-Websites mit Redaktionsworkflows und schneller Auslieferung.",
          medical: "Medizinische Websites mit Online-Terminvergabe und Patientenportal.",
          tourism: "Reise-Websites mit Touren, Hotels und Buchung.",
          reader: "Websites zum Verkauf und Streaming von E-Books und Hörbüchern.",
          wordpress: "WordPress-Websites, optimiert für Geschwindigkeit, SEO und einfache Pflege.",
        },
        ecommerce: {
          store: "Individuelle Onlineshops mit reibungslosem Checkout und voller Verwaltung.",
          marketplace: "Multi-Vendor-Marktplätze, auf denen viele Verkäufer auf einer Plattform verkaufen.",
          subscription: "Abonnement-Shops für Mitgliedschaften, Boxen und wiederkehrende Einnahmen.",
          shopify: "Shopify-Shops, auf Ihre Marke abgestimmt und konfiguriert.",
        },
        blockchain: {
          cex: "Zentralisierte Krypto-Börsen mit Orderbuch, Wallets und KYC.",
          dex: "Dezentrale Börsen mit On-Chain-Swaps und Liquiditätspools.",
          p2p: "P2P-Börsen, die Käufer und Verkäufer direkt verbinden.",
          otc: "OTC-Desks für große, private Krypto-Handel mit dediziertem Support.",
          gateway: "Krypto-Zahlungsgateways, um digitale Assets auf Ihrer Plattform zu akzeptieren.",
          contracts: "Smart-Contract- und Token-Entwicklung auf führenden Blockchains.",
          airdrop: "Airdrop- und Token-Plattformen mit automatisierten Kampagnen.",
          app: "Börsen-Apps mit Charts, Trading und Portfolio-Verwaltung.",
        },
        more: {
          uiux: "Produkt- und Interface-Design, das Nutzer lieben — vom Wireframe bis zum Hi-Fi.",
          seo: "SEO und digitales Marketing für mehr organischen Traffic und Umsatz.",
          dashboards: "Admin-Panels und Dashboards, um Ihr Geschäft datenbasiert zu führen.",
          support: "Wartung, Hosting und Support, damit alles reibungslos läuft.",
        },
      },
      hero: {
        eyebrow: "Unternehmensberatung \u00b7 Digitale L\u00f6sungen",
        titleStart: "Ihr ",
        titleGrad: "Beratungs-",
        titleEnd: " Partner f\u00fcr Wachstum.",
        statBadge: "10+",
        statText: "Jahre Erfahrung, um sich um Ihre Gesch\u00e4ftsziele zu k\u00fcmmern",
        lead: "Amatis hilft ambitionierten Unternehmen mit Strategie, Marketing und Technologie zu wachsen. Von der ersten Idee bis zum fertigen Produkt sind wir an Ihrer Seite.",
        ctaPrimary: "Leistungen entdecken",
        ctaSecondary: "Referenzen ansehen",
        chips: [
          "Unternehmensberatung",
          "Digitales Marketing",
          "Marktanalyse",
          "Webentwicklung",
          "KI-L\u00f6sungen",
        ],
        note: "Kostenlose Beratung f\u00fcr jedes neue Projekt",
        cardTitle: "Amatis",
        cardSub: "Unternehmensberatung",
        mini1Label: "Betreute Kunden",
        mini1Value: "350+",
        mini2Label: "Umgesetzte Projekte",
        mini2Value: "870+",
        imgAlt: "Amatis \u2014 Unternehmensberatung",
      },
      marquee: {
        m1: "Unternehmensberatung   \u2022   Digitales Marketing   \u2022   Marktanalyse   \u2022   Webentwicklung   \u2022   ",
        m2: "Strategie   \u2022   Branding   \u2022   UI/UX-Design   \u2022   KI-L\u00f6sungen   \u2022   Wachstum   \u2022   ",
      },
      offer: {
        kicker: "Unsere Leistungen",
        title: "Leistungen, die Ihr Unternehmen voranbringen",
        subtitle:
          "Ein komplettes Leistungsspektrum, das sich um Ihre Gesch\u00e4ftsziele k\u00fcmmert \u2014 von der Strategie bis zur Umsetzung.",
        card1: {
          icon: "\ud83d\udcbc",
          title: "Unternehmensberatung",
          desc: "Strategische Beratung, um die richtigen Ziele zu setzen und sicher zu wachsen.",
        },
        card2: {
          icon: "\ud83d\udce3",
          title: "Digitales Marketing",
          desc: "Kampagnen, die Ihre Marke st\u00e4rken und Aufmerksamkeit in Kunden verwandeln.",
        },
        card3: {
          icon: "\ud83d\udcca",
          title: "Marktanalyse",
          desc: "Datengest\u00fctzte Erkenntnisse und klare Berichte, um Ihren Markt zu verstehen.",
        },
        card4: {
          icon: "\ud83d\udee0\ufe0f",
          title: "Webentwicklung",
          desc: "Schnelle, sichere und sch\u00f6ne Websites, die Ihre Geschichte erz\u00e4hlen.",
        },
        link: "Mehr erfahren",
        button: "Alle Leistungen",
      },
      blog: {
        kicker: "Einblicke",
        title: "Tech-Blog",
        subtitle: "News und Ratgeber f\u00fcr das Wachstum Ihres Unternehmens.",
        post1: {
          title: "So w\u00e4hlen Sie den richtigen digitalen Partner f\u00fcr Ihr Unternehmen",
          date: "6. Dezember 2025",
          author: "Isabela Moreira",
        },
        post2: {
          title: "5 Digital-Marketing-Trends, die Sie dieses Jahr beachten sollten",
          date: "2. Dezember 2025",
          author: "Lucas Silva",
        },
        post3: {
          title: "Warum jedes Unternehmen eine gro\u00dfartige Website braucht",
          date: "29. November 2025",
          author: "Amatis Studio",
        },
        readMore: "Weiterlesen",
        viewAll: "Alle Blogbeitr\u00e4ge",
      },
      schedule: {
        eyebrow: "Kostenlose Beratung",
        title: "Jetzt einen Termin vereinbaren",
        subtitle:
          "Buchen Sie eine kostenlose Beratung und sprechen Sie mit uns \u00fcber Ihr Projekt.",
        button: "Termin buchen",
        chips: ["Kostenlose Beratung", "Keine Verpflichtung", "Schnelle Antwort"],
      },
      footer: {
        tagline:
          "Amatis ist eine Unternehmensberatung, die Unternehmen mit Strategie, Marketing und Technologie beim Wachstum unterst\u00fctzt.",
        colServices: "Leistungen",
        colCompany: "Unternehmen",
        colContact: "Kontakt",
        links: {
          services: ["Unsere Leistungen", "Webdesign", "WordPress-Website", "Blog"],
          company: ["Startseite", "Referenzen", "\u00dcber uns", "Kontakt"],
          contact: ["Kontakt", "Beratung buchen", "\u00dcber uns", "Blog"],
        },
        rights: "\u00a9 {year} Amatis. Alle Rechte vorbehalten.",
      },
      showcase: {
        kicker: "Referenzen",
        title: "Unsere Arbeit spricht f\u00fcr sich",
        subtitle:
          "Eine Auswahl an Projekten, auf die wir stolz sind \u2014 Websites, Branding und kreative Arbeiten.",
        filters: ["Alle", "Websites", "Branding", "Kreativ"],
        item1: { title: "Unternehmenswebsite", cat: "Websites" },
        item2: { title: "Markenidentit\u00e4t", cat: "Branding" },
        item3: { title: "Mobile App", cat: "Websites" },
        item4: { title: "Kreative Kampagne", cat: "Kreativ" },
        item5: { title: "Online-Shop", cat: "Websites" },
        item6: { title: "Marketing-Designs", cat: "Kreativ" },
      },
      wwo: {
        kicker: "Unsere Leistungen",
        title: "Ein volles Leistungsspektrum",
        subtitle:
          "Alles, was Ihr Unternehmen f\u00fcr Wachstum online braucht \u2014 unter einem Dach.",
        button: "Beratung buchen",
        link: "Mehr erfahren",
        p1: "Wir verbinden Business-Denken, Design und Technologie, um Ergebnisse zu liefern. Jedes Projekt beginnt mit Ihren Zielen und endet mit messbaren Ergebnissen.",
      },
      wd: {
        kicker: "Webdesign",
        title: "Designs, die Besucher zu Kunden machen",
        subtitle: "Vom Webdesign bis zur kompletten Online-Pr\u00e4senz.",
        p1: "Ihre Website ist Ihre digitale Visitenkarte. Wir gestalten schnelle, zug\u00e4ngliche und konversionsorientierte Websites, die Ihre Geschichte erz\u00e4hlen.",
        f1: "Modernes, konversionsorientiertes Design",
        f2: "Responsive auf allen Ger\u00e4ten",
        f3: "Schnell ladend und SEO-freundlich",
        f4: "Einfache Inhaltsverwaltung",
        ctaTitle: "Bereit f\u00fcr einen neuen Webauftritt?",
        ctaButton: "Jetzt buchen",
      },
      wp: {
        kicker: "WordPress-Website",
        title: "WordPress-Websites, die einfach funktionieren",
        subtitle: "Professionelle WordPress-Entwicklung und Support.",
        p1: "Von eigenen Themes bis zum vollst\u00e4ndigen Online-Shop bauen wir sichere, schnelle und einfach zu verwaltende WordPress-Websites.",
        f1: "Individuelle WordPress-Themes",
        f2: "Sicher und performance-optimiert",
        f3: "Einfach zu aktualisieren und zu pflegen",
        f4: "Laufender Support und Pflege",
        ctaTitle: "Lassen Sie uns Ihre WordPress-Site bauen",
        ctaButton: "Jetzt buchen",
      },
      blogList: {
        kicker: "Blog",
        title: "Aktuelle News & Einblicke",
        subtitle: "Ratgeber, News und Ideen f\u00fcr das Wachstum Ihres Unternehmens.",
        loading: "Artikel werden geladen …",
        error: "Artikel konnten nicht geladen werden.",
        empty: "Noch keine Artikel – schau bald wieder vorbei!",
        minRead: "Min. Lesezeit",
        readMore: "Weiterlesen",
      },
      waw: {
        kicker: "\u00dcber uns",
        title: "Wir k\u00fcmmern uns um Ihre Gesch\u00e4ftsziele",
        p1: "Amatis ist eine Unternehmensberatung mit mehr als 10 Jahren Erfahrung. Wir helfen Unternehmen zu wachsen \u2014 mit Strategie, Marketing und Technologie.",
        p2: "Von der Marktanalyse bis zur Webentwicklung sind wir mit Transparenz, Qualit\u00e4t und messbaren Ergebnissen an Ihrer Seite.",
        counter1: "Kunden",
        counter2: "Zufriedenheit",
        counter3: "Projekte",
        value1: { icon: "\ud83c\udfaf", title: "Qualit\u00e4t", desc: "Nur beste Arbeit, mit Sorgfalt geliefert." },
        value2: { icon: "\ud83e\udd1d", title: "Vertrauen", desc: "Transparenz bei Preis, Prozess und Ergebnissen." },
        value3: { icon: "\u26a1", title: "Schnelligkeit", desc: "Schnelle Umsetzung ohne Qualit\u00e4tseinbu\u00dfen." },
        ctaTitle: "Lassen Sie uns zusammenarbeiten",
        ctaButton: "Kontakt aufnehmen",
      },
      connect: {
        kicker: "Kontakt",
        title: "Sprechen wir \u00fcber Ihr Projekt",
        subtitle:
          "Haben Sie eine Idee oder eine Frage? Unser Team ist f\u00fcr Sie da.",
        phone: "Telefon",
        phoneValue: "+852 2569 7974",
        email: "E-Mail",
        emailValue: "hello@amatisberry.ir",
        address: "Adresse",
        addressValue: "21 King Street, Melbourne, Victoria 1202, Australien",
        hours: "Erreichbarkeit",
        hoursValue: "Mo \u2013 Fr, 9:00 \u2013 18:00",
        formTitle: "Senden Sie uns eine Nachricht",
        formName: "Name",
        formEmail: "E-Mail",
        formSubject: "Betreff",
        formMessage: "Nachricht",
        formSubmit: "Nachricht senden",
        formSent: "Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns bald.",
        errorGeneric: "Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut.",
        scheduleTitle: "Kostenlose Beratung buchen",
        scheduleText: "Lieber telefonisch? Buchen Sie eine kostenlose Beratung.",
        scheduleButton: "Jetzt buchen",
      },
    },

    fa: {
      meta: {
        title: "\u0622\u0645\u0627\u062a\u06cc\u0633 \u00b7 \u0645\u0634\u0627\u0648\u0631\u0647 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631",
        description:
          "\u0622\u0645\u0627\u062a\u06cc\u0633 \u06cc\u06a9 \u0622\u0698\u0627\u0646\u0633 \u0645\u0634\u0627\u0648\u0631\u0647 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631 \u0627\u0633\u062a \u06a9\u0647 \u0628\u0627 \u0627\u0633\u062a\u0631\u0627\u062a\u0698\u06cc\u060c \u0628\u0627\u0632\u0627\u0631\u06cc\u0627\u0628\u06cc \u0648 \u062a\u06a9\u0646\u0648\u0644\u0648\u0698\u06cc \u0628\u0647 \u0631\u0634\u062f \u0634\u0631\u06a9\u062a\u200c\u0647\u0627 \u06a9\u0645\u06a9 \u0645\u06cc\u200c\u06a9\u0646\u062f.",
      },
      brand: "\u0622\u0645\u0627\u062a\u06cc\u0633",
      nav: {
        home: "\u062e\u0627\u0646\u0647",
        showcase: "\u0646\u0645\u0648\u0646\u0647 \u06a9\u0627\u0631\u0647\u0627",
        whatWeOffer: "\u062e\u062f\u0645\u0627\u062a \u0645\u0627",
        webDesign: "\u0637\u0631\u0627\u062d\u06cc \u0648\u0628",
        wordpress: "\u0648\u0628\u200c\u0633\u0627\u06cc\u062a \u0648\u0631\u062f\u067e\u0631\u0633",
        blogs: "\u0648\u0628\u0644\u0627\u06af",
        whoAreWe: "\u0645\u0627 \u06a9\u06cc\u0633\u062a\u06cc\u0645",
        connect: "\u0627\u0631\u062a\u0628\u0627\u0637 \u0628\u0627 \u0645\u0627",
        pricing: "تعرفه‌ها و قیمت‌ها",
        chooseLanguage: "\u0627\u0646\u062a\u062e\u0627\u0628 \u0632\u0628\u0627\u0646",
        active: "\u0641\u0639\u0627\u0644",
      },

      services: {
        "title": "خدمات ما",
        "subtitle": "هر نوع محصول دیجیتالی که کسب‌وکار شما به آن نیاز دارد — از ایده تا اجرای کامل.",
        "viewAll": "مشاهده همه خدمات",
        "apps": {
          "title": "توسعه اپلیکیشن",
          "lead": "اپلیکیشن‌های اندروید، آی‌اواس، کراس‌پلتفرم و وب با استک‌های مدرن.",
          "android": "اپلیکیشن اندروید",
          "ios": "اپلیکیشن iOS",
          "pwa": "وب‌اپ و PWA",
          "ecom": "اپلیکیشن فروشگاهی",
          "classifieds": "اپلیکیشن آگهی و ثبت آگهی",
          "reader": "اپلیکیشن کتاب‌خوان",
          "tourism": "اپلیکیشن گردشگری",
          "taxi": "اپلیکیشن تاکسی و حمل‌ونقل",
          "booking": "رزرو پرواز و هتل"
        },
        "websites": {
          "title": "طراحی وب‌سایت",
          "lead": "وب‌سایت‌های اختصاصی یا وردپرسی برای هر صنعتی.",
          "corporate": "وب‌سایت سازمانی",
          "classifieds": "وب‌سایت آگهی",
          "marketplace": "وب‌سایت مارکت‌پلیس",
          "store": "فروشگاه آنلاین",
          "restaurant": "وب‌سایت رستوران",
          "news": "وب‌سایت خبری",
          "medical": "وب‌سایت پزشکی و درمانگاهی",
          "tourism": "وب‌سایت گردشگری",
          "reader": "وب‌سایت کتاب‌خوان",
          "wordpress": "وب‌سایت وردپرسی"
        },
        "ecommerce": {
          "title": "تجارت الکترونیک",
          "lead": "فروشگاه‌های آنلاین و مارکت‌پلیس با پرداخت یکپارچه.",
          "store": "فروشگاه آنلاین",
          "marketplace": "مارکت‌پلیس چندفروشنده",
          "subscription": "فروشگاه اشتراکی",
          "shopify": "فروشگاه Shopify"
        },
        "blockchain": {
          "title": "بلاک‌چین و رمزارز",
          "lead": "صرافی‌ها، درگاه‌های پرداخت و قراردادهای هوشمند روی بلاک‌چین.",
          "cex": "صرافی ارز دیجیتال",
          "dex": "صرافی غیرمتمرکز (DEX)",
          "p2p": "صرافی همتا به همتا",
          "otc": "صرافی OTC",
          "gateway": "درگاه پرداخت رمزارزی",
          "contracts": "قرارداد هوشمند و توکن",
          "airdrop": "پلتفرم ایردراپ",
          "app": "اپلیکیشن صرافی"
        },
        "more": {
          "title": "خدمات بیشتر",
          "lead": "طراحی، رشد و پشتیبانی که محصول شما را جلو نگه می‌دارد.",
          "uiux": "طراحی UI/UX",
          "seo": "سئو و دیجیتال مارکتینگ",
          "dashboards": "داشبورد و پنل مدیریت",
          "support": "پشتیبانی و نگهداری"
        }
      },
      pricing: {
        "title": "تعرفه‌ها و قیمت‌ها",
        "subtitle": "بسته‌های شفاف و با قیمت ثابت برای هر سرویسی که می‌سازیم — از شروع تا انتشار.",
        "cta": "مشاوره رایگان",
        "from": "از",
        "unit": "میلیون تومان",
        "apps": {
          "title": "توسعه اپلیکیشن",
          "lead": "بسته‌ای متناسب با مرحله محصولتان انتخاب کنید — از MVP تا پلتفرم کامل.",
          "plans": [
            {
              "name": "اپلیکیشن استارتر",
              "tag": "MVP و یک پلتفرم",
              "old": "۱۱۰",
              "price": "۹۰",
              "features": [
                "اندروید یا iOS",
                "محدوده MVP و مسیرهای اصلی",
                "UI/UX استاندارد",
                "پنل مدیریت ساده",
                "انتشار در استور",
                "۱ ماه پشتیبانی"
              ]
            },
            {
              "name": "اپلیکیشن حرفه‌ای",
              "tag": "محبوب‌ترین",
              "old": "۱۷۰",
              "price": "۱۴۰",
              "features": [
                "اندروید + iOS",
                "طراحی UI/UX اختصاصی",
                "پنل مدیریت و داشبورد",
                "پرداخت و اعلان",
                "اتصال آنالیتیکس",
                "۳ ماه پشتیبانی"
              ]
            },
            {
              "name": "اپلیکیشن سازمانی",
              "tag": "پلتفرم کامل",
              "old": "۲۵۰",
              "price": "۲۱۰",
              "features": [
                "کراس‌پلتفرم یا نیتیو",
                "آفلاین و همگام‌سازی",
                "داشبورد و گزارش پیشرفته",
                "یکپارچه‌سازی با سرویس‌ها",
                "بازبینی امنیت و سرعت",
                "۱۲ ماه پشتیبانی"
              ]
            }
          ]
        },
        "websites": {
          "title": "طراحی وب‌سایت",
          "lead": "سایت‌هایی که تبدیل می‌کنند — از لندینگ‌پیج تا پلتفرم کامل.",
          "plans": [
            {
              "name": "وب‌سایت استارتر",
              "tag": "تا ۸ صفحه",
              "old": "۵۰",
              "price": "۴۰",
              "features": [
                "طراحی واکنش‌گرا",
                "تا ۸ صفحه",
                "فرم تماس",
                "سئو پایه",
                "بهینه‌سازی سرعت",
                "۱ ماه پشتیبانی"
              ]
            },
            {
              "name": "وب‌سایت حرفه‌ای",
              "tag": "سی‌ام‌اس و وبلاگ",
              "old": "۹۰",
              "price": "۷۰",
              "features": [
                "تا ۲۰ صفحه",
                "سی‌ام‌اس / وردپرس",
                "بخش وبلاگ و اخبار",
                "چندزبانه",
                "آنالیتیکس و فرم‌ها",
                "۳ ماه پشتیبانی"
              ]
            },
            {
              "name": "پلتفرم اختصاصی",
              "tag": "وب‌اپ و داشبورد",
              "old": "۱۵۰",
              "price": "۱۲۰",
              "features": [
                "وب‌اپلیکیشن اختصاصی",
                "حساب کاربری و نقش‌ها",
                "اتصال API",
                "داشبورد پیشرفته",
                "ماژول‌های اختصاصی",
                "۶ ماه پشتیبانی"
              ]
            }
          ]
        },
        "ecommerce": {
          "title": "تجارت الکترونیک",
          "lead": "فروشگاه‌ها و مارکت‌پلیس‌هایی برای فروش — با سبد، پرداخت و ارسال.",
          "plans": [
            {
              "name": "فروشگاه پایه",
              "tag": "راه‌اندازی فروشگاه",
              "old": "۱۰۰",
              "price": "۸۰",
              "features": [
                "کاتالوگ محصولات",
                "سبد خرید و تسویه",
                "یک درگاه پرداخت",
                "مدیریت سفارش",
                "حساب کاربری",
                "۱ ماه پشتیبانی"
              ]
            },
            {
              "name": "فروشگاه پیشرفته",
              "tag": "مقیاس و بهینه‌سازی",
              "old": "۱۶۰",
              "price": "۱۳۰",
              "features": [
                "چند درگاه پرداخت",
                "سیستم تخفیف و کوپن",
                "انبار و موجودی",
                "ارسال و رهگیری",
                "گزارش و آنالیتیکس",
                "۳ ماه پشتیبانی"
              ]
            },
            {
              "name": "مارکت‌پلیس",
              "tag": "چندفروشنده",
              "old": "۲۶۰",
              "price": "۲۲۰",
              "features": [
                "فروش چندفروشنده",
                "پنل فروشنده و کارمزد",
                "تسویه حساب امن",
                "نظر و امتیاز",
                "مدیریت مرجوعی",
                "۶ ماه پشتیبانی"
              ]
            }
          ]
        },
        "blockchain": {
          "title": "بلاک‌چین و رمزارز",
          "lead": "صرافی‌ها، درگاه‌ها و قراردادهای هوشمند امن روی شبکه‌های معتبر.",
          "plans": [
            {
              "name": "توکن و قرارداد",
              "tag": "ERC-20 / BEP-20",
              "old": "۱۱۰",
              "price": "۹۰",
              "features": [
                "توسعه توکن",
                "قرارداد هوشمند",
                "استیکینگ یا ایردراپ",
                "اتصال کیف پول",
                "پشتیبانی ممیزی",
                "۱ ماه پشتیبانی"
              ]
            },
            {
              "name": "درگاه پرداخت",
              "tag": "پذیرش رمزارز",
              "old": "۱۹۰",
              "price": "۱۶۰",
              "features": [
                "درگاه پرداخت رمزارزی",
                "داشبورد فروشنده",
                "API و افزونه",
                "تسویه خودکار",
                "چند ارزی",
                "۳ ماه پشتیبانی"
              ]
            },
            {
              "name": "صرافی ارز دیجیتال",
              "tag": "CEX / OTC / P2P",
              "old": "۳۲۰",
              "price": "۲۸۰",
              "features": [
                "موتور سفارش‌ها",
                "کیف پول و KYC",
                "معامله P2P / OTC",
                "پنل مدیریت",
                "ارتقای امنیت",
                "۶ ماه پشتیبانی"
              ]
            }
          ]
        },
        "more": {
          "title": "خدمات بیشتر",
          "lead": "طراحی، رشد و پشتیبانی که محصول شما را از رقبا جلو نگه می‌دارد.",
          "plans": [
            {
              "name": "طراحی UI/UX",
              "tag": "سیستم طراحی",
              "old": "۷۵",
              "price": "۶۰",
              "features": [
                "ممیزی و تحقیق UX",
                "وایرفریم و پروتوتایپ",
                "سیستم طراحی",
                "ماکاپ تعاملی",
                "تحویل به تیم فنی",
                "دورهای بازبینی"
              ]
            },
            {
              "name": "سئو و مارکتینگ",
              "tag": "پلن رشد",
              "old": "۶۵",
              "price": "۵۰",
              "features": [
                "سئو تکنیکال",
                "استراتژی کلمات کلیدی",
                "پلن محتوا",
                "پایش عملکرد",
                "گزارش ماهانه",
                "راه‌اندازی کمپین"
              ]
            },
            {
              "name": "پشتیبانی و نگهداری",
              "tag": "مراقبت ماهانه",
              "old": "۳۰",
              "price": "۲۵",
              "features": [
                "به‌روزرسانی ماهانه",
                "رفع باگ",
                "پچ‌های امنیتی",
                "مدیریت بکاپ",
                "پشتیبانی اولویت‌دار",
                "صورتحساب ماهانه"
              ]
            }
          ]
        }
      },
      svcdesc: {
        apps: {
          android: "اپلیکیشن اندروید اصیل با Kotlin و معماری مدرن — از MVP تا محصول کامل.",
          ios: "اپلیکیشن iOS اصیل با Swift و SwiftUI، آماده برای اپ استور.",
          pwa: "وب‌اپ و PWA سریع و قابل نصب در تمام دستگاه‌ها و مرورگرها.",
          ecom: "اپلیکیشن فروشگاهی با سبد خرید، پرداخت، سفارش و اعلان پش.",
          classifieds: "اپلیکیشن آگهی با چت، جستجو، فیلتر و درج آگهی امن.",
          reader: "اپلیکیشن کتاب‌خوان برای کتاب الکترونیکی و صوتی با هم‌گام‌سازی و اشتراک.",
          tourism: "اپلیکیشن گردشگری با تور، مسیر و نقشه و تجربه محلی.",
          taxi: "اپلیکیشن تاکسی با ردیابی زنده، اعزام راننده و پرداخت داخل اپ.",
          booking: "اپلیکیشن رزرو بلیط و هتل با بررسی موجودی و تایید فوری.",
        },
        websites: {
          corporate: "وب‌سایت شرکتی حرفه‌ای که شرکت شما را ماهرانه معرفی می‌کند.",
          classifieds: "وب‌سایت آگهی مانند پلتفرم‌های بزرگ — جستجو، درج آگهی و چت.",
          marketplace: "وب‌سایت مارکت‌پلیس با فروشگاه چند فروشنده، سبد خرید و پرداخت.",
          store: "فروشگاه اینترنتی سریع با کاتالوگ محصول، پرداخت و حمل.",
          restaurant: "وب‌سایت رستوران با منو، رزرو میز و سفارش آنلاین.",
          news: "وب‌سایت خبری با فرایند تحریریه و انتشار سریع.",
          medical: "وب‌سایت پزشکی و درمانگاه با نوبت گیری آنلاین و پرتال بیمار.",
          tourism: "وب‌سایت گردشگری با تور، هتل و رزرو سفر.",
          reader: "وب‌سایت کتاب‌خوان برای فروش و استریم کتاب الکترونیکی و صوتی.",
          wordpress: "وب‌سایت وردپرس بهینه‌شده برای سرعت، سئو و تنظیم آسان.",
        },
        ecommerce: {
          store: "فروشگاه اینترنتی اختصاصی با پرداخت ساده و کنترل کامل مدیریت.",
          marketplace: "مارکت‌پلیس چند فروشنده که در یک پلتفرم فروش می‌کنند.",
          subscription: "فروشگاه اشتراکی برای عضویت، باکس و درآمد مکرر.",
          shopify: "فروشگاه شاپی‌فای ساخته شده و سفارشی مطابق برند شما.",
        },
        blockchain: {
          cex: "صرافی متمرکز ارز دیجیتال با دفتر سفارش، کیف پول و احراز هویت.",
          dex: "صرافی غیرمتمرکز با تبادل آنچین و استخر ناقدیتی.",
          p2p: "پلتفرم صرافی P2P برای اتصال مستقیم خریدار و فروشنده.",
          otc: "میز OTC برای معاملات کلان و خصوصی با پشتیبانی ویژه.",
          gateway: "درگاه پرداخت ارز دیجیتال برای پذیرش دارایی‌های دیجیتال در پلتفرم شما.",
          contracts: "توسعه قرارداد هوشمند و توکن در بلاک‌چین‌های برجسته.",
          airdrop: "پلتفرم ایردراپ و توزیع توکن با کمپین های اتوماتیک.",
          app: "اپلیکیشن صرافی با چارت، معامله و مدیریت سبد.",
        },
        more: {
          uiux: "طراحی محصول و رابط کاربری که کاربران دوست دارند — از وایرفریم تا های‌فای.",
          seo: "سئو و دیجیتال مارکتینگ برای رشد ترافیک ارگانیک و فروش.",
          dashboards: "پنل های مدیریتی و داشبورد برای مدیریت مبتنی بر داده.",
          support: "نگهداری، میزبانی و پشتیبانی که همه چیز را روان نگه می‌دارد.",
        },
      },
      hero: {
        eyebrow: "\u0645\u0634\u0627\u0648\u0631\u0647 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631 \u00b7 \u0631\u0627\u0647\u06a9\u0627\u0631\u0647\u0627\u06cc \u062f\u06cc\u062c\u06cc\u062a\u0627\u0644",
        titleStart: "\u0634\u0631\u06cc\u06a9 ",
        titleGrad: "\u0645\u0634\u0627\u0648\u0631\u0647",
        titleEnd: " \u0634\u0645\u0627 \u0628\u0631\u0627\u06cc \u0631\u0634\u062f.",
        statBadge: "10+",
        statText: "\u0633\u0627\u0644 \u0633\u0627\u0628\u0642\u0647 \u06a9\u0627\u0631 \u0628\u0631\u0627\u06cc \u062a\u062d\u0642\u0642 \u0627\u0647\u062f\u0627\u0641 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631 \u0634\u0645\u0627",
        lead: "\u0622\u0645\u0627\u062a\u06cc\u0633 \u0628\u0627 \u0627\u0633\u062a\u0631\u0627\u062a\u0698\u06cc\u060c \u0628\u0627\u0632\u0627\u0631\u06cc\u0627\u0628\u06cc \u0648 \u062a\u06a9\u0646\u0648\u0644\u0648\u0698\u06cc \u0628\u0647 \u0631\u0634\u062f \u06a9\u0633\u0628\u200c\u0648\u06a9\u0627\u0631\u0647\u0627\u06cc \u0628\u0644\u0646\u062f\u067e\u0631\u0648\u0627\u0632 \u06a9\u0645\u06a9 \u0645\u06cc\u200c\u06a9\u0646\u062f. \u0627\u0632 \u0627\u06cc\u062f\u0647\u200c\u06cc \u0627\u0648\u0644 \u062a\u0627 \u0631\u0627\u0647\u200c\u0627\u0646\u062f\u0627\u0632\u06cc \u0645\u062d\u0635\u0648\u0644\u060c \u062f\u0631 \u06a9\u0646\u0627\u0631 \u0634\u0645\u0627 \u0647\u0633\u062a\u06cc\u0645.",
        ctaPrimary: "\u0645\u0634\u0627\u0647\u062f\u0647 \u062e\u062f\u0645\u0627\u062a",
        ctaSecondary: "\u0646\u0645\u0648\u0646\u0647 \u06a9\u0627\u0631\u0647\u0627",
        chips: [
          "\u0645\u0634\u0627\u0648\u0631\u0647 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631",
          "\u0628\u0627\u0632\u0627\u0631\u06cc\u0627\u0628\u06cc \u062f\u06cc\u062c\u06cc\u062a\u0627\u0644",
          "\u062a\u062d\u0644\u06cc\u0644 \u0628\u0627\u0632\u0627\u0631",
          "\u062a\u0648\u0633\u0639\u0647 \u0648\u0628",
          "\u0631\u0627\u0647\u06a9\u0627\u0631\u0647\u0627\u06cc \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06cc",
        ],
        note: "\u0645\u0634\u0627\u0648\u0631\u0647 \u0631\u0627\u06cc\u06af\u0627\u0646 \u0628\u0631\u0627\u06cc \u0647\u0631 \u067e\u0631\u0648\u0698\u0647 \u062c\u062f\u06cc\u062f",
        cardTitle: "\u0622\u0645\u0627\u062a\u06cc\u0633",
        cardSub: "\u0622\u0698\u0627\u0646\u0633 \u0645\u0634\u0627\u0648\u0631\u0647 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631",
        mini1Label: "\u0645\u0634\u062a\u0631\u06cc\u0627\u0646",
        mini1Value: "350+",
        mini2Label: "\u067e\u0631\u0648\u0698\u0647\u200c\u0647\u0627\u06cc \u0627\u0646\u062c\u0627\u0645 \u0634\u062f\u0647",
        mini2Value: "870+",
        imgAlt: "\u0622\u0645\u0627\u062a\u06cc\u0633 \u2014 \u0645\u0634\u0627\u0648\u0631\u0647 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631",
      },
      marquee: {
        m1: "\u0645\u0634\u0627\u0648\u0631\u0647 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631   \u2022   \u0628\u0627\u0632\u0627\u0631\u06cc\u0627\u0628\u06cc \u062f\u06cc\u062c\u06cc\u062a\u0627\u0644   \u2022   \u062a\u062d\u0644\u06cc\u0644 \u0628\u0627\u0632\u0627\u0631   \u2022   \u062a\u0648\u0633\u0639\u0647 \u0648\u0628   \u2022   ",
        m2: "\u0627\u0633\u062a\u0631\u0627\u062a\u0698\u06cc   \u2022   \u0628\u0631\u0646\u062f\u06cc\u0646\u06af   \u2022   \u0637\u0631\u0627\u062d\u06cc \u0648\u0628 \u0648 \u0627\u067e   \u2022   \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06cc   \u2022   \u0631\u0634\u062f   \u2022   ",
      },
      offer: {
        kicker: "\u062e\u062f\u0645\u0627\u062a \u0645\u0627",
        title: "\u062e\u062f\u0645\u0627\u062a\u06cc \u0628\u0631\u0627\u06cc \u0631\u0634\u062f \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631 \u0634\u0645\u0627",
        subtitle:
          "\u0627\u0646\u062a\u062e\u0627\u0628\u06cc \u06a9\u0627\u0645\u0644 \u0627\u0632 \u062e\u062f\u0645\u0627\u062a \u0628\u0631\u0627\u06cc \u062a\u062d\u0642\u0642 \u0627\u0647\u062f\u0627\u0641 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631 \u0634\u0645\u0627 \u2014 \u0627\u0632 \u0627\u0633\u062a\u0631\u0627\u062a\u0698\u06cc \u062a\u0627 \u0627\u062c\u0631\u0627.",
        card1: {
          icon: "\ud83d\udcbc",
          title: "\u0645\u0634\u0627\u0648\u0631\u0647 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631",
          desc: "\u0645\u0634\u0627\u0648\u0631\u0647 \u0627\u0633\u062a\u0631\u0627\u062a\u0698\u06cc\u06a9 \u0628\u0631\u0627\u06cc \u062a\u0639\u06cc\u06cc\u0646 \u0627\u0647\u062f\u0627\u0641 \u062f\u0631\u0633\u062a \u0648 \u0631\u0634\u062f \u0628\u0627 \u0627\u0637\u0645\u06cc\u0646\u0627\u0646.",
        },
        card2: {
          icon: "\ud83d\udce3",
          title: "\u0628\u0627\u0632\u0627\u0631\u06cc\u0627\u0628\u06cc \u062f\u06cc\u062c\u06cc\u062a\u0627\u0644",
          desc: "\u06a9\u0645\u067e\u06cc\u0646\u200c\u0647\u0627\u06cc\u06cc \u06a9\u0647 \u0628\u0631\u0646\u062f \u0634\u0645\u0627 \u0631\u0627 \u0645\u06cc\u200c\u0633\u0627\u0632\u0646\u062f \u0648 \u062a\u0648\u062c\u0647 \u0631\u0627 \u0628\u0647 \u0645\u0634\u062a\u0631\u06cc \u062a\u0628\u062f\u06cc\u0644 \u0645\u06cc\u200c\u06a9\u0646\u0646\u062f.",
        },
        card3: {
          icon: "\ud83d\udcca",
          title: "\u062a\u062d\u0644\u06cc\u0644 \u0628\u0627\u0632\u0627\u0631",
          desc: "\u0628\u06cc\u0646\u0634\u200c\u0647\u0627\u06cc \u062f\u0627\u062f\u0627\u0645\u062d\u0648\u0631 \u0648 \u06af\u0632\u0627\u0631\u0634\u200c\u0647\u0627\u06cc \u0634\u0641\u0627\u0641 \u0628\u0631\u0627\u06cc \u0634\u0646\u0627\u062e\u062a \u0628\u0627\u0632\u0627\u0631.",
        },
        card4: {
          icon: "\ud83d\udee0\ufe0f",
          title: "\u062a\u0648\u0633\u0639\u0647 \u0648\u0628",
          desc: "\u0648\u0628\u200c\u0633\u0627\u06cc\u062a\u200c\u0647\u0627\u06cc \u0633\u0631\u06cc\u0639\u060c \u0627\u0645\u0646 \u0648 \u0632\u06cc\u0628\u0627 \u06a9\u0647 \u062f\u0627\u0633\u062a\u0627\u0646 \u0634\u0645\u0627 \u0631\u0627 \u0631\u0648\u0627\u06cc\u062a \u0645\u06cc\u200c\u06a9\u0646\u0646\u062f.",
        },
        link: "\u0628\u06cc\u0634\u062a\u0631 \u0628\u062f\u0627\u0646\u06cc\u062f",
        button: "\u0645\u0634\u0627\u0647\u062f\u0647 \u062a\u0645\u0627\u0645 \u062e\u062f\u0645\u0627\u062a",
      },
      blog: {
        kicker: "\u0628\u06cc\u0646\u0634\u200c\u0647\u0627",
        title: "\u0648\u0628\u0644\u0627\u06af \u062a\u06a9\u0646\u0648\u0644\u0648\u0698\u06cc",
        subtitle: "\u0627\u062e\u0628\u0627\u0631 \u0648 \u0631\u0627\u0647\u0646\u0645\u0627\u06cc\u06cc \u0628\u0631\u0627\u06cc \u0631\u0634\u062f \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631 \u0634\u0645\u0627.",
        post1: {
          title: "\u0686\u06af\u0648\u0646\u0647 \u0634\u0631\u06cc\u06a9 \u062f\u06cc\u062c\u06cc\u062a\u0627\u0644 \u0645\u0646\u0627\u0633\u0628 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631 \u062e\u0648\u062f \u0631\u0627 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u0645",
          date: "6 \u062f\u0633\u0627\u0645\u0628\u0631 2025",
          author: "\u0627\u06cc\u0632\u0627\u0628\u0644\u0627 \u0645\u0648\u0631\u06cc\u0631\u0627",
        },
        post2: {
          title: "5 \u062a\u0631\u0646\u062f \u0628\u0627\u0632\u0627\u0631\u06cc\u0627\u0628\u06cc \u062f\u06cc\u062c\u06cc\u062a\u0627\u0644 \u062f\u0631 \u0627\u06cc\u0646 \u0633\u0627\u0644",
          date: "2 \u062f\u0633\u0627\u0645\u0628\u0631 2025",
          author: "\u0644\u0648\u06a9\u0627\u0633 \u0633\u06cc\u0644\u0648\u0627",
        },
        post3: {
          title: "\u0686\u0631\u0627 \u0647\u0631 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631\u06cc \u0628\u0647 \u06cc\u06a9 \u0648\u0628\u200c\u0633\u0627\u06cc\u062a \u0639\u0627\u0644\u06cc \u0646\u06cc\u0627\u0632 \u062f\u0627\u0631\u062f",
          date: "29 \u0646\u0648\u0627\u0645\u0628\u0631 2025",
          author: "\u0627\u0633\u062a\u0648\u062f\u06cc\u0648 \u0622\u0645\u0627\u062a\u06cc\u0633",
        },
        readMore: "\u0627\u062f\u0627\u0645\u0647 \u0645\u0637\u0644\u0628",
        viewAll: "\u0645\u0634\u0627\u0647\u062f\u0647 \u062a\u0645\u0627\u0645 \u0648\u0628\u0644\u0627\u06af\u200c\u0647\u0627",
      },
      schedule: {
        eyebrow: "\u0645\u0634\u0627\u0648\u0631\u0647 \u0631\u0627\u06cc\u06af\u0627\u0646",
        title: "\u0627\u06a9\u0646\u0648\u0646 \u0642\u0631\u0627\u0631 \u06af\u0630\u0627\u0634\u062a\u0646 \u0632\u0645\u0627\u0646 \u0628\u062f\u06cc\u062f",
        subtitle:
          "\u06cc\u06a9 \u0645\u0634\u0627\u0648\u0631\u0647 \u0631\u0627\u06cc\u06af\u0627\u0646 \u0631\u0632\u0631\u0648 \u06a9\u0646\u06cc\u062f \u0648 \u062f\u0631\u0628\u0627\u0631\u0647 \u067e\u0631\u0648\u0698\u0647 \u062e\u0648\u062f \u062d\u0631\u0641 \u0628\u0632\u0646\u06cc\u0645.",
        button: "\u0631\u0632\u0631\u0648 \u06a9\u0631\u062f\u0646",
        chips: ["\u0645\u0634\u0627\u0648\u0631\u0647 \u0631\u0627\u06cc\u06af\u0627\u0646", "\u0628\u062f\u0648\u0646 \u062a\u0639\u0647\u062f", "\u067e\u0627\u0633\u062e\u06af\u0648\u06cc\u06cc \u0633\u0631\u06cc\u0639"],
      },
      footer: {
        tagline:
          "\u0622\u0645\u0627\u062a\u06cc\u0633 \u06cc\u06a9 \u0622\u0698\u0627\u0646\u0633 \u0645\u0634\u0627\u0648\u0631\u0647 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631 \u0627\u0633\u062a \u06a9\u0647 \u0628\u0627 \u0627\u0633\u062a\u0631\u0627\u062a\u0698\u06cc\u060c \u0628\u0627\u0632\u0627\u0631\u06cc\u0627\u0628\u06cc \u0648 \u062a\u06a9\u0646\u0648\u0644\u0648\u0698\u06cc \u0628\u0647 \u0631\u0634\u062f \u0634\u0631\u06a9\u062a\u200c\u0647\u0627 \u06a9\u0645\u06a9 \u0645\u06cc\u200c\u06a9\u0646\u062f.",
        colServices: "\u062e\u062f\u0645\u0627\u062a",
        colCompany: "\u0634\u0631\u06a9\u062a",
        colContact: "\u062a\u0645\u0627\u0633",
        links: {
          services: ["\u062e\u062f\u0645\u0627\u062a \u0645\u0627", "\u0637\u0631\u0627\u062d\u06cc \u0648\u0628", "\u0648\u0628\u200c\u0633\u0627\u06cc\u062a \u0648\u0631\u062f\u067e\u0631\u0633", "\u0648\u0628\u0644\u0627\u06af"],
          company: ["\u062e\u0627\u0646\u0647", "\u0646\u0645\u0648\u0646\u0647 \u06a9\u0627\u0631\u0647\u0627", "\u0645\u0627 \u06a9\u06cc\u0633\u062a\u06cc\u0645", "\u0627\u0631\u062a\u0628\u0627\u0637 \u0628\u0627 \u0645\u0627"],
          contact: ["\u062a\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627", "\u0631\u0632\u0631\u0648 \u0645\u0634\u0627\u0648\u0631\u0647", "\u0645\u0627 \u06a9\u06cc\u0633\u062a\u06cc\u0645", "\u0648\u0628\u0644\u0627\u06af"],
        },
        rights: "\u00a9 {year} \u0622\u0645\u0627\u062a\u06cc\u0633. \u06a9\u0644\u06cc\u0647 \u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638 \u0627\u0633\u062a.",
      },
      showcase: {
        kicker: "\u0646\u0645\u0648\u0646\u0647 \u06a9\u0627\u0631\u0647\u0627",
        title: "\u06a9\u0627\u0631\u0647\u0627\u06cc \u0645\u0627 \u0633\u062e\u0646 \u0645\u06cc\u200c\u06af\u0648\u06cc\u0646\u062f",
        subtitle:
          "\u06af\u0632\u06cc\u062f\u0647\u200c\u0627\u06cc \u0627\u0632 \u067e\u0631\u0648\u0698\u0647\u200c\u0647\u0627\u06cc \u06a9\u0647 \u0628\u0647 \u0622\u0646\u200c\u0647\u0627 \u0627\u0641\u062a\u062e\u0627\u0631 \u0645\u06cc\u200c\u06a9\u0646\u06cc\u0645 \u2014 \u0648\u0628\u200c\u0633\u0627\u06cc\u062a\u060c \u0628\u0631\u0646\u062f \u0648 \u06a9\u0627\u0631\u0647\u0627\u06cc \u062e\u0644\u0627\u0642\u0627\u0646\u0647.",
        filters: ["\u0647\u0645\u0647", "\u0648\u0628\u200c\u0633\u0627\u06cc\u062a", "\u0628\u0631\u0646\u062f", "\u062e\u0644\u0627\u0642\u0627\u0646\u0647"],
        item1: { title: "\u0648\u0628\u200c\u0633\u0627\u06cc\u062a \u0634\u0631\u06a9\u062a\u06cc", cat: "Websites" },
        item2: { title: "\u0647\u0648\u06cc\u062a \u0628\u0631\u0646\u062f", cat: "Branding" },
        item3: { title: "\u0627\u067e\u0644\u06cc\u06a9\u06cc\u0634\u0646 \u0645\u0648\u0628\u0627\u06cc\u0644", cat: "Websites" },
        item4: { title: "\u06a9\u0645\u067e\u06cc\u0646 \u062e\u0644\u0627\u0642\u0627\u0646\u0647", cat: "Creative" },
        item5: { title: "\u0641\u0631\u0648\u0634\u06af\u0627\u0647 \u0622\u0646\u0644\u0627\u06cc\u0646", cat: "Websites" },
        item6: { title: "\u0637\u0631\u0627\u062d\u06cc\u200c\u0647\u0627\u06cc \u0628\u0627\u0632\u0627\u0631\u06cc\u0627\u0628\u06cc", cat: "Creative" },
      },
      wwo: {
        kicker: "\u062e\u062f\u0645\u0627\u062a \u0645\u0627",
        title: "\u0627\u0646\u062a\u062e\u0627\u0628\u06cc \u06a9\u0627\u0645\u0644 \u0627\u0632 \u062e\u062f\u0645\u0627\u062a",
        subtitle:
          "\u0647\u0631 \u0622\u0646\u0686\u0647 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631 \u0634\u0645\u0627 \u0628\u0631\u0627\u06cc \u0631\u0634\u062f \u0622\u0646\u0644\u0627\u06cc\u0646 \u0646\u06cc\u0627\u0632 \u062f\u0627\u0631\u062f \u2014 \u062a\u062d\u062a \u06cc\u06a9 \u0633\u0642\u0641.",
        button: "\u0631\u0632\u0631\u0648 \u0645\u0634\u0627\u0648\u0631\u0647",
        link: "\u0628\u06cc\u0634\u062a\u0631 \u0628\u062f\u0627\u0646\u06cc\u062f",
        p1: "\u0645\u0627 \u0627\u0646\u062f\u06cc\u0634\u0647 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631\u060c \u0637\u0631\u0627\u062d\u06cc \u0648 \u062a\u06a9\u0646\u0648\u0644\u0648\u0698\u06cc \u0631\u0627 \u062a\u0631\u06a9\u06cc\u0628 \u0645\u06cc\u200c\u06a9\u0646\u06cc\u0645 \u062a\u0627 \u0646\u062a\u06cc\u062c\u0647 \u0628\u062f\u0647\u06cc\u0645. \u0647\u0631 \u0647\u0645\u06a9\u0627\u0631\u06cc \u0628\u0627 \u06af\u0648\u0634 \u06a9\u0631\u062f\u0646 \u0628\u0647 \u0627\u0647\u062f\u0627\u0641 \u0634\u0645\u0627 \u0622\u063a\u0627\u0632 \u0648 \u0628\u0627 \u0646\u062a\u0627\u06cc\u062c \u0642\u0627\u0628\u0644 \u0627\u0646\u062f\u0627\u0632\u0647\u200c\u06af\u06cc\u0631\u06cc \u067e\u0627\u06cc\u0627\u0646 \u0645\u06cc\u200c\u06cc\u0627\u0628\u062f.",
      },
      wd: {
        kicker: "\u0637\u0631\u0627\u062d\u06cc \u0648\u0628",
        title: "\u0637\u0631\u0627\u062d\u06cc\u200c\u0647\u0627\u06cc\u06cc \u06a9\u0647 \u0628\u0627\u0632\u062f\u06cc\u062f\u06a9\u0646\u0646\u062f\u06af\u0627\u0646 \u0631\u0627 \u0628\u0647 \u0645\u0634\u062a\u0631\u06cc \u062a\u0628\u062f\u06cc\u0644 \u0645\u06cc\u200c\u06a9\u0646\u062f",
        subtitle: "\u0627\u0632 \u0637\u0631\u0627\u062d\u06cc \u0648\u0628 \u062a\u0627 \u06cc\u06a9 \u062d\u0636\u0648\u0631 \u06a9\u0627\u0645\u0644 \u0622\u0646\u0644\u0627\u06cc\u0646.",
        p1: "\u0648\u0628\u200c\u0633\u0627\u06cc\u062a \u0634\u0645\u0627 \u0648\u06cc\u062a\u0631\u06cc\u0646 \u062f\u06cc\u062c\u06cc\u062a\u0627\u0644 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631 \u0634\u0645\u0627\u0633\u062a. \u0645\u0627 \u0648\u0628\u200c\u0633\u0627\u06cc\u062a\u200c\u0647\u0627\u06cc \u0633\u0631\u06cc\u0639\u060c \u062f\u0633\u062a\u0631\u0633\u06cc\u200c\u067e\u0630\u06cc\u0631 \u0648 \u0645\u062a\u0645\u0631\u06a9\u0632 \u0628\u0631 \u062a\u0628\u062f\u06cc\u0644 \u0631\u0627 \u0637\u0631\u0627\u062d\u06cc \u0645\u06cc\u200c\u06a9\u0646\u06cc\u0645 \u06a9\u0647 \u062f\u0627\u0633\u062a\u0627\u0646 \u0634\u0645\u0627 \u0631\u0627 \u0631\u0648\u0627\u06cc\u062a \u0645\u06cc\u200c\u06a9\u0646\u0646\u062f.",
        f1: "\u0637\u0631\u0627\u062d\u06cc \u0645\u062f\u0631\u0646 \u0648 \u0645\u062a\u0645\u0631\u06a9\u0632 \u0628\u0631 \u062a\u0628\u062f\u06cc\u0644",
        f2: "\u0648\u0627\u06a9\u0646\u0634\u200c\u06af\u0631\u0627 \u062f\u0631 \u0647\u0645\u0647 \u062f\u0633\u062a\u06af\u0627\u0647\u200c\u0647\u0627",
        f3: "\u0628\u0627\u0631\u06af\u0630\u0627\u0631\u06cc \u0633\u0631\u06cc\u0639 \u0648 \u0645\u0646\u0627\u0633\u0628 \u0628\u0631\u0627\u06cc SEO",
        f4: "\u0645\u062f\u06cc\u0631\u06cc\u062a \u0622\u0633\u0627\u0646 \u0645\u062d\u062a\u0648\u0627",
        ctaTitle: "\u0622\u0645\u0627\u062f\u0647 \u0628\u0627\u0632\u0637\u0631\u0627\u062d\u06cc \u0648\u0628\u200c\u0633\u0627\u06cc\u062a \u062e\u0648\u062f \u0647\u0633\u062a\u06cc\u062f\u061f",
        ctaButton: "\u0631\u0632\u0631\u0648 \u06a9\u0631\u062f\u0646",
      },
      wp: {
        kicker: "\u0648\u0628\u200c\u0633\u0627\u06cc\u062a \u0648\u0631\u062f\u067e\u0631\u0633",
        title: "\u0648\u0628\u200c\u0633\u0627\u06cc\u062a\u200c\u0647\u0627\u06cc \u0648\u0631\u062f\u067e\u0631\u0633 \u06a9\u0647 \u0628\u062f\u0648\u0646 \u062f\u063a\u062f\u063a\u0647 \u06a9\u0627\u0631 \u0645\u06cc\u200c\u06a9\u0646\u0646\u062f",
        subtitle: "\u062a\u0648\u0633\u0639\u0647 \u0648 \u067e\u0634\u062a\u06cc\u0628\u0627\u0646\u06cc \u062d\u0631\u0641\u0647\u200c\u0627\u06cc \u0648\u0631\u062f\u067e\u0631\u0633.",
        p1: "\u0627\u0632 \u062a\u0645\u200c\u0647\u0627\u06cc \u0633\u0641\u0627\u0631\u0634\u06cc \u062a\u0627 \u0641\u0631\u0648\u0634\u06af\u0627\u0647 \u06a9\u0627\u0645\u0644\u060c \u0648\u0628\u200c\u0633\u0627\u06cc\u062a\u200c\u0647\u0627\u06cc \u0648\u0631\u062f\u067e\u0631\u0633 \u0627\u0645\u0646\u060c \u0633\u0631\u06cc\u0639 \u0648 \u0628\u0627 \u0645\u062f\u06cc\u0631\u06cc\u062a \u0622\u0633\u0627\u0646 \u0628\u0631\u0627\u06cc \u062a\u06cc\u0645 \u0634\u0645\u0627 \u0645\u06cc\u200c\u0633\u0627\u0632\u06cc\u0645.",
        f1: "\u0642\u0627\u0644\u0628\u200c\u0647\u0627\u06cc \u0648\u0631\u062f\u067e\u0631\u0633 \u0633\u0641\u0627\u0631\u0634\u06cc",
        f2: "\u0627\u0645\u0646 \u0648 \u0628\u0647\u06cc\u0646\u0647\u200c\u0633\u0627\u0632\u06cc \u0634\u062f\u0647 \u0628\u0631\u0627\u06cc \u0639\u0645\u0644\u06a9\u0631\u062f",
        f3: "\u0628\u0647\u200c\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06cc \u0648 \u0646\u06af\u0647\u062f\u0627\u0631\u06cc \u0622\u0633\u0627\u0646",
        f4: "\u067e\u0634\u062a\u06cc\u0628\u0627\u0646\u06cc \u0645\u0633\u062a\u0645\u0631",
        ctaTitle: "\u0628\u06cc\u0627\u06cc\u06cc\u062f \u0648\u0628\u200c\u0633\u0627\u06cc\u062a \u0648\u0631\u062f\u067e\u0631\u0633 \u0634\u0645\u0627 \u0631\u0627 \u0628\u0633\u0627\u0632\u06cc\u0645",
        ctaButton: "\u0631\u0632\u0631\u0648 \u06a9\u0631\u062f\u0646",
      },
      blogList: {
        kicker: "\u0648\u0628\u0644\u0627\u06af",
        title: "\u0622\u062e\u0631\u06cc\u0646 \u0627\u062e\u0628\u0627\u0631 \u0648 \u0628\u06cc\u0646\u0634\u200c\u0647\u0627",
        subtitle: "\u0631\u0627\u0647\u0646\u0645\u0627\u06cc\u06cc\u200c\u0647\u0627\u060c \u0627\u062e\u0628\u0627\u0631 \u0648 \u0627\u06cc\u062f\u0647\u200c\u0647\u0627\u06cc\u06cc \u0628\u0631\u0627\u06cc \u0631\u0634\u062f \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631.",
        loading: "در حال بارگذاری مقاله‌ها…",
        error: "خطا در بارگذاری مقاله‌ها.",
        empty: "هنوز مقاله‌ای منتشر نشده است؛ به‌زودی برگردید!",
        minRead: "دقیقه مطالعه",
        readMore: "\u0627\u062f\u0627\u0645\u0647 \u0645\u0637\u0644\u0628",
      },
      waw: {
        kicker: "\u0645\u0627 \u06a9\u06cc\u0633\u062a\u06cc\u0645",
        title: "\u0645\u0627 \u0627\u0632 \u0627\u0647\u062f\u0627\u0641 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631 \u0634\u0645\u0627 \u0645\u0631\u0627\u0642\u0628\u062a \u0645\u06cc\u200c\u06a9\u0646\u06cc\u0645",
        p1: "\u0622\u0645\u0627\u062a\u06cc\u0633 \u06cc\u06a9 \u0622\u0698\u0627\u0646\u0633 \u0645\u0634\u0627\u0648\u0631\u0647 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631 \u0628\u0627 \u0628\u06cc\u0634 \u0627\u0632 10 \u0633\u0627\u0644 \u0633\u0627\u0628\u0642\u0647 \u0627\u0633\u062a. \u0645\u0627 \u0628\u0627 \u062a\u0631\u06a9\u06cc\u0628 \u0627\u0633\u062a\u0631\u0627\u062a\u0698\u06cc\u060c \u0628\u0627\u0632\u0627\u0631\u06cc\u0627\u0628\u06cc \u0648 \u062a\u06a9\u0646\u0648\u0644\u0648\u0698\u06cc \u0628\u0647 \u0634\u0631\u06a9\u062a\u200c\u0647\u0627 \u062f\u0631 \u0631\u0634\u062f \u06a9\u0645\u06a9 \u0645\u06cc\u200c\u06a9\u0646\u06cc\u0645.",
        p2: "\u0627\u0632 \u062a\u062d\u0644\u06cc\u0644 \u0628\u0627\u0632\u0627\u0631 \u062a\u0627 \u062a\u0648\u0633\u0639\u0647 \u0648\u0628\u060c \u0628\u0627 \u0634\u0641\u0627\u0641\u06cc\u062a\u060c \u06a9\u06cc\u0641\u06cc\u062a \u0648 \u0646\u062a\u0627\u06cc\u062c \u0642\u0627\u0628\u0644 \u0627\u0646\u062f\u0627\u0632\u0647\u200c\u06af\u06cc\u0631\u06cc \u062f\u0631 \u06a9\u0646\u0627\u0631 \u0634\u0645\u0627 \u0647\u0633\u062a\u06cc\u0645.",
        counter1: "\u0645\u0634\u062a\u0631\u06cc\u0627\u0646",
        counter2: "\u0631\u0636\u0627\u06cc\u062a",
        counter3: "\u067e\u0631\u0648\u0698\u0647\u200c\u0647\u0627",
        value1: { icon: "\ud83c\udfaf", title: "\u062a\u0645\u0631\u06a9\u0632 \u0628\u0631 \u06a9\u06cc\u0641\u06cc\u062a", desc: "\u0641\u0642\u0637 \u0628\u0647\u062a\u0631\u06cc\u0646 \u06a9\u0627\u0631\u0647\u0627\u060c \u0628\u0627 \u062f\u0642\u062a \u0627\u0646\u062c\u0627\u0645 \u0645\u06cc\u200c\u0634\u0648\u062f." },
        value2: { icon: "\ud83e\udd1d", title: "\u0627\u0639\u062a\u0645\u0627\u062f \u0645\u0634\u062a\u0631\u06cc", desc: "\u0634\u0641\u0627\u0641\u06cc\u062a \u062f\u0631 \u0642\u06cc\u0645\u062a\u060c \u0641\u0631\u0622\u06cc\u0646\u062f \u0648 \u0646\u062a\u0627\u06cc\u062c." },
        value3: { icon: "\u26a1", title: "\u0633\u0631\u0639\u062a", desc: "\u0627\u062c\u0631\u0627\u06cc \u0633\u0631\u06cc\u0639 \u0628\u062f\u0648\u0646 \u06a9\u0627\u0647\u0634 \u06a9\u06cc\u0641\u06cc\u062a." },
        ctaTitle: "\u0628\u06cc\u0627\u06cc\u06cc\u062f \u0628\u0627 \u0647\u0645 \u06a9\u0627\u0631 \u06a9\u0646\u06cc\u0645",
        ctaButton: "\u0627\u0631\u062a\u0628\u0627\u0637 \u0628\u0627 \u0645\u0627",
      },
      connect: {
        kicker: "\u0627\u0631\u062a\u0628\u0627\u0637 \u0628\u0627 \u0645\u0627",
        title: "\u062f\u0631\u0628\u0627\u0631\u0647 \u067e\u0631\u0648\u0698\u0647 \u0634\u0645\u0627 \u062d\u0631\u0641 \u0628\u0632\u0646\u06cc\u0645",
        subtitle:
          "\u067e\u0631\u0648\u0698\u0647\u200c\u0627\u06cc \u062f\u0631 \u0646\u0638\u0631 \u062f\u0627\u0631\u06cc\u062f \u06cc\u0627 \u0633\u0648\u0627\u0644\u06cc \u062f\u0627\u0631\u06cc\u062f\u061f \u062a\u06cc\u0645 \u0645\u0627 \u062f\u0631 \u06a9\u0646\u0627\u0631 \u0634\u0645\u0627\u0633\u062a.",
        phone: "\u062a\u0644\u0641\u0646",
        phoneValue: "+852 2569 7974",
        email: "\u0627\u06cc\u0645\u06cc\u0644",
        emailValue: "hello@amatisberry.ir",
        address: "\u0622\u062f\u0631\u0633",
        addressValue: "\u062e\u06cc\u0627\u0628\u0627\u0646 \u06a9\u06cc\u0646\u06af 21\u060c \u0645\u0644\u0628\u0648\u0631\u0646\u060c \u0648\u06cc\u06a9\u062a\u0648\u0631\u06cc\u0627 1202\u060c \u0627\u0633\u062a\u0631\u0627\u0644\u06cc\u0627",
        hours: "\u0633\u0627\u0639\u0627\u062a \u067e\u0627\u0633\u062e\u06af\u0648\u06cc\u06cc",
        hoursValue: "\u0634\u0646\u0628\u0647 \u062a\u0627 \u067e\u0646\u062c\u0634\u0646\u0628\u0647\u060c 9:00 \u2013 18:00",
        formTitle: "\u0628\u0631\u0627\u06cc \u0645\u0627 \u067e\u06cc\u0627\u0645 \u0628\u0641\u0631\u0633\u062a\u06cc\u062f",
        formName: "\u0646\u0627\u0645",
        formEmail: "\u0627\u06cc\u0645\u06cc\u0644",
        formSubject: "\u0645\u0648\u0636\u0648\u0639",
        formMessage: "\u067e\u06cc\u0627\u0645",
        formSubmit: "\u0627\u0631\u0633\u0627\u0644 \u067e\u06cc\u0627\u0645",
        formSent: "\u067e\u06cc\u0627\u0645 \u0634\u0645\u0627 \u0628\u0627 \u0645\u0648\u0641\u0642\u06cc\u062a \u0627\u0631\u0633\u0627\u0644 \u0634\u062f. \u0628\u0647 \u0632\u0648\u062f\u06cc \u067e\u0627\u0633\u062e \u062e\u0648\u0627\u0647\u06cc\u0645 \u062f\u0627\u062f.",
        errorGeneric: "\u062f\u0631 \u0627\u0631\u0633\u0627\u0644 \u067e\u06cc\u0627\u0645 \u0645\u0634\u06a9\u0644\u06cc \u0631\u062e \u062f\u0627\u062f. \u0644\u0637\u0641\u0627\u064b \u0628\u0639\u062f\u0627\u064b \u062f\u0648\u0628\u0627\u0631\u0647 \u062a\u0644\u0627\u0634 \u06a9\u0646\u06cc\u062f.",
        scheduleTitle: "\u0631\u0632\u0631\u0648 \u0645\u0634\u0627\u0648\u0631\u0647 \u0631\u0627\u06cc\u06af\u0627\u0646",
        scheduleText: "\u062a\u0631\u062c\u06cc\u062d \u0645\u06cc\u200c\u062f\u0647\u06cc\u062f \u062a\u0644\u0641\u0646\u06cc \u062d\u0631\u0641 \u0628\u0632\u0646\u06cc\u0645\u061f \u06cc\u06a9 \u0645\u0634\u0627\u0648\u0631\u0647 \u0631\u0627\u06cc\u06af\u0627\u0646 \u0631\u0632\u0631\u0648 \u06a9\u0646\u06cc\u062f.",
        scheduleButton: "\u0627\u06a9\u0646\u0648\u0646 \u0631\u0632\u0631\u0648 \u06a9\u0646\u06cc\u062f",
      },
    },

    ar: {
      meta: {
        title: "\u0623\u0645\u0627\u062a\u064a\u0633 \u00b7 \u0648\u0643\u0627\u0644\u0629 \u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0623\u0639\u0645\u0627\u0644",
        description:
          "\u0623\u0645\u0627\u062a\u064a\u0633 \u0648\u0643\u0627\u0644\u0629 \u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0623\u0639\u0645\u0627\u0644 \u062a\u0633\u0627\u0639\u062f \u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0639\u0644\u0649 \u0627\u0644\u0646\u0645\u0648 \u0645\u0646 \u062e\u0644\u0627\u0644 \u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629 \u0648\u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0648\u0627\u0644\u062a\u0642\u0646\u064a\u0629.",
      },
      brand: "\u0623\u0645\u0627\u062a\u064a\u0633",
      nav: {
        home: "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629",
        showcase: "\u0623\u0639\u0645\u0627\u0644\u0646\u0627",
        whatWeOffer: "\u0645\u0627 \u0646\u0642\u062f\u0645\u0647",
        webDesign: "\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0648\u064a\u0628",
        wordpress: "\u0645\u0648\u0642\u0639 \u0648\u0648\u0631\u062f\u0628\u0631\u0633",
        blogs: "\u0627\u0644\u0645\u062f\u0648\u0646\u0629",
        whoAreWe: "\u0645\u0646 \u0646\u062d\u0646",
        connect: "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627",
        pricing: "الباقات والأسعار",
        chooseLanguage: "\u0627\u062e\u062a\u0631 \u0627\u0644\u0644\u063a\u0629",
        active: "\u0646\u0634\u0637",
      },

      services: {
        "title": "خدماتنا",
        "subtitle": "كل نوع من المنتجات الرقمية التي يحتاجها عملك — من الفكرة إلى التنفيذ الكامل.",
        "viewAll": "عرض جميع الخدمات",
        "apps": {
          "title": "تطوير التطبيقات",
          "lead": "تطبيقات أندرويد و iOS وتطبيقات الويب مع أحدث التقنيات.",
          "android": "تطبيق أندرويد",
          "ios": "تطبيق iOS",
          "pwa": "تطبيق ويب و PWA",
          "ecom": "تطبيق متجر إلكتروني",
          "classifieds": "تطبيق إعلانات مبوبة",
          "reader": "تطبيق قراءة الكتب",
          "tourism": "تطبيق سياحة",
          "taxi": "تطبيق تاكسي ونقل",
          "booking": "حجز طيران وفنادق"
        },
        "websites": {
          "title": "تصميم المواقع",
          "lead": "مواقع مخصصة أو ووردبريس لكل الصناعات.",
          "corporate": "موقع شركات",
          "classifieds": "موقع إعلانات مبوبة",
          "marketplace": "موقع سوق",
          "store": "متجر إلكتروني",
          "restaurant": "موقع مطعم",
          "news": "موقع إخباري",
          "medical": "موقع طبي وعيادات",
          "tourism": "موقع سياحي",
          "reader": "موقع قراءة الكتب",
          "wordpress": "موقع ووردبريس"
        },
        "ecommerce": {
          "title": "التجارة الإلكترونية",
          "lead": "متاجر وأسواق إلكترونية مع دفع مدمج.",
          "store": "متجر إلكتروني",
          "marketplace": "سوق متعدد البائعين",
          "subscription": "متجر اشتراكات",
          "shopify": "متجر Shopify"
        },
        "blockchain": {
          "title": "البلوكتشين والعملات الرقمية",
          "lead": "بورصات وبوابات دفع وعقود ذكية على البلوكتشين.",
          "cex": "بورصة عملات رقمية",
          "dex": "بورصة لا مركزية (DEX)",
          "p2p": "بورصة P2P",
          "otc": "بورصة OTC",
          "gateway": "بوابة دفع رقمية",
          "contracts": "عقود ذكية ورموز",
          "airdrop": "منصة إيردروب",
          "app": "تطبيق بورصة"
        },
        "more": {
          "title": "خدمات إضافية",
          "lead": "تصميم ونمو ورعاية تحافظ على تقدم منتجك.",
          "uiux": "تصميم UI/UX",
          "seo": "تحسين محركات البحث والتسويق الرقمي",
          "dashboards": "لوحات تحكم وإدارة",
          "support": "صيانة ودعم"
        }
      },
      pricing: {
        "title": "الباقات والأسعار",
        "subtitle": "باقات شفافة بأسعار ثابت لكل خدمة نقدمها — من البداية إلى الإطلاق.",
        "cta": "استشارة مجانية",
        "from": "من",
        "unit": "مليون تومان",
        "apps": {
          "title": "تطوير التطبيقات",
          "lead": "اختر الباقة المناسبة لمرحلة منتجك — من MVP إلى منصة كاملة.",
          "plans": [
            {
              "name": "تطبيق ستارتر",
              "tag": "MVP ومنصة واحدة",
              "old": "110",
              "price": "90",
              "features": [
                "أندرويد أو iOS",
                "نطاق MVP والمسارات الأساسية",
                "UI/UX قياسي",
                "لوحة تحكم أساسية",
                "نشر في المتجر",
                "شهر واحد من الدعم"
              ]
            },
            {
              "name": "تطبيق احترافي",
              "tag": "الأكثر طلباً",
              "old": "170",
              "price": "140",
              "features": [
                "أندرويد + iOS",
                "تصميم UI/UX مخصص",
                "لوحة تحكم ودراسة",
                "مدفوعات وإشعارات",
                "تكامل تحليلات",
                "3 أشهر من الدعم"
              ]
            },
            {
              "name": "تطبيق مؤسسي",
              "tag": "منصة كاملة",
              "old": "250",
              "price": "210",
              "features": [
                "متعدد المنصات أو أصلي",
                "وضع دون اتصال ومزامنة",
                "لوحة تحكم وتقارير متقدمة",
                "تكاملات خارجية",
                "مراجعة الأمان والأداء",
                "12 شهراً من الدعم"
              ]
            }
          ]
        },
        "websites": {
          "title": "تصميم المواقع",
          "lead": "مواقع تحقق التحويل — من صفحات الهبوط إلى منصات المحتوى.",
          "plans": [
            {
              "name": "موقع ستارتر",
              "tag": "حتى 8 صفحات",
              "old": "50",
              "price": "40",
              "features": [
                "تصميم متجاوب",
                "حتى 8 صفحات",
                "نموذج تواصل",
                "أساسيات السيو",
                "تحسين السرعة",
                "شهر واحد من الدعم"
              ]
            },
            {
              "name": "موقع أعمال",
              "tag": "إدارة محتوى ومدونة",
              "old": "90",
              "price": "70",
              "features": [
                "حتى 20 صفحة",
                "إدارة محتوى / ووردبريس",
                "قسم مدونة وأخبار",
                "متعدد اللغات",
                "تحليلات ونماذج",
                "3 أشهر من الدعم"
              ]
            },
            {
              "name": "منصة مخصصة",
              "tag": "تطبيق ويب ولوحة",
              "old": "150",
              "price": "120",
              "features": [
                "تطبيق ويب مخصص",
                "حسابات مستخدمين وأدوار",
                "تكاملات API",
                "لوحة تحكم متقدمة",
                "وحدات مخصصة",
                "6 أشهر من الدعم"
              ]
            }
          ]
        },
        "ecommerce": {
          "title": "التجارة الإلكترونية",
          "lead": "متاجر وأسواق مصممة للبيع — سلة ودفع وشحن متكاملة.",
          "plans": [
            {
              "name": "متجر أساسي",
              "tag": "أطلق متجرك",
              "old": "100",
              "price": "80",
              "features": [
                "كتالوج المنتجات",
                "سلة ودخول للدفع",
                "بوابة دفع واحدة",
                "إدارة الطلبات",
                "حسابات العملاء",
                "شهر واحد من الدعم"
              ]
            },
            {
              "name": "متجر متقدم",
              "tag": "نمو وتحسين",
              "old": "160",
              "price": "130",
              "features": [
                "بوابات دفع متعددة",
                "نظام خصومات وكوبونات",
                "مخزون ومستودعات",
                "شحن وتتبع",
                "تقارير وتحليلات",
                "3 أشهر من الدعم"
              ]
            },
            {
              "name": "سوق متعدد البائعين",
              "tag": "متعدد البائعين",
              "old": "260",
              "price": "220",
              "features": [
                "بيع متعدد البائعين",
                "لوحات بائعين وعمولات",
                "ضمان وتسويات",
                "تقييمات وآراء",
                "إدارة المرتجعات",
                "6 أشهر من الدعم"
              ]
            }
          ]
        },
        "blockchain": {
          "title": "البلوكتشين والعملات الرقمية",
          "lead": "بورصات وبوابات وعقود ذكية آمنة على الشبكات الرائدة.",
          "plans": [
            {
              "name": "توكن وعقود",
              "tag": "ERC-20 / BEP-20",
              "old": "110",
              "price": "90",
              "features": [
                "تطوير توكن",
                "عقود ذكية",
                "تخزين أو إيردروب",
                "تكامل محفظة",
                "دعم التدقيق",
                "شهر واحد من الدعم"
              ]
            },
            {
              "name": "بوابة دفع",
              "tag": "قبول العملات الرقمية",
              "old": "190",
              "price": "160",
              "features": [
                "بوابة دفع رقمية",
                "لوحة تحكم تاجر",
                "API وإضافات",
                "تسوية تلقائية",
                "متعدد العملات",
                "3 أشهر من الدعم"
              ]
            },
            {
              "name": "بورصة عملات",
              "tag": "CEX / OTC / P2P",
              "old": "320",
              "price": "280",
              "features": [
                "محرك أوامر",
                "محافظ و KYC",
                "تداول P2P / OTC",
                "لوحة إدارة",
                "تعزيز الأمان",
                "6 أشهر من الدعم"
              ]
            }
          ]
        },
        "more": {
          "title": "خدمات إضافية",
          "lead": "تصميم ونمو ورعاية تحافظ على تقدم منتجك.",
          "plans": [
            {
              "name": "تصميم UI/UX",
              "tag": "نظام تصميم",
              "old": "75",
              "price": "60",
              "features": [
                "تدقيق وبحث UX",
                "ويرفريم ونماذج أولية",
                "نظام تصميم",
                "نماذج تفاعلية",
                "تسليم للمطورين",
                "جولات مراجعة"
              ]
            },
            {
              "name": "سيو وتسويق",
              "tag": "خطة نمو",
              "old": "65",
              "price": "50",
              "features": [
                "سيو تقني",
                "استراتيجية كلمات مفتاحية",
                "خطة محتوى",
                "تتبع الأداء",
                "تقارير شهرية",
                "إعداد حملات إعلانية"
              ]
            },
            {
              "name": "صيانة ودعم",
              "tag": "رعاية شهرية",
              "old": "30",
              "price": "25",
              "features": [
                "تحديثات شهرية",
                "إصلاح الأخطاء",
                "ترقيات أمان",
                "إدارة النسخ الاحتياطي",
                "دعم ذو أولوية",
                "فوترة شهرية"
              ]
            }
          ]
        }
      },
      svcdesc: {
        apps: {
          android: "تطبيقات أندرويد أصلية بـ Kotlin ومعمارية حديثة — من MVP إلى منتج كامل.",
          ios: "تطبيقات iOS أصلية بـ Swift و SwiftUI جاهزة للمتجر.",
          pwa: "تطبيقات ويب و PWA سريعة قابلة للتثبيت على جميع الأجهزة والمتصفحات.",
          ecom: "تطبيقات تسوق متكاملة مع سلة المشتريات والدفع والطلبات وإشعارات دفع.",
          classifieds: "تطبيقات إعلانات مع دردشة وبحث وفلاترات ونشر آمن.",
          reader: "تطبيقات قراءة للكتب الإلكترونية والصوتية مع مزامنة واشتراكات.",
          tourism: "تطبيقات سياحة مع جولات وخرائط وتجارب محلية.",
          taxi: "تطبيقات حجز سيارات مع تتبع مباشر وإرسال سائق ودفع داخل التطبيق.",
          booking: "تطبيقات حجز طيران وفنادق مع التوفر وتأكيد فوري.",
        },
        websites: {
          corporate: "مواقع شركات مصقلة تعرض شركتك باحترافية.",
          classifieds: "مواقع إعلانات مثل المنصات الكبيرة — بحث ونشر ومحادثة.",
          marketplace: "مواقع أسواق مع متاجر متعددة وسلة مشتريات ودفع.",
          store: "متاجر إلكترونية سريعة مع كاتالوج ودفع وشحن.",
          restaurant: "مواقع مطاعم مع قوائم وحجز طاولة وطلب أونلاين.",
          news: "مواقع أخبار مع أنظمة تحرير وتوزيع سريع.",
          medical: "مواقع طبية مع حجز مواعيد أونلاين وبوابة مرضى.",
          tourism: "مواقع سياحة مع جولات وفنادق وحجز رحلات.",
          reader: "مواقع قراءة لبيع وبث الكتب الإلكترونية والصوتية.",
          wordpress: "مواقع ووردبرس محسنة للسرعة والسيو والتحرير السهل.",
        },
        ecommerce: {
          store: "متاجر إلكترونية مخصصة مع إتمام شراء سلس وإدارة كاملة.",
          marketplace: "أسواق متعددة البائعين حيث يبيع الكثيرون على منصة واحدة.",
          subscription: "متاجر اشتراكات للعضويات والصناديق وإيرادات متكررة.",
          shopify: "متاجر شوبيفاي مكونة ومخصصة لعلامتك.",
        },
        blockchain: {
          cex: "منصات تداول مركزية مع دفاتر أوامر ومحافظ وتحقق من الهوية.",
          dex: "منصات لامركزية مع مبادلات داخل السلسلة ومجموعات سيولة.",
          p2p: "منصات تداول P2P تربط المشترين والبائعين مباشرة.",
          otc: "مكاتب OTC للصفقات الكبيرة والخاصة مع دعم مخصص.",
          gateway: "بوابات دفع رقمية لقبول الأصول الرقمية على منصتك.",
          contracts: "تطوير العقود الذكية والتوكنات على بلوكتشين الرائد.",
          airdrop: "منصات إيردروب وتوزيع التوكنات مع حملات تلقائية.",
          app: "تطبيقات تداول مع رسوم بيانية وتداول وإدارة محفظة.",
        },
        more: {
          uiux: "تصميم منتج وواجهة يحبه المستخدمون — من الإطار إلى دقة عالية.",
          seo: "سيو وتسويق رقمي لتنمية الزيارات والمبيعات.",
          dashboards: "لوحات تحكم وإدارية لإدارة عملك بالبيانات.",
          support: "صيانة واستضافة ودعم تحافظ على استمرارية العمل.",
        },
      },
      hero: {
        eyebrow: "\u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0623\u0639\u0645\u0627\u0644 \u00b7 \u062d\u0644\u0648\u0644 \u0631\u0642\u0645\u064a\u0629",
        titleStart: "\u0634\u0631\u064a\u0643\u0643 \u0641\u064a ",
        titleGrad: "\u0627\u0644\u0627\u0633\u062a\u0634\u0627\u0631\u0629",
        titleEnd: " \u0644\u0644\u0646\u0645\u0648.",
        statBadge: "10+",
        statText: "\u0633\u0646\u0648\u0627\u062a \u0645\u0646 \u0627\u0644\u062e\u0628\u0631\u0629 \u0644\u0644\u0639\u0646\u0627\u064a\u0629 \u0628\u0623\u0647\u062f\u0627\u0641 \u0639\u0645\u0644\u0643",
        lead: "\u062a\u0633\u0627\u0639\u062f \u0623\u0645\u0627\u062a\u064a\u0633 \u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0627\u0644\u0637\u0645\u0648\u062d\u0629 \u0639\u0644\u0649 \u0627\u0644\u0646\u0645\u0648 \u0645\u0646 \u062e\u0644\u0627\u0644 \u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629 \u0648\u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0648\u0627\u0644\u062a\u0642\u0646\u064a\u0629. \u0645\u0646 \u0627\u0644\u0641\u0643\u0631\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u062d\u062a\u0649 \u0625\u0637\u0644\u0627\u0642 \u0627\u0644\u0645\u0646\u062a\u062c\u060c \u0646\u062d\u0646 \u0628\u062c\u0627\u0646\u0628\u0643 \u0641\u064a \u0643\u0644 \u062e\u0637\u0648\u0629.",
        ctaPrimary: "\u0627\u0633\u062a\u0643\u0634\u0641 \u062e\u062f\u0645\u0627\u062a\u0646\u0627",
        ctaSecondary: "\u0639\u0631\u0636 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",
        chips: [
          "\u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0623\u0639\u0645\u0627\u0644",
          "\u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0627\u0644\u0631\u0642\u0645\u064a",
          "\u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0633\u0648\u0642",
          "\u062a\u0637\u0648\u064a\u0631 \u0627\u0644\u0648\u064a\u0628",
          "\u062d\u0644\u0648\u0644 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a",
        ],
        note: "\u0627\u0633\u062a\u0634\u0627\u0631\u0629 \u0645\u062c\u0627\u0646\u064a\u0629 \u0644\u0643\u0644 \u0645\u0634\u0631\u0648\u0639 \u062c\u062f\u064a\u062f",
        cardTitle: "\u0623\u0645\u0627\u062a\u064a\u0633",
        cardSub: "\u0648\u0643\u0627\u0644\u0629 \u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0623\u0639\u0645\u0627\u0644",
        mini1Label: "\u0627\u0644\u0639\u0645\u0644\u0627\u0621",
        mini1Value: "350+",
        mini2Label: "\u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639 \u0627\u0644\u0645\u0646\u062c\u0632\u0629",
        mini2Value: "870+",
        imgAlt: "\u0623\u0645\u0627\u062a\u064a\u0633 \u2014 \u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0623\u0639\u0645\u0627\u0644",
      },
      marquee: {
        m1: "\u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0623\u0639\u0645\u0627\u0644   \u2022   \u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0627\u0644\u0631\u0642\u0645\u064a   \u2022   \u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0633\u0648\u0642   \u2022   \u062a\u0637\u0648\u064a\u0631 \u0627\u0644\u0648\u064a\u0628   \u2022   ",
        m2: "\u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629   \u2022   \u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u062a\u062c\u0627\u0631\u064a\u0629   \u2022   \u062a\u0635\u0645\u064a\u0645 UI/UX   \u2022   \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a   \u2022   \u0627\u0644\u0646\u0645\u0648   \u2022   ",
      },
      offer: {
        kicker: "\u0645\u0627 \u0646\u0642\u062f\u0645\u0647",
        title: "\u062e\u062f\u0645\u0627\u062a \u0644\u062f\u0639\u0645 \u062a\u0646\u0645\u064a\u0629 \u0639\u0645\u0644\u0643",
        subtitle:
          "\u0645\u062c\u0645\u0648\u0639\u0629 \u0643\u0627\u0645\u0644\u0629 \u0645\u0646 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0644\u0644\u0639\u0646\u0627\u064a\u0629 \u0628\u0623\u0647\u062f\u0627\u0641 \u0639\u0645\u0644\u0643 \u2014 \u0645\u0646 \u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629 \u0625\u0644\u0649 \u0627\u0644\u062a\u0646\u0641\u064a\u0630.",
        card1: {
          icon: "\ud83d\udcbc",
          title: "\u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0623\u0639\u0645\u0627\u0644",
          desc: "\u0646\u0635\u0627\u0626\u062d \u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629 \u0644\u0648\u0636\u0639 \u0627\u0644\u0623\u0647\u062f\u0627\u0641 \u0627\u0644\u0635\u062d\u064a\u062d\u0629 \u0648\u0627\u0644\u0646\u0645\u0648 \u0628\u062b\u0642\u0629.",
        },
        card2: {
          icon: "\ud83d\udce3",
          title: "\u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0627\u0644\u0631\u0642\u0645\u064a",
          desc: "\u062d\u0645\u0644\u0627\u062a \u062a\u0628\u0646\u064a \u0639\u0644\u0627\u0645\u062a\u0643 \u0648\u062a\u062d\u0648\u0644 \u0627\u0644\u0627\u0646\u062a\u0628\u0627\u0647 \u0625\u0644\u0649 \u0639\u0645\u0644\u0627\u0621.",
        },
        card3: {
          icon: "\ud83d\udcca",
          title: "\u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0633\u0648\u0642",
          desc: "\u0631\u0624\u0649 \u0645\u0628\u0646\u064a\u0629 \u0639\u0644\u0649 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0648\u062a\u0642\u0627\u0631\u064a\u0631 \u0648\u0627\u0636\u062d\u0629 \u0644\u0641\u0647\u0645 \u0627\u0644\u0633\u0648\u0642.",
        },
        card4: {
          icon: "\ud83d\udee0\ufe0f",
          title: "\u062a\u0637\u0648\u064a\u0631 \u0627\u0644\u0648\u064a\u0628",
          desc: "\u0645\u0648\u0627\u0642\u0639 \u0633\u0631\u064a\u0639\u0629 \u0648\u0622\u0645\u0646\u0629 \u0648\u062c\u0645\u064a\u0644\u0629 \u062a\u0631\u0648\u064a \u0642\u0635\u062a\u0643.",
        },
        link: "\u0627\u0639\u0631\u0641 \u0627\u0644\u0645\u0632\u064a\u062f",
        button: "\u0639\u0631\u0636 \u062c\u0645\u064a\u0639 \u0627\u0644\u062e\u062f\u0645\u0627\u062a",
      },
      blog: {
        kicker: "\u0631\u0624\u0649",
        title: "\u0645\u062f\u0648\u0646\u0629 \u0627\u0644\u062a\u0642\u0646\u064a\u0629",
        subtitle: "\u0623\u062e\u0628\u0627\u0631 \u0648\u0623\u062f\u0644\u0629 \u0644\u0645\u0633\u0627\u0639\u062f\u0629 \u0639\u0645\u0644\u0643 \u0639\u0644\u0649 \u0627\u0644\u0646\u0645\u0648.",
        post1: {
          title: "\u0643\u064a\u0641 \u062a\u062e\u062a\u0627\u0631 \u0627\u0644\u0634\u0631\u064a\u0643 \u0627\u0644\u0631\u0642\u0645\u064a \u0627\u0644\u0645\u0646\u0627\u0633\u0628 \u0644\u0639\u0645\u0644\u0643",
          date: "6 \u062f\u064a\u0633\u0645\u0628\u0631 2025",
          author: "\u0625\u064a\u0632\u0627\u0628\u064a\u0644\u0627 \u0645\u0648\u0631\u064a\u0631\u0627",
        },
        post2: {
          title: "5 \u0627\u062a\u062c\u0627\u0647\u0627\u062a \u0644\u0644\u062a\u0633\u0648\u064a\u0642 \u0627\u0644\u0631\u0642\u0645\u064a \u064a\u062c\u0628 \u0645\u062a\u0627\u0628\u0639\u062a\u0647\u0627 \u0647\u0630\u0627 \u0627\u0644\u0639\u0627\u0645",
          date: "2 \u062f\u064a\u0633\u0645\u0628\u0631 2025",
          author: "\u0644\u0648\u0643\u0627\u0633 \u0633\u064a\u0644\u0641\u0627",
        },
        post3: {
          title: "\u0644\u0645\u0627\u0630\u0627 \u064a\u062d\u062a\u0627\u062c \u0643\u0644 \u0639\u0645\u0644 \u0625\u0644\u0649 \u0645\u0648\u0642\u0639 \u0639\u0627\u0644\u0645\u064a \u0627\u0644\u0645\u0633\u062a\u0648\u0649",
          date: "29 \u0646\u0648\u0641\u0645\u0628\u0631 2025",
          author: "\u0627\u0633\u062a\u0648\u062f\u064a\u0648 \u0623\u0645\u0627\u062a\u064a\u0633",
        },
        readMore: "\u0627\u0642\u0631\u0623 \u0627\u0644\u0645\u0632\u064a\u062f",
        viewAll: "\u0639\u0631\u0636 \u0643\u0644 \u0627\u0644\u0645\u062f\u0648\u0646\u0629",
      },
      schedule: {
        eyebrow: "\u0627\u0633\u062a\u0634\u0627\u0631\u0629 \u0645\u062c\u0627\u0646\u064a\u0629",
        title: "\u0627\u062d\u062c\u0632 \u0627\u0644\u0622\u0646 \u0644\u0644\u0628\u062f\u0621",
        subtitle:
          "\u0627\u062d\u062c\u0632 \u0627\u0633\u062a\u0634\u0627\u0631\u0629 \u0645\u062c\u0627\u0646\u064a\u0629 \u0648\u062f\u0639\u0646\u0627 \u0646\u062a\u062d\u062f\u062b \u0639\u0646 \u0645\u0634\u0631\u0648\u0639\u0643.",
        button: "\u0627\u062d\u062c\u0632 \u0627\u0644\u0622\u0646",
        chips: ["\u0627\u0633\u062a\u0634\u0627\u0631\u0629 \u0645\u062c\u0627\u0646\u064a\u0629", "\u0628\u062f\u0648\u0646 \u0627\u0644\u062a\u0632\u0627\u0645", "\u0631\u062f \u0633\u0631\u064a\u0639"],
      },
      footer: {
        tagline:
          "\u0623\u0645\u0627\u062a\u064a\u0633 \u0648\u0643\u0627\u0644\u0629 \u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0623\u0639\u0645\u0627\u0644 \u062a\u0633\u0627\u0639\u062f \u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0639\u0644\u0649 \u0627\u0644\u0646\u0645\u0648 \u0645\u0646 \u062e\u0644\u0627\u0644 \u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629 \u0648\u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0648\u0627\u0644\u062a\u0642\u0646\u064a\u0629.",
        colServices: "\u0627\u0644\u062e\u062f\u0645\u0627\u062a",
        colCompany: "\u0627\u0644\u0634\u0631\u0643\u0629",
        colContact: "\u0627\u0644\u0627\u062a\u0635\u0627\u0644",
        links: {
          services: ["\u0645\u0627 \u0646\u0642\u062f\u0645\u0647", "\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0648\u064a\u0628", "\u0645\u0648\u0642\u0639 \u0648\u0648\u0631\u062f\u0628\u0631\u0633", "\u0627\u0644\u0645\u062f\u0648\u0646\u0629"],
          company: ["\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629", "\u0623\u0639\u0645\u0627\u0644\u0646\u0627", "\u0645\u0646 \u0646\u062d\u0646", "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627"],
          contact: ["\u0627\u062a\u0635\u0644 \u0628\u0646\u0627", "\u0627\u062d\u062c\u0632 \u0627\u0633\u062a\u0634\u0627\u0631\u0629", "\u0645\u0646 \u0646\u062d\u0646", "\u0627\u0644\u0645\u062f\u0648\u0646\u0629"],
        },
        rights: "\u00a9 {year} \u0623\u0645\u0627\u062a\u064a\u0633. \u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638\u0629.",
      },
      showcase: {
        kicker: "\u0623\u0639\u0645\u0627\u0644\u0646\u0627",
        title: "\u0623\u0639\u0645\u0627\u0644\u0646\u0627 \u062a\u062a\u062d\u062f\u062b \u0639\u0646\u0627",
        subtitle:
          "\u0645\u062c\u0645\u0648\u0639\u0629 \u0645\u0646 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639 \u0627\u0644\u062a\u064a \u0646\u0641\u062a\u062e\u0631 \u0628\u0647\u0627 \u2014 \u0645\u0648\u0627\u0642\u0639\u060c \u0639\u0644\u0627\u0645\u0627\u062a \u062a\u062c\u0627\u0631\u064a\u0629 \u0648\u0623\u0639\u0645\u0627\u0644 \u0625\u0628\u062f\u0627\u0639\u064a\u0629.",
        filters: ["\u0627\u0644\u0643\u0644", "\u0645\u0648\u0627\u0642\u0639", "\u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u062a\u062c\u0627\u0631\u064a\u0629", "\u0625\u0628\u062f\u0627\u0639"],
        item1: { title: "\u0645\u0648\u0642\u0639 \u0634\u0631\u0643\u0629", cat: "Websites" },
        item2: { title: "\u0647\u0648\u064a\u0629 \u0627\u0644\u0639\u0644\u0627\u0645\u0629", cat: "Branding" },
        item3: { title: "\u062a\u0637\u0628\u064a\u0642 \u062c\u0648\u0627\u0644", cat: "Websites" },
        item4: { title: "\u062d\u0645\u0644\u0629 \u0625\u0628\u062f\u0627\u0639\u064a\u0629", cat: "Creative" },
        item5: { title: "\u0645\u062a\u062c\u0631 \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a", cat: "Websites" },
        item6: { title: "\u062a\u0635\u0627\u0645\u064a\u0645 \u062a\u0633\u0648\u064a\u0642\u064a\u0629", cat: "Creative" },
      },
      wwo: {
        kicker: "\u0645\u0627 \u0646\u0642\u062f\u0645\u0647",
        title: "\u0645\u062c\u0645\u0648\u0639\u0629 \u0643\u0627\u0645\u0644\u0629 \u0645\u0646 \u0627\u0644\u062e\u062f\u0645\u0627\u062a",
        subtitle:
          "\u0643\u0644 \u0645\u0627 \u064a\u062d\u062a\u0627\u062c\u0647 \u0639\u0645\u0644\u0643 \u0644\u0644\u0646\u0645\u0648 \u0639\u0628\u0631 \u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a \u2014 \u062a\u062d\u062a \u0633\u0642\u0641 \u0648\u0627\u062d\u062f.",
        button: "\u0627\u062d\u062c\u0632 \u0627\u0633\u062a\u0634\u0627\u0631\u0629",
        link: "\u0627\u0639\u0631\u0641 \u0627\u0644\u0645\u0632\u064a\u062f",
        p1: "\u0646\u0645\u0632\u062c \u0627\u0644\u062a\u0641\u0643\u064a\u0631 \u0627\u0644\u062a\u062c\u0627\u0631\u064a \u0648\u0627\u0644\u062a\u0635\u0645\u064a\u0645 \u0648\u0627\u0644\u062a\u0642\u0646\u064a\u0629 \u0644\u062a\u062d\u0642\u064a\u0642 \u0627\u0644\u0646\u062a\u0627\u0626\u062c. \u064a\u0628\u062f\u0623 \u0643\u0644 \u062a\u0639\u0627\u0648\u0646 \u0628\u0627\u0644\u0627\u0633\u062a\u0645\u0627\u0639 \u0644\u0623\u0647\u062f\u0627\u0641\u0643 \u0648\u064a\u0646\u062a\u0647\u064a \u0628\u0646\u062a\u0627\u0626\u062c \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0642\u064a\u0627\u0633.",
      },
      wd: {
        kicker: "\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0648\u064a\u0628",
        title: "\u062a\u0635\u0627\u0645\u064a\u0645 \u062a\u062d\u0648\u0644 \u0627\u0644\u0632\u0648\u0627\u0631 \u0625\u0644\u0649 \u0639\u0645\u0644\u0627\u0621",
        subtitle: "\u0645\u0646 \u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0648\u064a\u0628 \u0625\u0644\u0649 \u062d\u0636\u0648\u0631 \u0631\u0642\u0645\u064a \u0643\u0627\u0645\u0644.",
        p1: "\u0645\u0648\u0642\u0639\u0643 \u0647\u0648 \u0648\u0627\u062c\u0647\u062a\u0643 \u0627\u0644\u0631\u0642\u0645\u064a\u0629. \u0646\u0635\u0645\u0645 \u0645\u0648\u0627\u0642\u0639 \u0633\u0631\u064a\u0639\u0629 \u0648\u0645\u062a\u064a\u0633\u064a\u0631\u0629 \u0648\u0645\u0631\u0643\u0632\u0629 \u0639\u0644\u0649 \u0627\u0644\u062a\u062d\u0648\u064a\u0644 \u062a\u0631\u0648\u064a \u0642\u0635\u062a\u0643.",
        f1: "\u062a\u0635\u0645\u064a\u0645 \u0639\u0635\u0631\u064a \u0645\u0631\u0643\u0632 \u0639\u0644\u0649 \u0627\u0644\u062a\u062d\u0648\u064a\u0644",
        f2: "\u0645\u062a\u0648\u0627\u0641\u0642 \u0645\u0639 \u062c\u0645\u064a\u0639 \u0627\u0644\u0623\u062c\u0647\u0632\u0629",
        f3: "\u0633\u0631\u064a\u0639 \u0627\u0644\u062a\u062d\u0645\u064a\u0644 \u0648\u0645\u0644\u0627\u0626\u0645 \u0644\u0645\u062d\u0631\u0643\u0627\u062a \u0627\u0644\u0628\u062d\u062b",
        f4: "\u0625\u062f\u0627\u0631\u0629 \u0645\u062d\u062a\u0648\u0649 \u0633\u0647\u0644\u0629",
        ctaTitle: "\u0645\u0633\u062a\u0639\u062f \u0644\u0625\u0639\u0627\u062f\u0629 \u062a\u0635\u0645\u064a\u0645 \u0645\u0648\u0642\u0639\u0643\u061f",
        ctaButton: "\u0627\u062d\u062c\u0632 \u0627\u0644\u0622\u0646",
      },
      wp: {
        kicker: "\u0645\u0648\u0642\u0639 \u0648\u0648\u0631\u062f\u0628\u0631\u0633",
        title: "\u0645\u0648\u0627\u0642\u0639 \u0648\u0648\u0631\u062f\u0628\u0631\u0633 \u062a\u0639\u0645\u0644 \u0628\u0628\u0633\u0627\u0637\u0629",
        subtitle: "\u062a\u0637\u0648\u064a\u0631 \u0648\u062f\u0639\u0645 \u0627\u062d\u062a\u0631\u0627\u0641\u064a \u0644\u0648\u0648\u0631\u062f\u0628\u0631\u0633.",
        p1: "\u0645\u0646 \u0627\u0644\u0642\u0648\u0627\u0644\u0628 \u0627\u0644\u0645\u062e\u0635\u0635\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u062a\u0627\u062c\u0631 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0629\u060c \u0646\u0628\u0646\u064a \u0645\u0648\u0627\u0642\u0639 \u0648\u0648\u0631\u062f\u0628\u0631\u0633 \u0622\u0645\u0646\u0629 \u0648\u0633\u0631\u064a\u0639\u0629 \u0648\u0633\u0647\u0644\u0629 \u0627\u0644\u0625\u062f\u0627\u0631\u0629.",
        f1: "\u0642\u0648\u0627\u0644\u0628 \u0648\u0648\u0631\u062f\u0628\u0631\u0633 \u0645\u062e\u0635\u0635\u0629",
        f2: "\u0622\u0645\u0646\u0629 \u0648\u0645\u062d\u0633\u0646\u0629 \u0644\u0644\u0623\u062f\u0627\u0621",
        f3: "\u0633\u0647\u0644\u0629 \u0627\u0644\u062a\u062d\u062f\u064a\u062b \u0648\u0627\u0644\u0635\u064a\u0627\u0646\u0629",
        f4: "\u062f\u0639\u0645 \u0645\u0633\u062a\u0645\u0631",
        ctaTitle: "\u062f\u0639\u0646\u0627 \u0646\u0628\u0646\u064a \u0645\u0648\u0642\u0639 \u0648\u0648\u0631\u062f\u0628\u0631\u0633 \u0644\u0643",
        ctaButton: "\u0627\u062d\u062c\u0632 \u0627\u0644\u0622\u0646",
      },
      blogList: {
        kicker: "\u0627\u0644\u0645\u062f\u0648\u0646\u0629",
        title: "\u0623\u062d\u062f\u062b \u0627\u0644\u0623\u062e\u0628\u0627\u0631 \u0648\u0627\u0644\u0631\u0624\u0649",
        subtitle: "\u0623\u062f\u0644\u0629 \u0648\u0623\u062e\u0628\u0627\u0631 \u0648\u0623\u0641\u0643\u0627\u0631 \u0644\u0645\u0633\u0627\u0639\u062f\u0629 \u0639\u0645\u0644\u0643 \u0639\u0644\u0649 \u0627\u0644\u0646\u0645\u0648.",
        loading: "جارٍ تحميل المقالات…",
        error: "تعذّر تحميل المقالات.",
        empty: "لا توجد مقالات بعد — عُد قريباً!",
        minRead: "دقائق القراءة",
        readMore: "\u0627\u0642\u0631\u0623 \u0627\u0644\u0645\u0632\u064a\u062f",
      },
      waw: {
        kicker: "\u0645\u0646 \u0646\u062d\u0646",
        title: "\u0646\u062e\u062a\u0635 \u0628\u0623\u0647\u062f\u0627\u0641 \u0639\u0645\u0644\u0643",
        p1: "\u0623\u0645\u0627\u062a\u064a\u0633 \u0648\u0643\u0627\u0644\u0629 \u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0623\u0639\u0645\u0627\u0644 \u0628\u0623\u0643\u062b\u0631 \u0645\u0646 10 \u0633\u0646\u0648\u0627\u062a \u0645\u0646 \u0627\u0644\u062e\u0628\u0631\u0629. \u0646\u0633\u0627\u0639\u062f \u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0639\u0644\u0649 \u0627\u0644\u0646\u0645\u0648 \u0628\u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629 \u0648\u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0648\u0627\u0644\u062a\u0642\u0646\u064a\u0629.",
        p2: "\u0645\u0646 \u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0633\u0648\u0642 \u0625\u0644\u0649 \u062a\u0637\u0648\u064a\u0631 \u0627\u0644\u0648\u064a\u0628\u060c \u0646\u0643\u0648\u0646 \u0628\u062c\u0627\u0646\u0628\u0643 \u0645\u0639 \u0627\u0644\u0634\u0641\u0627\u0641\u064a\u0629 \u0648\u0627\u0644\u062c\u0648\u062f\u0629 \u0648\u0627\u0644\u0646\u062a\u0627\u0626\u062c \u0627\u0644\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0642\u064a\u0627\u0633.",
        counter1: "\u0627\u0644\u0639\u0645\u0644\u0627\u0621",
        counter2: "\u0627\u0644\u0631\u0636\u0627",
        counter3: "\u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639",
        value1: { icon: "\ud83c\udfaf", title: "\u0627\u0644\u062a\u0631\u0643\u064a\u0632 \u0639\u0644\u0649 \u0627\u0644\u062c\u0648\u062f\u0629", desc: "\u0623\u0641\u0636\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0641\u0642\u0637\u060c \u0628\u0639\u0646\u0627\u064a\u0629." },
        value2: { icon: "\ud83e\udd1d", title: "\u062b\u0642\u0629 \u0627\u0644\u0639\u0645\u0644\u0627\u0621", desc: "\u0634\u0641\u0627\u0641\u064a\u0629 \u0641\u064a \u0627\u0644\u0633\u0639\u0631 \u0648\u0627\u0644\u0639\u0645\u0644\u064a\u0629 \u0648\u0627\u0644\u0646\u062a\u0627\u0626\u062c." },
        value3: { icon: "\u26a1", title: "\u0627\u0644\u0633\u0631\u0639\u0629", desc: "\u062a\u0646\u0641\u064a\u0630 \u0633\u0631\u064a\u0639 \u0628\u062f\u0648\u0646 \u0627\u0644\u062a\u0636\u062d\u064a\u0629 \u0628\u0627\u0644\u062c\u0648\u062f\u0629." },
        ctaTitle: "\u062f\u0639\u0646\u0627 \u0646\u0639\u0645\u0644 \u0645\u0639\u0627\u064b",
        ctaButton: "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627",
      },
      connect: {
        kicker: "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627",
        title: "\u062f\u0639\u0646\u0627 \u0646\u062a\u062d\u062f\u062b \u0639\u0646 \u0645\u0634\u0631\u0648\u0639\u0643",
        subtitle:
          "\u0647\u0644 \u0644\u062f\u064a\u0643 \u0645\u0634\u0631\u0648\u0639 \u0623\u0648 \u0633\u0624\u0627\u0644\u061f \u0641\u0631\u064a\u0642\u0646\u0627 \u0647\u0646\u0627 \u0644\u0645\u0633\u0627\u0639\u062f\u062a\u0643.",
        phone: "\u0627\u0644\u0647\u0627\u062a\u0641",
        phoneValue: "+852 2569 7974",
        email: "\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a",
        emailValue: "hello@amatisberry.ir",
        address: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646",
        addressValue: "21 King Street, Melbourne, Victoria 1202, Australia",
        hours: "\u0633\u0627\u0639\u0627\u062a \u0627\u0644\u062f\u0639\u0645",
        hoursValue: "\u0627\u0644\u0627\u062b\u0646\u064a\u0646 \u2013 \u0627\u0644\u062c\u0645\u0639\u0629\u060c 9:00 \u2013 18:00",
        formTitle: "\u0623\u0631\u0633\u0644 \u0644\u0646\u0627 \u0631\u0633\u0627\u0644\u0629",
        formName: "\u0627\u0644\u0627\u0633\u0645",
        formEmail: "\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a",
        formSubject: "\u0627\u0644\u0645\u0648\u0636\u0648\u0639",
        formMessage: "\u0627\u0644\u0631\u0633\u0627\u0644\u0629",
        formSubmit: "\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0633\u0627\u0644\u0629",
        formSent: "\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0631\u0633\u0627\u0644\u062a\u0643 \u0628\u0646\u062c\u0627\u062d. \u0633\u0646\u0631\u062f \u0639\u0644\u064a\u0643 \u0642\u0631\u064a\u0628\u0627\u064b.",
        errorGeneric: "\u062d\u062f\u062b \u062e\u0637\u0623 \u0623\u062b\u0646\u0627\u0621 \u0627\u0644\u0625\u0631\u0633\u0627\u0644. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0644\u0627\u062d\u0642\u0627\u064b.",
        scheduleTitle: "\u0627\u062d\u062c\u0632 \u0627\u0633\u062a\u0634\u0627\u0631\u0629 \u0645\u062c\u0627\u0646\u064a\u0629",
        scheduleText: "\u062a\u0641\u0636\u0644 \u0627\u0644\u062d\u062f\u064a\u062b \u0647\u0627\u062a\u0641\u064a\u0627\u064b\u061f \u0627\u062d\u062c\u0632 \u0627\u0633\u062a\u0634\u0627\u0631\u0629 \u0645\u062c\u0627\u0646\u064a\u0629.",
        scheduleButton: "\u0627\u062d\u062c\u0632 \u0627\u0644\u0622\u0646",
      },
    },
  };

  function get(locale, path) {
    var node = dict[locale] || dict[defaultLocale];
    var parts = String(path).split(".");
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return null;
      node = node[parts[i]];
    }
    return node;
  }

  function current() {
    var stored = null;
    try {
      stored = window.localStorage.getItem(langKey);
    } catch (e) {}
    return locales.indexOf(stored) !== -1 ? stored : defaultLocale;
  }

  function apply(locale) {
    locale = locales.indexOf(locale) !== -1 ? locale : defaultLocale;
    var root = document.documentElement;
    root.setAttribute("lang", locale);
    root.setAttribute("dir", rtl[locale] ? "rtl" : "ltr");
    root.setAttribute("data-lang", locale);

    var metaDesc = get(locale, "meta.description");
    if (metaDesc) {
      var m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute("content", metaDesc);
    }
    var title = get(locale, "meta.title");
    if (title) document.title = title;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (el.hasAttribute("data-site-field")) return;
      var v = get(locale, el.getAttribute("data-i18n"));
      if (v != null) {
        el.textContent = v.indexOf("{year}") !== -1 ? v.replace("{year}", String(new Date().getFullYear())) : v;
      }
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var v = get(locale, el.getAttribute("data-i18n-title"));
      if (v != null) el.setAttribute("title", v);
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var v = get(locale, el.getAttribute("data-i18n-ph"));
      if (v != null) el.setAttribute("placeholder", v);
    });
    document.querySelectorAll("[data-i18n-list]").forEach(function (el) {
      var arr = get(locale, el.getAttribute("data-i18n-list"));
      if (!Array.isArray(arr)) return;
      el.innerHTML = "";
      arr.forEach(function (item) {
        var s = document.createElement("span");
        s.className = "hero-chip";
        s.textContent = item;
        el.appendChild(s);
      });
    });

    // language switcher labels / active states
    document.querySelectorAll("[data-lang-option]").forEach(function (btn) {
      var l = btn.getAttribute("data-lang-option");
      var isActive = l === locale;
      btn.classList.toggle("active", isActive);
      var codeEl = btn.querySelector("[data-lang-code]");
      if (codeEl) codeEl.textContent = codes[l];
      var activePill = btn.querySelector("[data-lang-active]");
      if (activePill) activePill.style.display = isActive ? "" : "none";
      var nameEl = btn.querySelector("[data-lang-name]");
      if (nameEl) nameEl.textContent = labels[l];
    });
    var triggerLabel = document.querySelector("[data-lang-label]");
    if (triggerLabel) triggerLabel.textContent = labels[locale];

    // footer language links active state
    document.querySelectorAll("[data-footer-lang]").forEach(function (a) {
      var l = a.getAttribute("data-footer-lang");
      a.classList.toggle("active", l === locale);
      a.textContent = labels[l];
    });

    if (typeof window.CustomEvent === "function") {
      document.dispatchEvent(new window.CustomEvent("i18n:applied", { detail: { locale: locale } }));
    }
  }

  function switchTo(locale) {
    try {
      window.localStorage.setItem(langKey, locale);
    } catch (e) {}
    apply(locale);
  }

  return {
    locales: locales,
    defaultLocale: defaultLocale,
    labels: labels,
    codes: codes,
    dict: dict,
    get: get,
    current: current,
    apply: apply,
    switchTo: switchTo,
  };
})();

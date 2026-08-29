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
    svc: {
      androidApp: {
        subtitle: "Native Android applications built with Kotlin, from MVP to mature product.",
        p1: "Our Android team ships high-performance apps using Kotlin and modern architecture patterns such as MVVM and clean architecture. We cover the full lifecycle — discovery, UI/UX, development, Play Store publishing and post-launch iteration.",
        p2: "From MVPs to large-scale products with offline mode, push notifications, payments and analytics, we build apps your users will keep coming back to.",
        f1: "Native development with Kotlin & Jetpack Compose",
        f2: "Clean architecture and rigorous code review",
        f3: "Play Store release & app store optimization",
        f4: "Push notifications, payments & analytics",
        f5: "Continuous updates and long-term support"
      },
      iosApp: {
        subtitle: "Native iOS apps with Swift and SwiftUI, polished to App Store standards.",
        p1: "We design and build iOS apps for iPhone and iPad with Swift and SwiftUI, following Apple's Human Interface Guidelines. From prototype to App Store review, we handle even the smallest detail of the experience.",
        p2: "Whether it is a consumer app, a service platform or an enterprise tool, we deliver fluid, accessible and delightful apps that earn five-star reviews.",
        f1: "Swift & SwiftUI native development",
        f2: "Apple Design values & polished UX",
        f3: "App Store submission & review handling",
        f4: "In-app purchases, iCloud & push",
        f5: "Performance tuning and ongoing maintenance"
      },
      webAppPwa: {
        subtitle: "Fast, installable web apps and PWAs that work on any device and browser.",
        p1: "Progressive Web Apps combine the reach of the web with the feel of a native app. We build installable, offline-capable and lightning-fast web applications using modern stacks like Next.js and React.",
        p2: "One codebase, every device — fewer app-store costs, instant updates and a lower barrier for users to start using your product.",
        f1: "Installable & offline-ready (PWA)",
        f2: "Modern React / Next.js architecture",
        f3: "Push notifications & background sync",
        f4: "Fast loads and SEO-friendly rendering",
        f5: "One codebase for all platforms"
      },
      ecommerceApp: {
        subtitle: "Feature-rich shopping apps with carts, payments, orders and push notifications.",
        p1: "We build native mobile stores that convert. Product catalogs, smart search, smooth checkout, order tracking, wishlists and push offers are all engineered for performance and retention.",
        p2: "Integrate local and international payment gateways, loyalty programs and marketing automation so your store grows with every release.",
        f1: "Catalog, search & smart product filters",
        f2: "Secure one-tap checkout",
        f3: "Order tracking, wishlist & reviews",
        f4: "Payment gateways & loyalty programs",
        f5: "Push campaigns & retention analytics"
      },
      classifiedsApp: {
        subtitle: "Classifieds and listing apps with chat, search, filters and secure posting.",
        p1: "From vehicle and property listings to job boards and second-hand marketplaces, we build classifieds apps that keep buyers and sellers engaged. Features like verified accounts, in-app chat and location-based search are built in.",
        p2: "Revenue-ready with featured listings, boosts and premium memberships, tuned for trust and high engagement.",
        f1: "Smart, location-aware search & filters",
        f2: "In-app chat & contact management",
        f3: "Verified accounts & safe posting flow",
        f4: "Featured listings, boosts & memberships",
        f5: "Moderation & analytics dashboard"
      },
      bookReaderApp: {
        subtitle: "Book reader apps for ebooks and audiobooks with synced libraries and subscriptions.",
        p1: "A great reading app is about focus. We craft calm, typographic-first experiences with adjustable fonts, themes, offline downloads and cross-device syncing of your library.",
        p2: "Support subscriptions, rentals, gifting and seamless payment integration to turn readers into a recurring audience.",
        f1: "Beautiful typography & reading themes",
        f2: "Offline downloads & library sync",
        f3: "Audiobook playback & bookmarks",
        f4: "Subscriptions, rentals & gifting",
        f5: "Progress tracking across devices"
      },
      tourismApp: {
        subtitle: "Tourism and travel apps with tours, itineraries, maps and local experiences.",
        p1: "We help tourism businesses reach travelers with beautiful apps for tours, hotels, flights and experiences. Interactive maps, offline guides and multi-language content make every trip smoother.",
        p2: "Include reviews, wishlists, secure booking and payment to turn inspiration into confirmed trips.",
        f1: "Tours, itineraries & experiences",
        f2: "Interactive maps & offline guides",
        f3: "Multi-language traveler content",
        f4: "Secure booking & payments",
        f5: "Reviews, wishlists & tailored offers"
      },
      taxiApp: {
        subtitle: "Ride-hailing apps with live tracking, driver dispatch and in-app payments.",
        p1: "We build complete taxi and ride-hailing platforms for cities and fleets. Rider and driver apps, live GPS tracking, fare estimation and smart dispatch work together for a smooth experience.",
        p2: "Add peaks/fare pricing, driver ratings, trip history and multi-currency payments to run operations efficiently.",
        f1: "Rider & driver mobile apps",
        f2: "Live GPS tracking & ETA",
        f3: "Smart automatic driver dispatch",
        f4: "Fare estimation & surge pricing",
        f5: "Ratings, history & multi-currency payments"
      },
      flightHotelApp: {
        subtitle: "Booking apps with availability, pricing and instant confirmation.",
        p1: "We build booking platforms for flights, hotels and travel packages. Search across providers, compare prices in real time and confirm reservations instantly with a smooth, secure flow.",
        p2: "Integrate provider APIs, manage capacity and availability per property, and keep users updated with booking emails and app notifications.",
        f1: "Flights, hotels & packages search",
        f2: "Real-time prices & availability",
        f3: "Instant confirmation & e-tickets",
        f4: "Provider API integrations",
        f5: "Booking emails & app notifications"
      },
      corporateWebsite: {
        subtitle: "Polished corporate websites that present your company with confidence.",
        p1: "Your website is your digital shopfront. We craft performance-driven corporate sites with clear messaging, strong brand identity and seamless conversion paths — from landing pages to complete multi-page experiences.",
        p2: "Built on modern stacks, optimized for speed, SEO and easy content updates, so your team stays in control.",
        f1: "Conversion-focused layout & messaging",
        f2: "Brand identity & visual design",
        f3: "SEO-ready, fast and accessible",
        f4: "CMS for easy content updates",
        f5: "Analytics, A/B testing & optimization"
      },
      classifiedsWebsite: {
        subtitle: "Classifieds websites like the big listing platforms — search, post, chat.",
        p1: "Launch a listing marketplace for vehicles, real estate, jobs or general classifieds. We engineer searchable, filterable platforms with user accounts, secure posting and messaging built in.",
        p2: "Monetize with featured listings, ad placements and premium accounts while keeping moderation and trust features central.",
        f1: "Powerful search & category filters",
        f2: "User accounts & secure posting",
        f3: "Messaging & favorite listings",
        f4: "Featured listings & ad placements",
        f5: "Moderation, reports & trust tools"
      },
      marketplaceWebsite: {
        subtitle: "Marketplaces with multi-vendor stores and checkout.",
        p1: "We build marketplace platforms that let many sellers offer their products under one trusted brand. Vendor dashboards, commission handling, order routing and multi-store checkout are all included.",
        p2: "Scale with seller applications, reviews, disputes and payout automation that keeps your marketplace fair and fast.",
        f1: "Vendor stores & seller dashboards",
        f2: "Commission & payout automation",
        f3: "Unified marketplace checkout",
        f4: "Reviews, ratings & dispute handling",
        f5: "Category management & searchable catalog"
      },
      onlineStore: {
        subtitle: "Fast online stores with catalogs, payments and shipping.",
        p1: "Turn your products into an online store that sells around the clock. We build fast, reliable shops with smart catalogs, smooth checkout, secure payments and shipping integration.",
        p2: "You stay in control with an admin panel for products, orders, discounts, customers and marketing tools.",
        f1: "Smart product catalogs & search",
        f2: "Seamless, secure checkout",
        f3: "Local & international payment gateways",
        f4: "Shipping & order management",
        f5: "Admin panel, discounts & marketing"
      },
      restaurantWebsite: {
        subtitle: "Restaurant sites with menus, table reservation and online ordering.",
        p1: "Bring your restaurant online with an appetizing website. Menu showcase, table reservations, online ordering and kitchen integrations all work together to fill every seat.",
        p2: "Delight visitors with photo galleries, chef stories and social proof, and keep regulars coming back with offers and loyalty.",
        f1: "Menu showcase & dish galleries",
        f2: "Online table reservations",
        f3: "Online ordering & payments",
        f4: "Location, hours & Google Maps",
        f5: "Offers, loyalty & review widgets"
      },
      newsWebsite: {
        subtitle: "News sites with editorial workflows and fast delivery.",
        p1: "We build modern news and media platforms with intuitive editorial workflows, lightning-fast article delivery and engaging layouts for desktop, tablet and mobile.",
        p2: "Monetize with subscriptions, ads and sponsors while empowering your team with analytics and content scheduling.",
        f1: "Editorial workflow & publishing tools",
        f2: "Fast, SEO-optimized articles",
        f3: "Break categories, tags & search",
        f4: "Subscriptions, ads & sponsors",
        f5: "Analytics & content scheduling"
      },
      medicalWebsite: {
        subtitle: "Clinic sites with online booking and patient portals.",
        p1: "We design trustworthy websites for clinics, doctors and health centers. Online appointment booking, patient information, service overviews and privacy-first practices build confidence from the first visit.",
        p2: "Inform and reassure with team profiles, articles and FAQs, while compliant forms and secure data handling keep patient trust intact.",
        f1: "Online appointment booking",
        f2: "Service, team & facility overviews",
        f3: "Patient education articles & FAQs",
        f4: "Privacy-first, secure data handling",
        f5: "Responsive, accessible design"
      },
      tourismWebsite: {
        subtitle: "Travel and tourism websites with tours, hotels and trip booking.",
        p1: "Inspire travelers and turn clicks into bookings. We build beautiful tourism websites with immersive destination content, tour catalogs and seamless booking flows.",
        p2: "Highlight packages and special deals, and let visitors plan trips with itineraries, galleries and trust-building reviews.",
        f1: "Destination & tour showcase",
        f2: "Tour and hotel booking flows",
        f3: "Itineraries, galleries & maps",
        f4: "Multi-language content",
        f5: "Reviews, offers & trust signals"
      },
      bookReaderWebsite: {
        subtitle: "Book reader websites for selling and streaming ebooks and audiobooks.",
        p1: "Launch a reading platform for your publishing house or library. A beautiful catalog, secure e-book purchases, subscriptions and an in-browser reader make every title easy to enjoy.",
        p2: "Include audiobook streaming, reviews, wishlists and reader accounts to build a loyal community around your books.",
        f1: "E-book store & secure purchases",
        f2: "In-browser reader experience",
        f3: "Audiobook streaming & player",
        f4: "Subscriptions & memberships",
        f5: "Reviews, wishlists & reader accounts"
      },
      wordpress: {
        subtitle: "WordPress sites built and tuned for speed, SEO and easy editing.",
        p1: "WordPress gives your team total control over content. We build custom themes, required plugins and optimized setups — fast, secure and easy for authors to update every day.",
        p2: "From blogs to full company sites and online stores, we tailor WordPress to your business with professional design and maintenance.",
        f1: "Custom themes & page builder setup",
        f2: "Speed, Core Web Vitals & SEO tuning",
        f3: "Security, backups & updates",
        f4: "Easy editing for non-technical teams",
        f5: "Ongoing support and care plans"
      },
      subscriptionStore: {
        subtitle: "Stores for memberships and recurring revenue.",
        p1: "Turn one-time buyers into a predictable revenue stream. We build subscription e-commerce with plans, recurring billing, member portals and automated renewals.",
        p2: "Support boxes, memberships, digital goods and cancellations with metrics that show exactly how your business is growing.",
        f1: "Plans, tiers & recurring billing",
        f2: "Member portal & account management",
        f3: "Payment gateway retry automation",
        f4: "Subscription boxes & digital goods",
        f5: "Churn analytics & growth reports"
      },
      shopifyStore: {
        subtitle: "Shopify stores configured and customized to your brand.",
        p1: "Launch fast with Shopify's proven infrastructure, tailored to your brand. We configure themes, apps and payments to create a store that looks custom and runs perfectly.",
        p2: "Optimize for conversions and scale with apps for marketing, fulfillment and analytics — completely managed by our team.",
        f1: "Theme customization & brand design",
        f2: "App & plugin configuration",
        f3: "Payment & shipping setup",
        f4: "Conversion & speed optimization",
        f5: "Ongoing store management"
      },
      cryptoExchange: {
        subtitle: "Centralized exchanges with order books and KYC.",
        p1: "We build secure centralized exchanges (CEX) with matching engines, order books, wallets and full KYC/AML flows. Spot trading, margin and futures modules scale with your user base.",
        p2: "Focus on your market while we handle the engineering — from cold wallet custody and risk controls to dashboards and reporting.",
        f1: "Matching engine & order book",
        f2: "Wallets & cold storage custody",
        f3: "KYC/AML identity verification",
        f4: "Spot, margin & futures trading",
        f5: "Risk, admin & reporting dashboards"
      },
      dex: {
        subtitle: "Decentralized exchanges with on-chain swaps.",
        p1: "We build decentralized exchanges (DEX) where users trade from their own wallets. Automated market makers, liquidity pools, staking and on-chain order flows are engineered for safety and transparency.",
        p2: "Smart contracts are audited and optimized for gas efficiency, keeping fees low and trust high.",
        f1: "Automated Market Maker (AMM)",
        f2: "Liquidity pools & farming",
        f3: "Non-custodial wallet trading",
        f4: "Audited, gas-optimized contracts",
        f5: "Staking, bridges & analytics"
      },
      p2pExchange: {
        subtitle: "Peer-to-peer platforms matching buyers and sellers.",
        p1: "We build P2P exchanges where users trade directly with each other. Offer walls, price matching, rating systems and secure escrow keep every deal fair and protected.",
        p2: "Support multiple payment methods and regions, with dispute resolution that keeps both sides confident.",
        f1: "Buyers & sellers matching",
        f2: "Secure escrow protection",
        f3: "Reputation & rating system",
        f4: "Multiple payment methods & regions",
        f5: "Dispute resolution workflow"
      },
      otcExchange: {
        subtitle: "OTC desks for large, private trades.",
        p1: "For large trades that move markets, OTC is the answer. We build private over-the-counter desks with negotiated pricing, high liquidity and direct settlement between parties.",
        p2: "Handle institutional clients with dedicated accounts, transparency reports and professional service at every step.",
        f1: "Large-trade execution without slippage",
        f2: "Negotiated pricing & liquidity",
        f3: "Direct settlement & custody options",
        f4: "Institutional client accounts",
        f5: "Transparency & reporting tools"
      },
      cryptoPaymentGateway: {
        subtitle: "Gateways to accept digital assets.",
        p1: "Let customers pay with crypto and still receive the funds you need. We build payment gateways with instant confirmations, automatic USD-pegged settlement and fiat conversion.",
        p2: "Plugins for major e-commerce platforms, flexible merchant APIs and a dashboard give you full control.",
        f1: "Instant on-chain confirmations",
        f2: "Auto settlement & fiat conversion",
        f3: "E-commerce platform plugins",
        f4: "Merchant APIs & webhooks",
        f5: "Merchant dashboard & reports"
      },
      smartContracts: {
        subtitle: "Smart contract and token development.",
        p1: "We design and deploy on-chain logic for your project — from ERC/BEP tokens and NFTs to DAOs, staking and custom DeFi protocols. Security always comes first.",
        p2: "Every contract is audited, unit-tested and gas-optimized, with clear documentation your team can maintain with confidence.",
        f1: "Token creation (ERC-20, BEP-20, NFTs)",
        f2: "Staking, DAOs & DeFi modules",
        f3: "Audited & unit-tested contracts",
        f4: "Gas optimization & security best practices",
        f5: "Documentation & deployment support"
      },
      airdropPlatform: {
        subtitle: "Airdrop and token distribution platforms.",
        p1: "Reach thousands of wallets with a secure, automated airdrop. We build distribution platforms with eligibility rules, tasks and claims while keeping anti-bot measures and gas costs in check.",
        p2: "Analytics show exactly how your campaign performed, from eligible wallets to claimed tokens.",
        f1: "Automated token distribution",
        f2: "Eligibility rules & task gates",
        f3: "Anti-bot & Sybil protection",
        f4: "Claim pages & wallet integration",
        f5: "Campaign analytics & reports"
      },
      exchangeApp: {
        subtitle: "Exchange apps with charts and trading.",
        p1: "Take your exchange to mobile. We build trading apps with real-time charts, order placement, portfolio tracking and secure biometric login that your users will trust on the go.",
        p2: "Multi-factor authentication, price alerts and a clean interface make trading simple enough for everyone.",
        f1: "Real-time charts & market data",
        f2: "Order placement & management",
        f3: "Portfolio & balance tracking",
        f4: "Biometric login & 2FA",
        f5: "Price alerts & notifications"
      },
      uiuxDesign: {
        subtitle: "Product and interface design users love.",
        p1: "Great products start with great design. Our designers research your users, map their journeys and craft interfaces that are clear, beautiful and easy to use across every screen.",
        p2: "From wireframes and prototypes to full design systems, we hand developers precise specs that bring your idea to life without friction.",
        f1: "User research & journey mapping",
        f2: "Wireframes & interactive prototypes",
        f3: "Design systems & UI kits",
        f4: "Mobile & responsive design",
        f5: "Usability testing & iteration"
      },
      seoMarketing: {
        subtitle: "Grow organic traffic and sales.",
        p1: "Visibility brings customers. We build SEO and digital marketing strategies that improve rankings, launch effective campaigns and turn traffic into loyal paying customers.",
        p2: "From technical SEO and content strategy to paid ads and analytics, everything is measured and continuously improved.",
        f1: "Technical & on-page SEO",
        f2: "Content strategy & link building",
        f3: "Paid advertising campaigns",
        f4: "Conversion rate optimization",
        f5: "Analytics, reporting & growth"
      },
      dashboardsAdmin: {
        subtitle: "Admin panels to run your business with data.",
        p1: "Decisions are faster with clear data. We design and build dashboards and admin panels tailored to your workflow — from KPI overviews to deep reporting and operations tools.",
        p2: "Role-based access, data exports and integrations connect your tools, so your team works in one place.",
        f1: "KPI dashboards & data visualization",
        f2: "Operations, users & roles management",
        f3: "Reports & data export",
        f4: "Integrations with your tools",
        f5: "Role-based access control"
      },
      maintenanceSupport: {
        subtitle: "Hosting and support that keeps everything running.",
        p1: "Your product should keep improving after launch. We provide hosting, monitoring, updates and proactive maintenance so your website or app stays fast, secure and available.",
        p2: "Our support team handles bug fixes, feature additions and improvements with clear SLAs and transparent reporting.",
        f1: "Reliable hosting & monitoring",
        f2: "Security patches & regular updates",
        f3: "Performance tuning & optimization",
        f4: "Bug fixes & feature additions",
        f5: "SLA-backed support & reporting"
      },
    },
    de: {
    svc: {
      androidApp: {
        subtitle: "Native-Android-Apps mit Kotlin – vom MVP bis zum ausgereiften Produkt.",
        p1: "Unser Android-Team entwickelt leistungsfähige Apps mit Kotlin und modernen Architekturmustern wie MVVM und Clean Architecture. Wir begleiten den gesamten Lebenszyklus – von der Konzeption über UI/UX und Entwicklung bis zur Veröffentlichung im Play Store sowie zur Weiterentwicklung nach dem Launch.",
        p2: "Vom MVP bis zu großen Produkten mit Offline-Modus, Push-Benachrichtigungen, Zahlungen und Analysen bauen wir Apps, zu denen Ihre Nutzer gern zurückkehren.",
        f1: "Natives Android mit Kotlin & Jetpack Compose",
        f2: "Clean Architecture und gründliches Code-Review",
        f3: "Play-Store-Veröffentlichung & ASO",
        f4: "Push-Benachrichtigungen, Zahlungen & Analysen",
        f5: "Kontinuierliche Updates und langfristiger Support"
      },
      iosApp: {
        subtitle: "Native-iOS-Apps mit Swift und SwiftUI, auf App-Store-Niveau poliert.",
        p1: "Wir gestalten und entwickeln iOS-Apps für iPhone und iPad mit Swift und SwiftUI und folgen dabei den Human Interface Guidelines von Apple. Vom Prototyp bis zur App-Store-Freigabe kümmern wir uns um jedes Detail der Nutzererfahrung.",
        p2: "Ob Konsum-App, Service-Plattform oder Unternehmenslösung – wir liefern flüssige, barrierefreie Apps, die zu begeisterten Bewertungen führen.",
        f1: "Natives Swift- & SwiftUI-Development",
        f2: "Apple-Design-Standards & hochwertige UX",
        f3: "App-Store-Einreichung & Prüfung",
        f4: "In-App-Käufe, iCloud & Push",
        f5: "Performance-Optimierung und laufende Pflege"
      },
      webAppPwa: {
        subtitle: "Schnelle, installierbare Web-Apps und PWAs für jedes Gerät und jeden Browser.",
        p1: "Progressive Web Apps verbinden die Reichweite des Webs mit dem Gefühl einer nativen App. Wir entwickeln installierbare, offline-fähige und extrem schnelle Web-Apps mit modernen Technologien wie Next.js und React.",
        p2: "Eine Codebasis, jedes Gerät – weniger Store-Kosten, sofortige Updates und niedrige Einstiegshürden für Ihre Nutzer.",
        f1: "Installierbar & offline-fähig (PWA)",
        f2: "Moderne React/Next.js-Architektur",
        f3: "Push-Benachrichtigungen & Hintergrund-Sync",
        f4: "Schnelle Ladezeiten & SEO-freundlich",
        f5: "Eine Codebasis für alle Plattformen"
      },
      ecommerceApp: {
        subtitle: "Funktionsreiche Shopping-Apps mit Warenkorb, Zahlungen, Bestellungen und Push-Benachrichtigungen.",
        p1: "Wir entwickeln native Mobile-Stores, die konvertieren. Produktkataloge, intelligente Suche, reibungsloser Checkout, Sendungsverfolgung, Wunschliste und Push-Angebote – alles für Leistung und Kundenbindung optimiert.",
        p2: "Integrieren Sie lokale und internationale Zahlungsanbieter, Treueprogramme und Marketing-Automatisierung, damit Ihr Store mit jedem Release wächst.",
        f1: "Katalog, Suche & smarte Filter",
        f2: "Sicherer One-Tap-Checkout",
        f3: "Bestellverfolgung, Wunschliste & Bewertungen",
        f4: "Zahlungsanbieter & Treueprogramme",
        f5: "Push-Kampagnen & Kundenbindungs-Analysen"
      },
      classifiedsApp: {
        subtitle: "Kleinanzeigen- und Listing-Apps mit Chat, Suche, Filtern und sicherer Veröffentlichung.",
        p1: "Von Fahrzeug- und Immobilienanzeigen über Jobbörsen bis zu Gebrauchtwaren – wir bauen Kleinanzeigen-Apps, die Käufer und Verkäufer aktiv halten. Verifizierte Konten, In-App-Chat und ortsbezogene Suche sind integriert.",
        p2: "Umsatzbereit mit Top-Platzierungen, Boost-Tools und Premium-Mitgliedschaften – optimiert für Vertrauen und Engagement.",
        f1: "Smarte, ortsbezogene Suche & Filter",
        f2: "In-App-Chat & Kontaktverwaltung",
        f3: "Verifizierte Konten & sicherer Inserats-Flow",
        f4: "Top-Anzeigen, Boosts & Mitgliedschaften",
        f5: "Moderation & Analyse-Dashboard"
      },
      bookReaderApp: {
        subtitle: "Lese-Apps für E-Books und Hörbücher mit synchronisierten Bibliotheken und Abonnements.",
        p1: "Eine großartige Lese-App dreht sich um Konzentration. Wir gestalten ruhige, typografie-orientierte Erlebnisse mit anpassbaren Schriftarten, Themes, Offline-Downloads und geräteübergreifender Synchronisierung Ihrer Bibliothek.",
        p2: "Unterstützen Sie Abonnements, Verleih, Verschenken und nahtlose Zahlungsintegration, um aus Lesern ein wiederkehrendes Publikum zu machen.",
        f1: "Schöne Typografie & Lesethemen",
        f2: "Offline-Downloads & Bibliotheks-Sync",
        f3: "Hörbuch-Playback & Lesezeichen",
        f4: "Abonnements, Verleih & Verschenken",
        f5: "Fortschritts-Tracking über Geräte hinweg"
      },
      tourismApp: {
        subtitle: "Tourismus- und Reise-Apps mit Touren, Reiserouten, Karten und lokalen Erlebnissen.",
        p1: "Wir helfen Tourismusunternehmen, Reisende mit schönen Apps für Touren, Hotels, Flüge und Erlebnisse zu erreichen. Interaktive Karten, Offline-Reiseführer und mehrsprachige Inhalte machen jede Reise einfacher.",
        p2: "Mit Bewertungen, Wunschlisten, sicherer Buchung und Zahlung entwickeln Sie aus Inspiration bestätigte Reisen.",
        f1: "Touren, Routen & Erlebnisse",
        f2: "Interaktive Karten & Offline-Guides",
        f3: "Mehrsprachige Inhalte für Reisende",
        f4: "Sichere Buchung & Zahlung",
        f5: "Bewertungen, Wunschlisten & Angebote"
      },
      taxiApp: {
        subtitle: "Ride-Hailing-Apps mit Live-Tracking, Fahrer-Dispatch und In-App-Zahlungen.",
        p1: "Wir entwickeln komplette Taxi- und Ride-Hailing-Plattformen für Städte und Flotten. Fahrgast- und Fahrer-Apps, Live-GPS-Tracking, Fahrpreisberechnung und smarter Dispatch arbeiten für ein reibungsloses Erlebnis zusammen.",
        p2: "Höherpreisphasen, Fahrerbewertungen, Fahrtverlauf und Zahlungen in mehreren Währungen machen Ihren Betrieb effizient.",
        f1: "Fahrgast- & Fahrer-Apps",
        f2: "Live-GPS-Tracking & ETA",
        f3: "Smarter automatischer Fahrer-Dispatch",
        f4: "Fahrpreisberechnung & dynamische Preise",
        f5: "Bewertungen, Verlauf & Multiwährungs-Zahlungen"
      },
      flightHotelApp: {
        subtitle: "Buchungs-Apps mit Verfügbarkeit, Preisen und sofortiger Bestätigung.",
        p1: "Wir entwickeln Buchungsplattformen für Flüge, Hotels und Reisepakete. Suche über Anbieter hinweg, Preisvergleich in Echtzeit und sofortige Bestätigung in einem sicheren, reibungslosen Ablauf.",
        p2: "Integrieren Sie Anbieter-APIs, verwalten Sie Kapazitäten und Verfügbarkeiten pro Unterkunft und informieren Sie Nutzer per Buchungs-E-Mail und Hinweis.",
        f1: "Flüge, Hotels & Paketsuche",
        f2: "Echtzeit-Preise & Verfügbarkeit",
        f3: "Sofortige Bestätigung & E-Tickets",
        f4: "Anbieter-API-Integrationen",
        f5: "Buchungs-E-Mails & App-Hinweise"
      },
      corporateWebsite: {
        subtitle: "Hochwertige Unternehmenswebsites, die Ihr Unternehmen souverän präsentieren.",
        p1: "Ihre Website ist Ihr digitales Schaufenster. Wir entwickeln leistungsstarke Unternehmensseiten mit klarer Botschaft, starker Markenidentität und nahtlosen Konversionspfaden – von Landingpages bis zu mehrseitigen Erlebnissen.",
        p2: "Mit modernen Technologien, optimiert für Geschwindigkeit, SEO und einfache Inhalts-Pflege, damit Ihr Team die Kontrolle behält.",
        f1: "Konversionsorientiertes Layout & Messaging",
        f2: "Markenidentität & visuelles Design",
        f3: "SEO-bereit, schnell & barrierefrei",
        f4: "CMS für einfache Inhalts-Pflege",
        f5: "Analysen, A/B-Tests & Optimierung"
      },
      classifiedsWebsite: {
        subtitle: "Kleinanzeigen-Portale wie die großen Listing-Netzwerke – suchen, inserieren, chatten.",
        p1: "Starten Sie einen Marktplatz für Fahrzeuge, Immobilien, Jobs oder allgemeine Kleinanzeigen. Wir bauen durchsuchbare, filterbare Plattformen mit Benutzerkonten, sicherem Inserieren und Messaging.",
        p2: "Verdienen Sie mit Top-Anzeigen, Werbeplätzen und Premium-Konten – mit Moderation und Vertrauensfeatures im Kern.",
        f1: "Leistungsstarke Suche & Kategorie-Filter",
        f2: "Benutzerkonten & sicheres Inserieren",
        f3: "Messaging & Merkliste",
        f4: "Top-Anzeigen & Werbeplätze",
        f5: "Moderation, Meldungen & Vertrauenstools"
      },
      marketplaceWebsite: {
        subtitle: "Multi-Vendor-Marktplätze mit Stores und Checkout.",
        p1: "Wir bauen Marktplatz-Plattformen, auf denen viele Verkäufer ihre Produkte unter einer vertrauenswürdigen Marke anbieten. Verkäufer-Dashboards, Provisionsabwicklung, Bestell-Routing und Multi-Store-Checkout sind integriert.",
        p2: "Skalieren Sie mit Verkäufer-Applications, Bewertungen, Streitfällen und automatisierten Auszahlungen, die Ihren Marktplatz fair und schnell halten.",
        f1: "Verkäufer-Stores & Dashboards",
        f2: "Provision & Auszahlungs-Automatisierung",
        f3: "Einheitlicher Marktplatz-Checkout",
        f4: "Bewertungen, Sterne & Streitfälle",
        f5: "Kategorie-Verwaltung & durchsuchbarer Katalog"
      },
      onlineStore: {
        subtitle: "Schnelle Online-Stores mit Katalogen, Zahlungen und Versand.",
        p1: "Verwandeln Sie Ihre Produkte in einen Online-Shop, der rund um die Uhr verkauft. Wir bauen schnelle, zuverlässige Shops mit intelligenten Katalogen, reibungslosem Checkout, sicheren Zahlungen und Versand-Integration.",
        p2: "Sie bleiben mit einem Admin-Panel für Produkte, Bestellungen, Rabatte, Kunden und Marketing im Griff.",
        f1: "Smartes Produktmanagement & Suche",
        f2: "Reibungsloser, sicherer Checkout",
        f3: "Lokale & internationale Zahlungsanbieter",
        f4: "Versand & Bestellverwaltung",
        f5: "Admin-Panel, Rabatte & Marketing"
      },
      restaurantWebsite: {
        subtitle: "Restaurant-Websites mit Menüs, Tischreservierung und Online-Bestellung.",
        p1: "Bringen Sie Ihr Restaurant mit einer appetitanregenden Website online. Menü-Präsentation, Tischreservierung, Online-Bestellung und Küchen-Integrationen füllen jeden Platz.",
        p2: "Begeistern Sie Besucher mit Fotogalerien, Koch-Geschichten und Social Proof – und binden Sie Stammgäste mit Angeboten und Treueprogrammen.",
        f1: "Menü-Präsentation & Gericht-Galerien",
        f2: "Online-Tischreservierung",
        f3: "Online-Bestellung & Zahlung",
        f4: "Standort, Öffnungszeiten & Karte",
        f5: "Angebote, Treue & Bewertungs-Widgets"
      },
      newsWebsite: {
        subtitle: "Nachrichten-Websites mit Redaktions-Workflows und schneller Auslieferung.",
        p1: "Wir bauen moderne Nachrichten- und Medienplattformen mit intuitiven Redaktionsprozessen, blitzschneller Artikelauslieferung und ansprechenden Layouts für Desktop, Tablet und Mobilgeräte.",
        p2: "Verdienen Sie mit Abonnements, Anzeigen und Sponsorings und stärken Sie Ihr Team mit Analysen und Content-Planung.",
        f1: "Redaktions-Workflow & Publishing-Tools",
        f2: "Schnelle, SEO-optimierte Artikel",
        f3: "Kategorien, Tags & Suche",
        f4: "Abos, Anzeigen & Sponsoring",
        f5: "Analysen & Content-Planung"
      },
      medicalWebsite: {
        subtitle: "Klinik-Websites mit Online-Buchung und Patientenportalen.",
        p1: "Wir gestalten vertrauenswürdige Websites für Kliniken, Ärzte und Gesundheitszentren. Online-Terminbuchung, Patienteninformationen, Leistungsübersichten und datenschutz-erste Praktiken schaffen ab dem ersten Besuch Vertrauen.",
        p2: "Informieren und beruhigen Sie mit Team-Profilen, Artikeln und FAQs, während konforme Formulare und sichere Datenverarbeitung das Patientenvertrauen wahren.",
        f1: "Online-Terminbuchung",
        f2: "Leistungs-, Team- & Einrichtungsübersichten",
        f3: "Patienten-Artikel & FAQs",
        f4: "Datenschutz-orientierte, sichere Verarbeitung",
        f5: "Responsive, barrierefreies Design"
      },
      tourismWebsite: {
        subtitle: "Reise- und Tourismus-Websites mit Touren, Hotels und Buchung.",
        p1: "Inspirieren Sie Reisende und verwandeln Sie Klicks in Buchungen. Wir bauen schöne Tourismus-Websites mit immersiven Ziel-Inhalten, Tour-Katalogen und nahtlosen Buchungsabläufen.",
        p2: "Heben Sie Pakete und Angebote hervor und lassen Sie Besucher Reisen mit Routen, Galerien und vertrauensbildenden Bewertungen planen.",
        f1: "Ziele & Touren anschaulich präsentiert",
        f2: "Buchungsabläufe für Touren & Hotels",
        f3: "Reiserouten, Galerien & Karten",
        f4: "Mehrsprachige Inhalte",
        f5: "Bewertungen, Angebote & Vertrauenssignale"
      },
      bookReaderWebsite: {
        subtitle: "Lese-Websites für den Verkauf und Streaming von E-Books und Hörbüchern.",
        p1: "Starten Sie eine Leselplatform für Ihren Verlag oder Ihre Bibliothek. Ein schöner Katalog, sichere E-Book-Käufe, Abonnements und ein In-Browser-Reader machen jedes Buch einfach zugänglich.",
        p2: "Mit Hörbuch-Streaming, Bewertungen, Wunschlisten und Leserkonten bauen Sie eine loyale Community rund um Ihre Bücher.",
        f1: "E-Book-Store & sichere Käufe",
        f2: "In-Browser-Reader",
        f3: "Hörbuch-Streaming & Player",
        f4: "Abonnements & Mitgliedschaften",
        f5: "Bewertungen, Wunschlisten & Leserkonten"
      },
      wordpress: {
        subtitle: "WordPress-Websites, optimiert für Geschwindigkeit, SEO und einfache Pflege.",
        p1: "WordPress gibt Ihrem Team volle Kontrolle über Inhalte. Wir bauen Custom-Themes, passende Plugins und optimierte Setups – schnell, sicher und für Autoren täglich leicht zu aktualisieren.",
        p2: "Von Blogs über komplette Firmenseiten bis zu Online-Shops passen wir WordPress mit professionellem Design und Pflege an Ihr Geschäft an.",
        f1: "Custom-Themes & Page-Builder-Setup",
        f2: "Speed, Core Web Vitals & SEO",
        f3: "Sicherheit, Backups & Updates",
        f4: "Leichtes Bearbeiten ohne IT-Wissen",
        f5: "Laufender Support & Care-Pläne"
      },
      subscriptionStore: {
        subtitle: "Stores für Mitgliedschaften und wiederkehrende Einnahmen.",
        p1: "Verwandeln Sie Einmalkäufer in eine planbare Einnahmequelle. Wir bauen Abo-E-Commerce mit Tarifen, wiederkehrender Abrechnung, Mitgliederportalen und automatischer Verlängerung.",
        p2: "Unterstützen Sie Boxen, Mitgliedschaften, digitale Güter und Kündigungen – mit Metriken, die Ihre Geschäftsentwicklung genau zeigen.",
        f1: "Tarife & wiederkehrende Abrechnung",
        f2: "Mitgliederportal & Kontenverwaltung",
        f3: "Zahlungs-Retry-Automatisierung",
        f4: "Abo-Boxen & digitale Güter",
        f5: "Churn-Analysen & Wachstumsberichte"
      },
      shopifyStore: {
        subtitle: "Shopify-Stores, konfiguriert und auf Ihre Marke zugeschnitten.",
        p1: "Starten Sie schnell mit der bewährten Shopify-Infrastruktur, auf Ihre Marke zugeschnitten. Wir konfigurieren Themes, Apps und Zahlungen für einen Store, der individuell aussieht und perfekt läuft.",
        p2: "Optimieren Sie Konversion und Skalierung mit Apps für Marketing, Fulfillment und Analysen – komplett von unserem Team verwaltet.",
        f1: "Theme-Anpassung & Brand-Design",
        f2: "App- & Plugin-Konfiguration",
        f3: "Zahlungen & Versand-Setup",
        f4: "Konversions- & Geschwindigkeits-Optimierung",
        f5: "Laufende Store-Verwaltung"
      },
      cryptoExchange: {
        subtitle: "Zentralisierte Börsen mit Orderbuch und KYC.",
        p1: "Wir bauen sichere zentralisierte Börsen (CEX) mit Matching-Engine, Orderbüchern, Wallets und vollständigen KYC/AML-Abläufen. Spot-, Margin- und Futures-Module skalieren mit Ihrer Nutzerbasis.",
        p2: "Konzentrieren Sie sich auf Ihren Markt – für die Technik sorgen wir: von Cold-Wallet-Custody und Risikokontrollen bis zu Dashboards und Reporting.",
        f1: "Matching-Engine & Orderbuch",
        f2: "Wallets & Cold-Storage-Verwahrung",
        f3: "KYC/AML-Identitätsprüfung",
        f4: "Spot-, Margin- & Futures-Handel",
        f5: "Risiko-, Admin- & Reporting-Dashboards"
      },
      dex: {
        subtitle: "Dezentrale Börsen mit On-Chain-Swaps.",
        p1: "Wir entwickeln dezentrale Börsen (DEX), bei denen Nutzer aus ihren eigenen Wallets handeln. Automated Market Maker, Liquiditätspools, Staking und On-Chain-Auftragsflüsse sind für Sicherheit und Transparenz gebaut.",
        p2: "Smart Contracts werden auditiert und gas-optimiert entwickelt – für niedrige Gebühren und hohes Vertrauen.",
        f1: "Automated Market Maker (AMM)",
        f2: "Liquiditätspools & Farming",
        f3: "Non-Custodial-Wallet-Handel",
        f4: "Auditierte, gas-optimierte Contracts",
        f5: "Staking, Bridges & Analysen"
      },
      p2pExchange: {
        subtitle: "Peer-to-Peer-Plattformen, die Käufer und Verkäufer zusammenbringen.",
        p1: "Wir bauen P2P-Börsen, bei denen Nutzer direkt miteinander handeln. Angebotswände, Preiszusammenführung, Bewertungssysteme und sichere Treuhand halten jedes Geschäft fair und geschützt.",
        p2: "Unterstützen Sie mehrere Zahlungsarten und Regionen – mit Streitbeilegung, die beiden Seiten Sicherheit gibt.",
        f1: "Käufer & Verkäufer zusammenführen",
        f2: "Sichere Treuhand (Escrow)",
        f3: "Reputations- & Bewertungssystem",
        f4: "Mehrere Zahlungsarten & Regionen",
        f5: "Streitbeilegungs-Workflow"
      },
      otcExchange: {
        subtitle: "OTC-Desks für große, private Trades.",
        p1: "Für große Geschäfte, die Märkte bewegen, ist OTC die Lösung. Wir bauen private OTC-Desks mit ausgehandelten Preisen, hoher Liquidität und direkter Abwicklung zwischen den Parteien.",
        p2: "Bedienen Sie institutionelle Kunden mit dedizierten Konten, Transparenzberichten und professionellem Service in jedem Schritt.",
        f1: "Ausführung großer Trades ohne Slippage",
        f2: "Verhandelbare Preise & Liquidität",
        f3: "Direkte Abwicklung & Verwahrung",
        f4: "Institutionelle Kundenkonten",
        f5: "Transparenz- & Berichtstools"
      },
      cryptoPaymentGateway: {
        subtitle: "Gateways zum Akzeptieren digitaler Vermögenswerte.",
        p1: "Lassen Sie Kunden mit Krypto zahlen und erhalten Sie die Mittel, die Sie brauchen. Wir bauen Zahlungs-Gateways mit sofortigen Bestätigungen, automatischer Abrechnung und Fiat-Konvertierung.",
        p2: "Plugins für große E-Commerce-Plattformen, flexible Merchant-APIs und ein Dashboard geben Ihnen volle Kontrolle.",
        f1: "Sofortige On-Chain-Bestätigungen",
        f2: "Automatische Abrechnung & Fiat-Umwandlung",
        f3: "Plugins für E-Commerce-Plattformen",
        f4: "Merchant-APIs & Webhooks",
        f5: "Merchant-Dashboard & Berichte"
      },
      smartContracts: {
        subtitle: "Smart-Contract- und Token-Entwicklung.",
        p1: "Wir entwerfen und deployen On-Chain-Logik für Ihr Projekt – von ERC/BEP-Tokens und NFTs über DAOs und Staking bis zu eigenen DeFi-Protokollen. Sicherheit hat immer Priorität.",
        p2: "Jeder Contract wird auditiert, getestet und gas-optimiert – mit klarer Dokumentation, die Ihr Team sicher warten kann.",
        f1: "Token-Erstellung (ERC-20, BEP-20, NFTs)",
        f2: "Staking, DAOs & DeFi-Module",
        f3: "Auditierte & getestete Contracts",
        f4: "Gas-Optimierung & Sicherheitsstandards",
        f5: "Dokumentation & Deployment-Support"
      },
      airdropPlatform: {
        subtitle: "Airdrop- und Token-Verteilungsplattformen.",
        p1: "Erreichen Sie Tausende Wallets mit einem sicheren, automatisierten Airdrop. Wir bauen Verteilungsplattformen mit Berechtigungsregeln, Aufgaben und Claims – mit Anti-Bot-Schutz und kontrollierten Gaskosten.",
        p2: "Analysen zeigen genau, wie Ihre Kampagne gelaufen ist – von berechtigten Wallets bis zu eingelösten Tokens.",
        f1: "Automatisierte Token-Verteilung",
        f2: "Berechtigungsregeln & Aufgaben",
        f3: "Anti-Bot- & Sybil-Schutz",
        f4: "Claim-Seiten & Wallet-Anbindung",
        f5: "Kampagnen-Analysen & Berichte"
      },
      exchangeApp: {
        subtitle: "Exchange-Apps mit Charts und Trading.",
        p1: "Bringen Sie Ihre Börse auf Mobilgeräte. Wir bauen Trading-Apps mit Echtzeit-Charts, Order-Eingabe, Portfolio-Tracking und sicheren biometrischen Login – vertrauenswürdig unterwegs.",
        p2: "Multi-Faktor-Authentifizierung, Preisalarme und eine klare Oberfläche machen das Trading einfach für alle.",
        f1: "Echtzeit-Charts & Marktdaten",
        f2: "Order-Eingabe & -Verwaltung",
        f3: "Portfolio- & Kontostand-Tracking",
        f4: "Biometrischer Login & 2FA",
        f5: "Preisalarme & Benachrichtigungen"
      },
      uiuxDesign: {
        subtitle: "Produkt- und Interface-Design, das Nutzer lieben.",
        p1: "Große Produkte beginnen mit großem Design. Unsere Designer erforschen Ihre Nutzer, kartieren ihre Wege und gestalten klare, schöne und benutzerfreundliche Oberflächen für jede Bildschirmgröße.",
        p2: "Vom Wireframe über Prototypen bis zu kompletten Design-Systemen liefern wir Entwicklern präzise Spezifikationen, die Ihre Idee reibungslos umsetzen.",
        f1: "Nutzerforschung & Journey-Mapping",
        f2: "Wireframes & interaktive Prototypen",
        f3: "Design-Systeme & UI-Kits",
        f4: "Mobiles & responsives Design",
        f5: "Usability-Tests & Iteration"
      },
      seoMarketing: {
        subtitle: "Organischen Traffic und Umsatz steigern.",
        p1: "Sichtbarkeit bringt Kunden. Wir entwickeln SEO- und Digital-Marketing-Strategien, die Rankings verbessern, Kampagnen starten und Traffic in treue zahlende Kunden verwandeln.",
        p2: "Von technischem SEO und Content-Strategie bis zu bezahlter Werbung und Analysen – alles wird gemessen und laufend verbessert.",
        f1: "Technisches & On-Page-SEO",
        f2: "Content-Strategie & Linkbuilding",
        f3: "Bezahlte Werbekampagnen",
        f4: "Conversion-Rate-Optimierung",
        f5: "Analysen, Reporting & Wachstum"
      },
      dashboardsAdmin: {
        subtitle: "Admin-Panels, um Ihr Business mit Daten zu führen.",
        p1: "Mit klaren Daten sind Entscheidungen schneller. Wir gestalten und entwickeln Dashboards und Admin-Panels passend zu Ihrem Workflow – von KPI-Übersichten bis zu tiefen Berichten und Operations-Tools.",
        p2: "Rollenbasierte Zugriffe, Datenexporte und Integrationen verbinden Ihre Tools, sodass Ihr Team an einem Ort arbeitet.",
        f1: "KPI-Dashboards & Datenvisualisierung",
        f2: "Operations-, Nutzer- & Rollenverwaltung",
        f3: "Berichte & Datenexport",
        f4: "Integration Ihrer Tools",
        f5: "Rollenbasierte Zugriffskontrolle"
      },
      maintenanceSupport: {
        subtitle: "Hosting und Support, der alles am Laufen hält.",
        p1: "Ihr Produkt soll auch nach dem Launch besser werden. Wir bieten Hosting, Monitoring, Updates und proaktive Wartung, damit Ihre Website oder App schnell, sicher und verfügbar bleibt.",
        p2: "Unser Support-Team kümmert sich um Bugfixes, Funktionserweiterungen und Verbesserungen mit klaren SLAs und transparenter Berichterstattung.",
        f1: "Zuverlässiges Hosting & Monitoring",
        f2: "Sicherheits-Updates & regelmäßige Wartung",
        f3: "Performance-Optimierung",
        f4: "Bugfixes & Funktionserweiterungen",
        f5: "Support mit SLA & Reporting"
      },
    },
    fa: {
    svc: {
      androidApp: {
        subtitle: "اپلیکیشن‌های اندروید نیتیو با کاتلین، از MVP تا محصول کامل.",
        p1: "تیم اندروید ما با کاتلین و معماری‌های مدرن مانند MVVM و Clean Architecture اپلیکیشن‌هایی پرسرعت و باکیفیت می‌سازد. کل چرخه را پوشش می‌دهیم — از ایده و UI/UX و توسعه تا انتشار در گوگل‌پلی و بهبود مداوم پس از عرضه.",
        p2: "از MVP تا محصولات بزرگ با حالت آفلاین، نوتیفیکیشن، پرداخت امن و آنالیتیکس، اپلیکیشنی می‌سازیم که کاربران بارها و بارها به آن برمی‌گردند.",
        f1: "توسعه نیتیو با کاتلین و Jetpack Compose",
        f2: "معماری تمیز و بررسی دقیق کد",
        f3: "انتشار در گوگل‌پلی و سئوی اپ‌استور",
        f4: "نوتیفیکیشن، پرداخت و آنالیتیکس",
        f5: "آپدیت مستمر و پشتیبانی بلندمدت"
      },
      iosApp: {
        subtitle: "اپلیکیشن‌های iOS نیتیو با Swift و SwiftUI، با استانداردهای اپ‌استور.",
        p1: "اپلیکیشن‌های iOS آیفون و آیپد را با Swift و SwiftUI و بر اساس Human Interface Guidelines اپل طراحی و توسعه می‌دهیم. از نمونه اولیه تا تأیید اپ‌استور، به تک‌تک جزئیات تجربه کاربر توجه می‌کنیم.",
        p2: "چه اپ مصرفی باشد چه پلتفرم خدماتی و چه ابزار سازمانی، اپلیکیشنی روان، در دسترس و دوست‌داشتنی تحویل می‌دهیم که نظرات عالی می‌گیرد.",
        f1: "توسعه نیتیو با Swift و SwiftUI",
        f2: "استانداردهای طراحی اپل و تجربه کاربر درخشان",
        f3: "ارسال و تأیید در اپ‌استور",
        f4: "خرید درون‌برنامه، iCloud و نوتیفیکیشن",
        f5: "بهینه‌سازی سرعت و نگهداری مستمر"
      },
      webAppPwa: {
        subtitle: "وب‌اپلیکیشن‌ها و PWAهای سریع و قابل نصب که روی هر دستگاهی کار می‌کنند.",
        p1: "Progressive Web Appها دسترسی وب را با حس اپلیکیشن نیتیو ترکیب می‌کنند. با استک‌های مدرن مثل Next.js و React، وب‌اپلیکیشن‌هایی قابل نصب، آفلاین و فوق‌العاده سریع می‌سازیم.",
        p2: "یک کدبیس، همه دستگاه‌ها — هزینه کمتر اپ‌استور، آپدیت فوری و مانع کمتر برای شروع استفاده کاربران از محصول شما.",
        f1: "قابل نصب و کارکرد آفلاین (PWA)",
        f2: "معماری مدرن React و Next.js",
        f3: "نوتیفیکیشن و همگام‌سازی پس‌زمینه",
        f4: "بارگذاری سریع و سئوی مطلوب",
        f5: "یک کدبیس برای همه پلتفرم‌ها"
      },
      ecommerceApp: {
        subtitle: "اپلیکیشن‌های فروشگاهی کامل با سبد خرید، پرداخت، سفارش و نوتیفیکیشن.",
        p1: "فروشگاه‌های موبایل نیتیو می‌سازیم که واقعاً فروش ایجاد می‌کنند. کاتالوگ محصول، جستجوی هوشمند، تسویه‌حساب روان، رهگیری سفارش، علاقه‌مندی و پیام‌های فروش — همه برای کارایی و نگه‌داشت کاربر بهینه شده‌اند.",
        p2: "درگاه‌های پرداخت داخلی و بین‌المللی، برنامه‌های وفاداری و اتوماسیون بازاریابی را یکپارچه می‌کنیم تا فروشگاه شما با هر نسخه رشد کند.",
        f1: "کاتالوگ، جستجو و فیلترهای هوشمند",
        f2: "تسویه‌حساب امن با یک لمس",
        f3: "رهگیری سفارش، علاقه‌مندی و نظرات",
        f4: "درگاه‌های پرداخت و برنامه‌های وفاداری",
        f5: "کمپین‌های نوتیفیکیشن و آنالیز نگه‌داشت"
      },
      classifiedsApp: {
        subtitle: "اپلیکیشن‌های آگهی و فهرست با چت، جستجو، فیلتر و انتشار امن.",
        p1: "از آگهی خودرو و املاک گرفته تا کاریابی و بازار دست‌دوم، اپلیکیشن آگهی می‌سازیم که خریدار و فروشنده را فعال نگه می‌دارد. حساب‌های تأییدشده، چت درون‌برنامه و جستجوی موقعیت‌محور از پایه ساخته می‌شوند.",
        p2: "آماده درآمدزایی با آگهی ویژه، برجسته‌سازی و عضویت‌های ویژه؛ طراحی‌شده برای اعتماد و تعامل بالا.",
        f1: "جستجو و فیلتر هوشمند موقعیت‌محور",
        f2: "چت درون‌برنامه و مدیریت ارتباطات",
        f3: "حساب‌های تأییدشده و فرایند انتشار امن",
        f4: "آگهی ویژه، برجسته‌سازی و عضویت در سرویس",
        f5: "پنل مدیریت محتوا و آنالیتیکس"
      },
      bookReaderApp: {
        subtitle: "اپلیکیشن کتاب‌خوان برای کتاب الکترونیک و صوتی با کتابخانه همگام و اشتراک.",
        p1: "یک اپلیکیشن کتاب‌خوان خوب حول محور تمرکز ساخته می‌شود. تجربه‌هایی آرام و مبتنی بر تایپوگرافی طراحی می‌کنیم با فونت‌ها و تم‌های قابل تنظیم، دانلود آفلاین و همگام‌سازی کتابخانه بین دستگاه‌ها.",
        p2: "اشتراک، اجاره، هدیه دادن کتاب و پرداخت یکپارچه را پشتیبانی می‌کنیم تا خواننده‌ها به مخاطب دائمی تبدیل شوند.",
        f1: "تایپوگرافی زیبا و تم‌های مطالعه",
        f2: "دانلود آفلاین و همگام‌سازی کتابخانه",
        f3: "پخش کتاب صوتی و نشانه‌گذاری",
        f4: "اشتراک، اجاره و هدیه کتاب",
        f5: "پیگیری پیشرفت مطالعه بین دستگاه‌ها"
      },
      tourismApp: {
        subtitle: "اپلیکیشن‌های گردشگری و سفر با تور، سفرنامه، نقشه و تجربه‌های محلی.",
        p1: "به کسب‌وکارهای گردشگری کمک می‌کنیم با اپلیکیشن‌های زیبا برای تور، هتل، پرواز و تجربه‌های محلی به مسافران برسند. نقشه‌های تعاملی، راهنمای آفلاین و محتوای چندزبانه هر سفر را روان‌تر می‌کند.",
        p2: "نظرات، علاقه‌مندی، رزرو امن و پرداخت را اضافه می‌کنیم تا الهام به سفر قطعی تبدیل شود.",
        f1: "تور، سفرنامه و تجربه‌های محلی",
        f2: "نقشه تعاملی و راهنمای آفلاین",
        f3: "محتوای چندزبانه برای مسافران",
        f4: "رزرو و پرداخت امن",
        f5: "نظرات، علاقه‌مندی و پیشنهادهای ویژه"
      },
      taxiApp: {
        subtitle: "اپلیکیشن‌های تاکسی اینترنتی با رهگیری زنده، اعزام هوشمند و پرداخت درون‌برنامه.",
        p1: "پلتفرم‌های کامل تاکسی و سرویس حمل‌ونقل برای شهرها و ناوگان‌ها می‌سازیم. اپلیکیشن مسافر و راننده، رهگیری زنده GPS، تخمین کرایه و اعزام هوشمند با هم تجربه‌ای روان را رقم می‌زنند.",
        p2: "نرخ‌گذاری پیک، امتیازدهی به راننده، تاریخچه سفرها و پرداخت چندارزی را اضافه می‌کنیم تا عملیات شما بهینه باشد.",
        f1: "اپلیکیشن مسافر و راننده",
        f2: "رهگیری زنده GPS و زمان رسیدن",
        f3: "اعزام هوشمند و خودکار راننده",
        f4: "تخمین کرایه و قیمت‌گذاری پیک",
        f5: "امتیازدهی، تاریخچه و پرداخت چندارزی"
      },
      flightHotelApp: {
        subtitle: "اپلیکیشن رزرو با نمایش موجودی، قیمت و تأیید فوری.",
        p1: "پلتفرم‌های رزرو پرواز، هتل و پکیج سفر می‌سازیم. جستجو بین ارائه‌دهندگان، مقایسه قیمت به‌صورت زنده و تأیید فوری رزرو در یک فرایند امن و روان.",
        p2: "API ارائه‌دهندگان را یکپارچه می‌کنیم، ظرفیت و موجودی هر ملک را مدیریت می‌کنیم و با ایمیل و نوتیفیکیشن کاربر را به‌روز نگه می‌داریم.",
        f1: "جستجوی پرواز، هتل و پکیج",
        f2: "قیمت و موجودی لحظه‌ای",
        f3: "تأیید فوری و بلیت الکترونیک",
        f4: "یکپارچه‌سازی API ارائه‌دهندگان",
        f5: "ایمیل رزرو و نوتیفیکیشن اپلیکیشن"
      },
      corporateWebsite: {
        subtitle: "وب‌سایت‌های شرکتی حرفه‌ای که شرکت شما را با اعتمادبه‌نفس معرفی می‌کنند.",
        p1: "وب‌سایت شما ویترین دیجیتال کسب‌وکارتان است. وب‌سایت‌های شرکتی نتیجه‌محور با پیام مشخص، هویت برند قوی و مسیرهای تبدیل بدون‌وقفه می‌سازیم — از لندینگ‌پیج تا تجربه‌های چندصفحه‌ای کامل.",
        p2: "با استک‌های مدرن، بهینه‌شده برای سرعت، سئو و مدیریت آسان محتوا تا تیم شما همیشه کنترل در دست داشته باشد.",
        f1: "چیدمان و پیام‌رسانی متمرکز بر تبدیل",
        f2: "هویت برند و طراحی بصری",
        f3: "آماده سئو، سریع و در دسترس",
        f4: "سیستم مدیریت محتوا برای آپدیت آسان",
        f5: "آنالیتیکس، تست A/B و بهینه‌سازی"
      },
      classifiedsWebsite: {
        subtitle: "وب‌سایت آگهی مانند پلتفرم‌های بزرگ فهرست — جستجو، انتشار، گفتگو.",
        p1: "بازار آگهی برای خودرو، املاک، مشاغل یا آگهی‌های عمومی راه‌اندازی کنید. پلتفرم‌های قابل جستجو و فیلتر با حساب کاربری، انتشار امن و پیام‌رسانی را از پایه مهندسی می‌کنیم.",
        p2: "با آگهی ویژه، جایگاه تبلیغاتی و حساب‌های پرمیوم کسب درآمد کنید، در حالی که ابزارهای نظارت و اعتماد همیشه مرکزی مانده‌اند.",
        f1: "جستجوی قدرتمند و فیلتر دسته‌ها",
        f2: "حساب کاربری و انتشار امن",
        f3: "پیام‌رسانی و آگهی‌های نشان‌شده",
        f4: "آگهی ویژه و جایگاه‌های تبلیغاتی",
        f5: "نظارت، گزارش تخلف و ابزارهای اعتماد"
      },
      marketplaceWebsite: {
        subtitle: "بازارگاه چندفروشنده با فروشگاه، سبد خرید و تسویه‌حساب یکپارچه.",
        p1: "پلتفرم‌های مارکت‌پلیس می‌سازیم که به فروشندگان متعدد اجازه می‌دهد محصولاتشان را زیر یک برند قابل اعتماد ارائه دهند. پنل فروشنده، مدیریت کمیسیون، مسیریابی سفارش و تسویه‌حساب چندفروشگاهی همگی ارائه می‌شود.",
        p2: "با فرایند پذیرش فروشنده، نظرات، اختلاف‌ها و اتوماسیون پرداخت به فروشندگان مقیاس‌پذیر رشد کنید.",
        f1: "فروشگاه فروشندگان و پنل آن‌ها",
        f2: "کمیسیون و اتوماسیون تسویه",
        f3: "تسویه‌حساب یکپارچه مارکت‌پلیس",
        f4: "نظرات، امتیازها و رسیدگی به اختلاف",
        f5: "مدیریت دسته‌ها و کاتالوگ قابل جستجو"
      },
      onlineStore: {
        subtitle: "فروشگاه اینترنتی سریع با کاتالوگ، پرداخت و ارسال.",
        p1: "محصولات خود را به فروشگاه آنلاینی تبدیل کنید که ۲۴ ساعته می‌فروشد. فروشگاه‌هایی سریع و مطمئن با کاتالوگ هوشمند، تسویه‌حساب روان، پرداخت امن و یکپارچه‌سازی حمل‌ونقل می‌سازیم.",
        p2: "با پنل مدیریت محصولات، سفارش‌ها، تخفیف‌ها، مشتریان و ابزارهای بازاریابی، همیشه کنترل در دست شماست.",
        f1: "کاتالوگ هوشمند و جستجوی محصول",
        f2: "تسویه‌حساب امن و روان",
        f3: "درگاه‌های پرداخت داخلی و بین‌المللی",
        f4: "مدیریت ارسال و سفارش",
        f5: "پنل مدیریت، تخفیف و بازاریابی"
      },
      restaurantWebsite: {
        subtitle: "وب‌سایت رستوران با منو، رزرو میز و سفارش آنلاین.",
        p1: "رستوران خود را با وب‌سایتی اشتهاآور آنلاین کنید. نمایش منو، رزرو میز، سفارش آنلاین و یکپارچه‌سازی آشپزخانه با هم کار می‌کنند تا هر صندلی پر شود.",
        p2: "بازدیدکنندگان را با گالری عکس، داستان سرآشپز و اعتماد اجتماعی جذب کنید و با پیشنهادها و وفاداری، مشتریان ثابت را برگردانید.",
        f1: "نمایش منو و گالری غذاها",
        f2: "رزرو آنلاین میز",
        f3: "سفارش آنلاین و پرداخت",
        f4: "موقعیت، ساعات کاری و نقشه",
        f5: "پیشنهادها، وفاداری و ویجت نظرات"
      },
      newsWebsite: {
        subtitle: "وب‌سایت خبری با فرایندهای تحریریه و انتشار سریع.",
        p1: "پلتفرم‌های خبری و رسانه‌ای مدرن با فرایندهای تحریریه روان، انتشار فوق‌العاده سریع مقاله و چیدمان جذاب برای دسکتاپ، تبلت و موبایل می‌سازیم.",
        p2: "با اشتراک، تبلیغات و اسپانسر کسب درآمد کنید و تیم خود را با آنالیتیکس و زمان‌بندی محتوا قدرتمند کنید.",
        f1: "فرایند تحریریه و ابزارهای انتشار",
        f2: "مقاله‌های سریع و بهینه برای سئو",
        f3: "دسته‌بندی، برچسب و جستجو",
        f4: "اشتراک، تبلیغات و اسپانسر",
        f5: "آنالیتیکس و زمان‌بندی محتوا"
      },
      medicalWebsite: {
        subtitle: "وب‌سایت درمانگاه با رزرو آنلاین و پرتال بیماران.",
        p1: "برای کلینیک‌ها، پزشکان و مراکز درمانی وب‌سایت‌هایی قابل اعتماد طراحی می‌کنیم. رزرو آنلاین نوبت، اطلاعات بیماران، معرفی خدمات و رعایت حریم خصوصی از اولین بازدید اعتماد ایجاد می‌کنند.",
        p2: "با معرفی تیم، مقاله و سوالات متداول اطلاع‌رسانی و اطمینان‌بخشی کنید، در حالی که فرم‌های مطابق قانون و پردازش امن داده، اعتماد بیمار را حفظ می‌کنند.",
        f1: "رزرو آنلاین نوبت",
        f2: "معرفی خدمات، تیم و امکانات",
        f3: "مقالات آموزشی و سوالات متداول",
        f4: "پردازش امن و حریم‌خصوصی‌محور داده",
        f5: "طراحی واکنش‌گرا و در دسترس"
      },
      tourismWebsite: {
        subtitle: "وب‌سایت گردشگری و سفر با تور، هتل و رزرو سفر الهام‌بخش.",
        p1: "مسافران را الهام بگیرید و کلیک را به رزرو تبدیل کنید. وب‌سایت‌های گردشگری زیبا با محتوای جذاب مقصد، کاتالوگ تور و فرایند رزرو روان می‌سازیم.",
        p2: "پکیج‌ها و پیشنهادهای ویژه را برجسته کنید و به بازدیدکنندگان اجازه دهید با سفرنامه، گالری و نظرات اعتمادآفرین سفرشان را برنامه‌ریزی کنند.",
        f1: "معرفی مقصد و تورها",
        f2: "فرایند رزرو تور و هتل",
        f3: "سفرنامه، گالری و نقشه",
        f4: "محتوای چندزبانه",
        f5: "نظرات، پیشنهادها و نشانه‌های اعتماد"
      },
      bookReaderWebsite: {
        subtitle: "وب‌سایت کتاب‌خوان برای فروش و استریم کتاب الکترونیک و صوتی.",
        p1: "پلتفرم مطالعه برای ناشر یا کتابخانه خود راه‌اندازی کنید. کاتالوگ زیبا، خرید امن کتاب الکترونیک، اشتراک و کتاب‌خوان درون مرورگر، هر کتاب را آسان در دسترس می‌کند.",
        p2: "با استریم کتاب صوتی، نظرات، علاقه‌مندی و حساب کاربری، جامعه‌ای وفادار حول کتاب‌هایتان بسازید.",
        f1: "فروشگاه کتاب الکترونیک و خرید امن",
        f2: "تجربه مطالعه درون مرورگر",
        f3: "استریم کتاب صوتی و پخش‌کننده",
        f4: "اشتراک و عضویت",
        f5: "نظرات، علاقه‌مندی و حساب کاربری"
      },
      wordpress: {
        subtitle: "وب‌سایت وردپرسی بهینه‌شده برای سرعت، سئو و مدیریت آسان.",
        p1: "وردپرس کنترل کامل محتوا را به تیم شما می‌دهد. قالب اختصاصی، افزونه‌های لازم و تنظیمات بهینه می‌سازیم — سریع، امن و به‌سادگی قابل‌آپدیت توسط تیم نویسندگان هر روز.",
        p2: "از وبلاگ تا وب‌سایت کامل شرکتی و فروشگاه آنلاین، وردپرس را با طراحی حرفه‌ای و پشتیبانی با کسب‌وکار شما هماهنگ می‌کنیم.",
        f1: "قالب اختصاصی و تنظیم پیج‌بیلدر",
        f2: "سرعت، Core Web Vitals و سئو",
        f3: "امنیت، بکاپ و به‌روزرسانی",
        f4: "مدیریت آسان برای تیم غیرفنی",
        f5: "پشتیبانی مستمر و برنامه پشتیبانی"
      },
      subscriptionStore: {
        subtitle: "فروشگاه اشتراکی برای عضویت و درآمد تکرارشونده.",
        p1: "خریداران یک‌باره را به جریان درآمدی قابل‌پیش‌بینی تبدیل کنید. تجارت الکترونیک اشتراکی با پلن‌ها، پرداخت دوره‌ای، پرتال عضو و تمدید خودکار می‌سازیم.",
        p2: "باکس اشتراک، عضویت، کالای دیجیتال و لغو اشتراک را با معیارهایی پشتیبانی می‌کنیم که دقیقاً رشد کسب‌وکار را نشان می‌دهند.",
        f1: "پلن‌ها، سطوح و پرداخت دوره‌ای",
        f2: "پرتال عضو و مدیریت حساب",
        f3: "اتوماسیون تلاش مجدد پرداخت",
        f4: "باکس اشتراک و کالای دیجیتال",
        f5: "آنالیز ریزش و گزارش رشد"
      },
      shopifyStore: {
        subtitle: "فروشگاه شاپیفای متناسب با برند شما.",
        p1: "با زیرساخت اثبات‌شده شاپیفای و مطابق برند خود سریع شروع کنید. تم، اپ و پرداخت را طوری پیکربندی می‌کنیم که فروشگاهی اختصاصی و بی‌نقص بسازیم.",
        p2: "با اپ‌های بازاریابی، ارسال و آنالیتیکس برای تبدیل و مقیاس‌پذیری بهینه می‌کنیم — کاملاً مدیریت‌شده توسط تیم ما.",
        f1: "سفارشی‌سازی قالب و طراحی برند",
        f2: "پیکربندی اپ و افزونه",
        f3: "تنظیم پرداخت و ارسال",
        f4: "بهینه‌سازی نرخ تبدیل و سرعت",
        f5: "مدیریت مستمر فروشگاه"
      },
      cryptoExchange: {
        subtitle: "صرافی متمرکز با دفتر سفارش و احراز هویت.",
        p1: "صرافی‌های متمرکز (CEX) امن با موتور تطبیق، دفتر سفارش، کیف پول و فرایند کامل KYC/AML می‌سازیم. ماژول‌های معاملات اسپات، مارجین و فیوچرز متناسب با رشد کاربران مقیاس می‌شوند.",
        p2: "تمرکز روی بازار خودتان را بسپارید؛ مهندسی با ماست — از نگهداری کیف پول سرد و کنترل ریسک تا داشبوردها و گزارش‌ها.",
        f1: "موتور تطبیق و دفتر سفارش",
        f2: "کیف پول و نگهداری در انبار سرد",
        f3: "احراز هویت KYC/AML",
        f4: "معاملات اسپات، مارجین و فیوچرز",
        f5: "داشبورد ریسک، مدیریت و گزارش"
      },
      dex: {
        subtitle: "صرافی غیرمتمرکز با سواپ آن‌چین.",
        p1: "صرافی‌های غیرمتمرکز (DEX) می‌سازیم که کاربران از کیف پول خودشان معامله می‌کنند. مارکت‌میکر خودکار، استخر نقدینگی، استیکینگ و جریان سفارش آن‌چین برای امنیت و شفافیت مهندسی شده‌اند.",
        p2: "قراردادهای هوشمند حسابرسی و بهینه‌شده برای گس هستند تا هزینه کم و اعتماد بالا بماند.",
        f1: "مارکت‌میکر خودکار (AMM)",
        f2: "استخر نقدینگی و فارمینگ",
        f3: "معامله غیردوری با کیف پول شخصی",
        f4: "قراردادهای حسابرسی‌شده و بهینه",
        f5: "استیکینگ، بریج و آنالیتیکس"
      },
      p2pExchange: {
        subtitle: "پلتفرم همتا‌به‌همتا که خریدار و فروشنده را به هم وصل می‌کند.",
        p1: "صرافی P2P می‌سازیم که کاربران مستقیم با هم معامله می‌کنند. ویترین پیشنهادها، تطبیق قیمت، سیستم امتیازدهی و اسکرو امن، هر معامله را منصفانه حفظ می‌کنند.",
        p2: "روش‌های پرداخت و مناطق مختلف را پشتیبانی می‌کنیم، با فرایند رسیدگی به اختلاف که هر دو طرف را مطمئن نگه می‌دارد.",
        f1: "تطبیق خریدار و فروشنده",
        f2: "حفاظت امن اسکرو",
        f3: "سیستم اعتبار و امتیازدهی",
        f4: "روش‌های پرداخت و مناطق متعدد",
        f5: "فرایند رسیدگی به اختلاف"
      },
      otcExchange: {
        subtitle: "میز معاملات OTC برای معاملات بزرگ و خصوصی.",
        p1: "برای معاملات بزرگی که بازار را جابه‌جا می‌کنند، OTC راه‌حل است. میز معاملات خصوصی با قیمت‌گذاری مذاکره‌ای، نقدینگی بالا و تسویه مستقیم بین طرفین می‌سازیم.",
        p2: "مشتریان نهادی را با حساب اختصاصی، گزارش شفافیت و خدمات حرفه‌ای در هر مرحله پشتیبانی می‌کنیم.",
        f1: "اجرای معاملات بزرگ بدون لغزش قیمت",
        f2: "قیمت مذاکره‌ای و نقدینگی",
        f3: "تسویه مستقیم و گزینه‌های نگهداری",
        f4: "حساب‌های مشتریان نهادی",
        f5: "ابزارهای شفافیت و گزارش‌گیری"
      },
      cryptoPaymentGateway: {
        subtitle: "درگاه پرداخت برای پذیرش دارایی‌های دیجیتال.",
        p1: "به مشتریان اجازه دهید با کریپتو پرداخت کنند و همچنان وجوه موردنیازتان را دریافت کنید. درگاه پرداخت با تأیید لحظه‌ای، تسویه خودکار و تبدیل به ارز فیات می‌سازیم.",
        p2: "افزونه برای پلتفرم‌های بزرگ فروشگاهی، API منعطف برای پذیرندگان و داشبورد کامل در اختیارتان قرار می‌دهیم.",
        f1: "تأیید لحظه‌ای آن‌چین",
        f2: "تسویه خودکار و تبدیل فیات",
        f3: "افزونه‌های پلتفرم‌های فروشگاهی",
        f4: "API پذیرنده و وبهوک",
        f5: "داشبورد پذیرنده و گزارش‌ها"
      },
      smartContracts: {
        subtitle: "توسعه قرارداد هوشمند و توکن.",
        p1: "منطق آن‌چین پروژه را طراحی و منتشر می‌کنیم — از توکن‌های ERC/BEP و NFT تا DAO، استیکینگ و پروتکل‌های سفارشی DeFi. امنیت همیشه اولویت اول است.",
        p2: "هر قرارداد حسابرسی، یونیت‌تست و بهینه‌شده برای گس است، با مستندات واضحی که تیم شما با اطمینان نگهداری کند.",
        f1: "ایجاد توکن (ERC-20، BEP-20، NFT)",
        f2: "استیکینگ، DAO و ماژول‌های DeFi",
        f3: "قراردادهای حسابرسی‌شده و تست‌شده",
        f4: "بهینه‌سازی گس و اصول امنیتی",
        f5: "مستندات و پشتیبانی استقرار"
      },
      airdropPlatform: {
        subtitle: "پلتفرم ایردراپ و توزیع توکن.",
        p1: "با ایردراپی امن و خودکار به هزاران کیف پول برسید. پلتفرم توزیع با قوانین صلاحیت، تسک‌ها و کلایم می‌سازیم، در حالی که ضدباز ربات و هزینه گس را کنترل می‌کنیم.",
        p2: "آنالیتیکس دقیقاً عملکرد کمپین را نشان می‌دهد، از کیف پول‌های واجد شرایط تا توکن‌های کلایم‌شده.",
        f1: "توزیع خودکار توکن",
        f2: "قوانین صلاحیت و دروازه‌های تسک",
        f3: "حفاظت در برابر ربات و Sybil",
        f4: "صفحه کلایم و اتصال کیف پول",
        f5: "آنالیتیکس و گزارش کمپین"
      },
      exchangeApp: {
        subtitle: "اپلیکیشن صرافی با چارت و معامله.",
        p1: "صرافی خود را به موبایل ببرید. اپلیکیشن معاملاتی با چارت لحظه‌ای، ثبت سفارش، رهگیری پورتفویو و ورود امن بیومتریک می‌سازیم که کاربران در هر جا به آن اعتماد کنند.",
        p2: "احراز هویت دومرحله‌ای، هشدار قیمت و رابط کاربری ساده، معامله را برای همه ساده می‌کند.",
        f1: "چارت لحظه‌ای و داده بازار",
        f2: "ثبت و مدیریت سفارش",
        f3: "رهگیری پورتفویو و موجودی",
        f4: "ورود بیومتریک و تأیید دومرحله‌ای",
        f5: "هشدار قیمت و نوتیفیکیشن"
      },
      uiuxDesign: {
        subtitle: "طراحی محصول و رابط کاربری که کاربران دوستش دارند.",
        p1: "محصولات عالی با طراحی عالی شروع می‌شوند. طراحان ما کاربران را مطالعه می‌کنند، سفرشان را ترسیم می‌کنند و رابط‌هایی واضح، زیبا و آسان برای همه صفحه‌ها می‌سازند.",
        p2: "از وایرفریم و نمونه تعاملی تا سیستم طراحی کامل، مشخصات دقیقی به توسعه‌دهندگان می‌دهیم تا ایده شما بدون اصطکاک به واقعیت بپیوندد.",
        f1: "تحقیق کاربر و ترسیم سفر",
        f2: "وایرفریم و نمونه تعاملی",
        f3: "سیستم طراحی و UI کیت",
        f4: "طراحی موبایل و واکنش‌گرا",
        f5: "تست قابلیت استفاده و بهبود تکراری"
      },
      seoMarketing: {
        subtitle: "افزایش ترافیک ارگانیک و فروش.",
        p1: "دیده شدن مشتری می‌آورد. استراتژی‌های سئو و بازاریابی دیجیتال می‌سازیم که رتبه را بهتر، کمپین‌ها را مؤثر و ترافیک را به مشتری وفادار تبدیل می‌کنند.",
        p2: "از سئوی فنی و استراتژی محتوا تا تبلیغات کلیکی و آنالیتیکس، همه چیز سنجیده و مدام بهبود می‌یابد.",
        f1: "سئوی فنی و داخلی",
        f2: "استراتژی محتوا و لینک‌سازی",
        f3: "کمپین‌های تبلیغاتی",
        f4: "بهینه‌سازی نرخ تبدیل",
        f5: "آنالیتیکس، گزارش و رشد"
      },
      dashboardsAdmin: {
        subtitle: "پنل مدیریت برای اداره کسب‌وکار با داده.",
        p1: "با داده‌های شفاف تصمیم‌گیری سریع‌تر است. داشبورد و پنل مدیریت متناسب با فرایند شما طراحی و ساخته می‌شود — از نمای KPI تا گزارش‌های عمیق و ابزارهای عملیاتی.",
        p2: "دسترسی نقش‌محور، خروجی داده و یکپارچه‌سازی‌ها ابزارهای شما را به هم متصل می‌کنند تا تیم در یک جا کار کند.",
        f1: "داشبورد KPI و مصورسازی داده",
        f2: "مدیریت عملیات، کاربران و نقش‌ها",
        f3: "گزارش‌ها و خروجی داده",
        f4: "یکپارچه‌سازی با ابزارهای شما",
        f5: "کنترل دسترسی نقش‌محور"
      },
      maintenanceSupport: {
        subtitle: "هاستینگ و پشتیبانی که همه چیز را سرپا نگه می‌دارد.",
        p1: "محصول شما باید بعد از عرضه هم بهتر شود. هاستینگ، مانیتورینگ، به‌روزرسانی و نگهداری پیشگیرانه ارائه می‌کنیم تا وب‌سایت یا اپ شما سریع، امن و در دسترس بماند.",
        p2: "تیم پشتیبانی ما با SLAهای مشخص و گزارش‌دهی شفاف، باگ‌ها، افزوده‌ها و بهبودها را مدیریت می‌کند.",
        f1: "هاستینگ مطمئن و مانیتورینگ",
        f2: "اصلاحات امنیتی و به‌روزرسانی منظم",
        f3: "بهینه‌سازی و تنظیم عملکرد",
        f4: "رفع باگ و افزودن قابلیت",
        f5: "پشتیبانی با SLA و گزارش‌دهی"
      },
    },
    ar: {
    svc: {
      androidApp: {
        subtitle: "تطبيقات أندرويد أصلية مبنية بلغة Kotlin، من فكرة MVP إلى منتج متكامل.",
        p1: "يبني فريقنا تطبيقات أندرويد عالية الأداء باستخدام Kotlin وأنماط معمارية حديثة مثل MVVM وClean Architecture. نغطي دورة الحياة كاملة — من الفكرة وتصميم الواجهة والتطوير وحتى النشر في متجر Play والتطوير المستمر.",
        p2: "من النسخ الأولية حتى المنتجات الكبيرة مع وضع عدم الاتصال والإشعارات والمدفوعات والتحليلات، نبني تطبيقات يعود إليها المستخدمون دائمًا.",
        f1: "تطوير أصلي مع Kotlin وJetpack Compose",
        f2: "معمارية نظيفة ومراجعة دقيقة للكود",
        f3: "النشر في متجر Play وتحسين الظهور",
        f4: "إشعارات ومدفوعات وتحليلات",
        f5: "تحديثات مستمرة ودعم طويل الأمد"
      },
      iosApp: {
        subtitle: "تطبيقات iOS أصلية بتقنيتي Swift وSwiftUI، باحترافية معايير متجر Apple.",
        p1: "نصمم ونبني تطبيقات iOS للآيفون والآيباد باستخدام Swift وSwiftUI، متّبعين إرشادات الواجهة البشرية في Apple. من النموذج الأولي حتى مراجعة متجر التطبيقات، نعتني بأدق تفاصيل التجربة.",
        p2: "سواء كان تطبيقًا استهلاكيًا أو منصة خدمات أو أداة مؤسسية، نقدّم تطبيقات سلسة وواضحة وتجربة ممتعة تستحق التقييمات الخمس نجوم.",
        f1: "تطوير أصلي بـ Swift وSwiftUI",
        f2: "قيم تصميم Apple وتجربة مستخدم مصقولة",
        f3: "تقديم التطبيق لمتجر App Store واجتياز المراجعة",
        f4: "المشتريات داخل التطبيق وiCloud والإشعارات",
        f5: "ضبط الأداء وصيانة مستمرة"
      },
      webAppPwa: {
        subtitle: "تطبيقات ويب سريعة قابلة للتثبيت وتطبيقات PWA تعمل على أي جهاز وفي أي متصفح.",
        p1: "تجمع تطبيقات الويب التقدمية PWA بين انتشار الويب وشعور التطبيق الأصلي. ننشئ تطبيقات ويب قابلة للتثبيت وتعمل دون اتصال وسريعة جدًا باستخدام تقنيات حديثة مثل Next.js وReact.",
        p2: "قاعدة كود واحدة لكل الأجهزة — تكاليف أقل لمتاجر التطبيقات وتحديثات فورية وحاجز أقل ليبدأ المستخدمون باستخدام منتجك.",
        f1: "قابل للتثبيت ويعمل دون اتصال",
        f2: "معمارية حديثة بـ React وNext.js",
        f3: "إشعارات ومزامنة في الخلفية",
        f4: "تحميل سريع ومتوافق مع محركات البحث",
        f5: "قاعدة كود واحدة لكل المنصات"
      },
      ecommerceApp: {
        subtitle: "تطبيقات تسوق غنية بالوظائف — سلة، مدفوعات، طلبات وإشعارات فورية.",
        p1: "نبني متاجر موبايل أصلية تحقق المبيعات. كتالوجات المنتجات والبحث الذكي والدفع السلس وتتبع الطلبات وقائمة الأمنيات وعروض الإشعارات — كلها مصممة للأداء والاحتفاظ بالعملاء.",
        p2: "ندمج بوابات الدفع المحلية والدولية وبرامج الولاء وأتمتة التسويق لينمو متجرك مع كل إصدار.",
        f1: "كتالوج وبحث وفلترة ذكية للمنتجات",
        f2: "دفع آمن بلمسة واحدة",
        f3: "تتبع الطلبات وقائمة الأمنيات والتقييمات",
        f4: "بوابات دفع وبرامج ولاء",
        f5: "حملات إشعارات وتحليلات احتفاظ"
      },
      classifiedsApp: {
        subtitle: "تطبيقات إعلانات وقوائم مع محادثة وبحث وفلاتر ونشر آمن.",
        p1: "من إعلانات السيارات والعقارات إلى لوحات الوظائف وأسواق السلع المستعملة، نبني تطبيقات الإعلانات المُبوبة التي تُبقي المشترين والبائعين نشطين. الحسابات الموثقة والمحادثة داخل التطبيق والبحث حسب الموقع كلها مدمجة.",
        p2: "جاهز للإيرادات مع إعلانات مميزة وترقيات وعضويات ممتازة، مصمم للثقة والتفاعل العالي.",
        f1: "بحث وفلاتر ذكية حسب الموقع",
        f2: "محادثة داخل التطبيق وإدارة جهات الاتصال",
        f3: "حسابات موثقة ونشر آمن",
        f4: "إعلانات مميزة وترقيات وعضويات",
        f5: "لوحة إشراف وتحليلات"
      },
      bookReaderApp: {
        subtitle: "تطبيقات قراءة للكتب الإلكترونية والصوتية مع مكتبات متزامنة واشتراكات.",
        p1: "تطبيق القراءة العظيم يعتمد على التركيز. نصمم تجارب هادئة قائمة على الطباعة مع خطوط وسمات قابلة للضبط وتحميل دون اتصال ومزامنة مكتبتك بين الأجهزة.",
        p2: "ندعم الاشتراكات والاستعارة والهدايا وتكامل الدفع السلس لتحويل القراء إلى جمهور متكرر.",
        f1: "طباعة جميلة وسمات قراءة",
        f2: "تحميل دون اتصال ومزامنة المكتبة",
        f3: "تشغيل الكتب الصوتية والعلامات المرجعية",
        f4: "اشتراكات واستعارة وهدايا",
        f5: "تتبع التقدم عبر الأجهزة"
      },
      tourismApp: {
        subtitle: "تطبيقات السياحة والسفر مع جولات ومسارات وخرائط وتجارب محلية.",
        p1: "نساعد شركات السياحة على الوصول للمسافرين بتطبيقات جميلة للجولات والفنادق والرحلات والتجارب. الخرائط التفاعلية والأدلة دون اتصال والمحتوى متعدد اللغات تجعل كل رحلة أسهل.",
        p2: "نضيف التقييمات وقوائم الأمنيات والحجز الآمن والدفع لتحويل الإلهام إلى رحلات مؤكدة.",
        f1: "جولات ومسارات وتجارب محلية",
        f2: "خرائط تفاعلية وأدلة دون اتصال",
        f3: "محتوى متعدد اللغات للمسافرين",
        f4: "حجز ودفع آمن",
        f5: "تقييمات وقوائم أمنيات وعروض مخصصة"
      },
      taxiApp: {
        subtitle: "تطبيقات طلب سيارات أجرة مع تتبع مباشر وإرسال ذكي ومدفوعات داخل التطبيق.",
        p1: "نبني منصات كاملة لسيارات الأجرة والتوصيل للمدن وأساطيل المركبات. تطبيقات الراكب والسائق وتتبع GPS المباشر وتقدير الأجرة والإرسال الذكي تعمل معًا لتجربة سلسة.",
        p2: "نضيف تسعير فترات الذروة وتقييمات السائقين وسجل الرحلات ومدفوعات متعددة العملات لإدارة فعالة.",
        f1: "تطبيقات الراكب والسائق",
        f2: "تتبع GPS مباشر ووقت الوصول المتوقع",
        f3: "إرسال ذكي وتلقائي للسائقين",
        f4: "تقدير الأجرة وتسعير الذروة",
        f5: "تقييمات وسجل ومدفوعات متعددة العملات"
      },
      flightHotelApp: {
        subtitle: "تطبيقات حجز مع توفر وفترات وأسعار وتأكيد فوري.",
        p1: "نبني منصات حجز للرحلات الجوية والفنادق وباقات السفر. البحث عبر مقدمي الخدمات ومقارنة الأسعار لحظيًا وتأكيد الحجوزات فورًا في تدفق آمن وسلس.",
        p2: "ندمج واجهات برمجة مقدمي الخدمات وندير السعة والتوفر لكل منشأة ونبقي المستخدمين على اطلاع بالبريد وإشعارات التطبيق.",
        f1: "بحث الرحلات والفنادق والباقات",
        f2: "أسعار وتوفر لحظي",
        f3: "تأكيد فوري وتذاكر إلكترونية",
        f4: "تكامل مع واجهات برمجة المزودين",
        f5: "بريد الحجز وإشعارات التطبيق"
      },
      corporateWebsite: {
        subtitle: "مواقع شركات مصقولة تقدّم شركتك بثقة وتحوّل الزوار إلى عملاء.",
        p1: "موقعك هو واجهة نشاطك الرقمية. ننشئ مواقع شركات موجهة للأداء برسالة واضحة وهوية علامة قوية ومسارات تحويل سلسة — من صفحات الهبوط إلى تجارب متعددة الصفحات كاملة.",
        p2: "مبنية بتقنيات حديثة ومحسّنة للسرعة وتحسين محركات البحث وسهولة تحديث المحتوى ليبقى الفريق مسيطرًا دائمًا.",
        f1: "تصميم ورسالة يركزان على التحويل",
        f2: "هوية العلامة والتصميم البصري",
        f3: "جاهز لمحركات البحث وسريع وواضح",
        f4: "نظام إدارة محتوى سهل التحديث",
        f5: "تحليلات واختبار A/B وتحسين مستمر"
      },
      classifiedsWebsite: {
        subtitle: "مواقع إعلانات مبوبة كشبكات القوائم الكبيرة — بحث ونشر ومحادثة.",
        p1: "أطلق سوق إعلانات للسيارات أو العقارات أو الوظائف أو الإعلانات العامة. نبني منصات قابلة للبحث والتصفية مع حسابات مستخدمين ونشر آمن ومراسلة مدمجة.",
        p2: "حقق إيرادات من الإعلانات المميزة والمواضع الإعلانية والحسابات الممتازة مع بقاء الرقابة وأدوات الثقة في الصميم.",
        f1: "بحث قوي وفلاتر للفئات",
        f2: "حسابات مستخدمين ونشر آمن",
        f3: "مراسلة وقوائم مفضلة",
        f4: "إعلانات مميزة ومواضع إعلانية",
        f5: "إشراف وتبليغ وأدوات ثقة"
      },
      marketplaceWebsite: {
        subtitle: "أسواق متعددة البائعين مع متاجر وسلة ودفع موحد.",
        p1: "نبني منصات الأسواق التي تتيح للعديد من البائعين عرض منتجاتهم تحت علامة واحدة موثوقة. لوحات البائعين ومعالجة العمولات وتوجيه الطلبات ودفع متعدد المتاجر كلها مدمجة.",
        p2: "نموّ مع طلبات البائعين والتقييمات والنزاعات وأتمتة المدفوعات ليبقى سوقك عادلًا وسريعًا.",
        f1: "متاجر البائعين ولوحات التحكم",
        f2: "العمولات وأتمتة المدفوعات",
        f3: "دفع موحد للسوق",
        f4: "تقييمات ونزاعات وإدارة",
        f5: "إدارة الفئات وكتالوج قابل للبحث"
      },
      onlineStore: {
        subtitle: "متاجر إلكترونية سريعة مع كتالوجات ومدفوعات وشحن.",
        p1: "حوّل منتجاتك إلى متجر إلكتروني يبيع على مدار الساعة. نبني متاجر سريعة وموثوقة مع كتالوجات ذكية ودفع سلس ومدفوعات آمنة وتكامل للشحن.",
        p2: "تبقى مسيطرًا عبر لوحة إدارة للمنتجات والطلبات والخصومات والعملاء وأدوات التسويق.",
        f1: "كتالوجات ذكية وبحث عن المنتجات",
        f2: "دفع سلس وآمن",
        f3: "بوابات دفع محلية ودولية",
        f4: "إدارة الشحن والطلبات",
        f5: "لوحة إدارة وخصومات وتسويق"
      },
      restaurantWebsite: {
        subtitle: "مواقع مطاعم مع قوائم طعام وحجز طاولات وطلب إلكتروني.",
        p1: "قدّم مطعمك عبر الإنترنت بموقع شهيّ. عرض القائمة وحجز الطاولات والطلب الإلكتروني وتكامل المطبخ تعمل معًا لملء كل مقعد.",
        p2: "أسحر الزوار بمعارض الصور وقصص الشيف والدليل الاجتماعي، وأعد الأوفياء بعروض وبرامج ولاء.",
        f1: "عرض القائمة ومعارض الأطباق",
        f2: "حجز طاولات عبر الإنترنت",
        f3: "طلب إلكتروني ومدفوعات",
        f4: "الموقع وساعات العمل وخرائط Google",
        f5: "عروض وولاء وأدوات تقييم"
      },
      newsWebsite: {
        subtitle: "مواقع أخبار مع سير عمل تحريري وتوصيل سريع.",
        p1: "نبني منصات أخبار ووسائط حديثة بسير عمل تحريري بديهي وتوصيل سريع جدًا للمقالات وتصاميم جذابة للحاسوب واللوحي والجوال.",
        p2: "حقق الإيرادات من الاشتراكات والإعلانات والرعاية مع تمكين فريقك بالتحليلات وجدولة المحتوى.",
        f1: "سير عمل تحريري وأدوات نشر",
        f2: "مقالات سريعة ومحسّنة لمحركات البحث",
        f3: "تصنيفات ووسوم وبحث",
        f4: "اشتراكات وإعلانات ورعاية",
        f5: "تحليلات وجدولة محتوى"
      },
      medicalWebsite: {
        subtitle: "مواقع العيادات مع حجز إلكتروني وبوابات للمرضى.",
        p1: "نصمم مواقع موثوقة للعيادات والأطباء ومراكز الصحة. الحجز الإلكتروني ومعلومات المرضى واستعراض الخدمات والممارسات القائمة على الخصوصية تبني الثقة من أول زيارة.",
        p2: "أبلغ وطمئن عبر التعريف بالفريق والمقالات والأسئلة الشائعة، بينما تحافظ النماذج المتوافقة والمعالجة الآمنة للبيانات على ثقة المرضى.",
        f1: "حجز مواعيد إلكتروني",
        f2: "استعراض الخدمات والفريق والمنشآت",
        f3: "مقالات توعوية وأسئلة شائعة",
        f4: "معالجة بيانات آمنة تحترم الخصوصية",
        f5: "تصميم سريع الاستجابة وواضح"
      },
      tourismWebsite: {
        subtitle: "مواقع السياحة والسفر مع جولات وفنادق وحجوزات.",
        p1: "ألهم المسافرين وحوّل النقرات إلى حجوزات. نبني مواقع سياحية جميلة بمحتوى جذاب للوجهات وكتالوجات الجولات ومسارات حجز سلسة.",
        p2: "أبرز الباقات والعروض الخاصة، ودع الزوار يخططون رحلاتهم بمسارات ومعارض وتقييمات تبني الثقة.",
        f1: "عرض الوجهات والجولات",
        f2: "مسارات حجز الجولات والفنادق",
        f3: "مسارات رحلات ومعارض وخرائط",
        f4: "محتوى متعدد اللغات",
        f5: "تقييمات وعروض وإشارات ثقة"
      },
      bookReaderWebsite: {
        subtitle: "مواقع قراءة لبيع وبث الكتب الإلكترونية والصوتية.",
        p1: "أطلق منصة قراءة لدار نشرك أو مكتبتك. كتالوج جميل وشراء آمن للكتب الإلكترونية واشتراكات وقارئ داخل المتصفح تجعل كل كتاب سهل المتعة.",
        p2: "أضف بث الكتب الصوتية والتقييمات وقوائم الأمنيات وحسابات القرّاء لبناء مجتمع وفيّ حول كتبك.",
        f1: "متجر كتب إلكترونية وشراء آمن",
        f2: "تجربة قراءة داخل المتصفح",
        f3: "بث الكتب الصوتية ومشغل",
        f4: "اشتراكات وعضويات",
        f5: "تقييمات وقوائم أمنيات وحسابات قرّاء"
      },
      wordpress: {
        subtitle: "مواقع ووردبريس معدّلة للسرعة وتحسين محركات البحث وسهولة التحرير.",
        p1: "يمنح ووردبريس فريقك سيطرة كاملة على المحتوى. نبني قوالب مخصصة وإضافات مطلوبة وتهيئة محسّنة — سريعة وآمنة وسهلة التحديث يوميًا للمحررين.",
        p2: "من المدونات إلى مواقع الشركات الكاملة والمتاجر الإلكترونية، نكيّف ووردبريس مع عملك بتصميم احترافي وصيانة مستمرة.",
        f1: "قوالب مخصصة وإعداد منشئ الصفحات",
        f2: "سرعة وCore Web Vitals وSEO",
        f3: "أمان ونسخ احتياطي وتحديثات",
        f4: "تحرير سهل للفرق غير التقنية",
        f5: "دعم مستمر وخطط صيانة"
      },
      subscriptionStore: {
        subtitle: "متاجر اشتراك للعضوية والإيرادات المتكررة.",
        p1: "حوّل المشترين لمرة واحدة إلى مصدر إيرادات يمكن التنبؤ به. نبني تجارة إلكترونية بالاشتراك مع خطط ومدفوعات متكررة وبوابات عضو وتجديد تلقائي.",
        p2: "نوفر دعمًا للصناديق والعضويات والمنتجات الرقمية والإلغاءات مع مقاييس تُظهر بدقة نمو أعمالك.",
        f1: "خطط ومستويات ودفع متكرر",
        f2: "بوابة العضو وإدارة الحساب",
        f3: "أتمتة إعادة محاولة الدفع",
        f4: "صناديق اشتراك ومنتجات رقمية",
        f5: "تحليلات تراجع العملاء وتقارير النمو"
      },
      shopifyStore: {
        subtitle: "متاجر Shopify مُعدّلة ومخصصة لعلامتك التجارية.",
        p1: "انطلق بسرعة ببنية Shopify المجرّبة، مصممة لعلامتك. نشكّل القوالب والتطبيقات والمدفوعات لإنشاء متجر يبدو مخصصًا ويعمل بشكل ممتاز.",
        p2: "حسّن التحويلات ونمّو بالتطبيقات للتسويق والشحن والتحليلات — بإدارة كاملة من فريقنا.",
        f1: "تخصيص القوالب وتصميم العلامة",
        f2: "إعداد التطبيقات والإضافات",
        f3: "إعداد الدفع والشحن",
        f4: "تحسين التحويل والسرعة",
        f5: "إدارة متجر مستمرة"
      },
      cryptoExchange: {
        subtitle: "بورصات مركزية مع دفتر أوامر والتحقق من الهوية KYC.",
        p1: "نبني بورصات مركزية آمنة (CEX) بمحركات مطابقة ودفاتر أوامر ومحافظ وتدفقات KYC/AML كاملة. وحدات التداول الفوري والهامش والعقود الآجلة تتوسع مع قاعدة مستخدميك.",
        p2: "ركّز على سوقك ودَعنا نتولى الهندسة — من حفظ المحافظ الباردة وضوابط المخاطر إلى لوحات التحكم والتقارير.",
        f1: "محرك المطابقة ودفتر الأوامر",
        f2: "محافظ وحفظ في التخزين البارد",
        f3: "التحقق من الهوية KYC/AML",
        f4: "تداول فوري وهامشى وعقود آجلة",
        f5: "لوحات مخاطر وإدارة وتقارير"
      },
      dex: {
        subtitle: "بورصات لا مركزية مع مقايضات على السلسلة.",
        p1: "نبني بورصات لا مركزية (DEX) يتداول منها المستخدمون عبر محافظهم الخاصة. صانعو السوق الآليون ومجمعات السيولة والتخزين وتدفقات الأوامر على السلسلة مُهيأة للأمان والشفافية.",
        p2: "يتم مراجعة العقود الذكية وتحسينها لكفاءة الغاز للحفاظ على رسوم منخفضة وثقة عالية.",
        f1: "صانع السوق الآلي AMM",
        f2: "مجمعات سيولة وزراعة",
        f3: "تداول مباشر من المحفظة",
        f4: "عقود مدققة ومحسّنة للغاز",
        f5: "تخزين وجسور وتحليلات"
      },
      p2pExchange: {
        subtitle: "منصات نظير-لنظير تجمع المشترين والبائعين.",
        p1: "نبني بورصات P2P يتداول فيها المستخدمون مباشرة مع بعضهم. جدران العروض ومطابقة الأسعار وأنظمة التقييم والضمان الآمن تحافظ على عدالة كل صفقة.",
        p2: "ندعم وسائل دفع ومناطق متعددة، مع آلية لحل النزاعات تمنح الطرفين الثقة.",
        f1: "مطابقة المشترين والبائعين",
        f2: "حماية الضمان الآمن Escrow",
        f3: "نظام السمعة والتقييم",
        f4: "وسائل دفع ومناطق متعددة",
        f5: "سير عمل حل النزاعات"
      },
      otcExchange: {
        subtitle: "مكاتب OTC لصفقات كبيرة وخاصة.",
        p1: "للصفقات الكبيرة التي تحرّك الأسواق، OTC هو الحل. نبني مكاتب تداول خارج البورصة خاصة بتسعير تفاوضي وسيولة عالية وتسوية مباشرة بين الأطراف.",
        p2: "نخدم العملاء المؤسسيين بحسابات مخصصة وتقارير شفافية وخدمة احترافية في كل خطوة.",
        f1: "تنفيذ صفقات كبيرة دون انزلاق",
        f2: "تسعير تفاوضي وسيولة",
        f3: "تسوية مباشرة وخيارات حفظ",
        f4: "حسابات عملاء مؤسسيين",
        f5: "أدوات شفافية وتقارير"
      },
      cryptoPaymentGateway: {
        subtitle: "بوابات دفع لقبول الأصول الرقمية.",
        p1: "أتح للعملاء الدفع بالعملات الرقمية مع استمرار حصولك على الأموال التي تحتاجها. نبني بوابات دفع بتأكيدات فورية وتسوية تلقائية مربوطة بالدولار وتحويل للعملات الورقية.",
        p2: "إضافات لمنصات التجارة الإلكترونية الكبرى وواجهات مرنة للتجار ولوحة تحكم تمنحك السيطرة الكاملة.",
        f1: "تأكيدات فورية على السلسلة",
        f2: "تسوية تلقائية وتحويل للعملة الورقية",
        f3: "إضافات منصات التجارة الإلكترونية",
        f4: "واجهات تاجر وWebhooks",
        f5: "لوحة تحكم التاجر والتقارير"
      },
      smartContracts: {
        subtitle: "تطوير العقود الذكية والرموز.",
        p1: "نصمم وننشر منطق السلسلة لمشروعك — من رموز ERC/BEP وNFT إلى DAO والتخزين وبروتوكولات DeFi مخصصة. الأمان دائمًا أولًا.",
        p2: "كل عقد مدقق ومختبَر ومحسّن للغاز، مع وثائق واضحة يمكن لفريقك صيانتها بثقة.",
        f1: "إنشاء الرموز (ERC-20 وBEP-20 وNFT)",
        f2: "تخزين وDAO ووحدات DeFi",
        f3: "عقود مدققة ومختبَرة",
        f4: "تحسين الغاز وأفضل ممارسات الأمان",
        f5: "توثيق ودعم النشر"
      },
      airdropPlatform: {
        subtitle: "منصات توزيع الرموز Airdrop.",
        p1: "وصل إلى آلاف المحافظ عبر توزيع آمن ومؤتمت. نبني منصات توزيع بقواعد الأهلية والمهام والمطالبات مع حماية من البوتات وضبط تكاليف الغاز.",
        p2: "تبيّن التحليلات بدقة أداء حملتك، من المحافظ المؤهلة إلى الرموز المطالب بها.",
        f1: "توزيع رموز مؤتمت",
        f2: "قواعد أهلية وبوابات مهام",
        f3: "حماية من البوتات وهجمات Sybil",
        f4: "صفحات المطالبة وتكامل المحفظة",
        f5: "تحليلات الحملات وتقارير"
      },
      exchangeApp: {
        subtitle: "تطبيقات البورصات مع رسوم بيانية وتداول.",
        p1: "انقل بورصتك إلى الجوال. نبني تطبيقات تداول برسوم لحظية ووضع أوامر وتتبع للمحافظ ودخول آمن بالقياسات الحيوية يثق به المستخدمون في أي مكان.",
        p2: "مصادقة متعددة العوامل وتنبيهات أسعار وواجهة نظيفة تجعل التداول سهلًا للجميع.",
        f1: "رسوم لحظية وبيانات السوق",
        f2: "وضع الأوامر وإدارتها",
        f3: "تتبع المحفظة والرصيد",
        f4: "دخول حيوي و2FA",
        f5: "تنبيهات أسعار وإشعارات"
      },
      uiuxDesign: {
        subtitle: "تصميم المنتجات والواجهات الذي يعشقه المستخدمون.",
        p1: "تبدأ المنتجات العظيمة بالتصميم العظيم. يدرس مصممونا المستخدمين ويرسمون رحلاتهم ويبتكرون واجهات واضحة وجميلة وسهلة الاستخدام على كل شاشة.",
        p2: "من الهياكل والنماذج التفاعلية إلى أنظمة التصميم الكاملة، نسلم المطورين مواصفات دقيقة تُحقق فكرتك دون احتكاك.",
        f1: "بحث المستخدمين ورسم الرحلات",
        f2: "هياكل ونماذج تفاعلية",
        f3: "أنظمة تصميم ومجموعات واجهات",
        f4: "تصميم متجاوب للجوال",
        f5: "اختبار قابلية الاستخدام والتكرار"
      },
      seoMarketing: {
        subtitle: "زيادة الزيارات العضوية والمبيعات.",
        p1: "الظهور يجلب العملاء. نبني استراتيجيات SEO وتسويق رقمي تحسّن الترتيب وتطلق حملات فعّالة وتحوّل الزيارات إلى عملاء مخلصين.",
        p2: "من الـSEO التقني واستراتيجية المحتوى إلى الإعلانات المدفوعة والتحليلات، كل شيء يُقاس ويُحسّن باستمرار.",
        f1: "تحسين محركات البحث الفني والداخلي",
        f2: "استراتيجية محتوى وبناء روابط",
        f3: "حملات إعلانية مدفوعة",
        f4: "تحسين معدل التحويل",
        f5: "تحليلات وتقارير ونمو"
      },
      dashboardsAdmin: {
        subtitle: "لوحات إدارة لتشغيل أعمالك بالبيانات.",
        p1: "القرارات أسرع مع البيانات الواضحة. نصمم ونبني لوحات التحكم وإدارة مخصصة لسير عملك — من نظرة عامة على مؤشرات الأداء إلى تقارير عميقة وأدوات تشغيلية.",
        p2: "الوصول حسب الأدوار وتصدير البيانات والتكاملات تربط أدواتك ليعمل فريقك في مكان واحد.",
        f1: "لوحات مؤشرات وتصوير البيانات",
        f2: "إدارة العمليات والمستخدمين والأدوار",
        f3: "تقارير وتصدير البيانات",
        f4: "تكاملات مع أدواتك",
        f5: "التحكم في الوصول حسب الدور"
      },
      maintenanceSupport: {
        subtitle: "استضافة ودعم يحافظان على استمرار كل شيء.",
        p1: "يجب أن يتحسن منتجك بعد الإطلاق. نوفر الاستضافة والمراقبة والتحديثات والصيانة الاستباقية ليبقى موقعك أو تطبيقك سريعًا وآمنًا ومتاحًا.",
        p2: "يتولى فريق الدعم لدينا إصلاح الأخطاء وإضافة الميزات والتحسينات باتفاقيات مستوى خدمة واضحة وتقارير شفافة.",
        f1: "استضافة موثوقة ومراقبة",
        f2: "تصحيحات أمنية وتحديثات منتظمة",
        f3: "ضبط وتحسين الأداء",
        f4: "إصلاح الأخطاء وإضافة الميزات",
        f5: "دعم باتفاقيات مستوى خدمة وتقارير"
      },
    },  };

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

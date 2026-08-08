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
        chooseLanguage: "Choose language",
        active: "Active",
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
        post4: {
          title: "The basics of market analysis for small businesses",
          date: "22 November 2025",
          author: "Amatis Studio",
        },
        post5: {
          title: "Branding 101: building a brand people remember",
          date: "15 November 2025",
          author: "Isabela Moreira",
        },
        post6: {
          title: "AI tools every agency should be using",
          date: "8 November 2025",
          author: "Lucas Silva",
        },
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
        emailValue: "hello@amatis.com",
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
        chooseLanguage: "Sprache w\u00e4hlen",
        active: "Aktiv",
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
        post4: {
          title: "Grundlagen der Marktanalyse f\u00fcr kleine Unternehmen",
          date: "22. November 2025",
          author: "Amatis Studio",
        },
        post5: {
          title: "Branding 101: eine Marke, die man sich merkt",
          date: "15. November 2025",
          author: "Isabela Moreira",
        },
        post6: {
          title: "KI-Tools, die jede Agentur nutzen sollte",
          date: "8. November 2025",
          author: "Lucas Silva",
        },
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
        emailValue: "hello@amatis.com",
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
        chooseLanguage: "\u0627\u0646\u062a\u062e\u0627\u0628 \u0632\u0628\u0627\u0646",
        active: "\u0641\u0639\u0627\u0644",
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
        post4: {
          title: "\u0645\u0628\u0627\u0646\u06cc \u062a\u062d\u0644\u06cc\u0644 \u0628\u0627\u0632\u0627\u0631 \u0628\u0631\u0627\u06cc \u06a9\u0633\u0628\u200c\u0648\u06a9\u0627\u0631\u0647\u0627\u06cc \u06a9\u0648\u0686\u06a9",
          date: "22 \u0646\u0648\u0627\u0645\u0628\u0631 2025",
          author: "\u0627\u0633\u062a\u0648\u062f\u06cc\u0648 \u0622\u0645\u0627\u062a\u06cc\u0633",
        },
        post5: {
          title: "\u0628\u0631\u0646\u062f\u06cc\u0646\u06af 101: \u0633\u0627\u062e\u062a \u0628\u0631\u0646\u062f\u06cc \u06a9\u0647 \u0645\u06cc\u0645\u0627\u0646\u062f",
          date: "15 \u0646\u0648\u0627\u0645\u0628\u0631 2025",
          author: "\u0627\u06cc\u0632\u0627\u0628\u0644\u0627 \u0645\u0648\u0631\u06cc\u0631\u0627",
        },
        post6: {
          title: "\u0627\u0628\u0632\u0627\u0631\u0647\u0627\u06cc \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06cc \u06a9\u0647 \u0647\u0631 \u0622\u0698\u0627\u0646\u0633\u06cc \u0628\u0627\u06cc\u062f \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u06a9\u0646\u062f",
          date: "8 \u0646\u0648\u0627\u0645\u0628\u0631 2025",
          author: "\u0644\u0648\u06a9\u0627\u0633 \u0633\u06cc\u0644\u0648\u0627",
        },
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
        emailValue: "hello@amatis.com",
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
        chooseLanguage: "\u0627\u062e\u062a\u0631 \u0627\u0644\u0644\u063a\u0629",
        active: "\u0646\u0634\u0637",
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
        post4: {
          title: "\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u0633\u0648\u0642 \u0644\u0644\u0634\u0631\u0643\u0627\u062a \u0627\u0644\u0635\u063a\u064a\u0631\u0629",
          date: "22 \u0646\u0648\u0641\u0645\u0628\u0631 2025",
          author: "\u0627\u0633\u062a\u0648\u062f\u064a\u0648 \u0623\u0645\u0627\u062a\u064a\u0633",
        },
        post5: {
          title: "\u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u062a\u062c\u0627\u0631\u064a\u0629 101: \u0628\u0646\u0627\u0621 \u0639\u0644\u0627\u0645\u0629 \u064a\u062a\u0630\u0643\u0631\u0647\u0627 \u0627\u0644\u0646\u0627\u0633",
          date: "15 \u0646\u0648\u0641\u0645\u0628\u0631 2025",
          author: "\u0625\u064a\u0632\u0627\u0628\u064a\u0644\u0627 \u0645\u0648\u0631\u064a\u0631\u0627",
        },
        post6: {
          title: "\u0623\u062f\u0648\u0627\u062a \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0627\u0644\u062a\u064a \u064a\u062c\u0628 \u0623\u0646 \u062a\u0633\u062a\u062e\u062f\u0645\u0647\u0627 \u0643\u0644 \u0648\u0643\u0627\u0644\u0629",
          date: "8 \u0646\u0648\u0641\u0645\u0628\u0631 2025",
          author: "\u0644\u0648\u0643\u0627\u0633 \u0633\u064a\u0644\u0641\u0627",
        },
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
        emailValue: "hello@amatis.com",
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

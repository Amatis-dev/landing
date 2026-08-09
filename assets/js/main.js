/* ============================================================
   Amatis — main behavior
   Theme, language switcher, mobile menu, marquee, reveal,
   showcase filter, counters, back-to-top, forms
   ============================================================ */
(function () {
  "use strict";

  var i18n = window.AMATIS_I18N;

  /* ---------------- Theme ---------------- */
  var THEME_KEY = "amatis-theme";
  var DEFAULT_THEME = "dark";

  function currentTheme() {
    var t = null;
    try {
      t = window.localStorage.getItem(THEME_KEY);
    } catch (e) {}
    return t === "light" || t === "dark" ? t : DEFAULT_THEME;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      var sun = btn.querySelector(".icon-sun");
      var moon = btn.querySelector(".icon-moon");
      if (sun) sun.style.display = theme === "dark" ? "none" : "";
      if (moon) moon.style.display = theme === "dark" ? "" : "none";
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    });
  }

  function toggleTheme() {
    var next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch (e) {}
    applyTheme(next);
  }

  /* ---------------- Header ---------------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
    var btt = document.querySelector(".back-to-top");
    if (btt) btt.classList.toggle("show", window.scrollY > 520);
  }

  /* ---------------- Language switcher ---------------- */
  var langSwitcher = document.querySelector(".lang-switcher");
  if (langSwitcher) {
    var langTrigger = langSwitcher.querySelector(".lang-trigger");
    if (langTrigger) {
      langTrigger.addEventListener("click", function (e) {
        e.stopPropagation();
        langSwitcher.classList.toggle("open");
      });
    }
    langSwitcher.querySelectorAll("[data-lang-option]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        i18n.switchTo(btn.getAttribute("data-lang-option"));
        langSwitcher.classList.remove("open");
      });
    });
    document.addEventListener("click", function (e) {
      if (!langSwitcher.contains(e.target)) {
        langSwitcher.classList.remove("open");
      }
    });
  }
  /* ---------------- Nav dropdown ---------------- */
  document.querySelectorAll(".nav-dropdown").forEach(function (dd) {
    var trigger = dd.querySelector(".nav-pill");
    if (trigger) {
      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        dd.classList.toggle("open");
      });
    }
    document.addEventListener("click", function (e) {
      if (!dd.contains(e.target)) dd.classList.remove("open");
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (langSwitcher) langSwitcher.classList.remove("open");
      document.querySelectorAll(".nav-dropdown.open").forEach(function (dd) {
        dd.classList.remove("open");
      });
      closeMobileMenu();
    }
  });

  /* ---------------- Mobile menu ---------------- */
  var hamburger = document.querySelector(".hamburger");
  var mobileMenu = document.querySelector(".mobile-menu");

  function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove("open");
    if (hamburger) hamburger.classList.remove("open");
    document.body.classList.remove("menu-open");
  }
  function openMobileMenu() {
    if (mobileMenu) mobileMenu.classList.add("open");
    if (hamburger) hamburger.classList.add("open");
    document.body.classList.add("menu-open");
  }

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      if (mobileMenu && mobileMenu.classList.contains("open")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll(".mm-acc").forEach(function (acc) {
      acc.addEventListener("click", function () {
        acc.classList.toggle("open");
        var sub = acc.parentElement.querySelector(".mm-sub");
        if (sub) sub.classList.toggle("open");
      });
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMobileMenu);
    });
  }

  /* ---------------- Marquee ---------------- */
  function renderMarquee(el) {
    var key = el.getAttribute("data-marquee");
    var text = i18n.get(i18n.current(), key);
    if (!text) return;
    var items = text
      .split("\u2022")
      .map(function (s) {
        return s.replace(/\s+/g, " ").trim();
      })
      .filter(Boolean);

    var html = "";
    for (var pass = 0; pass < 2; pass++) {
      items.forEach(function (item) {
        html +=
          '<span class="marquee-item">' + item + ' <span class="sep">\u2022</span></span>';
      });
    }
    el.innerHTML = html;
  }

  function renderMarquees() {
    document.querySelectorAll(".marquee-track").forEach(renderMarquee);
  }

  document.addEventListener("i18n:applied", renderMarquees);
  renderMarquees();

  /* ---------------- Pricing plans ---------------- */
  function renderPricingGrid(grid) {
    var cat = grid.getAttribute("data-pricing-grid");
    var section = i18n.get(i18n.current(), "pricing." + cat);
    if (!section || !Array.isArray(section.plans)) return;
    var fromLabel = i18n.get(i18n.current(), "pricing.from") || "from";
    var unitLabel = i18n.get(i18n.current(), "pricing.unit") || "";
    var cta = i18n.get(i18n.current(), "pricing.cta") || "";
    var html = "";
    section.plans.forEach(function (plan, idx) {
      var features = (plan.features || [])
        .map(function (f) {
          return "<li>" + f + "</li>";
        })
        .join("");
      html +=
        '<article class="plan-card card-hover reveal is-visible' + (idx === 1 ? " plan-featured" : "") + '">' +
        (plan.tag ? '<span class="plan-tag">' + plan.tag + "</span>" : "") +
        '<h3 class="plan-name">' + plan.name + "</h3>" +
        '<ul class="plan-features">' + features + "</ul>" +
        '<div class="plan-price">' +
        '<span class="plan-from">' + fromLabel + "</span>" +
        '<div class="plan-amount"><span class="plan-value">' + plan.price + "</span><span class=\"plan-unit\">" + unitLabel + "</span></div>" +
        '<span class="plan-old">' + plan.old + " " + unitLabel + "</span>" +
        "</div>" +
        '<a class="btn-primary plan-cta" href="connect-with-us.html">' + cta + "</a>" +
        "</article>";
    });
    grid.innerHTML = html;
  }

  function renderPricingGrids() {
    document.querySelectorAll("[data-pricing-grid]").forEach(renderPricingGrid);
  }

  document.addEventListener("i18n:applied", renderPricingGrids);
  renderPricingGrids();

  /* ---------------- Reveal on scroll ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------------- Showcase filter ---------------- */
  var filterBar = document.querySelector(".showcase-filter");
  if (filterBar) {
    filterBar.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBar
          .querySelectorAll(".filter-btn")
          .forEach(function (b) {
            b.classList.remove("active");
          });
        btn.classList.add("active");
        var f = btn.getAttribute("data-filter");
        document.querySelectorAll(".showcase-item").forEach(function (item) {
          var show = f === "all" || item.getAttribute("data-category") === f;
          item.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------------- Counters ---------------- */
  var counters = document.querySelectorAll(".counter-card [data-count]");
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1200;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && counters.length) {
    var countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (el) {
      countObserver.observe(el);
    });
  }

  /* ---------------- Forms ---------------- */
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = form.querySelector(".form-message");
      if (msg) msg.classList.add("show");
      form.reset();
    });
  });

  /* ---------------- Back to top ---------------- */
  var btt = document.querySelector(".back-to-top");
  if (btt) {
    btt.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------- Init ---------------- */
  function setActiveNav() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    var map = {
      "index.html": "home",
      "showcase.html": "showcase",
      "what-we-offer.html": "what-we-offer",
      "web-design.html": "what-we-offer",
      "wordpress.html": "what-we-offer",
      "blogs.html": "blogs",
      "who-are-we.html": "who-are-we",
      "connect-with-us.html": "connect",
    };
    var key = map[path];
    if (!key) return;
    document.querySelectorAll("[data-nav-key]").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-nav-key") === key);
    });
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", toggleTheme);
  });
  document.querySelectorAll("[data-footer-lang]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      i18n.switchTo(a.getAttribute("data-footer-lang"));
    });
  });

  applyTheme(currentTheme());
  i18n.apply(i18n.current());
  setActiveNav();
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

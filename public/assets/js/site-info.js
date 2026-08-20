/* ============================================================
   Amatis — DB-driven site content.
   Fetches editable settings (/api/public/site-info) and fills
   elements marked with [data-site-field]. Re-applies whenever
   the language changes (i18n:applied). Falls back to the static
   HTML / i18n defaults when the API is unreachable.
   ============================================================ */
(function () {
  "use strict";

  var cache = null;
  var loading = null;

  function getI18n() {
    return window.AMATIS_I18N || null;
  }

  function currentLocale() {
    var i = getI18n();
    return i && i.current ? i.current() : "fa";
  }

  function load() {
    if (cache) return Promise.resolve(cache);
    if (loading) return loading;
    loading = fetch("/api/public/site-info", { cache: "no-store" })
      .then(function (r) {
        return r.json();
      })
      .then(function (json) {
        cache =
          json && json.ok && json.data && json.data.settings
            ? json.data.settings
            : {};
        loading = null;
        return cache;
      })
      .catch(function () {
        cache = {};
        loading = null;
        return cache;
      });
    return loading;
  }

  function applyFields(locale) {
    var s = cache || {};
    document.querySelectorAll("[data-site-field]").forEach(function (el) {
      var field = el.getAttribute("data-site-field");
      var value = s[field + "_" + locale] || s[field];
      if (value == null || value === "") return;
      el.textContent = value;
      if (el.getAttribute("data-site-href") === "email") {
        el.setAttribute("href", "mailto:" + value);
      }
    });
  }

  function init() {
    load().then(function () {
      applyFields(currentLocale());
    });
  }

  document.addEventListener("i18n:applied", function (e) {
    load().then(function () {
      applyFields(e && e.detail ? e.detail.locale : currentLocale());
    });
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
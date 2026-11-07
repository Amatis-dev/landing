(function () {
  "use strict";

  var SESSION_KEY = "ab_analytics_session";
  var SESSION_TTL = 30 * 60 * 1000;
  var lastPath = null;
  var lastTrackedAt = 0;

  function storage() {
    try {
      return window.localStorage;
    } catch (e) {
      return window.sessionStorage;
    }
  }

  function getSessionId() {
    var now = Date.now();
    var store = storage();
    try {
      var raw = store.getItem(SESSION_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.id && now - parsed.t < SESSION_TTL) {
          parsed.t = now;
          store.setItem(SESSION_KEY, JSON.stringify(parsed));
          return parsed.id;
        }
      }
      var id = "s_" + now.toString(36) + Math.random().toString(36).slice(2, 10);
      store.setItem(SESSION_KEY, JSON.stringify({ id: id, t: now }));
      return id;
    } catch (e) {
      return "s_" + now.toString(36);
    }
  }

  function trackPageview() {
    var path = window.location.pathname + window.location.search;

    if (path.indexOf("/admin") === 0) return;
    if (navigator.doNotTrack === "1" || window.doNotTrack === "1") return;

    var now = Date.now();
    if (path === lastPath && now - lastTrackedAt < 1500) return;
    lastPath = path;
    lastTrackedAt = now;

    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: path,
          referrer: document.referrer || null,
          userAgent: navigator.userAgent,
          sessionId: getSessionId(),
        }),
        keepalive: true,
      }).catch(function () {
        
      });
    } catch (e) {
      
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trackPageview);
  } else {
    trackPageview();
  }
  if (window.history && window.history.pushState) {
    var originalPushState = window.history.pushState;
    window.history.pushState = function () {
      var result = originalPushState.apply(this, arguments);
      trackPageview();
      return result;
    };

    var originalReplaceState = window.history.replaceState;
    window.history.replaceState = function () {
      var result = originalReplaceState.apply(this, arguments);
      if (window.location.pathname !== lastPath) trackPageview();
      return result;
    };
  }

  window.addEventListener("popstate", trackPageview);
})();

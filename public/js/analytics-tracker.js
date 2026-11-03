// Self-hosted analytics tracker for AmatisBerry
(function() {
  'use strict';

  function trackPageview() {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        sessionId: 'session_' + Date.now()
      }),
      keepalive: true
    }).catch(() => {/* silent */});
  }

  // Track on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackPageview);
  } else {
    trackPageview();
  }

  // Also track on navigation (SPA-style)
  if (window.history.pushState) {
    const oldPushState = window.history.pushState;
    window.history.pushState = function pushState(...args) {
      const result = oldPushState.apply(this, args);
      trackPageview();
      return result;
    };
  }
})();
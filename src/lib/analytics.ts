/** 
 * Self-hosted analytics tracking for AmatisBerry
 * Usage: trackPageview() in any component to log a pageview event
 * 
 * Sends data to /api/analytics/track which stores in Neon PostgreSQL
 * No third-party accounts required
 */

/** Track a pageview event */
export async function trackPageview(
  path: string,
  referrer?: string,
  userAgent?: string,
  sessionId?: string
) {
  try {
    const ua = userAgent || navigator.userAgent;
    
    const response = await fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        path,
        referrer,
        userAgent: ua,
        sessionId: sessionId || `session_${Date.now()}`,
      }),
      // Don't block page load if tracking fails
      keepalive: true,
    });

    if (!response.ok) {
      // Non-blocking: just log, don't throw
      console.debug("Analytics track response:", response.status);
    }
  } catch (error) {
    // Silent failure - tracking shouldn't break page functionality
    console.debug("Analytics tracking error:", error);
  }
}

/** 
 * Helper: get simplified browser name from User-Agent 
 * Used by the server-side API, but also useful client-side
 */
export function getBrowserName(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  
  if (ua.indexOf("chrome") > -1 && ua.indexOf("safari") === -1) return "Chrome";
  if (ua.indexOf("safari") > -1) return "Safari";
  if (ua.indexOf("firefox") > -1) return "Firefox";
  if (ua.indexOf("edge") > -1) return "Edge";
  if (ua.indexOf("opera") > -1) return "Opera";
  
  return "Unknown";
}

/** 
 * Helper: get simplified OS name from User-Agent
 */
export function getOsName(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  
  if (ua.indexOf("windows") > -1) return "Windows";
  if (ua.indexOf("mac") > -1 && ua.indexOf("mac os") === -1) return "macOS";
  if (ua.indexOf("linux") > -1) return "Linux";
  if (ua.indexOf("android") > -1) return "Android";
  if (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1) return "iOS";
  
  return "Unknown";
}

export default { trackPageview, getBrowserName, getOsName };
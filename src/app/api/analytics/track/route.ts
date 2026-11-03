import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper: parse user agent to extract browser and OS
function parseUserAgent(userAgent: string | null) {
  if (!userAgent) return { browser: null, os: null };

  const ua = userAgent.toLowerCase();

  // Browser detection - check substrings in UA
  let browser: string | null = null;
  if (ua.indexOf("chrome") > -1 && ua.indexOf("safari") === -1) browser = "Chrome";
  else if (ua.indexOf("safari") > -1) browser = "Safari";
  else if (ua.indexOf("firefox") > -1) browser = "Firefox";
  else if (ua.indexOf("edge") > -1) browser = "Edge";
  else if (ua.indexOf("opera") > -1) browser = "Opera";

  // OS detection - check substrings in UA
  let os: string | null = null;
  if (ua.indexOf("windows") > -1) os = "Windows";
  else if (ua.indexOf("mac") > -1 && ua.indexOf("mac os") === -1) os = "macOS";
  else if (ua.indexOf("linux") > -1) os = "Linux";
  else if (ua.indexOf("android") > -1) os = "Android";
  else if (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1) os = "iOS";

  return { browser, os };
}

// Helper: detect country from IP (simple approach)
// In production, integrate with ip-api.com or similar geolocation service
async function detectCountry(ip: string | null): Promise<string | null> {
  if (!ip) return null;
  // For now, return null - can integrate with geo IP service later
  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path, referrer, userAgent, sessionId, ipAddress } = body;

    if (!path) {
      return new Response(JSON.stringify({ error: "path is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Parse browser/OS from user agent
    const { browser, os } = parseUserAgent(userAgent);

    // Detect country from IP
    const country = await detectCountry(ipAddress);

    // Store the analytics event
    const event = await prisma.analyticsEvent.create({
      data: {
        path,
        referrer,
        ipAddress,
        country,
        browser,
        os,
        userAgent,
        sessionId: sessionId || `session_${Date.now()}`,
      },
    });

    return new Response(
      JSON.stringify({ success: true, id: event.id }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Analytics track error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to track analytics" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
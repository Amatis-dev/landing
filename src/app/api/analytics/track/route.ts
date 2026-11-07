import { createHash } from "crypto";
import prisma from "@/lib/db";
function parseUserAgent(userAgent: string | null) {
  if (!userAgent) return { browser: null, os: null };
  const ua = userAgent.toLowerCase();

  let browser: string | null = null;
  if (/bot|crawler|spider|slurp|bingpreview/.test(ua)) browser = "Bot";
  else if (/edg\//.test(ua) || /edge\//.test(ua)) browser = "Edge";
  else if (/opr\/|opera/.test(ua)) browser = "Opera";
  else if (/firefox|fxios/.test(ua)) browser = "Firefox";
  else if (/chrome|crios/.test(ua)) browser = "Chrome";
  else if (/safari/.test(ua)) browser = "Safari";
  else browser = "Other";

  let os: string | null = null;
  if (/iphone|ipad|ipod/.test(ua)) os = "iOS";
  else if (/android/.test(ua)) os = "Android";
  else if (/windows/.test(ua)) os = "Windows";
  else if (/mac os x|macintosh/.test(ua)) os = "macOS";
  else if (/cros/.test(ua)) os = "ChromeOS";
  else if (/linux/.test(ua)) os = "Linux";
  else os = "Other";

  return { browser, os };
}

function clientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim() || null;
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    null
  );
}
function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.ANALYTICS_SALT || process.env.JWT_SECRET || "amatis";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

function countryFromRequest(request: Request): string | null {
  return (
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    null
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path, referrer, userAgent, sessionId } = body;

    if (!path || typeof path !== "string") {
      return Response.json({ error: "path is required" }, { status: 400 });
    }

    const ua = typeof userAgent === "string" ? userAgent : null;
    const { browser, os } = parseUserAgent(ua);
    const ipAddress = hashIp(clientIp(request));
    const country = countryFromRequest(request);

    const event = await prisma.analyticsEvent.create({
      data: {
        path: path.slice(0, 512),
        referrer: typeof referrer === "string" ? referrer.slice(0, 1024) : null,
        ipAddress,
        country,
        browser,
        os,
        userAgent: ua,
        sessionId:
          typeof sessionId === "string" && sessionId
            ? sessionId.slice(0, 128)
            : `session_${Date.now()}`,
      },
    });

    return Response.json(
      { success: true, id: event.id },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Analytics track error:", error);
    return Response.json({ error: "Failed to track analytics" }, { status: 500 });
  }
}

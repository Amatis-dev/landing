import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("start")
      ? new Date(searchParams.get("start")!)
      : undefined;
    const endDate = searchParams.get("end")
      ? new Date(searchParams.get("end")!)
      : undefined;

    // Base query where clause
    const where: any = {};

    if (startDate || endDate) {
      where.visitedAt = {};
      if (startDate) where.visitedAt.gte = startDate;
      if (endDate) where.visitedAt.lte = endDate;
    }

    // Fetch all events in the date range
    const events = await prisma.analyticsEvent.findMany({
      where,
      orderBy: { visitedAt: "desc" },
      take: 10000, // reasonable limit
    });

    if (events.length === 0) {
      return new Response(
        JSON.stringify({
          pageviews: 0,
          unique_visitors: 0,
          sessions: 0,
          bounce_rate: 0,
          top_pages: [],
          countries: [],
          browsers: {},
          os: {},
          events: [],
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // ===== Calculate Statistics =====

    // Total pageviews
    const pageviews = events.length;

    // Unique visitors by IP (approximate - we store IP but may have repeats)
    const uniqueIPs = new Set(events.map((e) => e.ipAddress).filter(Boolean));
    const uniqueVisitors = uniqueIPs.size;

    // Sessions by sessionId
    const uniqueSessions = new Set(events.map((e) => e.sessionId)).size;

    // Bounce rate: sessions with only 1 pageview
    const sessionPageCounts: Map<string, number> = new Map();
    events.forEach((e) => {
      sessionPageCounts.set(e.sessionId, (sessionPageCounts.get(e.sessionId) || 0) + 1);
    });
    const bounceSessions = Array.from(sessionPageCounts.values()).filter(
      (count) => count === 1
    ).length;
    const bounceRate = uniqueSessions > 0 ? (bounceSessions / uniqueSessions) * 100 : 0;

    // Top pages
    const pageViewsMap: Map<string, number> = new Map();
    events.forEach((e) => {
      pageViewsMap.set(e.path, (pageViewsMap.get(e.path) || 0) + 1);
    });
    const topPageEntries = Array.from(pageViewsMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, views]) => ({ path, pageviews: views }));

    // Countries
    const countryMap: Map<string, number> = new Map();
    events.forEach((e) => {
      if (e.country) {
        countryMap.set(e.country, (countryMap.get(e.country) || 0) + 1);
      }
    });
    const countries = Array.from(countryMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([country, visitors]) => ({ country, visitors }));

    // Browsers
    const browserMap: Map<string, number> = new Map();
    events.forEach((e) => {
      if (e.browser) {
        browserMap.set(e.browser, (browserMap.get(e.browser) || 0) + 1);
      }
    });
    const browsers: Record<string, number> = {};
    browserMap.forEach((count, browser) => (browsers[browser] = count));

    // Operating Systems
    const osMap: Map<string, number> = new Map();
    events.forEach((e) => {
      if (e.os) {
        osMap.set(e.os, (osMap.get(e.os) || 0) + 1);
      }
    });
    const os: Record<string, number> = {};
    osMap.forEach((count, osName) => (os[osName] = count));

    // Events (if any tracked)
    const trackedEvents = events.length > 0 ? events.length : 0;

    return new Response(
      JSON.stringify({
        pageviews,
        unique_visitors: uniqueVisitors,
        sessions: uniqueSessions,
        bounce_rate: Math.round(bounceRate * 10) / 10, // 1 decimal
        top_pages: topPageEntries,
        countries,
        browsers,
        os,
        events: trackedEvents,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Analytics fetch error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch analytics" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
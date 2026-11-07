import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

const DAY = 86_400_000;

type Ev = {
  path: string;
  referrer: string | null;
  ipAddress: string | null;
  country: string | null;
  browser: string | null;
  os: string | null;
  userAgent: string | null;
  visitedAt: Date;
  sessionId: string;
};

type Interval = "hour" | "day" | "month";

type SessionInfo = {
  count: number;
  first: number;
  last: number;
  path: string;
  source: string;
  visitor: string;
};

type Row = {
  name: string;
  visitors: number;
  sessions: number;
  share: number;
};

const round1 = (n: number) => Math.round(n * 10) / 10;
const round2 = (n: number) => Math.round(n * 100) / 100;

function visitorKey(e: Ev) {
  return e.ipAddress ? `ip:${e.ipAddress}` : `sid:${e.sessionId}`;
}

function startOfUTCDay(d: Date) {
  const x = new Date(d);
  x.setUTCHours(0, 0, 0, 0);
  return x;
}

function startOfUTCMonth(d: Date) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1, 0, 0, 0, 0));
}

function floorBucket(d: Date, interval: Interval) {
  if (interval === "hour") {
    const x = new Date(d);
    x.setUTCMinutes(0, 0, 0);
    return x;
  }
  if (interval === "day") return startOfUTCDay(d);
  return startOfUTCMonth(d);
}

function addBucket(d: Date, interval: Interval, n = 1) {
  const x = new Date(d);
  if (interval === "hour") x.setUTCHours(x.getUTCHours() + n);
  else if (interval === "day") x.setUTCDate(x.getUTCDate() + n);
  else x.setUTCMonth(x.getUTCMonth() + n);
  return x;
}

function sourceFromReferrer(ref: string | null | undefined): string {
  if (!ref) return "Direct";
  let host = "";
  try {
    host = new URL(ref).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    host = ref.toLowerCase();
  }
  if (!host) return "Direct";
  if (
    host.includes("amatisberry.ir") ||
    host === "localhost" ||
    host.startsWith("127.") ||
    host.startsWith("192.168.")
  ) {
    return "Internal";
  }

  const mappings: Array<[string, string]> = [
    ["google", "Google"],
    ["bing", "Bing"],
    ["yahoo", "Yahoo"],
    ["duckduckgo", "DuckDuckGo"],
    ["yandex", "Yandex"],
    ["twitter.com", "X / Twitter"],
    ["x.com", "X / Twitter"],
    ["t.co", "X / Twitter"],
    ["facebook", "Facebook"],
    ["fb.", "Facebook"],
    ["instagram", "Instagram"],
    ["linkedin", "LinkedIn"],
    ["lnkd.in", "LinkedIn"],
    ["telegram", "Telegram"],
    ["t.me", "Telegram"],
    ["youtube", "YouTube"],
    ["youtu.be", "YouTube"],
    ["reddit", "Reddit"],
    ["tiktok", "TikTok"],
    ["pinterest", "Pinterest"],
    ["whatsapp", "WhatsApp"],
    ["wa.me", "WhatsApp"],
  ];
  for (const [needle, name] of mappings) {
    if (host.includes(needle)) return name;
  }
  return host;
}

function deviceFromUA(ua: string | null): string {
  if (!ua) return "Unknown";
  const s = ua.toLowerCase();
  if (/ipad|tablet|playbook|silk|kindle/.test(s)) return "Tablet";
  if (/mobi|iphone|ipod|android.*mobile|windows phone|blackberry/.test(s)) return "Mobile";
  return "Desktop";
}

function parseDate(raw: string | null): Date | null {
  if (!raw) return null;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function presetStart(range: string, end: Date) {
  switch (range) {
    case "today":
      return startOfUTCDay(end);
    case "24h":
      return new Date(end.getTime() - DAY);
    case "7d":
      return startOfUTCDay(new Date(end.getTime() - 6 * DAY));
    case "90d":
      return startOfUTCDay(new Date(end.getTime() - 89 * DAY));
    case "12m":
      return new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - 11, 1));
    case "30d":
    default:
      return startOfUTCDay(new Date(end.getTime() - 29 * DAY));
  }
}

function sessionize(events: Ev[]) {
  const sessions = new Map<string, SessionInfo>();
  const visitors = new Set<string>();
  let views = 0;

  const ordered = [...events].sort(
    (a, b) => a.visitedAt.getTime() - b.visitedAt.getTime()
  );

  for (const e of ordered) {
    views += 1;
    const key = visitorKey(e);
    visitors.add(key);
    const t = e.visitedAt.getTime();
    let s = sessions.get(e.sessionId);
    if (!s) {
      s = {
        count: 0,
        first: t,
        last: t,
        path: e.path,
        source: sourceFromReferrer(e.referrer),
        visitor: key,
      };
      sessions.set(e.sessionId, s);
    }
    s.count += 1;
    s.last = t;
  }

  return { sessions, visitors, views };
}

function basicMetrics(events: Ev[]) {
  const { sessions, visitors, views } = sessionize(events);
  let bounceSessions = 0;
  let durationTotal = 0;

  sessions.forEach((s) => {
    if (s.count === 1) bounceSessions += 1;
    durationTotal += Math.max(0, (s.last - s.first) / 1000);
  });

  const sessionCount = sessions.size;

  return {
    pageviews: views,
    visitors: visitors.size,
    sessions: sessionCount,
    bounce_rate: sessionCount ? round1((bounceSessions / sessionCount) * 100) : 0,
    avg_session_seconds: sessionCount ? Math.round(durationTotal / sessionCount) : 0,
    pages_per_session: sessionCount ? round2(views / sessionCount) : 0,
    sessionsMap: sessions,
    visitorSet: visitors,
  };
}

type SeriesPoint = {
  t: string;
  pageviews: number;
  visitors: number;
  sessions: number;
  bounce_rate: number;
  avg_session_seconds: number;
  pages_per_session: number;
  prev_pageviews: number;
  prev_visitors: number;
  prev_sessions: number;
};

function bucketize(
  events: Ev[],
  start: Date,
  end: Date,
  interval: Interval
): Array<Omit<SeriesPoint, "prev_pageviews" | "prev_visitors" | "prev_sessions">> {
  const buckets = new Map<string, Ev[]>();
  const first = floorBucket(start, interval);
  const last = floorBucket(end, interval);

  for (const e of events) {
    const bucket = floorBucket(e.visitedAt, interval);
    if (bucket < first) continue;
    const key = bucket.toISOString();
    const list = buckets.get(key);
    if (list) list.push(e);
    else buckets.set(key, [e]);
  }

  const out: Array<
    Omit<SeriesPoint, "prev_pageviews" | "prev_visitors" | "prev_sessions">
  > = [];
  let cursor = first;
  let guard = 0;

  while (cursor <= last && guard < 500) {
    const key = cursor.toISOString();
    const m = basicMetrics(buckets.get(key) || []);
    out.push({
      t: key,
      pageviews: m.pageviews,
      visitors: m.visitors,
      sessions: m.sessions,
      bounce_rate: m.bounce_rate,
      avg_session_seconds: m.avg_session_seconds,
      pages_per_session: m.pages_per_session,
    });
    cursor = addBucket(cursor, interval);
    guard += 1;
  }

  return out;
}

function distribution(
  events: Ev[],
  selector: (e: Ev) => string
): Row[] {
  const map = new Map<string, { visitors: Set<string>; sessions: Set<string> }>();

  for (const e of events) {
    const name = selector(e) || "Unknown";
    let bucket = map.get(name);
    if (!bucket) {
      bucket = { visitors: new Set(), sessions: new Set() };
      map.set(name, bucket);
    }
    bucket.visitors.add(visitorKey(e));
    bucket.sessions.add(e.sessionId);
  }

  const raw = Array.from(map.entries()).map(([name, v]) => ({
    name,
    visitors: v.visitors.size,
    sessions: v.sessions.size,
    share: 0,
  }));

  const total = raw.reduce((sum, r) => sum + r.visitors, 0) || 1;
  raw.forEach((r) => {
    r.share = round1((r.visitors / total) * 100);
  });

  return raw.sort((a, b) => b.visitors - a.visitors || a.name.localeCompare(b.name));
}

function withOther(rows: Row[], limit: number): Row[] {
  if (rows.length <= limit) return rows;
  const head = rows.slice(0, limit);
  const tail = rows.slice(limit);
  const visitors = tail.reduce((s, r) => s + r.visitors, 0);
  const sessions = tail.reduce((s, r) => s + r.sessions, 0);
  const share = round1(tail.reduce((s, r) => s + r.share, 0));
  return [...head, { name: "Other", visitors, sessions, share }];
}

function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return round1(((current - previous) / previous) * 100);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const now = new Date();

    let end = parseDate(searchParams.get("end")) || now;
    let start = parseDate(searchParams.get("start"));

    const endRaw = searchParams.get("end") || "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(endRaw)) {
      end = new Date(endRaw);
      end.setUTCHours(23, 59, 59, 999);
    }

    const startRaw = searchParams.get("start") || "";
    if (!start) {
      start = presetStart(searchParams.get("range") || "30d", end);
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(startRaw)) {
      start = new Date(startRaw);
      start.setUTCHours(0, 0, 0, 0);
    }

    if (start > end) {
      const swap = start;
      start = end;
      end = swap;
    }

    const duration = end.getTime() - start.getTime();
    const prevEnd = new Date(start.getTime());
    const prevStart = new Date(start.getTime() - duration);

    const interval: Interval =
      duration <= 2 * DAY ? "hour" : duration <= 120 * DAY ? "day" : "month";

    const events: Ev[] = await prisma.analyticsEvent.findMany({
      where: {
        visitedAt: { gte: prevStart, lte: end },
      },
      orderBy: { visitedAt: "desc" },
      take: 50000,
      select: {
        path: true,
        referrer: true,
        ipAddress: true,
        country: true,
        browser: true,
        os: true,
        userAgent: true,
        visitedAt: true,
        sessionId: true,
      },
    });

    const current = events.filter((e) => e.visitedAt >= start);
    const previous = events.filter((e) => e.visitedAt < start);

    const cur = basicMetrics(current);
    const prev = basicMetrics(previous);

    let seenBefore = new Set<string>();
    if (start) {
      try {
        const prior = await prisma.analyticsEvent.findMany({
          where: { visitedAt: { lt: start }, ipAddress: { not: null } },
          distinct: ["ipAddress"],
          select: { ipAddress: true },
          take: 20000,
        });
        prior.forEach((row) => {
          if (row.ipAddress) seenBefore.add(row.ipAddress);
        });
      } catch {
        seenBefore = new Set<string>();
      }
    }

    let returningVisitors = 0;
    cur.visitorSet.forEach((key) => {
      if (key.startsWith("ip:") && seenBefore.has(key.slice(3))) {
        returningVisitors += 1;
      }
    });
    const newVisitors = Math.max(0, cur.visitors - returningVisitors);
    const currentSeries = bucketize(current, start, end, interval);
    const prevSeries = bucketize(previous, prevStart, start, interval);
    const timeseries: SeriesPoint[] = currentSeries.map((point, index) => {
      const match = prevSeries[index];
      return {
        ...point,
        prev_pageviews: match ? match.pageviews : 0,
        prev_visitors: match ? match.visitors : 0,
        prev_sessions: match ? match.sessions : 0,
      };
    });
    const pageMap = new Map<
      string,
      { events: number; visitors: Set<string>; sessions: Set<string> }
    >();
    for (const e of current) {
      let entry = pageMap.get(e.path);
      if (!entry) {
        entry = { events: 0, visitors: new Set(), sessions: new Set() };
        pageMap.set(e.path, entry);
      }
      entry.events += 1;
      entry.visitors.add(visitorKey(e));
      entry.sessions.add(e.sessionId);
    }

    const bounceByPath = new Map<string, number>();
    cur.sessionsMap.forEach((s) => {
      if (s.count === 1) {
        bounceByPath.set(s.path, (bounceByPath.get(s.path) || 0) + 1);
      }
    });

    const pages = Array.from(pageMap.entries())
      .map(([path, v]) => {
        const sessions = v.sessions.size;
        return {
          path,
          pageviews: v.events,
          visitors: v.visitors.size,
          sessions,
          bounce_rate: sessions
            ? round1(((bounceByPath.get(path) || 0) / sessions) * 100)
            : 0,
          share: cur.pageviews
            ? round1((v.events / cur.pageviews) * 100)
            : 0,
        };
      })
      .sort((a, b) => b.pageviews - a.pageviews || b.visitors - a.visitors);
    const sourceMap = new Map<
      string,
      { visitors: Set<string>; sessions: Set<string> }
    >();
    cur.sessionsMap.forEach((s, sid) => {
      let entry = sourceMap.get(s.source);
      if (!entry) {
        entry = { visitors: new Set(), sessions: new Set() };
        sourceMap.set(s.source, entry);
      }
      entry.visitors.add(s.visitor);
      entry.sessions.add(sid);
    });

    const sourceRowsRaw = Array.from(sourceMap.entries()).map(([name, v]) => ({
      name,
      visitors: v.visitors.size,
      sessions: v.sessions.size,
      share: 0,
    }));
    const sourceTotal =
      sourceRowsRaw.reduce((sum, r) => sum + r.sessions, 0) || 1;
    sourceRowsRaw.forEach((r) => {
      r.share = round1((r.sessions / sourceTotal) * 100);
    });
    sourceRowsRaw.sort((a, b) => b.sessions - a.sessions);
    const sources = withOther(sourceRowsRaw, 7);
    const countries = withOther(distribution(current, (e) => e.country || "Unknown"), 8);
    const browsers = withOther(distribution(current, (e) => e.browser || "Unknown"), 6);
    const osRows = withOther(distribution(current, (e) => e.os || "Unknown"), 6);
    const devices = distribution(current, (e) => deviceFromUA(e.userAgent));
    const hourBuckets = Array.from({ length: 24 }, () => ({
      pageviews: 0,
      visitors: new Set<string>(),
    }));
    for (const e of current) {
      const h = e.visitedAt.getUTCHours();
      hourBuckets[h].pageviews += 1;
      hourBuckets[h].visitors.add(visitorKey(e));
    }
    const hourly = hourBuckets.map((b, hour) => ({
      hour,
      pageviews: b.pageviews,
      visitors: b.visitors.size,
    }));
    const recent = current.slice(0, 30).map((e) => ({
      path: e.path,
      referrer: e.referrer,
      source: sourceFromReferrer(e.referrer),
      browser: e.browser,
      os: e.os,
      device: deviceFromUA(e.userAgent),
      country: e.country,
      visitedAt: e.visitedAt.toISOString(),
      sessionId: e.sessionId,
    }));
    const liveSince = new Date(now.getTime() - 5 * 60 * 1000);
    const liveEvents = await prisma.analyticsEvent.findMany({
      where: { visitedAt: { gte: liveSince } },
      select: { sessionId: true, ipAddress: true },
      take: 5000,
    });
    const liveVisitors = new Set(
      liveEvents.map((e) =>
        e.ipAddress ? `ip:${e.ipAddress}` : `sid:${e.sessionId}`
      )
    ).size;
    const busiest = timeseries.reduce<SeriesPoint | null>((best, point) => {
      if (!best || point.pageviews > best.pageviews) return point;
      return best;
    }, null);
    const peak = hourly.reduce<{ hour: number; pageviews: number } | null>(
      (best, point) => {
        if (!best || point.pageviews > best.pageviews) return point;
        return best;
      },
      null
    );

    const insights = {
      busiest_bucket: busiest ? busiest.t : null,
      busiest_bucket_pageviews: busiest ? busiest.pageviews : 0,
      peak_hour: peak ? peak.hour : null,
      peak_hour_pageviews: peak ? peak.pageviews : 0,
      top_source: sources[0]?.name || "Direct",
      top_page: pages[0]?.path || null,
      avg_bucket_pageviews: Math.round(
        cur.pageviews / Math.max(1, timeseries.length)
      ),
    };

    return NextResponse.json(
      {
        meta: {
          start: start.toISOString(),
          end: end.toISOString(),
          interval,
          duration_days: Math.max(1, Math.round(duration / DAY)),
          generated_at: now.toISOString(),
          live_visitors: liveVisitors,
          live_pageviews: liveEvents.length,
          sampled: events.length >= 50000,
        },
        kpis: {
          pageviews: cur.pageviews,
          unique_visitors: cur.visitors,
          sessions: cur.sessions,
          bounce_rate: cur.bounce_rate,
          avg_session_seconds: cur.avg_session_seconds,
          pages_per_session: cur.pages_per_session,
          new_visitors: newVisitors,
          returning_visitors: returningVisitors,
        },
        comparison: {
          pageviews: pctChange(cur.pageviews, prev.pageviews),
          unique_visitors: pctChange(cur.visitors, prev.visitors),
          sessions: pctChange(cur.sessions, prev.sessions),
          bounce_rate: round1(cur.bounce_rate - prev.bounce_rate),
          avg_session_seconds: pctChange(
            cur.avg_session_seconds,
            prev.avg_session_seconds
          ),
          pages_per_session: pctChange(
            cur.pages_per_session,
            prev.pages_per_session
          ),
        },
        timeseries,
        top_pages: pages.slice(0, 20),
        sources,
        countries,
        browsers,
        os: osRows,
        devices,
        hourly,
        recent,
        insights,
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("Analytics fetch error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch analytics";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

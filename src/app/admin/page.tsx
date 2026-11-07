"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./analytics.css";

type RangeKey = "today" | "7d" | "30d" | "90d" | "12m" | "custom";
type Interval = "hour" | "day" | "month";

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

type Kpis = {
  pageviews: number;
  unique_visitors: number;
  sessions: number;
  bounce_rate: number;
  avg_session_seconds: number;
  pages_per_session: number;
  new_visitors: number;
  returning_visitors: number;
};

type Comparison = {
  pageviews: number | null;
  unique_visitors: number | null;
  sessions: number | null;
  bounce_rate: number;
  avg_session_seconds: number | null;
  pages_per_session: number | null;
};

type PageRow = {
  path: string;
  pageviews: number;
  visitors: number;
  sessions: number;
  bounce_rate: number;
  share: number;
};

type Row = {
  name: string;
  visitors: number;
  sessions: number;
  share: number;
};

type RecentRow = {
  path: string;
  referrer: string | null;
  source: string;
  browser: string | null;
  os: string | null;
  device: string;
  country: string | null;
  visitedAt: string;
  sessionId: string;
};

type AnalyticsResponse = {
  meta: {
    start: string;
    end: string;
    interval: Interval;
    duration_days: number;
    generated_at: string;
    live_visitors: number;
    live_pageviews: number;
    sampled: boolean;
  };
  kpis: Kpis;
  comparison: Comparison;
  timeseries: SeriesPoint[];
  top_pages: PageRow[];
  sources: Row[];
  countries: Row[];
  browsers: Row[];
  os: Row[];
  devices: Row[];
  hourly: Array<{ hour: number; pageviews: number; visitors: number }>;
  recent: RecentRow[];
  insights: {
    busiest_bucket: string | null;
    busiest_bucket_pageviews: number;
    peak_hour: number | null;
    peak_hour_pageviews: number;
    top_source: string;
    top_page: string | null;
    avg_bucket_pageviews: number;
  };
};

const DAY = 86_400_000;
const API = "/api/admin/analytics";
const REFRESH_MS = 30_000;

const COLORS = {
  pageviews: "#2dd4bf",
  visitors: "#60a5fa",
  sessions: "#a78bfa",
  previous: "#8b93a7",
};

const PALETTE = [
  "#2dd4bf",
  "#60a5fa",
  "#a78bfa",
  "#fbbf24",
  "#fb7185",
  "#34d399",
  "#22d3ee",
  "#f472b6",
];

const ICONS = {
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  chart: "M3 3v18h18M7 15l3-4 3 2 5-6",
  users:
    "M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  globe:
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  monitor: "M3 4h18v12H3zM8 20h8M12 16v4",
  refresh: "M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6",
  download: "M12 3v12M7 10l5 5 5-5M4 21h16",
  printer:
    "M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
  arrowUp: "M12 19V5M5 12l7-7 7 7",
  arrowDown: "M12 5v14M19 12l-7 7-7-7",
  eye:
    "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  calendar: "M8 2v4M16 2v4M3 6h18v15H3zM3 10h18",
  mouse:
    "M9 9h6M12 3a5 5 0 0 1 5 5v8a5 5 0 0 1-10 0V8a5 5 0 0 1 5-5z",
  layers: "M12 2 2 7l10 5 10-5zM2 12l10 5 10-5M2 17l10 5 10-5",
  zap: "M13 2 3 14h9l-1 8 10-12h-9z",
} as const;

type IconName = keyof typeof ICONS;

const RANGE_OPTIONS: Array<{ key: RangeKey; label: string }> = [
  { key: "today", label: "Today" },
  { key: "7d", label: "7D" },
  { key: "30d", label: "30D" },
  { key: "90d", label: "90D" },
  { key: "12m", label: "12M" },
  { key: "custom", label: "Custom" },
];

const RANGE_LABELS: Record<RangeKey, string> = {
  today: "Today",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  "12m": "Last 12 months",
  custom: "Custom range",
};

function Icon({
  name,
  size = 16,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

function compact(n: number | null | undefined): string {
  const value = Number(n || 0);
  if (Math.abs(value) >= 1_000_000)
    return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  if (Math.abs(value) >= 100_000)
    return `${(value / 1_000).toFixed(0)}k`;
  if (Math.abs(value) >= 10_000)
    return `${(value / 1_000).toFixed(value % 1_000 === 0 ? 0 : 1)}k`;
  return value.toLocaleString("en-US");
}

function full(n: number | null | undefined): string {
  return Number(n || 0).toLocaleString("en-US");
}

function percent(n: number | null | undefined, digits = 1): string {
  return `${Number(n || 0).toFixed(digits)}%`;
}

function formatDuration(seconds: number | null | undefined): string {
  const total = Math.max(0, Math.round(Number(seconds || 0)));
  if (total < 60) return `${total}s`;
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  if (minutes < 60) return `${minutes}m ${secs}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

function toInputDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getRange(key: RangeKey, customStart: string, customEnd: string) {
  const end = new Date();
  let start = new Date(end);

  switch (key) {
    case "today":
      start.setHours(0, 0, 0, 0);
      break;
    case "7d":
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 6);
      break;
    case "90d":
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 89);
      break;
    case "12m":
      start = new Date(end.getFullYear(), end.getMonth() - 11, 1, 0, 0, 0, 0);
      break;
    case "custom": {
      const s = new Date(`${customStart}T00:00:00`);
      const e = new Date(`${customEnd}T23:59:59.999`);
      return {
        start: Number.isNaN(s.getTime()) ? new Date(end.getTime() - 29 * DAY) : s,
        end: Number.isNaN(e.getTime()) ? end : e,
      };
    }
    case "30d":
    default:
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 29);
      break;
  }

  return { start, end };
}

function formatTick(iso: string, interval: Interval): string {
  const date = new Date(iso);
  if (interval === "hour") {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    });
  }
  if (interval === "month") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
      timeZone: "UTC",
    });
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function formatBucket(iso: string | null, interval: Interval): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (interval === "hour") {
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    });
  }
  if (interval === "month") {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  }
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function timeAgo(iso: string): string {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  if (diff < 60_000) return `${Math.max(1, Math.round(diff / 1000))}s ago`;
  if (diff < 3_600_000) return `${Math.round(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.round(diff / 3_600_000)}h ago`;
  return `${Math.round(diff / 86_400_000)}d ago`;
}

function countryName(code: string | null): string {
  if (!code || code === "Unknown") return "Unknown";
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) || code;
  } catch {
    return code;
  }
}

function sourceHost(source: string): string {
  return source.replace(/^www\./, "");
}

function csvCell(value: unknown): string {
  const text = value == null ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function downloadCsv(report: AnalyticsResponse) {
  const rows: Array<Array<unknown>> = [];

  rows.push(["AmatisBerry — Analytics report"]);
  rows.push([
    "Period",
    `${report.meta.start.slice(0, 10)} → ${report.meta.end.slice(0, 10)}`,
  ]);
  rows.push(["Generated", new Date(report.meta.generated_at).toISOString()]);
  rows.push([]);
  rows.push(["KPIs"]);
  rows.push(["Metric", "Value"]);
  rows.push(["Pageviews", report.kpis.pageviews]);
  rows.push(["Unique visitors", report.kpis.unique_visitors]);
  rows.push(["New visitors", report.kpis.new_visitors]);
  rows.push(["Returning visitors", report.kpis.returning_visitors]);
  rows.push(["Sessions", report.kpis.sessions]);
  rows.push(["Bounce rate", `${report.kpis.bounce_rate}%`]);
  rows.push(["Avg. session (seconds)", report.kpis.avg_session_seconds]);
  rows.push(["Pages / session", report.kpis.pages_per_session]);
  rows.push([]);
  rows.push(["Traffic sources"]);
  rows.push(["Source", "Sessions", "Visitors", "Share %"]);
  report.sources.forEach((row) =>
    rows.push([row.name, row.sessions, row.visitors, row.share])
  );
  rows.push([]);
  rows.push(["Top pages"]);
  rows.push(["Path", "Pageviews", "Visitors", "Sessions", "Bounce %", "Share %"]);
  report.top_pages.forEach((row) =>
    rows.push([
      row.path,
      row.pageviews,
      row.visitors,
      row.sessions,
      row.bounce_rate,
      row.share,
    ])
  );
  rows.push([]);
  rows.push(["Countries"]);
  rows.push(["Country", "Visitors", "Sessions", "Share %"]);
  report.countries.forEach((row) =>
    rows.push([countryName(row.name), row.visitors, row.sessions, row.share])
  );
  rows.push([]);
  rows.push(["Browsers"]);
  rows.push(["Browser", "Visitors", "Sessions", "Share %"]);
  report.browsers.forEach((row) =>
    rows.push([row.name, row.visitors, row.sessions, row.share])
  );
  rows.push([]);
  rows.push(["Operating systems"]);
  rows.push(["OS", "Visitors", "Sessions", "Share %"]);
  report.os.forEach((row) =>
    rows.push([row.name, row.visitors, row.sessions, row.share])
  );

  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([`\ufeff${csv}`], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `amatisberry-analytics-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function Delta({
  value,
  suffix = "%",
  positiveIsGood = true,
}: {
  value: number | null;
  suffix?: string;
  positiveIsGood?: boolean;
}) {
  if (value === null) {
    return (
      <span className="ag-delta is-good">
        <Icon name="arrowUp" size={11} />
        New
      </span>
    );
  }

  const flat = Math.abs(value) < 0.05;
  const good = positiveIsGood ? value > 0 : value < 0;
  const cls = flat ? "is-flat" : good ? "is-good" : "is-bad";

  return (
    <span className={`ag-delta ${cls}`}>
      {!flat && (
        <Icon name={value > 0 ? "arrowUp" : "arrowDown"} size={11} />
      )}
      {value > 0 ? "+" : ""}
      {value.toFixed(1)}
      {suffix}
    </span>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="ag-empty">
      <div className="ag-empty-icon">
        <Icon name="activity" size={20} />
      </div>
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

function ChartTooltip({
  active,
  payload,
  label,
  interval,
}: {
  active?: boolean;
  payload?: Array<Record<string, unknown>>;
  label?: string;
  interval: Interval;
}) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="ag-tooltip">
      <div className="ag-tooltip-title">
        {formatBucket(label || null, interval)}
      </div>
      {payload.map((entry, index) => (
        <div className="ag-tooltip-row" key={`${String(entry.dataKey)}-${index}`}>
          <span>
            <i
              className="ag-dot"
              style={{
                background: String(entry.stroke || entry.color || "#94a3b8"),
              }}
            />
            {String(entry.name ?? "")}
          </span>
          <b>{full(Number(entry.value || 0))}</b>
        </div>
      ))}
    </div>
  );
}

function PieTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<Record<string, unknown>>;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  const record = (item.payload || {}) as Row;
  return (
    <div className="ag-tooltip">
      <div className="ag-tooltip-title">{record.name}</div>
      <div className="ag-tooltip-row">
        <span>
          <i
            className="ag-dot"
            style={{ background: String(item.color || item.fill || "#94a3b8") }}
          />
          Visitors
        </span>
        <b>{full(record.visitors)}</b>
      </div>
      {typeof record.sessions === "number" && (
        <div className="ag-tooltip-row">
          <span>Sessions</span>
          <b>{full(record.sessions)}</b>
        </div>
      )}
      <div className="ag-tooltip-row">
        <span>Share</span>
        <b>{percent(record.share)}</b>
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  hint,
  icon,
  color,
  soft,
  glow,
  delta,
  deltaSuffix,
  positiveIsGood = true,
  spark,
  delay = 0,
}: {
  label: string;
  value: string;
  hint: string;
  icon: IconName;
  color: string;
  soft: string;
  glow: string;
  delta: number | null;
  deltaSuffix?: string;
  positiveIsGood?: boolean;
  spark: number[];
  delay?: number;
}) {
  const rawId = useId();
  const gradientId = `agspark-${rawId.replace(/[:]/g, "")}`;
  const sparkData = spark.map((v, i) => ({ i, v }));
  const hasSpark = spark.some((v) => v > 0);

  return (
    <div
      className="ag-kpi"
      style={
        {
          "--kpi-color": color,
          "--kpi-soft": soft,
          "--kpi-glow": glow,
          animationDelay: `${delay}ms`,
        } as React.CSSProperties
      }
    >
      <div className="ag-kpi-top">
        <span className="ag-kpi-icon">
          <Icon name={icon} size={16} />
        </span>
        <span className="ag-kpi-label">{label}</span>
      </div>
      <div className="ag-kpi-value ag-num">{value}</div>
      <div className="ag-kpi-foot">
        <Delta
          value={delta}
          suffix={deltaSuffix}
          positiveIsGood={positiveIsGood}
        />
        <span className="ag-kpi-hint">{hint}</span>
      </div>
      {hasSpark && (
        <div className="ag-kpi-spark">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={sparkData}
              margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.32} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={color}
                strokeWidth={1.5}
                fill={`url(#${gradientId})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

type PageSortKey =
  | "path"
  | "pageviews"
  | "visitors"
  | "sessions"
  | "bounce_rate"
  | "share";

function ReportView({
  report,
  rangeLabel,
}: {
  report: AnalyticsResponse;
  rangeLabel: string;
}) {
  const [visible, setVisible] = useState({
    pageviews: true,
    visitors: true,
    sessions: false,
  });
  const [compare, setCompare] = useState(false);
  const [pageSearch, setPageSearch] = useState("");
  const [showAllPages, setShowAllPages] = useState(false);
  const [sort, setSort] = useState<{ key: PageSortKey; dir: "asc" | "desc" }>({
    key: "pageviews",
    dir: "desc",
  });

  const interval = report.meta.interval;
  const totalViews = report.kpis.pageviews;
  const series = report.timeseries;

  const filteredPages = useMemo(() => {
    const query = pageSearch.trim().toLowerCase();
    const rows = report.top_pages.filter(
      (row) => !query || row.path.toLowerCase().includes(query)
    );

    rows.sort((a, b) => {
      if (sort.key === "path") {
        return sort.dir === "asc"
          ? a.path.localeCompare(b.path)
          : b.path.localeCompare(a.path);
      }
      const diff = a[sort.key] - b[sort.key];
      return sort.dir === "asc" ? diff : -diff;
    });

    return rows;
  }, [report.top_pages, pageSearch, sort]);

  const visiblePages = showAllPages
    ? filteredPages
    : filteredPages.slice(0, 10);

  const toggleSort = (key: PageSortKey) => {
    setSort((current) => {
      if (current.key === key) {
        return { key, dir: current.dir === "asc" ? "desc" : "asc" };
      }
      return { key, dir: key === "path" ? "asc" : "desc" };
    });
  };

  const toggleMetric = (metric: keyof typeof visible) => {
    setVisible((current) => ({ ...current, [metric]: !current[metric] }));
  };

  const topPageRow = report.top_pages[0];
  const topSourceRow = report.sources[0];
  const busiestLabel = formatBucket(report.insights.busiest_bucket, interval);

  return (
    <>
      {}
      <section id="overview" style={{ scrollMarginTop: 78 }}>
        <div className="ag-insights">
          <div className="ag-insight">
            <span className="ag-insight-icon">
              <Icon name="file" size={15} />
            </span>
            <div className="ag-insight-text">
              <div className="ag-insight-label">Top page</div>
              <div className="ag-insight-value truncate" dir="ltr">
                {topPageRow ? topPageRow.path : "—"}
              </div>
              <div className="ag-insight-meta">
                {topPageRow
                  ? `${full(topPageRow.pageviews)} views · ${percent(
                      topPageRow.share
                    )} of traffic`
                  : "No pageviews yet"}
              </div>
            </div>
          </div>

          <div className="ag-insight">
            <span className="ag-insight-icon">
              <Icon name="layers" size={15} />
            </span>
            <div className="ag-insight-text">
              <div className="ag-insight-label">Top source</div>
              <div className="ag-insight-value truncate">
                {report.insights.top_source}
              </div>
              <div className="ag-insight-meta">
                {topSourceRow
                  ? `${percent(topSourceRow.share)} of sessions · ${full(
                      topSourceRow.sessions
                    )} sessions`
                  : "No sessions yet"}
              </div>
            </div>
          </div>

          <div className="ag-insight">
            <span className="ag-insight-icon">
              <Icon name="clock" size={15} />
            </span>
            <div className="ag-insight-text">
              <div className="ag-insight-label">Peak hour</div>
              <div className="ag-insight-value">
                {report.insights.peak_hour === null
                  ? "—"
                  : `${String(report.insights.peak_hour).padStart(2, "0")}:00 – ${String(
                      (report.insights.peak_hour + 1) % 24
                    ).padStart(2, "0")}:00`}
              </div>
              <div className="ag-insight-meta">
                {full(report.insights.peak_hour_pageviews)} views at peak
              </div>
            </div>
          </div>

          <div className="ag-insight">
            <span className="ag-insight-icon">
              <Icon name="calendar" size={15} />
            </span>
            <div className="ag-insight-text">
              <div className="ag-insight-label">Busiest period</div>
              <div className="ag-insight-value truncate">{busiestLabel}</div>
              <div className="ag-insight-meta">
                {full(report.insights.busiest_bucket_pageviews)} views ·{" "}
                {full(report.insights.avg_bucket_pageviews)} avg
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="ag-grid kpis ag-mt-16">
          <KpiCard
            label="Pageviews"
            value={compact(report.kpis.pageviews)}
            hint={`${full(report.kpis.pageviews)} total`}
            icon="eye"
            color={COLORS.pageviews}
            soft="rgba(45, 212, 191, 0.13)"
            glow="rgba(45, 212, 191, 0.16)"
            delta={report.comparison.pageviews}
            spark={series.map((p) => p.pageviews)}
          />
          <KpiCard
            label="Unique visitors"
            value={compact(report.kpis.unique_visitors)}
            hint={`${full(report.kpis.new_visitors)} new · ${full(
              report.kpis.returning_visitors
            )} returning`}
            icon="users"
            color={COLORS.visitors}
            soft="rgba(96, 165, 250, 0.13)"
            glow="rgba(96, 165, 250, 0.16)"
            delta={report.comparison.unique_visitors}
            spark={series.map((p) => p.visitors)}
          />
          <KpiCard
            label="Sessions"
            value={compact(report.kpis.sessions)}
            hint={`${report.kpis.pages_per_session.toFixed(2)} pages / session`}
            icon="mouse"
            color={COLORS.sessions}
            soft="rgba(167, 139, 250, 0.13)"
            glow="rgba(167, 139, 250, 0.16)"
            delta={report.comparison.sessions}
            spark={series.map((p) => p.sessions)}
          />
          <KpiCard
            label="Bounce rate"
            value={percent(report.kpis.bounce_rate)}
            hint="Lower is better"
            icon="activity"
            color="#fbbf24"
            soft="rgba(251, 191, 36, 0.13)"
            glow="rgba(251, 191, 36, 0.14)"
            delta={report.comparison.bounce_rate}
            deltaSuffix="pp"
            positiveIsGood={false}
            spark={series.map((p) => p.bounce_rate)}
          />
          <KpiCard
            label="Avg. session"
            value={formatDuration(report.kpis.avg_session_seconds)}
            hint="Time on site"
            icon="clock"
            color="#fb7185"
            soft="rgba(251, 113, 133, 0.13)"
            glow="rgba(251, 113, 133, 0.14)"
            delta={report.comparison.avg_session_seconds}
            spark={series.map((p) => p.avg_session_seconds)}
          />
          <KpiCard
            label="Pages / session"
            value={report.kpis.pages_per_session.toFixed(2)}
            hint="Visit depth"
            icon="layers"
            color="#34d399"
            soft="rgba(52, 211, 153, 0.13)"
            glow="rgba(52, 211, 153, 0.14)"
            delta={report.comparison.pages_per_session}
            spark={series.map((p) => p.pages_per_session)}
          />
        </div>
      </section>

      {}
      <section
        id="traffic"
        className="ag-grid main ag-mt-20"
        style={{ scrollMarginTop: 78 }}
      >
        <div className="ag-card">
          <div className="ag-card-head">
            <div>
              <h3 className="ag-card-title">Traffic overview</h3>
              <p className="ag-card-sub">
                {rangeLabel} ·{" "}
                {interval === "hour"
                  ? "hourly"
                  : interval === "month"
                  ? "monthly"
                  : "daily"}{" "}
                breakdown
              </p>
            </div>
            <div className="ag-card-actions">
              <div className="ag-toggle-group">
                <button
                  type="button"
                  className={`ag-toggle ${visible.pageviews ? "is-on" : ""}`}
                  onClick={() => toggleMetric("pageviews")}
                >
                  <i
                    className="ag-dot"
                    style={{ background: COLORS.pageviews }}
                  />
                  Views
                </button>
                <button
                  type="button"
                  className={`ag-toggle ${visible.visitors ? "is-on" : ""}`}
                  onClick={() => toggleMetric("visitors")}
                >
                  <i
                    className="ag-dot"
                    style={{ background: COLORS.visitors }}
                  />
                  Visitors
                </button>
                <button
                  type="button"
                  className={`ag-toggle ${visible.sessions ? "is-on" : ""}`}
                  onClick={() => toggleMetric("sessions")}
                >
                  <i
                    className="ag-dot"
                    style={{ background: COLORS.sessions }}
                  />
                  Sessions
                </button>
                <button
                  type="button"
                  className={`ag-toggle ${compare ? "is-on" : ""}`}
                  onClick={() => setCompare((v) => !v)}
                >
                  <i
                    className="ag-dot"
                    style={{ background: COLORS.previous }}
                  />
                  Compare
                </button>
              </div>
            </div>
          </div>
          <div className="ag-card-body">
            {totalViews === 0 ? (
              <EmptyState
                title="No traffic in this period"
                text="Try widening the date range or check that the analytics tracker is installed on the public pages."
              />
            ) : (
              <>
                <div className="ag-chart tall">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={series}
                      margin={{ top: 8, right: 6, left: -12, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="agGradViews"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={COLORS.pageviews}
                            stopOpacity={0.28}
                          />
                          <stop
                            offset="100%"
                            stopColor={COLORS.pageviews}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--line)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="t"
                        tickFormatter={(value: string) =>
                          formatTick(value, interval)
                        }
                        tick={{ fill: "var(--muted)", fontSize: 10.5 }}
                        axisLine={false}
                        tickLine={false}
                        minTickGap={28}
                      />
                      <YAxis
                        tickFormatter={(value: number) => compact(value)}
                        tick={{ fill: "var(--muted)", fontSize: 10.5 }}
                        axisLine={false}
                        tickLine={false}
                        width={46}
                        allowDecimals={false}
                      />
                      <Tooltip
                        cursor={{
                          stroke: "var(--line-9)",
                          strokeDasharray: "4 4",
                        }}
                        content={(props: any) => (
                          <ChartTooltip {...props} interval={interval} />
                        )}
                      />
                      {visible.pageviews && (
                        <Area
                          type="monotone"
                          dataKey="pageviews"
                          name="Pageviews"
                          stroke={COLORS.pageviews}
                          strokeWidth={2.2}
                          fill="url(#agGradViews)"
                          dot={false}
                          activeDot={{ r: 4, strokeWidth: 0 }}
                        />
                      )}
                      {visible.visitors && (
                        <Line
                          type="monotone"
                          dataKey="visitors"
                          name="Visitors"
                          stroke={COLORS.visitors}
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4, strokeWidth: 0 }}
                        />
                      )}
                      {visible.sessions && (
                        <Line
                          type="monotone"
                          dataKey="sessions"
                          name="Sessions"
                          stroke={COLORS.sessions}
                          strokeWidth={2}
                          strokeDasharray="5 4"
                          dot={false}
                          activeDot={{ r: 4, strokeWidth: 0 }}
                        />
                      )}
                      {compare && (
                        <Line
                          type="monotone"
                          dataKey="prev_pageviews"
                          name="Previous period"
                          stroke={COLORS.previous}
                          strokeWidth={1.4}
                          strokeDasharray="3 5"
                          dot={false}
                        />
                      )}
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="ag-legend ag-mt-16">
                  <span className="ag-legend-item">
                    <i
                      className="ag-dot"
                      style={{ background: COLORS.pageviews }}
                    />
                    Pageviews
                  </span>
                  <span className="ag-legend-item">
                    <i
                      className="ag-dot"
                      style={{ background: COLORS.visitors }}
                    />
                    Unique visitors
                  </span>
                  <span className="ag-legend-item">
                    <i
                      className="ag-dot"
                      style={{ background: COLORS.sessions }}
                    />
                    Sessions
                  </span>
                  {compare && (
                    <span className="ag-legend-item">
                      <i
                        className="ag-dot"
                        style={{ background: COLORS.previous }}
                      />
                      Previous period
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="ag-card">
          <div className="ag-card-head">
            <div>
              <h3 className="ag-card-title">Traffic sources</h3>
              <p className="ag-card-sub">Session acquisition</p>
            </div>
          </div>
          <div className="ag-card-body">
            {report.kpis.sessions === 0 ? (
              <EmptyState
                title="No sessions recorded"
                text="Traffic source attribution will appear as soon as visitors arrive."
              />
            ) : (
              <>
                <div className="ag-donut-wrap">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={report.sources}
                        dataKey="sessions"
                        nameKey="name"
                        innerRadius={62}
                        outerRadius={86}
                        paddingAngle={3}
                        cornerRadius={6}
                        stroke="none"
                      >
                        {report.sources.map((row, index) => (
                          <Cell
                            key={row.name}
                            fill={PALETTE[index % PALETTE.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={(props: any) => <PieTooltip {...props} />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="ag-donut-center">
                    <strong className="ag-num">{compact(report.kpis.sessions)}</strong>
                    <span>Sessions</span>
                  </div>
                </div>
                <div className="ag-src-list">
                  {report.sources.map((row, index) => (
                    <div className="ag-src-row" key={row.name}>
                      <span className="ag-src-name">
                        <i
                          className="ag-dot"
                          style={{ background: PALETTE[index % PALETTE.length] }}
                        />
                        <span>{sourceHost(row.name)}</span>
                      </span>
                      <span className="ag-src-meta ag-num">
                        {compact(row.sessions)}
                        <em>{percent(row.share)}</em>
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {}
      <section
        id="audience"
        className="ag-grid audience ag-mt-20"
        style={{ scrollMarginTop: 78 }}
      >
        <div className="ag-card">
          <div className="ag-card-head">
            <div>
              <h3 className="ag-card-title">Top countries</h3>
              <p className="ag-card-sub">Visitors by location</p>
            </div>
            <span className="ag-tag">
              <Icon name="globe" size={11} />
              {report.countries.length} regions
            </span>
          </div>
          <div className="ag-card-body">
            {report.countries.length === 0 ? (
              <EmptyState
                title="No location data"
                text="Location is resolved from the edge network on production."
              />
            ) : (
              <div className="ag-bars">
                {report.countries.map((row, index) => (
                  <div className="ag-bar-row" key={row.name}>
                    <div className="ag-bar-head">
                      <span className="label">
                        <i
                          className="ag-dot"
                          style={{ background: PALETTE[index % PALETTE.length] }}
                        />
                        <span>{countryName(row.name)}</span>
                      </span>
                      <span className="value ag-num">
                        {full(row.visitors)}
                        <em>{percent(row.share)}</em>
                      </span>
                    </div>
                    <div className="ag-bar-track">
                      <div
                        className="ag-bar-fill"
                        style={{
                          width: `${Math.max(2, row.share)}%`,
                          background: PALETTE[index % PALETTE.length],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="ag-card">
          <div className="ag-card-head">
            <div>
              <h3 className="ag-card-title">Browsers</h3>
              <p className="ag-card-sub">Visitor browser share</p>
            </div>
            <span className="ag-insight-icon" style={{ width: 28, height: 28 }}>
              <Icon name="monitor" size={14} />
            </span>
          </div>
          <div className="ag-card-body">
            {report.browsers.length === 0 ? (
              <EmptyState
                title="No browser data"
                text="Browser details are parsed from the visitor user agent."
              />
            ) : (
              <div className="ag-bars">
                {report.browsers.map((row, index) => (
                  <div className="ag-bar-row" key={row.name}>
                    <div className="ag-bar-head">
                      <span className="label">
                        <i
                          className="ag-dot"
                          style={{ background: PALETTE[index % PALETTE.length] }}
                        />
                        <span>{row.name}</span>
                      </span>
                      <span className="value ag-num">
                        {full(row.visitors)}
                        <em>{percent(row.share)}</em>
                      </span>
                    </div>
                    <div className="ag-bar-track">
                      <div
                        className="ag-bar-fill"
                        style={{
                          width: `${Math.max(2, row.share)}%`,
                          background: PALETTE[index % PALETTE.length],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="ag-card">
          <div className="ag-card-head">
            <div>
              <h3 className="ag-card-title">Operating systems</h3>
              <p className="ag-card-sub">Visitor platform share</p>
            </div>
            <span className="ag-insight-icon" style={{ width: 28, height: 28 }}>
              <Icon name="layers" size={14} />
            </span>
          </div>
          <div className="ag-card-body">
            {report.os.length === 0 ? (
              <EmptyState
                title="No platform data"
                text="Operating system details are parsed from the user agent."
              />
            ) : (
              <div className="ag-bars">
                {report.os.map((row, index) => (
                  <div className="ag-bar-row" key={row.name}>
                    <div className="ag-bar-head">
                      <span className="label">
                        <i
                          className="ag-dot"
                          style={{ background: PALETTE[index % PALETTE.length] }}
                        />
                        <span>{row.name}</span>
                      </span>
                      <span className="value ag-num">
                        {full(row.visitors)}
                        <em>{percent(row.share)}</em>
                      </span>
                    </div>
                    <div className="ag-bar-track">
                      <div
                        className="ag-bar-fill"
                        style={{
                          width: `${Math.max(2, row.share)}%`,
                          background: PALETTE[index % PALETTE.length],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {}
      <section
        id="behaviour"
        className="ag-grid two ag-mt-20"
        style={{ scrollMarginTop: 78 }}
      >
        <div className="ag-card">
          <div className="ag-card-head">
            <div>
              <h3 className="ag-card-title">Activity by hour</h3>
              <p className="ag-card-sub">Aggregated pageviews across the period</p>
            </div>
            <span className="ag-legend">
              <span className="ag-legend-item">
                <i
                  className="ag-dot"
                  style={{ background: COLORS.pageviews }}
                />
                Views
              </span>
            </span>
          </div>
          <div className="ag-card-body">
            {totalViews === 0 ? (
              <EmptyState
                title="No hourly activity"
                text="Hourly distribution will appear once visitors are tracked."
              />
            ) : (
              <div className="ag-chart short">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={report.hourly}
                    margin={{ top: 8, right: 6, left: -12, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="agHourBars" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={COLORS.pageviews} stopOpacity={0.95} />
                        <stop offset="100%" stopColor={COLORS.pageviews} stopOpacity={0.35} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--line)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="hour"
                      tickFormatter={(value: number) =>
                        `${String(value).padStart(2, "0")}:00`
                      }
                      tick={{ fill: "var(--muted)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      interval={2}
                    />
                    <YAxis
                      tickFormatter={(value: number) => compact(value)}
                      tick={{ fill: "var(--muted)", fontSize: 10.5 }}
                      axisLine={false}
                      tickLine={false}
                      width={42}
                      allowDecimals={false}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
                      content={(props: any) => (
                        <HourTooltip {...props} />
                      )}
                    />
                    <Bar
                      dataKey="pageviews"
                      name="Pageviews"
                      fill="url(#agHourBars)"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={22}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        <div className="ag-card">
          <div className="ag-card-head">
            <div>
              <h3 className="ag-card-title">Device split</h3>
              <p className="ag-card-sub">Visitors by device type</p>
            </div>
          </div>
          <div className="ag-card-body">
            {report.devices.length === 0 ? (
              <EmptyState
                title="No device data"
                text="Device classification is derived from the visitor user agent."
              />
            ) : (
              <div className="ag-grid two" style={{ gap: 12, alignItems: "center" }}>
                <div className="ag-donut-wrap" style={{ height: 196 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={report.devices}
                        dataKey="visitors"
                        nameKey="name"
                        innerRadius={54}
                        outerRadius={76}
                        paddingAngle={3}
                        cornerRadius={6}
                        stroke="none"
                      >
                        {report.devices.map((row, index) => (
                          <Cell
                            key={row.name}
                            fill={PALETTE[index % PALETTE.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={(props: any) => <PieTooltip {...props} />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="ag-donut-center">
                    <strong className="ag-num">
                      {compact(report.kpis.unique_visitors)}
                    </strong>
                    <span>Visitors</span>
                  </div>
                </div>
                <div className="ag-bars">
                  {report.devices.map((row, index) => (
                    <div className="ag-bar-row" key={row.name}>
                      <div className="ag-bar-head">
                        <span className="label">
                          <i
                            className="ag-dot"
                            style={{
                              background: PALETTE[index % PALETTE.length],
                            }}
                          />
                          <span>{row.name}</span>
                        </span>
                        <span className="value ag-num">
                          {percent(row.share)}
                        </span>
                      </div>
                      <div className="ag-bar-track">
                        <div
                          className="ag-bar-fill"
                          style={{
                            width: `${Math.max(2, row.share)}%`,
                            background: PALETTE[index % PALETTE.length],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {}
      <section
        className="ag-grid main ag-mt-20"
        style={{ scrollMarginTop: 78 }}
      >
        <div className="ag-card" id="content" style={{ scrollMarginTop: 78 }}>
          <div className="ag-card-head">
            <div>
              <h3 className="ag-card-title">Top pages</h3>
              <p className="ag-card-sub">
                {filteredPages.length} pages · click a column to sort
              </p>
            </div>
            <div className="ag-card-actions">
              <label className="ag-search">
                <Icon name="search" size={14} />
                <input
                  type="search"
                  value={pageSearch}
                  onChange={(event) => setPageSearch(event.target.value)}
                  placeholder="Filter pages…"
                  aria-label="Filter pages"
                />
              </label>
            </div>
          </div>
          <div className="ag-card-body flush">
            {report.top_pages.length === 0 ? (
              <EmptyState
                title="No page data"
                text="Page-level performance will appear after the first visit."
              />
            ) : visiblePages.length === 0 ? (
              <EmptyState
                title="No matching pages"
                text="Try a different search term or clear the filter."
              />
            ) : (
              <div className="ag-table-wrap">
                <table className="ag-table">
                  <thead>
                    <tr>
                      <th style={{ width: 46 }}>#</th>
                      <th>
                        <button
                          type="button"
                          className={`ag-sort ${
                            sort.key === "path" ? "is-active" : ""
                          }`}
                          onClick={() => toggleSort("path")}
                        >
                          Page
                          <Icon
                            name={sort.dir === "asc" ? "arrowUp" : "arrowDown"}
                            size={11}
                          />
                        </button>
                      </th>
                      <th className="num">
                        <button
                          type="button"
                          className={`ag-sort ${
                            sort.key === "pageviews" ? "is-active" : ""
                          }`}
                          onClick={() => toggleSort("pageviews")}
                        >
                          Views
                          <Icon
                            name={sort.dir === "asc" ? "arrowUp" : "arrowDown"}
                            size={11}
                          />
                        </button>
                      </th>
                      <th className="num">
                        <button
                          type="button"
                          className={`ag-sort ${
                            sort.key === "visitors" ? "is-active" : ""
                          }`}
                          onClick={() => toggleSort("visitors")}
                        >
                          Visitors
                          <Icon
                            name={sort.dir === "asc" ? "arrowUp" : "arrowDown"}
                            size={11}
                          />
                        </button>
                      </th>
                      <th className="num">
                        <button
                          type="button"
                          className={`ag-sort ${
                            sort.key === "sessions" ? "is-active" : ""
                          }`}
                          onClick={() => toggleSort("sessions")}
                        >
                          Sessions
                          <Icon
                            name={sort.dir === "asc" ? "arrowUp" : "arrowDown"}
                            size={11}
                          />
                        </button>
                      </th>
                      <th className="num">
                        <button
                          type="button"
                          className={`ag-sort ${
                            sort.key === "bounce_rate" ? "is-active" : ""
                          }`}
                          onClick={() => toggleSort("bounce_rate")}
                        >
                          Bounce
                          <Icon
                            name={sort.dir === "asc" ? "arrowUp" : "arrowDown"}
                            size={11}
                          />
                        </button>
                      </th>
                      <th>
                        <button
                          type="button"
                          className={`ag-sort ${
                            sort.key === "share" ? "is-active" : ""
                          }`}
                          onClick={() => toggleSort("share")}
                        >
                          Share
                          <Icon
                            name={sort.dir === "asc" ? "arrowUp" : "arrowDown"}
                            size={11}
                          />
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {visiblePages.map((row, index) => (
                      <tr key={row.path}>
                        <td>
                          <span
                            className={`ag-rank ${index < 3 ? "is-top" : ""}`}
                          >
                            {index + 1}
                          </span>
                        </td>
                        <td>
                          <span className="ag-path" title={row.path}>
                            {row.path}
                          </span>
                        </td>
                        <td className="num ag-num">{full(row.pageviews)}</td>
                        <td className="num ag-num">{full(row.visitors)}</td>
                        <td className="num ag-num">{full(row.sessions)}</td>
                        <td className="num ag-num">
                          {percent(row.bounce_rate)}
                        </td>
                        <td>
                          <span className="ag-share">
                            <span className="ag-share-track">
                              <span
                                className="ag-share-fill"
                                style={{ width: `${Math.max(2, row.share)}%` }}
                              />
                            </span>
                            <em>{percent(row.share)}</em>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {filteredPages.length > 10 && (
            <div
              style={{
                padding: "12px 19px",
                borderTop: "1px solid var(--line)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                type="button"
                className="ag-btn"
                onClick={() => setShowAllPages((value) => !value)}
              >
                {showAllPages
                  ? "Show top 10"
                  : `Show all ${filteredPages.length} pages`}
              </button>
            </div>
          )}
        </div>

        <div className="ag-card" id="live" style={{ scrollMarginTop: 78 }}>
          <div className="ag-card-head">
            <div>
              <h3 className="ag-card-title">Recent activity</h3>
              <p className="ag-card-sub">Latest pageviews in the period</p>
            </div>
            <span
              className="ag-live-pill"
              style={{ background: "var(--success-soft)", color: "var(--success-2)", borderColor: "var(--soft-line)" }}
            >
              <span className="ag-pulse" />
              {full(report.meta.live_visitors)} online
            </span>
          </div>
          <div className="ag-card-body">
            {report.recent.length === 0 ? (
              <EmptyState
                title="No recent activity"
                text="New pageviews will stream into this panel in real time."
              />
            ) : (
              <div className="ag-recent">
                {report.recent.slice(0, 10).map((row) => (
                  <div className="ag-recent-row" key={`${row.sessionId}-${row.visitedAt}`}>
                    <span className="ag-recent-time ag-num">
                      {timeAgo(row.visitedAt)}
                    </span>
                    <span className="ag-recent-main">
                      <span className="ag-path" title={row.path}>
                        {row.path}
                      </span>
                      <span className="ag-recent-source">
                        {row.source}
                        {row.country ? ` · ${countryName(row.country)}` : ""}
                      </span>
                    </span>
                    <span className="ag-recent-side">
                      <span className="ag-tag">{row.device}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function HourTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<Record<string, unknown>>;
  label?: number;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0].payload as { pageviews: number; visitors: number };
  return (
    <div className="ag-tooltip">
      <div className="ag-tooltip-title">
        {String(label ?? 0).padStart(2, "0")}:00 –{" "}
        {String(((Number(label) || 0) + 1) % 24).padStart(2, "0")}:00
      </div>
      <div className="ag-tooltip-row">
        <span>
          <i className="ag-dot" style={{ background: COLORS.pageviews }} />
          Pageviews
        </span>
        <b>{full(point.pageviews)}</b>
      </div>
      <div className="ag-tooltip-row">
        <span>
          <i className="ag-dot" style={{ background: COLORS.visitors }} />
          Visitors
        </span>
        <b>{full(point.visitors)}</b>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading analytics">
      <div className="ag-insights">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="ag-skeleton" key={index} style={{ height: 82 }} />
        ))}
      </div>
      <div className="ag-grid kpis ag-mt-16">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="ag-skeleton ag-skel-card" key={index} />
        ))}
      </div>
      <div className="ag-grid main ag-mt-20">
        <div className="ag-skeleton ag-skel-chart" />
        <div className="ag-skeleton ag-skel-chart" />
      </div>
      <div className="ag-grid audience ag-mt-20">
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="ag-skeleton ag-skel-chart" key={index} />
        ))}
      </div>
    </div>
  );
}

const NAV_ITEMS: Array<{ id: string; label: string; icon: IconName }> = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "traffic", label: "Traffic", icon: "chart" },
  { id: "audience", label: "Audience", icon: "users" },
  { id: "behaviour", label: "Behaviour", icon: "activity" },
  { id: "content", label: "Content", icon: "file" },
  { id: "live", label: "Live activity", icon: "zap" },
];

function Sidebar({ online }: { online: number }) {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.4, 0.75] }
    );

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="ag-sidebar">
      <div className="ag-brand">
        <span className="ag-brand-badge">AB</span>
        <span className="ag-brand-text">
          <strong>AmatisBerry</strong>
          <span>Analytics</span>
        </span>
      </div>

      <nav className="ag-nav" aria-label="Report sections">
        <div className="ag-nav-label">Report</div>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`ag-nav-link ${active === item.id ? "is-active" : ""}`}
          >
            <Icon name={item.icon} size={16} />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="ag-sidebar-footer">
        <div className="ag-sidebar-meta">
          <span>Data source</span>
          <span>Self-hosted</span>
        </div>
        <div className="ag-sidebar-meta">
          <span className="ag-live-pill">
            <span className="ag-pulse" />
            Live
          </span>
          <span className="ag-num">{full(online)} online</span>
        </div>
      </div>
    </aside>
  );
}

export default function AdminAnalyticsPage() {
  const [rangeKey, setRangeKey] = useState<RangeKey>("30d");
  const [customStart, setCustomStart] = useState(() =>
    toInputDate(new Date(Date.now() - 29 * DAY))
  );
  const [customEnd, setCustomEnd] = useState(() => toInputDate(new Date()));

  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [live, setLive] = useState(true);

  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const load = useCallback(
    async (options?: { spinner?: boolean }) => {
      const { start, end } = getRange(rangeKey, customStart, customEnd);

      if (start.getTime() > end.getTime()) {
        setError("The start date must be before the end date.");
        setInitialLoading(false);
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const requestId = ++requestIdRef.current;

      if (options?.spinner) setRefreshing(true);

      try {
        const params = new URLSearchParams({
          start: start.toISOString(),
          end: end.toISOString(),
        });
        const response = await fetch(`${API}?${params.toString()}`, {
          method: "GET",
          headers: { Accept: "application/json" },
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(
            payload?.error || `Analytics request failed (${response.status})`
          );
        }

        const report = (await response.json()) as AnalyticsResponse;
        if (requestId !== requestIdRef.current) return;
        setData(report);
        setLastUpdated(new Date());
        setError(null);
      } catch (caught) {
        if ((caught as Error)?.name === "AbortError") return;
        if (requestId !== requestIdRef.current) return;
        setError(
          caught instanceof Error ? caught.message : "Failed to load analytics"
        );
      } finally {
        if (requestId === requestIdRef.current) {
          setRefreshing(false);
          setInitialLoading(false);
        }
      }
    },
    [rangeKey, customStart, customEnd]
  );

  useEffect(() => {
    setInitialLoading(true);
    load();
    return () => abortRef.current?.abort();
  }, [load]);

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") load();
    }, REFRESH_MS);
    return () => window.clearInterval(timer);
  }, [live, load]);

  const rangeLabel =
    rangeKey === "custom"
      ? `${customStart} → ${customEnd}`
      : RANGE_LABELS[rangeKey];

  const handleExport = () => {
    if (data) downloadCsv(data);
  };

  return (
    <div className="ag-shell">
      <Sidebar online={data?.meta.live_visitors ?? 0} />

      <div className="ag-main">
        <header className="ag-topbar">
          <div className="ag-topbar-inner">
            <div className="ag-crumbs">
              <span>Admin</span>
              <span className="sep">/</span>
              <strong>Analytics</strong>
            </div>

            <div className="ag-topbar-actions">
              <div className="ag-range" role="group" aria-label="Date range">
                {RANGE_OPTIONS.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    className={`ag-range-btn ${
                      rangeKey === option.key ? "is-active" : ""
                    }`}
                    onClick={() => setRangeKey(option.key)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {rangeKey === "custom" && (
                <div className="ag-custom-range">
                  <input
                    type="date"
                    className="ag-date-input"
                    value={customStart}
                    max={customEnd}
                    onChange={(event) => setCustomStart(event.target.value)}
                    aria-label="Start date"
                  />
                  <span style={{ color: "var(--muted)", fontSize: 11 }}>to</span>
                  <input
                    type="date"
                    className="ag-date-input"
                    value={customEnd}
                    min={customStart}
                    max={toInputDate(new Date())}
                    onChange={(event) => setCustomEnd(event.target.value)}
                    aria-label="End date"
                  />
                </div>
              )}

              <button
                type="button"
                className="ag-btn is-icon"
                title={live ? "Pause auto-refresh" : "Resume auto-refresh"}
                aria-label={live ? "Pause auto-refresh" : "Resume auto-refresh"}
                onClick={() => setLive((value) => !value)}
                style={
                  live
                    ? { color: "var(--primary)", borderColor: "var(--line-strong)" }
                    : undefined
                }
              >
                <Icon name="zap" size={15} />
              </button>

              <button
                type="button"
                className="ag-btn is-icon"
                title="Refresh data"
                aria-label="Refresh data"
                onClick={() => load({ spinner: true })}
                disabled={refreshing}
              >
                <Icon
                  name="refresh"
                  size={15}
                  className={refreshing ? "ag-spin" : undefined}
                />
              </button>

              <button
                type="button"
                className="ag-btn"
                onClick={handleExport}
                disabled={!data}
              >
                <Icon name="download" size={15} />
                Export CSV
              </button>

              <button
                type="button"
                className="ag-btn is-icon"
                title="Print report"
                aria-label="Print report"
                onClick={() => window.print()}
              >
                <Icon name="printer" size={15} />
              </button>
            </div>
          </div>
        </header>

        <main className="ag-content">
          <div className="ag-page-head">
            <div>
              <span className="ag-eyebrow">AmatisBerry · Insights</span>
              <h1 className="ag-page-title">Analytics Report</h1>
              <p className="ag-page-sub">
                Performance, acquisition and audience behaviour for{" "}
                <strong>{rangeLabel.toLowerCase()}</strong>, benchmarked against
                the previous period.
              </p>
            </div>
            <div className="ag-page-meta">
              <span className="ag-online">
                <span className="ag-pulse" />
                Live · {full(data?.meta.live_visitors ?? 0)} online
              </span>
              <span className="dot-sep" />
              <span>
                {lastUpdated
                  ? `Updated ${lastUpdated.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}`
                  : "Connecting…"}
              </span>
              {data?.meta.sampled && (
                <>
                  <span className="dot-sep" />
                  <span title="Only the most recent 50,000 events were analysed">
                    Sampled dataset
                  </span>
                </>
              )}
            </div>
          </div>

          {error && (
            <div className="ag-error-banner" role="alert">
              <span>{error}</span>
              <button type="button" onClick={() => load({ spinner: true })}>
                Retry
              </button>
            </div>
          )}

          {initialLoading && !data ? (
            <DashboardSkeleton />
          ) : !data ? (
            <div className="ag-card">
              <EmptyState
                title="Analytics unavailable"
                text="The report could not be loaded. Check the analytics API and try again."
              />
            </div>
          ) : (
            <ReportView report={data} rangeLabel={rangeLabel} />
          )}

          <footer className="ag-footer">
            <span>
              Self-hosted analytics · {data ? full(data.kpis.pageviews) : 0}{" "}
              pageviews · {data ? full(data.kpis.unique_visitors) : 0} visitors
            </span>
            <span className="ag-live-pill">
              <span className="ag-pulse" />
              {live ? "Auto-refresh every 30s" : "Auto-refresh paused"}
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}

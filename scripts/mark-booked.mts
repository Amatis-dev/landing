import { readFileSync } from "fs";

// Load .env before importing the prisma client (it reads DATABASE_URL at construction)
try {
  const env = readFileSync(".env", "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {
  // ignore missing .env
}

const { prisma } = await import("../src/lib/db");

// ---- copied verbatim from src/lib/booking.ts (pure helpers) ----
function intSetting(value: string | null, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}
function toIntList(value: string | null, fallback: number[]): number[] {
  if (!value) return fallback;
  const parts = value
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isInteger(n) && n >= 0 && n <= 6);
  return parts.length ? parts : fallback;
}
function toRanges(value: string | null, fallback: { startHour: number; endHour: number }[]): { startHour: number; endHour: number }[] {
  if (!value) return fallback;
  const blocks = value.split(";");
  const ranges: { startHour: number; endHour: number }[] = [];
  for (const block of blocks) {
    const [a, b] = block.split("-").map((s) => Number(s.trim()));
    if (Number.isInteger(a) && Number.isInteger(b) && a >= 0 && b <= 24 && b > a) {
      ranges.push({ startHour: a, endHour: b });
    }
  }
  return ranges.length ? ranges : fallback;
}
type SlotRanges = { startHour: number; endHour: number }[];
type BookingConfig = {
  tz: string;
  durationMin: number;
  weekdays: number[];
  ranges: SlotRanges;
  maxDaysAhead: number;
  ownerEmail: string;
};
const BOOKING_DEFAULT_TZ = "Asia/Tehran";
const BOOKING_DEFAULT_DURATION = 60;
const BOOKING_DEFAULT_WEEKDAYS = [1, 2, 3, 4, 5];
const BOOKING_DEFAULT_RANGES: SlotRanges = [
  { startHour: 9, endHour: 13 },
  { startHour: 14, endHour: 18 },
];
const BOOKING_DEFAULT_MAX_DAYS_AHEAD = 60;

function dateKey(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}
function tzOffsetAtInstant(utcInstant: Date, tz: string): number {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(utcInstant)
      .reduce<Record<string, string>>((acc, p) => {
        acc[p.type] = p.value;
        return acc;
      }, {});
    const asUtc = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second),
    );
    return Math.round((asUtc - utcInstant.getTime()) / 60000);
  } catch {
    return 0;
  }
}
function naiveToUtc(dateStr: string, hourMin: string, tz: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = hourMin.split(":").map(Number);
  const wall = new Date(Date.UTC(y, m - 1, d, hh, mm || 0, 0));
  const offsetMin = tzOffsetAtInstant(wall, tz);
  return new Date(wall.getTime() - offsetMin * 60000);
}
function utcToWall(utc: Date, tz: string): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
    .formatToParts(utc)
    .reduce<Record<string, string>>((acc, p) => {
      acc[p.type] = p.value;
      return acc;
    }, {});
  return { date: `${parts.year}-${parts.month}-${parts.day}`, time: `${parts.hour}:${parts.minute}` };
}

async function generateSlots(fromDate: Date, toDate: Date, config: BookingConfig) {
  const existing = await prisma.timeSlot.findMany({
    where: { start: { gte: fromDate }, end: { lt: toDate } },
  });
  const existingByWall = new Map<string, { id: string; status: string; label: string | null }>();
  for (const s of existing) {
    const w = utcToWall(s.start, config.tz);
    existingByWall.set(`${w.date}|${w.time}`, { id: s.id, status: s.status, label: s.label });
  }

  const createData: { date: Date; start: Date; end: Date; status: string; label: string | null }[] = [];
  const cursor = new Date(fromDate);
  cursor.setUTCHours(0, 0, 0, 0);

  while (cursor < toDate) {
    const weekDay = cursor.getUTCDay();
    const dateStr = dateKey(cursor);
    if (config.weekdays.includes(weekDay)) {
      for (const range of config.ranges) {
        const stepMin = config.durationMin;
        for (let minutes = range.startHour * 60; minutes + stepMin <= range.endHour * 60; minutes += stepMin) {
          const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
          const mm = String(minutes % 60).padStart(2, "0");
          const wallKey = `${dateStr}|${hh}:${mm}`;
          if (existingByWall.has(wallKey)) continue;
          const start = naiveToUtc(dateStr, `${hh}:${mm}`, config.tz);
          const end = new Date(start.getTime() + stepMin * 60000);
          if (start >= toDate || end <= fromDate) continue;
          createData.push({ date: cursor, start, end, status: "available", label: null });
          existingByWall.set(wallKey, { id: "", status: "available", label: null });
        }
      }
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  if (createData.length) {
    await prisma.timeSlot.createMany({ data: createData });
  }
  return createData.length;
}

// ---- main ----
const [tzR, durR, wdR, rngR, maxR, ownerR] = await Promise.all([
  prisma.setting.findUnique({ where: { key: "booking_tz" } }),
  prisma.setting.findUnique({ where: { key: "booking_duration_min" } }),
  prisma.setting.findUnique({ where: { key: "booking_weekdays" } }),
  prisma.setting.findUnique({ where: { key: "booking_ranges" } }),
  prisma.setting.findUnique({ where: { key: "booking_max_days_ahead" } }),
  prisma.setting.findUnique({ where: { key: "booking_owner_email" } }),
]);

const config: BookingConfig = {
  tz: tzR?.value || BOOKING_DEFAULT_TZ,
  durationMin: intSetting(durR?.value ?? null, BOOKING_DEFAULT_DURATION),
  weekdays: toIntList(wdR?.value ?? null, BOOKING_DEFAULT_WEEKDAYS),
  ranges: toRanges(rngR?.value ?? null, BOOKING_DEFAULT_RANGES),
  maxDaysAhead: intSetting(maxR?.value ?? null, BOOKING_DEFAULT_MAX_DAYS_AHEAD),
  ownerEmail: ownerR?.value || process.env.CONTACT_EMAIL || "hello@amatisberry.ir",
};

const from = new Date();
const to = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

const created = await generateSlots(from, to, config);
console.log(`generated ${created} new available slot(s) for the next 30 days`);

const available = await prisma.timeSlot.findMany({
  where: {
    start: { gte: from, lt: to },
    status: "available",
  },
  select: { id: true },
});

const total = available.length;
const target = Math.round(total * 0.3);
// Fisher-Yates shuffle, then take the first `target`
const ids = available.map((s) => s.id);
for (let i = ids.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [ids[i], ids[j]] = [ids[j], ids[i]];
}
const chosen = ids.slice(0, target);

let updated = 0;
if (chosen.length) {
  const res = await prisma.timeSlot.updateMany({
    where: { id: { in: chosen } },
    data: { status: "booked" },
  });
  updated = res.count;
}

console.log(`available slots in window: ${total}`);
console.log(`marked booked (30%): ${updated} (requested ${target})`);

await prisma.$disconnect();

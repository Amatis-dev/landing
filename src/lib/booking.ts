import prisma from "@/lib/db";
import { getSetting } from "@/lib/settings";

export type SlotRanges = { startHour: number; endHour: number }[];
export type BookingConfig = {
  tz: string;
  durationMin: number;
  weekdays: number[];
  ranges: SlotRanges;
  maxDaysAhead: number;
  ownerEmail: string;
};

export const BOOKING_DEFAULT_TZ = "Asia/Tehran";
export const BOOKING_DEFAULT_DURATION = 60;
export const BOOKING_DEFAULT_WEEKDAYS = [1, 2, 3, 4, 5]; // Mon..Fri
export const BOOKING_DEFAULT_RANGES: SlotRanges = [
  { startHour: 9, endHour: 12 },
  { startHour: 13, endHour: 17 },
];
export const BOOKING_DEFAULT_MAX_DAYS_AHEAD = 60;

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

function toRanges(value: string | null, fallback: SlotRanges): SlotRanges {
  if (!value) return fallback;
  const blocks = value.split(";");
  const ranges: SlotRanges = [];
  for (const block of blocks) {
    const [a, b] = block.split("-").map((s) => Number(s.trim()));
    if (Number.isInteger(a) && Number.isInteger(b) && a >= 0 && b <= 24 && b > a) {
      ranges.push({ startHour: a, endHour: b });
    }
  }
  return ranges.length ? ranges : fallback;
}

export async function loadBookingConfig(): Promise<BookingConfig> {
  const [tz, duration, weekdaysRaw, rangesRaw, maxAheadRaw, owner] = await Promise.all([
    getSetting("booking_tz"),
    getSetting("booking_duration_min"),
    getSetting("booking_weekdays"),
    getSetting("booking_ranges"),
    getSetting("booking_max_days_ahead"),
    getSetting("booking_owner_email"),
  ]);

  return {
    tz: tz || BOOKING_DEFAULT_TZ,
    durationMin: intSetting(duration, BOOKING_DEFAULT_DURATION),
    weekdays: toIntList(weekdaysRaw, BOOKING_DEFAULT_WEEKDAYS),
    ranges: toRanges(rangesRaw, BOOKING_DEFAULT_RANGES),
    maxDaysAhead: intSetting(maxAheadRaw, BOOKING_DEFAULT_MAX_DAYS_AHEAD),
    ownerEmail:
      owner ||
      (await getSetting("contact_email")) ||
      process.env.CONTACT_EMAIL ||
      "hello@amatisberry.ir",
  };
}

function dateKey(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

/**
 * Convert a naive wall-clock datetime (YYYY-MM-DD HH:MM) in `tz` into a UTC Date.
 * Uses Intl to resolve the actual tz offset (DST-aware).
 */
export function naiveToUtc(dateStr: string, hourMin: string, tz: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = hourMin.split(":").map(Number);
  const wall = new Date(Date.UTC(y, m - 1, d, hh, mm || 0, 0));
  const offsetMin = tzOffsetAtInstant(wall, tz);
  return new Date(wall.getTime() - offsetMin * 60000);
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

/**
 * Format a UTC Date as wall-clock {yyyy-mm-dd, hh:mm} in the given tz.
 */
export function utcToWall(utc: Date, tz: string): { date: string; time: string } {
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

/**
 * Generate available slots for the window [fromDate, toDate). Existing rows are
 * matched by wall-clock (date+HH:MM) so re-running is idempotent. Returns the
 * slots ordered, excluding slots already in the past or starting within 2h.
 */
export async function generateSlots(fromDate: Date, toDate: Date, config: BookingConfig) {
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

  const startMin = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const slots = await prisma.timeSlot.findMany({
    where: {
      start: { gte: fromDate },
      end: { lt: toDate },
      status: { in: ["available", "booked", "blocked"] },
    },
    orderBy: { start: "asc" },
    include: { booking: true },
  });

  return slots
    .filter((s) => s.start.getTime() >= startMin.getTime() && s.end.getTime() >= Date.now())
    .map((s) => ({
      id: s.id,
      start: s.start,
      end: s.end,
      status: s.status,
      label: s.label,
      bookedName: s.booking ? s.booking.name : null,
      bookedEmail: s.booking ? s.booking.email : null,
    }));
}

/**
 * Generate a uniquely-ish Google Meet style link. It becomes a live meeting when
 * the host joins with their Google account (format-based, not pre-scheduled).
 */
export function generateMeetLink(): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const pick = (n: number) =>
    Array.from({ length: n }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  return `https://meet.google.com/${pick(3)}-${pick(4)}-${pick(3)}`;
}

function icsEscape(s: string): string {
  return String(s)
    .replace(/([\\;,])/g, "\\$1")
    .replace(/\n/g, "\\n");
}

function icsDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/**
 * Build an .ics calendar invite with meeting details.
 */
export function buildIcs(opts: {
  uid: string;
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
  organizer: string;
  attendee: string;
  owner: string;
}): string {
  const now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Amatis//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${icsEscape(opts.uid)}`,
    "SEQUENCE:0",
    "STATUS:CONFIRMED",
    `DTSTAMP:${now}`,
    `DTSTART:${icsDate(opts.start)}`,
    `DTEND:${icsDate(opts.end)}`,
    `SUMMARY:${icsEscape(opts.title)}`,
    `DESCRIPTION:${icsEscape(opts.description)}`,
    `LOCATION:${icsEscape(opts.location)}`,
    `ORGANIZER;CN=${icsEscape("Amatis")}:mailto:${icsEscape(opts.organizer)}`,
    `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${icsEscape(opts.attendee)}:mailto:${icsEscape(opts.attendee)}`,
    `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${icsEscape(opts.owner)}:mailto:${icsEscape(opts.owner)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

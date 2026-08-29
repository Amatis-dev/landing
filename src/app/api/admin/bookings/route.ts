import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { ok, fail, parseJson, requireAdmin } from "@/lib/api";
import {
  generateSlots,
  loadBookingConfig,
  utcToWall,
  BOOKING_DEFAULT_TZ,
  BOOKING_DEFAULT_DURATION,
  BOOKING_DEFAULT_WEEKDAYS,
  BOOKING_DEFAULT_RANGES,
  BOOKING_DEFAULT_MAX_DAYS_AHEAD,
} from "@/lib/booking";

const CONFIG_KEYS = [
  "booking_tz",
  "booking_duration_min",
  "booking_weekdays",
  "booking_ranges",
  "booking_max_days_ahead",
  "booking_owner_email",
];

function getConfigValue(key: string, map: Record<string, string>) {
  switch (key) {
    case "booking_tz":
      return map.booking_tz || BOOKING_DEFAULT_TZ;
    case "booking_duration_min":
      return map.booking_duration_min || String(BOOKING_DEFAULT_DURATION);
    case "booking_weekdays":
      return map.booking_weekdays || BOOKING_DEFAULT_WEEKDAYS.join(",");
    case "booking_ranges":
      return map.booking_ranges || BOOKING_DEFAULT_RANGES.map((r) => `${r.startHour}-${r.endHour}`).join(";");
    case "booking_max_days_ahead":
      return map.booking_max_days_ahead || String(BOOKING_DEFAULT_MAX_DAYS_AHEAD);
    case "booking_owner_email":
      return map.booking_owner_email || "";
    default:
      return "";
  }
}

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  const config = await loadBookingConfig();
  const now = Date.now();
  const from = new Date(now);
  const to = new Date(now + config.maxDaysAhead * 24 * 60 * 60 * 1000);
  const slots = await generateSlots(from, to, config);

  const settingRows = await prisma.setting.findMany({
    where: { key: { in: CONFIG_KEYS } },
  });
  const map: Record<string, string> = {};
  for (const r of settingRows) map[r.key] = r.value;

  const configKeys = CONFIG_KEYS.map((key) => ({
    key,
    value: getConfigValue(key, map),
  }));

  const booked = await prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return ok({
    config,
    configKeys,
    durationMin: config.durationMin,
    slots: slots.map((s) => {
      const w = utcToWall(s.start, config.tz);
      return {
        id: s.id,
        date: w.date,
        time: w.time,
        status: s.status,
        label: s.label,
        bookedName: s.bookedName,
        bookedEmail: s.bookedEmail,
      };
    }),
    bookings: booked.map((b) => ({
      id: b.id,
      name: b.name,
      email: b.email,
      notes: b.notes,
      meetLink: b.meetLink,
      status: b.status,
      createdAt: b.createdAt,
    })),
  });
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  const body = parseJson<Record<string, string>>(await req.text());
  if (!body) return fail("body_required");

  for (const key of CONFIG_KEYS) {
    if (body[key] === undefined) continue;
    const value = String(body[key]).trim();
    await prisma.setting.upsert({
      where: { key },
      create: { key, value, group: "booking", isSecret: false },
      update: { value, group: "booking", isSecret: false },
    });
  }

  return ok({ saved: true });
}

export async function PATCH(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  const body = parseJson<{ id?: string; status?: string; label?: string }>(await req.text());
  if (!body) return fail("body_required");
  const id = body.id?.trim();
  if (!id) return fail("id_required");

  const slot = await prisma.timeSlot.findUnique({ where: { id } });
  if (!slot) return fail("slot_not_found", 404);

  const status = body.status;
  if (status && ["available", "blocked", "booked"].includes(status)) {
    if (status === "booked" && slot.status !== "booked") {
      return fail("cannot_force_book", 400);
    }
    // Releasing a booked slot (faked/unlinked or real): drop any linked Booking row.
    if ((status === "available" || status === "blocked") && slot.status === "booked") {
      await prisma.booking.deleteMany({ where: { slotId: id } });
    }
    await prisma.timeSlot.update({
      where: { id },
      data: { status: status === "booked" ? "booked" : status, label: slot.label },
    });
  }
  if (body.label !== undefined) {
    await prisma.timeSlot.update({ where: { id }, data: { label: body.label?.trim() || null } });
  }

  return ok({ updated: true });
}

export async function DELETE(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  const id = req.nextUrl.searchParams.get("id")?.trim();
  if (!id) return fail("id_required");

  const slot = await prisma.timeSlot.findUnique({ where: { id } });
  if (!slot) return fail("slot_not_found", 404);

  if (slot.status === "booked") return fail("cannot_delete_booked", 400);

  await prisma.timeSlot.delete({ where: { id } });
  return ok({ deleted: true });
}

export const dynamic = "force-dynamic";

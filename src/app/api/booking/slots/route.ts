import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { ok, fail } from "@/lib/api";
import { generateSlots, loadBookingConfig, utcToWall } from "@/lib/booking";

/**
 * GET /api/booking/slots
 * Returns available/blocked time slots for the booking window, grouped by local
 * date, in the configured timezone. Public endpoint.
 */
export async function GET(req: NextRequest) {
  const config = await loadBookingConfig();
  const now = Date.now();
  const from = new Date(now);
  const to = new Date(now + config.maxDaysAhead * 24 * 60 * 60 * 1000);

  const slots = await generateSlots(from, to, config);

  const grouped: Record<string, { date: string; slots: { id: string; time: string; status: string; label?: string | null; booked: boolean }[] }> =
    {};
  const order: string[] = [];

  for (const s of slots) {
    const w = utcToWall(s.start, config.tz);
    if (!grouped[w.date]) {
      grouped[w.date] = { date: w.date, slots: [] };
      order.push(w.date);
    }
    grouped[w.date].slots.push({
      id: s.id,
      time: w.time,
      status: s.status,
      label: s.label,
      booked: s.status === "booked",
    });
  }

  return ok({
    tz: config.tz,
    durationMin: config.durationMin,
    days: order.map((d) => grouped[d]),
  });
}
export const dynamic = "force-dynamic";

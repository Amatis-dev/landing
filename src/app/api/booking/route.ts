import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { ok, fail, parseJson } from "@/lib/api";
import {
  buildIcs,
  generateMeetLink,
  loadBookingConfig,
  utcToWall,
} from "@/lib/booking";
import { sendBookingInvite } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BOOKINGS_LIMIT = 2;

/**
 * POST /api/booking
 * Book an available time slot. Generates a Google Meet link, marks the slot
 * as booked, and emails an .ics calendar invite to the customer and owner.
 */
export async function POST(req: NextRequest) {
  const body = parseJson<{
    slotId?: string;
    name?: string;
    email?: string;
    notes?: string;
  }>(await req.text());

  const slotId = body?.slotId?.trim() ?? "";
  const name = body?.name?.trim() ?? "";
  const email = body?.email?.trim() ?? "";
  const notes = body?.notes?.trim() ?? "";

  if (!slotId) return fail("slot_required");
  if (!name) return fail("name_required");
  if (!EMAIL_RE.test(email)) return fail("invalid_email");
  if (name.length > 200 || email.length > 200 || notes.length > 2000) return fail("too_large");

  const slot = await prisma.timeSlot.findUnique({ where: { id: slotId }, include: { booking: true } });
  if (!slot) return fail("slot_not_found", 404);
  if (slot.status !== "available") return fail("slot_unavailable", 409);
  if (slot.start.getTime() <= Date.now() + 2 * 60 * 60 * 1000) return fail("slot_past", 409);

  // Limit: a user may have at most BOOKINGS_LIMIT active bookings.
  const activeCount = await prisma.booking.count({
    where: { email, status: "confirmed" },
  });
  if (activeCount >= BOOKINGS_LIMIT) return fail("booking_limit", 403);

  const config = await loadBookingConfig();
  const meetLink = generateMeetLink();
  const w = utcToWall(slot.start, config.tz);

  const booking = await prisma.$transaction(async (tx) => {
    const locked = await tx.timeSlot.findUnique({ where: { id: slotId } });
    if (!locked || locked.status !== "available") throw new Error("slot_unavailable");
    await tx.timeSlot.update({ where: { id: slotId }, data: { status: "booked" } });
    return tx.booking.create({
      data: {
        slotId,
        name,
        email,
        notes: notes || null,
        meetLink,
      },
    });
  });

  const title = `Consultation with Amatis — ${w.time} ${w.date}`;
  const description = `You booked a consultation with Amatis.\n\nNotes: ${notes || "—"}\n\nGoogle Meet link:\n${meetLink}`;
  const ics = buildIcs({
    uid: booking.id,
    title,
    description,
    location: meetLink,
    start: slot.start,
    end: slot.end,
    organizer: config.ownerEmail,
    attendee: email,
    owner: config.ownerEmail,
  });

  await sendBookingInvite({
    to: email,
    owner: config.ownerEmail,
    subject: title,
    summary: title,
    description: `You booked a consultation with Amatis. Notes: ${notes || "—"}`,
    location: meetLink,
    start: slot.start,
    end: slot.end,
    ics,
    meetLink,
  }).catch((e) => {
    // Booking is stored regardless; surface email failure but keep the slot.
    console.error("booking email failed", e);
  });

  return ok(
    {
      id: booking.id,
      meetLink,
      start: slot.start,
      end: slot.end,
      tz: config.tz,
      localDate: w.date,
      localTime: w.time,
    },
    201,
  );
}
export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { ok, fail, parseJson } from "@/lib/api";
import { sendContactNotification } from "@/lib/email";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = parseJson<ContactPayload>(await req.text());
  const name = body?.name?.trim() ?? "";
  const email = body?.email?.trim() ?? "";
  const message = body?.message?.trim() ?? "";
  const subject = body?.subject?.trim() ?? "";

  if (!name || !message) return fail("missing_fields");
  if (!EMAIL_RE.test(email)) return fail("invalid_email");
  if (name.length > 200 || email.length > 200 || subject.length > 300 || message.length > 5000) {
    return fail("too_large");
  }

  await prisma.contactMessage.create({
    data: { name, email, message, subject: subject || null },
  });

  // Best-effort email notification to the owner inbox; the message is already stored.
  await sendContactNotification({ name, email, subject, message }).catch(() => {});

  return ok({ sent: true }, 201);
}
export const dynamic = "force-dynamic";

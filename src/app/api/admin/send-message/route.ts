import { NextRequest } from "next/server";
import { ok, fail, parseJson, requireAdmin } from "@/lib/api";
import { sendAdminEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  const body = parseJson<{ to?: string; subject?: string; body?: string; from?: string }>(await req.text());

  const to = (body?.to ?? "").trim().toLowerCase();
  const subject = (body?.subject ?? "").trim();
  const text = (body?.body ?? "").trim();
  const from = (body?.from ?? "").trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return fail("invalid_email");
  if (!subject) return fail("subject_required");
  if (!text) return fail("body_required");
  if (to.length > 200 || subject.length > 300 || text.length > 10000) return fail("too_large");
  if (from && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) return fail("invalid_from_email");

  try {
    await sendAdminEmail(to, subject, text, from || undefined);
    return ok({ sent: true, to, ...(from ? { from } : {}) });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "unknown error";
    return fail("send_failed", 400, { detail });
  }
}
export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { ok, fail, parseJson, requireAdmin } from "@/lib/api";
import { sendAdminEmail, isEmailConfigured } from "@/lib/email";

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  const body = parseJson<{ to?: string; subject?: string; body?: string }>(await req.text());

  const requested = (body?.to ?? "").trim().toLowerCase();
  const to =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requested)
      ? requested
      : (process.env.CONTACT_EMAIL || process.env.MAIL_FROM || "").trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return fail("invalid_email");

  const subject = (body?.subject ?? "").trim() || "Amatis — test email";
  const text = (body?.body ?? "").trim() || "This is a test email from the Amatis admin panel.";

  if (!(await isEmailConfigured())) {
    return fail("email_not_configured");
  }

  try {
    await sendAdminEmail(to, subject, text);
    return ok({ sent: true, to });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "unknown error";
    return fail("send_failed", 400, { detail });
  }
}
export const dynamic = "force-dynamic";

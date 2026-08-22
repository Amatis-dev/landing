import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { ok, fail, parseJson } from "@/lib/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = parseJson<{ email?: string }>(await req.text());
  const email = (body?.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 200) return fail("invalid_email");

  try {
    await prisma.newsletterSubscriber.create({ data: { email } });
  } catch (e: unknown) {
    if (
      typeof e === "object" &&
      e !== null &&
      "code" in e &&
      (e as { code?: string }).code === "P2002"
    ) {
      return fail("already_subscribed", 409);
    }
    throw e;
  }
  return ok({ subscribed: true }, 201);
}
export const dynamic = "force-dynamic";

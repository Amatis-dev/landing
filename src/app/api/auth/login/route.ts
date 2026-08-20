import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { ok, fail, parseJson } from "@/lib/api";
import { signSession, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = parseJson<{ email?: string; password?: string }>(await req.text());
  const email = (body?.email ?? "").trim().toLowerCase();
  const password = body?.password ?? "";

  if (!email || !password) return fail("invalid_credentials", 401);

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) return fail("invalid_credentials", 401);

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return fail("invalid_credentials", 401);

  const token = await signSession({ sub: user.id, email: user.email, role: "ADMIN" });
  setSessionCookie(token);

  return ok({ user: { id: user.id, email: user.email, role: "ADMIN" } });
}
export const dynamic = "force-dynamic";

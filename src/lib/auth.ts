import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import prisma from "@/lib/db";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "amatis-dev-secret-change-in-production",
);

export const SESSION_COOKIE = "amatis_admin_session";

export type SessionPayload = {
  sub: string;
  email: string;
  role: "ADMIN";
};

export async function signSession(payload: SessionPayload): Promise<string> {
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(SECRET);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSessionUser() {
  const store = cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifySessionToken(token);
  if (!payload || payload.role !== "ADMIN") return null;
  const user = await prisma.adminUser.findUnique({ where: { id: payload.sub } });
  if (!user) return null;
  return { id: user.id, email: user.email, role: "ADMIN" as const };
}

export async function getSessionUserFromRequest(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifySessionToken(token);
  if (!payload || payload.role !== "ADMIN") return null;
  const user = await prisma.adminUser.findUnique({ where: { id: payload.sub } });
  if (!user) return null;
  return { id: user.id, email: user.email, role: "ADMIN" as const };
}

export function setSessionCookie(token: string) {
  const store = cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookie() {
  const store = cookies();
  store.delete(SESSION_COOKIE);
}
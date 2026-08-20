import { NextRequest } from "next/server";
import { ok, fail } from "@/lib/api";
import { getSessionUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await getSessionUserFromRequest(req);
  if (!user) return fail("Unauthorized", 401);
  return ok({ user });
}
export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { ok } from "@/lib/api";

/**
 * Public, unauthenticated settings used by the static site to render editable
 * page content (contact info, schedule panel). Never exposes secret values.
 */
export async function GET(_req: NextRequest) {
  const rows = await prisma.setting.findMany({
    select: { key: true, value: true, isSecret: true },
  });
  const settings: Record<string, string> = {};
  for (const r of rows) {
    if (!r.isSecret) settings[r.key] = r.value;
  }
  return ok({ settings });
}
export const dynamic = "force-dynamic";

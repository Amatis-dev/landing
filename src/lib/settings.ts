import prisma from "@/lib/db";

/**
 * Read a single Setting value by key. Returns null when not configured.
 */
export async function getSetting(key: string): Promise<string | null> {
  const row = await prisma.setting.findUnique({ where: { key } });
  return row?.value ?? null;
}

/**
 * Read a non-secret setting that is safe to expose to the public site.
 * Secret settings are never returned by this helper.
 */
export async function getPublicSetting(key: string): Promise<string | null> {
  const row = await prisma.setting.findUnique({ where: { key } });
  if (!row || row.isSecret) return null;
  return row.value ?? null;
}
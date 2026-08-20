import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { ok, fail, parseJson, requireAdmin } from "@/lib/api";

const MASKED = "••••••••";

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  const rows = await prisma.setting.findMany({
    orderBy: [{ group: "asc" }, { key: "asc" }],
  });
  const settings = rows.map((r) => ({
    key: r.key,
    group: r.group,
    isSecret: r.isSecret,
    value: r.isSecret ? MASKED : r.value,
    updatedAt: r.updatedAt,
  }));
  return ok({ settings });
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  const body = parseJson<{ key?: string; value?: string; group?: string; isSecret?: boolean }>(
    await req.text(),
  );
  if (!body) return fail("body_required");

  const key = body.key?.trim();
  if (!key) return fail("key_required");
  if (!/^[A-Za-z0-9_.-]+$/.test(key)) return fail("key_invalid");
  if (body.value === undefined) return fail("value_required");
  if (String(body.value).length > 5000) return fail("value_too_large");

  await prisma.setting.upsert({
    where: { key },
    create: {
      key,
      value: String(body.value),
      group: body.group?.trim() || null,
      isSecret: body.isSecret !== false,
    },
    update: {
      value: String(body.value),
      group: body.group?.trim() || null,
      isSecret: body.isSecret !== false,
    },
  });

  return ok({ saved: true }, 201);
}
export const dynamic = "force-dynamic";

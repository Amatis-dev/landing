import { readFileSync } from "fs";

try {
  const env = readFileSync(".env", "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {}

const { prisma } = await import("/Users/majidghafouri/speechify/landing/src/lib/db.ts");

const NEW = "44/1, Amethyst Tower, Training Park, Mashhad, Iran";
const keys = ["contact_address_en", "contact_address_de", "contact_address_fa", "contact_address_ar"];

for (const key of keys) {
  const row = await prisma.setting.findUnique({ where: { key } });
  if (!row) {
    console.log(`skip (missing): ${key}`);
    continue;
  }
  await prisma.setting.update({ where: { key }, data: { value: NEW } });
  console.log(`updated ${key}: ${row.value} -> ${NEW}`);
}

// sanity: also handle a possible locale-less fallback key
const fallback = await prisma.setting.findUnique({ where: { key: "contact_address" } });
if (fallback) {
  await prisma.setting.update({ where: { key: "contact_address" }, data: { value: NEW } });
  console.log(`updated contact_address (fallback): ${fallback.value} -> ${NEW}`);
}

const check = await prisma.setting.findMany({ where: { key: { in: keys } }, select: { key: true, value: true } });
console.log("DB now:", JSON.stringify(check, null, 0));

await prisma.$disconnect();

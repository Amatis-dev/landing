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

const FA_ADDR = "۴۴/۱، برج آمتیست، پارک ترینینگ، مشهد، ایران";
const AR_ADDR = "٤٤/١، برج أميتيست، منتزه التدريب، مشهد، إيران";
const FA_PHONE = "+۹۸۵۱۳۸۹۰۰۵۴۸";
const AR_PHONE = "+٩٨٥١٣٨٩٠٠٥٤٨";

async function setOrCreate(key, value) {
  const row = await prisma.setting.findUnique({ where: { key } });
  if (row) {
    await prisma.setting.update({ where: { key }, data: { value } });
    console.log(`updated ${key}: ${row.value} -> ${value}`);
  } else {
    await prisma.setting.create({ data: { key, value, isSecret: false, group: "contact" } });
    console.log(`created ${key}: ${value}`);
  }
}

await setOrCreate("contact_address_fa", FA_ADDR);
await setOrCreate("contact_address_ar", AR_ADDR);
await setOrCreate("contact_phone_fa", FA_PHONE);
await setOrCreate("contact_phone_ar", AR_PHONE);

const check = await prisma.setting.findMany({
  where: { key: { in: ["contact_address_fa", "contact_address_ar", "contact_phone_fa", "contact_phone_ar"] } },
  select: { key: true, value: true },
});
console.log("DB now:", JSON.stringify(check));

await prisma.$disconnect();

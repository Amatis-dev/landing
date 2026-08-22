// Seeds default, editable site settings (contact info, schedule panel) and the admin user.
// Idempotent: existing settings/admin are left untouched.
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const DEFAULT_SETTINGS = [
  { key: "contact_phone", value: "+852 2569 7974", secret: false, group: "contact" },
  { key: "contact_email", value: "hello@amatisberry.ir", secret: false, group: "contact" },
  { key: "contact_address_en", value: "21 King Street, Melbourne, Victoria 1202, Australia", secret: false, group: "contact" },
  { key: "contact_address_de", value: "21 King Street, Melbourne, Victoria 1202, Australien", secret: false, group: "contact" },
  { key: "contact_address_fa", value: "خیابان کینگ ۲۱، ملبورن، ویکتوریا ۱۲۰۲، استرالیا", secret: false, group: "contact" },
  { key: "contact_address_ar", value: "21 King Street, Melbourne, Victoria 1202, Australia", secret: false, group: "contact" },
  { key: "contact_hours_en", value: "Mon – Fri, 9:00 – 18:00", secret: false, group: "contact" },
  { key: "contact_hours_de", value: "Mo – Fr, 9:00 – 18:00", secret: false, group: "contact" },
  { key: "contact_hours_fa", value: "شنبه تا پنجشنبه، 9:00 – 18:00", secret: false, group: "contact" },
  { key: "contact_hours_ar", value: "الاثنين – الجمعة، 9:00 – 18:00", secret: false, group: "contact" },
  { key: "contact_schedule_title_en", value: "Schedule a Free Consultation", secret: false, group: "contact" },
  { key: "contact_schedule_title_de", value: "Kostenlose Beratung buchen", secret: false, group: "contact" },
  { key: "contact_schedule_title_fa", value: "رزرو مشاوره رایگان", secret: false, group: "contact" },
  { key: "contact_schedule_title_ar", value: "احجز استشارة مجانية", secret: false, group: "contact" },
  { key: "contact_schedule_text_en", value: "Prefer to talk? Book a free consultation and we will call you back.", secret: false, group: "contact" },
  { key: "contact_schedule_text_de", value: "Lieber telefonisch? Buchen Sie eine kostenlose Beratung.", secret: false, group: "contact" },
  { key: "contact_schedule_text_fa", value: "ترجیح می‌دهید تلفنی حرف بزنیم؟ یک مشاوره رایگان رزرو کنید.", secret: false, group: "contact" },
  { key: "contact_schedule_text_ar", value: "تفضل الحديث هاتفياً؟ احجز استشارة مجانية.", secret: false, group: "contact" },
  { key: "contact_schedule_button_en", value: "Schedule Now", secret: false, group: "contact" },
  { key: "contact_schedule_button_de", value: "Jetzt buchen", secret: false, group: "contact" },
  { key: "contact_schedule_button_fa", value: "اکنون رزرو کنید", secret: false, group: "contact" },
  { key: "contact_schedule_button_ar", value: "احجز الآن", secret: false, group: "contact" },
];

async function main() {
  for (const s of DEFAULT_SETTINGS) {
    const existing = await prisma.setting.findUnique({ where: { key: s.key } });
    if (!existing) {
      await prisma.setting.create({
        data: { key: s.key, value: s.value, isSecret: s.secret, group: s.group },
      });
    }
  }
  console.log(`seed: ensured ${DEFAULT_SETTINGS.length} default settings.`);

  const { seedPosts } = require("./blog-seed.cjs");
  await seedPosts();

  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";
  if (email && password.length >= 8) {
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.adminUser.upsert({
      where: { email },
      update: { passwordHash },
      create: { email, passwordHash, name: "Admin" },
    });
    console.log(`seed: admin ${email} ready.`);
  } else if (email) {
    const existing = await prisma.adminUser.findUnique({ where: { email } });
    console.log(
      existing
        ? `seed: admin ${email} exists (password kept).`
        : `seed: admin ${email} NOT created (set ADMIN_PASSWORD).`,
    );
  } else {
    console.log("seed: ADMIN_EMAIL not set, skipping admin.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
// Creates/updates the admin account from env vars (ADMIN_EMAIL, ADMIN_PASSWORD).
// Run via `npm run build` (after `prisma db push`) or manually with `node scripts/setup-admin.cjs`.
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";

  if (!email) {
    console.log("setup-admin: ADMIN_EMAIL not set, skipping.");
    return;
  }
  if (!password || password.length < 8) {
    console.log(
      "setup-admin: ADMIN_PASSWORD not set or shorter than 8 chars, skipping password update.",
    );
  }

  const passwordHash = password
    ? await bcrypt.hash(password, 12)
    : undefined;

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    if (passwordHash) {
      await prisma.adminUser.update({
        where: { id: existing.id },
        data: { passwordHash },
      });
      console.log(`setup-admin: updated password for ${email}`);
    } else {
      console.log(`setup-admin: existing admin ${email} kept as-is.`);
    }
  } else {
    if (!passwordHash) {
      console.log("setup-admin: cannot create admin without ADMIN_PASSWORD.");
      return;
    }
    await prisma.adminUser.create({
      data: { email, passwordHash, name: "Admin" },
    });
    console.log(`setup-admin: created admin ${email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
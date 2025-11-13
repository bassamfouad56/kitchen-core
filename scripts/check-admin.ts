import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Checking admin user in database...\n");

  const users = await prisma.user.findMany();

  if (users.length === 0) {
    console.log("❌ No users found in database!");
  } else {
    console.log(`✅ Found ${users.length} user(s):\n`);
    users.forEach((user) => {
      console.log(`  - Email: ${user.email}`);
      console.log(`    Name: ${user.name}`);
      console.log(`    Role: ${user.role}`);
      console.log(`    Password Hash: ${user.password.substring(0, 20)}...`);
      console.log(`    Created: ${user.createdAt}\n`);
    });
  }

  // Try to find the specific admin user
  const admin = await prisma.user.findUnique({
    where: { email: "admin@kitchencore.com" },
  });

  if (admin) {
    console.log("✅ Admin user exists!");
  } else {
    console.log("❌ Admin user NOT found!");
  }
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

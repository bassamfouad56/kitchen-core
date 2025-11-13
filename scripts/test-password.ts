import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🔐 Testing password authentication...\n");

  const email = "admin@kitchencore.com";
  const password = "admin123";

  // Get user from database
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log("❌ User not found!");
    return;
  }

  console.log("✅ User found:");
  console.log(`   Email: ${user.email}`);
  console.log(`   Stored password hash: ${user.password}\n`);

  // Test password comparison
  console.log(`Testing password: "${password}"`);
  const isValid = await bcrypt.compare(password, user.password);

  if (isValid) {
    console.log("✅ Password is VALID! Login should work.");
  } else {
    console.log(
      "❌ Password is INVALID! There is an issue with the password hash.",
    );

    // Create a fresh hash to compare
    console.log("\nCreating a fresh hash for comparison...");
    const freshHash = await bcrypt.hash(password, 10);
    console.log(`Fresh hash: ${freshHash}`);

    const freshTest = await bcrypt.compare(password, freshHash);
    console.log(`Fresh hash test: ${freshTest ? "VALID" : "INVALID"}`);
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

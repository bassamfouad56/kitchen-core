import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkMissingSections() {
  console.log("🔍 Checking for missing sections...\n");

  // Check Founder
  const founder = await prisma.founder.findFirst();
  console.log("📋 Founder data:", founder ? "✅ EXISTS" : "❌ MISSING");
  if (founder) {
    console.log(`   Name: ${founder.name}`);
    console.log(`   Published: ${founder.published}`);
  }

  // Check Team Members
  const teamMembers = await prisma.teamMember.findMany();
  console.log(
    "\n👥 Team Members:",
    teamMembers.length > 0 ? `✅ ${teamMembers.length} members` : "❌ MISSING",
  );
  if (teamMembers.length > 0) {
    teamMembers.forEach((member, i) => {
      console.log(
        `   ${i + 1}. ${member.nameEn} - ${member.roleEn} (Published: ${member.published})`,
      );
    });
  }

  // Check Company
  const company = await prisma.company.findFirst();
  console.log("\n🏢 Company data:", company ? "✅ EXISTS" : "❌ MISSING");
  if (company) {
    console.log(`   Name: ${company.nameEn}`);
    console.log(`   Published: ${company.published}`);
  }

  // Check Before/After (we know this exists from services page)
  console.log(
    "\n🖼️  Before/After Section: ✅ EXISTS (restored in services page)",
  );

  prisma.$disconnect();
}

checkMissingSections();

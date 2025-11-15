/**
 * Test script to verify all sections are properly configured
 * This checks database data and component imports
 */

import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function testSections() {
  console.log("🧪 Testing All Sections Configuration\n");
  console.log("=".repeat(60));

  let allGood = true;

  // Test 1: Before & After Component
  console.log("\n📸 Before & After Slider:");
  const beforeAfterExists = fs.existsSync(
    path.join(process.cwd(), "app/components/BeforeAfterSlider.tsx"),
  );
  console.log(`   Component exists: ${beforeAfterExists ? "✅" : "❌"}`);

  const homepageContent = fs.readFileSync(
    path.join(process.cwd(), "app/[locale]/page.tsx"),
    "utf-8",
  );
  const homepageHasSlider = homepageContent.includes("BeforeAfterSlider");
  console.log(`   Used in Homepage: ${homepageHasSlider ? "✅" : "❌"}`);

  const servicesContent = fs.readFileSync(
    path.join(process.cwd(), "app/[locale]/services/page.tsx"),
    "utf-8",
  );
  const servicesHasSlider = servicesContent.includes("BeforeAfterSlider");
  console.log(`   Used in Services: ${servicesHasSlider ? "✅" : "❌"}`);

  if (!beforeAfterExists || !homepageHasSlider || !servicesHasSlider) {
    allGood = false;
  }

  // Test 2: Founder Section
  console.log("\n👤 Founder Section:");
  const founder = await prisma.founder.findFirst();
  console.log(`   Database record: ${founder ? "✅" : "❌"}`);
  if (founder) {
    console.log(`   Name: ${founder.name}`);
    console.log(
      `   Published: ${founder.published ? "✅" : "❌ WARNING: NOT PUBLISHED"}`,
    );
    console.log(`   Image: ${founder.image ? "✅" : "❌"}`);
    if (!founder.published) allGood = false;
  } else {
    allGood = false;
  }

  const founderComponentExists = fs.existsSync(
    path.join(process.cwd(), "app/components/about/FounderShowcase.tsx"),
  );
  console.log(`   Component exists: ${founderComponentExists ? "✅" : "❌"}`);

  const aboutContent = fs.readFileSync(
    path.join(process.cwd(), "app/[locale]/about/page.tsx"),
    "utf-8",
  );
  const aboutHasFounder = aboutContent.includes("FounderShowcase");
  console.log(`   Used in About page: ${aboutHasFounder ? "✅" : "❌"}`);

  if (!founderComponentExists || !aboutHasFounder) {
    allGood = false;
  }

  // Test 3: Team Section
  console.log("\n👥 Team Section:");
  const teamMembers = await prisma.teamMember.findMany();
  console.log(
    `   Database records: ${teamMembers.length > 0 ? "✅" : "❌"} (${teamMembers.length} members)`,
  );

  if (teamMembers.length > 0) {
    const publishedCount = teamMembers.filter((m) => m.published).length;
    console.log(
      `   Published members: ${publishedCount}/${teamMembers.length} ${publishedCount === teamMembers.length ? "✅" : "⚠️"}`,
    );

    const withImages = teamMembers.filter((m) => m.image).length;
    console.log(
      `   Members with images: ${withImages}/${teamMembers.length} ${withImages === teamMembers.length ? "✅" : "⚠️"}`,
    );

    if (
      publishedCount < teamMembers.length ||
      withImages < teamMembers.length
    ) {
      allGood = false;
    }
  } else {
    allGood = false;
  }

  const teamComponentExists = fs.existsSync(
    path.join(process.cwd(), "app/components/about/TeamGrid.tsx"),
  );
  console.log(`   Component exists: ${teamComponentExists ? "✅" : "❌"}`);

  const aboutHasTeam = aboutContent.includes("TeamGrid");
  console.log(`   Used in About page: ${aboutHasTeam ? "✅" : "❌"}`);

  if (!teamComponentExists || !aboutHasTeam) {
    allGood = false;
  }

  // Test 4: About Page Configuration
  console.log("\n📄 About Page Configuration:");
  console.log(`   Imports FounderShowcase: ${aboutHasFounder ? "✅" : "❌"}`);
  console.log(`   Imports TeamGrid: ${aboutHasTeam ? "✅" : "❌"}`);

  const aboutHasConditional = aboutContent.includes("{data.founder &&");
  console.log(
    `   Conditional rendering for founder: ${aboutHasConditional ? "✅" : "❌"}`,
  );

  const aboutHasTeamConditional = aboutContent.includes(
    "{data.teamMembers.length > 0 &&",
  );
  console.log(
    `   Conditional rendering for team: ${aboutHasTeamConditional ? "✅" : "❌"}`,
  );

  // Test 5: Company Settings
  console.log("\n🏢 Company Settings:");
  const company = await prisma.company.findFirst();
  console.log(`   Company record: ${company ? "✅" : "❌"}`);
  if (company) {
    console.log(`   Name: ${company.nameEn}`);
    console.log(
      `   Published: ${company.published ? "✅" : "❌ WARNING: NOT PUBLISHED"}`,
    );
    console.log(`   Phone: ${company.phone || "❌ MISSING"}`);
    console.log(`   WhatsApp: ${company.whatsappNumber || "❌ MISSING"}`);
    if (!company.published) allGood = false;
  } else {
    allGood = false;
  }

  // Final Report
  console.log("\n" + "=".repeat(60));
  if (allGood) {
    console.log("✅ ALL TESTS PASSED - Everything is configured correctly!");
    console.log("\n📝 Next Steps:");
    console.log("   1. Run: pnpm run dev");
    console.log("   2. Visit: http://localhost:3000/en/about");
    console.log("   3. Verify Founder and Team sections appear");
    console.log("   4. Visit: http://localhost:3000/en/services");
    console.log("   5. Verify Before/After slider appears");
  } else {
    console.log("❌ SOME TESTS FAILED - Review the warnings above");
    console.log("\n🔧 Possible fixes:");
    console.log("   1. Run: pnpm run db:seed");
    console.log("   2. Run: pnpm run db:init-company");
    console.log("   3. Check Prisma Studio to verify data is published");
  }

  await prisma.$disconnect();
}

testSections().catch(console.error);

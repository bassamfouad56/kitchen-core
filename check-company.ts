import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkCompany() {
  const company = await prisma.company.findFirst({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  if (!company) {
    console.log("❌ No company data found");
  } else {
    console.log("✅ Company data exists");
    console.log("\nCompany Details:");
    console.log("Name (EN):", company.nameEn);
    console.log("Name (AR):", company.nameAr);
    console.log(
      "Description (EN):",
      company.descriptionEn.substring(0, 100) + "...",
    );
    console.log(
      "Mission (EN):",
      company.missionEn
        ? company.missionEn.substring(0, 100) + "..."
        : "Not set",
    );
    console.log(
      "Vision (EN):",
      company.visionEn ? company.visionEn.substring(0, 100) + "..." : "Not set",
    );
    console.log("Values count:", company.valuesEn.length);
    console.log("Values:", company.valuesEn);
    console.log("\nStats:");
    console.log("Founded:", company.foundedYear);
    console.log("Projects:", company.projectsCompleted);
    console.log("Countries:", company.countriesServed);
    console.log("Employees:", company.employeeCount);
  }

  await prisma.$disconnect();
}

checkCompany().catch(console.error);

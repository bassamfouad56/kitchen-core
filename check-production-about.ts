import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkAbout() {
  try {
    const founder = await prisma.founder.findFirst({
      where: { published: true },
    });

    const teamMembers = await prisma.teamMember.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });

    console.log("=== FOUNDER DATA ===");
    if (founder) {
      console.log(`Name: ${founder.name}`);
      console.log(`Title: ${founder.title}`);
      console.log(`Published: ${founder.published}`);
    } else {
      console.log("NO FOUNDER FOUND");
    }

    console.log("\n=== TEAM MEMBERS ===");
    console.log(`Total: ${teamMembers.length}`);
    teamMembers.forEach((member, i) => {
      console.log(`\n${i + 1}. ${member.nameEn}`);
      console.log(`   Role: ${member.roleEn}`);
      console.log(`   Published: ${member.published}`);
      console.log(`   Image: ${member.image}`);
    });

    await prisma.$disconnect();
  } catch (error) {
    console.error("Error:", error);
    await prisma.$disconnect();
  }
}

checkAbout();

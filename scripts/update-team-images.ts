import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// WhatsApp team images (the actual team photos)
const teamImages = [
  "/team/WhatsApp_Image_2025-10-18_at_17.42.09_446c0a80-removebg-preview.png",
  "/team/WhatsApp_Image_2025-10-18_at_17.42.10_a00ed2b4-removebg-preview.png",
  "/team/WhatsApp_Image_2025-10-18_at_17.42.11_23cae256-removebg-preview.png",
  "/team/WhatsApp_Image_2025-10-18_at_17.42.11_c3be06da-removebg-preview.png",
  "/team/WhatsApp_Image_2025-10-18_at_17.42.12_09558bae-removebg-preview.png",
];

async function main() {
  // Get all team members ordered by their order field
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  });

  console.log(`Found ${teamMembers.length} team members:`);
  teamMembers.forEach((m, i) => {
    console.log(`  ${i + 1}. ${m.nameEn} (${m.roleEn}) - Current image: ${m.image || "none"}`);
  });

  // Update each team member with corresponding image
  for (let i = 0; i < teamMembers.length; i++) {
    const member = teamMembers[i];
    const imageIndex = i % teamImages.length; // Cycle through images if more members than images
    const newImage = teamImages[imageIndex];

    await prisma.teamMember.update({
      where: { id: member.id },
      data: { image: newImage },
    });

    console.log(`Updated ${member.nameEn} with image: ${newImage}`);
  }

  console.log("\nAll team member images updated!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function initCompanySettings() {
  console.log("🚀 Initializing company settings...");

  try {
    // Check if company settings already exist
    const existing = await prisma.company.findFirst();

    if (existing) {
      console.log(
        "✅ Company settings already exist, updating with new values..."
      );

      const updated = await prisma.company.update({
        where: { id: existing.id },
        data: {
          phone: "+971 55 999 0501",
          whatsappNumber: "+971559990501",
          // Keep existing data, only update phone numbers
        },
      });

      console.log("✅ Company settings updated successfully!");
      console.log("📞 Phone:", updated.phone);
      console.log("💬 WhatsApp:", updated.whatsappNumber);
    } else {
      console.log("📝 Creating new company settings...");

      const company = await prisma.company.create({
        data: {
          // Basic Info
          nameEn: "Kitchen Core",
          nameAr: "كيتشن كور",
          taglineEn: "Luxury Kitchen Design & Installation",
          taglineAr: "تصميم وتنفيذ المطابخ الفاخرة",
          descriptionEn:
            "Kitchen Core specializes in luxury kitchen design and installation, offering premium modern, classic wooden, and aluminum kitchen solutions across the UAE and beyond.",
          descriptionAr:
            "تتخصص كيتشن كور في تصميم وتنفيذ المطابخ الفاخرة، وتقدم حلول مطابخ خشبية حديثة وكلاسيكية وألمنيوم متميزة في جميع أنحاء الإمارات وخارجها.",

          // Mission & Vision
          missionEn:
            "To transform kitchens into masterpieces that blend functionality with luxury, exceeding client expectations through exceptional craftsmanship and innovative design.",
          missionAr:
            "تحويل المطابخ إلى تحف فنية تجمع بين الوظيفة والفخامة، متجاوزين توقعات العملاء من خلال الحرفية الاستثنائية والتصميم المبتكر.",

          visionEn:
            "To be the premier destination for luxury kitchen design in the Middle East, setting the standard for excellence in craftsmanship and customer satisfaction.",
          visionAr:
            "أن نكون الوجهة الأولى لتصميم المطابخ الفاخرة في الشرق الأوسط، ووضع معيار التميز في الحرفية ورضا العملاء.",

          // Values
          valuesEn: [
            "Quality Craftsmanship",
            "Innovation in Design",
            "Customer Satisfaction",
            "Attention to Detail",
            "Timely Delivery",
            "Sustainability",
          ],
          valuesAr: [
            "جودة الحرفية",
            "الابتكار في التصميم",
            "رضا العملاء",
            "الاهتمام بالتفاصيل",
            "التسليم في الوقت المحدد",
            "الاستدامة",
          ],

          // Statistics
          foundedYear: "2008",
          employeeCount: "50+",
          projectsCompleted: "1000+",
          countriesServed: "25+",
          yearsOfExperience: "15+",

          // Contact Info
          phone: "+971 55 999 0501",
          email: "info@kitchencore.com",
          whatsappNumber: "+971559990501",

          // Social Media
          instagramUrl: "https://instagram.com/kitchen_core_uae",
          facebookUrl: "",
          linkedinUrl: "",
          twitterUrl: "",
          youtubeUrl: "",
          tiktokUrl: "",

          // Publishing
          published: true,
        },
      });

      console.log("✅ Company settings created successfully!");
      console.log("📞 Phone:", company.phone);
      console.log("💬 WhatsApp:", company.whatsappNumber);
      console.log("📧 Email:", company.email);
    }

    console.log(
      "\n✨ Done! You can now manage these settings in the admin panel at /admin/company"
    );
  } catch (error) {
    console.error("❌ Error initializing company settings:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

initCompanySettings()
  .then(() => {
    console.log("\n🎉 Company settings initialization complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Fatal error:", error);
    process.exit(1);
  });

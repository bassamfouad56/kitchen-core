// This script should be run on Vercel to update the production database
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateProductionTeam() {
  console.log(
    "🔄 Updating production database with anonymized team members...\n",
  );

  try {
    // Delete existing team members and founder
    await prisma.teamMember.deleteMany({});
    await prisma.founder.deleteMany({});
    console.log("✅ Cleared existing data\n");

    // Create founder
    await prisma.founder.create({
      data: {
        name: "Eng. Esam Odeh",
        title: "Founder & Chief Executive Officer",
        image: "/ceo.png",
        bio: "With over two decades of engineering excellence and unwavering passion for culinary design, Esam Odeh founded Kitchen Core with a singular vision: to revolutionize luxury kitchen experiences across the Middle East and beyond.",
        education: [
          "MEng Mechanical Engineering",
          "Advanced Italian Kitchen Design",
          "PMP & LEED Certified",
        ],
        recognition: [
          "Best Design Award 2024",
          "Excellence in Innovation 2023",
          "Industry Leadership Award 2022",
        ],
        quote:
          "Excellence is not a destination—it is a continuous journey of innovation, craftsmanship, and dedication to creating spaces that inspire culinary artistry.",
        published: true,
      },
    });
    console.log("✅ Created founder\n");

    // Create anonymized team members
    const teamMembers = [
      {
        nameEn: "Team Member",
        nameAr: "عضو الفريق",
        roleEn: "Chief Design Officer",
        roleAr: "مديرة التصميم التنفيذية",
        bioEn:
          "With 12 years of experience in luxury interior design, our Chief Design Officer leads the design team in creating innovative kitchen concepts.",
        bioAr:
          "مع 12 عاماً من الخبرة في التصميم الداخلي الفاخر، تقود مديرة التصميم التنفيذية فريق التصميم في إنشاء مفاهيم مطبخ مبتكرة.",
        image: "/team/sarah.jpg",
        specialtiesEn: [
          "Concept Design",
          "3D Visualization",
          "Client Relations",
        ],
        specialtiesAr: [
          "التصميم المفاهيمي",
          "التصور ثلاثي الأبعاد",
          "العلاقات مع العملاء",
        ],
        email: "design@kitchencore.com",
        yearsOfExperience: "12",
        order: 1,
        published: true,
      },
      {
        nameEn: "Team Member",
        nameAr: "عضو الفريق",
        roleEn: "Master Craftsman",
        roleAr: "حرفي خبير",
        bioEn:
          "Trained in Florence, Italy, our Master Craftsman brings three generations of Italian woodworking mastery to Kitchen Core.",
        bioAr:
          "تدرب في فلورنسا، إيطاليا، يجلب الحرفي الخبير ثلاثة أجيال من إتقان الأعمال الخشبية الإيطالية إلى كيتشن كور.",
        image: "/team/marco.jpg",
        specialtiesEn: [
          "Italian Craftsmanship",
          "Custom Cabinetry",
          "Heritage Techniques",
        ],
        specialtiesAr: [
          "الحرفية الإيطالية",
          "الخزائن المخصصة",
          "التقنيات التراثية",
        ],
        email: "crafts@kitchencore.com",
        yearsOfExperience: "18",
        order: 2,
        published: true,
      },
      {
        nameEn: "Team Member",
        nameAr: "عضو الفريق",
        roleEn: "Project Manager",
        roleAr: "مديرة المشاريع",
        bioEn:
          "Our Project Manager orchestrates every project from concept to completion, ensuring seamless execution and client satisfaction.",
        bioAr:
          "تنسق مديرة المشاريع كل مشروع من المفهوم إلى الإنجاز، مما يضمن التنفيذ السلس ورضا العملاء.",
        image: "/team/fatima.jpg",
        specialtiesEn: [
          "Project Management",
          "Client Coordination",
          "Quality Control",
        ],
        specialtiesAr: ["إدارة المشاريع", "تنسيق العملاء", "مراقبة الجودة"],
        email: "projects@kitchencore.com",
        yearsOfExperience: "10",
        order: 3,
        published: true,
      },
      {
        nameEn: "Team Member",
        nameAr: "عضو الفريق",
        roleEn: "Smart Technology Specialist",
        roleAr: "أخصائي التكنولوجيا الذكية",
        bioEn:
          "Our Smart Technology Specialist integrates cutting-edge smart home technology into every kitchen, creating seamless experiences.",
        bioAr:
          "يدمج أخصائي التكنولوجيا الذكية أحدث تقنيات المنزل الذكي في كل مطبخ، مما يخلق تجارب سلسة.",
        image: "/team/david.jpg",
        specialtiesEn: [
          "Smart Home Integration",
          "IoT Systems",
          "Automation Design",
        ],
        specialtiesAr: [
          "تكامل المنزل الذكي",
          "أنظمة إنترنت الأشياء",
          "تصميم الأتمتة",
        ],
        email: "tech@kitchencore.com",
        yearsOfExperience: "8",
        order: 4,
        published: true,
      },
      {
        nameEn: "Team Member",
        nameAr: "عضو الفريق",
        roleEn: "Materials Specialist",
        roleAr: "أخصائية المواد",
        bioEn:
          "Our Materials Specialist sources the finest materials from around the world—from Carrara marble to rare woods.",
        bioAr:
          "تستورد أخصائية المواد أجود المواد من جميع أنحاء العالم - من رخام كارارا إلى الأخشاب النادرة.",
        image: "/team/layla.jpg",
        specialtiesEn: [
          "Material Sourcing",
          "Sustainability",
          "Quality Assurance",
        ],
        specialtiesAr: ["توريد المواد", "الاستدامة", "ضمان الجودة"],
        email: "materials@kitchencore.com",
        yearsOfExperience: "9",
        order: 5,
        published: true,
      },
      {
        nameEn: "Team Member",
        nameAr: "عضو الفريق",
        roleEn: "Installation Director",
        roleAr: "مدير التركيب",
        bioEn:
          "Our Installation Director leads the installation teams with precision and care. The 15 years of experience ensure flawless execution.",
        bioAr:
          "يقود مدير التركيب فرق التركيب بدقة وعناية. الخبرة التي تبلغ 15 عاماً تضمن التنفيذ الخالي من العيوب.",
        image: "/team/ahmed.jpg",
        specialtiesEn: [
          "Installation Management",
          "Quality Control",
          "Team Leadership",
        ],
        specialtiesAr: ["إدارة التركيب", "مراقبة الجودة", "قيادة الفريق"],
        email: "installation@kitchencore.com",
        yearsOfExperience: "15",
        order: 6,
        published: true,
      },
    ];

    for (const member of teamMembers) {
      await prisma.teamMember.create({ data: member });
    }

    console.log("✅ Created 6 anonymized team members\n");
    console.log("🎉 Production database updated successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

updateProductionTeam();

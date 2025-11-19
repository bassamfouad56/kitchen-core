import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function runSeedProduction() {
  console.log("Running production seed for About page...\n");

  try {
    // Check if founder exists
    const existingFounder = await prisma.founder.findFirst();
    console.log("Existing founder count:", existingFounder ? 1 : 0);

    if (!existingFounder) {
      console.log("Creating founder...");
      await prisma.founder.create({
        data: {
          name: "Eng. Esam Odeh",
          title: "Founder & Chief Executive Officer",
          bio: "With over two decades of engineering excellence and unwavering passion for culinary design, Esam Odeh founded Kitchen Core with a singular vision: to revolutionize luxury kitchen experiences across the Middle East and beyond.",
          image: "/ceo.png",
          quote:
            "Excellence is not a destination—it is a continuous journey of innovation, craftsmanship, and dedication to creating spaces that inspire culinary artistry.",
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
          published: true,
        },
      });
      console.log("✓ Created founder");
    } else {
      console.log("✓ Founder already exists");
    }

    // Check team members
    const teamCount = await prisma.teamMember.count();
    console.log("Existing team members count:", teamCount);

    if (teamCount < 6) {
      console.log("Deleting existing team members and creating new ones...");
      await prisma.teamMember.deleteMany({});

      const teamMembers = [
        {
          nameEn: "Team Member",
          nameAr: "عضو الفريق",
          roleEn: "Chief Design Officer",
          roleAr: "مديرة التصميم التنفيذية",
          bioEn:
            "With 12 years of experience in luxury interior design, our Chief Design Officer leads the design team in creating innovative kitchen concepts. The portfolio includes work with Forbes Top 100 residences across the Middle East.",
          bioAr:
            "مع 12 عاماً من الخبرة في التصميم الداخلي الفاخر، تقود مديرة التصميم التنفيذية فريق التصميم في إنشاء مفاهيم مطبخ مبتكرة. تشمل المحفظة العمل مع أفضل 100 مقر إقامة من فوربس في جميع أنحاء الشرق الأوسط.",
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
          roleAr: "حرفي رئيسي",
          bioEn:
            "Trained in Florence, Italy, our Master Craftsman brings three generations of Italian woodworking mastery to Kitchen Core. The attention to detail and traditional techniques ensure every cabinet is a work of art.",
          bioAr:
            "تدرب في فلورنسا، إيطاليا، يجلب الحرفي الرئيسي ثلاثة أجيال من إتقان النجارة الإيطالية إلى كيتشن كور. يضمن الاهتمام بالتفاصيل والتقنيات التقليدية أن كل خزانة عمل فني.",
          image: "/team/marco.jpg",
          specialtiesEn: [
            "Italian Craftsmanship",
            "Custom Cabinetry",
            "Heritage Techniques",
          ],
          specialtiesAr: [
            "الحرفية الإيطالية",
            "الخزائن المخصصة",
            "تقنيات التراث",
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
          roleAr: "مدير المشروع",
          bioEn:
            "Our Project Manager orchestrates every project from concept to completion, ensuring seamless execution and client satisfaction. The expertise in luxury project management has delivered on-time, on-budget excellence for over 50 high-end projects.",
          bioAr:
            "ينسق مدير المشروع كل مشروع من المفهوم إلى الإنجاز، مما يضمن التنفيذ السلس ورضا العملاء. خبرته في إدارة المشاريع الفاخرة قدمت التميز في الوقت المحدد وفي الميزانية لأكثر من 50 مشروعاً راقياً.",
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
            "Our Smart Technology Specialist integrates cutting-edge smart home technology into every kitchen, creating seamless experiences. The expertise in IoT and automation ensures our kitchens are as intelligent as they are beautiful.",
          bioAr:
            "يدمج أخصائي التكنولوجيا الذكية تكنولوجيا المنزل الذكي المتطورة في كل مطبخ، مما يخلق تجارب سلسة. خبرته في إنترنت الأشياء والأتمتة تضمن أن مطابخنا ذكية بقدر ما هي جميلة.",
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
          roleAr: "أخصائي المواد",
          bioEn:
            "Our Materials Specialist sources the finest materials from around the world—from Carrara marble to rare woods. The global network and discerning eye ensure every Kitchen Core project features only premium, sustainable materials.",
          bioAr:
            "يقوم أخصائي المواد بتوريد أفضل المواد من جميع أنحاء العالم - من رخام كارارا إلى الأخشاب النادرة. شبكته العالمية وعينه الثاقبة تضمن أن كل مشروع لكيتشن كور يتميز بمواد متميزة ومستدامة فقط.",
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
            "Our Installation Director leads the installation teams with precision and care. The 15 years of experience ensure flawless execution, transforming designs into reality with meticulous attention to every detail.",
          bioAr:
            "يقود مدير التركيب فرق التركيب بدقة وعناية. خبرته لمدة 15 عاماً تضمن التنفيذ الخالي من العيوب، وتحويل التصاميم إلى واقع مع اهتمام دقيق بكل التفاصيل.",
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

      console.log(`✓ Created ${teamMembers.length} team members`);
    } else {
      console.log("✓ Team members already exist");
    }

    console.log("\n✅ Production seed completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding production:", error);
  } finally {
    await prisma.$disconnect();
  }
}

runSeedProduction();

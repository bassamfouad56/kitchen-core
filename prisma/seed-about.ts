import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedAboutPage() {
  console.log("🏢 Seeding About Page Data...");

  // 1. Seed Company Information
  console.log("Creating company information...");
  await prisma.company.upsert({
    where: { id: "company-1" },
    update: {},
    create: {
      id: "company-1",
      nameEn: "Kitchen Core",
      nameAr: "كيتشن كور",
      taglineEn: "Where Italian Craftsmanship Meets Innovation",
      taglineAr: "حيث تلتقي الحرفية الإيطالية بالابتكار",
      descriptionEn:
        "Kitchen Core stands at the intersection of timeless Italian craftsmanship and cutting-edge technology. For over 15 years, we've been transforming kitchens into architectural masterpieces for palaces, villas, and luxury estates across more than 25 countries.",
      descriptionAr:
        "تقف كيتشن كور عند تقاطع الحرفية الإيطالية الخالدة والتكنولوجيا المتطورة. منذ أكثر من 15 عاماً، نقوم بتحويل المطابخ إلى تحف معمارية للقصور والفلل والعقارات الفاخرة في أكثر من 25 دولة.",
      missionEn:
        "To create bespoke kitchens that seamlessly blend function, aesthetics, and innovation—delivering spaces where culinary artistry meets architectural excellence.",
      missionAr:
        "إنشاء مطابخ مخصصة تمزج بسلاسة بين الوظيفة والجماليات والابتكار - تقديم مساحات حيث يلتقي فن الطهي بالتميز المعماري.",
      visionEn:
        "To be the world's leading luxury kitchen design company, recognized for uncompromising quality, sustainable practices, and transformative spaces that inspire generations.",
      visionAr:
        "أن نكون الشركة الرائدة عالمياً في تصميم المطابخ الفاخرة، معترف بنا من حيث الجودة غير القابلة للمساومة والممارسات المستدامة والمساحات التحويلية التي تلهم الأجيال.",
      valuesEn: [
        "Excellence in Every Detail",
        "Innovation Through Design",
        "Uncompromising Integrity",
        "Sustainable Luxury",
        "Client-Centered Approach",
        "Craftsmanship Heritage",
      ],
      valuesAr: [
        "التميز في كل التفاصيل",
        "الابتكار من خلال التصميم",
        "النزاهة غير القابلة للمساومة",
        "الفخامة المستدامة",
        "نهج يركز على العميل",
        "تراث الحرفية",
      ],
      foundedYear: "2010",
      employeeCount: "50+",
      projectsCompleted: "150+",
      countriesServed: "25+",
      yearsOfExperience: "15+",
      featuredImage: "/8.jpg",
      published: true,
    },
  });

  // 2. Seed Founder Information
  console.log("Creating founder profile...");
  await prisma.founder.upsert({
    where: { id: "founder-1" },
    update: {},
    create: {
      id: "founder-1",
      name: "Eng. Esam Odeh",
      title: "Founder & Chief Executive Officer",
      image: "/ceo.png",
      bio: `With over two decades of engineering excellence and unwavering passion for culinary design, Esam Odeh founded Kitchen Core with a singular vision: to revolutionize luxury kitchen experiences across the Middle East and beyond.

Beginning his career as a mechanical engineer specializing in HVAC and building systems, Esam quickly recognized the untapped potential in luxury residential kitchens. His unique blend of technical expertise and artistic sensibility led him to pursue advanced studies in Italian kitchen design and craftsmanship.

"A kitchen is not merely a functional space—it is the heart of the home, where memories are created and traditions are preserved," Esam often says. This philosophy drives every project Kitchen Core undertakes.

Under his leadership, Kitchen Core has completed over 150 prestigious projects for royal palaces, luxury villas, and exclusive estates across 25 countries, earning recognition from Architectural Digest, Luxury Home Design, and numerous international design awards.`,
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

  // 3. Seed Team Members
  console.log("Creating team members...");

  const teamMembers = [
    {
      id: "team-1",
      nameEn: "Team Member",
      nameAr: "عضو الفريق",
      roleEn: "Chief Design Officer",
      roleAr: "مديرة التصميم التنفيذية",
      bioEn:
        "With 12 years of experience in luxury interior design, our Chief Design Officer leads the design team in creating innovative kitchen concepts. The portfolio includes work with Forbes Top 100 residences across the Middle East.",
      bioAr:
        "مع 12 عاماً من الخبرة في التصميم الداخلي الفاخر، تقود مديرة التصميم التنفيذية فريق التصميم في إنشاء مفاهيم مطبخ مبتكرة. تشمل المحفظة العمل مع أفضل 100 مقر إقامة من فوربس في جميع أنحاء الشرق الأوسط.",
      image: "/team/sarah.jpg",
      specialtiesEn: ["Concept Design", "3D Visualization", "Client Relations"],
      specialtiesAr: [
        "التصميم المفاهيمي",
        "التصور ثلاثي الأبعاد",
        "العلاقات مع العملاء",
      ],
      email: "design@kitchencore.com",
      linkedin: null,
      yearsOfExperience: "12",
      order: 1,
      published: true,
    },
    {
      id: "team-2",
      nameEn: "Team Member",
      nameAr: "عضو الفريق",
      roleEn: "Master Craftsman",
      roleAr: "حرفي خبير",
      bioEn:
        "Trained in Florence, Italy, our Master Craftsman brings three generations of Italian woodworking mastery to Kitchen Core. The attention to detail and traditional techniques ensure every cabinet is a work of art.",
      bioAr:
        "تدرب في فلورنسا، إيطاليا، يجلب الحرفي الخبير ثلاثة أجيال من إتقان الأعمال الخشبية الإيطالية إلى كيتشن كور. الاهتمام بالتفاصيل والتقنيات التقليدية يضمن أن كل خزانة هي عمل فني.",
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
      id: "team-3",
      nameEn: "Team Member",
      nameAr: "عضو الفريق",
      roleEn: "Project Manager",
      roleAr: "مديرة المشاريع",
      bioEn:
        "Our Project Manager orchestrates every project from concept to completion, ensuring seamless execution and client satisfaction. The expertise in luxury project management has delivered on-time, on-budget excellence for over 50 high-end projects.",
      bioAr:
        "تنسق مديرة المشاريع كل مشروع من المفهوم إلى الإنجاز، مما يضمن التنفيذ السلس ورضا العملاء. الخبرة في إدارة المشاريع الفاخرة قدمت التميز في الوقت المحدد وضمن الميزانية لأكثر من 50 مشروعاً راقياً.",
      image: "/team/fatima.jpg",
      specialtiesEn: [
        "Project Management",
        "Client Coordination",
        "Quality Control",
      ],
      specialtiesAr: ["إدارة المشاريع", "تنسيق العملاء", "مراقبة الجودة"],
      email: "projects@kitchencore.com",
      linkedin: null,
      yearsOfExperience: "10",
      order: 3,
      published: true,
    },
    {
      id: "team-4",
      nameEn: "Team Member",
      nameAr: "عضو الفريق",
      roleEn: "Smart Technology Specialist",
      roleAr: "أخصائي التكنولوجيا الذكية",
      bioEn:
        "Our Smart Technology Specialist integrates cutting-edge smart home technology into every kitchen, creating seamless experiences. The expertise in IoT and automation ensures our kitchens are as intelligent as they are beautiful.",
      bioAr:
        "يدمج أخصائي التكنولوجيا الذكية أحدث تقنيات المنزل الذكي في كل مطبخ، مما يخلق تجارب سلسة. الخبرة في إنترنت الأشياء والأتمتة تضمن أن مطابخنا ذكية بقدر ما هي جميلة.",
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
      id: "team-5",
      nameEn: "Team Member",
      nameAr: "عضو الفريق",
      roleEn: "Materials Specialist",
      roleAr: "أخصائية المواد",
      bioEn:
        "Our Materials Specialist sources the finest materials from around the world—from Carrara marble to rare woods. The global network and discerning eye ensure every Kitchen Core project features only premium, sustainable materials.",
      bioAr:
        "تستورد أخصائية المواد أجود المواد من جميع أنحاء العالم - من رخام كارارا إلى الأخشاب النادرة. الشبكة العالمية والعين الثاقبة تضمن أن كل مشروع كيتشن كور يتميز فقط بمواد متميزة ومستدامة.",
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
      id: "team-6",
      nameEn: "Team Member",
      nameAr: "عضو الفريق",
      roleEn: "Installation Director",
      roleAr: "مدير التركيب",
      bioEn:
        "Our Installation Director leads the installation teams with precision and care. The 15 years of experience ensure flawless execution, transforming designs into reality with meticulous attention to every detail.",
      bioAr:
        "يقود مدير التركيب فرق التركيب بدقة وعناية. الخبرة التي تبلغ 15 عاماً تضمن التنفيذ الخالي من العيوب، وتحويل التصاميم إلى واقع مع اهتمام دقيق بكل التفاصيل.",
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
    await prisma.teamMember.upsert({
      where: { id: member.id },
      update: {},
      create: member,
    });
  }

  console.log("✅ About Page data seeded successfully!");
  console.log("\n📊 Seeded:");
  console.log("  - 1 Company profile");
  console.log("  - 1 Founder profile");
  console.log(`  - ${teamMembers.length} Team members`);
}

async function main() {
  try {
    await seedAboutPage();
  } catch (error) {
    console.error("❌ Error seeding About Page:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

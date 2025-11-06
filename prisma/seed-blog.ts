import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding blog posts...");

  const blogPosts = [
    {
      slug: "luxury-kitchen-trends-2025",
      titleEn: "Luxury Kitchen Design Trends for 2025",
      titleAr: "اتجاهات تصميم المطابخ الفاخرة لعام 2025",
      excerptEn:
        "Discover the latest trends shaping luxury kitchen design, from smart technology integration to sustainable materials and minimalist aesthetics.",
      excerptAr:
        "اكتشف أحدث الاتجاهات التي تشكل تصميم المطابخ الفاخرة، من تكامل التكنولوجيا الذكية إلى المواد المستدامة والجماليات البسيطة.",
      contentEn: `
        <h2>The Evolution of Luxury Kitchen Design</h2>
        <p>As we move into 2025, luxury kitchen design continues to evolve, blending cutting-edge technology with timeless elegance. Today's discerning clients demand spaces that are not only beautiful but also highly functional and sustainable.</p>

        <h3>1. Smart Technology Integration</h3>
        <p>The modern luxury kitchen is a hub of innovation. From voice-activated appliances to intelligent lighting systems that adjust based on time of day, technology is seamlessly integrated into every aspect of kitchen design. Smart refrigerators can inventory their contents and suggest recipes, while precision cooking devices ensure perfect results every time.</p>

        <h3>2. Sustainable Luxury</h3>
        <p>Sustainability is no longer optional—it's essential. High-end clients are increasingly requesting eco-friendly materials without compromising on aesthetics. This includes reclaimed wood, recycled glass countertops, and energy-efficient appliances that reduce environmental impact while maintaining luxury standards.</p>

        <h3>3. Minimalist Aesthetics</h3>
        <p>Clean lines, hidden storage, and clutter-free surfaces define the minimalist approach to luxury kitchen design. Integrated appliances disappear behind custom cabinetry, creating a seamless, sophisticated look that emphasizes quality over quantity.</p>

        <h3>4. Bold Material Choices</h3>
        <p>While minimalism reigns, material selection has become bolder. Natural stone with dramatic veining, exotic woods, and artisanal tiles create focal points that elevate the entire space. The key is balance—allowing statement materials to shine without overwhelming the design.</p>

        <h3>5. Multi-Functional Spaces</h3>
        <p>The luxury kitchen is no longer just for cooking. It's a social hub, a workspace, and an entertainment venue. Design must accommodate multiple activities simultaneously, with dedicated zones for cooking, dining, and casual gathering.</p>

        <p>At Kitchen Core, we stay ahead of these trends, ensuring every project reflects the latest innovations while maintaining timeless appeal.</p>
      `,
      contentAr: `
        <h2>تطور تصميم المطابخ الفاخرة</h2>
        <p>مع دخولنا عام 2025، يستمر تصميم المطابخ الفاخرة في التطور، حيث يمزج بين التكنولوجيا المتطورة والأناقة الخالدة. يطلب العملاء المميزون اليوم مساحات ليست جميلة فحسب، بل أيضًا عملية للغاية ومستدامة.</p>

        <h3>1. تكامل التكنولوجيا الذكية</h3>
        <p>المطبخ الفاخر الحديث هو مركز للابتكار. من الأجهزة المنشطة بالصوت إلى أنظمة الإضاءة الذكية التي تتكيف بناءً على الوقت من اليوم، يتم دمج التكنولوجيا بسلاسة في كل جانب من جوانب تصميم المطبخ.</p>

        <h3>2. الرفاهية المستدامة</h3>
        <p>لم تعد الاستدامة اختيارية - إنها ضرورية. يطلب العملاء المتميزون بشكل متزايد مواد صديقة للبيئة دون التنازل عن الجماليات.</p>

        <h3>3. الجماليات البسيطة</h3>
        <p>الخطوط النظيفة والتخزين المخفي والأسطح الخالية من الفوضى تحدد النهج البسيط لتصميم المطابخ الفاخرة.</p>

        <h3>4. خيارات المواد الجريئة</h3>
        <p>بينما تسود البساطة، أصبح اختيار المواد أكثر جرأة. الحجر الطبيعي مع العروق الدرامية والأخشاب الغريبة والبلاط الحرفي يخلق نقاط محورية ترفع المساحة بأكملها.</p>

        <h3>5. المساحات متعددة الوظائف</h3>
        <p>المطبخ الفاخر لم يعد مخصصًا للطهي فقط. إنه مركز اجتماعي ومساحة عمل ومكان للترفيه.</p>

        <p>في Kitchen Core، نبقى في صدارة هذه الاتجاهات، مما يضمن أن كل مشروع يعكس أحدث الابتكارات مع الحفاظ على الجاذبية الخالدة.</p>
      `,
      featuredImage: "/blog/luxury-trends-2025.jpg",
      category: "Design Trends",
      tags: ["Luxury Design", "Kitchen Trends", "Smart Technology", "Sustainability"],
      readingTime: 5,
      published: true,
      publishedAt: new Date("2025-01-15"),
      seoTitle: "2025 Luxury Kitchen Design Trends | Kitchen Core",
      seoDescription:
        "Explore the top luxury kitchen design trends for 2025, including smart technology, sustainable materials, and minimalist aesthetics.",
      seoKeywords: [
        "luxury kitchen trends",
        "2025 kitchen design",
        "smart kitchen technology",
        "sustainable kitchens",
        "minimalist kitchen design",
      ],
    },
    {
      slug: "italian-craftsmanship-excellence",
      titleEn: "The Art of Italian Craftsmanship in Kitchen Design",
      titleAr: "فن الحرفية الإيطالية في تصميم المطابخ",
      excerptEn:
        "Explore the centuries-old traditions of Italian craftsmanship and how they elevate luxury kitchen design to new heights of excellence.",
      excerptAr:
        "استكشف تقاليد الحرفية الإيطالية التي تمتد لقرون وكيف ترفع تصميم المطابخ الفاخرة إلى آفاق جديدة من التميز.",
      contentEn: `
        <h2>Italian Heritage in Modern Kitchens</h2>
        <p>Italian craftsmanship represents centuries of accumulated knowledge, passed down through generations of master artisans. This heritage forms the foundation of our approach at Kitchen Core.</p>

        <h3>Attention to Detail</h3>
        <p>Every joint, every surface, every finish is executed with meticulous precision. Italian craftsmen understand that luxury lies in the details—the seamless integration of materials, the perfect alignment of components, the flawless finish that only comes from years of experience.</p>

        <h3>Premium Materials</h3>
        <p>Italian kitchen design is synonymous with the finest materials. From rare marble quarried in Carrara to sustainably harvested woods from Tuscan forests, material selection is an art form in itself.</p>

        <h3>Timeless Design Philosophy</h3>
        <p>Italian design transcends trends, focusing instead on proportions, balance, and functionality that remain relevant for decades. This approach ensures that investments in Italian craftsmanship retain their value and appeal.</p>

        <p>At Kitchen Core, we bring this Italian tradition to every project, combining old-world craftsmanship with modern innovation.</p>
      `,
      contentAr: `
        <h2>التراث الإيطالي في المطابخ الحديثة</h2>
        <p>تمثل الحرفية الإيطالية قرونًا من المعرفة المتراكمة، التي تنتقل عبر أجيال من الحرفيين المتقنين. يشكل هذا التراث أساس نهجنا في Kitchen Core.</p>

        <h3>الاهتمام بالتفاصيل</h3>
        <p>كل مفصل، كل سطح، كل تشطيب يتم تنفيذه بدقة شديدة. يفهم الحرفيون الإيطاليون أن الرفاهية تكمن في التفاصيل.</p>

        <h3>المواد الممتازة</h3>
        <p>تصميم المطبخ الإيطالي مرادف لأفضل المواد. من الرخام النادر المستخرج من كارارا إلى الأخشاب المحصودة بشكل مستدام من غابات توسكانا.</p>

        <h3>فلسفة التصميم الخالدة</h3>
        <p>يتجاوز التصميم الإيطالي الاتجاهات، ويركز بدلاً من ذلك على النسب والتوازن والوظائف التي تظل ذات صلة لعقود.</p>

        <p>في Kitchen Core، نجلب هذا التقليد الإيطالي إلى كل مشروع، حيث نجمع بين الحرفية القديمة والابتكار الحديث.</p>
      `,
      featuredImage: "/blog/italian-craftsmanship.jpg",
      category: "Craftsmanship",
      tags: ["Italian Design", "Craftsmanship", "Luxury Materials", "Design Philosophy"],
      readingTime: 4,
      published: true,
      publishedAt: new Date("2025-01-10"),
      seoTitle: "Italian Kitchen Craftsmanship | Kitchen Core Excellence",
      seoDescription:
        "Discover how Italian craftsmanship traditions elevate luxury kitchen design through attention to detail and premium materials.",
      seoKeywords: [
        "Italian craftsmanship",
        "luxury kitchen design",
        "Italian kitchen design",
        "premium materials",
      ],
    },
    {
      slug: "smart-kitchen-technology-guide",
      titleEn: "Complete Guide to Smart Kitchen Technology",
      titleAr: "دليل شامل لتكنولوجيا المطبخ الذكي",
      excerptEn:
        "Transform your kitchen with intelligent systems that enhance functionality, efficiency, and convenience. Learn about the latest smart kitchen innovations.",
      excerptAr:
        "حول مطبخك باستخدام الأنظمة الذكية التي تعزز الوظائف والكفاءة والراحة. تعرف على أحدث ابتكارات المطبخ الذكي.",
      contentEn: `
        <h2>The Smart Kitchen Revolution</h2>
        <p>Smart kitchen technology has evolved from a luxury add-on to an essential component of modern kitchen design. Today's intelligent systems seamlessly integrate into daily routines, making cooking more efficient and enjoyable.</p>

        <h3>Smart Appliances</h3>
        <p>Modern smart appliances connect to your home network, allowing remote control and monitoring. Preheat your oven on your way home, receive alerts when your refrigerator door is left open, or start your coffee maker from bed.</p>

        <h3>Voice Control Integration</h3>
        <p>Voice-activated systems allow hands-free control of lighting, temperature, appliances, and entertainment. This is particularly valuable when your hands are full or messy during food preparation.</p>

        <h3>Precision Cooking Technology</h3>
        <p>Advanced cooking systems use sensors and algorithms to ensure perfect results. Induction cooktops with temperature probes, steam ovens with automated programs, and sous vide systems bring professional-grade precision to home cooking.</p>

        <h3>Energy Management</h3>
        <p>Smart systems monitor and optimize energy usage, reducing utility costs while minimizing environmental impact. Track consumption patterns and receive recommendations for more efficient operation.</p>

        <h3>Safety Features</h3>
        <p>Intelligent safety systems detect potential hazards like gas leaks, water leaks, or forgotten appliances, providing peace of mind and preventing costly damage.</p>

        <p>Kitchen Core specializes in seamlessly integrating smart technology into luxury kitchen design, ensuring systems are intuitive and invisible until needed.</p>
      `,
      contentAr: `
        <h2>ثورة المطبخ الذكي</h2>
        <p>تطورت تكنولوجيا المطبخ الذكي من إضافة فاخرة إلى مكون أساسي في تصميم المطبخ الحديث. تتكامل الأنظمة الذكية اليوم بسلاسة في الروتين اليومي.</p>

        <h3>الأجهزة الذكية</h3>
        <p>تتصل الأجهزة الذكية الحديثة بشبكة منزلك، مما يتيح التحكم والمراقبة عن بُعد.</p>

        <h3>تكامل التحكم بالصوت</h3>
        <p>تتيح الأنظمة المنشطة بالصوت التحكم بدون استخدام اليدين في الإضاءة ودرجة الحرارة والأجهزة والترفيه.</p>

        <h3>تكنولوجيا الطهي الدقيق</h3>
        <p>تستخدم أنظمة الطهي المتقدمة أجهزة استشعار وخوارزميات لضمان نتائج مثالية.</p>

        <h3>إدارة الطاقة</h3>
        <p>تراقب الأنظمة الذكية استخدام الطاقة وتحسنه، مما يقلل من تكاليف المرافق مع تقليل التأثير البيئي.</p>

        <h3>ميزات السلامة</h3>
        <p>تكتشف أنظمة السلامة الذكية المخاطر المحتملة مثل تسربات الغاز أو الماء أو الأجهزة المنسية.</p>

        <p>تتخصص Kitchen Core في دمج التكنولوجيا الذكية بسلاسة في تصميم المطابخ الفاخرة.</p>
      `,
      featuredImage: "/blog/smart-kitchen-tech.jpg",
      category: "Technology",
      tags: ["Smart Kitchen", "Technology", "Innovation", "Home Automation"],
      readingTime: 6,
      published: true,
      publishedAt: new Date("2025-01-05"),
      seoTitle: "Smart Kitchen Technology Guide | Kitchen Core",
      seoDescription:
        "Complete guide to smart kitchen technology including appliances, voice control, precision cooking, and energy management.",
      seoKeywords: [
        "smart kitchen",
        "kitchen technology",
        "smart appliances",
        "home automation",
        "voice control kitchen",
      ],
    },
    {
      slug: "choosing-perfect-kitchen-countertop",
      titleEn: "Choosing the Perfect Countertop for Your Luxury Kitchen",
      titleAr: "اختيار سطح العمل المثالي لمطبخك الفاخر",
      excerptEn:
        "A comprehensive guide to selecting the ideal countertop material, from classic marble to innovative engineered surfaces.",
      excerptAr:
        "دليل شامل لاختيار مادة سطح العمل المثالية، من الرخام الكلاسيكي إلى الأسطح الهندسية المبتكرة.",
      contentEn: `
        <h2>Countertop Materials: A Comprehensive Guide</h2>
        <p>The countertop is arguably the most important surface in your kitchen—it defines the aesthetic, impacts functionality, and represents a significant investment. Choosing the right material requires careful consideration of multiple factors.</p>

        <h3>Natural Stone</h3>
        <p><strong>Marble:</strong> The epitome of luxury, marble offers unparalleled beauty with its unique veining. However, it requires regular maintenance and is susceptible to staining and etching from acidic substances.</p>
        <p><strong>Granite:</strong> More durable than marble, granite provides excellent heat resistance and comes in a wide variety of colors and patterns. It requires periodic sealing to maintain stain resistance.</p>
        <p><strong>Quartzite:</strong> Often confused with quartz, this natural stone offers the beauty of marble with greater durability and heat resistance.</p>

        <h3>Engineered Surfaces</h3>
        <p><strong>Quartz:</strong> Combining crushed stone with resin, engineered quartz offers the look of natural stone with superior stain resistance and minimal maintenance. It's non-porous, making it highly hygienic.</p>
        <p><strong>Porcelain:</strong> Large-format porcelain slabs can mimic natural stone while offering exceptional durability and resistance to heat, scratches, and stains.</p>

        <h3>Exotic Options</h3>
        <p><strong>Exotic Granites:</strong> Rare stones from around the world can create stunning focal points with unique colors and patterns.</p>
        <p><strong>Semi-Precious Stones:</strong> For the ultimate in luxury, some clients incorporate semi-precious stones like agate or onyx, often backlit for dramatic effect.</p>

        <h3>Practical Considerations</h3>
        <p>Beyond aesthetics, consider your cooking habits, maintenance preferences, and budget. High-traffic kitchens may benefit from more durable materials, while showcase kitchens can accommodate more delicate options.</p>

        <p>At Kitchen Core, we guide clients through the selection process, providing samples, discussing pros and cons, and ensuring the chosen material aligns with both aesthetic vision and practical needs.</p>
      `,
      contentAr: `
        <h2>مواد سطح العمل: دليل شامل</h2>
        <p>يمكن القول إن سطح العمل هو السطح الأكثر أهمية في مطبخك - فهو يحدد الجمالية، ويؤثر على الوظائف، ويمثل استثمارًا كبيرًا.</p>

        <h3>الحجر الطبيعي</h3>
        <p><strong>الرخام:</strong> جوهر الفخامة، يوفر الرخام جمالًا لا مثيل له مع عروقه الفريدة.</p>
        <p><strong>الجرانيت:</strong> أكثر متانة من الرخام، يوفر الجرانيت مقاومة ممتازة للحرارة.</p>
        <p><strong>الكوارتزيت:</strong> غالبًا ما يتم الخلط بينه وبين الكوارتز، يوفر هذا الحجر الطبيعي جمال الرخام مع متانة أكبر.</p>

        <h3>الأسطح الهندسية</h3>
        <p><strong>الكوارتز:</strong> الجمع بين الحجر المسحوق والراتنج، يوفر الكوارتز الهندسي مظهر الحجر الطبيعي مع مقاومة فائقة للبقع.</p>
        <p><strong>البورسلين:</strong> يمكن لألواح البورسلين كبيرة الحجم محاكاة الحجر الطبيعي مع توفير متانة استثنائية.</p>

        <h3>الخيارات الغريبة</h3>
        <p><strong>الجرانيت الغريب:</strong> يمكن للأحجار النادرة من جميع أنحاء العالم إنشاء نقاط محورية مذهلة بألوان وأنماط فريدة.</p>

        <h3>الاعتبارات العملية</h3>
        <p>بالإضافة إلى الجماليات، ضع في اعتبارك عادات الطهي الخاصة بك وتفضيلات الصيانة والميزانية.</p>

        <p>في Kitchen Core، نرشد العملاء خلال عملية الاختيار، ونقدم العينات، ونناقش الإيجابيات والسلبيات.</p>
      `,
      featuredImage: "/blog/countertop-guide.jpg",
      category: "Materials",
      tags: ["Countertops", "Materials", "Marble", "Quartz", "Design Guide"],
      readingTime: 7,
      published: true,
      publishedAt: new Date("2025-01-01"),
      seoTitle: "Luxury Kitchen Countertop Guide | Kitchen Core",
      seoDescription:
        "Comprehensive guide to choosing the perfect countertop material for your luxury kitchen, including marble, granite, quartz, and more.",
      seoKeywords: [
        "kitchen countertops",
        "marble countertops",
        "quartz countertops",
        "granite countertops",
        "luxury kitchen materials",
      ],
    },
  ];

  for (const post of blogPosts) {
    const created = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
    console.log(`✅ Created blog post: ${created.titleEn}`);
  }

  console.log("✨ Blog seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding blog posts:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

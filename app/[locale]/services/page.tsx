import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { iconMap } from "@/lib/icons";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === "ar"
        ? "خدماتنا | Kitchen Core"
        : "Our Services | Kitchen Core",
    description:
      locale === "ar"
        ? "استكشف خدماتنا الشاملة في تصميم وتنفيذ المطابخ الفاخرة - من المطابخ الخشبية الحديثة والكلاسيكية إلى الألمنيوم وغرف النوم"
        : "Explore our comprehensive luxury kitchen design and installation services - from modern and classic wooden kitchens to aluminum and bedroom solutions",
  };
}

// Fallback data when database tables don't exist
const fallbackProductServices = [
  {
    id: "modernWood",
    slug: "modern-kitchens-wood",
    heroImage: "/صور المطابخ العصرية/04cc5592-d3e3-4127-a6ce-0ddeca503bda.jpg",
    titleEn: "Modern Kitchens – Wood",
    titleAr: "مطابخ عصرية - خشب",
    taglineEn: "Precise design, smart details.",
    taglineAr: "تصميم دقيق، تفاصيل ذكية.",
    descriptionEn: "The luxury of clean lines and functionality that suits a modern lifestyle.",
    descriptionAr: "فخامة الخطوط النظيفة والوظائف العملية التي تناسب أسلوب الحياة العصري.",
  },
  {
    id: "classicWood",
    slug: "classic-kitchens-wood",
    heroImage: "/صور مطابخ الكلاسيك/0ffc8595-78ff-4e27-87ea-06531654926b.jpg",
    titleEn: "Classic Kitchens – Wood",
    titleAr: "مطابخ كلاسيك - خشب",
    taglineEn: "Timeless elegance.",
    taglineAr: "أناقة خالدة.",
    descriptionEn: "Luxurious details and a presence that reflects sophistication and warmth.",
    descriptionAr: "تفاصيل فاخرة وحضور يعكس الرقي والدفء.",
  },
  {
    id: "aluminum",
    slug: "aluminum-kitchens",
    heroImage: "/صور مطابخ الألومنيوم/3752c5da-5463-42ff-a383-fd92f6ca9ff7.jpg",
    titleEn: "Aluminum Kitchens",
    titleAr: "مطابخ ألومنيوم",
    taglineEn: "A practical solution that lasts.",
    taglineAr: "حل عملي يدوم.",
    descriptionEn: "Resistant to external factors, with design options that give you beauty without maintenance.",
    descriptionAr: "مقاومة للعوامل الخارجية، مع خيارات تصميم تمنحك الجمال بدون صيانة.",
  },
  {
    id: "bedrooms",
    slug: "bedrooms-wardrobes",
    heroImage: "/Bedrooms & Wardrobes/1.jpeg",
    titleEn: "Bedrooms & Wardrobes",
    titleAr: "غرف النوم وخزائن الملابس",
    taglineEn: "Spaces that reflect your style.",
    taglineAr: "مساحات تعكس أسلوبك.",
    descriptionEn: "Smart organization that gives every item its place, making every day an easier start.",
    descriptionAr: "تنظيم ذكي يمنح كل قطعة مكانها، مما يجعل كل يوم بداية أسهل.",
  },
];

const fallbackCustomerServices = [
  { id: "1", slug: "site-inspection", icon: "MapPin", titleEn: "Site Inspection & Measurements", titleAr: "معاينة الموقع والقياسات", descriptionEn: "Book an appointment for our team to visit your site and take precise measurements.", descriptionAr: "احجز موعداً لفريقنا لزيارة موقعك وأخذ القياسات الدقيقة." },
  { id: "2", slug: "design-consultation", icon: "Palette", titleEn: "Design Consultation", titleAr: "استشارة التصميم", descriptionEn: "Meet with our designers to discuss your vision and create your perfect design.", descriptionAr: "قابل مصممينا لمناقشة رؤيتك وإنشاء تصميمك المثالي." },
  { id: "3", slug: "price-quotation", icon: "Calculator", titleEn: "Price Quotation", titleAr: "عرض الأسعار", descriptionEn: "Get a detailed quote with transparent pricing.", descriptionAr: "احصل على عرض أسعار مفصل بأسعار شفافة." },
  { id: "4", slug: "project-tracking", icon: "ClipboardList", titleEn: "Project Tracking", titleAr: "متابعة المشروع", descriptionEn: "Track your project through fabrication and installation.", descriptionAr: "تتبع مشروعك خلال مراحل التصنيع والتركيب." },
  { id: "5", slug: "maintenance", icon: "Wrench", titleEn: "Request Maintenance", titleAr: "طلب الصيانة", descriptionEn: "Submit a maintenance request and we'll assist you promptly.", descriptionAr: "قدّم طلب صيانة وسنساعدك على الفور." },
];

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  // Fetch product services from database with fallback
  let productServices;
  try {
    productServices = await prisma.productService.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
  } catch {
    productServices = fallbackProductServices;
  }

  // Fetch customer services from database with fallback
  let customerServices;
  try {
    customerServices = await prisma.customerService.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
  } catch {
    customerServices = fallbackCustomerServices;
  }

  // Fetch additional services from database (legacy Service model)
  const additionalServices = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <main className="min-h-screen bg-black pt-28 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-black via-background-dark to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light block">
              {isArabic ? "خدماتنا" : "OUR SERVICES"}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
              {isArabic ? "خدمات متكاملة" : "Comprehensive Services"}
            </h1>
            <p className="text-lg md:text-xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed">
              {isArabic
                ? "نقدم مجموعة كاملة من خدمات تصميم وتنفيذ المطابخ الفاخرة، من الاستشارة الأولية حتى التسليم النهائي"
                : "From initial consultation to final installation, we provide end-to-end luxury kitchen design and execution services"}
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-green-glow rounded-full filter blur-3xl opacity-10 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-green-glow rounded-full filter blur-3xl opacity-10 -translate-y-1/2" />
      </section>

      {/* Main Services - Products */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-green-vibrant text-sm tracking-[0.3em] font-light block mb-4">
            {isArabic ? "منتجاتنا" : "OUR PRODUCTS"}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white">
            {isArabic ? "المطابخ وغرف النوم" : "Kitchens & Bedrooms"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {productServices.map((service, index) => (
            <Link
              key={service.id}
              href={`/${locale}/services/${service.slug}`}
              className="group relative bg-background-card border border-gray-dark overflow-hidden hover:border-green-primary/50 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={service.heroImage}
                  alt={isArabic ? service.titleAr : service.titleEn}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Service Number */}
                <div className="absolute top-4 right-4 text-5xl font-serif text-white/20 group-hover:text-green-primary/40 transition-colors duration-500">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <span className="text-green-vibrant text-xs tracking-widest font-light block mb-2">
                  {isArabic ? service.taglineAr : service.taglineEn}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-3 group-hover:text-green-vibrant transition-colors duration-300">
                  {isArabic ? service.titleAr : service.titleEn}
                </h3>
                <p className="text-gray-light leading-relaxed mb-6">
                  {isArabic
                    ? service.descriptionAr.substring(0, 150) + "..."
                    : service.descriptionEn.substring(0, 150) + "..."}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-green-primary text-sm font-medium">
                  <span>{isArabic ? "اكتشف المزيد" : "Learn More"}</span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                      isArabic ? "rotate-180 group-hover:-translate-x-1" : ""
                    }`}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Additional Services from Database */}
      {additionalServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-gray-dark">
          <div className="text-center mb-12">
            <span className="text-green-vibrant text-sm tracking-[0.3em] font-light block mb-4">
              {isArabic ? "خدمات إضافية" : "ADDITIONAL SERVICES"}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white">
              {isArabic ? "المزيد من خدماتنا" : "More Services"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalServices.map((service, index) => (
              <div
                key={service.id}
                className="group relative bg-background-card border border-gray-dark p-8 hover:border-green-primary/50 transition-all duration-500"
              >
                {/* Service Number */}
                <div className="absolute top-8 right-8 text-6xl font-serif text-green-primary/20 group-hover:text-green-primary/40 transition-colors duration-500">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-serif text-3xl text-white mb-4 group-hover:text-green-vibrant transition-colors duration-300">
                    {isArabic
                      ? service.titleAr || service.titleEn
                      : service.titleEn}
                  </h3>

                  <p className="text-gray-light leading-relaxed mb-6">
                    {isArabic
                      ? service.descriptionAr || service.descriptionEn
                      : service.descriptionEn}
                  </p>

                  {/* Features List */}
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-primary flex-shrink-0 mt-0.5" />
                          <span className="text-gray-light text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border border-green-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Customer Services */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-gray-dark">
        <div className="text-center mb-12">
          <span className="text-green-vibrant text-sm tracking-[0.3em] font-light block mb-4">
            {isArabic ? "خدمات العملاء" : "CUSTOMER SERVICES"}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            {isArabic ? "كيف يمكننا مساعدتك؟" : "How Can We Help?"}
          </h2>
          <p className="text-gray-light text-lg max-w-2xl mx-auto font-light">
            {isArabic
              ? "من المعاينة الأولية حتى الصيانة، نحن معك في كل خطوة"
              : "From initial inspection to maintenance, we're with you every step"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customerServices.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <Link
                key={service.id}
                href={`/${locale}/services/customer/${service.slug}`}
                className="group block bg-black/50 border border-gray-dark hover:border-green-primary/50 p-6 transition-all duration-500"
              >
                {/* Icon */}
                {IconComponent && (
                  <div className="w-12 h-12 bg-green-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-green-primary" />
                  </div>
                )}

                <h3 className="font-serif text-lg text-white mb-2 group-hover:text-green-vibrant transition-colors">
                  {isArabic ? service.titleAr : service.titleEn}
                </h3>
                <p className="text-gray-light text-sm leading-relaxed mb-4">
                  {isArabic ? service.descriptionAr : service.descriptionEn}
                </p>
                <div className="flex items-center gap-2 text-green-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{isArabic ? "اكتشف المزيد" : "Learn More"}</span>
                  <ArrowRight
                    className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-background-dark to-black border border-green-primary/30 p-12 text-center">
          <h2 className="font-serif text-4xl text-white mb-6">
            {isArabic ? "جاهز للبدء؟" : "Ready to Get Started?"}
          </h2>

          <Link
            href={`/${locale}#contact`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-primary text-black font-medium hover:bg-green-vibrant transition-all duration-300 text-sm tracking-wider group"
          >
            <span>
              {isArabic ? "احصل على استشارة مجانية" : "GET FREE CONSULTATION"}
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}

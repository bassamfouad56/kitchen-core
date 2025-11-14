import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { Check } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

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

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  // Fetch all published services from database
  const services = await prisma.service.findMany({
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

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {services.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-light text-lg">
              {isArabic
                ? "لا توجد خدمات متاحة حالياً"
                : "No services available at the moment"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
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
                  <h2 className="font-serif text-3xl text-white mb-4 group-hover:text-green-vibrant transition-colors duration-300">
                    {isArabic
                      ? service.titleAr || service.titleEn
                      : service.titleEn}
                  </h2>

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
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-background-dark to-black border border-green-primary/30 p-12 text-center">
          <h2 className="font-serif text-4xl text-white mb-6">
            {isArabic ? "جاهز للبدء؟" : "Ready to Get Started?"}
          </h2>
          <p className="text-gray-light text-lg mb-8 max-w-2xl mx-auto">
            {isArabic
              ? "تواصل معنا اليوم للحصول على استشارة مجانية وتحويل رؤيتك إلى واقع"
              : "Contact us today for a free consultation and let's transform your vision into reality"}
          </p>
          <a
            href={`/${locale}#contact`}
            className="inline-block px-8 py-4 bg-green-primary text-black font-medium hover:bg-green-vibrant transition-all duration-300 text-sm tracking-wider"
          >
            {isArabic ? "احصل على استشارة مجانية" : "GET FREE CONSULTATION"}
          </a>
        </div>
      </section>
    </main>
  );
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { iconMap } from "@/lib/icons";
import StickyCTA from "@/app/components/StickyCTA";
import ServiceGallery from "@/app/components/ServiceGallery";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const translations = {
  en: {
    backToServices: "Back to Services",
    ourProjects: "Our Projects",
    keyFeatures: "Key Features",
    whyChoose: "Why Choose",
    gallery: "Gallery",
    readyToStart: "Ready to Start Your Project?",
    ctaDescription:
      "Contact us today for a free consultation and let us bring your vision to life.",
    getConsultation: "GET FREE CONSULTATION",
    viewProject: "View Project",
    noProjects: "No projects available in this category yet.",
    otherProducts: "OTHER PRODUCTS",
    exploreMore: "Explore More",
    customerServices: "CUSTOMER SERVICES",
    howCanWeHelp: "How Can We Help?",
  },
  ar: {
    backToServices: "العودة للخدمات",
    ourProjects: "مشاريعنا",
    keyFeatures: "المميزات الرئيسية",
    whyChoose: "لماذا تختار",
    gallery: "المعرض",
    readyToStart: "جاهز لبدء مشروعك؟",
    ctaDescription:
      "تواصل معنا اليوم للحصول على استشارة مجانية ودعنا نحول رؤيتك إلى واقع.",
    getConsultation: "احصل على استشارة مجانية",
    viewProject: "عرض المشروع",
    noProjects: "لا توجد مشاريع متاحة في هذه الفئة حتى الآن.",
    otherProducts: "منتجات أخرى",
    exploreMore: "استكشف المزيد",
    customerServices: "خدمات العملاء",
    howCanWeHelp: "كيف يمكننا مساعدتك؟",
  },
};

export async function generateStaticParams() {
  try {
    const services = await prisma.productService.findMany({
      select: { slug: true },
    });
    return services.map((service) => ({
      slug: service.slug,
    }));
  } catch {
    // Return empty array if table doesn't exist yet
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  const service = await prisma.productService.findUnique({
    where: { slug },
  });

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const isArabic = locale === "ar";

  return {
    title: `${isArabic ? service.titleAr : service.titleEn} | Kitchen Core`,
    description: isArabic ? service.descriptionAr : service.descriptionEn,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const isArabic = locale === "ar";

  // Fetch the product service from database
  const service = await prisma.productService.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!service) {
    notFound();
  }

  // Fetch other product services for "Explore More" section
  const otherServices = await prisma.productService.findMany({
    where: {
      published: true,
      id: { not: service.id },
    },
    orderBy: { order: "asc" },
    include: {
      images: {
        take: 1,
        orderBy: { order: "asc" },
      },
    },
  });

  // Fetch customer services for related section
  const customerServices = await prisma.customerService.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    take: 5,
  });

  const t = translations[locale as "en" | "ar"] || translations.en;
  const title = isArabic ? service.titleAr : service.titleEn;
  const tagline = isArabic ? service.taglineAr : service.taglineEn;
  const description = isArabic ? service.descriptionAr : service.descriptionEn;
  const features = isArabic ? service.featuresAr : service.featuresEn;
  const benefits = isArabic ? service.benefitsAr : service.benefitsEn;

  // Convert images to array of strings for ServiceGallery
  const galleryImages = service.images.map((img) => img.src);

  // Fetch related projects from database
  const projects = await prisma.project.findMany({
    where: {
      category: service.dbCategory,
      published: true,
    },
    orderBy: { order: "asc" },
    take: 6,
  });

  return (
    <main className="min-h-screen bg-black pt-28 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-black via-background-dark to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-green-glow rounded-full filter blur-3xl opacity-10 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-green-glow rounded-full filter blur-3xl opacity-10 -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-green-primary hover:text-green-vibrant transition-colors mb-8"
          >
            <ArrowLeft className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
            <span className="text-sm tracking-wider">{t.backToServices}</span>
          </Link>

          <div className="text-center">
            <span className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light block">
              {tagline}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <ServiceGallery
        images={galleryImages}
        serviceTitle={title}
        serviceSlug={service.slug}
        locale={locale}
        galleryTitle={t.gallery}
      />

      {/* Features & Benefits */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Key Features */}
          <div className="bg-background-card border border-gray-dark p-8">
            <h2 className="font-serif text-2xl text-white mb-6">
              {t.keyFeatures}
            </h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-light">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose */}
          <div className="bg-gradient-to-br from-green-darker/20 to-black border border-green-primary/30 p-8">
            <h2 className="font-serif text-2xl text-white mb-6">
              {t.whyChoose} {title}
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-primary/20 border border-green-primary/50 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-primary text-sm font-medium">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-gray-light pt-1">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {projects.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <h2 className="font-serif text-3xl text-white mb-8 text-center">
            {t.ourProjects}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group border border-gray-dark hover:border-green-primary/50 transition-all duration-500 overflow-hidden bg-background-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={isArabic ? project.titleAr : project.titleEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-serif text-xl">
                      {isArabic ? project.titleAr : project.titleEn}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-light text-sm line-clamp-2">
                    {isArabic ? project.descriptionAr : project.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Other Product Services */}
      {otherServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-gray-dark">
          <div className="text-center mb-12">
            <span className="text-green-vibrant text-sm tracking-[0.3em] font-light block mb-4">
              {t.otherProducts}
            </span>
            <h2 className="font-serif text-4xl text-white">{t.exploreMore}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {otherServices.map((otherService) => {
              const otherTitle = isArabic
                ? otherService.titleAr
                : otherService.titleEn;
              const otherTagline = isArabic
                ? otherService.taglineAr
                : otherService.taglineEn;
              const coverImage =
                otherService.images[0]?.src || otherService.heroImage;
              return (
                <Link
                  key={otherService.id}
                  href={`/${locale}/services/${otherService.slug}`}
                  className="group relative aspect-[4/3] overflow-hidden border border-gray-dark hover:border-green-primary/50 transition-all duration-500"
                >
                  <Image
                    src={coverImage}
                    alt={otherTitle}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-green-vibrant text-xs tracking-wider block mb-1">
                      {otherTagline}
                    </span>
                    <h3 className="text-white font-serif text-lg group-hover:text-green-vibrant transition-colors">
                      {otherTitle}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Customer Services */}
      {customerServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-gray-dark">
          <div className="text-center mb-12">
            <span className="text-green-vibrant text-sm tracking-[0.3em] font-light block mb-4">
              {t.customerServices}
            </span>
            <h2 className="font-serif text-4xl text-white">
              {t.howCanWeHelp}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {customerServices.map((cs) => {
              const ServiceIcon = iconMap[cs.icon];
              const csTitle = isArabic ? cs.titleAr : cs.titleEn;
              return (
                <Link
                  key={cs.id}
                  href={`/${locale}/services/customer/${cs.slug}`}
                  className="group bg-background-card border border-gray-dark p-6 hover:border-green-primary/50 transition-all duration-500 text-center"
                >
                  {ServiceIcon && (
                    <ServiceIcon className="w-8 h-8 text-green-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  )}
                  <h3 className="text-white text-sm font-medium group-hover:text-green-vibrant transition-colors">
                    {csTitle}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 pb-32">
        <div className="bg-gradient-to-r from-background-dark to-black border border-green-primary/30 p-12 text-center">
          <h2 className="font-serif text-4xl text-white mb-6">
            {t.readyToStart}
          </h2>
          <p className="text-gray-light text-lg mb-8 max-w-2xl mx-auto">
            {t.ctaDescription}
          </p>
          <Link
            href={`/${locale}#contact`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-primary text-black font-medium hover:bg-green-vibrant transition-all duration-300 text-sm tracking-wider group"
          >
            <span>{t.getConsultation}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Sticky CTA */}
      <StickyCTA serviceTitle={title} locale={locale} />
    </main>
  );
}

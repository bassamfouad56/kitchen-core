import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Phone, Clock, CheckCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { iconMap } from "@/lib/icons";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  try {
    const services = await prisma.customerService.findMany({
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

  const service = await prisma.customerService.findUnique({
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

export default async function CustomerServicePage({ params }: Props) {
  const { locale, slug } = await params;
  const isArabic = locale === "ar";

  // Fetch the customer service from database
  const service = await prisma.customerService.findUnique({
    where: { slug },
  });

  if (!service) {
    notFound();
  }

  // Fetch other customer services
  const otherServices = await prisma.customerService.findMany({
    where: {
      published: true,
      id: { not: service.id },
    },
    orderBy: { order: "asc" },
  });

  // Fetch product services for related section
  const productServices = await prisma.productService.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  const Icon = iconMap[service.icon];
  const title = isArabic ? service.titleAr : service.titleEn;
  const tagline = isArabic ? service.taglineAr : service.taglineEn;
  const description = isArabic ? service.descriptionAr : service.descriptionEn;
  const steps = isArabic ? service.stepsAr : service.stepsEn;
  const benefits = isArabic ? service.benefitsAr : service.benefitsEn;

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
            <span className="text-sm tracking-wider">
              {isArabic ? "العودة للخدمات" : "Back to Services"}
            </span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-primary/20 border border-green-primary/50 flex items-center justify-center">
                  {Icon && <Icon className="w-6 h-6 text-green-primary" />}
                </div>
                <span className="text-green-vibrant text-sm tracking-[0.3em] font-light">
                  {isArabic ? "خدمات العملاء" : "CUSTOMER SERVICE"}
                </span>
              </div>

              <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">
                {title}
              </h1>

              {tagline && (
                <p className="text-green-vibrant text-lg mb-6">{tagline}</p>
              )}

              <p className="text-gray-light text-lg leading-relaxed mb-8">
                {description}
              </p>

              {/* Quick Contact */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${locale}#contact`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-primary text-black font-medium hover:bg-green-vibrant transition-all duration-300 text-sm tracking-wider"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isArabic ? "احجز الآن" : "Book Now"}</span>
                </Link>
                <a
                  href="https://wa.me/966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-green-primary text-green-primary hover:bg-green-primary hover:text-black transition-all duration-300 text-sm tracking-wider"
                >
                  <span>{isArabic ? "واتساب" : "WhatsApp"}</span>
                </a>
              </div>
            </div>

            {/* Image */}
            {service.image && (
              <div className="relative aspect-[4/3] overflow-hidden border border-gray-dark">
                <Image
                  src={service.image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      {steps.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <span className="text-green-vibrant text-sm tracking-[0.3em] font-light block mb-4">
              {isArabic ? "كيف تعمل" : "HOW IT WORKS"}
            </span>
            <h2 className="font-serif text-4xl text-white">
              {isArabic ? "خطوات العملية" : "The Process"}
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-background-card border border-gray-dark p-6 hover:border-green-primary/50 transition-all duration-500 group"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-6 w-8 h-8 bg-green-primary text-black flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-green-primary/50" />
                )}

                <p className="text-gray-light text-sm leading-relaxed mt-4">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Benefits */}
      {benefits.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-green-vibrant text-sm tracking-[0.3em] font-light block mb-4">
                {isArabic ? "لماذا تختارنا" : "WHY CHOOSE US"}
              </span>
              <h2 className="font-serif text-4xl text-white mb-8">
                {isArabic ? "مميزات الخدمة" : "Service Benefits"}
              </h2>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-light">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-darker/20 to-black border border-green-primary/30 p-8">
              <Clock className="w-12 h-12 text-green-primary mb-6" />
              <h3 className="font-serif text-2xl text-white mb-4">
                {isArabic ? "جاهز للبدء؟" : "Ready to Get Started?"}
              </h3>
              <p className="text-gray-light mb-6">
                {isArabic
                  ? "تواصل معنا اليوم وسيقوم فريقنا بالتواصل معك خلال 24 ساعة"
                  : "Contact us today and our team will get back to you within 24 hours"}
              </p>
              <Link
                href={`/${locale}#contact`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-primary text-black font-medium hover:bg-green-vibrant transition-all duration-300 text-sm tracking-wider group"
              >
                <span>{isArabic ? "تواصل معنا" : "Contact Us"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Other Customer Services */}
      {otherServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-gray-dark">
          <div className="text-center mb-12">
            <span className="text-green-vibrant text-sm tracking-[0.3em] font-light block mb-4">
              {isArabic ? "خدمات أخرى" : "OTHER SERVICES"}
            </span>
            <h2 className="font-serif text-4xl text-white">
              {isArabic ? "خدمات العملاء الأخرى" : "Other Customer Services"}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherServices.map((cs) => {
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

      {/* Product Services */}
      {productServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-gray-dark">
          <div className="text-center mb-12">
            <span className="text-green-vibrant text-sm tracking-[0.3em] font-light block mb-4">
              {isArabic ? "منتجاتنا" : "OUR PRODUCTS"}
            </span>
            <h2 className="font-serif text-4xl text-white">
              {isArabic ? "استكشف منتجاتنا" : "Explore Our Products"}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productServices.map((ps) => {
              const psTitle = isArabic ? ps.titleAr : ps.titleEn;
              return (
                <Link
                  key={ps.id}
                  href={`/${locale}/services/${ps.slug}`}
                  className="group relative aspect-[4/3] overflow-hidden border border-gray-dark hover:border-green-primary/50 transition-all duration-500"
                >
                  <Image
                    src={ps.heroImage}
                    alt={psTitle}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-sm font-medium group-hover:text-green-vibrant transition-colors">
                      {psTitle}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}

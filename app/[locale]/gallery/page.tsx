import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CinematicBentoGallery } from "@/app/components/CinematicBentoGallery";
import { CinematicGalleryHero } from "@/app/components/CinematicGalleryHero";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === "ar" ? "معرض الصور | Kitchen Core" : "Gallery | Kitchen Core",
    description:
      locale === "ar"
        ? "استعرض مجموعتنا الكاملة من صور المطابخ الفاخرة - مطابخ خشبية حديثة، كلاسيكية، ألمنيوم وغرف نوم"
        : "Browse our complete collection of luxury kitchen images - modern wooden, classic, aluminum kitchens and bedrooms",
  };
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  // Fetch all published gallery images
  const galleryImages = await prisma.galleryImage.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  // Group by category for filter tabs
  const categories = [
    { key: "ALL", labelEn: "All", labelAr: "الكل" },
    { key: "MODERN_WOODEN", labelEn: "Modern Wooden", labelAr: "خشب حديث" },
    {
      key: "CLASSIC_WOODEN",
      labelEn: "Classic Wooden",
      labelAr: "خشب كلاسيكي",
    },
    { key: "ALUMINUM", labelEn: "Aluminum", labelAr: "ألمنيوم" },
    { key: "BEDROOMS", labelEn: "Bedrooms", labelAr: "غرف النوم" },
  ];

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <CinematicGalleryHero locale={locale} />

      {/* Gallery Section */}
      <section className="relative py-20 md:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-green-primary/5 rounded-full filter blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-green-vibrant/5 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8">
          {galleryImages.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-8 border-2 border-green-primary/30 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-light text-xl font-light">
                {isArabic
                  ? "لا توجد صور متاحة حالياً"
                  : "No images available at the moment"}
              </p>
              <p className="text-gray-light/60 text-sm mt-2">
                {isArabic
                  ? "يرجى العودة لاحقاً"
                  : "Please check back later"}
              </p>
            </div>
          ) : (
            <CinematicBentoGallery
              images={galleryImages}
              locale={locale}
              categories={categories}
            />
          )}
        </div>
      </section>

      {/* Cinematic CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Cinematic background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-background-dark to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

          {/* Animated lines */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-primary/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-primary/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          {/* Film reel decoration */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-primary animate-pulse" />
              <div className="w-16 h-px bg-gradient-to-r from-green-primary to-transparent" />
              <span className="text-green-vibrant text-xs tracking-[0.4em] font-light">
                {isArabic ? "ابدأ رحلتك" : "START YOUR JOURNEY"}
              </span>
              <div className="w-16 h-px bg-gradient-to-l from-green-primary to-transparent" />
              <div className="w-3 h-3 rounded-full bg-green-primary animate-pulse" />
            </div>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight">
            {isArabic ? "أعجبك ما" : "Love What You"}
            <span className="block text-green-vibrant italic mt-2">
              {isArabic ? "رأيت؟" : "See?"}
            </span>
          </h2>

          <p className="text-gray-light text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12">
            {isArabic
              ? "دعنا نحول أحلامك إلى واقع. تواصل معنا لبدء مشروع مطبخك الفاخر"
              : "Let's bring your vision to life. Contact us to start your luxury kitchen project"}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`/${locale}#contact`}
              className="group relative px-10 py-5 bg-green-primary text-black font-medium hover:bg-green-vibrant transition-all duration-500 text-sm tracking-wider overflow-hidden"
            >
              <span className="relative z-10">
                {isArabic ? "ابدأ مشروعك" : "START YOUR PROJECT"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-vibrant via-green-primary to-green-vibrant opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-shimmer" />
            </a>

            <a
              href={`/${locale}/projects`}
              className="group relative px-10 py-5 border border-green-primary/50 text-green-primary hover:text-black font-medium transition-all duration-500 text-sm tracking-wider overflow-hidden"
            >
              <span className="relative z-10">
                {isArabic ? "استعرض المشاريع" : "VIEW PROJECTS"}
              </span>
              <div className="absolute inset-0 bg-green-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </a>
          </div>

          {/* Decorative elements */}
          <div className="mt-20 flex items-center justify-center gap-8 text-gray-light/40 text-sm">
            <span>
              {isArabic ? "صنع بحب" : "Crafted with love"}
            </span>
            <span className="w-1 h-1 rounded-full bg-green-primary/50" />
            <span>
              {isArabic ? "جودة لا مثيل لها" : "Unmatched quality"}
            </span>
            <span className="w-1 h-1 rounded-full bg-green-primary/50" />
            <span>
              {isArabic ? "تصميم فريد" : "Unique design"}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

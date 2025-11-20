import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { GalleryGrid } from "@/app/components/GalleryGrid";

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
    <main className="min-h-screen bg-black pt-28 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-black via-background-dark to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light block">
              {isArabic ? "معرض الصور" : "GALLERY"}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
              {isArabic ? "أعمالنا المميزة" : "Our Featured Work"}
            </h1>
            <p className="text-lg md:text-xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed">
              {isArabic
                ? "استكشف مجموعتنا الكاملة من مشاريع المطابخ الفاخرة عبر الشرق الأوسط"
                : "Explore our complete collection of luxury kitchen projects across the Middle East"}
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-green-glow rounded-full filter blur-3xl opacity-10 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-green-glow rounded-full filter blur-3xl opacity-10 -translate-y-1/2" />
      </section>

      {/* Category Stats */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 border-b border-gray-dark">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.slice(1).map((category) => {
            const count = galleryImages.filter(
              (img) => img.category === category.key,
            ).length;
            return (
              <div key={category.key} className="text-center">
                <div className="text-4xl font-serif text-green-primary mb-2">
                  {count}
                </div>
                <div className="text-sm text-gray-light">
                  {isArabic ? category.labelAr : category.labelEn}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gallery Grid - Masonry Layout */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {galleryImages.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-light text-lg">
              {isArabic
                ? "لا توجد صور متاحة حالياً"
                : "No images available at the moment"}
            </p>
          </div>
        ) : (
          <GalleryGrid
            images={galleryImages}
            locale={locale}
            categories={categories}
          />
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-background-dark to-black border border-green-primary/30 p-12 text-center">
          <h2 className="font-serif text-4xl text-white mb-6">
            {isArabic ? "أعجبك ما رأيت؟" : "Love What You See?"}
          </h2>
          <p className="text-gray-light text-lg mb-8 max-w-2xl mx-auto">
            {isArabic
              ? "دعنا نحول أحلامك إلى واقع. تواصل معنا لبدء مشروع مطبخك الفاخر"
              : "Let's bring your vision to life. Contact us to start your luxury kitchen project"}
          </p>
          <a
            href={`/${locale}#contact`}
            className="inline-block px-8 py-4 bg-green-primary text-black font-medium hover:bg-green-vibrant transition-all duration-300 text-sm tracking-wider"
          >
            {isArabic ? "ابدأ مشروعك" : "START YOUR PROJECT"}
          </a>
        </div>
      </section>
    </main>
  );
}

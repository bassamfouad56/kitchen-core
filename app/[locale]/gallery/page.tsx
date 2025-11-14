import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { MapPin } from "lucide-react";

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

  // Get size class for masonry layout
  const getSizeClass = (size: string) => {
    switch (size) {
      case "SMALL":
        return "col-span-1 row-span-1";
      case "MEDIUM":
        return "col-span-1 md:col-span-2 row-span-1";
      case "LARGE":
        return "col-span-1 md:col-span-2 row-span-2";
      case "WIDE":
        return "col-span-1 md:col-span-3 row-span-1";
      case "TALL":
        return "col-span-1 row-span-2";
      default:
        return "col-span-1 row-span-1";
    }
  };

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className={`group relative overflow-hidden bg-background-dark ${getSizeClass(
                  image.size,
                )}`}
              >
                {/* Image */}
                <Image
                  src={image.image}
                  alt={
                    isArabic ? image.titleAr || image.titleEn : image.titleEn
                  }
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <h3 className="font-serif text-2xl text-white mb-2">
                      {isArabic
                        ? image.titleAr || image.titleEn
                        : image.titleEn}
                    </h3>

                    {image.location && (
                      <div className="flex items-center gap-2 text-gray-light text-sm mb-3">
                        <MapPin className="w-4 h-4 text-green-primary" />
                        <span>{image.location}</span>
                      </div>
                    )}

                    {(image.descriptionEn || image.descriptionAr) && (
                      <p className="text-gray-light text-sm line-clamp-2">
                        {isArabic
                          ? image.descriptionAr || image.descriptionEn
                          : image.descriptionEn}
                      </p>
                    )}

                    {/* Category Badge */}
                    <div className="mt-4">
                      <span className="inline-block px-3 py-1 text-xs tracking-wider text-green-primary border border-green-primary/30 bg-green-primary/10">
                        {
                          categories.find((c) => c.key === image.category)?.[
                            isArabic ? "labelAr" : "labelEn"
                          ]
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* Green border on hover */}
                <div className="absolute inset-0 border-2 border-green-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
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

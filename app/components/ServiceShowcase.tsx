"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ImageModal from "./ImageModal";

interface ServiceCategory {
  id: string;
  slug: string;
  images: string[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "modernWood",
    slug: "modern-kitchens-wood",
    images: [
      "/صور المطابخ العصرية/04cc5592-d3e3-4127-a6ce-0ddeca503bda.jpg",
      "/صور المطابخ العصرية/059476a3-0703-4c77-9974-90cff95ae7c2.jpg",
      "/صور المطابخ العصرية/10b26ef0-fc76-4f1b-a106-abc637ce8f7c.jpg",
      "/صور المطابخ العصرية/128ddb7e-e05c-4f96-a892-92ee8ad469fa.jpg",
      "/صور المطابخ العصرية/166c23c4-6da8-436c-ac48-9ee3c19a3ac7.jpg",
      "/صور المطابخ العصرية/1d889be0-549f-43b6-9f39-b5b63beefa97.jpg",
      "/صور المطابخ العصرية/239d5db4-6f1e-4d44-a207-c38b4b0d6eff.jpg",
      "/صور المطابخ العصرية/23ab572b-cd70-4145-851b-85079dcfc22b.jpg",
      "/صور المطابخ العصرية/25497d6e-b2bd-4f0e-8f8d-a26e3d9111be.jpg",
      "/صور المطابخ العصرية/320bc068-aa45-41e9-bb09-419bb769191e.jpg",
      "/صور المطابخ العصرية/334e2e74-e49a-45b0-851f-90bae31be4b3.jpg",
      "/صور المطابخ العصرية/3bad2a0c-16ea-44cd-94f0-88bfc7d60006.jpg",
      "/صور المطابخ العصرية/3e3e1729-fbf7-473c-a9d4-f4d1a850b7ad.jpg",
      "/صور المطابخ العصرية/428e5070-f067-4b4b-ba52-459dcccbb274.jpg",
      "/صور المطابخ العصرية/4a62ebd8-319f-4d1d-8766-e38be6988014.jpg",
      "/صور المطابخ العصرية/4cef5e4d-d6ff-4aaa-9b61-8ef10adfe153.jpg",
      "/صور المطابخ العصرية/5014cc4a-724c-4b6b-bdd9-848961ff55f7.jpg",
      "/صور المطابخ العصرية/53546883-7ca0-472f-87ce-2ad59f64097c.jpg",
      "/صور المطابخ العصرية/59944b2d-5e9f-40a3-90dc-e025680f4049.jpg",
      "/صور المطابخ العصرية/5bc6a952-f8a1-431d-9e2c-f17d7cd33122.jpg",
      "/صور المطابخ العصرية/5eacaaf2-1571-49ba-9b54-08d39fcb6ef0.jpg",
      "/صور المطابخ العصرية/608f2d3d-0c2f-4313-8120-162272db2930.jpg",
      "/صور المطابخ العصرية/61b77219-eeb4-4056-9066-459fd7a7e610.jpg",
      "/صور المطابخ العصرية/68269947-89ef-4000-b00b-bb91e6949007.jpg",
      "/صور المطابخ العصرية/689e0ecf-0b96-4552-b1e7-e0072e2013ed.jpg",
      "/صور المطابخ العصرية/6b0f86ef-c2ff-456f-b25b-ad019b4f7cbf.jpg",
      "/صور المطابخ العصرية/7206b11d-fd53-483c-9d11-7ad565748714.jpg",
      "/صور المطابخ العصرية/78f260d9-9b34-432f-ad9d-cc20bd614029.jpg",
      "/صور المطابخ العصرية/805ce7e2-6ca5-4fe2-9c38-259ba52495ae.jpg",
      "/صور المطابخ العصرية/887821dd-5dc2-4a15-9580-4be6b1fe87c4.jpg",
      "/صور المطابخ العصرية/89c822fc-65b2-4775-8665-9a95ea489c21.jpg",
      "/صور المطابخ العصرية/8e95f51f-0ca1-4d6a-ac87-bf36223ef67d.jpg",
      "/صور المطابخ العصرية/903585c4-237f-4f22-b011-4d5cf80951fd.jpg",
      "/صور المطابخ العصرية/907ce55c-5f2a-4fea-bee7-208ba8b596b6.jpg",
      "/صور المطابخ العصرية/91f40ce7-6a5e-4976-872a-6572beb5e7c3.jpg",
      "/صور المطابخ العصرية/94b84509-70e7-4e80-aab3-39a828e2461d.jpg",
      "/صور المطابخ العصرية/95769e51-78f4-436a-bb7e-426ca68c2793.jpg",
      "/صور المطابخ العصرية/99d7183c-39ef-47a8-9a60-7a4c6e729327.jpg",
      "/صور المطابخ العصرية/9fa07605-8679-469a-bbc0-455373dca9d8.jpg",
      "/صور المطابخ العصرية/9fcb2258-78a3-48cc-80d8-ec174ef6992e.jpg",
      "/صور المطابخ العصرية/a23b26cc-ed09-46a7-a2e8-ad5605bee2bc.jpg",
      "/صور المطابخ العصرية/a306dc8a-239a-40f3-953f-01252c9144f8.jpg",
      "/صور المطابخ العصرية/a3da3f9f-6e41-4208-bcf2-0959acee1ff6.jpg",
      "/صور المطابخ العصرية/a9270a58-4926-4578-afb2-bf08258a2a61.jpg",
      "/صور المطابخ العصرية/b0d98304-5571-4838-a50a-6ba3fb4affec.jpg",
      "/صور المطابخ العصرية/b10087e4-7308-4ab2-99ad-d69cfd86f646.jpg",
      "/صور المطابخ العصرية/b6e02fba-6448-4978-ba3d-82986daf5faa.jpg",
      "/صور المطابخ العصرية/b7c5d8e3-4870-4470-b703-055f7bf6cea6.jpg",
      "/صور المطابخ العصرية/b947e228-3d6c-4081-8abd-94243cc83249.jpg",
      "/صور المطابخ العصرية/b9a36790-1d89-4297-becb-35cd6f8da991.jpg",
      "/صور المطابخ العصرية/c3051c94-af97-4927-b760-4052211dea7d.jpg",
      "/صور المطابخ العصرية/ca148242-1638-4482-8bdd-c104bb3883a7.jpg",
      "/صور المطابخ العصرية/ce0f3e69-a1d2-4875-bf9f-1c740b8a6735.jpg",
      "/صور المطابخ العصرية/ceea36e3-ed23-46a8-830b-c84f59f5ff76.jpg",
      "/صور المطابخ العصرية/d2f44311-8fa5-4a81-9f3e-5360ff44d240.jpg",
      "/صور المطابخ العصرية/d444f44c-9e31-4be4-bde5-be28f40916f5.jpg",
      "/صور المطابخ العصرية/d9bf6535-56da-44aa-a09c-a1a0fafe4bc8.jpg",
      "/صور المطابخ العصرية/dbca38b9-ac4f-4e1a-ac60-0bbfa513b62e.jpg",
      "/صور المطابخ العصرية/dc338715-3e75-413e-9698-61820c255b54.jpg",
      "/صور المطابخ العصرية/ddf2c106-47c1-4180-b029-34f7f15c791a.jpg",
      "/صور المطابخ العصرية/de7806e9-699a-4ad4-992a-2e40a1834bf7.jpg",
      "/صور المطابخ العصرية/debf2f3c-c12f-4280-b3ac-624827ddbc02.jpg",
      "/صور المطابخ العصرية/e0841177-ac36-4bb1-a5e0-31a3888b56b3.jpg",
      "/صور المطابخ العصرية/e287fe4f-3cb9-4d21-ba20-b78dcc7bd059.jpg",
      "/صور المطابخ العصرية/edd06d2f-9789-43c8-94bb-27e0cf5cbfde.jpg",
      "/صور المطابخ العصرية/f071e543-d170-462c-be41-b5072b7a43c5.jpg",
      "/صور المطابخ العصرية/f780a496-17e4-4d21-9259-652fd9cc3a49.jpg",
      "/صور المطابخ العصرية/f93b244d-fe91-437b-aee0-503e23a82a73.jpg",
      "/صور المطابخ العصرية/fb5d6073-8f0d-43a6-b104-c154bbd712c1.jpg",
      "/صور المطابخ العصرية/fdf5503f-ac9a-40dd-b37d-34915d1f9c8e.jpg",
      "/صور المطابخ العصرية/fe906f7b-19ba-4301-89c2-433a069852dc.jpg",
    ],
  },
  {
    id: "classicWood",
    slug: "classic-kitchens-wood",
    images: [
      "/صور مطابخ الكلاسيك/0ffc8595-78ff-4e27-87ea-06531654926b.jpg",
      "/صور مطابخ الكلاسيك/486b8483-6daa-4551-949f-330e5261066c.jpg",
      "/صور مطابخ الكلاسيك/97fe6a18-2e1f-4093-8847-24eabf87b809.jpg",
      "/صور مطابخ الكلاسيك/f55050f3-494c-48ae-989e-63f027f70474.jpg",
    ],
  },
  {
    id: "aluminum",
    slug: "aluminum-kitchens",
    images: [
      "/صور مطابخ الألومنيوم/3752c5da-5463-42ff-a383-fd92f6ca9ff7.jpg",
      "/صور مطابخ الألومنيوم/72b67059-2e64-4e01-900d-851f175389e5.jpg",
      "/صور مطابخ الألومنيوم/aeb76f0b-5480-4010-868e-8dbef969d55d.jpg",
      "/صور مطابخ الألومنيوم/c478db8c-e49c-47c0-917a-5a11cb5fc664.jpg",
      "/صور مطابخ الألومنيوم/c4b57357-7d17-493c-813c-728593b15207.jpg",
      "/صور مطابخ الألومنيوم/edea8ca0-ca7c-4631-9c04-5032e726c03c.jpg",
    ],
  },
  {
    id: "bedrooms",
    slug: "bedrooms-wardrobes",
    images: [
      "/Bedrooms%20%26%20Wardrobes/1.jpeg",
      "/Bedrooms%20%26%20Wardrobes/2.jpeg",
      "/Bedrooms%20%26%20Wardrobes/4.jpeg",
      "/Bedrooms%20%26%20Wardrobes/5.jpeg",
      "/Bedrooms%20%26%20Wardrobes/6.jpeg",
      "/Bedrooms%20%26%20Wardrobes/7.jpeg",
      "/Bedrooms%20%26%20Wardrobes/8.jpeg",
      "/Bedrooms%20%26%20Wardrobes/9.jpeg",
      "/Bedrooms%20%26%20Wardrobes/10.jpeg",
      "/Bedrooms%20%26%20Wardrobes/11.jpeg",
      "/Bedrooms%20%26%20Wardrobes/12.jpeg",
      "/Bedrooms%20%26%20Wardrobes/13.jpeg",
      "/Bedrooms%20%26%20Wardrobes/14.jpeg",
      "/Bedrooms%20%26%20Wardrobes/15.jpeg",
      "/Bedrooms%20%26%20Wardrobes/16.jpeg",
      "/Bedrooms%20%26%20Wardrobes/18.jpeg",
      "/Bedrooms%20%26%20Wardrobes/19.jpeg",
      "/Bedrooms%20%26%20Wardrobes/20.jpeg",
      "/Bedrooms%20%26%20Wardrobes/21.jpeg",
      "/Bedrooms%20%26%20Wardrobes/WhatsApp%20Image%202026-01-11%20at%2012.28.40%20PM.jpeg",
    ],
  },
];

interface GalleryCarouselProps {
  images: string[];
  title: string;
  slug: string;
  onImageClick: (index: number) => void;
}

function GalleryCarousel({ images, title, onImageClick }: GalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div
      className="relative aspect-[4/3] lg:aspect-[16/12] w-full overflow-hidden group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 cursor-pointer"
          onClick={() => onImageClick(currentIndex)}
        >
          <Image
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {/* Click to view indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/60 px-4 py-2 text-white text-sm">
              Click to view
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 border border-green-primary/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-green-primary hover:text-black z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 border border-green-primary/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-green-primary hover:text-black z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator - show only first 10 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.slice(0, 10).map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-green-primary w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
        {images.length > 10 && (
          <span className="text-white/50 text-xs">+{images.length - 10}</span>
        )}
      </div>
    </div>
  );
}

interface ServiceSectionProps {
  category: ServiceCategory;
  index: number;
}

function ServiceSection({ category, index }: ServiceSectionProps) {
  const locale = useLocale();
  const t = useTranslations("ServiceShowcase");
  const isRTL = locale === "ar";
  const isReversed = index % 2 === 1;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const handleImageClick = (imageIndex: number) => {
    setModalImageIndex(imageIndex);
    setModalOpen(true);
  };

  const handleNavigate = (newIndex: number) => {
    setModalImageIndex(newIndex);
  };

  return (
    <>
      <section
        className={`py-20 lg:py-32 ${
          index % 2 === 0
            ? "bg-black"
            : "bg-gradient-to-b from-background-dark to-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
              isReversed ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Gallery Side */}
            <motion.div
              initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`${isReversed ? "lg:order-2" : "lg:order-1"}`}
            >
              <div className="border border-gray-dark hover:border-green-primary/50 transition-all duration-500 overflow-hidden">
                <GalleryCarousel
                  images={category.images}
                  title={t(`${category.id}.title`)}
                  slug={category.slug}
                  onImageClick={handleImageClick}
                />
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`${isReversed ? "lg:order-1" : "lg:order-2"}`}
            >
              <div className="space-y-6">
                {/* Badge/Tagline */}
                <p className="text-green-vibrant text-sm tracking-[0.3em] font-light">
                  {t(`${category.id}.tagline`).toUpperCase()}
                </p>

                {/* Title */}
                <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-white leading-tight">
                  {t(`${category.id}.title`)}
                </h2>

                {/* Description */}
                <p className="text-gray-light text-lg leading-relaxed">
                  {t(`${category.id}.description`)}
                </p>

                {/* Decorative Line */}
                <div className="w-20 h-px bg-green-primary" />

                {/* CTA Button */}
                <Link
                  href={`/${locale}/services/${category.slug}`}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-green-primary text-black text-sm tracking-wider font-medium hover:bg-green-vibrant transition-all duration-300 group mt-4"
                >
                  <span>{t("viewMore")}</span>
                  <ArrowRight
                    className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${
                      isRTL ? "rotate-180" : ""
                    }`}
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc={category.images[modalImageIndex]}
        imageAlt={`${t(`${category.id}.title`)} - Image ${modalImageIndex + 1}`}
        serviceTitle={t(`${category.id}.title`)}
        serviceSlug={category.slug}
        locale={locale}
        images={category.images}
        currentIndex={modalImageIndex}
        onNavigate={handleNavigate}
      />
    </>
  );
}

export default function ServiceShowcase() {
  const t = useTranslations("ServiceShowcase");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div id="services">
      {/* Section Header */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="text-green-vibrant text-sm tracking-[0.3em] font-light block mb-4">
              {isArabic ? "منتجاتنا" : "OUR PRODUCTS"}
            </span>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6">
              {isArabic ? "ماذا نقدم" : "What We Offer"}
            </h2>
            <p className="text-gray-light text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
              {isArabic
                ? "من المطابخ الخشبية العصرية والكلاسيكية إلى الألومنيوم وغرف النوم — نقدم حلولاً متكاملة تناسب كل ذوق"
                : "From modern and classic wooden kitchens to aluminum solutions and bedrooms — we offer comprehensive solutions for every taste"}
            </p>
          </motion.div>
        </div>
      </section>

      {serviceCategories.map((category, index) => (
        <ServiceSection key={category.id} category={category} index={index} />
      ))}
    </div>
  );
}

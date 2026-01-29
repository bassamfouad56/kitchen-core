"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface ImageData {
  id: string;
  image: string;
  titleEn: string;
  titleAr?: string | null;
  descriptionEn?: string | null;
  descriptionAr?: string | null;
  location?: string | null;
  category: string;
  size: string;
}

interface CinematicBentoGalleryProps {
  images: ImageData[];
  locale: string;
  categories: Array<{
    key: string;
    labelEn: string;
    labelAr: string;
  }>;
}

// Category to service slug mapping (matching existing service pages)
const categoryToService: Record<string, { slug: string; nameEn: string; nameAr: string }> = {
  MODERN_WOODEN: { slug: "modern-kitchens-wood", nameEn: "Modern Kitchens – Wood", nameAr: "مطابخ عصرية - خشب" },
  CLASSIC_WOODEN: { slug: "classic-kitchens-wood", nameEn: "Classic Kitchens – Wood", nameAr: "مطابخ كلاسيك - خشب" },
  ALUMINUM: { slug: "aluminum-kitchens", nameEn: "Aluminum Kitchens", nameAr: "مطابخ ألومنيوم" },
  BEDROOMS: { slug: "bedrooms-wardrobes", nameEn: "Bedrooms & Wardrobes", nameAr: "غرف النوم وخزائن الملابس" },
};

// Scroll reveal wrapper component
function ScrollRevealCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

export function CinematicBentoGallery({ images, locale, categories }: CinematicBentoGalleryProps) {
  const isArabic = locale === "ar";
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages = selectedCategory === "ALL"
    ? images
    : images.filter((img) => img.category === selectedCategory);

  const currentImage = filteredImages[currentImageIndex];

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleNavigate = useCallback((direction: "prev" | "next") => {
    if (direction === "prev" && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (direction === "next" && currentImageIndex < filteredImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  }, [currentImageIndex, filteredImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case "Escape":
          setLightboxOpen(false);
          break;
        case "ArrowLeft":
          handleNavigate("prev");
          break;
        case "ArrowRight":
          handleNavigate("next");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, handleNavigate]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  // Get service link for current image
  const getServiceLink = (category: string) => {
    const service = categoryToService[category];
    if (!service) return null;
    return `/${locale}/services/${service.slug}`;
  };


  return (
    <div className="relative">
      {/* Category Filter Pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 md:mb-20"
      >
        {categories.map((category, index) => {
          const count = category.key === "ALL"
            ? images.length
            : images.filter(img => img.category === category.key).length;

          return (
            <motion.button
              key={category.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                setSelectedCategory(category.key);
                setCurrentImageIndex(0);
              }}
              className={`relative px-6 py-3 text-sm md:text-base font-medium transition-all duration-400 ${
                selectedCategory === category.key
                  ? "bg-green-primary text-black shadow-lg shadow-green-primary/30"
                  : "bg-white/5 text-gray-light hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isArabic ? category.labelAr : category.labelEn}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === category.key
                    ? "bg-black/20 text-black"
                    : "bg-white/10 text-gray-light"
                }`}>
                  {count}
                </span>
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Big Bold Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {filteredImages.map((image, index) => (
          <ScrollRevealCard key={image.id} index={index % 4}>
            <motion.div
              layout
              className="group relative cursor-pointer overflow-hidden aspect-[4/3] md:aspect-[16/10]"
              onClick={() => handleImageClick(index)}
            >
              {/* Big Image */}
              <Image
                src={image.image}
                alt={isArabic ? image.titleAr || image.titleEn : image.titleEn}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index < 4}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Green Glow Border on Hover */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-green-primary/70 transition-all duration-500 group-hover:shadow-[inset_0_0_80px_rgba(200,225,99,0.15)]" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                {/* Category Badge */}
                <span className="inline-flex items-center gap-2 self-start mb-4 px-4 py-2 bg-green-primary text-black text-sm font-bold tracking-wide">
                  {categories.find(c => c.key === image.category)?.[isArabic ? "labelAr" : "labelEn"]}
                </span>

                {/* Title - Big and Bold */}
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-3 leading-tight font-medium drop-shadow-2xl transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  {isArabic ? image.titleAr || image.titleEn : image.titleEn}
                </h3>

                {/* View indicator */}
                <div className="flex items-center gap-2 text-green-vibrant text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>{isArabic ? "اضغط للعرض" : "Click to view"}</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>

              {/* Large Image Number */}
              <div className="absolute top-6 right-6 text-7xl md:text-8xl font-serif text-white/10 font-bold pointer-events-none">
                {String(index + 1).padStart(2, "0")}
              </div>
            </motion.div>
          </ScrollRevealCard>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-32"
        >
          <p className="text-gray-light text-2xl font-light">
            {isArabic ? "لا توجد صور في هذه الفئة" : "No images in this category"}
          </p>
        </motion.div>
      )}

      {/* Fullscreen Lightbox - Clean & Minimal */}
      <AnimatePresence>
        {lightboxOpen && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[100] cursor-pointer"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Big X Close Button - Top Right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              className="absolute top-6 right-6 z-50 w-14 h-14 flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Counter - Top Left */}
            <div
              className="absolute top-8 left-8 z-50 text-white/50 text-sm font-mono"
              onClick={(e) => e.stopPropagation()}
            >
              {currentImageIndex + 1} / {filteredImages.length}
            </div>

            {/* Main Image Container - Centered, doesn't block backdrop clicks */}
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-20 pointer-events-none">
              <motion.div
                key={currentImage.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full max-w-6xl max-h-[75vh] pointer-events-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={currentImage.image}
                  alt={isArabic ? currentImage.titleAr || currentImage.titleEn : currentImage.titleEn}
                  fill
                  className="object-contain"
                  priority
                  sizes="100vw"
                />
              </motion.div>
            </div>

            {/* Previous Arrow */}
            {currentImageIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate("prev");
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 flex items-center justify-center text-white/60 hover:text-white bg-white/5 hover:bg-white/20 rounded-full transition-all"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {/* Next Arrow */}
            {currentImageIndex < filteredImages.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate("next");
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 flex items-center justify-center text-white/60 hover:text-white bg-white/5 hover:bg-white/20 rounded-full transition-all"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            {/* Minimal Bottom Bar */}
            <div
              className="absolute bottom-0 left-0 right-0 z-50 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                <h2 className="text-white/80 text-lg font-light truncate">
                  {isArabic ? currentImage.titleAr || currentImage.titleEn : currentImage.titleEn}
                </h2>

                {getServiceLink(currentImage.category) && (
                  <Link
                    href={getServiceLink(currentImage.category)!}
                    className="shrink-0 px-4 py-2 bg-green-primary text-black text-sm font-medium flex items-center gap-2 hover:bg-green-vibrant transition-colors rounded"
                  >
                    <span>{isArabic ? "زيارة الخدمة" : "Visit Service"}</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

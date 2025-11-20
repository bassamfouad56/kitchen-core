"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useEffect, useCallback } from "react";

interface ImageData {
  id: string;
  image: string;
  titleEn: string;
  titleAr?: string | null;
  descriptionEn?: string | null;
  descriptionAr?: string | null;
  location?: string | null;
  category: string;
}

interface ImageLightboxProps {
  images: ImageData[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  isOpen: boolean;
  locale: string;
}

export function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
  isOpen,
  locale,
}: ImageLightboxProps) {
  const isArabic = locale === "ar";
  const currentImage = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate("prev");
      if (e.key === "ArrowRight") onNavigate("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Touch/swipe handling for mobile
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touchStart = e.touches[0].clientX;

      const handleTouchEnd = (endEvent: TouchEvent) => {
        const touchEnd = endEvent.changedTouches[0].clientX;
        const diff = touchStart - touchEnd;

        if (Math.abs(diff) > 50) {
          // Minimum swipe distance
          if (diff > 0) {
            onNavigate("next");
          } else {
            onNavigate("prev");
          }
        }

        window.removeEventListener("touchend", handleTouchEnd);
      };

      window.addEventListener("touchend", handleTouchEnd);
    },
    [onNavigate],
  );

  if (!currentImage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-50"
            onClick={onClose}
          />

          {/* Lightbox Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors duration-200 text-white"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-light">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Previous Button */}
            {currentIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("prev");
                }}
                className="absolute left-4 z-10 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors duration-200 text-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {/* Next Button */}
            {currentIndex < images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("next");
                }}
                className="absolute right-4 z-10 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors duration-200 text-white"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            {/* Image Container */}
            <motion.div
              key={currentImage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh] flex flex-col items-center justify-center"
              onTouchStart={handleTouchStart}
            >
              {/* Image */}
              <div className="relative w-full h-[80vh] mb-4">
                <Image
                  src={currentImage.image}
                  alt={
                    isArabic
                      ? currentImage.titleAr || currentImage.titleEn
                      : currentImage.titleEn
                  }
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                  quality={90}
                />
              </div>

              {/* Image Info */}
              <div className="w-full max-w-4xl mx-auto text-center px-4">
                <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">
                  {isArabic
                    ? currentImage.titleAr || currentImage.titleEn
                    : currentImage.titleEn}
                </h2>

                {currentImage.location && (
                  <div className="flex items-center justify-center gap-2 text-gray-light text-sm mb-3">
                    <MapPin className="w-4 h-4 text-green-primary" />
                    <span>{currentImage.location}</span>
                  </div>
                )}

                {(currentImage.descriptionEn || currentImage.descriptionAr) && (
                  <p className="text-gray-light text-sm md:text-base max-w-2xl mx-auto">
                    {isArabic
                      ? currentImage.descriptionAr || currentImage.descriptionEn
                      : currentImage.descriptionEn}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

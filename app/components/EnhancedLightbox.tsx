"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  location?: string;
  category?: string;
}

interface EnhancedLightboxProps {
  image: LightboxImage | null;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  currentIndex?: number;
  totalImages?: number;
}

export default function EnhancedLightbox({
  image,
  onClose,
  onNext,
  onPrevious,
  currentIndex,
  totalImages,
}: EnhancedLightboxProps) {
  // Keyboard navigation
  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && onNext) {
        onNext();
      } else if (e.key === "ArrowLeft" && onPrevious) {
        onPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [image, onClose, onNext, onPrevious]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (image) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [image]);

  if (!image) return null;

  const handleScheduleConsultation = () => {
    onClose();
    // Scroll to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleViewPortfolio = () => {
    onClose();
    // Scroll to portfolio section
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/97 backdrop-blur-2xl z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.1 }}
            onClick={onClose}
            className="fixed top-6 right-6 z-50 p-4 bg-background-card/80 backdrop-blur-sm border-2 border-green-primary/50 text-green-vibrant hover:bg-green-primary hover:text-black hover:border-green-vibrant transition-all duration-300 group"
            aria-label="Close lightbox (ESC)"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="absolute -bottom-10 right-0 text-xs text-gray-light opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Press ESC
            </span>
          </motion.button>

          {/* Image Counter */}
          {currentIndex !== undefined && totalImages !== undefined && totalImages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="fixed top-6 left-6 z-50 px-4 py-2 bg-background-card/80 backdrop-blur-sm border border-green-primary/30 text-green-vibrant text-sm tracking-wider"
            >
              {currentIndex + 1} / {totalImages}
            </motion.div>
          )}

          {/* Main Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 flex flex-col lg:flex-row items-center justify-center p-4 md:p-8 lg:p-12 gap-6 lg:gap-8"
          >
            {/* Previous Button */}
            {onPrevious && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevious();
                }}
                className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-40 p-4 bg-background-card/90 backdrop-blur-sm border-2 border-green-primary/50 text-green-vibrant hover:bg-green-primary hover:text-black hover:border-green-vibrant transition-all duration-300"
                aria-label="Previous image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
            )}

            {/* Next Button */}
            {onNext && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-40 p-4 bg-background-card/90 backdrop-blur-sm border-2 border-green-primary/50 text-green-vibrant hover:bg-green-primary hover:text-black hover:border-green-vibrant transition-all duration-300"
                aria-label="Next image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            )}

            {/* Image Section - 75% width on desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring", damping: 25 }}
              className="relative w-full lg:w-3/4 h-[60vh] lg:h-[85vh] flex items-center justify-center"
            >
              {/* Animated corner accents */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-green-primary"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-green-primary"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-green-primary"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-green-primary"
              />

              {/* Subtle green glow */}
              <div className="absolute inset-0 bg-green-primary/5 blur-3xl" />

              {/* Image */}
              <div className="relative w-full h-full p-8">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  priority
                  quality={95}
                />
              </div>
            </motion.div>

            {/* Info Panel - 25% width on desktop */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, type: "spring", damping: 25 }}
              className="w-full lg:w-1/4 lg:h-[85vh] bg-background-card/95 backdrop-blur-xl border-2 border-green-primary/30 p-6 lg:p-8 overflow-y-auto flex flex-col gap-6"
            >
              {/* Title */}
              {image.title && (
                <div>
                  <h2 className="font-serif text-3xl lg:text-4xl text-white mb-2 leading-tight">
                    {image.title}
                  </h2>
                  {image.category && (
                    <span className="inline-block bg-green-primary text-black px-4 py-1.5 text-xs tracking-wider font-bold mt-2">
                      {image.category.toUpperCase()}
                    </span>
                  )}
                </div>
              )}

              {/* Location */}
              {image.location && (
                <div className="flex items-center gap-2 text-green-vibrant">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm tracking-wide">{image.location}</span>
                </div>
              )}

              {/* Description */}
              {image.description && (
                <div>
                  <div className="w-full h-px bg-gradient-to-r from-green-primary via-green-vibrant to-transparent mb-6" />
                  <p className="text-gray-light leading-relaxed">{image.description}</p>
                </div>
              )}

              {/* Spacer */}
              <div className="flex-grow" />

              {/* CTA Buttons */}
              <div className="space-y-4 mt-auto">
                {/* Primary CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleScheduleConsultation();
                  }}
                  className="w-full bg-green-primary text-black px-6 py-4 text-sm tracking-widest font-bold hover:bg-green-vibrant transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Pulse animation */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-green-vibrant"
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    SCHEDULE YOUR DREAM KITCHEN
                  </span>
                </motion.button>

                {/* Secondary CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewPortfolio();
                  }}
                  className="w-full border-2 border-green-primary text-green-primary px-6 py-3 text-xs tracking-widest font-medium hover:bg-green-primary/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  EXPLORE MORE PROJECTS
                </motion.button>
              </div>

              {/* Keyboard hints */}
              {(onNext || onPrevious) && (
                <div className="text-xs text-gray-light/60 text-center pt-4 border-t border-gray-dark space-y-1">
                  <p>Use arrow keys to navigate</p>
                  <p>Press ESC to close</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

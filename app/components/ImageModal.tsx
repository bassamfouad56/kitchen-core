"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  serviceTitle: string;
  serviceSlug: string;
  locale: string;
  images?: string[];
  currentIndex?: number;
  onNavigate?: (index: number) => void;
}

export default function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  serviceTitle,
  serviceSlug,
  locale,
  images = [],
  currentIndex = 0,
  onNavigate,
}: ImageModalProps) {
  const isArabic = locale === "ar";
  const hasMultipleImages = images.length > 1 && onNavigate;

  const handlePrevious = useCallback(() => {
    if (onNavigate && images.length > 0) {
      const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      onNavigate(newIndex);
    }
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (onNavigate && images.length > 0) {
      const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      onNavigate(newIndex);
    }
  }, [currentIndex, images.length, onNavigate]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrevious, handleNext]);

  // Prevent body scroll when modal is open
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-6xl mx-4 flex flex-col lg:flex-row gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 lg:top-0 lg:-right-12 p-2 text-white/70 hover:text-white transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Image Container */}
            <div className="relative flex-1 aspect-[4/3] lg:aspect-auto lg:min-h-[500px] bg-background-dark border border-gray-dark overflow-hidden">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 70vw"
                priority
              />

              {/* Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevious();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 border border-green-primary/50 text-white hover:bg-green-primary hover:text-black transition-all duration-300"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 border border-green-primary/50 text-white hover:bg-green-primary hover:text-black transition-all duration-300"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 text-white text-sm">
                  {currentIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Service Info & CTA Panel */}
            <div className="lg:w-80 bg-background-card border border-gray-dark p-6 flex flex-col justify-between">
              <div>
                {/* Service Badge */}
                <span className="text-green-vibrant text-xs tracking-[0.3em] font-light block mb-3">
                  {isArabic ? "نوع الخدمة" : "SERVICE TYPE"}
                </span>

                {/* Service Title */}
                <h3 className="font-serif text-2xl text-white mb-4">
                  {serviceTitle}
                </h3>

                {/* Description */}
                <p className="text-gray-light text-sm leading-relaxed mb-6">
                  {isArabic
                    ? "هل أعجبك هذا التصميم؟ تواصل معنا للحصول على استشارة مجانية وتحويل رؤيتك إلى واقع."
                    : "Like this design? Contact us for a free consultation and transform your vision into reality."}
                </p>

                {/* Decorative Line */}
                <div className="w-16 h-px bg-green-primary mb-6" />
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                {/* Primary CTA - Book Consultation */}
                <Link
                  href={`/${locale}#contact`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-green-primary text-black font-medium hover:bg-green-vibrant transition-all duration-300 text-sm tracking-wider group"
                >
                  <span>{isArabic ? "احجز استشارة مجانية" : "BOOK FREE CONSULTATION"}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${isArabic ? "rotate-180" : ""}`} />
                </Link>

                {/* Secondary CTA - View Service */}
                <Link
                  href={`/${locale}/services/${serviceSlug}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-green-primary/50 text-green-primary hover:bg-green-primary/10 transition-all duration-300 text-sm tracking-wider"
                >
                  <span>{isArabic ? "عرض الخدمة" : "VIEW SERVICE"}</span>
                </Link>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#25D366] text-white hover:bg-[#128C7E] transition-all duration-300 text-sm tracking-wider"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>{isArabic ? "تواصل عبر واتساب" : "CHAT ON WHATSAPP"}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

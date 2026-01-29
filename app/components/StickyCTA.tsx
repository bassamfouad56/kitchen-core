"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface StickyCTAProps {
  serviceTitle: string;
  locale: string;
}

export default function StickyCTA({ serviceTitle, locale }: StickyCTAProps) {
  const isArabic = locale === "ar";

  const ctaText = isArabic
    ? `احجز ${serviceTitle} الآن`
    : `Book ${serviceTitle} Now`;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-black via-background-dark to-black border-t border-green-primary/30 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Service info */}
          <div className="hidden sm:block">
            <p className="text-gray-light text-sm">
              {isArabic ? "هل أعجبتك هذه الخدمة؟" : "Interested in this service?"}
            </p>
          </div>

          {/* CTA Button */}
          <Link
            href={`/${locale}#contact`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-primary text-black font-medium hover:bg-green-vibrant transition-all duration-300 text-sm tracking-wider group"
          >
            <span>{ctaText}</span>
            <ArrowRight
              className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${
                isArabic ? "rotate-180 group-hover:-translate-x-1" : ""
              }`}
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

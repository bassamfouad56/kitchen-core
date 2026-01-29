"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface CinematicGalleryHeroProps {
  locale: string;
}

export function CinematicGalleryHero({
  locale,
}: CinematicGalleryHeroProps) {
  const isArabic = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-background-dark to-black" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(200, 225, 99, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(200, 225, 99, 0.3) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />

        {/* Animated orbs */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-green-primary/10 rounded-full filter blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-green-vibrant/10 rounded-full filter blur-[100px]"
        />

        {/* Film grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Letterbox bars */}
        <div className="absolute top-0 left-0 right-0 h-4 md:h-8 bg-black z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-4 md:h-8 bg-black z-10" />

        {/* Cinematic scan lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.03) 2px,
              rgba(255, 255, 255, 0.03) 4px
            )`,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center"
      >
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white mb-6 leading-[0.9]"
        >
          {isArabic ? "أعمالنا" : "Visual"}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="block text-green-vibrant italic mt-2"
          >
            {isArabic ? "المميزة" : "Masterpieces"}
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed mb-12"
        >
          {isArabic
            ? "استكشف مجموعتنا الكاملة من مشاريع المطابخ الفاخرة"
            : "Explore our curated collection of luxury kitchen projects"}
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-gray-light/50 text-xs tracking-wider">
            {isArabic ? "اكتشف المزيد" : "EXPLORE"}
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-green-primary to-transparent" />
        </motion.div>
      </motion.div>

      {/* Side decorations */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-green-primary/50 to-transparent" />
          <span className="text-green-vibrant/50 text-xs tracking-widest transform -rotate-90 whitespace-nowrap">
            {isArabic ? "معرض الصور" : "GALLERY"}
          </span>
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-green-primary/50 to-transparent" />
        </motion.div>
      </div>

      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-green-primary/50 to-transparent" />
          <span className="text-green-vibrant/50 text-xs tracking-widest transform rotate-90 whitespace-nowrap">
            {new Date().getFullYear()}
          </span>
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-green-primary/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

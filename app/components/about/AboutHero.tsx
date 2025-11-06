"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import type { Company } from "@/types/about";

interface AboutHeroProps {
  company: Company;
  locale: string;
}

export default function AboutHero({ company, locale }: AboutHeroProps) {
  const isArabic = locale === "ar";
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Video with Parallax */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        {company.backgroundVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={company.backgroundVideo} type="video/mp4" />
          </video>
        ) : company.featuredImage ? (
          <Image
            src={company.featuredImage}
            alt={isArabic ? company.nameAr : company.nameEn}
            fill
            className="object-cover"
            priority
            quality={100}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-green-darker via-black to-green-darker" />
        )}

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-darker/30 via-transparent to-green-darker/30" />
      </motion.div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(200, 225, 99, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(200, 225, 99, 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Badge */}
          <div className="inline-block mb-8 px-8 py-3 border border-green-primary/50 bg-green-darker/30 backdrop-blur-md">
            <p className="text-green-vibrant text-sm tracking-[0.4em] font-light">
              {isArabic ? "عن الشركة" : "ABOUT US"}
            </p>
          </div>

          {/* Company Name */}
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-6 leading-tight">
            {isArabic ? company.nameAr : company.nameEn}
          </h1>

          {/* Tagline */}
          {(company.taglineEn || company.taglineAr) && (
            <p className="text-green-vibrant text-2xl md:text-3xl font-light italic mb-8">
              {isArabic ? company.taglineAr : company.taglineEn}
            </p>
          )}

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-light max-w-4xl mx-auto font-light leading-relaxed"
          >
            {isArabic ? company.descriptionAr : company.descriptionEn}
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-px bg-green-primary mx-auto mt-12"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-3 text-green-primary/60 text-xs tracking-widest">
          <span>{isArabic ? "تمرير" : "SCROLL"}</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-16 bg-gradient-to-b from-green-primary to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}

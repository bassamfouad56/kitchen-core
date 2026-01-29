"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import type { Founder } from "@/types/about";

interface FounderShowcaseProps {
  founder: Founder;
  locale: string;
}

export default function FounderShowcase({
  founder,
  locale,
}: FounderShowcaseProps) {
  const isArabic = locale === "ar";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Get locale-specific content
  const name = isArabic && founder.nameAr ? founder.nameAr : founder.name;
  const title = isArabic && founder.titleAr ? founder.titleAr : founder.title;
  const bio = isArabic && founder.bioAr ? founder.bioAr : founder.bio;
  const education = isArabic && founder.educationAr?.length > 0 ? founder.educationAr : founder.education;
  const recognition = isArabic && founder.recognitionAr?.length > 0 ? founder.recognitionAr : founder.recognition;
  const quote = isArabic && founder.quoteAr ? founder.quoteAr : founder.quote;

  return (
    <section
      ref={ref}
      id="founder"
      className="py-24 md:py-32 bg-gradient-to-b from-black via-background-dark to-black relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-primary/50 to-transparent" />
      </div>

      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 195, 74, 0.3) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 overflow-hidden">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className={`text-green-vibrant text-sm mb-6 font-light uppercase ${isArabic ? "" : "tracking-[0.3em]"}`}>
              {isArabic ? "التعرف على المؤسس" : "Meet the Visionary"}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              {isArabic ? "عن المؤسس" : "About the Founder"}
            </h2>
            <div className="w-24 h-px bg-green-primary mx-auto" />
          </motion.div>
        </div>

        {/* Main Content - Magazine Style Layout */}
        <div className="relative">
          {/* Image Section - Centered Hero Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="relative max-w-xl md:max-w-2xl mx-auto mb-16"
          >
            {/* Decorative Frame */}
            <div className="absolute -inset-4 md:-inset-8">
              <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-green-primary/60" />
              <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-green-primary/60" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-green-primary/60" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-green-primary/60" />
            </div>

            {/* Image Container with Gradient Overlay */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-green-primary/10 to-transparent">
              <Image
                src={founder.image}
                alt={name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
              {/* Bottom Gradient Fade */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent" />

              {/* Name Overlay on Image */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-center">
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-2">
                  {name}
                </h3>
                <p className="text-green-vibrant text-lg tracking-wide font-light">
                  {title}
                </p>
              </div>
            </div>

            {/* Decorative Line */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-green-primary to-transparent" />
          </motion.div>

          {/* Quote Section - Featured */}
          {quote && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl mx-auto mb-16 text-center relative bg-gradient-to-b from-green-primary/5 to-transparent py-12 px-4 overflow-hidden"
            >
              {/* Quote Marks */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-green-primary/30 text-7xl md:text-8xl font-serif leading-none">
                "
              </div>

              <blockquote className="relative z-10 px-4 md:px-8 pt-8">
                <p className="text-white text-lg md:text-xl lg:text-2xl italic font-normal leading-loose break-words">
                  {quote}
                </p>
                <footer className="mt-8">
                  <div className="w-16 h-px bg-green-primary mx-auto mb-4" />
                  <cite className={`text-green-vibrant text-sm uppercase not-italic font-medium ${isArabic ? "" : "tracking-widest"}`}>
                    — {name}
                  </cite>
                </footer>
              </blockquote>
            </motion.div>
          )}

          {/* Bio Section - Clean Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto overflow-hidden"
          >
            <div className="bg-background-card border border-gray-dark/70 p-6 md:p-10 lg:p-12">
              {/* Bio Content */}
              <div className="space-y-6 mb-10">
                {bio.split("\n\n").map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`text-white/90 leading-relaxed text-base md:text-lg break-words ${paragraph.startsWith("•") ? (isArabic ? "pr-4 border-r-2 border-green-primary/40" : "pl-4 border-l-2 border-green-primary/40") : ""}`}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-green-primary/30 to-transparent mb-10" />

              {/* Education and Recognition - Horizontal Layout */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {/* Education */}
                {education.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 }}
                    className="relative bg-black/30 p-5 border border-gray-dark/30"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-full bg-green-primary/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className={`text-green-vibrant text-sm uppercase font-medium ${isArabic ? "" : "tracking-widest"}`}>
                        {isArabic ? "التعليم" : "Education"}
                      </div>
                    </div>
                    <div className="text-white/90 text-sm leading-relaxed space-y-2">
                      {education.map((edu, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-primary flex-shrink-0" />
                          <span className="break-words">{edu}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Recognition */}
                {recognition.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="relative bg-black/30 p-5 border border-gray-dark/30"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-full bg-green-primary/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div className={`text-green-vibrant text-sm uppercase font-medium ${isArabic ? "" : "tracking-widest"}`}>
                        {isArabic ? "الإنجازات" : "Achievements"}
                      </div>
                    </div>
                    <div className="text-white/90 text-sm leading-relaxed space-y-2">
                      {recognition.map((rec, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-primary flex-shrink-0" />
                          <span className="break-words">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

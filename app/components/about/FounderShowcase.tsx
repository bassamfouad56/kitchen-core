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

  return (
    <section
      ref={ref}
      id="founder"
      className="py-32 bg-black border-y border-gray-dark relative overflow-hidden"
    >
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-green-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-green-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-green-vibrant text-sm tracking-[0.3em] mb-6 font-light uppercase">
              {isArabic ? "التعرف على المؤسس" : "Meet the Visionary"}
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
              {isArabic ? "عن المؤسس" : "About the Founder"}
            </h2>
            <div className="w-24 h-px bg-green-primary mx-auto" />
          </motion.div>
        </div>

        {/* Founder Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Founder Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={isArabic ? "order-2 lg:order-2" : "order-2 lg:order-1"}
          >
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative aspect-[3/4] border-2 border-green-primary/40 hover:border-green-primary transition-all duration-700 overflow-hidden">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Decorative corner accents */}
              <div className="absolute -top-6 -left-6 w-16 h-16 border-l-2 border-t-2 border-green-primary opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-6 -right-6 w-16 h-16 border-r-2 border-b-2 border-green-primary opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* Founder Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={isArabic ? "order-1 lg:order-1" : "order-1 lg:order-2"}
          >
            {/* Name and Title */}
            <div className="mb-8">
              <h3 className="font-serif text-5xl text-white mb-3">
                {founder.name}
              </h3>
              <p className="text-green-vibrant text-xl tracking-wide font-light">
                {founder.title}
              </p>
              <div className="w-20 h-px bg-green-primary mt-6" />
            </div>

            {/* Bio */}
            <div className="space-y-6 text-gray-light leading-relaxed font-light text-lg mb-10">
              {founder.bio.split("\n\n").map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Education and Recognition */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Education */}
              {founder.education.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                  className="border-l-2 border-green-primary pl-6"
                >
                  <div className="text-green-vibrant text-sm tracking-widest mb-3 uppercase">
                    {isArabic ? "التعليم" : "Education"}
                  </div>
                  <div className="text-white font-light text-sm leading-relaxed space-y-1">
                    {founder.education.map((edu, index) => (
                      <div key={index}>{edu}</div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Recognition */}
              {founder.recognition.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 }}
                  className="border-l-2 border-green-primary pl-6"
                >
                  <div className="text-green-vibrant text-sm tracking-widest mb-3 uppercase">
                    {isArabic ? "التقدير" : "Recognition"}
                  </div>
                  <div className="text-white font-light text-sm leading-relaxed space-y-1">
                    {founder.recognition.map((rec, index) => (
                      <div key={index}>{rec}</div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quote */}
            {founder.quote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="bg-green-primary/5 border-l-4 border-green-primary p-8 relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-green-primary/20 text-6xl font-serif">
                  "
                </div>

                <p className="text-white italic text-xl leading-relaxed mb-4 relative z-10">
                  {founder.quote}
                </p>
                <p className="text-green-vibrant text-sm tracking-wide">
                  — {founder.name}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Company } from "@/types/about";

interface MissionVisionProps {
  company: Company;
  locale: string;
}

export default function MissionVision({ company, locale }: MissionVisionProps) {
  const isArabic = locale === "ar";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const hasMission = isArabic ? company.missionAr : company.missionEn;
  const hasVision = isArabic ? company.visionAr : company.visionEn;

  if (!hasMission && !hasVision) return null;

  return (
    <section
      ref={ref}
      className="py-32 bg-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(200, 225, 99, 0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Mission */}
          {hasMission && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <div className="relative">
                {/* Decorative Corner */}
                <div className="absolute -top-6 -left-6 w-16 h-16 border-l-2 border-t-2 border-green-primary opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="bg-background-card border border-gray-dark hover:border-green-primary/40 p-10 transition-all duration-500 relative overflow-hidden group-hover:shadow-2xl group-hover:shadow-green-primary/5">
                  {/* Background Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="w-16 h-16 mb-8 flex items-center justify-center border border-green-primary/40 group-hover:border-green-primary transition-colors duration-500"
                    >
                      <svg
                        className="w-8 h-8 text-green-vibrant"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </motion.div>

                    {/* Badge */}
                    <p className="text-green-vibrant text-xs tracking-[0.3em] mb-4 font-light uppercase">
                      {isArabic ? "مهمتنا" : "Our Mission"}
                    </p>

                    {/* Title */}
                    <h3 className="font-serif text-4xl text-white mb-6 group-hover:text-green-vibrant transition-colors duration-500">
                      {isArabic ? "رسالتنا" : "Mission Statement"}
                    </h3>

                    {/* Divider */}
                    <div className="w-20 h-px bg-green-primary mb-6" />

                    {/* Content */}
                    <p className="text-gray-light leading-relaxed font-light text-lg">
                      {isArabic ? company.missionAr : company.missionEn}
                    </p>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute -bottom-6 -right-6 w-16 h-16 border-r-2 border-b-2 border-green-primary opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          )}

          {/* Vision */}
          {hasVision && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <div className="relative">
                {/* Decorative Corner */}
                <div className="absolute -top-6 -left-6 w-16 h-16 border-l-2 border-t-2 border-green-primary opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="bg-background-card border border-gray-dark hover:border-green-primary/40 p-10 transition-all duration-500 relative overflow-hidden group-hover:shadow-2xl group-hover:shadow-green-primary/5">
                  {/* Background Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="w-16 h-16 mb-8 flex items-center justify-center border border-green-primary/40 group-hover:border-green-primary transition-colors duration-500"
                    >
                      <svg
                        className="w-8 h-8 text-green-vibrant"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </motion.div>

                    {/* Badge */}
                    <p className="text-green-vibrant text-xs tracking-[0.3em] mb-4 font-light uppercase">
                      {isArabic ? "رؤيتنا" : "Our Vision"}
                    </p>

                    {/* Title */}
                    <h3 className="font-serif text-4xl text-white mb-6 group-hover:text-green-vibrant transition-colors duration-500">
                      {isArabic ? "رؤيتنا المستقبلية" : "Vision Statement"}
                    </h3>

                    {/* Divider */}
                    <div className="w-20 h-px bg-green-primary mb-6" />

                    {/* Content */}
                    <p className="text-gray-light leading-relaxed font-light text-lg">
                      {isArabic ? company.visionAr : company.visionEn}
                    </p>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute -bottom-6 -right-6 w-16 h-16 border-r-2 border-b-2 border-green-primary opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

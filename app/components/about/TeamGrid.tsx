"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import type { TeamMember } from "@/types/about";

interface TeamGridProps {
  teamMembers: TeamMember[];
  locale: string;
}

export default function TeamGrid({ teamMembers, locale }: TeamGridProps) {
  const isArabic = locale === "ar";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (teamMembers.length === 0) return null;

  return (
    <section
      ref={ref}
      className="py-32 bg-background-card relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(200, 225, 99, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(200, 225, 99, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-green-vibrant text-sm tracking-[0.3em] mb-6 font-light uppercase">
              {isArabic ? "فريق الخبراء" : "Expert Team"}
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
              {isArabic ? "تعرف على فريقنا" : "Meet Our Team"}
            </h2>
            <p className="text-gray-light text-lg max-w-2xl mx-auto font-light leading-relaxed">
              {isArabic
                ? "مجموعة من الخبراء المتخصصين الملتزمين بتقديم التميز في كل مشروع"
                : "A dedicated group of specialists committed to delivering excellence in every project"}
            </p>
            <div className="w-24 h-px bg-green-primary mx-auto mt-8" />
          </motion.div>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              index={index}
              isInView={isInView}
              isArabic={isArabic}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamMemberCard({
  member,
  index,
  isInView,
  isArabic,
}: {
  member: TeamMember;
  index: number;
  isInView: boolean;
  isArabic: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
    >
      {/* Modern Card Container */}
      <motion.div
        className="relative bg-black border border-gray-dark/40 overflow-hidden h-full transition-all duration-500"
        whileHover={{
          borderColor: "rgba(200, 225, 99, 0.5)",
          boxShadow: "0 20px 60px -15px rgba(200, 225, 99, 0.2)",
        }}
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-primary to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Content Container */}
        <div className="p-8">
          {/* Role Badge */}
          <div className="inline-block mb-6">
            <div className="px-4 py-1.5 bg-green-primary/10 border border-green-primary/30">
              <p className="text-green-vibrant text-xs tracking-[0.2em] uppercase font-light">
                {isArabic ? member.roleAr : member.roleEn}
              </p>
            </div>
          </div>

          {/* Name */}
          <h3 className="font-serif text-3xl text-white mb-4 leading-tight">
            {isArabic ? member.nameAr : member.nameEn}
          </h3>

          {/* Experience */}
          {member.yearsOfExperience && (
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-green-primary/40" />
              <p className="text-gray-light text-sm">
                {member.yearsOfExperience}{" "}
                {isArabic ? "سنوات خبرة" : "years experience"}
              </p>
            </div>
          )}

          {/* Bio */}
          <p className="text-gray-light text-sm leading-relaxed mb-6 line-clamp-3">
            {isArabic ? member.bioAr : member.bioEn}
          </p>

          {/* Specialties */}
          {(member.specialtiesEn.length > 0 ||
            member.specialtiesAr.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {(isArabic ? member.specialtiesAr : member.specialtiesEn)
                .slice(0, 3)
                .map((specialty, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                    className="px-3 py-1 text-xs text-green-vibrant border border-green-primary/30 hover:bg-green-primary/10 transition-colors duration-300"
                  >
                    {specialty}
                  </motion.span>
                ))}
            </div>
          )}

          {/* Contact */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-dark/40">
            {member.email && (
              <motion.a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 text-gray-light hover:text-green-vibrant transition-colors duration-300 text-sm group/link"
                aria-label="Email"
                whileHover={{ x: 3 }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-xs tracking-wider uppercase">
                  {isArabic ? "تواصل" : "Contact"}
                </span>
              </motion.a>
            )}
            {member.linkedin && (
              <motion.a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-light hover:text-green-vibrant transition-colors duration-300 text-sm"
                aria-label="LinkedIn"
                whileHover={{ x: 3 }}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
            )}
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-primary to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-green-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-green-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </motion.div>
  );
}

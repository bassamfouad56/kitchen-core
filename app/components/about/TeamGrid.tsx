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
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Glow Effect Background */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-br from-green-vibrant/20 via-green-primary/10 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
      />

      <div className="relative bg-gradient-to-br from-gray-dark/50 via-background-elevated to-gray-dark/30 border border-gray-dark hover:border-green-primary/60 overflow-hidden transition-all duration-500 h-full hover:shadow-2xl hover:shadow-green-primary/20 backdrop-blur-sm rounded-lg">
        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-vibrant/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-green-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
          {/* Dynamic Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-dark via-black to-gray-dark">
            {/* Animated gradient orbs */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-green-vibrant/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-64 h-64 bg-green-primary/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(200, 225, 99, 0.5) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(200, 225, 99, 0.5) 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          <Image
            src={member.image}
            alt="Team Member"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 relative z-10 mix-blend-lighten"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Enhanced Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

          {/* Soft edge vignette */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-vibrant/5 via-transparent to-green-primary/5 z-10" />

          {/* Animated Border on Hover */}
          <motion.div
            className="absolute inset-0 border-2 border-green-vibrant/0 group-hover:border-green-vibrant/30 transition-all duration-500 z-20"
            animate={
              isHovered
                ? {
                    boxShadow: "inset 0 0 30px rgba(74, 222, 128, 0.1)",
                  }
                : {}
            }
          />

          {/* Hover Info Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6 z-30"
          >
            <div className="text-center">
              {/* Bio Excerpt */}
              <p className="text-gray-light text-sm leading-relaxed mb-4 line-clamp-4">
                {isArabic ? member.bioAr : member.bioEn}
              </p>

              {/* Specialties */}
              {(member.specialtiesEn.length > 0 ||
                member.specialtiesAr.length > 0) && (
                <div className="flex flex-wrap justify-center gap-2">
                  {(isArabic ? member.specialtiesAr : member.specialtiesEn)
                    .slice(0, 3)
                    .map((specialty, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isHovered ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: idx * 0.1 }}
                        className="px-3 py-1.5 text-xs border border-green-primary/40 text-green-vibrant bg-green-primary/5 hover:bg-green-primary/10 hover:border-green-vibrant/60 transition-all duration-300 rounded-sm backdrop-blur-sm"
                      >
                        {specialty}
                      </motion.span>
                    ))}
                </div>
              )}

              {/* Social Links */}
              <motion.div
                className="flex justify-center gap-4 mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={isHovered ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                {member.email && (
                  <motion.a
                    href={`mailto:${member.email}`}
                    className="w-11 h-11 border border-green-primary/40 hover:border-green-vibrant flex items-center justify-center transition-all duration-300 rounded-sm bg-green-primary/5 hover:bg-green-primary/15 backdrop-blur-sm group/icon"
                    aria-label="Email"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-5 h-5 text-green-vibrant group-hover/icon:scale-110 transition-transform"
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
                  </motion.a>
                )}
                {member.linkedin && (
                  <motion.a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 border border-green-primary/40 hover:border-green-vibrant flex items-center justify-center transition-all duration-300 rounded-sm bg-green-primary/5 hover:bg-green-primary/15 backdrop-blur-sm group/icon"
                    aria-label="LinkedIn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-5 h-5 text-green-vibrant group-hover/icon:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Name Overlay (always visible) */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 z-40 backdrop-blur-md bg-gradient-to-t from-black/90 via-black/70 to-transparent"
            animate={
              isHovered
                ? {
                    paddingBottom: "2rem",
                  }
                : {}
            }
            transition={{ duration: 0.3 }}
          >
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-vibrant/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <motion.h3
              className="text-2xl font-serif text-white mb-1 group-hover:text-green-vibrant transition-colors duration-300"
              animate={isHovered ? { x: 5 } : { x: 0 }}
            >
              {isArabic ? member.nameAr : member.nameEn}
            </motion.h3>
            <p className="text-green-vibrant text-sm tracking-wide uppercase font-light">
              {isArabic ? member.roleAr : member.roleEn}
            </p>
            {member.yearsOfExperience && (
              <motion.div
                className="flex items-center gap-2 mt-3"
                initial={{ opacity: 0.7 }}
                animate={isHovered ? { opacity: 1 } : { opacity: 0.7 }}
              >
                <div className="w-8 h-px bg-green-primary/40" />
                <p className="text-gray-light text-xs">
                  {member.yearsOfExperience}{" "}
                  {isArabic ? "سنوات خبرة" : "years experience"}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

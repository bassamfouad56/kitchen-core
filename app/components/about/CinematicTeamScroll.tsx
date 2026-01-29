"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { TeamMember } from "@/types/about";

interface CinematicTeamScrollProps {
  teamMembers: TeamMember[];
  locale: string;
}

export default function CinematicTeamScroll({
  teamMembers,
  locale,
}: CinematicTeamScrollProps) {
  const isArabic = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate which member is active based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const index = Math.min(
        Math.floor(value * teamMembers.length),
        teamMembers.length - 1
      );
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, teamMembers.length]);

  if (teamMembers.length === 0) return null;

  const activeMember = teamMembers[activeIndex];

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${teamMembers.length * 100}vh` }}
    >
      {/* Sticky Container - This stays fixed while scrolling */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(200, 225, 99, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(200, 225, 99, 0.3) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />

          {/* Ambient Glow */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-green-primary/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-green-vibrant/5 rounded-full blur-[120px]" />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Side - Fixed Text Content */}
              <div className={`${isArabic ? "lg:order-2" : ""}`}>
                {/* Section Header - Always Visible */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-12"
                >
                  <p className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light uppercase">
                    {isArabic ? "فريق الخبراء" : "Expert Team"}
                  </p>
                  <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1]">
                    {isArabic ? "تعرف على" : "Meet Our"}
                    <br />
                    <span className="text-green-primary">
                      {isArabic ? "فريقنا" : "Team"}
                    </span>
                  </h2>
                  <div className="w-24 h-px bg-gradient-to-r from-green-primary to-transparent" />
                </motion.div>

                {/* Static Description */}
                <p className="text-gray-light text-lg leading-relaxed max-w-lg mb-8">
                  {isArabic
                    ? "مجموعة من الخبراء المتخصصين الملتزمين بتقديم التميز في كل مشروع نعمل عليه."
                    : "A dedicated group of specialists committed to delivering excellence in every project we undertake."}
                </p>

                {/* Dynamic Member Info - Only Name Changes */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMember.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    {/* Role Badge */}
                    <div className="inline-block">
                      <div className="px-5 py-2 bg-green-primary/10 border border-green-primary/30 backdrop-blur-sm">
                        <p className="text-green-vibrant text-sm tracking-[0.2em] uppercase font-light">
                          {isArabic ? activeMember.roleAr : activeMember.roleEn}
                        </p>
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                      {isArabic ? activeMember.nameAr : activeMember.nameEn}
                    </h3>

                    {/* Contact Links */}
                    <div className="flex items-center gap-6 pt-4">
                      {activeMember.email && (
                        <a
                          href={`mailto:${activeMember.email}`}
                          className="flex items-center gap-2 text-gray-light hover:text-green-vibrant transition-colors duration-300 group"
                        >
                          <div className="w-10 h-10 rounded-full border border-gray-dark/60 flex items-center justify-center group-hover:border-green-primary/60 transition-colors">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <span className="text-sm tracking-wider">
                            {isArabic ? "تواصل معي" : "Contact"}
                          </span>
                        </a>
                      )}
                      {activeMember.linkedin && (
                        <a
                          href={activeMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-light hover:text-green-vibrant transition-colors duration-300 group"
                        >
                          <div className="w-10 h-10 rounded-full border border-gray-dark/60 flex items-center justify-center group-hover:border-green-primary/60 transition-colors">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </div>
                        </a>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Side - Member Image */}
              <div className={`relative ${isArabic ? "lg:order-1" : ""}`}>
                <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none">
                  {/* Frame Decorations */}
                  <div className="absolute -inset-4 border border-green-primary/20" />
                  <div className="absolute -inset-8 border border-green-primary/10" />

                  {/* Corner Accents */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-green-primary" />
                  <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-green-primary" />
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-green-primary" />
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-green-primary" />

                  {/* Image Container */}
                  <div className="relative h-full overflow-hidden bg-gray-dark/20">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeMember.id}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute inset-0"
                      >
                        {activeMember.image ? (
                          <Image
                            src={activeMember.image}
                            alt={
                              isArabic
                                ? activeMember.nameAr
                                : activeMember.nameEn
                            }
                            fill
                            className="object-cover object-top"
                            priority
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-dark/30">
                            <svg
                              className="w-24 h-24 text-gray-dark"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Image Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Floating Index Badge */}
                  <motion.div
                    className="absolute -bottom-6 -right-6 w-20 h-20 bg-green-primary flex items-center justify-center"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-black text-3xl font-serif font-bold">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = containerRef.current;
                if (container) {
                  const targetScroll =
                    container.offsetTop +
                    (index / teamMembers.length) *
                      (container.scrollHeight - window.innerHeight);
                  window.scrollTo({ top: targetScroll, behavior: "smooth" });
                }
              }}
              className={`w-2 h-8 transition-all duration-300 ${
                index === activeIndex
                  ? "bg-green-primary w-3"
                  : "bg-gray-dark/60 hover:bg-gray-dark"
              }`}
              aria-label={`Go to team member ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        {activeIndex < teamMembers.length - 1 && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-gray-light text-xs tracking-[0.2em] uppercase">
              {isArabic ? "مرر للأسفل" : "Scroll"}
            </span>
            <motion.div
              className="w-6 h-10 rounded-full border border-gray-dark/60 flex items-start justify-center p-2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-2 bg-green-primary rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Member Counter */}
        <div className="absolute bottom-8 right-8 text-right">
          <div className="flex items-baseline gap-2">
            <span className="text-green-primary text-4xl font-serif font-bold">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-gray-dark text-2xl">/</span>
            <span className="text-gray-light text-xl">
              {String(teamMembers.length).padStart(2, "0")}
            </span>
          </div>
          <p className="text-gray-dark text-xs tracking-[0.2em] uppercase mt-1">
            {isArabic ? "أعضاء الفريق" : "Team Members"}
          </p>
        </div>
      </div>
    </section>
  );
}

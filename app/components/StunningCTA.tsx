"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function StunningCTA() {
  const { scrollYProgress } = useScroll();
  const [isHovered, setIsHovered] = useState(false);

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.8]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Layer 1 - Grid */}
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute inset-0 opacity-10"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(200, 225, 99, 0.2) 2px, transparent 2px),
                                linear-gradient(90deg, rgba(200, 225, 99, 0.2) 2px, transparent 2px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </motion.div>

        {/* Layer 2 - Radial Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-green-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-green-vibrant/20 rounded-full blur-[100px]" />
        </motion.div>

        {/* Layer 3 - Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-vibrant/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Layer 4 - Animated Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0,100 Q250,50 500,100 T1000,100"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M0,200 Q350,250 700,200 T1400,200"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(200, 225, 99, 0)" />
              <stop offset="50%" stopColor="rgba(200, 225, 99, 0.8)" />
              <stop offset="100%" stopColor="rgba(200, 225, 99, 0)" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(200, 225, 99, 0)" />
              <stop offset="50%" stopColor="rgba(200, 225, 99, 0.8)" />
              <stop offset="100%" stopColor="rgba(200, 225, 99, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y: y2 }}
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center"
      >
        {/* Decorative Top Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-px bg-gradient-to-r from-transparent via-green-primary to-transparent mb-12"
        />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-block mb-8"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(200, 225, 99, 0.4)",
                "0 0 0 20px rgba(200, 225, 99, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-green-primary/20 blur-xl" />
            <div className="relative bg-gradient-to-r from-green-darker via-green-primary to-green-darker px-8 py-3 border border-green-vibrant/50">
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="text-white text-sm tracking-[0.3em] font-light bg-gradient-to-r from-white via-green-vibrant to-white bg-clip-text text-transparent"
                style={{ backgroundSize: "200% auto" }}
              >
                LIMITED EXCLUSIVE CONSULTATIONS
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
            Ready to Create
            <motion.span
              className="block text-green-vibrant italic mt-4"
              animate={{
                textShadow: [
                  "0 0 20px rgba(200, 225, 99, 0.5)",
                  "0 0 40px rgba(200, 225, 99, 0.8)",
                  "0 0 20px rgba(200, 225, 99, 0.5)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              Your Masterpiece?
            </motion.span>
          </h2>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed mb-12"
        >
          Join the world's most discerning clients. Transform your kitchen into an
          architectural masterpiece that combines Italian craftsmanship, cutting-edge
          technology, and timeless luxury.
        </motion.p>

        {/* Value Props */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {[
            { icon: "✓", text: "Complimentary Design Consultation" },
            { icon: "✓", text: "3D Visualization Included" },
            { icon: "✓", text: "10-Year Craftsmanship Warranty" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-background-card/50 backdrop-blur-sm border border-green-primary/30 px-6 py-3 group hover:border-green-primary transition-colors duration-300"
            >
              <span className="text-green-vibrant text-2xl">{item.icon}</span>
              <span className="text-white text-sm group-hover:text-green-vibrant transition-colors duration-300">
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          {/* Primary CTA */}
          <motion.a
            href="#contact"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative px-12 py-6 bg-gradient-to-r from-green-primary via-green-vibrant to-green-primary bg-[length:200%_100%] text-black font-bold text-lg tracking-wider overflow-hidden">
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-vibrant via-green-primary to-green-vibrant"
                animate={{
                  x: isHovered ? ["-100%", "100%"] : 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
              />

              {/* Button Text */}
              <span className="relative z-10 flex items-center gap-3">
                START YOUR PROJECT
                <motion.svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{
                    x: isHovered ? [0, 5, 0] : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </span>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(200, 225, 99, 0.5)",
                    "0 0 40px rgba(200, 225, 99, 0.8)",
                    "0 0 20px rgba(200, 225, 99, 0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>

            {/* Border Animation */}
            <div className="absolute inset-0 border-2 border-green-vibrant opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.05, borderColor: "rgba(200, 225, 99, 1)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-6 border-2 border-green-primary/50 text-green-primary hover:text-white font-medium text-lg tracking-wider transition-all duration-300 overflow-hidden"
          >
            {/* Hover Background */}
            <motion.div
              className="absolute inset-0 bg-green-primary/10 origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />

            <span className="relative z-10 flex items-center gap-3">
              EXPLORE GALLERY
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
          </motion.a>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 pt-16 border-t border-gray-dark"
        >
          <p className="text-green-vibrant text-sm tracking-wider mb-8">
            TRUSTED BY ELITE CLIENTS WORLDWIDE
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "150+", label: "Luxury Projects" },
              { number: "25", label: "Countries" },
              { number: "100%", label: "Satisfaction" },
              { number: "15+", label: "Years Excellence" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <motion.div
                  className="font-serif text-5xl text-green-vibrant mb-2"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(52, 211, 153, 0.3)",
                      "0 0 20px rgba(52, 211, 153, 0.6)",
                      "0 0 10px rgba(52, 211, 153, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-xs tracking-wider text-gray-light uppercase group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Decorative Bottom Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }}
          className="h-px bg-gradient-to-r from-transparent via-green-primary to-transparent mt-16"
        />
      </motion.div>

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-0 left-0 w-40 h-40 border-t-2 border-l-2 border-green-primary/30"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-40 h-40 border-b-2 border-r-2 border-green-primary/30"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 2,
        }}
      />
    </section>
  );
}

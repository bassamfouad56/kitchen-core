"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedLogoProps {
  className?: string;
  showFullLogo?: boolean;
  size?: "small" | "medium" | "large";
}

export default function AnimatedLogo({
  className = "",
  showFullLogo = true,
  size = "medium",
}: AnimatedLogoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Size configurations - Made tighter and more professional
  const sizeConfig = {
    small: {
      container: "h-8",
      icon: 28,
      text: "text-base",
      spacing: "gap-1.5",
    },
    medium: {
      container: "h-10",
      icon: 36,
      text: "text-xl",
      spacing: "gap-2",
    },
    large: {
      container: "h-14",
      icon: 56,
      text: "text-3xl",
      spacing: "gap-3",
    },
  };

  const config = sizeConfig[size];

  // Particle positions (floating around logo) - Reduced for professional look
  const particles = [
    { x: -15, y: -18, delay: 0 },
    { x: 15, y: -18, delay: 0.15 },
    { x: 0, y: 20, delay: 0.3 },
  ];

  return (
    <motion.div
      className={`relative flex items-center ${config.spacing} ${config.container} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating Particles */}
      {isLoaded &&
        particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 bg-green-vibrant rounded-full pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
            }}
            initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0.5],
              x: particle.x,
              y: particle.y,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: 1.5 + particle.delay,
              ease: "easeOut",
            }}
          />
        ))}

      {/* Logo Icon with Geometric Shape */}
      <motion.div
        className="relative"
        initial={{ scale: 0, rotate: -180 }}
        animate={{
          scale: isLoaded ? 1 : 0,
          rotate: isLoaded ? 0 : -180,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        whileHover={{
          scale: 1.05,
          rotate: [0, 5, -5, 0],
          transition: { duration: 0.5 },
        }}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-lg blur-md"
          animate={{
            boxShadow: isHovered
              ? [
                  "0 0 20px rgba(52, 211, 153, 0.4)",
                  "0 0 30px rgba(52, 211, 153, 0.6)",
                  "0 0 20px rgba(52, 211, 153, 0.4)",
                ]
              : "0 0 0px rgba(52, 211, 153, 0)",
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
          }}
        />

        <svg
          width={config.icon}
          height={config.icon}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Simplified Square with Rounded Corners - More Professional */}
          <motion.rect
            x="10"
            y="10"
            width="80"
            height="80"
            rx="8"
            stroke="url(#logoGradient)"
            strokeWidth="2.5"
            fill="rgba(0, 0, 0, 0.6)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isLoaded ? 1 : 0,
              opacity: isLoaded ? 1 : 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeInOut",
            }}
          />

          {/* Accent Line - Top */}
          <motion.line
            x1="25"
            y1="10"
            x2="75"
            y2="10"
            stroke="url(#accentGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isLoaded ? 1 : 0 }}
            transition={{
              duration: 0.6,
              delay: 0.7,
              ease: "easeOut",
            }}
          />

          {/* K Letter - Cleaner positioning */}
          <motion.text
            x="32"
            y="62"
            fontSize="32"
            fontWeight="700"
            fill="white"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              scale: isLoaded ? 1 : 0.8,
            }}
            transition={{ duration: 0.4, delay: 1 }}
          >
            K
          </motion.text>

          {/* C Letter - Closer to K */}
          <motion.text
            x="54"
            y="62"
            fontSize="32"
            fontWeight="700"
            fill="url(#textGradient)"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              scale: isLoaded ? 1 : 0.8,
            }}
            transition={{ duration: 0.4, delay: 1.15 }}
          >
            C
          </motion.text>

          {/* Gradients */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="50%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(52, 211, 153, 0.3)" />
              <stop offset="50%" stopColor="rgba(52, 211, 153, 1)" />
              <stop offset="100%" stopColor="rgba(52, 211, 153, 0.3)" />
            </linearGradient>
            <linearGradient id="goldShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Gold Shimmer Effect (passes over logo) */}
          <motion.rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="url(#goldShimmer)"
            opacity={isHovered ? 0.3 : 0}
            animate={{
              x: isHovered ? [-100, 200] : 0,
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 1,
            }}
          />
        </svg>
      </motion.div>

      {/* Text Logo - More Professional Typography */}
      {showFullLogo && (
        <div className={`flex items-center ${config.text} font-semibold tracking-wide`}>
          <motion.span
            className="text-white"
            style={{ letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              x: isLoaded ? 0 : -20,
            }}
            transition={{ duration: 0.6, delay: 1.4 }}
            whileHover={{
              color: "#34D399",
              transition: { duration: 0.3 },
            }}
          >
            Kitchen
          </motion.span>
          <motion.span
            className="ml-1 bg-gradient-to-r from-green-vibrant via-green-primary to-green-vibrant bg-clip-text text-transparent font-bold"
            style={{
              backgroundSize: "200% auto",
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              x: isLoaded ? 0 : -20,
              backgroundPosition: isHovered ? ["0% 50%", "100% 50%"] : "0% 50%",
            }}
            transition={{
              opacity: { duration: 0.6, delay: 1.6 },
              x: { duration: 0.6, delay: 1.6 },
              backgroundPosition: {
                duration: 2,
                repeat: isHovered ? Infinity : 0,
                ease: "linear",
              },
            }}
          >
            Core
          </motion.span>
        </div>
      )}

      {/* Ambient Glow Background */}
      <motion.div
        className="absolute inset-0 -z-10 blur-2xl opacity-20"
        animate={{
          backgroundColor: isHovered
            ? ["rgba(5, 150, 105, 0)", "rgba(52, 211, 153, 0.2)", "rgba(5, 150, 105, 0)"]
            : "rgba(5, 150, 105, 0)",
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
        }}
      />
    </motion.div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";

interface LogoIconProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function LogoIcon({ size = 40, className = "", animate = true }: LogoIconProps) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={animate ? { scale: 0, rotate: -180 } : {}}
      animate={animate ? { scale: 1, rotate: 0 } : {}}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      whileHover={
        animate
          ? {
              scale: 1.1,
              rotate: [0, 10, -10, 0],
              transition: { duration: 0.6 },
            }
          : {}
      }
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg blur-md"
        animate={{
          boxShadow: [
            "0 0 15px rgba(52, 211, 153, 0.3)",
            "0 0 25px rgba(52, 211, 153, 0.5)",
            "0 0 15px rgba(52, 211, 153, 0.3)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Simplified Square with Rounded Corners */}
        <motion.rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="8"
          stroke="url(#iconGradient)"
          strokeWidth="2.5"
          fill="rgba(0, 0, 0, 0.7)"
          initial={animate ? { pathLength: 0, opacity: 0 } : {}}
          animate={animate ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeInOut",
          }}
        />

        {/* Accent Line - Top */}
        <motion.line
          x1="25"
          y1="10"
          x2="75"
          y2="10"
          stroke="url(#iconAccentGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={animate ? { pathLength: 0 } : {}}
          animate={animate ? { pathLength: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: "easeOut",
          }}
        />

        {/* K Letter */}
        <motion.text
          x="32"
          y="62"
          fontSize="32"
          fontWeight="700"
          fill="white"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-2"
          initial={animate ? { opacity: 0, scale: 0.8 } : {}}
          animate={animate ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          K
        </motion.text>

        {/* C Letter */}
        <motion.text
          x="54"
          y="62"
          fontSize="32"
          fontWeight="700"
          fill="url(#iconTextGradient)"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-2"
          initial={animate ? { opacity: 0, scale: 0.8 } : {}}
          animate={animate ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.95 }}
        >
          C
        </motion.text>

        {/* Gradients */}
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="iconTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="iconAccentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(52, 211, 153, 0.3)" />
            <stop offset="50%" stopColor="rgba(52, 211, 153, 1)" />
            <stop offset="100%" stopColor="rgba(52, 211, 153, 0.3)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

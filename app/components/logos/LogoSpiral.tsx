"use client";

import React from "react";
import { motion } from "framer-motion";

interface LogoSpiralProps {
  isAnimating: boolean;
  size?: number;
}

export default function LogoSpiral({ isAnimating, size = 300 }: LogoSpiralProps) {
  // Generate golden spiral path using Fibonacci sequence
  // Golden ratio: φ = 1.618033988749895
  const generateGoldenSpiralPath = () => {
    const phi = 1.618033988749895;
    const turns = 2.5; // Number of spiral rotations
    const points: string[] = [];
    const centerX = size / 2;
    const centerY = size / 2;
    const maxRadius = size * 0.42;

    // Start from center and spiral outward
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * turns * Math.PI * 2;
      const radius = maxRadius * Math.pow(phi, -t / (Math.PI * 2));
      const x = centerX + radius * Math.cos(t);
      const y = centerY + radius * Math.sin(t);

      if (i === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }

    return points.join(" ");
  };

  const spiralPath = generateGoldenSpiralPath();

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0"
    >
      {/* Blueprint Grid Background */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isAnimating ? 0.08 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Vertical lines */}
        {[...Array(12)].map((_, i) => (
          <line
            key={`v-${i}`}
            x1={(size / 12) * i}
            y1="0"
            x2={(size / 12) * i}
            y2={size}
            stroke="#059669"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}
        {/* Horizontal lines */}
        {[...Array(12)].map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={(size / 12) * i}
            x2={size}
            y2={(size / 12) * i}
            stroke="#059669"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}
      </motion.g>

      {/* Golden Spiral Path */}
      <motion.path
        d={spiralPath}
        fill="none"
        stroke="url(#spiralGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: isAnimating ? 1 : 0,
          opacity: isAnimating ? 1 : 0,
        }}
        transition={{
          pathLength: { duration: 1.5, ease: "easeInOut" },
          opacity: { duration: 0.5 },
        }}
      />

      {/* Spiral Glow Effect */}
      <motion.path
        d={spiralPath}
        fill="none"
        stroke="url(#spiralGlowGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.3"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isAnimating ? 1 : 0 }}
        transition={{
          pathLength: { duration: 1.5, ease: "easeInOut" },
        }}
      />

      {/* Center Circle (Core focal point) */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r="4"
        fill="url(#coreGradient)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isAnimating ? 1 : 0,
          opacity: isAnimating ? 1 : 0,
        }}
        transition={{ duration: 0.5, delay: 2.8 }}
      />

      {/* Outer decorative arc */}
      <motion.path
        d={`M ${size * 0.15} ${size * 0.85} Q ${size * 0.5} ${size * 0.95}, ${size * 0.85} ${size * 0.85}`}
        fill="none"
        stroke="url(#accentGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: isAnimating ? 1 : 0,
          opacity: isAnimating ? 0.4 : 0,
        }}
        transition={{ duration: 0.6, delay: 1.8 }}
      />

      {/* Gradients */}
      <defs>
        {/* Main Spiral Gradient */}
        <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="30%" stopColor="#059669" />
          <stop offset="70%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>

        {/* Spiral Glow */}
        <radialGradient id="spiralGlowGradient" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
        </radialGradient>

        {/* Core Center */}
        <radialGradient id="coreGradient" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#059669" />
        </radialGradient>

        {/* Accent Line */}
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(52, 211, 153, 0)" />
          <stop offset="50%" stopColor="rgba(212, 175, 55, 0.6)" />
          <stop offset="100%" stopColor="rgba(52, 211, 153, 0)" />
        </linearGradient>

        {/* Glow Filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

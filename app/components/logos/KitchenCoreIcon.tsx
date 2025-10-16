"use client";

import React from "react";
import { motion } from "framer-motion";

interface KitchenCoreIconProps {
  size?: number;
  isAnimating?: boolean;
  className?: string;
}

export default function KitchenCoreIcon({
  size = 48,
  isAnimating = false,
  className = "",
}: KitchenCoreIconProps) {
  const centerX = size / 2;
  const centerY = size / 2;

  // Simplified golden spiral path
  const generateSimpleSpiral = () => {
    const phi = 1.618033988749895;
    const turns = 1.5;
    const points: string[] = [];
    const maxRadius = size * 0.4;

    for (let i = 0; i <= 60; i++) {
      const t = (i / 60) * turns * Math.PI * 2;
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

  const spiralPath = generateSimpleSpiral();

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r={size * 0.45}
        fill="rgba(5, 150, 105, 0.1)"
        stroke="rgba(5, 150, 105, 0.3)"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isAnimating ? 1 : 1,
          opacity: isAnimating ? 1 : 0.7,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Golden spiral */}
      <motion.path
        d={spiralPath}
        fill="none"
        stroke="url(#iconSpiralGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: isAnimating ? 1 : 1,
          opacity: isAnimating ? 1 : 0.9,
        }}
        transition={{
          pathLength: { duration: 1, ease: "easeInOut" },
          opacity: { duration: 0.3 },
        }}
      />

      {/* Center "K" letter */}
      <motion.text
        x={centerX}
        y={centerY + size * 0.08}
        textAnchor="middle"
        fontSize={size * 0.35}
        fontFamily="Playfair Display, serif"
        fontWeight="600"
        fill="#D4AF37"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isAnimating ? 1 : 1,
          scale: isAnimating ? 1 : 1,
        }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        K
      </motion.text>

      {/* Gradients */}
      <defs>
        <linearGradient id="iconSpiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>
    </svg>
  );
}

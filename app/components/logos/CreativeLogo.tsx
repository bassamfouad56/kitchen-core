"use client";

import React from "react";
import { motion } from "framer-motion";

interface CreativeLogoProps {
  size?: number;
  variant?: "light" | "dark";
  className?: string;
}

export default function CreativeLogo({
  size = 80,
  variant = "light",
  className = "",
}: CreativeLogoProps) {
  const centerX = size / 2;
  const centerY = size / 2;

  // Circle radii (concentric)
  const innerCircle = size * 0.22;
  const midCircle = size * 0.30;
  const outerCircle = size * 0.38;

  const fontSize = size * 0.13;
  const smallFontSize = size * 0.09;

  const textColor = variant === "light" ? "#FFFFFF" : "#000000";
  const accentColor = "#34D399"; // green-vibrant
  const grayColor = "#64748B";

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        {/* Outer circle (structural) */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={outerCircle}
          fill="none"
          stroke={grayColor}
          strokeWidth={size * 0.006}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />

        {/* Middle circle (green core layer) */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={midCircle}
          fill="none"
          stroke={accentColor}
          strokeWidth={size * 0.012}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        />

        {/* Inner circle (structural) */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={innerCircle}
          fill="none"
          stroke={grayColor}
          strokeWidth={size * 0.006}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        />

        {/* "CORE" text in center */}
        <motion.text
          x={centerX}
          y={centerY + fontSize * 0.35}
          textAnchor="middle"
          fontFamily="'Montserrat', sans-serif"
          fontWeight="700"
          fontSize={fontSize}
          fill={textColor}
          letterSpacing={size * 0.01}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          CORE
        </motion.text>

        {/* "KITCHEN" text at bottom */}
        <motion.text
          x={centerX}
          y={centerY + outerCircle + smallFontSize * 1.5}
          textAnchor="middle"
          fontFamily="'Montserrat', sans-serif"
          fontWeight="600"
          fontSize={smallFontSize}
          fill={textColor}
          letterSpacing={size * 0.015}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
        >
          KITCHEN
        </motion.text>

        {/* Import Montserrat font */}
        <defs>
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&display=swap');
            `}
          </style>
        </defs>
      </svg>

      {/* Subtle glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.15 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          filter: "blur(15px)",
        }}
      />
    </motion.div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";

interface WrapLogoProps {
  size?: number;
  variant?: "light" | "dark";
  animate?: boolean;
  className?: string;
}

export default function WrapLogo({
  size = 100,
  variant = "light",
  animate = true,
  className = "",
}: WrapLogoProps) {
  const textColor = variant === "light" ? "#FFFFFF" : "#000000";
  const accentColor = "#34D399"; // green-vibrant

  // Proportional sizing - ENHANCED for better readability
  const cFontSize = size * 1.0;        // Increased from 0.7
  const oreFontSize = size * 0.55;     // Increased from 0.35
  const kitchenFontSize = size * 0.28; // Increased from 0.18
  const dropSize = size * 0.10;        // Increased from 0.08

  // Positioning - ADJUSTED for bigger text
  const cX = size * 0.15;
  const cY = size * 0.80;
  const oreX = size * 0.60;
  const oreY = size * 0.70;
  const kitchenX = size * 0.02;
  const kitchenY = size * 0.25;

  // Water drop positions
  const dropStartX = size * 0.30;
  const dropStartY = size * 0.10;
  const dropEndX = size * 0.68;
  const dropEndY = size * 0.62;

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size * 2.2, height: size }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg
        width={size * 2.2}
        height={size}
        viewBox={`0 0 ${size * 2.2} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Import Montserrat font */}
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&display=swap');

              .logo-text {
                font-family: 'Montserrat', sans-serif;
              }
            `}
          </style>

          {/* Ripple gradient */}
          <radialGradient id="rippleGradient">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Layer 1: KITCHEN (behind, semi-transparent, slides out) */}
        <motion.text
          x={kitchenX}
          y={kitchenY}
          className="logo-text"
          fontSize={kitchenFontSize}
          fontWeight="900"
          fill={textColor}
          opacity={0.7}
          letterSpacing={size * 0.015}
          initial={animate ? { x: kitchenX + 30, opacity: 0 } : {}}
          animate={animate ? { x: kitchenX, opacity: 0.7 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          KITCHEN
        </motion.text>

        {/* Layer 2: Large "C" wrapper */}
        <motion.text
          x={cX}
          y={cY}
          className="logo-text"
          fontSize={cFontSize}
          fontWeight="900"
          fill={textColor}
          initial={animate ? { scale: 0, opacity: 0 } : {}}
          animate={animate ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: `${cX + cFontSize * 0.3}px ${cY - cFontSize * 0.4}px` }}
        >
          C
        </motion.text>

        {/* Layer 3: "ORE" inside the C */}
        <motion.text
          x={oreX}
          y={oreY}
          className="logo-text"
          fontSize={oreFontSize}
          fontWeight="900"
          fill={textColor}
          letterSpacing={size * 0.01}
          initial={animate ? { opacity: 0, scale: 0 } : {}}
          animate={animate ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          style={{ transformOrigin: `${oreX + oreFontSize}px ${oreY - oreFontSize * 0.3}px` }}
        >
          ORE
        </motion.text>

        {/* Layer 4: Ripple effect on "O" (background) */}
        {animate && (
          <>
            <motion.circle
              cx={dropEndX}
              cy={dropEndY}
              r={size * 0.12}
              fill="url(#rippleGradient)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2, opacity: [0, 0.8, 0] }}
              transition={{ duration: 1, delay: 2, ease: "easeOut" }}
            />
            <motion.circle
              cx={dropEndX}
              cy={dropEndY}
              r={size * 0.08}
              fill="none"
              stroke={accentColor}
              strokeWidth={size * 0.01}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2.5, opacity: [0, 0.6, 0] }}
              transition={{ duration: 1.2, delay: 2, ease: "easeOut" }}
            />
          </>
        )}

        {/* Layer 5: Water drop animation */}
        {animate && (
          <motion.g>
            {/* Drop shape */}
            <motion.ellipse
              cx={dropStartX}
              cy={dropStartY}
              rx={dropSize * 0.6}
              ry={dropSize}
              fill={accentColor}
              initial={{ y: dropStartY, opacity: 0 }}
              animate={{
                y: [dropStartY, dropEndY],
                x: [dropStartX, dropEndX],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 0.8,
                delay: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94], // Gravity-like easing
              }}
            />

            {/* Drop highlight */}
            <motion.ellipse
              cx={dropStartX - dropSize * 0.15}
              cy={dropStartY - dropSize * 0.2}
              rx={dropSize * 0.2}
              ry={dropSize * 0.3}
              fill="rgba(255, 255, 255, 0.4)"
              initial={{ y: dropStartY, opacity: 0 }}
              animate={{
                y: [dropStartY - dropSize * 0.2, dropEndY - dropSize * 0.2],
                x: [dropStartX - dropSize * 0.15, dropEndX - dropSize * 0.15],
                opacity: [0, 0.6, 0.6, 0],
              }}
              transition={{
                duration: 0.8,
                delay: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          </motion.g>
        )}
      </svg>

      {/* Subtle glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at 40% 50%, ${accentColor} 0%, transparent 60%)`,
          filter: "blur(20px)",
        }}
      />
    </motion.div>
  );
}

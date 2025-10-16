"use client";

import React from "react";
import { motion } from "framer-motion";

interface LogoTextProps {
  isAnimating: boolean;
  spiralPath: string;
  size?: number;
}

export default function LogoText({ isAnimating, spiralPath, size = 300 }: LogoTextProps) {
  const centerX = size / 2;
  const centerY = size / 2;

  // "Kitchen" text split for staggered animation
  const kitchenText = "Kitchen";
  const letters = kitchenText.split("");

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0"
    >
      <defs>
        {/* Define the spiral path for text to follow */}
        <path id="spiralTextPath" d={spiralPath} />

        {/* Define cursive font style */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@600&display=swap');

            .cursive-text {
              font-family: 'Great Vibes', cursive;
              font-size: 42px;
              letter-spacing: 2px;
              fill: #D4AF37;
            }

            .serif-text {
              font-family: 'Playfair Display', serif;
              font-size: 24px;
              font-weight: 600;
              letter-spacing: 4px;
              text-transform: uppercase;
              fill: #D4AF37;
            }
          `}
        </style>
      </defs>

      {/* "Kitchen" - Cursive text following spiral */}
      <text>
        <textPath
          href="#spiralTextPath"
          startOffset="15%"
          className="cursive-text"
        >
          {letters.map((letter, index) => (
            <motion.tspan
              key={index}
              initial={{ opacity: 0, fill: "rgba(212, 175, 55, 0)" }}
              animate={
                isAnimating
                  ? {
                      opacity: 1,
                      fill: "rgba(212, 175, 55, 1)",
                    }
                  : {}
              }
              transition={{
                duration: 0.3,
                delay: 1.2 + index * 0.1,
                ease: "easeOut",
              }}
            >
              {letter}
            </motion.tspan>
          ))}
        </textPath>
      </text>

      {/* Glow effect for cursive text */}
      <motion.text
        initial={{ opacity: 0 }}
        animate={{ opacity: isAnimating ? 0.4 : 0 }}
        transition={{ duration: 0.5, delay: 2 }}
        filter="url(#textGlow)"
      >
        <textPath
          href="#spiralTextPath"
          startOffset="15%"
          className="cursive-text"
          style={{ fill: "#34D399" }}
        >
          {kitchenText}
        </textPath>
      </motion.text>

      {/* "CORE" - Serif text at golden ratio center point */}
      <motion.text
        x={centerX}
        y={centerY + 6}
        textAnchor="middle"
        className="serif-text"
        initial={{ opacity: 0, scale: 0 }}
        animate={
          isAnimating
            ? {
                opacity: 1,
                scale: 1,
              }
            : {}
        }
        transition={{
          duration: 0.6,
          delay: 2.5,
          ease: [0.34, 1.56, 0.64, 1], // Spring easing
        }}
      >
        CORE
      </motion.text>

      {/* "CORE" glow effect */}
      <motion.text
        x={centerX}
        y={centerY + 6}
        textAnchor="middle"
        className="serif-text"
        style={{ fill: "#34D399" }}
        filter="url(#textGlow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: isAnimating ? 0.3 : 0 }}
        transition={{ duration: 0.5, delay: 2.8 }}
      >
        CORE
      </motion.text>

      {/* Decorative dot at spiral start */}
      <motion.circle
        cx={centerX + (size * 0.42) * Math.cos(0)}
        cy={centerY + (size * 0.42) * Math.sin(0)}
        r="2"
        fill="#D4AF37"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isAnimating ? 1 : 0,
          opacity: isAnimating ? 1 : 0,
        }}
        transition={{ duration: 0.3, delay: 2.2 }}
      />

      {/* Text glow filter */}
      <defs>
        <filter id="textGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

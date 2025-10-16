"use client";

import React from "react";
import { motion } from "framer-motion";

interface ClassicLogoProps {
  size?: number;
  autoAnimate?: boolean;
  showTagline?: boolean;
  className?: string;
}

export default function ClassicLogo({
  size = 200,
  autoAnimate = true,
  showTagline = true,
  className = "",
}: ClassicLogoProps) {
  const strokeWidth = size * 0.008;
  const fontSize = size * 0.08;
  const taglineSize = size * 0.035;
  const centerX = size / 2;
  const centerY = size / 2;

  // Hexagonal badge dimensions
  const hexRadius = size * 0.42;
  const innerHexRadius = size * 0.38;

  // Generate hexagon points
  const generateHexagon = (radius: number) => {
    const points: string[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  };

  // Generate gear teeth (12 teeth)
  const generateGear = () => {
    const innerRadius = size * 0.16;
    const outerRadius = size * 0.20;
    const teeth = 12;
    const points: string[] = [];

    for (let i = 0; i < teeth; i++) {
      const angle1 = (i / teeth) * Math.PI * 2;
      const angle2 = ((i + 0.4) / teeth) * Math.PI * 2;
      const angle3 = ((i + 0.6) / teeth) * Math.PI * 2;
      const angle4 = ((i + 1) / teeth) * Math.PI * 2;

      // Outer tooth
      const x1 = centerX + outerRadius * Math.cos(angle1);
      const y1 = centerY + outerRadius * Math.sin(angle1);
      const x2 = centerX + outerRadius * Math.cos(angle2);
      const y2 = centerY + outerRadius * Math.sin(angle2);

      // Inner gap
      const x3 = centerX + innerRadius * Math.cos(angle3);
      const y3 = centerY + innerRadius * Math.sin(angle3);
      const x4 = centerX + innerRadius * Math.cos(angle4);
      const y4 = centerY + innerRadius * Math.sin(angle4);

      if (i === 0) points.push(`M ${x1} ${y1}`);
      points.push(`L ${x2} ${y2}`);
      points.push(`L ${x3} ${y3}`);
      points.push(`L ${x4} ${y4}`);
    }
    points.push("Z");
    return points.join(" ");
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={autoAnimate ? { opacity: 0, scale: 0.95 } : {}}
      animate={autoAnimate ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <defs>
        {/* Blueprint grid pattern */}
        <pattern
          id="blueprintGrid"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="rgba(30, 58, 138, 0.1)"
            strokeWidth="0.5"
          />
        </pattern>

        {/* Technical font style */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@600;700&family=Roboto:wght@700;900&display=swap');

            .logo-text-main {
              font-family: 'Roboto', 'Arial', sans-serif;
              font-weight: 900;
              letter-spacing: 0.15em;
              text-transform: uppercase;
            }

            .logo-text-tagline {
              font-family: 'Roboto Mono', 'Courier New', monospace;
              font-weight: 600;
              letter-spacing: 0.2em;
              text-transform: uppercase;
            }
          `}
        </style>
      </defs>

      {/* Background circle with blueprint grid */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r={hexRadius + size * 0.02}
        fill="url(#blueprintGrid)"
        initial={autoAnimate ? { opacity: 0 } : {}}
        animate={autoAnimate ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      />

      {/* Outer hexagon border */}
      <motion.polygon
        points={generateHexagon(hexRadius)}
        fill="none"
        stroke="#1E3A8A"
        strokeWidth={strokeWidth * 2}
        initial={autoAnimate ? { pathLength: 0, opacity: 0 } : {}}
        animate={autoAnimate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
      />

      {/* Inner hexagon border */}
      <motion.polygon
        points={generateHexagon(innerHexRadius)}
        fill="none"
        stroke="#1E3A8A"
        strokeWidth={strokeWidth}
        initial={autoAnimate ? { pathLength: 0, opacity: 0 } : {}}
        animate={autoAnimate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
      />

      {/* Measurement marks on outer border (12 positions) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (Math.PI / 6) * i - Math.PI / 2;
        const x1 = centerX + hexRadius * Math.cos(angle);
        const y1 = centerY + hexRadius * Math.sin(angle);
        const x2 = centerX + (hexRadius - size * 0.02) * Math.cos(angle);
        const y2 = centerY + (hexRadius - size * 0.02) * Math.sin(angle);

        return (
          <motion.line
            key={`mark-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#1E3A8A"
            strokeWidth={strokeWidth}
            initial={autoAnimate ? { opacity: 0 } : {}}
            animate={autoAnimate ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.6 + i * 0.03 }}
          />
        );
      })}

      {/* Central gear icon */}
      <motion.path
        d={generateGear()}
        fill="none"
        stroke="#475569"
        strokeWidth={strokeWidth * 1.5}
        strokeLinejoin="miter"
        initial={autoAnimate ? { opacity: 0, rotate: -90 } : {}}
        animate={autoAnimate ? { opacity: 1, rotate: 0 } : {}}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: `${centerX}px ${centerY}px` }}
      />

      {/* Center circle of gear */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r={size * 0.08}
        fill="none"
        stroke="#475569"
        strokeWidth={strokeWidth * 1.5}
        initial={autoAnimate ? { opacity: 0, scale: 0 } : {}}
        animate={autoAnimate ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.2 }}
        style={{ transformOrigin: `${centerX}px ${centerY}px` }}
      />

      {/* "KITCHEN" text - top arc */}
      <motion.text
        initial={autoAnimate ? { opacity: 0 } : {}}
        animate={autoAnimate ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <textPath
          href="#topArc"
          startOffset="50%"
          textAnchor="middle"
          className="logo-text-main"
          fontSize={fontSize}
          fill="#1E3A8A"
        >
          KITCHEN
        </textPath>
      </motion.text>

      {/* "CORE" text - bottom arc */}
      <motion.text
        initial={autoAnimate ? { opacity: 0 } : {}}
        animate={autoAnimate ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        <textPath
          href="#bottomArc"
          startOffset="50%"
          textAnchor="middle"
          className="logo-text-main"
          fontSize={fontSize}
          fill="#1E3A8A"
        >
          CORE
        </textPath>
      </motion.text>

      {/* Tagline */}
      {showTagline && (
        <motion.text
          x={centerX}
          y={centerY + hexRadius - size * 0.08}
          textAnchor="middle"
          className="logo-text-tagline"
          fontSize={taglineSize}
          fill="#64748B"
          initial={autoAnimate ? { opacity: 0 } : {}}
          animate={autoAnimate ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          LUXURY KITCHENS
        </motion.text>
      )}

      {/* Hidden path definitions for text */}
      <defs>
        {/* Top arc path for "KITCHEN" */}
        <path
          id="topArc"
          d={`M ${centerX - size * 0.25} ${centerY - size * 0.12} A ${size * 0.3} ${size * 0.3} 0 0 1 ${centerX + size * 0.25} ${centerY - size * 0.12}`}
          fill="none"
        />

        {/* Bottom arc path for "CORE" */}
        <path
          id="bottomArc"
          d={`M ${centerX - size * 0.18} ${centerY + size * 0.14} A ${size * 0.25} ${size * 0.25} 0 0 1 ${centerX + size * 0.18} ${centerY + size * 0.14}`}
          fill="none"
        />
      </defs>

      {/* Corner construction marks (technical detail) */}
      {[
        { x: size * 0.05, y: size * 0.05 },
        { x: size * 0.95, y: size * 0.05 },
        { x: size * 0.05, y: size * 0.95 },
        { x: size * 0.95, y: size * 0.95 },
      ].map((corner, i) => (
        <motion.g
          key={`corner-${i}`}
          initial={autoAnimate ? { opacity: 0 } : {}}
          animate={autoAnimate ? { opacity: 0.4 } : { opacity: 0.4 }}
          transition={{ duration: 0.4, delay: 2 + i * 0.1 }}
        >
          <line
            x1={corner.x}
            y1={corner.y}
            x2={corner.x + (corner.x < size / 2 ? size * 0.02 : -size * 0.02)}
            y2={corner.y}
            stroke="#94A3B8"
            strokeWidth={strokeWidth * 0.5}
          />
          <line
            x1={corner.x}
            y1={corner.y}
            x2={corner.x}
            y2={corner.y + (corner.y < size / 2 ? size * 0.02 : -size * 0.02)}
            stroke="#94A3B8"
            strokeWidth={strokeWidth * 0.5}
          />
        </motion.g>
      ))}
    </motion.svg>
  );
}

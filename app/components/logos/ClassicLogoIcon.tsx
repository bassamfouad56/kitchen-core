"use client";

import React from "react";
import { motion } from "framer-motion";

interface ClassicLogoIconProps {
  size?: number;
  isAnimating?: boolean;
  className?: string;
}

export default function ClassicLogoIcon({
  size = 48,
  isAnimating = false,
  className = "",
}: ClassicLogoIconProps) {
  const strokeWidth = size * 0.01;
  const centerX = size / 2;
  const centerY = size / 2;
  const hexRadius = size * 0.42;

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

  // Generate simplified gear (8 teeth)
  const generateGear = () => {
    const innerRadius = size * 0.18;
    const outerRadius = size * 0.24;
    const teeth = 8;
    const points: string[] = [];

    for (let i = 0; i < teeth; i++) {
      const angle1 = (i / teeth) * Math.PI * 2;
      const angle2 = ((i + 0.4) / teeth) * Math.PI * 2;
      const angle3 = ((i + 0.6) / teeth) * Math.PI * 2;
      const angle4 = ((i + 1) / teeth) * Math.PI * 2;

      const x1 = centerX + outerRadius * Math.cos(angle1);
      const y1 = centerY + outerRadius * Math.sin(angle1);
      const x2 = centerX + outerRadius * Math.cos(angle2);
      const y2 = centerY + outerRadius * Math.sin(angle2);
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
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer hexagon */}
      <motion.polygon
        points={generateHexagon(hexRadius)}
        fill="none"
        stroke="#1E3A8A"
        strokeWidth={strokeWidth * 2.5}
        initial={isAnimating ? { pathLength: 0, opacity: 0 } : {}}
        animate={isAnimating ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Inner hexagon */}
      <motion.polygon
        points={generateHexagon(hexRadius * 0.88)}
        fill="none"
        stroke="#1E3A8A"
        strokeWidth={strokeWidth}
        initial={isAnimating ? { pathLength: 0, opacity: 0 } : {}}
        animate={isAnimating ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
      />

      {/* Central gear */}
      <motion.path
        d={generateGear()}
        fill="none"
        stroke="#475569"
        strokeWidth={strokeWidth * 1.8}
        strokeLinejoin="miter"
        initial={isAnimating ? { opacity: 0, rotate: -90 } : {}}
        animate={isAnimating ? { opacity: 1, rotate: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        style={{ transformOrigin: `${centerX}px ${centerY}px` }}
      />

      {/* Center circle */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r={size * 0.10}
        fill="none"
        stroke="#475569"
        strokeWidth={strokeWidth * 1.8}
        initial={isAnimating ? { opacity: 0, scale: 0 } : {}}
        animate={isAnimating ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.8 }}
        style={{ transformOrigin: `${centerX}px ${centerY}px` }}
      />

      {/* "KC" monogram in center */}
      <motion.text
        x={centerX}
        y={centerY + size * 0.06}
        textAnchor="middle"
        fontFamily="Roboto, Arial, sans-serif"
        fontWeight="900"
        fontSize={size * 0.18}
        fill="#1E3A8A"
        letterSpacing="-0.02em"
        initial={isAnimating ? { opacity: 0 } : {}}
        animate={isAnimating ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1 }}
      >
        KC
      </motion.text>
    </svg>
  );
}

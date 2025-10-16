"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LogoSpiral from "./LogoSpiral";
import LogoText from "./LogoText";
import WatercolorEffect from "./WatercolorEffect";
import ParticleSystem from "./ParticleSystem";

interface KitchenCoreLogoProps {
  size?: number;
  autoAnimate?: boolean;
  className?: string;
}

export default function KitchenCoreLogo({
  size = 300,
  autoAnimate = true,
  className = "",
}: KitchenCoreLogoProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [spiralPath, setSpiralPath] = useState("");

  // Generate spiral path (same algorithm from LogoSpiral)
  useEffect(() => {
    const generateGoldenSpiralPath = () => {
      const phi = 1.618033988749895;
      const turns = 2.5;
      const points: string[] = [];
      const centerX = size / 2;
      const centerY = size / 2;
      const maxRadius = size * 0.42;

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

    setSpiralPath(generateGoldenSpiralPath());
  }, [size]);

  // Auto-animate on mount
  useEffect(() => {
    if (autoAnimate) {
      // Small delay to ensure components are mounted
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoAnimate]);

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => !autoAnimate && setIsAnimating(true)}
      onHoverEnd={() => !autoAnimate && setIsAnimating(false)}
    >
      {/* Layer 1: Watercolor Background Effect */}
      <WatercolorEffect isAnimating={isAnimating} size={size} />

      {/* Layer 2: Golden Spiral Path */}
      <LogoSpiral isAnimating={isAnimating} size={size} />

      {/* Layer 3: Text (Kitchen + Core) */}
      <LogoText
        isAnimating={isAnimating}
        spiralPath={spiralPath}
        size={size}
      />

      {/* Layer 4: Particle System */}
      <ParticleSystem isAnimating={isAnimating} size={size} particleCount={18} />

      {/* Ambient glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isAnimating ? 0.15 : 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </motion.div>
  );
}

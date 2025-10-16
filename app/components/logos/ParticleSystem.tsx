"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface ParticleSystemProps {
  isAnimating: boolean;
  size?: number;
  particleCount?: number;
}

interface Particle {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export default function ParticleSystem({
  isAnimating,
  size = 300,
  particleCount = 18,
}: ParticleSystemProps) {
  const centerX = size / 2;
  const centerY = size / 2;

  // Generate particles with deterministic randomness
  const particles: Particle[] = useMemo(() => {
    const random = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: particleCount }, (_, i) => {
      // Spiral outward pattern
      const angle = (i / particleCount) * Math.PI * 2 + random(i) * Math.PI * 0.3;
      const startDistance = 5 + random(i + 100) * 15;
      const endDistance = 80 + random(i + 200) * 60;

      return {
        id: i,
        startX: centerX + Math.cos(angle) * startDistance,
        startY: centerY + Math.sin(angle) * startDistance,
        endX: centerX + Math.cos(angle) * endDistance,
        endY: centerY + Math.sin(angle) * endDistance,
        size: 1.5 + random(i + 300) * 2.5,
        delay: 2 + random(i + 400) * 1.5,
        duration: 2 + random(i + 500) * 1.5,
        opacity: 0.4 + random(i + 600) * 0.4,
      };
    });
  }, [particleCount, centerX, centerY]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 pointer-events-none"
    >
      <defs>
        {/* Shimmer gradient for particles */}
        <radialGradient id="particleGradient">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="1" />
          <stop offset="50%" stopColor="#FFD700" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>

        {/* Glow filter for particles */}
        <filter id="particleGlow" x="-200%" y="-200%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Render particles */}
      {particles.map((particle) => (
        <motion.circle
          key={particle.id}
          cx={particle.startX}
          cy={particle.startY}
          r={particle.size}
          fill="url(#particleGradient)"
          filter="url(#particleGlow)"
          initial={{
            cx: particle.startX,
            cy: particle.startY,
            opacity: 0,
            scale: 0,
          }}
          animate={
            isAnimating
              ? {
                  cx: particle.endX,
                  cy: particle.endY,
                  opacity: [0, particle.opacity, particle.opacity, 0],
                  scale: [0, 1.2, 1, 0.8],
                }
              : {}
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeOut",
            opacity: {
              times: [0, 0.2, 0.8, 1],
            },
            scale: {
              times: [0, 0.3, 0.7, 1],
            },
          }}
        />
      ))}

      {/* Additional twinkling particles (static, just fade in/out) */}
      {particles.slice(0, 8).map((particle, i) => (
        <motion.circle
          key={`twinkle-${i}`}
          cx={particle.endX}
          cy={particle.endY}
          r={particle.size * 0.6}
          fill="#D4AF37"
          filter="url(#particleGlow)"
          initial={{ opacity: 0 }}
          animate={
            isAnimating
              ? {
                  opacity: [0, 0.6, 0.3, 0.6, 0.2],
                }
              : {}
          }
          transition={{
            duration: 3,
            delay: particle.delay + particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </svg>
  );
}

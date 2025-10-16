"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface WatercolorEffectProps {
  isAnimating: boolean;
  size?: number;
}

export default function WatercolorEffect({ isAnimating, size = 300 }: WatercolorEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isAnimating || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas resolution
    canvas.width = size;
    canvas.height = size;

    // Generate watercolor effect
    const centerX = size / 2;
    const centerY = size / 2;

    // Create multiple overlapping soft circles for watercolor effect
    const drawWatercolorBlob = (
      x: number,
      y: number,
      radius: number,
      color: string,
      opacity: number
    ) => {
      // Create radial gradient for soft edges
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color.replace(")", `, ${opacity})`).replace("rgb", "rgba"));
      gradient.addColorStop(0.5, color.replace(")", `, ${opacity * 0.4})`).replace("rgb", "rgba"));
      gradient.addColorStop(1, color.replace(")", `, 0)`).replace("rgb", "rgba"));

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Layer multiple watercolor blobs with varying colors and sizes
    const colors = [
      "rgb(5, 150, 105)", // green-primary
      "rgb(52, 211, 153)", // green-vibrant
      "rgb(212, 175, 55)", // gold
      "rgb(16, 185, 129)", // emerald
    ];

    // Randomized watercolor splashes
    const random = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < 25; i++) {
      const angle = (i / 25) * Math.PI * 2;
      const distance = 50 + random(i) * 80;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      const radius = 30 + random(i + 100) * 50;
      const colorIndex = Math.floor(random(i + 200) * colors.length);
      const opacity = 0.08 + random(i + 300) * 0.12;

      drawWatercolorBlob(x, y, radius, colors[colorIndex], opacity);
    }

    // Add central soft glow
    drawWatercolorBlob(centerX, centerY, size * 0.3, colors[2], 0.15); // Gold center
    drawWatercolorBlob(centerX, centerY, size * 0.5, colors[1], 0.08); // Green outer

  }, [isAnimating, size]);

  return (
    <motion.canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isAnimating ? 1 : 0 }}
      transition={{ duration: 1.5, delay: 0.3 }}
      style={{
        filter: "blur(2px)",
        mixBlendMode: "multiply",
      }}
    />
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";

interface SimpleLogoProps {
  size?: number;
  variant?: "light" | "dark"; // light = white text, dark = black text
  showAccent?: boolean;
  className?: string;
}

export default function SimpleLogo({
  size = 70,
  variant = "light",
  showAccent = true,
  className = "",
}: SimpleLogoProps) {
  const fontSize = size * 0.28;
  const accentHeight = size * 0.02;
  const letterSpacing = size * 0.015;

  const textColor = variant === "light" ? "#FFFFFF" : "#000000";
  const accentColor = "#34D399"; // green-vibrant

  return (
    <motion.div
      className={`inline-flex flex-col items-center gap-1 ${className}`}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ height: size }}
    >
      {/* Main Text */}
      <div className="flex items-center gap-2">
        <motion.span
          style={{
            fontFamily: "'Montserrat', 'Poppins', sans-serif",
            fontSize: `${fontSize}px`,
            fontWeight: 600,
            letterSpacing: `${letterSpacing}px`,
            color: textColor,
            lineHeight: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          KITCHEN
        </motion.span>

        {/* Green dot separator */}
        {showAccent && (
          <motion.div
            style={{
              width: fontSize * 0.15,
              height: fontSize * 0.15,
              borderRadius: "50%",
              backgroundColor: accentColor,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          />
        )}

        <motion.span
          style={{
            fontFamily: "'Montserrat', 'Poppins', sans-serif",
            fontSize: `${fontSize}px`,
            fontWeight: 600,
            letterSpacing: `${letterSpacing}px`,
            color: textColor,
            lineHeight: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          CORE
        </motion.span>
      </div>

      {/* Accent line underneath */}
      {showAccent && (
        <motion.div
          style={{
            width: "100%",
            height: `${accentHeight}px`,
            backgroundColor: accentColor,
            borderRadius: `${accentHeight}px`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        />
      )}

      {/* Import Montserrat font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&display=swap');
      `}</style>
    </motion.div>
  );
}

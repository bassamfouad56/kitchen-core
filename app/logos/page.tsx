"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  variant?: "light" | "dark";
}

// Generate 100 unique logo designs
const generateLogos = (size: number = 80, variant: "light" | "dark" = "light") => {
  const textColor = variant === "light" ? "#FFFFFF" : "#000000";
  const accentColor = "#34D399";

  return [
    // WORDMARKS (1-10)
    { id: 1, name: "Bold Horizontal", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor, letterSpacing: '0.1em' }}>KITCHEN CORE</div> },
    { id: 2, name: "Elegant Serif", render: () => <div style={{ fontFamily: 'Playfair Display', fontWeight: 600, fontSize: size * 0.22, color: textColor }}>Kitchen Core</div> },
    { id: 3, name: "Pipe Separator", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor }}>KITCHEN <span style={{ color: accentColor }}>|</span> CORE</div> },
    { id: 4, name: "Dot Separator", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor }}>KITCHEN <span style={{ color: accentColor }}>•</span> CORE</div> },
    { id: 5, name: "Slash Separator", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor }}>KITCHEN <span style={{ color: accentColor }}>/</span> CORE</div> },
    { id: 6, name: "Underscore Tech", render: () => <div style={{ fontFamily: 'Roboto Mono', fontWeight: 600, fontSize: size * 0.18, color: textColor }}>KITCHEN_CORE</div> },
    { id: 7, name: "Lowercase Modern", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: size * 0.22, color: textColor }}>kitchen core</div> },
    { id: 8, name: "Stacked Vertical", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: textColor, textAlign: 'center', lineHeight: 1 }}>KITCHEN<br/>CORE</div> },
    { id: 9, name: "Ultra Spaced", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: size * 0.15, color: textColor, letterSpacing: '0.4em' }}>K I T C H E N  C O R E</div> },
    { id: 10, name: "Camel Case", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.24, color: textColor }}>KitchenCore</div> },

    // MONOGRAMS (11-20)
    { id: 11, name: "KC Bold", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: textColor, letterSpacing: '-0.05em' }}>KC</div> },
    { id: 12, name: "K Single", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.7, color: textColor }}>K</div> },
    { id: 13, name: "K in Circle", render: () => <div style={{ width: size * 0.6, height: size * 0.6, border: `3px solid ${textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, color: textColor }}>K</div> },
    { id: 14, name: "KC Overlapped", render: () => <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: textColor }}><span>K</span><span style={{ marginLeft: '-0.2em', color: accentColor }}>C</span></div> },
    { id: 15, name: "K+C Plus", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.4, color: textColor }}>K<span style={{ color: accentColor }}>+</span>C</div> },
    { id: 16, name: "KC Script", render: () => <div style={{ fontFamily: 'Great Vibes', fontSize: size * 0.5, color: textColor }}>KC</div> },
    { id: 17, name: "[K] Bracketed", render: () => <div style={{ fontFamily: 'Roboto Mono', fontWeight: 700, fontSize: size * 0.4, color: textColor }}>[K]</div> },
    { id: 18, name: "{KC} Curly", render: () => <div style={{ fontFamily: 'Roboto Mono', fontWeight: 700, fontSize: size * 0.35, color: textColor }}>{'{KC}'}</div> },
    { id: 19, name: "KC Stacked", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.35, color: textColor, textAlign: 'center', lineHeight: 0.9 }}>K<br/>C</div> },
    { id: 20, name: "K.C. Dots", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.4, color: textColor }}>K<span style={{ color: accentColor }}>.</span>C<span style={{ color: accentColor }}>.</span></div> },

    // GEOMETRIC (21-30)
    { id: 21, name: "Square Frame", render: () => <div style={{ width: size * 0.7, height: size * 0.7, border: `3px solid ${textColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: textColor }}>KITCHEN<br/>CORE</div> },
    { id: 22, name: "Circle Badge", render: () => <div style={{ width: size * 0.7, height: size * 0.7, border: `3px solid ${accentColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KITCHEN<br/>CORE</div> },
    { id: 23, name: "Hexagon", render: () => <div style={{ width: size * 0.6, height: size * 0.6, clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.15, color: '#000' }}>KC</div> },
    { id: 24, name: "Diamond Shape", render: () => <div style={{ width: size * 0.5, height: size * 0.5, transform: 'rotate(45deg)', border: `3px solid ${textColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ transform: 'rotate(-45deg)', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}>KC</div></div> },
    { id: 25, name: "Triangle Top", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: 0, height: 0, borderLeft: `${size * 0.25}px solid transparent`, borderRight: `${size * 0.25}px solid transparent`, borderBottom: `${size * 0.25}px solid ${accentColor}` }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.18, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 26, name: "Rounded Square", render: () => <div style={{ width: size * 0.7, height: size * 0.7, border: `3px solid ${textColor}`, borderRadius: size * 0.15, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.25, color: textColor }}>KC</div> },
    { id: 27, name: "Octagon", render: () => <div style={{ width: size * 0.6, height: size * 0.6, clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', background: textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: '#000' }}>K</div> },
    { id: 28, name: "Double Frame", render: () => <div style={{ width: size * 0.7, height: size * 0.7, border: `2px solid ${textColor}`, padding: size * 0.05 }}><div style={{ width: '100%', height: '100%', border: `2px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KC</div></div> },
    { id: 29, name: "Pentagon", render: () => <div style={{ width: size * 0.6, height: size * 0.6, clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: '#000' }}>K</div> },
    { id: 30, name: "Capsule", render: () => <div style={{ padding: `${size * 0.15}px ${size * 0.25}px`, border: `3px solid ${textColor}`, borderRadius: size * 0.4, fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}>KC</div> },

    // ABSTRACT SHAPES (31-40)
    { id: 31, name: "Spiral Circle", render: () => <div style={{ position: 'relative', width: size * 0.7, height: size * 0.7, border: `3px solid ${textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: textColor }}>KC</div> },
    { id: 32, name: "Wave Pattern", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ width: size * 0.8, height: size * 0.15, borderTop: `3px solid ${accentColor}`, borderRadius: '50% 50% 0 0' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.16, color: textColor, marginTop: size * 0.05 }}>KITCHEN CORE</div></div> },
    { id: 33, name: "Dots Array", render: () => <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: size * 0.08 }}>{Array.from({length: 9}, (_, i) => <div key={i} style={{ width: size * 0.12, height: size * 0.12, background: i === 4 ? accentColor : textColor, borderRadius: '50%' }}></div>)}</div> },
    { id: 34, name: "Lines Converging", render: () => <div style={{ position: 'relative', width: size * 0.7, height: size * 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ position: 'absolute', width: '100%', height: 2, background: textColor, transform: 'rotate(45deg)' }}></div><div style={{ position: 'absolute', width: '100%', height: 2, background: textColor, transform: 'rotate(-45deg)' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.25, color: textColor, zIndex: 1 }}>KC</div></div> },
    { id: 35, name: "Swoosh", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}><div style={{ width: size * 0.7, height: size * 0.2, borderBottom: `4px solid ${accentColor}`, borderRadius: '0 0 50% 0' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 36, name: "Arc Over", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.6, height: size * 0.3, borderTop: `3px solid ${accentColor}`, borderRadius: '100% 100% 0 0' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 37, name: "Dual Circles", render: () => <div style={{ position: 'relative', width: size * 0.8, height: size * 0.5 }}><div style={{ position: 'absolute', left: 0, width: size * 0.4, height: size * 0.4, border: `3px solid ${textColor}`, borderRadius: '50%' }}></div><div style={{ position: 'absolute', right: 0, width: size * 0.4, height: size * 0.4, border: `3px solid ${accentColor}`, borderRadius: '50%' }}></div><div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}>KC</div></div> },
    { id: 38, name: "Zigzag", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><svg width={size * 0.8} height={size * 0.15}><polyline points={`0,${size*0.15} ${size*0.2},0 ${size*0.4},${size*0.15} ${size*0.6},0 ${size*0.8},${size*0.15}`} fill="none" stroke={accentColor} strokeWidth="3"/></svg><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 39, name: "Star Burst", render: () => <div style={{ position: 'relative', width: size * 0.7, height: size * 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Array.from({length: 8}, (_, i) => <div key={i} style={{ position: 'absolute', width: 2, height: size * 0.25, background: accentColor, transform: `rotate(${i * 45}deg)`, transformOrigin: 'center' }}></div>)}<div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.25, color: textColor, zIndex: 1 }}>KC</div></div> },
    { id: 40, name: "Infinity Loop", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.3, color: textColor }}>∞ <span style={{ fontSize: size * 0.2 }}>KC</span></div> },

    // KITCHEN ICONS (41-50)
    { id: 41, name: "Chef Hat", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.4, height: size * 0.3, background: textColor, borderRadius: '50% 50% 0 0', position: 'relative' }}><div style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: size * 0.08, background: textColor, borderRadius: 0 }}></div></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 42, name: "Fork & Knife", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ fontSize: size * 0.4, color: accentColor }}>🍴</div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 43, name: "Spoon", render: () => <div style={{ display: 'flex', gap: size * 0.1, alignItems: 'center' }}><div style={{ width: size * 0.15, height: size * 0.4, background: accentColor, borderRadius: '50% 50% 50% 50%' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KC</div></div> },
    { id: 44, name: "Pot", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.5, height: size * 0.35, border: `3px solid ${textColor}`, borderRadius: '0 0 20% 20%', position: 'relative' }}><div style={{ position: 'absolute', top: -8, left: -8, width: size * 0.12, height: 8, background: textColor, borderRadius: 4 }}></div><div style={{ position: 'absolute', top: -8, right: -8, width: size * 0.12, height: 8, background: textColor, borderRadius: 4 }}></div></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div> },
    { id: 45, name: "Stove Burner", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: size * 0.08 }}>{Array.from({length: 4}, (_, i) => <div key={i} style={{ width: size * 0.18, height: size * 0.18, border: `3px solid ${accentColor}`, borderRadius: '50%' }}></div>)}</div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div> },
    { id: 46, name: "Cutting Board", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.5, height: size * 0.35, background: textColor, borderRadius: 8, position: 'relative' }}><div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 3, background: accentColor }}></div></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div> },
    { id: 47, name: "Whisk", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ position: 'relative', width: size * 0.3, height: size * 0.4 }}><div style={{ position: 'absolute', bottom: 0, left: '50%', width: 3, height: '60%', background: textColor, transform: 'translateX(-50%)' }}></div><div style={{ position: 'absolute', top: 0, left: '50%', width: size * 0.25, height: size * 0.25, border: `3px solid ${accentColor}`, borderRadius: '50% 50% 40% 40%', transform: 'translateX(-50%)' }}></div></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div> },
    { id: 48, name: "Plate", render: () => <div style={{ width: size * 0.6, height: size * 0.6, border: `3px solid ${textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}><div style={{ width: size * 0.35, height: size * 0.35, border: `2px solid ${accentColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KC</div></div> },
    { id: 49, name: "Oven", render: () => <div style={{ width: size * 0.6, height: size * 0.6, border: `3px solid ${textColor}`, borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.4, height: size * 0.25, border: `2px solid ${accentColor}`, borderRadius: 2 }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.1, color: textColor }}>KC</div></div> },
    { id: 50, name: "Measuring Cup", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.35, height: size * 0.4, border: `3px solid ${textColor}`, borderRadius: '0 0 10% 10%', position: 'relative' }}><div style={{ position: 'absolute', top: '33%', left: 0, right: 0, height: 2, background: accentColor }}></div><div style={{ position: 'absolute', top: '66%', left: 0, right: 0, height: 2, background: accentColor }}></div></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div> },

    // LETTER PLAY (51-60)
    { id: 51, name: "K inside C", render: () => <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.6, color: textColor }}><span style={{ color: accentColor }}>C</span><span style={{ position: 'absolute', left: '40%', top: '50%', transform: 'translate(-50%, -50%)', fontSize: size * 0.35, color: textColor }}>K</span></div> },
    { id: 52, name: "Mirrored KC", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, color: textColor }}>KC<span style={{ display: 'inline-block', transform: 'scaleX(-1)', color: accentColor, marginLeft: size * 0.05 }}>CK</span></div> },
    { id: 53, name: "3D Letters", render: () => <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: textColor }}><span style={{ position: 'absolute', left: 3, top: 3, color: accentColor, zIndex: -1 }}>KC</span>KC</div> },
    { id: 54, name: "Outline K", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.6, color: 'transparent', WebkitTextStroke: `3px ${textColor}` }}>KC</div> },
    { id: 55, name: "Striped KC", render: () => <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: textColor, overflow: 'hidden' }}><span>KC</span><div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '33%', background: accentColor, opacity: 0.3 }}></div></div> },
    { id: 56, name: "Gradient KC", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, background: `linear-gradient(to right, ${textColor}, ${accentColor})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>KC</div> },
    { id: 57, name: "KC Connected", render: () => <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: textColor }}>K<div style={{ position: 'absolute', top: '50%', left: '40%', width: '20%', height: 3, background: accentColor }}></div>C</div> },
    { id: 58, name: "Negative Space K", render: () => <div style={{ width: size * 0.6, height: size * 0.6, background: textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: '#000' }}>K</div> },
    { id: 59, name: "KC Stencil", render: () => <div style={{ fontFamily: 'Arial Black', fontWeight: 900, fontSize: size * 0.5, color: textColor, letterSpacing: '0.1em' }}>KC</div> },
    { id: 60, name: "Rotated KC", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, color: textColor, transform: 'rotate(-10deg)' }}>KC</div> },

    // MINIMALIST (61-70)
    { id: 61, name: "Single Line", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ width: size * 0.6, height: 2, background: accentColor, marginBottom: size * 0.05 }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: size * 0.15, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 62, name: "Just K", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.8, color: textColor }}>K</div> },
    { id: 63, name: "Tiny Text", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: size * 0.12, color: textColor, letterSpacing: '0.2em' }}>KITCHEN CORE</div> },
    { id: 64, name: "K Dot", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: textColor }}>K<span style={{ color: accentColor, fontSize: size * 0.2 }}>•</span></div> },
    { id: 65, name: "Slash Design", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.4, color: textColor }}>K <span style={{ color: accentColor }}>/</span> C</div> },
    { id: 66, name: "Brackets Only", render: () => <div style={{ fontFamily: 'Roboto Mono', fontWeight: 500, fontSize: size * 0.15, color: textColor }}>[KITCHEN CORE]</div> },
    { id: 67, name: "Colon Separator", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: size * 0.18, color: textColor }}>KITCHEN <span style={{ color: accentColor }}>:</span> CORE</div> },
    { id: 68, name: "Ampersand", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.35, color: textColor }}>K <span style={{ color: accentColor }}>&</span> C</div> },
    { id: 69, name: "At Symbol", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.35, color: textColor }}>K<span style={{ color: accentColor }}>@</span>C</div> },
    { id: 70, name: "Asterisk", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.35, color: textColor }}>K<span style={{ color: accentColor }}>*</span>C</div> },

    // BADGE/EMBLEM (71-80)
    { id: 71, name: "Shield Badge", render: () => <div style={{ width: size * 0.5, height: size * 0.6, clipPath: 'polygon(50% 0%, 100% 0, 100% 70%, 50% 100%, 0 70%, 0 0)', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: '#000' }}>KC</div> },
    { id: 72, name: "Ribbon Banner", render: () => <div style={{ position: 'relative', padding: `${size * 0.1}px ${size * 0.2}px`, background: accentColor, fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: '#000' }}>KITCHEN CORE<div style={{ position: 'absolute', bottom: -10, left: size * 0.15, width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: `10px solid ${accentColor}` }}></div></div> },
    { id: 73, name: "Seal/Stamp", render: () => <div style={{ width: size * 0.7, height: size * 0.7, border: `4px double ${textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor, textAlign: 'center', lineHeight: 1 }}>KITCHEN<br/>CORE</div> },
    { id: 74, name: "Vintage Badge", render: () => <div style={{ width: size * 0.7, height: size * 0.7, border: `3px solid ${textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}><div style={{ width: size * 0.5, height: size * 0.5, border: `2px solid ${accentColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div> },
    { id: 75, name: "Award Ribbon", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ width: size * 0.5, height: size * 0.5, border: `3px solid ${accentColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: textColor }}>KC</div><div style={{ width: 0, height: 0, borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderTop: `20px solid ${accentColor}`, marginTop: -5 }}></div></div> },
    { id: 76, name: "Crest", render: () => <div style={{ width: size * 0.5, height: size * 0.6, clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)', border: `3px solid ${textColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}>KC</div> },
    { id: 77, name: "Star Badge", render: () => <div style={{ position: 'relative', width: size * 0.6, height: size * 0.6, clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: '#000' }}>KC</div> },
    { id: 78, name: "Crown Top", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ fontSize: size * 0.25, color: accentColor }}>👑</div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 79, name: "Laurel Wreath", render: () => <div style={{ position: 'relative', width: size * 0.7, height: size * 0.6 }}><div style={{ fontSize: size * 0.2, position: 'absolute', left: 0, transform: 'rotate(-30deg)' }}>🌿</div><div style={{ fontSize: size * 0.2, position: 'absolute', right: 0, transform: 'rotate(30deg) scaleX(-1)' }}>🌿</div><div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}>KC</div></div> },
    { id: 80, name: "Wax Seal", render: () => <div style={{ width: size * 0.7, height: size * 0.7, background: accentColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: `inset 0 0 20px rgba(0,0,0,0.3)` }}><div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: '#000' }}>KC</div></div> },

    // MODERN LUXURY (81-90)
    { id: 81, name: "Thin Lines", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 200, fontSize: size * 0.2, color: textColor, letterSpacing: '0.2em' }}>KITCHEN CORE</div> },
    { id: 82, name: "Gold Accent", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.18, color: textColor }}>KITCHEN CORE</div><div style={{ width: size * 0.4, height: 2, background: accentColor, marginTop: size * 0.05 }}></div></div> },
    { id: 83, name: "Marble Effect", render: () => <div style={{ padding: `${size * 0.15}px ${size * 0.2}px`, background: `linear-gradient(135deg, ${textColor} 0%, ${accentColor} 100%)`, fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: '#000' }}>KC</div> },
    { id: 84, name: "Art Deco", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.6, height: 3, background: textColor }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.18, color: textColor, letterSpacing: '0.15em' }}>KITCHEN CORE</div><div style={{ width: size * 0.6, height: 3, background: textColor }}></div></div> },
    { id: 85, name: "Minimalist Gold", render: () => <div style={{ width: size * 0.7, height: size * 0.7, border: `2px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 300, fontSize: size * 0.18, color: textColor }}>KC</div> },
    { id: 86, name: "Serif Luxury", render: () => <div style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: size * 0.22, color: textColor, letterSpacing: '0.05em' }}>KITCHEN CORE</div> },
    { id: 87, name: "Monogram Luxury", render: () => <div style={{ width: size * 0.6, height: size * 0.6, border: `3px solid ${textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display', fontWeight: 700, fontSize: size * 0.3, color: textColor }}>KC</div> },
    { id: 88, name: "Diamond Frame", render: () => <div style={{ width: size * 0.5, height: size * 0.5, border: `3px solid ${accentColor}`, transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ transform: 'rotate(-45deg)', fontFamily: 'Montserrat', fontWeight: 300, fontSize: size * 0.2, color: textColor }}>KC</div></div> },
    { id: 89, name: "Elegant Script", render: () => <div style={{ fontFamily: 'Great Vibes', fontSize: size * 0.35, color: textColor }}>Kitchen Core</div> },
    { id: 90, name: "Thin Frame", render: () => <div style={{ border: `1px solid ${textColor}`, padding: `${size * 0.15}px ${size * 0.2}px`, fontFamily: 'Montserrat', fontWeight: 300, fontSize: size * 0.15, color: textColor, letterSpacing: '0.15em' }}>KITCHEN CORE</div> },

    // CREATIVE CONCEPTS (91-100)
    { id: 91, name: "Kitchen Counter", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.7, height: size * 0.3, border: `3px solid ${textColor}`, borderRadius: '8px 8px 0 0', position: 'relative' }}><div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: accentColor }}></div></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div> },
    { id: 92, name: "House Shape", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ width: 0, height: 0, borderLeft: `${size * 0.3}px solid transparent`, borderRight: `${size * 0.3}px solid transparent`, borderBottom: `${size * 0.25}px solid ${accentColor}` }}></div><div style={{ width: size * 0.6, height: size * 0.3, border: `3px solid ${textColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KC</div></div> },
    { id: 93, name: "Door Frame", render: () => <div style={{ width: size * 0.5, height: size * 0.7, border: `3px solid ${textColor}`, borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}><div style={{ width: 8, height: 8, background: accentColor, borderRadius: '50%', position: 'absolute', right: size * 0.15, top: '50%' }}></div>KC</div> },
    { id: 94, name: "Window Frame", render: () => <div style={{ width: size * 0.6, height: size * 0.6, border: `3px solid ${textColor}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 3 }}>{Array.from({length: 4}, (_, i) => <div key={i} style={{ background: i === 1 || i === 2 ? accentColor : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.12, color: i === 1 || i === 2 ? '#000' : textColor }}>{i === 1 ? 'K' : i === 2 ? 'C' : ''}</div>)}</div> },
    { id: 95, name: "Smoke/Steam", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><svg width={size * 0.6} height={size * 0.3}><path d={`M 0,${size*0.3} Q ${size*0.15},${size*0.15} ${size*0.3},${size*0.25} Q ${size*0.45},${size*0.1} ${size*0.6},${size*0.2}`} fill="none" stroke={accentColor} strokeWidth="3"/></svg><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 96, name: "Fire Flame", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ fontSize: size * 0.35, color: accentColor }}>🔥</div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 97, name: "Drop Shadow", render: () => <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, color: textColor }}><div style={{ position: 'absolute', left: 5, top: 5, color: accentColor, opacity: 0.5, zIndex: -1 }}>KC</div>KC</div> },
    { id: 98, name: "Neon Sign", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.35, color: accentColor, textShadow: `0 0 10px ${accentColor}, 0 0 20px ${accentColor}` }}>KC</div> },
    { id: 99, name: "Blueprint Style", render: () => <div style={{ fontFamily: 'Roboto Mono', fontWeight: 600, fontSize: size * 0.15, color: textColor, border: `2px solid ${accentColor}`, padding: `${size * 0.1}px ${size * 0.15}px`, background: 'rgba(52, 211, 153, 0.05)' }}>KITCHEN_CORE</div> },
    { id: 100, name: "Handwritten", render: () => <div style={{ fontFamily: 'Great Vibes', fontSize: size * 0.4, color: textColor, transform: 'rotate(-5deg)' }}>Kitchen Core</div> },

    // TYPOGRAPHIC EXPERIMENTS (101-110)
    { id: 101, name: "Condensed Bold", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.25, color: textColor, letterSpacing: '-0.05em', transform: 'scaleX(0.8)' }}>KITCHEN CORE</div> },
    { id: 102, name: "Wide Expanded", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor, letterSpacing: '0.5em', transform: 'scaleX(1.3)' }}>KITCHEN CORE</div> },
    { id: 103, name: "Mixed Case", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.22, color: textColor }}>KiTcHeN <span style={{ color: accentColor }}>CoRe</span></div> },
    { id: 104, name: "Vertical Text", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: size * 0.12, color: textColor, writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '0.1em' }}>KITCHEN CORE</div> },
    { id: 105, name: "Italic Slant", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.22, color: textColor, fontStyle: 'italic' }}>Kitchen Core</div> },
    { id: 106, name: "Double Line", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.16, color: textColor, textAlign: 'center', lineHeight: 1.2 }}>KITCHEN<br/><span style={{ color: accentColor }}>―――</span><br/>CORE</div> },
    { id: 107, name: "Small Caps", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.18, color: textColor, fontVariant: 'small-caps' }}>Kitchen Core</div> },
    { id: 108, name: "Letter K Focus", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}><span style={{ fontSize: size * 0.35, color: accentColor }}>K</span>itchen Core</div> },
    { id: 109, name: "Underlined Text", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: size * 0.18, color: textColor, textDecoration: 'underline', textDecorationColor: accentColor, textDecorationThickness: '3px' }}>KITCHEN CORE</div> },
    { id: 110, name: "Split Color", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.22, color: textColor }}>KITC<span style={{ color: accentColor }}>HEN</span> CORE</div> },

    // SYMBOL INTEGRATION (111-120)
    { id: 111, name: "Arrow Right", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor, display: 'flex', alignItems: 'center', gap: size * 0.08 }}>KITCHEN<span style={{ color: accentColor, fontSize: size * 0.3 }}>→</span>CORE</div> },
    { id: 112, name: "Diamond Symbol", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor }}>KITCHEN <span style={{ color: accentColor }}>◆</span> CORE</div> },
    { id: 113, name: "Plus Grid", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.25, color: textColor }}><span style={{ color: accentColor }}>+</span> KC <span style={{ color: accentColor }}>+</span></div> },
    { id: 114, name: "Circle Symbol", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor }}>KITCHEN <span style={{ color: accentColor }}>○</span> CORE</div> },
    { id: 115, name: "Square Symbol", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor }}>KITCHEN <span style={{ color: accentColor }}>■</span> CORE</div> },
    { id: 116, name: "Heart Symbol", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.03 }}><div style={{ fontSize: size * 0.25, color: accentColor }}>♥</div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.14, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 117, name: "Star Symbol", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor }}>KITCHEN <span style={{ color: accentColor }}>★</span> CORE</div> },
    { id: 118, name: "Check Mark", render: () => <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.08 }}><span style={{ color: accentColor, fontSize: size * 0.3 }}>✓</span><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.18, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 119, name: "X Symbol", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.25, color: textColor }}>K <span style={{ color: accentColor }}>✕</span> C</div> },
    { id: 120, name: "Bullet Points", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: size * 0.16, color: textColor }}><span style={{ color: accentColor }}>•</span> KITCHEN <span style={{ color: accentColor }}>•</span> CORE <span style={{ color: accentColor }}>•</span></div> },

    // LAYERED DESIGNS (121-130)
    { id: 121, name: "Triple Shadow", render: () => <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.35, color: textColor }}><div style={{ position: 'absolute', left: 6, top: 6, color: accentColor, opacity: 0.3, zIndex: -2 }}>KC</div><div style={{ position: 'absolute', left: 3, top: 3, color: accentColor, opacity: 0.6, zIndex: -1 }}>KC</div>KC</div> },
    { id: 122, name: "Layered Text", render: () => <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.3, color: textColor, textAlign: 'center', lineHeight: 0.85 }}>KITCHEN<br/><span style={{ color: accentColor }}>KITCHEN</span><br/>CORE</div> },
    { id: 123, name: "Background Box", render: () => <div style={{ background: accentColor, padding: `${size * 0.1}px ${size * 0.15}px`, fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: '#000' }}>KITCHEN CORE</div> },
    { id: 124, name: "Half Filled", render: () => <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, color: textColor, overflow: 'hidden' }}><div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '50%', background: accentColor, opacity: 0.5 }}></div>KC</div> },
    { id: 125, name: "Border Around", render: () => <div style={{ border: `3px solid ${accentColor}`, padding: `${size * 0.12}px ${size * 0.18}px`, fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.16, color: textColor }}>KITCHEN CORE</div> },
    { id: 126, name: "Double Border", render: () => <div style={{ border: `2px solid ${textColor}`, padding: size * 0.05 }}><div style={{ border: `2px solid ${accentColor}`, padding: `${size * 0.08}px ${size * 0.12}px`, fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.13, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 127, name: "Corner Accent", render: () => <div style={{ position: 'relative', padding: `${size * 0.12}px ${size * 0.15}px`, fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.16, color: textColor }}><div style={{ position: 'absolute', top: 0, left: 0, width: size * 0.15, height: size * 0.15, borderTop: `3px solid ${accentColor}`, borderLeft: `3px solid ${accentColor}` }}></div><div style={{ position: 'absolute', bottom: 0, right: 0, width: size * 0.15, height: size * 0.15, borderBottom: `3px solid ${accentColor}`, borderRight: `3px solid ${accentColor}` }}></div>KC</div> },
    { id: 128, name: "Outlined Box", render: () => <div style={{ width: size * 0.75, height: size * 0.45, border: `3px solid ${textColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: textColor }}>KITCHEN CORE</div> },
    { id: 129, name: "Side Stripe", render: () => <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.08 }}><div style={{ width: 4, height: size * 0.5, background: accentColor }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.18, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 130, name: "Top Bar", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}><div style={{ width: '100%', height: 4, background: accentColor, marginBottom: size * 0.05 }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.16, color: textColor }}>KITCHEN CORE</div></div> },

    // CIRCULAR VARIATIONS (131-140)
    { id: 131, name: "Ring Text", render: () => <div style={{ width: size * 0.7, height: size * 0.7, border: `4px solid ${accentColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.13, color: textColor, textAlign: 'center', lineHeight: 1.1 }}>KITCHEN<br/>CORE</div> },
    { id: 132, name: "Half Circle", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ width: size * 0.6, height: size * 0.3, borderTop: `4px solid ${accentColor}`, borderLeft: `4px solid ${accentColor}`, borderRight: `4px solid ${accentColor}`, borderRadius: '100% 100% 0 0' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.14, color: textColor, marginTop: size * 0.05 }}>KC</div></div> },
    { id: 133, name: "Circle Cut", render: () => <div style={{ width: size * 0.7, height: size * 0.7, border: `3px solid ${textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}><div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: accentColor, opacity: 0.3 }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor, zIndex: 1 }}>KC</div></div> },
    { id: 134, name: "Three Circles", render: () => <div style={{ display: 'flex', gap: size * 0.05, alignItems: 'center' }}>{Array.from({length: 3}, (_, i) => <div key={i} style={{ width: size * 0.18, height: size * 0.18, border: `2px solid ${i === 1 ? accentColor : textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.12, color: textColor }}>{i === 1 ? 'KC' : ''}</div>)}</div> },
    { id: 135, name: "Orbital Rings", render: () => <div style={{ position: 'relative', width: size * 0.7, height: size * 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ position: 'absolute', width: '100%', height: '100%', border: `2px solid ${textColor}`, borderRadius: '50%', opacity: 0.5 }}></div><div style={{ position: 'absolute', width: '70%', height: '70%', border: `2px solid ${accentColor}`, borderRadius: '50%', opacity: 0.7 }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.22, color: textColor, zIndex: 1 }}>KC</div></div> },
    { id: 136, name: "Pac-Man Circle", render: () => <div style={{ width: size * 0.6, height: size * 0.6, background: accentColor, borderRadius: '50%', position: 'relative', clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div> },
    { id: 137, name: "Ringed KC", render: () => <div style={{ position: 'relative' }}><div style={{ width: size * 0.6, height: size * 0.6, border: `3px solid ${accentColor}`, borderRadius: '50%', position: 'absolute', left: -10, top: 0 }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, color: textColor, position: 'relative', zIndex: 1 }}>KC</div></div> },
    { id: 138, name: "Circle Stack", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.03 }}><div style={{ width: size * 0.25, height: size * 0.25, border: `2px solid ${accentColor}`, borderRadius: '50%' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.16, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 139, name: "Dotted Circle", render: () => <div style={{ width: size * 0.7, height: size * 0.7, border: `3px dotted ${accentColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}>KC</div> },
    { id: 140, name: "Dashed Circle", render: () => <div style={{ width: size * 0.7, height: size * 0.7, border: `3px dashed ${textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}>KC</div> },

    // ANGULAR SHAPES (141-150)
    { id: 141, name: "Chevron Up", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ fontSize: size * 0.3, color: accentColor }}>∧</div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.14, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 142, name: "Chevron Down", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.03 }}><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.14, color: textColor }}>KITCHEN CORE</div><div style={{ fontSize: size * 0.3, color: accentColor }}>∨</div></div> },
    { id: 143, name: "Angle Bracket", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor }}><span style={{ color: accentColor }}>{'<'}</span> KITCHEN CORE <span style={{ color: accentColor }}>{'>'}</span></div> },
    { id: 144, name: "Triangle Frame", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: 0, height: 0, borderLeft: `${size * 0.3}px solid transparent`, borderRight: `${size * 0.3}px solid transparent`, borderTop: `${size * 0.25}px solid ${accentColor}` }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div> },
    { id: 145, name: "Arrow Frame", render: () => <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.05 }}><span style={{ color: accentColor, fontSize: size * 0.25 }}>▶</span><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.16, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 146, name: "Zigzag Frame", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ fontSize: size * 0.2, color: accentColor }}>⚡</div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.14, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 147, name: "Sharp Corners", render: () => <div style={{ width: size * 0.7, height: size * 0.7, border: `3px solid ${textColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: textColor }}>KC</div> },
    { id: 148, name: "Trapezoid", render: () => <div style={{ width: size * 0.6, height: size * 0.5, clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: '#000' }}>KC</div> },
    { id: 149, name: "Parallelogram", render: () => <div style={{ width: size * 0.7, height: size * 0.45, background: textColor, transform: 'skewX(-15deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ transform: 'skewX(15deg)', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: '#000' }}>KC</div></div> },
    { id: 150, name: "Rhombus", render: () => <div style={{ width: size * 0.5, height: size * 0.5, transform: 'rotate(45deg)', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ transform: 'rotate(-45deg)', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: '#000' }}>KC</div></div> },

    // GRADIENT & COLOR (151-160)
    { id: 151, name: "Vertical Gradient", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, background: `linear-gradient(to bottom, ${textColor}, ${accentColor})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>KC</div> },
    { id: 152, name: "Diagonal Gradient", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, background: `linear-gradient(45deg, ${textColor}, ${accentColor})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>KC</div> },
    { id: 153, name: "Radial Gradient", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, background: `radial-gradient(circle, ${accentColor}, ${textColor})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>KC</div> },
    { id: 154, name: "Two Tone Split", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.35, color: textColor }}>KI<span style={{ color: accentColor }}>TC</span>HE<span style={{ color: accentColor }}>N</span></div> },
    { id: 155, name: "Rainbow Outline", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: 'transparent', WebkitTextStroke: `2px ${accentColor}` }}>KC</div> },
    { id: 156, name: "Glow Effect", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, color: textColor, textShadow: `0 0 15px ${accentColor}, 0 0 25px ${accentColor}, 0 0 35px ${accentColor}` }}>KC</div> },
    { id: 157, name: "Color Blocks", render: () => <div style={{ display: 'flex', gap: size * 0.05 }}><div style={{ background: textColor, padding: `${size * 0.08}px ${size * 0.12}px`, fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.15, color: '#000' }}>KIT</div><div style={{ background: accentColor, padding: `${size * 0.08}px ${size * 0.12}px`, fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.15, color: '#000' }}>CHEN</div></div> },
    { id: 158, name: "Alternating Colors", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.3, color: textColor }}>K<span style={{ color: accentColor }}>I</span>T<span style={{ color: accentColor }}>C</span>H<span style={{ color: accentColor }}>E</span>N</div> },
    { id: 159, name: "Inverted", render: () => <div style={{ background: textColor, padding: `${size * 0.1}px ${size * 0.15}px`, fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: '#000' }}>KITCHEN CORE</div> },
    { id: 160, name: "Highlight Effect", render: () => <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.3, color: textColor }}><div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%', background: accentColor, opacity: 0.4, zIndex: -1 }}></div>KC</div> },

    // TECH & MODERN (161-170)
    { id: 161, name: "Binary Code", render: () => <div style={{ fontFamily: 'Roboto Mono', fontWeight: 600, fontSize: size * 0.1, color: accentColor, lineHeight: 1.2 }}>01001011<br/>01000011</div> },
    { id: 162, name: "QR Style", render: () => <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>{Array.from({length: 16}, (_, i) => <div key={i} style={{ width: size * 0.12, height: size * 0.12, background: i % 3 === 0 ? accentColor : textColor }}></div>)}</div> },
    { id: 163, name: "Circuit Board", render: () => <div style={{ position: 'relative', width: size * 0.7, height: size * 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ position: 'absolute', width: '100%', height: 2, background: accentColor }}></div><div style={{ position: 'absolute', width: 2, height: '100%', background: accentColor }}></div><div style={{ width: size * 0.15, height: size * 0.15, background: textColor, borderRadius: '50%', position: 'absolute', top: 0, left: 0 }}></div><div style={{ width: size * 0.15, height: size * 0.15, background: textColor, borderRadius: '50%', position: 'absolute', bottom: 0, right: 0 }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor, zIndex: 1 }}>KC</div></div> },
    { id: 164, name: "Pixel Art", render: () => <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1 }}>{[1,0,1,0,1,0,1,1,1,0,1,1,0,1,1,0,1,1,1,0,1,0,1,0,1].map((v, i) => <div key={i} style={{ width: size * 0.08, height: size * 0.08, background: v ? textColor : 'transparent' }}></div>)}</div> },
    { id: 165, name: "Glitch Effect", render: () => <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.35, color: textColor }}><div style={{ position: 'absolute', left: -2, color: accentColor, opacity: 0.8, clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}>KC</div><div style={{ position: 'absolute', left: 2, color: accentColor, opacity: 0.8, clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}>KC</div>KC</div> },
    { id: 166, name: "Matrix Style", render: () => <div style={{ fontFamily: 'Roboto Mono', fontWeight: 700, fontSize: size * 0.2, color: accentColor, textShadow: `0 0 8px ${accentColor}` }}>KITCHEN_CORE</div> },
    { id: 167, name: "Terminal Text", render: () => <div style={{ fontFamily: 'Roboto Mono', fontWeight: 600, fontSize: size * 0.14, color: accentColor, background: '#000', padding: `${size * 0.08}px ${size * 0.12}px`, border: `1px solid ${accentColor}` }}>$ kitchen-core</div> },
    { id: 168, name: "Code Comment", render: () => <div style={{ fontFamily: 'Roboto Mono', fontWeight: 600, fontSize: size * 0.13, color: accentColor }}>{'// KITCHEN CORE'}</div> },
    { id: 169, name: "Hex Code", render: () => <div style={{ fontFamily: 'Roboto Mono', fontWeight: 700, fontSize: size * 0.14, color: textColor }}>#KC<span style={{ color: accentColor }}>0RE</span></div> },
    { id: 170, name: "Loading Bar", render: () => <div style={{ display: 'flex', flexDirection: 'column', gap: size * 0.05, alignItems: 'center' }}><div style={{ width: size * 0.7, height: size * 0.12, border: `2px solid ${textColor}`, position: 'relative' }}><div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '70%', background: accentColor }}></div></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div> },

    // ARTISTIC STYLES (171-180)
    { id: 171, name: "Brush Stroke", render: () => <div style={{ fontFamily: 'Great Vibes', fontSize: size * 0.4, color: textColor, textShadow: `2px 2px 4px ${accentColor}` }}>Kitchen Core</div> },
    { id: 172, name: "Watercolor", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.35, color: textColor, textShadow: `0 0 20px ${accentColor}, 2px 2px 10px ${accentColor}` }}>KC</div> },
    { id: 173, name: "Sketched", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: 'transparent', WebkitTextStroke: `2px ${textColor}`, filter: 'blur(0.3px)' }}>KC</div> },
    { id: 174, name: "Stamp Effect", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.3, color: textColor, opacity: 0.7, transform: 'rotate(-5deg)', border: `3px solid ${textColor}`, padding: `${size * 0.08}px ${size * 0.12}px` }}>KC</div> },
    { id: 175, name: "Spray Paint", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.35, color: textColor, textShadow: `2px 2px 8px ${accentColor}, -2px -2px 8px ${accentColor}`, filter: 'blur(0.5px)' }}>KC</div> },
    { id: 176, name: "Stencil Art", render: () => <div style={{ fontFamily: 'Arial Black', fontWeight: 900, fontSize: size * 0.45, color: textColor, letterSpacing: '0.08em' }}>KC</div> },
    { id: 177, name: "Calligraphy", render: () => <div style={{ fontFamily: 'Great Vibes', fontSize: size * 0.5, color: textColor, fontStyle: 'italic' }}>KC</div> },
    { id: 178, name: "Graffiti Style", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, color: textColor, textShadow: `3px 3px 0 ${accentColor}, 6px 6px 0 rgba(0,0,0,0.5)` }}>KC</div> },
    { id: 179, name: "Handmade", render: () => <div style={{ fontFamily: 'Great Vibes', fontSize: size * 0.35, color: textColor, transform: 'rotate(3deg)' }}>Kitchen Core</div> },
    { id: 180, name: "Chalk Board", render: () => <div style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: size * 0.25, color: textColor, textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>KITCHEN CORE</div> },

    // ARCHITECTURAL (181-190)
    { id: 181, name: "Column Design", render: () => <div style={{ display: 'flex', gap: size * 0.05, alignItems: 'flex-end' }}>{[0.8, 1, 0.8].map((h, i) => <div key={i} style={{ width: size * 0.15, height: size * h * 0.5, background: i === 1 ? accentColor : textColor }}></div>)}</div> },
    { id: 182, name: "Arch Shape", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ width: size * 0.5, height: size * 0.35, borderTop: `3px solid ${textColor}`, borderLeft: `3px solid ${textColor}`, borderRight: `3px solid ${textColor}`, borderRadius: '100% 100% 0 0' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor, marginTop: size * 0.05 }}>KC</div></div> },
    { id: 183, name: "Blueprint Grid", render: () => <div style={{ width: size * 0.7, height: size * 0.7, background: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`, backgroundSize: `${size * 0.14}px ${size * 0.14}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Roboto Mono', fontWeight: 700, fontSize: size * 0.18, color: textColor }}>KC</div> },
    { id: 184, name: "Foundation", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.25, color: textColor }}>KC</div><div style={{ width: size * 0.5, height: 4, background: accentColor, marginTop: size * 0.05 }}></div><div style={{ width: size * 0.6, height: 4, background: textColor, marginTop: 2 }}></div></div> },
    { id: 185, name: "Beam Structure", render: () => <div style={{ position: 'relative', width: size * 0.7, height: size * 0.6 }}><div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: textColor }}></div><div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: textColor }}></div><div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 3, background: accentColor }}></div><div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 3, background: accentColor }}></div><div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: textColor }}>KC</div></div> },
    { id: 186, name: "Corner Stone", render: () => <div style={{ position: 'relative', padding: `${size * 0.12}px ${size * 0.15}px`, fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.16, color: textColor }}><div style={{ position: 'absolute', top: -3, left: -3, width: size * 0.2, height: size * 0.2, border: `3px solid ${accentColor}`, borderRight: 'none', borderBottom: 'none' }}></div>KC</div> },
    { id: 187, name: "Floor Plan", render: () => <div style={{ width: size * 0.7, height: size * 0.7, border: `3px solid ${textColor}`, position: 'relative' }}><div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: accentColor }}></div><div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, background: accentColor }}></div><div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div> },
    { id: 188, name: "Skyline", render: () => <div style={{ display: 'flex', gap: size * 0.03, alignItems: 'flex-end' }}>{[0.4, 0.7, 0.5, 0.8, 0.6].map((h, i) => <div key={i} style={{ width: size * 0.1, height: size * h * 0.6, background: i === 3 ? accentColor : textColor }}></div>)}</div> },
    { id: 189, name: "Stairs", render: () => <div style={{ position: 'relative', width: size * 0.7, height: size * 0.5 }}>{[0, 1, 2, 3].map(i => <div key={i} style={{ position: 'absolute', left: i * size * 0.15, bottom: i * size * 0.1, width: size * 0.2, height: size * 0.15, border: `2px solid ${i === 2 ? accentColor : textColor}` }}></div>)}</div> },
    { id: 190, name: "Tiles Pattern", render: () => <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>{Array.from({length: 16}, (_, i) => <div key={i} style={{ width: size * 0.12, height: size * 0.12, background: (i + Math.floor(i / 4)) % 2 === 0 ? textColor : accentColor }}></div>)}</div> },

    // NATURE INSPIRED (191-200)
    { id: 191, name: "Leaf Accent", render: () => <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.08 }}><span style={{ fontSize: size * 0.25, color: accentColor }}>🍃</span><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.16, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 192, name: "Tree Branch", render: () => <div style={{ position: 'relative', width: size * 0.7, height: size * 0.6 }}><svg width={size * 0.7} height={size * 0.6}><line x1={size * 0.35} y1={size * 0.6} x2={size * 0.35} y2={size * 0.2} stroke={textColor} strokeWidth="3"/><line x1={size * 0.35} y1={size * 0.3} x2={size * 0.2} y2={size * 0.1} stroke={accentColor} strokeWidth="2"/><line x1={size * 0.35} y1={size * 0.3} x2={size * 0.5} y2={size * 0.1} stroke={accentColor} strokeWidth="2"/></svg><div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div> },
    { id: 193, name: "Flower Petals", render: () => <div style={{ position: 'relative', width: size * 0.6, height: size * 0.6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Array.from({length: 6}, (_, i) => <div key={i} style={{ position: 'absolute', width: size * 0.15, height: size * 0.3, background: accentColor, borderRadius: '50%', transform: `rotate(${i * 60}deg) translateY(-${size * 0.15}px)` }}></div>)}<div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor, zIndex: 1 }}>KC</div></div> },
    { id: 194, name: "Sun Rays", render: () => <div style={{ position: 'relative', width: size * 0.7, height: size * 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Array.from({length: 12}, (_, i) => <div key={i} style={{ position: 'absolute', width: 3, height: size * 0.2, background: accentColor, transform: `rotate(${i * 30}deg)`, transformOrigin: 'center', opacity: 0.6 }}></div>)}<div style={{ width: size * 0.35, height: size * 0.35, background: textColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.15, color: '#000', zIndex: 1 }}>KC</div></div> },
    { id: 195, name: "Wave Flow", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><svg width={size * 0.8} height={size * 0.2}><path d={`M 0,${size*0.15} Q ${size*0.2},${size*0.05} ${size*0.4},${size*0.15} T ${size*0.8},${size*0.15}`} fill="none" stroke={accentColor} strokeWidth="3"/></svg><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.14, color: textColor }}>KITCHEN CORE</div></div> },
    { id: 196, name: "Mountain Peak", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><svg width={size * 0.7} height={size * 0.3}><polygon points={`0,${size*0.3} ${size*0.25},${size*0.1} ${size*0.35},${size*0.3} ${size*0.45},${size*0.05} ${size*0.7},${size*0.3}`} fill={textColor}/></svg><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor, marginTop: size * 0.05 }}>KC</div></div> },
    { id: 197, name: "Droplet", render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.25, height: size * 0.35, background: accentColor, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div> },
    { id: 198, name: "Vine Wrap", render: () => <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.35, color: textColor }}><div style={{ position: 'absolute', top: -5, left: -5, fontSize: size * 0.15, color: accentColor }}>🌿</div><div style={{ position: 'absolute', bottom: -5, right: -5, fontSize: size * 0.15, color: accentColor }}>🌿</div>KC</div> },
    { id: 199, name: "Crystal", render: () => <div style={{ width: size * 0.5, height: size * 0.6, clipPath: 'polygon(50% 0%, 100% 35%, 75% 100%, 25% 100%, 0% 35%)', background: `linear-gradient(135deg, ${textColor}, ${accentColor})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: '#000' }}>KC</div> },
    { id: 200, name: "Organic Flow", render: () => <div style={{ fontFamily: 'Great Vibes', fontSize: size * 0.45, color: textColor, transform: 'rotate(-8deg)', textShadow: `2px 2px 4px ${accentColor}` }}>KC</div> },
  ];
};

export default function LogosPage() {
  const [selectedLogo, setSelectedLogo] = useState<number>(1);
  const [filter, setFilter] = useState<string>("all");
  const logos = generateLogos(80, "light");

  useEffect(() => {
    const saved = localStorage.getItem('kitchenCoreLogo');
    if (saved) setSelectedLogo(parseInt(saved));
  }, []);

  const handleSelect = (id: number) => {
    setSelectedLogo(id);
    localStorage.setItem('kitchenCoreLogo', id.toString());
  };

  const categories = [
    { name: "all", label: "All", range: [1, 200] },
    { name: "wordmarks", label: "Wordmarks", range: [1, 10] },
    { name: "monograms", label: "Monograms", range: [11, 20] },
    { name: "geometric", label: "Geometric", range: [21, 30] },
    { name: "abstract", label: "Abstract", range: [31, 40] },
    { name: "kitchen", label: "Kitchen", range: [41, 50] },
    { name: "letterplay", label: "Letter Play", range: [51, 60] },
    { name: "minimalist", label: "Minimalist", range: [61, 70] },
    { name: "badge", label: "Badge", range: [71, 80] },
    { name: "luxury", label: "Luxury", range: [81, 90] },
    { name: "creative", label: "Creative", range: [91, 100] },
    { name: "typographic", label: "Typography", range: [101, 110] },
    { name: "symbols", label: "Symbols", range: [111, 120] },
    { name: "layered", label: "Layered", range: [121, 130] },
    { name: "circular", label: "Circular", range: [131, 140] },
    { name: "angular", label: "Angular", range: [141, 150] },
    { name: "gradient", label: "Gradient", range: [151, 160] },
    { name: "tech", label: "Tech", range: [161, 170] },
    { name: "artistic", label: "Artistic", range: [171, 180] },
    { name: "architectural", label: "Architectural", range: [181, 190] },
    { name: "nature", label: "Nature", range: [191, 200] },
  ];

  const filteredLogos = filter === "all"
    ? logos
    : logos.filter(logo => {
        const cat = categories.find(c => c.name === filter);
        return cat && logo.id >= cat.range[0] && logo.id <= cat.range[1];
      });

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Choose Your Kitchen Core Logo</h1>
          <p className="text-gray-400">Click any logo to select it. Your choice is saved automatically.</p>
        </div>

        {/* Preview */}
        <div className="mb-8 p-8 bg-gray-900 rounded-lg border border-green-primary/20">
          <h2 className="text-xl font-semibold mb-4">Selected Logo Preview</h2>
          <div className="flex items-center justify-center h-40 bg-black rounded">
            {logos[selectedLogo - 1]?.render()}
          </div>
          <p className="text-center mt-4 text-sm text-gray-400">
            Logo #{selectedLogo} - {logos[selectedLogo - 1]?.name}
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setFilter(cat.name)}
              className={`px-4 py-2 rounded transition-colors ${
                filter === cat.name
                  ? 'bg-green-primary text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
          {filteredLogos.map(logo => (
            <motion.div
              key={logo.id}
              onClick={() => handleSelect(logo.id)}
              className={`relative aspect-square bg-gray-900 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 flex items-center justify-center p-2 ${
                selectedLogo === logo.id
                  ? 'border-green-primary shadow-lg shadow-green-primary/30'
                  : 'border-gray-700 hover:border-gray-500'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {logo.render()}
              <div className="absolute top-1 right-1 text-xs bg-black/70 px-1 rounded">
                {logo.id}
              </div>
              {selectedLogo === logo.id && (
                <div className="absolute top-1 left-1 text-green-primary">
                  ✓
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Back button */}
        <div className="mt-8 text-center">
          <a href="/" className="inline-block px-6 py-3 bg-green-primary text-black font-semibold rounded hover:bg-green-vibrant transition-colors">
            Back to Home
          </a>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600;700;900&family=Playfair+Display:wght@600&family=Great+Vibes&family=Roboto+Mono:wght@600;700&display=swap');
      `}</style>
    </div>
  );
}

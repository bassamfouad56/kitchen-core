"use client";

import React from "react";
import Image from "next/image";

interface DynamicLogoProps {
  size?: number;
  variant?: "light" | "dark";
  className?: string;
}

export default function DynamicLogo({
  size = 80,
  variant = "light",
  className = "",
}: DynamicLogoProps) {
  // Use actual Kitchen Core logo
  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        src="/logos/logo-main.svg"
        alt="Kitchen Core"
        width={size * 4}
        height={size}
        style={{ width: 'auto', height: size }}
        priority
      />
    </div>
  );
}

/* Legacy logo variations - keeping for reference
  const renderLogo = (id: number) => {
    switch (id) {
      case 1:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>KITCHEN CORE</div>;
      case 2:
        return <div style={{ fontFamily: 'Playfair Display', fontWeight: 600, fontSize: size * 0.22, color: textColor, whiteSpace: 'nowrap' }}>Kitchen Core</div>;
      case 3:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor, whiteSpace: 'nowrap' }}>KITCHEN <span style={{ color: accentColor }}>|</span> CORE</div>;
      case 4:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor, whiteSpace: 'nowrap' }}>KITCHEN <span style={{ color: accentColor }}>•</span> CORE</div>;
      case 5:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor, whiteSpace: 'nowrap' }}>KITCHEN <span style={{ color: accentColor }}>/</span> CORE</div>;
      case 6:
        return <div style={{ fontFamily: 'Roboto Mono', fontWeight: 600, fontSize: size * 0.18, color: textColor, whiteSpace: 'nowrap' }}>KITCHEN_CORE</div>;
      case 7:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 500, fontSize: size * 0.22, color: textColor, whiteSpace: 'nowrap' }}>kitchen core</div>;
      case 8:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: textColor, textAlign: 'center', lineHeight: 1 }}>KITCHEN<br/>CORE</div>;
      case 9:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: size * 0.15, color: textColor, letterSpacing: '0.4em', whiteSpace: 'nowrap' }}>K I T C H E N  C O R E</div>;
      case 10:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.24, color: textColor, whiteSpace: 'nowrap' }}>KitchenCore</div>;
      case 11:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: textColor, letterSpacing: '-0.05em' }}>KC</div>;
      case 12:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.7, color: textColor }}>K</div>;
      case 13:
        return <div style={{ width: size * 0.6, height: size * 0.6, border: `3px solid ${textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, color: textColor }}>K</div>;
      case 14:
        return <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: textColor }}><span>K</span><span style={{ marginLeft: '-0.2em', color: accentColor }}>C</span></div>;
      case 15:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.4, color: textColor }}>K<span style={{ color: accentColor }}>+</span>C</div>;
      case 16:
        return <div style={{ fontFamily: 'Great Vibes', fontSize: size * 0.5, color: textColor }}>KC</div>;
      case 17:
        return <div style={{ fontFamily: 'Roboto Mono', fontWeight: 700, fontSize: size * 0.4, color: textColor }}>[K]</div>;
      case 18:
        return <div style={{ fontFamily: 'Roboto Mono', fontWeight: 700, fontSize: size * 0.35, color: textColor }}>{'{KC}'}</div>;
      case 19:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.35, color: textColor, textAlign: 'center', lineHeight: 0.9 }}>K<br/>C</div>;
      case 20:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.4, color: textColor }}>K<span style={{ color: accentColor }}>.</span>C<span style={{ color: accentColor }}>.</span></div>;
      case 21:
        return <div style={{ width: size * 0.7, height: size * 0.7, border: `3px solid ${textColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.15, color: textColor, textAlign: 'center', lineHeight: 1 }}>KITCHEN<br/>CORE</div>;
      case 22:
        return <div style={{ width: size * 0.7, height: size * 0.7, border: `3px solid ${accentColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor, textAlign: 'center', lineHeight: 1 }}>KITCHEN<br/>CORE</div>;
      case 23:
        return <div style={{ width: size * 0.6, height: size * 0.6, clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.15, color: '#000' }}>KC</div>;
      case 24:
        return <div style={{ width: size * 0.5, height: size * 0.5, transform: 'rotate(45deg)', border: `3px solid ${textColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ transform: 'rotate(-45deg)', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}>KC</div></div>;
      case 25:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: 0, height: 0, borderLeft: `${size * 0.25}px solid transparent`, borderRight: `${size * 0.25}px solid transparent`, borderBottom: `${size * 0.25}px solid ${accentColor}` }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor, whiteSpace: 'nowrap' }}>KITCHEN CORE</div></div>;
      case 26:
        return <div style={{ width: size * 0.7, height: size * 0.7, border: `3px solid ${textColor}`, borderRadius: size * 0.15, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.25, color: textColor }}>KC</div>;
      case 27:
        return <div style={{ width: size * 0.6, height: size * 0.6, clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', background: textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: '#000' }}>K</div>;
      case 28:
        return <div style={{ width: size * 0.7, height: size * 0.7, border: `2px solid ${textColor}`, padding: size * 0.05 }}><div style={{ width: '100%', height: '100%', border: `2px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KC</div></div>;
      case 29:
        return <div style={{ width: size * 0.6, height: size * 0.6, clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: '#000' }}>K</div>;
      case 30:
        return <div style={{ padding: `${size * 0.15}px ${size * 0.25}px`, border: `3px solid ${textColor}`, borderRadius: size * 0.4, fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}>KC</div>;
      case 31:
        return <div style={{ position: 'relative', width: size * 0.7, height: size * 0.7, border: `3px solid ${textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: textColor }}>KC</div>;
      case 32:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ width: size * 0.8, height: size * 0.15, borderTop: `3px solid ${accentColor}`, borderRadius: '50% 50% 0 0' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.16, color: textColor, marginTop: size * 0.05 }}>KITCHEN CORE</div></div>;
      case 33:
        return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: size * 0.08 }}>{Array.from({length: 9}, (_, i) => <div key={i} style={{ width: size * 0.12, height: size * 0.12, background: i === 4 ? accentColor : textColor, borderRadius: '50%' }}></div>)}</div>;
      case 34:
        return <div style={{ position: 'relative', width: size * 0.7, height: size * 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ position: 'absolute', width: '100%', height: 2, background: textColor, transform: 'rotate(45deg)' }}></div><div style={{ position: 'absolute', width: '100%', height: 2, background: textColor, transform: 'rotate(-45deg)' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.25, color: textColor, zIndex: 1 }}>KC</div></div>;
      case 35:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}><div style={{ width: size * 0.7, height: size * 0.2, borderBottom: `4px solid ${accentColor}`, borderRadius: '0 0 50% 0' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KITCHEN CORE</div></div>;
      case 36:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.6, height: size * 0.3, borderTop: `3px solid ${accentColor}`, borderRadius: '100% 100% 0 0' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KITCHEN CORE</div></div>;
      case 37:
        return <div style={{ position: 'relative', width: size * 0.8, height: size * 0.5 }}><div style={{ position: 'absolute', left: 0, width: size * 0.4, height: size * 0.4, border: `3px solid ${textColor}`, borderRadius: '50%' }}></div><div style={{ position: 'absolute', right: 0, width: size * 0.4, height: size * 0.4, border: `3px solid ${accentColor}`, borderRadius: '50%' }}></div><div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}>KC</div></div>;
      case 38:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><svg width={size * 0.8} height={size * 0.15}><polyline points={`0,${size*0.15} ${size*0.2},0 ${size*0.4},${size*0.15} ${size*0.6},0 ${size*0.8},${size*0.15}`} fill="none" stroke={accentColor} strokeWidth="3"/></svg><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KITCHEN CORE</div></div>;
      case 39:
        return <div style={{ position: 'relative', width: size * 0.7, height: size * 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Array.from({length: 8}, (_, i) => <div key={i} style={{ position: 'absolute', width: 2, height: size * 0.25, background: accentColor, transform: `rotate(${i * 45}deg)`, transformOrigin: 'center' }}></div>)}<div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.25, color: textColor, zIndex: 1 }}>KC</div></div>;
      case 40:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.3, color: textColor }}>∞ <span style={{ fontSize: size * 0.2 }}>KC</span></div>;
      case 41:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.4, height: size * 0.3, background: textColor, borderRadius: '50% 50% 0 0', position: 'relative' }}><div style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: size * 0.08, background: textColor, borderRadius: 0 }}></div></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KITCHEN CORE</div></div>;
      case 42:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ fontSize: size * 0.4, color: accentColor }}>🍴</div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KITCHEN CORE</div></div>;
      case 43:
        return <div style={{ display: 'flex', gap: size * 0.1, alignItems: 'center' }}><div style={{ width: size * 0.15, height: size * 0.4, background: accentColor, borderRadius: '50% 50% 50% 50%' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KC</div></div>;
      case 44:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.5, height: size * 0.35, border: `3px solid ${textColor}`, borderRadius: '0 0 20% 20%', position: 'relative' }}><div style={{ position: 'absolute', top: -8, left: -8, width: size * 0.12, height: 8, background: textColor, borderRadius: 4 }}></div><div style={{ position: 'absolute', top: -8, right: -8, width: size * 0.12, height: 8, background: textColor, borderRadius: 4 }}></div></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div>;
      case 45:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: size * 0.08 }}>{Array.from({length: 4}, (_, i) => <div key={i} style={{ width: size * 0.18, height: size * 0.18, border: `3px solid ${accentColor}`, borderRadius: '50%' }}></div>)}</div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div>;
      case 46:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.5, height: size * 0.35, background: textColor, borderRadius: 8, position: 'relative' }}><div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 3, background: accentColor }}></div></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div>;
      case 47:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ position: 'relative', width: size * 0.3, height: size * 0.4 }}><div style={{ position: 'absolute', bottom: 0, left: '50%', width: 3, height: '60%', background: textColor, transform: 'translateX(-50%)' }}></div><div style={{ position: 'absolute', top: 0, left: '50%', width: size * 0.25, height: size * 0.25, border: `3px solid ${accentColor}`, borderRadius: '50% 50% 40% 40%', transform: 'translateX(-50%)' }}></div></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div>;
      case 48:
        return <div style={{ width: size * 0.6, height: size * 0.6, border: `3px solid ${textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}><div style={{ width: size * 0.35, height: size * 0.35, border: `2px solid ${accentColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KC</div></div>;
      case 49:
        return <div style={{ width: size * 0.6, height: size * 0.6, border: `3px solid ${textColor}`, borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.4, height: size * 0.25, border: `2px solid ${accentColor}`, borderRadius: 2 }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.1, color: textColor }}>KC</div></div>;
      case 50:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.35, height: size * 0.4, border: `3px solid ${textColor}`, borderRadius: '0 0 10% 10%', position: 'relative' }}><div style={{ position: 'absolute', top: '33%', left: 0, right: 0, height: 2, background: accentColor }}></div><div style={{ position: 'absolute', top: '66%', left: 0, right: 0, height: 2, background: accentColor }}></div></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div>;
      case 51:
        return <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.6, color: textColor }}><span style={{ color: accentColor }}>C</span><span style={{ position: 'absolute', left: '40%', top: '50%', transform: 'translate(-50%, -50%)', fontSize: size * 0.35, color: textColor }}>K</span></div>;
      case 52:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, color: textColor }}>KC<span style={{ display: 'inline-block', transform: 'scaleX(-1)', color: accentColor, marginLeft: size * 0.05 }}>CK</span></div>;
      case 53:
        return <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: textColor }}><span style={{ position: 'absolute', left: 3, top: 3, color: accentColor, zIndex: -1 }}>KC</span>KC</div>;
      case 54:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.6, color: 'transparent', WebkitTextStroke: `3px ${textColor}` }}>KC</div>;
      case 55:
        return <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: textColor, overflow: 'hidden' }}><span>KC</span><div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '33%', background: accentColor, opacity: 0.3 }}></div></div>;
      case 56:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, background: `linear-gradient(to right, ${textColor}, ${accentColor})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>KC</div>;
      case 57:
        return <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: textColor }}>K<div style={{ position: 'absolute', top: '50%', left: '40%', width: '20%', height: 3, background: accentColor }}></div>C</div>;
      case 58:
        return <div style={{ width: size * 0.6, height: size * 0.6, background: textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: '#000' }}>K</div>;
      case 59:
        return <div style={{ fontFamily: 'Arial Black', fontWeight: 900, fontSize: size * 0.5, color: textColor, letterSpacing: '0.1em' }}>KC</div>;
      case 60:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, color: textColor, transform: 'rotate(-10deg)' }}>KC</div>;
      case 61:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ width: size * 0.6, height: 2, background: accentColor, marginBottom: size * 0.05 }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: size * 0.15, color: textColor }}>KITCHEN CORE</div></div>;
      case 62:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.8, color: textColor }}>K</div>;
      case 63:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 300, fontSize: size * 0.12, color: textColor, letterSpacing: '0.2em' }}>KITCHEN CORE</div>;
      case 64:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: textColor }}>K<span style={{ color: accentColor, fontSize: size * 0.2 }}>•</span></div>;
      case 65:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.4, color: textColor }}>K <span style={{ color: accentColor }}>/</span> C</div>;
      case 66:
        return <div style={{ fontFamily: 'Roboto Mono', fontWeight: 500, fontSize: size * 0.15, color: textColor }}>[KITCHEN CORE]</div>;
      case 67:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: size * 0.18, color: textColor }}>KITCHEN <span style={{ color: accentColor }}>:</span> CORE</div>;
      case 68:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.35, color: textColor }}>K <span style={{ color: accentColor }}>&</span> C</div>;
      case 69:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.35, color: textColor }}>K<span style={{ color: accentColor }}>@</span>C</div>;
      case 70:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.35, color: textColor }}>K<span style={{ color: accentColor }}>*</span>C</div>;
      case 71:
        return <div style={{ width: size * 0.5, height: size * 0.6, clipPath: 'polygon(50% 0%, 100% 0, 100% 70%, 50% 100%, 0 70%, 0 0)', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: '#000' }}>KC</div>;
      case 72:
        return <div style={{ position: 'relative', padding: `${size * 0.1}px ${size * 0.2}px`, background: accentColor, fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: '#000' }}>KITCHEN CORE<div style={{ position: 'absolute', bottom: -10, left: size * 0.15, width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: `10px solid ${accentColor}` }}></div></div>;
      case 73:
        return <div style={{ width: size * 0.7, height: size * 0.7, border: `4px double ${textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor, textAlign: 'center', lineHeight: 1 }}>KITCHEN<br/>CORE</div>;
      case 74:
        return <div style={{ width: size * 0.7, height: size * 0.7, border: `3px solid ${textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}><div style={{ width: size * 0.5, height: size * 0.5, border: `2px solid ${accentColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div>;
      case 75:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ width: size * 0.5, height: size * 0.5, border: `3px solid ${accentColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: textColor }}>KC</div><div style={{ width: 0, height: 0, borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderTop: `20px solid ${accentColor}`, marginTop: -5 }}></div></div>;
      case 76:
        return <div style={{ width: size * 0.5, height: size * 0.6, clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)', border: `3px solid ${textColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}>KC</div>;
      case 77:
        return <div style={{ position: 'relative', width: size * 0.6, height: size * 0.6, clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: '#000' }}>KC</div>;
      case 78:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ fontSize: size * 0.25, color: accentColor }}>👑</div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KITCHEN CORE</div></div>;
      case 79:
        return <div style={{ position: 'relative', width: size * 0.7, height: size * 0.6 }}><div style={{ fontSize: size * 0.2, position: 'absolute', left: 0, transform: 'rotate(-30deg)' }}>🌿</div><div style={{ fontSize: size * 0.2, position: 'absolute', right: 0, transform: 'rotate(30deg) scaleX(-1)' }}>🌿</div><div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}>KC</div></div>;
      case 80:
        return <div style={{ width: size * 0.7, height: size * 0.7, background: accentColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: `inset 0 0 20px rgba(0,0,0,0.3)` }}><div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: '#000' }}>KC</div></div>;
      case 81:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 200, fontSize: size * 0.2, color: textColor, letterSpacing: '0.2em' }}>KITCHEN CORE</div>;
      case 82:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.18, color: textColor }}>KITCHEN CORE</div><div style={{ width: size * 0.4, height: 2, background: accentColor, marginTop: size * 0.05 }}></div></div>;
      case 83:
        return <div style={{ padding: `${size * 0.15}px ${size * 0.2}px`, background: `linear-gradient(135deg, ${textColor} 0%, ${accentColor} 100%)`, fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: '#000' }}>KC</div>;
      case 84:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.6, height: 3, background: textColor }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.18, color: textColor, letterSpacing: '0.15em' }}>KITCHEN CORE</div><div style={{ width: size * 0.6, height: 3, background: textColor }}></div></div>;
      case 85:
        return <div style={{ width: size * 0.7, height: size * 0.7, border: `2px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 300, fontSize: size * 0.18, color: textColor }}>KC</div>;
      case 86:
        return <div style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: size * 0.22, color: textColor, letterSpacing: '0.05em' }}>KITCHEN CORE</div>;
      case 87:
        return <div style={{ width: size * 0.6, height: size * 0.6, border: `3px solid ${textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display', fontWeight: 700, fontSize: size * 0.3, color: textColor }}>KC</div>;
      case 88:
        return <div style={{ width: size * 0.5, height: size * 0.5, border: `3px solid ${accentColor}`, transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ transform: 'rotate(-45deg)', fontFamily: 'Montserrat', fontWeight: 300, fontSize: size * 0.2, color: textColor }}>KC</div></div>;
      case 89:
        return <div style={{ fontFamily: 'Great Vibes', fontSize: size * 0.35, color: textColor }}>Kitchen Core</div>;
      case 90:
        return <div style={{ border: `1px solid ${textColor}`, padding: `${size * 0.15}px ${size * 0.2}px`, fontFamily: 'Montserrat', fontWeight: 300, fontSize: size * 0.15, color: textColor, letterSpacing: '0.15em' }}>KITCHEN CORE</div>;
      case 91:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.7, height: size * 0.3, border: `3px solid ${textColor}`, borderRadius: '8px 8px 0 0', position: 'relative' }}><div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: accentColor }}></div></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div>;
      case 92:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ width: 0, height: 0, borderLeft: `${size * 0.3}px solid transparent`, borderRight: `${size * 0.3}px solid transparent`, borderBottom: `${size * 0.25}px solid ${accentColor}` }}></div><div style={{ width: size * 0.6, height: size * 0.3, border: `3px solid ${textColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KC</div></div>;
      case 93:
        return <div style={{ width: size * 0.5, height: size * 0.7, border: `3px solid ${textColor}`, borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}><div style={{ width: 8, height: 8, background: accentColor, borderRadius: '50%', position: 'absolute', right: size * 0.15, top: '50%' }}></div>KC</div>;
      case 94:
        return <div style={{ width: size * 0.6, height: size * 0.6, border: `3px solid ${textColor}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 3 }}>{Array.from({length: 4}, (_, i) => <div key={i} style={{ background: i === 1 || i === 2 ? accentColor : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.12, color: i === 1 || i === 2 ? '#000' : textColor }}>{i === 1 ? 'K' : i === 2 ? 'C' : ''}</div>)}</div>;
      case 95:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><svg width={size * 0.6} height={size * 0.3}><path d={`M 0,${size*0.3} Q ${size*0.15},${size*0.15} ${size*0.3},${size*0.25} Q ${size*0.45},${size*0.1} ${size*0.6},${size*0.2}`} fill="none" stroke={accentColor} strokeWidth="3"/></svg><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor }}>KITCHEN CORE</div></div>;
      case 96:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ fontSize: size * 0.35, color: accentColor }}>🔥</div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KITCHEN CORE</div></div>;
      case 97:
        return <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, color: textColor }}><div style={{ position: 'absolute', left: 5, top: 5, color: accentColor, opacity: 0.5, zIndex: -1 }}>KC</div>KC</div>;
      case 98:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.35, color: accentColor, textShadow: `0 0 10px ${accentColor}, 0 0 20px ${accentColor}` }}>KC</div>;
      case 99:
        return <div style={{ fontFamily: 'Roboto Mono', fontWeight: 600, fontSize: size * 0.15, color: textColor, border: `2px solid ${accentColor}`, padding: `${size * 0.1}px ${size * 0.15}px`, background: 'rgba(52, 211, 153, 0.05)' }}>KITCHEN_CORE</div>;
      case 100:
        return <div style={{ fontFamily: 'Great Vibes', fontSize: size * 0.4, color: textColor, transform: 'rotate(-5deg)' }}>Kitchen Core</div>;
      case 101:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.25, color: textColor, letterSpacing: '-0.05em', transform: 'scaleX(0.8)' }}>KITCHEN CORE</div>;
      case 102:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.15, color: textColor, letterSpacing: '0.5em', transform: 'scaleX(1.3)' }}>KITCHEN CORE</div>;
      case 103:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.22, color: textColor }}>KiTcHeN <span style={{ color: accentColor }}>CoRe</span></div>;
      case 104:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: size * 0.12, color: textColor, writingMode: 'vertical-rl' as any, textOrientation: 'upright' as any, letterSpacing: '0.1em' }}>KITCHEN CORE</div>;
      case 105:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.22, color: textColor, fontStyle: 'italic' }}>Kitchen Core</div>;
      case 106:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.16, color: textColor, textAlign: 'center', lineHeight: 1.2 }}>KITCHEN<br/><span style={{ color: accentColor }}>―――</span><br/>CORE</div>;
      case 107:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.18, color: textColor, fontVariant: 'small-caps' as any }}>Kitchen Core</div>;
      case 108:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}><span style={{ fontSize: size * 0.35, color: accentColor }}>K</span>itchen Core</div>;
      case 109:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: size * 0.18, color: textColor, textDecoration: 'underline', textDecorationColor: accentColor }}>KITCHEN CORE</div>;
      case 110:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.22, color: textColor }}>KITC<span style={{ color: accentColor }}>HEN</span> CORE</div>;
      case 111:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor, display: 'flex', alignItems: 'center', gap: size * 0.08 }}>KITCHEN<span style={{ color: accentColor, fontSize: size * 0.3 }}>→</span>CORE</div>;
      case 112:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor }}>KITCHEN <span style={{ color: accentColor }}>◆</span> CORE</div>;
      case 113:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.25, color: textColor }}><span style={{ color: accentColor }}>+</span> KC <span style={{ color: accentColor }}>+</span></div>;
      case 114:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor }}>KITCHEN <span style={{ color: accentColor }}>○</span> CORE</div>;
      case 115:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor }}>KITCHEN <span style={{ color: accentColor }}>■</span> CORE</div>;
      case 116:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.03 }}><div style={{ fontSize: size * 0.25, color: accentColor }}>♥</div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.14, color: textColor }}>KITCHEN CORE</div></div>;
      case 117:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor }}>KITCHEN <span style={{ color: accentColor }}>★</span> CORE</div>;
      case 118:
        return <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.08 }}><span style={{ color: accentColor, fontSize: size * 0.3 }}>✓</span><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.18, color: textColor }}>KITCHEN CORE</div></div>;
      case 119:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.25, color: textColor }}>K <span style={{ color: accentColor }}>✕</span> C</div>;
      case 120:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: size * 0.16, color: textColor }}><span style={{ color: accentColor }}>•</span> KITCHEN <span style={{ color: accentColor }}>•</span> CORE <span style={{ color: accentColor }}>•</span></div>;
      case 121:
        return <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.35, color: textColor }}><div style={{ position: 'absolute', left: 6, top: 6, color: accentColor, opacity: 0.3, zIndex: -2 }}>KC</div><div style={{ position: 'absolute', left: 3, top: 3, color: accentColor, opacity: 0.6, zIndex: -1 }}>KC</div>KC</div>;
      case 122:
        return <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.3, color: textColor, textAlign: 'center', lineHeight: 0.85 }}>KITCHEN<br/><span style={{ color: accentColor }}>KITCHEN</span><br/>CORE</div>;
      case 123:
        return <div style={{ background: accentColor, padding: `${size * 0.1}px ${size * 0.15}px`, fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: '#000' }}>KITCHEN CORE</div>;
      case 124:
        return <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, color: textColor, overflow: 'hidden' }}><div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '50%', background: accentColor, opacity: 0.5 }}></div>KC</div>;
      case 125:
        return <div style={{ border: `3px solid ${accentColor}`, padding: `${size * 0.12}px ${size * 0.18}px`, fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.16, color: textColor }}>KITCHEN CORE</div>;
      case 126:
        return <div style={{ border: `2px solid ${textColor}`, padding: size * 0.05 }}><div style={{ border: `2px solid ${accentColor}`, padding: `${size * 0.08}px ${size * 0.12}px`, fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.13, color: textColor }}>KITCHEN CORE</div></div>;
      case 127:
        return <div style={{ position: 'relative', padding: `${size * 0.12}px ${size * 0.15}px`, fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.16, color: textColor }}><div style={{ position: 'absolute', top: 0, left: 0, width: size * 0.15, height: size * 0.15, borderTop: `3px solid ${accentColor}`, borderLeft: `3px solid ${accentColor}` }}></div><div style={{ position: 'absolute', bottom: 0, right: 0, width: size * 0.15, height: size * 0.15, borderBottom: `3px solid ${accentColor}`, borderRight: `3px solid ${accentColor}` }}></div>KC</div>;
      case 128:
        return <div style={{ width: size * 0.75, height: size * 0.45, border: `3px solid ${textColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: textColor }}>KITCHEN CORE</div>;
      case 129:
        return <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.08 }}><div style={{ width: 4, height: size * 0.5, background: accentColor }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.18, color: textColor }}>KITCHEN CORE</div></div>;
      case 130:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}><div style={{ width: '100%', height: 4, background: accentColor, marginBottom: size * 0.05 }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.16, color: textColor }}>KITCHEN CORE</div></div>;
      case 131:
        return <div style={{ width: size * 0.7, height: size * 0.7, border: `4px solid ${accentColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.13, color: textColor, textAlign: 'center', lineHeight: 1.1 }}>KITCHEN<br/>CORE</div>;
      case 132:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ width: size * 0.6, height: size * 0.3, borderTop: `4px solid ${accentColor}`, borderLeft: `4px solid ${accentColor}`, borderRight: `4px solid ${accentColor}`, borderRadius: '100% 100% 0 0' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.14, color: textColor, marginTop: size * 0.05 }}>KC</div></div>;
      case 133:
        return <div style={{ width: size * 0.7, height: size * 0.7, border: `3px solid ${textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}><div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: accentColor, opacity: 0.3 }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor, zIndex: 1 }}>KC</div></div>;
      case 134:
        return <div style={{ display: 'flex', gap: size * 0.05, alignItems: 'center' }}>{Array.from({length: 3}, (_, i) => <div key={i} style={{ width: size * 0.18, height: size * 0.18, border: `2px solid ${i === 1 ? accentColor : textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.12, color: textColor }}>{i === 1 ? 'KC' : ''}</div>)}</div>;
      case 135:
        return <div style={{ position: 'relative', width: size * 0.7, height: size * 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ position: 'absolute', width: '100%', height: '100%', border: `2px solid ${textColor}`, borderRadius: '50%', opacity: 0.5 }}></div><div style={{ position: 'absolute', width: '70%', height: '70%', border: `2px solid ${accentColor}`, borderRadius: '50%', opacity: 0.7 }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.22, color: textColor, zIndex: 1 }}>KC</div></div>;
      case 136:
        return <div style={{ width: size * 0.6, height: size * 0.6, background: accentColor, borderRadius: '50%', position: 'relative', clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>;
      case 137:
        return <div style={{ position: 'relative' }}><div style={{ width: size * 0.6, height: size * 0.6, border: `3px solid ${accentColor}`, borderRadius: '50%', position: 'absolute', left: -10, top: 0 }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, color: textColor, position: 'relative', zIndex: 1 }}>KC</div></div>;
      case 138:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.03 }}><div style={{ width: size * 0.25, height: size * 0.25, border: `2px solid ${accentColor}`, borderRadius: '50%' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.16, color: textColor }}>KITCHEN CORE</div></div>;
      case 139:
        return <div style={{ width: size * 0.7, height: size * 0.7, border: `3px dotted ${accentColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}>KC</div>;
      case 140:
        return <div style={{ width: size * 0.7, height: size * 0.7, border: `3px dashed ${textColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor }}>KC</div>;
      case 141:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ fontSize: size * 0.3, color: accentColor }}>∧</div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.14, color: textColor }}>KITCHEN CORE</div></div>;
      case 142:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.03 }}><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.14, color: textColor }}>KITCHEN CORE</div><div style={{ fontSize: size * 0.3, color: accentColor }}>∨</div></div>;
      case 143:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.2, color: textColor }}><span style={{ color: accentColor }}>{'<'}</span> KITCHEN CORE <span style={{ color: accentColor }}>{'>'}</span></div>;
      case 144:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: 0, height: 0, borderLeft: `${size * 0.3}px solid transparent`, borderRight: `${size * 0.3}px solid transparent`, borderTop: `${size * 0.25}px solid ${accentColor}` }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div>;
      case 145:
        return <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.05 }}><span style={{ color: accentColor, fontSize: size * 0.25 }}>▶</span><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.16, color: textColor }}>KITCHEN CORE</div></div>;
      case 146:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ fontSize: size * 0.2, color: accentColor }}>⚡</div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.14, color: textColor }}>KITCHEN CORE</div></div>;
      case 147:
        return <div style={{ width: size * 0.7, height: size * 0.7, border: `3px solid ${textColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: textColor }}>KC</div>;
      case 148:
        return <div style={{ width: size * 0.6, height: size * 0.5, clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: '#000' }}>KC</div>;
      case 149:
        return <div style={{ width: size * 0.7, height: size * 0.45, background: textColor, transform: 'skewX(-15deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ transform: 'skewX(15deg)', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: '#000' }}>KC</div></div>;
      case 150:
        return <div style={{ width: size * 0.5, height: size * 0.5, transform: 'rotate(45deg)', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ transform: 'rotate(-45deg)', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: '#000' }}>KC</div></div>;
      case 151:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, background: `linear-gradient(to bottom, ${textColor}, ${accentColor})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>KC</div>;
      case 152:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, background: `linear-gradient(45deg, ${textColor}, ${accentColor})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>KC</div>;
      case 153:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, background: `radial-gradient(circle, ${accentColor}, ${textColor})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>KC</div>;
      case 154:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.35, color: textColor }}>KI<span style={{ color: accentColor }}>TC</span>HE<span style={{ color: accentColor }}>N</span></div>;
      case 155:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: 'transparent', WebkitTextStroke: `2px ${accentColor}` }}>KC</div>;
      case 156:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, color: textColor, textShadow: `0 0 15px ${accentColor}, 0 0 25px ${accentColor}, 0 0 35px ${accentColor}` }}>KC</div>;
      case 157:
        return <div style={{ display: 'flex', gap: size * 0.05 }}><div style={{ background: textColor, padding: `${size * 0.08}px ${size * 0.12}px`, fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.15, color: '#000' }}>KIT</div><div style={{ background: accentColor, padding: `${size * 0.08}px ${size * 0.12}px`, fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.15, color: '#000' }}>CHEN</div></div>;
      case 158:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.3, color: textColor }}>K<span style={{ color: accentColor }}>I</span>T<span style={{ color: accentColor }}>C</span>H<span style={{ color: accentColor }}>E</span>N</div>;
      case 159:
        return <div style={{ background: textColor, padding: `${size * 0.1}px ${size * 0.15}px`, fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: '#000' }}>KITCHEN CORE</div>;
      case 160:
        return <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.3, color: textColor }}><div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%', background: accentColor, opacity: 0.4, zIndex: -1 }}></div>KC</div>;
      case 161:
        return <div style={{ fontFamily: 'Roboto Mono', fontWeight: 600, fontSize: size * 0.1, color: accentColor, lineHeight: 1.2 }}>01001011<br/>01000011</div>;
      case 162:
        return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>{Array.from({length: 16}, (_, i) => <div key={i} style={{ width: size * 0.12, height: size * 0.12, background: i % 3 === 0 ? accentColor : textColor }}></div>)}</div>;
      case 163:
        return <div style={{ position: 'relative', width: size * 0.7, height: size * 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ position: 'absolute', width: '100%', height: 2, background: accentColor }}></div><div style={{ position: 'absolute', width: 2, height: '100%', background: accentColor }}></div><div style={{ width: size * 0.15, height: size * 0.15, background: textColor, borderRadius: '50%', position: 'absolute', top: 0, left: 0 }}></div><div style={{ width: size * 0.15, height: size * 0.15, background: textColor, borderRadius: '50%', position: 'absolute', bottom: 0, right: 0 }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor, zIndex: 1 }}>KC</div></div>;
      case 164:
        return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1 }}>{[1,0,1,0,1,0,1,1,1,0,1,1,0,1,1,0,1,1,1,0,1,0,1,0,1].map((v, i) => <div key={i} style={{ width: size * 0.08, height: size * 0.08, background: v ? textColor : 'transparent' }}></div>)}</div>;
      case 165:
        return <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.35, color: textColor }}><div style={{ position: 'absolute', left: -2, color: accentColor, opacity: 0.8, clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}>KC</div><div style={{ position: 'absolute', left: 2, color: accentColor, opacity: 0.8, clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}>KC</div>KC</div>;
      case 166:
        return <div style={{ fontFamily: 'Roboto Mono', fontWeight: 700, fontSize: size * 0.2, color: accentColor, textShadow: `0 0 8px ${accentColor}` }}>KITCHEN_CORE</div>;
      case 167:
        return <div style={{ fontFamily: 'Roboto Mono', fontWeight: 600, fontSize: size * 0.14, color: accentColor, background: '#000', padding: `${size * 0.08}px ${size * 0.12}px`, border: `1px solid ${accentColor}` }}>$ kitchen-core</div>;
      case 168:
        return <div style={{ fontFamily: 'Roboto Mono', fontWeight: 600, fontSize: size * 0.13, color: accentColor }}>{'// KITCHEN CORE'}</div>;
      case 169:
        return <div style={{ fontFamily: 'Roboto Mono', fontWeight: 700, fontSize: size * 0.14, color: textColor }}>#KC<span style={{ color: accentColor }}>0RE</span></div>;
      case 170:
        return <div style={{ display: 'flex', flexDirection: 'column', gap: size * 0.05, alignItems: 'center' }}><div style={{ width: size * 0.7, height: size * 0.12, border: `2px solid ${textColor}`, position: 'relative' }}><div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '70%', background: accentColor }}></div></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div>;
      case 171:
        return <div style={{ fontFamily: 'Great Vibes', fontSize: size * 0.4, color: textColor, textShadow: `2px 2px 4px ${accentColor}` }}>Kitchen Core</div>;
      case 172:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.35, color: textColor, textShadow: `0 0 20px ${accentColor}, 2px 2px 10px ${accentColor}` }}>KC</div>;
      case 173:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.5, color: 'transparent', WebkitTextStroke: `2px ${textColor}`, filter: 'blur(0.3px)' }}>KC</div>;
      case 174:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.3, color: textColor, opacity: 0.7, transform: 'rotate(-5deg)', border: `3px solid ${textColor}`, padding: `${size * 0.08}px ${size * 0.12}px` }}>KC</div>;
      case 175:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.35, color: textColor, textShadow: `2px 2px 8px ${accentColor}, -2px -2px 8px ${accentColor}`, filter: 'blur(0.5px)' }}>KC</div>;
      case 176:
        return <div style={{ fontFamily: 'Arial Black', fontWeight: 900, fontSize: size * 0.45, color: textColor, letterSpacing: '0.08em' }}>KC</div>;
      case 177:
        return <div style={{ fontFamily: 'Great Vibes', fontSize: size * 0.5, color: textColor, fontStyle: 'italic' }}>KC</div>;
      case 178:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.4, color: textColor, textShadow: `3px 3px 0 ${accentColor}, 6px 6px 0 rgba(0,0,0,0.5)` }}>KC</div>;
      case 179:
        return <div style={{ fontFamily: 'Great Vibes', fontSize: size * 0.35, color: textColor, transform: 'rotate(3deg)' }}>Kitchen Core</div>;
      case 180:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: size * 0.25, color: textColor, textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>KITCHEN CORE</div>;
      case 181:
        return <div style={{ display: 'flex', gap: size * 0.05, alignItems: 'flex-end' }}>{[0.8, 1, 0.8].map((h, i) => <div key={i} style={{ width: size * 0.15, height: size * h * 0.5, background: i === 1 ? accentColor : textColor }}></div>)}</div>;
      case 182:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ width: size * 0.5, height: size * 0.35, borderTop: `3px solid ${textColor}`, borderLeft: `3px solid ${textColor}`, borderRight: `3px solid ${textColor}`, borderRadius: '100% 100% 0 0' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor, marginTop: size * 0.05 }}>KC</div></div>;
      case 183:
        return <div style={{ width: size * 0.7, height: size * 0.7, background: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`, backgroundSize: `${size * 0.14}px ${size * 0.14}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Roboto Mono', fontWeight: 700, fontSize: size * 0.18, color: textColor }}>KC</div>;
      case 184:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.25, color: textColor }}>KC</div><div style={{ width: size * 0.5, height: 4, background: accentColor, marginTop: size * 0.05 }}></div><div style={{ width: size * 0.6, height: 4, background: textColor, marginTop: 2 }}></div></div>;
      case 185:
        return <div style={{ position: 'relative', width: size * 0.7, height: size * 0.6 }}><div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: textColor }}></div><div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: textColor }}></div><div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 3, background: accentColor }}></div><div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 3, background: accentColor }}></div><div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: textColor }}>KC</div></div>;
      case 186:
        return <div style={{ position: 'relative', padding: `${size * 0.12}px ${size * 0.15}px`, fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.16, color: textColor }}><div style={{ position: 'absolute', top: -3, left: -3, width: size * 0.2, height: size * 0.2, border: `3px solid ${accentColor}`, borderRight: 'none', borderBottom: 'none' }}></div>KC</div>;
      case 187:
        return <div style={{ width: size * 0.7, height: size * 0.7, border: `3px solid ${textColor}`, position: 'relative' }}><div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: accentColor }}></div><div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, background: accentColor }}></div><div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div>;
      case 188:
        return <div style={{ display: 'flex', gap: size * 0.03, alignItems: 'flex-end' }}>{[0.4, 0.7, 0.5, 0.8, 0.6].map((h, i) => <div key={i} style={{ width: size * 0.1, height: size * h * 0.6, background: i === 3 ? accentColor : textColor }}></div>)}</div>;
      case 189:
        return <div style={{ position: 'relative', width: size * 0.7, height: size * 0.5 }}>{[0, 1, 2, 3].map(i => <div key={i} style={{ position: 'absolute', left: i * size * 0.15, bottom: i * size * 0.1, width: size * 0.2, height: size * 0.15, border: `2px solid ${i === 2 ? accentColor : textColor}` }}></div>)}</div>;
      case 190:
        return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>{Array.from({length: 16}, (_, i) => <div key={i} style={{ width: size * 0.12, height: size * 0.12, background: (i + Math.floor(i / 4)) % 2 === 0 ? textColor : accentColor }}></div>)}</div>;
      case 191:
        return <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.08 }}><span style={{ fontSize: size * 0.25, color: accentColor }}>🍃</span><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.16, color: textColor }}>KITCHEN CORE</div></div>;
      case 192:
        return <div style={{ position: 'relative', width: size * 0.7, height: size * 0.6 }}><svg width={size * 0.7} height={size * 0.6}><line x1={size * 0.35} y1={size * 0.6} x2={size * 0.35} y2={size * 0.2} stroke={textColor} strokeWidth="3"/><line x1={size * 0.35} y1={size * 0.3} x2={size * 0.2} y2={size * 0.1} stroke={accentColor} strokeWidth="2"/><line x1={size * 0.35} y1={size * 0.3} x2={size * 0.5} y2={size * 0.1} stroke={accentColor} strokeWidth="2"/></svg><div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div>;
      case 193:
        return <div style={{ position: 'relative', width: size * 0.6, height: size * 0.6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Array.from({length: 6}, (_, i) => <div key={i} style={{ position: 'absolute', width: size * 0.15, height: size * 0.3, background: accentColor, borderRadius: '50%', transform: `rotate(${i * 60}deg) translateY(-${size * 0.15}px)` }}></div>)}<div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.2, color: textColor, zIndex: 1 }}>KC</div></div>;
      case 194:
        return <div style={{ position: 'relative', width: size * 0.7, height: size * 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Array.from({length: 12}, (_, i) => <div key={i} style={{ position: 'absolute', width: 3, height: size * 0.2, background: accentColor, transform: `rotate(${i * 30}deg)`, transformOrigin: 'center', opacity: 0.6 }}></div>)}<div style={{ width: size * 0.35, height: size * 0.35, background: textColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.15, color: '#000', zIndex: 1 }}>KC</div></div>;
      case 195:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><svg width={size * 0.8} height={size * 0.2}><path d={`M 0,${size*0.15} Q ${size*0.2},${size*0.05} ${size*0.4},${size*0.15} T ${size*0.8},${size*0.15}`} fill="none" stroke={accentColor} strokeWidth="3"/></svg><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.14, color: textColor }}>KITCHEN CORE</div></div>;
      case 196:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><svg width={size * 0.7} height={size * 0.3}><polygon points={`0,${size*0.3} ${size*0.25},${size*0.1} ${size*0.35},${size*0.3} ${size*0.45},${size*0.05} ${size*0.7},${size*0.3}`} fill={textColor}/></svg><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor, marginTop: size * 0.05 }}>KC</div></div>;
      case 197:
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.05 }}><div style={{ width: size * 0.25, height: size * 0.35, background: accentColor, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)' }}></div><div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.12, color: textColor }}>KC</div></div>;
      case 198:
        return <div style={{ position: 'relative', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.35, color: textColor }}><div style={{ position: 'absolute', top: -5, left: -5, fontSize: size * 0.15, color: accentColor }}>🌿</div><div style={{ position: 'absolute', bottom: -5, right: -5, fontSize: size * 0.15, color: accentColor }}>🌿</div>KC</div>;
      case 199:
        return <div style={{ width: size * 0.5, height: size * 0.6, clipPath: 'polygon(50% 0%, 100% 35%, 75% 100%, 25% 100%, 0% 35%)', background: `linear-gradient(135deg, ${textColor}, ${accentColor})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat', fontWeight: 900, fontSize: size * 0.18, color: '#000' }}>KC</div>;
      case 200:
        return <div style={{ fontFamily: 'Great Vibes', fontSize: size * 0.45, color: textColor, transform: 'rotate(-8deg)', textShadow: `2px 2px 4px ${accentColor}` }}>KC</div>;
      default:
        return <div style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: size * 0.22, color: textColor, textAlign: 'center', lineHeight: 1 }}>KITCHEN<br/><span style={{ color: accentColor }}>CORE</span></div>;
    }
  };

*/

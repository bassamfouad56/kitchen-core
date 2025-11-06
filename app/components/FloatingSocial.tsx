'use client';

import { Instagram, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface FloatingSocialProps {
  instagramUrl?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
}

export default function FloatingSocial({
  instagramUrl = 'https://www.instagram.com/kitchen_core_uae',
  whatsappNumber = '+971567888640',
  whatsappMessage = 'Hello! I\'m interested in your kitchen services.'
}: FloatingSocialProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format WhatsApp URL
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 md:bottom-10 md:right-10">
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] active:scale-95 md:h-[70px] md:w-[70px]"
        aria-label="Contact us on WhatsApp"
      >
        {/* Icon with better sizing */}
        <MessageCircle
          className="h-8 w-8 stroke-[2.5] md:h-9 md:w-9"
          fill="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Tooltip with better styling */}
        <span className="pointer-events-none absolute right-[calc(100%+16px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-2.5 text-sm font-semibold text-white opacity-0 shadow-2xl backdrop-blur-sm transition-all duration-300 group-hover:right-[calc(100%+12px)] group-hover:opacity-100">
          Chat on WhatsApp
          <span className="absolute right-[-6px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-gray-900"></span>
        </span>

        {/* Subtle pulse animation */}
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-20 [animation-duration:2s]"></span>

        {/* Glow effect on hover */}
        <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40"></span>
      </a>

      {/* Instagram Button */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#405DE6] via-[#E1306C] to-[#FD1D1D] text-white shadow-[0_8px_30px_rgba(225,48,108,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_40px_rgba(225,48,108,0.6)] active:scale-95 md:h-[70px] md:w-[70px]"
        aria-label="Follow us on Instagram"
      >
        {/* Icon with better sizing */}
        <Instagram
          className="h-8 w-8 stroke-[2.5] md:h-9 md:w-9"
          fill="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Tooltip with better styling */}
        <span className="pointer-events-none absolute right-[calc(100%+16px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-2.5 text-sm font-semibold text-white opacity-0 shadow-2xl backdrop-blur-sm transition-all duration-300 group-hover:right-[calc(100%+12px)] group-hover:opacity-100">
          Follow on Instagram
          <span className="absolute right-[-6px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-gray-900"></span>
        </span>

        {/* Glow effect on hover */}
        <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-[#405DE6] via-[#E1306C] to-[#FD1D1D] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40"></span>
      </a>
    </div>
  );
}

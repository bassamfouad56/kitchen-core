'use client';

import { Instagram, MessageCircle } from 'lucide-react';

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
  // Format WhatsApp URL
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/80 backdrop-blur-md transition-all duration-300 hover:bg-[#25D366] hover:border-[#25D366]/30 hover:scale-105"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />

        {/* Tooltip */}
        <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-xs font-medium text-black opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
          WhatsApp
        </span>
      </a>

      {/* Instagram Button */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/80 backdrop-blur-md transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:border-pink-500/30 hover:scale-105"
        aria-label="Follow us on Instagram"
      >
        <Instagram className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />

        {/* Tooltip */}
        <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-xs font-medium text-black opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
          Instagram
        </span>
      </a>
    </div>
  );
}

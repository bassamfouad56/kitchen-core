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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />

        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          Chat on WhatsApp
        </span>

        {/* Pulse animation */}
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-75"></span>
      </a>

      {/* Instagram Button */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#FEDA75] via-[#FA7E1E] to-[#D62976] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
        aria-label="Follow us on Instagram"
      >
        <Instagram className="h-7 w-7" />

        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
          Follow on Instagram
        </span>
      </a>

      {/* Optional: Add more social icons here */}
    </div>
  );
}

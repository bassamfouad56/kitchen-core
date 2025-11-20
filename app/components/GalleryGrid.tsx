"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { ImageLightbox } from "./ImageLightbox";

interface ImageData {
  id: string;
  image: string;
  titleEn: string;
  titleAr?: string | null;
  descriptionEn?: string | null;
  descriptionAr?: string | null;
  location?: string | null;
  category: string;
  size: string;
}

interface GalleryGridProps {
  images: ImageData[];
  locale: string;
  categories: Array<{
    key: string;
    labelEn: string;
    labelAr: string;
  }>;
}

export function GalleryGrid({ images, locale, categories }: GalleryGridProps) {
  const isArabic = locale === "ar";
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getSizeClass = (size: string) => {
    switch (size) {
      case "SMALL":
        return "col-span-1 row-span-1";
      case "MEDIUM":
        return "col-span-1 md:col-span-2 row-span-1";
      case "LARGE":
        return "col-span-1 md:col-span-2 row-span-2";
      case "WIDE":
        return "col-span-1 md:col-span-3 row-span-1";
      case "TALL":
        return "col-span-1 row-span-2";
      default:
        return "col-span-1 row-span-1";
    }
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    if (direction === "prev" && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (direction === "next" && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`group relative overflow-hidden bg-background-dark cursor-pointer ${getSizeClass(
              image.size,
            )}`}
            onClick={() => handleImageClick(index)}
          >
            {/* Image */}
            <Image
              src={image.image}
              alt={isArabic ? image.titleAr || image.titleEn : image.titleEn}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <h3 className="font-serif text-2xl text-white mb-2">
                  {isArabic ? image.titleAr || image.titleEn : image.titleEn}
                </h3>

                {image.location && (
                  <div className="flex items-center gap-2 text-gray-light text-sm mb-3">
                    <MapPin className="w-4 h-4 text-green-primary" />
                    <span>{image.location}</span>
                  </div>
                )}

                {(image.descriptionEn || image.descriptionAr) && (
                  <p className="text-gray-light text-sm line-clamp-2">
                    {isArabic
                      ? image.descriptionAr || image.descriptionEn
                      : image.descriptionEn}
                  </p>
                )}

                {/* Category Badge */}
                <div className="mt-4">
                  <span className="inline-block px-3 py-1 text-xs tracking-wider text-green-primary border border-green-primary/30 bg-green-primary/10">
                    {
                      categories.find((c) => c.key === image.category)?.[
                        isArabic ? "labelAr" : "labelEn"
                      ]
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Green border on hover */}
            <div className="absolute inset-0 border-2 border-green-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={images}
        currentIndex={currentImageIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={handleNavigate}
        isOpen={lightboxOpen}
        locale={locale}
      />
    </>
  );
}

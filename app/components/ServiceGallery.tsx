"use client";

import { useState } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";

interface ServiceGalleryProps {
  images: string[];
  serviceTitle: string;
  serviceSlug: string;
  locale: string;
  galleryTitle: string;
}

export default function ServiceGallery({
  images,
  serviceTitle,
  serviceSlug,
  locale,
  galleryTitle,
}: ServiceGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setModalImageIndex(index);
    setModalOpen(true);
  };

  const handleNavigate = (newIndex: number) => {
    setModalImageIndex(newIndex);
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <h2 className="font-serif text-3xl text-white mb-8 text-center">
          {galleryTitle}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden group cursor-pointer ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
              onClick={() => handleImageClick(index)}
            >
              <div
                className={`relative ${
                  index === 0 ? "aspect-square" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image}
                  alt={`${serviceTitle} - Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes={index === 0 ? "50vw" : "25vw"}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-green-primary/90 px-4 py-2 text-black text-sm font-medium">
                    {locale === "ar" ? "عرض" : "View"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc={images[modalImageIndex]}
        imageAlt={`${serviceTitle} - Image ${modalImageIndex + 1}`}
        serviceTitle={serviceTitle}
        serviceSlug={serviceSlug}
        locale={locale}
        images={images}
        currentIndex={modalImageIndex}
        onNavigate={handleNavigate}
      />
    </>
  );
}

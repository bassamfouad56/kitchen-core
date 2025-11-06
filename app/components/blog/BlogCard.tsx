"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage?: string | null;
  category: string;
  author: string;
  readingTime: number;
  publishedAt: Date | null;
  locale: string;
  index: number;
  isInView: boolean;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  featuredImage,
  category,
  author,
  readingTime,
  publishedAt,
  locale,
  index,
  isInView,
}: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isArabic = locale === "ar";

  const formattedDate = publishedAt
    ? new Intl.DateTimeFormat(isArabic ? "ar-SA" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(publishedAt))
    : "";

  return (
    <Link href={`/${locale}/blog/${slug}`} className="block group">
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative h-full"
      >
        {/* Glow Effect Background */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-br from-green-vibrant/20 via-green-primary/10 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        />

        <div className="relative bg-gradient-to-br from-gray-dark/50 via-background-elevated to-gray-dark/30 border border-gray-dark hover:border-green-primary/60 overflow-hidden transition-all duration-500 h-full hover:shadow-2xl hover:shadow-green-primary/20 backdrop-blur-sm rounded-lg">
          {/* Corner Accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-vibrant/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-green-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Featured Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            {/* Dynamic Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-dark via-black to-gray-dark">
              {/* Animated gradient orbs */}
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-green-vibrant/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-64 h-64 bg-green-primary/10 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
            </div>

            {featuredImage ? (
              <Image
                src={featuredImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-green-primary/20 text-6xl">📝</div>
              </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1.5 text-xs border border-green-primary/40 text-green-vibrant bg-black/80 backdrop-blur-sm rounded-sm uppercase tracking-wide">
                {category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs text-gray-light mb-4">
              <span>{author}</span>
              <span className="w-1 h-1 bg-green-primary/40 rounded-full" />
              <span>{formattedDate}</span>
              <span className="w-1 h-1 bg-green-primary/40 rounded-full" />
              <span>
                {readingTime} {isArabic ? "دقيقة" : "min read"}
              </span>
            </div>

            {/* Title */}
            <motion.h3
              className="text-2xl font-serif text-white mb-3 group-hover:text-green-vibrant transition-colors duration-300 line-clamp-2"
              animate={isHovered ? { x: 5 } : { x: 0 }}
            >
              {title}
            </motion.h3>

            {/* Excerpt */}
            <p className="text-gray-light text-sm leading-relaxed line-clamp-3 mb-4">
              {excerpt}
            </p>

            {/* Read More Link */}
            <motion.div
              className="flex items-center gap-2 text-green-vibrant text-sm font-light"
              animate={isHovered ? { x: 5 } : { x: 0 }}
            >
              <span>{isArabic ? "اقرأ المزيد" : "Read More"}</span>
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={isHovered ? { x: 5 } : { x: 0 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isArabic ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                />
              </motion.svg>
            </motion.div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

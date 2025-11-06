"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BlogCard from "./BlogCard";

interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string | null;
  excerptEn: string;
  excerptAr: string | null;
  featuredImage: string | null;
  category: string;
  author: string;
  readingTime: number;
  publishedAt: Date | null;
}

interface BlogGridProps {
  posts: BlogPost[];
  locale: string;
}

export default function BlogGrid({ posts, locale }: BlogGridProps) {
  const isArabic = locale === "ar";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (posts.length === 0) {
    return (
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="text-gray-light">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-green-primary/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p className="text-xl font-light">
              {isArabic
                ? "لا توجد مقالات منشورة حاليًا"
                : "No blog posts published yet"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-32 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(200, 225, 99, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(200, 225, 99, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard
              key={post.id}
              slug={post.slug}
              title={isArabic && post.titleAr ? post.titleAr : post.titleEn}
              excerpt={
                isArabic && post.excerptAr ? post.excerptAr : post.excerptEn
              }
              featuredImage={post.featuredImage}
              category={post.category}
              author={post.author}
              readingTime={post.readingTime}
              publishedAt={post.publishedAt}
              locale={locale}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  location: string;
  image: string;
  quote: string;
  rating: number;
  project: string;
}

// Fallback data in case CMS fetch fails
const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sheikh Mohammed Al-Rashid",
    title: "Private Palace Owner",
    location: "Dubai, UAE",
    image: "/9.jpg",
    quote: "Kitchen Core transformed our palace kitchen into a culinary masterpiece. The attention to detail and quality of craftsmanship is unparalleled. Every element speaks of luxury and functionality.",
    rating: 5,
    project: "Royal Palace Kitchen, Dubai",
  },
  {
    id: "2",
    name: "Isabella Rossi",
    title: "Villa Owner",
    location: "Monaco",
    image: "/10.jpg",
    quote: "Working with Kitchen Core was an absolute pleasure. They understood our vision for a Mediterranean villa kitchen and exceeded every expectation. The Italian marble selection and smart technology integration is flawless.",
    rating: 5,
    project: "Mediterranean Villa Kitchen",
  },
];

export default function Testimonials() {
  const locale = useLocale();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch testimonials from CMS
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true);
        const response = await fetch(`/api/cms/homepage?locale=${locale}`);
        if (response.ok) {
          const data = await response.json();
          if (data.testimonials && data.testimonials.length > 0) {
            setTestimonials(data.testimonials);
          }
        }
      } catch (error) {
        console.error('Error fetching testimonials from CMS:', error);
        // Keep fallback data on error
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, [locale]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-32 bg-background-elevated border-y border-gray-dark">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light">
              CLIENT TESTIMONIALS
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
              Trusted by Elite Clientele
            </h2>
            <p className="text-lg text-gray-light max-w-2xl mx-auto font-light leading-relaxed">
              Hear from our distinguished clients about their experience with Kitchen Core.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-background-card border border-gray-dark p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Client Image */}
                <div className="flex-shrink-0">
                  <div
                    className="w-24 h-24 rounded-full bg-cover bg-center border-2 border-green-primary"
                    style={{ backgroundImage: `url(${currentTestimonial.image})` }}
                  />
                </div>

                {/* Testimonial Content */}
                <div className="flex-1">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-green-vibrant fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-white font-light leading-relaxed mb-6 italic">
                    "{currentTestimonial.quote}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="border-t border-gray-dark pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="text-white font-medium text-lg">
                          {currentTestimonial.name}
                        </div>
                        <div className="text-gray-light text-sm">
                          {currentTestimonial.title}
                        </div>
                        <div className="text-green-primary text-sm mt-1">
                          {currentTestimonial.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-light text-sm">Project:</div>
                        <div className="text-white text-sm font-medium">
                          {currentTestimonial.project}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 border border-green-primary text-green-primary hover:bg-green-primary hover:text-black transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="p-3 border border-green-primary text-green-primary hover:bg-green-primary hover:text-black transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-green-primary w-8" : "bg-gray-dark"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

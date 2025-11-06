"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FounderSection() {
  return (
    <section
      id="founder"
      className="py-32 bg-background-card border-y border-gray-dark relative overflow-hidden"
    >
      {/* Subtle background glow effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-green-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-green-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light">
              MEET THE VISIONARY
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
              About the Founder
            </h2>
          </motion.div>
        </div>

        {/* Founder Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* CEO Image - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative group">
              {/* Image container with border */}
              <div className="relative aspect-[3/4] border-2 border-green-primary/40 hover:border-green-primary transition-all duration-500 overflow-hidden">
                <Image
                  src="/ceo.png"
                  alt="Founder and CEO - Kitchen Core"
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-105 "
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Decorative corner accents */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-l-2 border-t-2 border-green-primary" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-r-2 border-b-2 border-green-primary" />
            </div>
          </motion.div>

          {/* Founder Story - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            {/* Founder name and title */}
            <div className="mb-8">
              <h3 className="font-serif text-4xl text-white mb-2">
                Eng. Esam Odeh
              </h3>
              <p className="text-green-vibrant text-lg tracking-wide">
                Founder & Chief Executive Officer
              </p>
              <div className="w-16 h-px bg-green-primary mt-4" />
            </div>

            {/* Founder story */}
            <div className="space-y-6 text-gray-light leading-relaxed font-light">
              <p className="text-lg">
                With over{" "}
                <span className="text-green-primary font-normal">
                  two decades
                </span>{" "}
                of engineering excellence and unwavering passion for culinary
                design, Ahmad Al-Khateeb founded Kitchen Core with a singular
                vision: to revolutionize luxury kitchen experiences across the
                Middle East and beyond.
              </p>
              <p>
                Beginning his career as a mechanical engineer specializing in
                HVAC and building systems, Ahmad quickly recognized the untapped
                potential in luxury residential kitchens. His unique blend of
                technical expertise and artistic sensibility led him to pursue
                advanced studies in Italian kitchen design and craftsmanship.
              </p>
              <p>
                <span className="text-white italic">
                  "A kitchen is not merely a functional space—it is the heart of
                  the home, where memories are created and traditions are
                  preserved,"
                </span>
                Ahmad often says. This philosophy drives every project Kitchen
                Core undertakes.
              </p>
              <p>
                Under his leadership, Kitchen Core has completed over 150
                prestigious projects for royal palaces, luxury villas, and
                exclusive estates across 25 countries, earning recognition from{" "}
                <span className="text-green-primary font-normal">
                  Architectural Digest
                </span>
                ,
                <span className="text-green-primary font-normal">
                  {" "}
                  Luxury Home Design
                </span>
                , and numerous international design awards.
              </p>
            </div>

            {/* Key Achievements */}
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div className="border-l-2 border-green-primary pl-6">
                <div className="text-green-vibrant text-sm tracking-widest mb-2">
                  EDUCATION
                </div>
                <div className="text-white font-light text-sm leading-relaxed">
                  MEng Mechanical Engineering
                  <br />
                  Advanced Italian Kitchen Design
                  <br />
                  PMP & LEED Certified
                </div>
              </div>
              <div className="border-l-2 border-green-primary pl-6">
                <div className="text-green-vibrant text-sm tracking-widest mb-2">
                  RECOGNITION
                </div>
                <div className="text-white font-light text-sm leading-relaxed">
                  Best Design Award 2024
                  <br />
                  Excellence in Innovation
                  <br />
                  Industry Leadership
                </div>
              </div>
            </div>

            {/* Personal Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 bg-green-primary/5 border-l-4 border-green-primary p-6"
            >
              <p className="text-white italic text-lg leading-relaxed">
                "Excellence is not a destination—it is a continuous journey of
                innovation, craftsmanship, and dedication to creating spaces
                that inspire culinary artistry."
              </p>
              <p className="text-green-vibrant text-sm mt-4 tracking-wide">
                — Ahmad Al-Khateeb
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

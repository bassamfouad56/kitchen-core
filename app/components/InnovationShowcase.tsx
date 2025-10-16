"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Innovation {
  title: string;
  category: string;
  description: string;
  specs: string[];
  impact: string;
  icon: React.ReactElement;
}

const innovations: Innovation[] = [
  {
    title: "Smart Climate Control",
    category: "IoT Integration",
    description:
      "AI-powered HVAC systems that automatically adjust temperature and humidity based on cooking activity, time of day, and occupancy patterns.",
    specs: [
      "±0.5°C temperature precision",
      "Smart zone management (up to 4 zones)",
      "Voice control integration (Alexa, Google, HomeKit)",
      "Energy consumption analytics",
    ],
    impact: "35% reduction in energy costs",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
  },
  {
    title: "Advanced Ventilation Systems",
    category: "Engineering",
    description:
      "Custom-engineered downdraft and ceiling extraction systems with variable CFM capacity, noise reduction technology, and automated grease management.",
    specs: [
      "Up to 1200 CFM extraction capacity",
      "Noise level: <42 dB at max power",
      "Self-cleaning grease filters",
      "Heat recovery ventilation (HRV)",
    ],
    impact: "99.7% odor & smoke elimination",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Intelligent Lighting Architecture",
    category: "Smart Technology",
    description:
      "Layered lighting systems with task, ambient, and accent zones. Circadian rhythm adaptation, motion sensors, and scene presets for different activities.",
    specs: [
      "Color temperature: 2700K-6500K adjustable",
      "Motion-activated task lighting",
      "Wireless control via smartphone/tablet",
      "Integration with smart home ecosystems",
    ],
    impact: "Optimal illumination for every task",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    title: "Acoustic Dampening Solutions",
    category: "Engineering",
    description:
      "Proprietary sound-absorbing materials and design techniques that minimize kitchen noise, from appliance operation to closing cabinetry.",
    specs: [
      "Soft-close mechanisms on all cabinetry",
      "Vibration-isolated appliance mounting",
      "Sound-absorbing panel integration",
      "Noise reduction: 15-25 dB",
    ],
    impact: "Whisper-quiet operation",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
        />
      </svg>
    ),
  },
  {
    title: "Water Management Systems",
    category: "Sustainability",
    description:
      "Smart water filtration, instant hot water systems, and greywater recycling integration for environmentally conscious luxury kitchens.",
    specs: [
      "Multi-stage filtration (0.5 micron)",
      "Instant boiling water taps (99°C)",
      "Water usage monitoring & analytics",
      "Leak detection with automatic shutoff",
    ],
    impact: "30% water consumption reduction",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  {
    title: "Integrated Security & Access",
    category: "Smart Technology",
    description:
      "Biometric access control, surveillance integration, and inventory management systems for high-security luxury kitchens.",
    specs: [
      "Fingerprint & facial recognition",
      "Smart lock integration",
      "RFID-tagged appliances & inventory",
      "24/7 remote monitoring capability",
    ],
    impact: "Enterprise-grade security",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
];

// Innovation Card Component
function InnovationCard({
  innovation,
  index,
}: {
  innovation: Innovation;
  index: number;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-background-card border border-gray-dark hover:border-green-primary transition-all duration-500 p-8 relative overflow-hidden"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-green-glow opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-16 h-16 bg-green-primary/10 border border-green-primary flex items-center justify-center text-green-vibrant mb-6 group-hover:bg-green-primary/20 transition-colors duration-300">
          {innovation.icon}
        </div>

        {/* Category Badge */}
        <div className="inline-block bg-background-elevated border border-gray-dark px-3 py-1 text-green-vibrant text-xs tracking-wider mb-4">
          {innovation.category.toUpperCase()}
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-green-vibrant transition-colors duration-300">
          {innovation.title}
        </h3>

        {/* Description */}
        <p className="text-gray-light leading-relaxed mb-6 text-sm">
          {innovation.description}
        </p>

        {/* Specs */}
        <div className="mb-6">
          <div className="text-green-vibrant text-xs tracking-wider mb-3">
            SPECIFICATIONS
          </div>
          <ul className="space-y-2">
            {innovation.specs.map((spec, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-gray-light text-xs"
              >
                <svg
                  className="w-4 h-4 text-green-primary mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Impact */}
        <div className="pt-4 border-t border-gray-dark">
          <div className="flex items-center justify-between">
            <span className="text-green-vibrant text-xs tracking-wider">
              IMPACT
            </span>
            <span className="text-white text-sm font-medium">
              {innovation.impact}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function InnovationShowcase() {
  return (
    <section
      id="innovation"
      className="py-32 bg-black relative overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(5, 150, 105, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(5, 150, 105, 0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-vibrant/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light">
              INNOVATION & TECHNOLOGY
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
              Engineering the Future
            </h2>
            <p className="text-lg text-gray-light max-w-3xl mx-auto font-light leading-relaxed">
              Our proprietary technologies and engineering innovations set new
              standards in luxury kitchen design. From smart automation to
              advanced environmental systems, we integrate cutting-edge
              solutions seamlessly.
            </p>
          </motion.div>
        </div>

        {/* Innovations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {innovations.map((innovation, index) => (
            <InnovationCard
              key={innovation.title}
              innovation={innovation}
              index={index}
            />
          ))}
        </div>

        {/* Technology Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-background-elevated border border-green-primary/30 p-12"
        >
          <div className="text-center mb-8">
            <h3 className="font-serif text-3xl text-white mb-4">
              Technology Partnerships
            </h3>
            <p className="text-gray-light max-w-2xl mx-auto">
              We collaborate with the world's leading technology providers to
              deliver cutting-edge smart home integration and innovation.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Control4", category: "Home Automation" },
              { name: "Lutron", category: "Lighting Control" },
              { name: "Sonos", category: "Audio Systems" },
              { name: "Ring", category: "Security Integration" },
            ].map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group cursor-pointer"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-background-card border border-gray-dark group-hover:border-green-primary transition-colors duration-300 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-light group-hover:text-green-vibrant transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="text-white font-medium mb-1">
                  {partner.name}
                </div>
                <div className="text-gray-light text-xs">
                  {partner.category}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 lg:grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "25+", label: "Proprietary Technologies" },
            { number: "50+", label: "Smart Device Integrations" },
            { number: "99.9%", label: "System Uptime" },
            { number: "24/7", label: "Remote Support" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-background-card border border-gray-dark p-6 hover:border-green-primary transition-colors duration-300"
            >
              <div className="font-serif text-4xl text-green-vibrant mb-2">
                {stat.number}
              </div>
              <div className="text-xs tracking-wider text-gray-light uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

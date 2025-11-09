"use client";

import React, { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  duration: string;
  iconName: string;
}

// Icon mapping system
const iconMap: Record<string, React.ReactElement> = {
  "consultation": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  "design": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  "approval": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "fabrication": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  "installation": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  "handover": (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};

// Fallback data
const fallbackProcessSteps: ProcessStep[] = [
  {
    id: "1",
    number: "01",
    title: "Discovery & Consultation",
    description: "We begin with an in-depth consultation to understand your vision, lifestyle, and requirements. Our design team visits your property to assess space and architectural considerations.",
    duration: "1-2 weeks",
    iconName: "consultation",
  },
  {
    id: "2",
    number: "02",
    title: "Design & Planning",
    description: "Our architects create detailed 3D renderings and technical drawings. We curate premium materials, appliances, and finishes tailored to your aesthetic preferences and functional needs.",
    duration: "3-4 weeks",
    iconName: "design",
  },
  {
    id: "3",
    number: "03",
    title: "Approval & Refinement",
    description: "We present comprehensive design proposals and walk you through every detail. Revisions are made until the design perfectly aligns with your expectations and specifications.",
    duration: "1-2 weeks",
    iconName: "approval",
  },
  {
    id: "4",
    number: "04",
    title: "Fabrication & Sourcing",
    description: "Custom cabinetry is handcrafted by master artisans. Premium appliances and materials are sourced from leading European manufacturers and prepared for installation.",
    duration: "6-10 weeks",
    iconName: "fabrication",
  },
  {
    id: "5",
    number: "05",
    title: "Installation & Fit-Out",
    description: "Our certified installation team brings your kitchen to life with precision and care. Every element is installed to exact specifications, ensuring flawless integration and functionality.",
    duration: "4-8 weeks",
    iconName: "installation",
  },
  {
    id: "6",
    number: "06",
    title: "Final Touches & Handover",
    description: "Quality inspection, technology setup, and final styling ensure everything is perfect. We provide comprehensive training on appliances and smart systems, followed by ongoing support.",
    duration: "1 week",
    iconName: "handover",
  },
];

// Process Step Component
function ProcessStepCard({ step, index }: { step: ProcessStep; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isEven = index % 2 === 0;
  const stepIcon = iconMap[step.iconName] || iconMap["consultation"]; // fallback to consultation icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative grid md:grid-cols-2 gap-8 items-center ${isEven ? "" : "md:text-right"}`}
    >
      {/* Content */}
      <div className={`${isEven ? "md:pr-12" : "md:pl-12 md:col-start-2"}`}>
        <div className={`bg-background-card border border-gray-dark p-8 hover:border-green-primary/40 transition-colors duration-500 ${isEven ? "" : "md:text-left"}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-primary/10 border border-green-primary flex items-center justify-center text-green-vibrant">
              {stepIcon}
            </div>
            <div className="text-5xl font-serif text-green-primary/30">
              {step.number}
            </div>
          </div>
          <h3 className="text-2xl font-serif text-white mb-4">
            {step.title}
          </h3>
          <p className="text-gray-light leading-relaxed mb-4">
            {step.description}
          </p>
          <div className="flex items-center gap-2 text-green-vibrant text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{step.duration}</span>
          </div>
        </div>
      </div>

      {/* Timeline Node */}
      <div className={`hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${isEven ? "md:col-start-2" : ""}`}>
        <div className="w-4 h-4 bg-green-primary rounded-full border-4 border-black" />
      </div>
    </motion.div>
  );
}

export default function ProcessTimeline() {
  const locale = useLocale();
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(fallbackProcessSteps);
  const [loading, setLoading] = useState(true);

  // Fetch process steps from CMS
  useEffect(() => {
    async function fetchProcessSteps() {
      try {
        setLoading(true);
        const response = await fetch(`/api/cms/homepage?locale=${locale}`);
        if (response.ok) {
          const data = await response.json();
          if (data.processSteps && data.processSteps.length > 0) {
            setProcessSteps(data.processSteps);
          }
        }
      } catch (error) {
        console.error('Error fetching process steps from CMS:', error);
        // Keep fallback data on error
      } finally {
        setLoading(false);
      }
    }
    fetchProcessSteps();
  }, [locale]);

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light">
              OUR PROCESS
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
              From Vision to Reality
            </h2>
            <p className="text-lg text-gray-light max-w-2xl mx-auto font-light leading-relaxed">
              Our proven six-step process ensures exceptional results from initial consultation to final handover.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-green-primary via-green-primary to-transparent" />

          {/* Process Steps */}
          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <ProcessStepCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Total Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-background-elevated border border-green-primary/30 px-8 py-6">
            <div className="text-sm text-green-vibrant tracking-wider mb-2">
              TYPICAL PROJECT TIMELINE
            </div>
            <div className="text-4xl font-serif text-white">
              16-27 Weeks
            </div>
            <div className="text-sm text-gray-light mt-2">
              From consultation to completion
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

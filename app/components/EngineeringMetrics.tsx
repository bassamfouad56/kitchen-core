"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Metric {
  label: string;
  value: number;
  unit: string;
  description: string;
  icon: React.ReactElement;
}

const metrics: Metric[] = [
  {
    label: "Average Project Size",
    value: 675,
    unit: "sq ft",
    description: "Typical luxury kitchen footprint",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
      </svg>
    ),
  },
  {
    label: "On-Time Completion",
    value: 98,
    unit: "%",
    description: "Projects delivered on schedule",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Quality Score",
    value: 99.2,
    unit: "/100",
    description: "Average client satisfaction rating",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    label: "Custom Solutions",
    value: 87,
    unit: "%",
    description: "Projects with bespoke elements",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
];

const performanceData = [
  { category: "Natural Stone", percentage: 45, color: "bg-green-vibrant" },
  { category: "Engineered Quartz", percentage: 30, color: "bg-green-primary" },
  { category: "Wood Cabinetry", percentage: 85, color: "bg-green-dark" },
  { category: "Smart Systems", percentage: 65, color: "bg-green-vibrant" },
];

const projectBreakdown = [
  { type: "Palace Kitchens", count: 45, percentage: 30 },
  { type: "Villa Kitchens", count: 62, percentage: 41 },
  { type: "Estate Kitchens", count: 28, percentage: 19 },
  { type: "Penthouse Kitchens", count: 15, percentage: 10 },
];

// Metric Card Component
function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-background-card border border-gray-dark hover:border-green-primary transition-all duration-500 p-6 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-green-primary/10 border border-green-primary flex items-center justify-center text-green-vibrant group-hover:bg-green-primary/20 transition-colors">
          {metric.icon}
        </div>
      </div>
      <div className="mb-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          className="flex items-baseline gap-1"
        >
          <span className="font-serif text-5xl text-white group-hover:text-green-vibrant transition-colors">
            {metric.value}
          </span>
          <span className="text-xl text-green-primary">{metric.unit}</span>
        </motion.div>
      </div>
      <div className="text-white text-sm font-medium mb-1">{metric.label}</div>
      <div className="text-gray-light text-xs">{metric.description}</div>
    </motion.div>
  );
}

// Performance Bar Component
function PerformanceBar({ data, index }: { data: { category: string; percentage: number; color: string }; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-white text-sm font-medium">{data.category}</span>
        <span className="text-green-vibrant text-sm font-medium">
          {data.percentage}%
        </span>
      </div>
      <div className="h-3 bg-background-elevated border border-gray-dark overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${data.percentage}%` } : {}}
          transition={{ duration: 1, delay: index * 0.2 }}
          className={`h-full ${data.color}`}
        />
      </div>
    </div>
  );
}

export default function EngineeringMetrics() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(5, 150, 105, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(5, 150, 105, 0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light">
              PERFORMANCE METRICS
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
              By The Numbers
            </h2>
            <p className="text-lg text-gray-light max-w-2xl mx-auto font-light leading-relaxed">
              Data-driven excellence. Our metrics showcase our commitment to precision,
              quality, and client satisfaction across every project dimension.
            </p>
          </motion.div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </div>

        {/* Performance Bars */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Material Usage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background-card border border-gray-dark p-8"
          >
            <h3 className="font-serif text-3xl text-white mb-2">Material Preferences</h3>
            <p className="text-gray-light text-sm mb-8">
              Most popular materials specified across our luxury projects
            </p>
            <div className="space-y-6">
              {performanceData.map((data, index) => (
                <PerformanceBar key={data.category} data={data} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Project Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background-card border border-gray-dark p-8"
          >
            <h3 className="font-serif text-3xl text-white mb-2">Project Portfolio</h3>
            <p className="text-gray-light text-sm mb-8">
              Distribution of completed projects by property type
            </p>
            <div className="space-y-4">
              {projectBreakdown.map((project, index) => (
                <motion.div
                  key={project.type}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between p-4 bg-background-elevated border border-gray-dark hover:border-green-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-primary/10 border border-green-primary flex items-center justify-center">
                      <span className="font-serif text-xl text-green-vibrant">
                        {project.count}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-medium">{project.type}</div>
                      <div className="text-gray-light text-xs">{project.percentage}% of total</div>
                    </div>
                  </div>
                  <div className="text-green-vibrant text-2xl font-serif">{project.percentage}%</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-background-elevated border border-green-primary/30 p-12"
        >
          <h3 className="font-serif text-3xl text-white text-center mb-12">
            Engineering Capabilities
          </h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { label: "Countries Served", value: "25+" },
              { label: "Master Craftsmen", value: "40+" },
              { label: "Partner Brands", value: "30+" },
              { label: "Avg. Budget", value: "$450K" },
              { label: "Timeline", value: "20 weeks" },
              { label: "Warranty", value: "10 years" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-serif text-4xl text-green-vibrant mb-2">{stat.value}</div>
                <div className="text-xs tracking-wider text-gray-light uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Specifications Download CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-green-darker/20 to-transparent border border-green-primary/30 p-12 text-center"
        >
          <svg
            className="w-16 h-16 text-green-vibrant mx-auto mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="font-serif text-3xl text-white mb-4">
            Full Technical Documentation
          </h3>
          <p className="text-gray-light max-w-2xl mx-auto mb-8">
            Download our comprehensive technical specifications, material catalog, and
            engineering standards documentation. Includes CAD templates and integration guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-green-primary text-black text-sm tracking-wider font-medium hover:bg-green-vibrant transition-all duration-300 shadow-lg shadow-green-primary/20">
              DOWNLOAD TECHNICAL PACK
            </button>
            <button className="px-8 py-4 border border-green-primary text-green-primary text-sm tracking-wider font-medium hover:bg-green-primary/10 transition-all duration-300">
              REQUEST CUSTOM SPECS
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

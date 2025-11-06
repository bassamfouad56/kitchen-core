"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import type { Company } from "@/types/about";

interface CompanyStatsProps {
  company: Company;
  locale: string;
}

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * (end - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [shouldStart, end, duration]);

  return { count, start: () => setShouldStart(true) };
}

export default function CompanyStats({ company, locale }: CompanyStatsProps) {
  const isArabic = locale === "ar";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      number: company.projectsCompleted || "150+",
      label: isArabic ? "مشروع فاخر" : "Luxury Projects",
      useCounter: true,
      end: parseInt(company.projectsCompleted?.replace(/\D/g, "") || "150"),
    },
    {
      number: company.countriesServed || "25+",
      label: isArabic ? "دولة" : "Countries",
      useCounter: true,
      end: parseInt(company.countriesServed?.replace(/\D/g, "") || "25"),
    },
    {
      number: company.yearsOfExperience || "15",
      label: isArabic ? "سنة خبرة" : "Years Excellence",
      useCounter: true,
      end: parseInt(company.yearsOfExperience?.replace(/\D/g, "") || "15"),
    },
    {
      number: company.employeeCount || "50+",
      label: isArabic ? "خبير متخصص" : "Expert Specialists",
      useCounter: true,
      end: parseInt(company.employeeCount?.replace(/\D/g, "") || "50"),
    },
  ];

  return (
    <section
      ref={ref}
      className="py-24 bg-background-elevated border-y border-gray-dark relative overflow-hidden"
    >
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              isInView={isInView}
              isArabic={isArabic}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  index,
  isInView,
  isArabic,
}: {
  stat: {
    number: string;
    label: string;
    useCounter: boolean;
    end: number;
  };
  index: number;
  isInView: boolean;
  isArabic: boolean;
}) {
  const { count, start } = useCounter(stat.end);

  useEffect(() => {
    if (isInView) {
      start();
    }
  }, [isInView, start]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group"
    >
      {/* Decorative Top Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : {}}
        transition={{ delay: index * 0.15 + 0.3, duration: 0.8 }}
        className="h-px bg-gradient-to-r from-transparent via-green-primary to-transparent mb-8"
      />

      {/* Number with Counter Animation */}
      <div className="font-serif text-6xl md:text-7xl text-green-vibrant mb-4 group-hover:scale-110 transition-transform duration-500">
        {stat.useCounter ? `${count}+` : stat.number}
      </div>

      {/* Label */}
      <div className="text-sm tracking-widest text-gray-light uppercase font-light">
        {stat.label}
      </div>

      {/* Hover Effect Bottom Line */}
      <motion.div
        initial={{ width: 0 }}
        whileHover={{ width: "60%" }}
        className="h-px bg-green-primary mx-auto mt-6"
      />
    </motion.div>
  );
}

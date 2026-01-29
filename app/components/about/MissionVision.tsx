"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Users, MessageCircle, Lightbulb, Award, Shield, Sparkles } from "lucide-react";

interface MissionVisionProps {
  locale: string;
}

const content = {
  en: {
    badge: "WHO WE ARE",
    title: "Kitchen",
    titleHighlight: "Core",
    about: {
      badge: "OUR STORY",
      title: "UAE & Jordan",
      description: "Kitchen Core operates across the UAE and Jordan, specializing in the design, manufacture, and installation of kitchens, wardrobes, washbasins, and TV units. The company focuses on attracting professional expertise and qualified labor from the region, ensuring high-quality execution by providing comprehensive consultations to assist clients in making decisions that suit their needs.",
      features: [
        {
          icon: MapPin,
          title: "UAE & Jordan",
          description: "Serving clients across both countries"
        },
        {
          icon: Users,
          title: "Professional Expertise",
          description: "Qualified labor and regional expertise"
        },
        {
          icon: MessageCircle,
          title: "Local Communication",
          description: "Consultations in your preferred language"
        }
      ]
    },
    innovation: {
      badge: "OUR PHILOSOPHY",
      title: "Innovation & Excellence",
      description: "Kitchen Core is committed to developing modern, innovative solutions that meet diverse customer needs. The company believes that every kitchen should be an icon of beauty and perfection, reflecting the unique personality of each home. Adhering to the highest quality standards and using the finest materials, Kitchen Core strives to preserve the character and heritage of Gulf kitchens while integrating the latest technologies and global trends.",
      features: [
        {
          icon: Lightbulb,
          title: "Modern Innovation",
          description: "Cutting-edge solutions for diverse needs"
        },
        {
          icon: Award,
          title: "Highest Standards",
          description: "Premium materials and craftsmanship"
        },
        {
          icon: Shield,
          title: "Gulf Heritage",
          description: "Preserving tradition with modern tech"
        },
        {
          icon: Sparkles,
          title: "Unique Design",
          description: "Every kitchen is an icon of beauty"
        }
      ]
    }
  },
  ar: {
    badge: "من نحن",
    title: "كيتشن",
    titleHighlight: "كور",
    about: {
      badge: "قصتنا",
      title: "الإمارات والأردن",
      description: "تعمل شركة كيتشن كور في الإمارات العربية المتحدة والأردن، وتختص في تصميم وتصنيع وتركيب المطابخ والدواليب والمغاسل ويونتات التلفزيون. تركز الشركة على استقطاب الخبرات المهنية والأيدي العاملة المؤهلة من المنطقة، لضمان جودة التنفيذ العالية من خلال تقديم استشارات شاملة لمساعدة العملاء في اتخاذ قرارات تناسب احتياجاتهم.",
      features: [
        {
          icon: MapPin,
          title: "الإمارات والأردن",
          description: "نخدم العملاء في كلا البلدين"
        },
        {
          icon: Users,
          title: "خبرات مهنية",
          description: "أيدي عاملة مؤهلة وخبرات إقليمية"
        },
        {
          icon: MessageCircle,
          title: "تواصل محلي",
          description: "استشارات بلغتك المفضلة"
        }
      ]
    },
    innovation: {
      badge: "فلسفتنا",
      title: "الابتكار والتميز",
      description: "تلتزم شركة كيتشن كور بتطوير حلول عصرية ومبتكرة تلبي احتياجات العملاء المتنوعة. تؤمن الشركة بأن كل مطبخ يجب أن يكون أيقونة للجمال والإتقان، يعكس شخصية المنزل الفريدة. ومن خلال الالتزام بأعلى معايير الجودة واستخدام أفضل المواد، تسعى كيتشن كور للحفاظ على طابع المطابخ الخليجية وتراثها، مع دمج أحدث التقنيات والاتجاهات العالمية.",
      features: [
        {
          icon: Lightbulb,
          title: "ابتكار عصري",
          description: "حلول متطورة لاحتياجات متنوعة"
        },
        {
          icon: Award,
          title: "أعلى المعايير",
          description: "مواد فاخرة وحرفية عالية"
        },
        {
          icon: Shield,
          title: "التراث الخليجي",
          description: "الحفاظ على التقاليد مع التقنية الحديثة"
        },
        {
          icon: Sparkles,
          title: "تصميم فريد",
          description: "كل مطبخ أيقونة للجمال"
        }
      ]
    }
  }
};

export default function MissionVision({ locale }: MissionVisionProps) {
  const isArabic = locale === "ar";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = isArabic ? content.ar : content.en;

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 bg-gradient-to-b from-black via-background-dark to-black relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(200, 225, 99, 0.15) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-green-vibrant text-sm tracking-[0.3em] font-light block mb-4">
            {t.badge}
          </span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white">
            {t.title}{" "}
            <span className="text-green-vibrant">{t.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group"
          >
            <div className="relative h-full">
              {/* Decorative Corner */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-l-2 border-t-2 border-green-primary/50 group-hover:border-green-primary transition-colors duration-500" />

              <div className="bg-background-card/50 backdrop-blur-sm border border-gray-dark hover:border-green-primary/40 p-8 lg:p-10 transition-all duration-500 relative overflow-hidden h-full">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Badge */}
                  <p className="text-green-vibrant text-xs tracking-[0.3em] mb-4 font-light uppercase">
                    {t.about.badge}
                  </p>

                  {/* Title */}
                  <h3 className="font-serif text-3xl lg:text-4xl text-white mb-6 group-hover:text-green-vibrant transition-colors duration-500">
                    {t.about.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-16 h-px bg-green-primary mb-6" />

                  {/* Description */}
                  <p className="text-gray-light leading-relaxed font-light text-base lg:text-lg mb-8">
                    {t.about.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid gap-4">
                    {t.about.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="flex items-start gap-4 p-4 bg-black/30 border border-gray-dark/50 hover:border-green-primary/30 transition-colors duration-300"
                      >
                        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-green-primary/40 text-green-vibrant">
                          <feature.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                          <p className="text-gray-light text-sm">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-r-2 border-b-2 border-green-primary/50 group-hover:border-green-primary transition-colors duration-500" />
            </div>
          </motion.div>

          {/* Innovation Section */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group"
          >
            <div className="relative h-full">
              {/* Decorative Corner */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-l-2 border-t-2 border-green-primary/50 group-hover:border-green-primary transition-colors duration-500" />

              <div className="bg-background-card/50 backdrop-blur-sm border border-gray-dark hover:border-green-primary/40 p-8 lg:p-10 transition-all duration-500 relative overflow-hidden h-full">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Badge */}
                  <p className="text-green-vibrant text-xs tracking-[0.3em] mb-4 font-light uppercase">
                    {t.innovation.badge}
                  </p>

                  {/* Title */}
                  <h3 className="font-serif text-3xl lg:text-4xl text-white mb-6 group-hover:text-green-vibrant transition-colors duration-500">
                    {t.innovation.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-16 h-px bg-green-primary mb-6" />

                  {/* Description */}
                  <p className="text-gray-light leading-relaxed font-light text-base lg:text-lg mb-8">
                    {t.innovation.description}
                  </p>

                  {/* Features Grid - 2x2 */}
                  <div className="grid grid-cols-2 gap-4">
                    {t.innovation.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="p-4 bg-black/30 border border-gray-dark/50 hover:border-green-primary/30 transition-all duration-300 text-center group/item"
                      >
                        <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center border border-green-primary/40 text-green-vibrant group-hover/item:bg-green-primary/10 transition-colors duration-300">
                          <feature.icon className="w-6 h-6" />
                        </div>
                        <h4 className="text-white font-medium text-sm mb-1">{feature.title}</h4>
                        <p className="text-gray-light text-xs">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-r-2 border-b-2 border-green-primary/50 group-hover:border-green-primary transition-colors duration-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

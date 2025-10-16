"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Material {
  name: string;
  type: string;
  origin: string;
  properties: string[];
  durability: number;
  image: string;
}

const materials: Material[] = [
  {
    name: "Calacatta Gold Marble",
    type: "Natural Stone",
    origin: "Carrara, Italy",
    properties: ["Heat Resistant", "Scratch Resistant", "Luxury Finish"],
    durability: 95,
    image: "/8.jpg",
  },
  {
    name: "American Walnut",
    type: "Hardwood",
    origin: "USA (Sustainably Sourced)",
    properties: ["FSC Certified", "Water Resistant Finish", "Handcrafted"],
    durability: 90,
    image: "/8.jpg",
  },
  {
    name: "Nero Marquina",
    type: "Natural Stone",
    origin: "Markina, Spain",
    properties: ["Deep Black Finish", "Polished Surface", "Calcite Veining"],
    durability: 93,
    image: "/8.jpg",
  },
  {
    name: "European Oak",
    type: "Hardwood",
    origin: "France & Germany",
    properties: ["PEFC Certified", "Natural Grain", "UV Protected"],
    durability: 88,
    image: "/8.jpg",
  },
];

interface Appliance {
  brand: string;
  model: string;
  category: string;
  specs: string[];
  features: string[];
  powerRating: string;
}

const appliances: Appliance[] = [
  {
    brand: "Sub-Zero",
    model: "PRO 48 with Glass Door",
    category: "Refrigeration",
    specs: ["Dual Refrigeration", "NASA-Inspired Air Purification", "48\" Width"],
    features: ["WiFi Enabled", "Touch Control Panel", "LED Lighting"],
    powerRating: "115V / 15A",
  },
  {
    brand: "Wolf",
    model: "48\" Dual Fuel Range",
    category: "Cooking",
    specs: ["Dual-Stacked Burners", "18,000 BTU", "Infrared Charbroiler"],
    features: ["Red Knobs Signature", "Convection Oven", "Self-Cleaning"],
    powerRating: "240V / 50A",
  },
  {
    brand: "Miele",
    model: "DGC 7865X Steam Oven",
    category: "Steam Cooking",
    specs: ["XXL Capacity", "M Touch Controls", "AutoSense Technology"],
    features: ["100 Programs", "WiFi Connectivity", "Descaling Alert"],
    powerRating: "240V / 30A",
  },
  {
    brand: "Gaggenau",
    model: "Vario 400 Series Cooktop",
    category: "Induction",
    specs: ["Full Surface Induction", "TFT Touch Display", "FlexInduction Zones"],
    features: ["Timer Functions", "Power Boost", "Child Lock"],
    powerRating: "240V / 40A",
  },
];

export default function TechnicalSpecs() {
  const [activeTab, setActiveTab] = useState<"materials" | "appliances">("materials");

  return (
    <section className="py-32 bg-background-elevated relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light">
              TECHNICAL EXCELLENCE
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
              Materials & Technology
            </h2>
            <p className="text-lg text-gray-light max-w-2xl mx-auto font-light leading-relaxed">
              Premium materials sourced from the world's finest suppliers, integrated with
              cutting-edge appliances from industry leaders.
            </p>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("materials")}
            className={`px-8 py-3 text-sm tracking-wider font-medium border transition-all duration-300 ${
              activeTab === "materials"
                ? "bg-green-primary text-black border-green-primary"
                : "bg-transparent text-gray-light border-gray-dark hover:border-green-primary hover:text-green-primary"
            }`}
          >
            MATERIALS LIBRARY
          </button>
          <button
            onClick={() => setActiveTab("appliances")}
            className={`px-8 py-3 text-sm tracking-wider font-medium border transition-all duration-300 ${
              activeTab === "appliances"
                ? "bg-green-primary text-black border-green-primary"
                : "bg-transparent text-gray-light border-gray-dark hover:border-green-primary hover:text-green-primary"
            }`}
          >
            APPLIANCE SPECIFICATIONS
          </button>
        </div>

        {/* Materials Tab */}
        {activeTab === "materials" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {materials.map((material, index) => (
              <motion.div
                key={material.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-background-card border border-gray-dark hover:border-green-primary transition-all duration-500"
              >
                {/* Material Image */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${material.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-card via-transparent to-transparent" />

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 bg-green-primary/90 text-black px-3 py-1.5 text-xs tracking-wider font-medium">
                    {material.type.toUpperCase()}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-green-vibrant transition-colors">
                    {material.name}
                  </h3>
                  <p className="text-gray-light text-sm mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {material.origin}
                  </p>

                  {/* Properties */}
                  <div className="mb-4">
                    <div className="text-green-vibrant text-xs tracking-wider mb-3">PROPERTIES</div>
                    <div className="flex flex-wrap gap-2">
                      {material.properties.map((prop, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-background-elevated border border-gray-dark text-gray-light text-xs"
                        >
                          {prop}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Durability Rating */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-green-vibrant text-xs tracking-wider">
                        DURABILITY RATING
                      </span>
                      <span className="text-white font-medium">{material.durability}%</span>
                    </div>
                    <div className="h-2 bg-background-elevated border border-gray-dark overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${material.durability}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-green-primary to-green-vibrant"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Appliances Tab */}
        {activeTab === "appliances" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {appliances.map((appliance, index) => (
              <motion.div
                key={appliance.model}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background-card border border-gray-dark hover:border-green-primary transition-all duration-500 p-8"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-green-vibrant text-sm tracking-wider mb-2">
                      {appliance.brand.toUpperCase()}
                    </div>
                    <h3 className="font-serif text-2xl text-white mb-1">{appliance.model}</h3>
                    <p className="text-gray-light text-sm">{appliance.category}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-primary/10 border border-green-primary flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-vibrant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                </div>

                {/* Specifications */}
                <div className="mb-6">
                  <div className="text-green-vibrant text-xs tracking-wider mb-3">
                    SPECIFICATIONS
                  </div>
                  <ul className="space-y-2">
                    {appliance.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-light text-sm">
                        <span className="w-1.5 h-1.5 bg-green-vibrant mt-2 flex-shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <div className="text-green-vibrant text-xs tracking-wider mb-3">FEATURES</div>
                  <div className="flex flex-wrap gap-2">
                    {appliance.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-background-elevated border border-gray-dark text-gray-light text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Power Rating */}
                <div className="pt-6 border-t border-gray-dark">
                  <div className="flex items-center justify-between">
                    <span className="text-green-vibrant text-xs tracking-wider">POWER RATING</span>
                    <span className="text-white font-medium">{appliance.powerRating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-background-card border border-green-primary/30 p-8 max-w-3xl mx-auto">
            <h3 className="font-serif text-3xl text-white mb-4">
              Need Detailed Specifications?
            </h3>
            <p className="text-gray-light mb-6 leading-relaxed">
              Download our complete materials catalog and appliance integration guide, or
              schedule a consultation to discuss your project requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-green-primary text-black text-sm tracking-wider font-medium hover:bg-green-vibrant transition-all duration-300">
                DOWNLOAD CATALOG
              </button>
              <button className="px-8 py-3 border border-green-primary text-green-primary text-sm tracking-wider font-medium hover:bg-green-primary/10 transition-all duration-300">
                SCHEDULE CONSULTATION
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

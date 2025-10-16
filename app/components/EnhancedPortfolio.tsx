"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  title: string;
  location: string;
  category: string;
  image: string;
  description: string;
  year: string;
  area: string;
  budget: string;
  specs: {
    materials: string[];
    appliances: string[];
    features: string[];
  };
  technical: {
    duration: string;
    challenges: string;
    innovations: string[];
  };
}

const portfolioProjects: Project[] = [
  {
    id: 1,
    title: "Royal Palace Kitchen",
    location: "Dubai, UAE",
    category: "Palace",
    image: "/2.jpg",
    description: "Bespoke culinary masterpiece featuring Italian marble and smart technology",
    year: "2024",
    area: "850 sq ft",
    budget: "$500K - $1M",
    specs: {
      materials: ["Calacatta Gold Marble", "American Walnut Cabinetry", "Brass Hardware"],
      appliances: ["Sub-Zero PRO 48", "Wolf Dual Fuel Range", "Miele Steam Oven"],
      features: ["Smart Home Integration", "Custom Wine Cellar", "Butler's Pantry"],
    },
    technical: {
      duration: "24 weeks",
      challenges: "Integrated HVAC system for 15-foot ceilings while maintaining aesthetic purity",
      innovations: ["Custom marble extraction", "Hidden appliance panels", "Voice-activated lighting"],
    },
  },
  {
    id: 2,
    title: "Mediterranean Villa",
    location: "Monaco",
    category: "Villa",
    image: "/3.jpg",
    description: "Contemporary elegance with panoramic sea views",
    year: "2024",
    area: "600 sq ft",
    budget: "$300K - $500K",
    specs: {
      materials: ["Thassos White Marble", "European Oak", "Polished Chrome"],
      appliances: ["Gaggenau Vario 400", "Miele Pureline", "Sub-Zero Integrated"],
      features: ["Outdoor Kitchen Extension", "Ocean-View Island", "Professional Ventilation"],
    },
    technical: {
      duration: "18 weeks",
      challenges: "Weather-resistant outdoor integration with climate control systems",
      innovations: ["Retractable glass walls", "Marine-grade materials", "Smart climate zones"],
    },
  },
  {
    id: 3,
    title: "Modern Estate Kitchen",
    location: "London, UK",
    category: "Estate",
    image: "/4.jpg",
    description: "Minimalist sophistication meets functional luxury",
    year: "2023",
    area: "750 sq ft",
    budget: "$400K - $700K",
    specs: {
      materials: ["Nero Marquina Marble", "Smoked Oak", "Stainless Steel"],
      appliances: ["Bora Pure Induction", "Wolf M Series", "Gaggenau 400 Series"],
      features: ["Multi-Zone Cooking", "Professional Prep Area", "Walk-in Pantry"],
    },
    technical: {
      duration: "22 weeks",
      challenges: "Integrated downdraft ventilation system in island without compromising design",
      innovations: ["Hidden extraction", "Motorized storage", "App-controlled appliances"],
    },
  },
  {
    id: 4,
    title: "Heritage Palace",
    location: "Riyadh, Saudi Arabia",
    category: "Palace",
    image: "/5.jpg",
    description: "Classical grandeur reimagined for modern culinary excellence",
    year: "2023",
    area: "1200 sq ft",
    budget: "$1M+",
    specs: {
      materials: ["Carrara Marble", "Hand-carved Mahogany", "24K Gold Leaf Accents"],
      appliances: ["La Cornue Château", "Sub-Zero PRO Series", "Miele Grand Gourmet"],
      features: ["Dual Islands", "Spice Kitchen", "Traditional Bread Oven Integration"],
    },
    technical: {
      duration: "32 weeks",
      challenges: "Preserving heritage architectural details while modernizing infrastructure",
      innovations: ["Heritage-compliant HVAC", "Concealed modern systems", "Traditional finishes with smart tech"],
    },
  },
  {
    id: 5,
    title: "Penthouse Kitchen",
    location: "New York, USA",
    category: "Penthouse",
    image: "/6.jpg",
    description: "Urban luxury with handcrafted Italian cabinetry",
    year: "2024",
    area: "450 sq ft",
    budget: "$250K - $400K",
    specs: {
      materials: ["Statuario Marble", "Lacquered Italian Cabinetry", "Polished Nickel"],
      appliances: ["Miele ArtLine", "Wolf Gourmet", "Sub-Zero Designer Series"],
      features: ["City Views", "Compact Luxury", "Integrated Bar Station"],
    },
    technical: {
      duration: "16 weeks",
      challenges: "Maximizing functionality in limited square footage with luxury finishes",
      innovations: ["Space-saving solutions", "Vertical storage systems", "Sliding mechanisms"],
    },
  },
  {
    id: 6,
    title: "Coastal Villa",
    location: "Malibu, USA",
    category: "Villa",
    image: "/7.jpg",
    description: "Seamless indoor-outdoor entertaining kitchen",
    year: "2023",
    area: "700 sq ft",
    budget: "$350K - $600K",
    specs: {
      materials: ["Caesarstone Coastal Grey", "Teak Wood", "Marine Bronze"],
      appliances: ["Lynx Professional", "Wolf Outdoor", "Sub-Zero Outdoor Refrigeration"],
      features: ["Beach Access", "Al Fresco Dining", "Weather-Resistant Systems"],
    },
    technical: {
      duration: "20 weeks",
      challenges: "Salt-air corrosion protection and extreme weather resilience",
      innovations: ["Corrosion-resistant materials", "Automated weather shutters", "Salt-air rated systems"],
    },
  },
];

const categories = ["All", "Palace", "Villa", "Estate", "Penthouse"];

export default function EnhancedPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light">
              FEATURED PROJECTS
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
              Engineering Excellence
            </h2>
            <p className="text-lg text-gray-light max-w-2xl mx-auto font-light leading-relaxed">
              Each project showcases our technical expertise, innovative solutions, and
              uncompromising commitment to quality. Explore the details.
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 text-sm tracking-wider font-medium border transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-green-primary text-black border-green-primary"
                  : "bg-transparent text-gray-light border-gray-dark hover:border-green-primary hover:text-green-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden border border-gray-dark hover:border-green-primary transition-all duration-500 h-full flex flex-col">
                  {/* Project Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-green-glow opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-green-primary/90 text-black px-3 py-1 text-xs tracking-wider font-medium">
                      {project.category.toUpperCase()}
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 right-4 bg-black/80 border border-green-primary/50 text-green-vibrant px-3 py-1 text-xs tracking-wider">
                      {project.year}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 bg-background-card flex-1 flex flex-col">
                    <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-green-vibrant transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-light mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {project.location}
                    </p>
                    <p className="text-gray-light text-sm mb-4 flex-1">{project.description}</p>

                    {/* Key Specs */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-dark">
                      <div>
                        <div className="text-green-vibrant text-xs tracking-wider mb-1">AREA</div>
                        <div className="text-white text-sm">{project.area}</div>
                      </div>
                      <div>
                        <div className="text-green-vibrant text-xs tracking-wider mb-1">BUDGET</div>
                        <div className="text-white text-sm">{project.budget}</div>
                      </div>
                    </div>

                    {/* View Details CTA */}
                    <button className="mt-4 w-full py-2.5 border border-green-primary/50 text-green-primary text-xs tracking-wider font-medium group-hover:bg-green-primary group-hover:text-black transition-all duration-300">
                      VIEW TECHNICAL DETAILS
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 overflow-y-auto"
            >
              <div className="min-h-screen px-4 py-20">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-5xl mx-auto bg-background-card border border-green-primary/30 relative"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/80 border border-green-primary text-green-vibrant hover:bg-green-primary hover:text-black transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Project Image */}
                  <div className="relative h-96 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${selectedProject.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-card via-transparent to-transparent" />
                  </div>

                  <div className="p-8 md:p-12">
                    {/* Header */}
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-green-primary text-black px-4 py-1 text-sm tracking-wider font-medium">
                          {selectedProject.category.toUpperCase()}
                        </span>
                        <span className="text-gray-light">{selectedProject.year}</span>
                      </div>
                      <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
                        {selectedProject.title}
                      </h2>
                      <p className="text-lg text-gray-light flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {selectedProject.location}
                      </p>
                    </div>

                    {/* Project Overview */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12 pb-12 border-b border-gray-dark">
                      <div className="bg-background-elevated border border-gray-dark p-6">
                        <div className="text-green-vibrant text-sm tracking-wider mb-2">TOTAL AREA</div>
                        <div className="text-white text-2xl font-serif">{selectedProject.area}</div>
                      </div>
                      <div className="bg-background-elevated border border-gray-dark p-6">
                        <div className="text-green-vibrant text-sm tracking-wider mb-2">INVESTMENT</div>
                        <div className="text-white text-2xl font-serif">{selectedProject.budget}</div>
                      </div>
                      <div className="bg-background-elevated border border-gray-dark p-6">
                        <div className="text-green-vibrant text-sm tracking-wider mb-2">COMPLETION TIME</div>
                        <div className="text-white text-2xl font-serif">{selectedProject.technical.duration}</div>
                      </div>
                    </div>

                    {/* Technical Specifications */}
                    <div className="mb-12">
                      <h3 className="font-serif text-3xl text-white mb-6">Technical Specifications</h3>
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Materials */}
                        <div>
                          <h4 className="text-green-vibrant text-sm tracking-wider mb-4">MATERIALS</h4>
                          <ul className="space-y-2">
                            {selectedProject.specs.materials.map((material, i) => (
                              <li key={i} className="flex items-start gap-3 text-gray-light">
                                <span className="w-1.5 h-1.5 bg-green-vibrant mt-2 flex-shrink-0" />
                                <span>{material}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Appliances */}
                        <div>
                          <h4 className="text-green-vibrant text-sm tracking-wider mb-4">APPLIANCES</h4>
                          <ul className="space-y-2">
                            {selectedProject.specs.appliances.map((appliance, i) => (
                              <li key={i} className="flex items-start gap-3 text-gray-light">
                                <span className="w-1.5 h-1.5 bg-green-vibrant mt-2 flex-shrink-0" />
                                <span>{appliance}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Features */}
                        <div>
                          <h4 className="text-green-vibrant text-sm tracking-wider mb-4">KEY FEATURES</h4>
                          <ul className="space-y-2">
                            {selectedProject.specs.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-3 text-gray-light">
                                <span className="w-1.5 h-1.5 bg-green-vibrant mt-2 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Innovations */}
                        <div>
                          <h4 className="text-green-vibrant text-sm tracking-wider mb-4">INNOVATIONS</h4>
                          <ul className="space-y-2">
                            {selectedProject.technical.innovations.map((innovation, i) => (
                              <li key={i} className="flex items-start gap-3 text-gray-light">
                                <span className="w-1.5 h-1.5 bg-green-vibrant mt-2 flex-shrink-0" />
                                <span>{innovation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Engineering Challenge */}
                    <div className="bg-background-elevated border border-gray-dark p-8">
                      <h4 className="text-green-vibrant text-sm tracking-wider mb-4">ENGINEERING CHALLENGE</h4>
                      <p className="text-gray-light leading-relaxed">{selectedProject.technical.challenges}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

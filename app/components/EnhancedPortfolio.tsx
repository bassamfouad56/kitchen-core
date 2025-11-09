"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  description: string;
  year: string;
  area: string;
  budget: string;
  materials: string[];
  appliances: string[];
  features: string[];
  duration: string;
  challenges: string;
  innovations: string[];
}

// Fallback data in case CMS fetch fails
const fallbackProjects: Project[] = [
  {
    id: "1",
    title: "Royal Palace Kitchen",
    location: "Dubai, UAE",
    category: "PALACE",
    image: "/2.jpg",
    description: "Bespoke culinary masterpiece featuring Italian marble and smart technology",
    year: "2024",
    area: "850 sq ft",
    budget: "$500K - $1M",
    materials: ["Calacatta Gold Marble", "American Walnut Cabinetry", "Brass Hardware"],
    appliances: ["Sub-Zero PRO 48", "Wolf Dual Fuel Range", "Miele Steam Oven"],
    features: ["Smart Home Integration", "Custom Wine Cellar", "Butler's Pantry"],
    duration: "24 weeks",
    challenges: "Integrated HVAC system for 15-foot ceilings while maintaining aesthetic purity",
    innovations: ["Custom marble extraction", "Hidden appliance panels", "Voice-activated lighting"],
  },
  {
    id: "2",
    title: "Mediterranean Villa",
    location: "Monaco",
    category: "VILLA",
    image: "/3.jpg",
    description: "Contemporary elegance with panoramic sea views",
    year: "2024",
    area: "600 sq ft",
    budget: "$300K - $500K",
    materials: ["Thassos White Marble", "European Oak", "Polished Chrome"],
    appliances: ["Gaggenau Vario 400", "Miele Pureline", "Sub-Zero Integrated"],
    features: ["Outdoor Kitchen Extension", "Ocean-View Island", "Professional Ventilation"],
    duration: "18 weeks",
    challenges: "Weather-resistant outdoor integration with climate control systems",
    innovations: ["Retractable glass walls", "Marine-grade materials", "Smart climate zones"],
  },
];

const categories = ["All", "PALACE", "VILLA", "ESTATE", "PENTHOUSE"];

export default function EnhancedPortfolio() {
  const locale = useLocale();
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Fetch projects from CMS
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await fetch(`/api/cms/homepage?locale=${locale}`);
        if (response.ok) {
          const data = await response.json();
          if (data.projects && data.projects.length > 0) {
            setProjects(data.projects);
          }
        }
      } catch (error) {
        console.error('Error fetching projects from CMS:', error);
        // Keep fallback data on error
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [locale]);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

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
                        <div className="text-white text-2xl font-serif">{selectedProject.duration}</div>
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
                            {selectedProject.materials.map((material, i) => (
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
                            {selectedProject.appliances.map((appliance, i) => (
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
                            {selectedProject.features.map((feature, i) => (
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
                            {selectedProject.innovations.map((innovation, i) => (
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
                      <p className="text-gray-light leading-relaxed">{selectedProject.challenges}</p>
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

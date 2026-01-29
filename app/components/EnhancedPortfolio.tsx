"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  description: string;
  year: string;
  materials: string[];
  appliances: string[];
  features: string[];
  duration: string;
  challenges: string;
  innovations: string[];
}

const categoryKeys = [
  "all",
  "modernWooden",
  "classicWooden",
  "aluminum",
  "bedrooms",
];

interface EnhancedPortfolioProps {
  showViewAllButton?: boolean;
  maxProjects?: number;
}

export default function EnhancedPortfolio({
  showViewAllButton = true,
  maxProjects = 6,
}: EnhancedPortfolioProps) {
  const locale = useLocale();
  const t = useTranslations("ProjectCategories");
  const tPortfolio = useTranslations("Portfolio");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Fetch projects from CMS
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/cms/homepage?locale=${locale}`);
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects);
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error("Error fetching projects from CMS:", err);
        setError("Unable to load projects. Please try again later.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [locale]);

  const allFilteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Limit projects on homepage, show all on projects page
  const filteredProjects = showViewAllButton
    ? allFilteredProjects.slice(0, maxProjects)
    : allFilteredProjects;

  const hasMoreProjects = allFilteredProjects.length > maxProjects;

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
              {tPortfolio("badge").toUpperCase()}
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
              {tPortfolio("title")}
            </h2>
            <p className="text-lg text-gray-light max-w-2xl mx-auto font-light leading-relaxed">
              {tPortfolio("description")}
            </p>
          </motion.div>
        </div>

        {/* Category Filter with Slogans */}
        <div className="flex flex-col gap-8 mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {categoryKeys.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 text-sm tracking-wider font-medium border transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-green-primary text-black border-green-primary"
                    : "bg-transparent text-gray-light border-gray-dark hover:border-green-primary hover:text-green-primary"
                }`}
              >
                {t(`${category}.title`) || t(category)}
              </button>
            ))}
          </div>

          {/* Category Slogan */}
          {selectedCategory !== "all" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <p className="text-gray-light text-lg font-light leading-relaxed italic">
                {t(`${selectedCategory}.slogan`)}
              </p>
            </motion.div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="border border-gray-dark animate-pulse"
              >
                <div className="aspect-[4/3] bg-gray-dark/50" />
                <div className="p-6 bg-background-card">
                  <div className="h-6 bg-gray-dark/50 rounded mb-3 w-3/4" />
                  <div className="h-4 bg-gray-dark/50 rounded mb-2 w-full" />
                  <div className="h-4 bg-gray-dark/50 rounded mb-4 w-2/3" />
                  <div className="h-10 bg-gray-dark/50 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-16 border border-gray-dark bg-background-card">
            <svg
              className="w-16 h-16 text-gray-light mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-gray-light mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 border border-green-primary text-green-primary hover:bg-green-primary hover:text-black transition-colors text-sm tracking-wider"
            >
              {tPortfolio("tryAgain") || "TRY AGAIN"}
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-16 border border-gray-dark bg-background-card">
            <svg
              className="w-16 h-16 text-gray-light mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <p className="text-gray-light">
              {tPortfolio("noProjects") || "No projects available at the moment."}
            </p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && filteredProjects.length > 0 && (
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
                      {t(`${project.category}.title`)}
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
                    <p className="text-gray-light text-sm mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* View Details CTA */}
                    <button className="mt-4 w-full py-2.5 border border-green-primary/50 text-green-primary text-xs tracking-wider font-medium group-hover:bg-green-primary group-hover:text-black transition-all duration-300">
                      {tPortfolio("viewDetails").toUpperCase()}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        )}

        {/* View All Projects Button - Only show on homepage when there are more projects */}
        {showViewAllButton && hasMoreProjects && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
            <Link
              href={`/${locale}/projects`}
              className="group relative px-8 py-4 border-2 border-green-primary text-green-primary hover:bg-green-primary hover:text-black transition-all duration-300 text-sm tracking-wider font-medium overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {tPortfolio("viewAllProjects").toUpperCase()}
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-green-glow opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Link>
          </motion.div>
        )}

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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  {/* Project Image */}
                  <div className="relative h-96 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${selectedProject.image})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-card via-transparent to-transparent" />
                  </div>

                  <div className="p-8 md:p-12">
                    {/* Header */}
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-green-primary text-black px-4 py-1 text-sm tracking-wider font-medium">
                          {t(`${selectedProject.category}.title`)}
                        </span>
                        <span className="text-gray-light">
                          {selectedProject.year}
                        </span>
                      </div>
                      <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
                        {selectedProject.title}
                      </h2>
                      <p className="text-gray-light italic">
                        {t(`${selectedProject.category}.slogan`)}
                      </p>
                    </div>

                    {/* Project Description */}
                    <div className="mb-8">
                      <p className="text-gray-light text-lg leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3 mb-8 text-gray-light">
                      <svg
                        className="w-5 h-5 text-green-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{selectedProject.location}</span>
                    </div>

                    {/* CTA */}
                    <div className="bg-background-elevated border border-gray-dark p-8 text-center">
                      <p className="text-gray-light mb-6">
                        {tPortfolio("interestedInProject")}
                      </p>
                      <a
                        href="#contact"
                        onClick={() => setSelectedProject(null)}
                        className="inline-block bg-green-primary text-black px-8 py-3 text-sm tracking-wider font-medium hover:bg-green-vibrant transition-colors"
                      >
                        {tPortfolio("contactUs").toUpperCase()}
                      </a>
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

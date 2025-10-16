"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface TeamMember {
  name: string;
  title: string;
  credentials: string[];
  experience: string;
  specialization: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Alessandro Bianchi",
    title: "Lead Design Architect",
    credentials: ["RIBA Chartered Architect", "NKBA Certified", "Master's in Architecture - Politecnico di Milano"],
    experience: "20+ years",
    specialization: "Luxury residential kitchen architecture, Italian design heritage",
    image: "/9.jpg",
  },
  {
    name: "Sarah Al-Mansouri",
    title: "Chief Engineering Officer",
    credentials: ["MEng Mechanical Engineering", "LEED AP BD+C", "PMP Certified"],
    experience: "18+ years",
    specialization: "HVAC systems, smart home integration, sustainable engineering",
    image: "/10.jpg",
  },
  {
    name: "Thomas Hoffmann",
    title: "Master Craftsman & Production Director",
    credentials: ["Meister Certification (Germany)", "30+ years woodworking", "Guild of Master Craftsmen"],
    experience: "35+ years",
    specialization: "Bespoke cabinetry, traditional joinery, European craftsmanship",
    image: "/9.jpg",
  },
  {
    name: "Priya Sharma",
    title: "Technology Integration Specialist",
    credentials: ["BSc Computer Engineering", "Control4 Certified Programmer", "Crestron Master Programmer"],
    experience: "12+ years",
    specialization: "Smart home systems, IoT integration, automation programming",
    image: "/10.jpg",
  },
];

const certifications = [
  {
    name: "NKBA Certified",
    issuer: "National Kitchen & Bath Association",
    description: "Industry-recognized certification for kitchen design excellence",
  },
  {
    name: "LEED Accredited Professional",
    issuer: "U.S. Green Building Council",
    description: "Leadership in Energy and Environmental Design expertise",
  },
  {
    name: "ISO 9001:2015",
    issuer: "International Organization for Standardization",
    description: "Quality management systems certification",
  },
  {
    name: "FSC Certified",
    issuer: "Forest Stewardship Council",
    description: "Responsible sourcing of wood and wood products",
  },
];

const awards = [
  {
    year: "2024",
    title: "Best Luxury Kitchen Design",
    organization: "International Design Awards",
    project: "Royal Palace Kitchen, Dubai",
  },
  {
    year: "2024",
    title: "Excellence in Fit-Out & Craftsmanship",
    organization: "Middle East Architecture Awards",
    project: "Heritage Palace, Riyadh",
  },
  {
    year: "2023",
    title: "Innovation in Smart Home Integration",
    organization: "Smart Home Technology Awards",
    project: "Modern Estate Kitchen, London",
  },
  {
    year: "2023",
    title: "Architectural Digest Design Award",
    organization: "Architectural Digest",
    project: "Mediterranean Villa, Monaco",
  },
];

export default function Credentials() {
  const [activeTab, setActiveTab] = useState<"team" | "certifications" | "awards">("team");

  return (
    <section className="py-32 bg-background-elevated border-y border-gray-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light">
              PROFESSIONAL EXCELLENCE
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
              Credentials & Expertise
            </h2>
            <p className="text-lg text-gray-light max-w-2xl mx-auto font-light leading-relaxed">
              Our team of internationally recognized professionals brings decades of experience
              and industry-leading certifications to every project.
            </p>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("team")}
            className={`px-6 py-3 text-sm tracking-wider font-medium border transition-all duration-300 ${
              activeTab === "team"
                ? "bg-green-primary text-black border-green-primary"
                : "bg-transparent text-gray-light border-gray-dark hover:border-green-primary hover:text-green-primary"
            }`}
          >
            EXPERT TEAM
          </button>
          <button
            onClick={() => setActiveTab("certifications")}
            className={`px-6 py-3 text-sm tracking-wider font-medium border transition-all duration-300 ${
              activeTab === "certifications"
                ? "bg-green-primary text-black border-green-primary"
                : "bg-transparent text-gray-light border-gray-dark hover:border-green-primary hover:text-green-primary"
            }`}
          >
            CERTIFICATIONS
          </button>
          <button
            onClick={() => setActiveTab("awards")}
            className={`px-6 py-3 text-sm tracking-wider font-medium border transition-all duration-300 ${
              activeTab === "awards"
                ? "bg-green-primary text-black border-green-primary"
                : "bg-transparent text-gray-light border-gray-dark hover:border-green-primary hover:text-green-primary"
            }`}
          >
            AWARDS & RECOGNITION
          </button>
        </div>

        {/* Team Tab */}
        {activeTab === "team" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background-card border border-gray-dark hover:border-green-primary transition-all duration-500 overflow-hidden group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-48 h-64 md:h-auto flex-shrink-0 relative overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${member.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-green-vibrant text-xs tracking-wider">
                        {member.experience}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1">
                    <h3 className="font-serif text-2xl text-white mb-1 group-hover:text-green-vibrant transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-green-primary text-sm mb-4">{member.title}</p>
                    <p className="text-gray-light text-sm mb-4 leading-relaxed">
                      {member.specialization}
                    </p>

                    {/* Credentials */}
                    <div className="border-t border-gray-dark pt-4">
                      <div className="text-green-vibrant text-xs tracking-wider mb-3">
                        CREDENTIALS
                      </div>
                      <ul className="space-y-2">
                        {member.credentials.map((credential, i) => (
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
                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                              />
                            </svg>
                            <span>{credential}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Certifications Tab */}
        {activeTab === "certifications" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background-card border border-gray-dark hover:border-green-primary transition-all duration-500 p-8 group"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-green-primary/10 border border-green-primary flex items-center justify-center text-green-vibrant flex-shrink-0 group-hover:bg-green-primary/20 transition-colors">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-white mb-2 group-hover:text-green-vibrant transition-colors">
                        {cert.name}
                      </h3>
                      <p className="text-green-primary text-sm mb-3">{cert.issuer}</p>
                      <p className="text-gray-light text-sm leading-relaxed">{cert.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background-card border border-green-primary/30 p-8 text-center"
            >
              <h3 className="font-serif text-2xl text-white mb-4">Industry Memberships</h3>
              <div className="flex flex-wrap justify-center gap-6 text-gray-light text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-primary" />
                  American Institute of Architects (AIA)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-primary" />
                  Royal Institute of British Architects (RIBA)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-primary" />
                  European Council of Interior Architects
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-primary" />
                  International Interior Design Association
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Awards Tab */}
        {activeTab === "awards" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              {awards.map((award, index) => (
                <motion.div
                  key={`${award.year}-${award.title}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background-card border border-gray-dark hover:border-green-primary transition-all duration-500 group"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Year Badge */}
                    <div className="md:w-32 flex-shrink-0 bg-green-primary/10 border-b md:border-b-0 md:border-r border-gray-dark flex items-center justify-center p-8 group-hover:bg-green-primary/20 transition-colors">
                      <div className="text-center">
                        <div className="text-4xl font-serif text-green-vibrant">{award.year}</div>
                        <svg
                          className="w-8 h-8 text-green-primary mx-auto mt-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Award Details */}
                    <div className="flex-1 p-8">
                      <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-green-vibrant transition-colors">
                        {award.title}
                      </h3>
                      <p className="text-green-primary mb-3">{award.organization}</p>
                      <p className="text-gray-light text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="font-medium">Project:</span> {award.project}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Press Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-background-card border border-green-primary/30 p-8"
            >
              <h3 className="font-serif text-3xl text-white mb-6 text-center">
                Featured In
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  "Architectural Digest",
                  "Luxury Home Design",
                  "Interior Design Magazine",
                  "Robb Report",
                ].map((publication, index) => (
                  <motion.div
                    key={publication}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center text-gray-light hover:text-green-vibrant transition-colors cursor-pointer"
                  >
                    <div className="text-lg font-light tracking-wide">{publication}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

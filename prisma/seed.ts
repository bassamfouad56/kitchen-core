import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  console.log('Creating admin user...')
  const hashedPassword = await bcrypt.hash('admin123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@kitchencore.com' },
    update: {},
    create: {
      email: 'admin@kitchencore.com',
      password: hashedPassword,
      name: 'Kitchen Core Admin',
      role: 'ADMIN',
    },
  })

  // Seed Projects
  console.log('Seeding projects...')
  const projects = [
    {
      title: 'Royal Palace Kitchen',
      slug: 'royal-palace-kitchen-dubai',
      location: 'Dubai, UAE',
      category: 'PALACE',
      image: '/2.jpg',
      gallery: ['/2.jpg'],
      description: 'Bespoke culinary masterpiece featuring Italian marble and smart technology',
      year: '2024',
      area: '850 sq ft',
      budget: '$500K - $1M',
      materials: ['Calacatta Gold Marble', 'American Walnut Cabinetry', 'Brass Hardware'],
      appliances: ['Sub-Zero PRO 48', 'Wolf Dual Fuel Range', 'Miele Steam Oven'],
      features: ['Smart Home Integration', 'Custom Wine Cellar', 'Butler\'s Pantry'],
      duration: '24 weeks',
      challenges: 'Integrated HVAC system for 15-foot ceilings while maintaining aesthetic purity',
      innovations: ['Custom marble extraction', 'Hidden appliance panels', 'Voice-activated lighting'],
      featured: true,
      order: 1,
    },
    {
      title: 'Mediterranean Villa',
      slug: 'mediterranean-villa-monaco',
      location: 'Monaco',
      category: 'VILLA',
      image: '/3.jpg',
      gallery: ['/3.jpg'],
      description: 'Contemporary elegance with panoramic sea views',
      year: '2024',
      area: '600 sq ft',
      budget: '$300K - $500K',
      materials: ['Thassos White Marble', 'European Oak', 'Polished Chrome'],
      appliances: ['Gaggenau Vario 400', 'Miele Pureline', 'Sub-Zero Integrated'],
      features: ['Outdoor Kitchen Extension', 'Ocean-View Island', 'Professional Ventilation'],
      duration: '18 weeks',
      challenges: 'Weather-resistant outdoor integration with climate control systems',
      innovations: ['Retractable glass walls', 'Marine-grade materials', 'Smart climate zones'],
      featured: true,
      order: 2,
    },
    {
      title: 'Modern Estate Kitchen',
      slug: 'modern-estate-london',
      location: 'London, UK',
      category: 'ESTATE',
      image: '/4.jpg',
      gallery: ['/4.jpg'],
      description: 'Minimalist sophistication meets functional luxury',
      year: '2023',
      area: '750 sq ft',
      budget: '$400K - $700K',
      materials: ['Nero Marquina Marble', 'Smoked Oak', 'Stainless Steel'],
      appliances: ['Bora Pure Induction', 'Wolf M Series', 'Gaggenau 400 Series'],
      features: ['Multi-Zone Cooking', 'Professional Prep Area', 'Walk-in Pantry'],
      duration: '22 weeks',
      challenges: 'Integrated downdraft ventilation system in island without compromising design',
      innovations: ['Hidden extraction', 'Motorized storage', 'App-controlled appliances'],
      featured: true,
      order: 3,
    },
    {
      title: 'Heritage Palace',
      slug: 'heritage-palace-riyadh',
      location: 'Riyadh, Saudi Arabia',
      category: 'PALACE',
      image: '/5.jpg',
      gallery: ['/5.jpg'],
      description: 'Classical grandeur reimagined for modern culinary excellence',
      year: '2023',
      area: '1200 sq ft',
      budget: '$1M+',
      materials: ['Carrara Marble', 'Hand-carved Mahogany', '24K Gold Leaf Accents'],
      appliances: ['La Cornue Château', 'Sub-Zero PRO Series', 'Miele Grand Gourmet'],
      features: ['Dual Islands', 'Spice Kitchen', 'Traditional Bread Oven Integration'],
      duration: '32 weeks',
      challenges: 'Preserving heritage architectural details while modernizing infrastructure',
      innovations: ['Heritage-compliant HVAC', 'Concealed modern systems', 'Traditional finishes with smart tech'],
      featured: false,
      order: 4,
    },
    {
      title: 'Penthouse Kitchen',
      slug: 'penthouse-kitchen-new-york',
      location: 'New York, USA',
      category: 'PENTHOUSE',
      image: '/6.jpg',
      gallery: ['/6.jpg'],
      description: 'Urban luxury with handcrafted Italian cabinetry',
      year: '2024',
      area: '450 sq ft',
      budget: '$250K - $400K',
      materials: ['Statuario Marble', 'Lacquered Italian Cabinetry', 'Polished Nickel'],
      appliances: ['Miele ArtLine', 'Wolf Gourmet', 'Sub-Zero Designer Series'],
      features: ['City Views', 'Compact Luxury', 'Integrated Bar Station'],
      duration: '16 weeks',
      challenges: 'Maximizing functionality in limited square footage with luxury finishes',
      innovations: ['Space-saving solutions', 'Vertical storage systems', 'Sliding mechanisms'],
      featured: false,
      order: 5,
    },
    {
      title: 'Coastal Villa',
      slug: 'coastal-villa-malibu',
      location: 'Malibu, USA',
      category: 'VILLA',
      image: '/7.jpg',
      gallery: ['/7.jpg'],
      description: 'Seamless indoor-outdoor entertaining kitchen',
      year: '2023',
      area: '700 sq ft',
      budget: '$350K - $600K',
      materials: ['Caesarstone Coastal Grey', 'Teak Wood', 'Marine Bronze'],
      appliances: ['Lynx Professional', 'Wolf Outdoor', 'Sub-Zero Outdoor Refrigeration'],
      features: ['Beach Access', 'Al Fresco Dining', 'Weather-Resistant Systems'],
      duration: '20 weeks',
      challenges: 'Salt-air corrosion protection and extreme weather resilience',
      innovations: ['Corrosion-resistant materials', 'Automated weather shutters', 'Salt-air rated systems'],
      featured: false,
      order: 6,
    },
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    })
  }

  // Seed Gallery Images
  console.log('Seeding gallery images...')
  const galleryImages = [
    { title: 'Royal Palace Kitchen', image: '/2.jpg', category: 'PALACE', location: 'Dubai, UAE', size: 'LARGE', description: 'Italian marble countertops with custom brass fixtures', order: 1 },
    { title: 'Mediterranean Villa', image: '/3.jpg', category: 'VILLA', location: 'Monaco', size: 'MEDIUM', description: 'Ocean-view cooking with premium Sub-Zero appliances', order: 2 },
    { title: 'Modern Estate', image: '/4.jpg', category: 'ESTATE', location: 'London, UK', size: 'TALL', description: 'Minimalist elegance with smart home integration', order: 3 },
    { title: 'Heritage Palace', image: '/5.jpg', category: 'PALACE', location: 'Riyadh', size: 'WIDE', description: 'Classical grandeur meets modern technology', order: 4 },
    { title: 'Manhattan Penthouse', image: '/6.jpg', category: 'PENTHOUSE', location: 'New York', size: 'MEDIUM', description: 'Urban luxury with handcrafted Italian cabinetry', order: 5 },
    { title: 'Coastal Villa', image: '/7.jpg', category: 'VILLA', location: 'Malibu', size: 'SMALL', description: 'Indoor-outdoor living with weather-resistant systems', order: 6 },
    { title: 'Contemporary Estate', image: '/8.jpg', category: 'ESTATE', location: 'Singapore', size: 'MEDIUM', description: 'Asian fusion design with European craftsmanship', order: 7 },
    { title: 'Private Residence', image: '/1.jpg', category: 'VILLA', location: 'Paris', size: 'LARGE', description: 'French elegance with cutting-edge technology', order: 8 },
    { title: 'Luxury Apartment', image: '/10.jpg', category: 'PENTHOUSE', location: 'Hong Kong', size: 'SMALL', description: 'Space-efficient luxury with panoramic views', order: 9 },
    { title: 'Desert Villa', image: '/9.jpg', category: 'VILLA', location: 'Dubai', size: 'MEDIUM', description: 'Contemporary Middle Eastern design', order: 10 },
  ]

  for (const img of galleryImages) {
    await prisma.galleryImage.create({ data: img })
  }

  // Seed Testimonials
  console.log('Seeding testimonials...')
  const testimonials = [
    {
      name: 'Sheikh Mohammed Al-Rashid',
      title: 'Private Palace Owner',
      location: 'Dubai, UAE',
      image: '/9.jpg',
      quote: 'Kitchen Core transformed our palace kitchen into a culinary masterpiece. The attention to detail and quality of craftsmanship is unparalleled. Every element speaks of luxury and functionality.',
      rating: 5,
      project: 'Royal Palace Kitchen, Dubai',
      featured: true,
      order: 1,
    },
    {
      name: 'Isabella Rossi',
      title: 'Villa Owner',
      location: 'Monaco',
      image: '/10.jpg',
      quote: 'Working with Kitchen Core was an absolute pleasure. They understood our vision for a Mediterranean villa kitchen and exceeded every expectation. The Italian marble selection and smart technology integration is flawless.',
      rating: 5,
      project: 'Mediterranean Villa Kitchen',
      featured: true,
      order: 2,
    },
    {
      name: 'Alexander Chen',
      title: 'Private Estate Owner',
      location: 'London, UK',
      image: '/9.jpg',
      quote: 'From concept to completion, Kitchen Core delivered exceptional service. Our estate kitchen now features the finest European appliances and custom cabinetry. It\'s a perfect blend of tradition and innovation.',
      rating: 5,
      project: 'Contemporary Estate Kitchen',
      featured: true,
      order: 3,
    },
    {
      name: 'Fatima Al-Saud',
      title: 'Heritage Palace',
      location: 'Riyadh, Saudi Arabia',
      image: '/10.jpg',
      quote: 'Kitchen Core respected our heritage while bringing modern culinary excellence to our palace. The team\'s professionalism and expertise in luxury fit-out is remarkable. Highly recommended for discerning clients.',
      rating: 5,
      project: 'Heritage Palace Renovation',
      featured: true,
      order: 4,
    },
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial })
  }

  // Seed Process Steps
  console.log('Seeding process steps...')
  const processSteps = [
    { number: '01', title: 'Discovery & Consultation', description: 'We begin with an in-depth consultation to understand your vision, lifestyle, and requirements. Our design team visits your property to assess space and architectural considerations.', duration: '1-2 weeks', iconName: 'chat', order: 1 },
    { number: '02', title: 'Design & Planning', description: 'Our architects create detailed 3D renderings and technical drawings. We curate premium materials, appliances, and finishes tailored to your aesthetic preferences and functional needs.', duration: '3-4 weeks', iconName: 'design', order: 2 },
    { number: '03', title: 'Approval & Refinement', description: 'We present comprehensive design proposals and walk you through every detail. Revisions are made until the design perfectly aligns with your expectations and specifications.', duration: '1-2 weeks', iconName: 'check', order: 3 },
    { number: '04', title: 'Fabrication & Sourcing', description: 'Custom cabinetry is handcrafted in Italy. Premium materials are sourced from trusted suppliers worldwide. Every component is inspected for quality before shipment.', duration: '8-12 weeks', iconName: 'tools', order: 4 },
    { number: '05', title: 'Installation & Fit-Out', description: 'Our expert craftsmen handle precise installation with meticulous attention to detail. Plumbing, electrical, and ventilation systems are seamlessly integrated.', duration: '6-8 weeks', iconName: 'building', order: 5 },
    { number: '06', title: 'Final Touches & Handover', description: 'Final inspections ensure perfection. Your team receives comprehensive training on all appliances and smart systems. We provide ongoing support and maintenance services.', duration: '1 week', iconName: 'star', order: 6 },
  ]

  for (const step of processSteps) {
    await prisma.processStep.upsert({
      where: { order: step.order },
      update: step,
      create: step,
    })
  }

  // Seed Services
  console.log('Seeding services...')
  const services = [
    {
      title: 'Palace Kitchen Design',
      description: 'Bespoke kitchen architecture for palatial residences combining classical grandeur with modern culinary technology.',
      features: ['Custom millwork & cabinetry', 'Italian marble selection', 'Smart home integration', 'Premium appliance curation'],
      order: 1,
    },
    {
      title: 'Villa Kitchen Fit-Out',
      description: 'Complete kitchen solutions for luxury villas featuring handcrafted details and state-of-the-art equipment.',
      features: ['European appliances', 'Wine cellar integration', 'Outdoor kitchen design', 'Lighting architecture'],
      order: 2,
    },
    {
      title: 'Estate Kitchen Systems',
      description: 'Holistic kitchen design for private estates with butler\'s pantries, prep kitchens, and entertaining spaces.',
      features: ['Multi-zone kitchens', 'Professional equipment', 'Ventilation systems', 'Custom storage solutions'],
      order: 3,
    },
  ]

  for (const service of services) {
    await prisma.service.create({ data: service })
  }

  // Seed Statistics
  console.log('Seeding statistics...')
  const stats = [
    { number: '150+', label: 'Luxury Kitchens', section: 'HOMEPAGE_TRUST', order: 1 },
    { number: '25+', label: 'Countries', section: 'HOMEPAGE_TRUST', order: 2 },
    { number: '15', label: 'Years Excellence', section: 'HOMEPAGE_TRUST', order: 3 },
    { number: '100%', label: 'Client Satisfaction', section: 'HOMEPAGE_TRUST', order: 4 },
    { number: '150+', label: 'Projects Completed', section: 'GALLERY_STATS', order: 1 },
    { number: '25', label: 'Countries Served', section: 'GALLERY_STATS', order: 2 },
    { number: '$2B+', label: 'Project Value', section: 'GALLERY_STATS', order: 3 },
    { number: '100%', label: 'Satisfaction Rate', section: 'GALLERY_STATS', order: 4 },
  ]

  for (const stat of stats) {
    await prisma.statistic.create({ data: stat })
  }

  // Seed Founder
  console.log('Seeding founder information...')
  await prisma.founder.create({
    data: {
      name: 'Eng. Ahmad Al-Khateeb',
      title: 'Founder & CEO',
      image: '/ceo.png',
      bio: 'With over 15 years of experience in luxury kitchen design and fit-out, Eng. Ahmad Al-Khateeb has established Kitchen Core as the premier choice for discerning clients across the Middle East and beyond. His vision combines traditional craftsmanship with cutting-edge technology to create culinary spaces that are both timeless and innovative.',
      education: ['Master of Architecture, Politecnico di Milano', 'Bachelor of Engineering, American University of Sharjah'],
      recognition: ['Best Kitchen Design Award 2024 - Architectural Digest Middle East', 'Excellence in Luxury Fit-Out 2023 - Dubai Design Week', 'Featured in Luxury Home Design Magazine'],
      quote: 'A kitchen is not just a place to cook—it\'s the heart of the home, a sanctuary where memories are created and families gather. Every project we undertake is a commitment to excellence, craftsmanship, and the pursuit of culinary perfection.',
    },
  })

  // Seed Site Settings
  console.log('Seeding site settings...')
  await prisma.siteSettings.create({
    data: {
      siteTitle: 'Kitchen Core - Luxury Kitchen Design & Fit-Out',
      heroTagline: 'LUXURY KITCHEN SPECIALISTS',
      heroHeading: 'Culinary Excellence',
      heroSubheading: 'Bespoke kitchen design and fit-out for palaces, villas, and luxury estates. Where Italian craftsmanship meets cutting-edge technology.',
      heroImage: '/1.jpg',
      contactPhone: '+971 4 XXX XXXX',
      contactEmail: 'design@kitchencore.com',
      showroomAddress: 'By appointment only\nDubai Design District',
      instagramUrl: 'https://instagram.com/kitchencore',
      pinterestUrl: 'https://pinterest.com/kitchencore',
      linkedinUrl: 'https://linkedin.com/company/kitchencore',
      houzzUrl: 'https://houzz.com/kitchencore',
      partnerships: ['Sub-Zero', 'Wolf', 'Miele', 'Gaggenau', 'Boffi', 'Poliform'],
      seoDescription: 'Kitchen Core specializes in luxury kitchen design and fit-out for palaces, villas, and estates. Combining Italian craftsmanship with smart technology for discerning clients worldwide.',
      seoKeywords: ['luxury kitchen design', 'palace kitchen', 'villa kitchen', 'bespoke kitchen', 'Italian kitchen', 'smart kitchen', 'Dubai kitchen design'],
    },
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

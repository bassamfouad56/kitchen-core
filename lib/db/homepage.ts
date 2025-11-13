import { prisma } from "../prisma";
import { getUITranslations } from "./ui-translations";

/**
 * Fetch all CMS data needed for the homepage
 * This function is optimized to reduce database queries using Promise.all
 */
export async function getHomepageData(locale: string = "en") {
  try {
    const [
      projects,
      testimonials,
      services,
      galleryImages,
      processSteps,
      statistics,
      innovations,
      uiTranslations,
    ] = await Promise.all([
      // Projects - published and ordered
      prisma.project.findMany({
        where: { published: true },
        orderBy: [{ featured: "desc" }, { order: "asc" }],
        select: {
          id: true,
          titleEn: true,
          titleAr: true,
          slug: true,
          location: true,
          category: true,
          image: true,
          gallery: true,
          descriptionEn: true,
          descriptionAr: true,
          year: true,
          area: true,
          budget: true,
          materials: true,
          appliances: true,
          features: true,
          duration: true,
          challengesEn: true,
          challengesAr: true,
          innovations: true,
          featured: true,
          order: true,
        },
      }),

      // Testimonials - published, featured first
      prisma.testimonial.findMany({
        where: { published: true },
        orderBy: [{ featured: "desc" }, { order: "asc" }],
        select: {
          id: true,
          nameEn: true,
          nameAr: true,
          titleEn: true,
          titleAr: true,
          location: true,
          image: true,
          quoteEn: true,
          quoteAr: true,
          rating: true,
          project: true,
          featured: true,
        },
      }),

      // Services - published and ordered
      prisma.service.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        select: {
          id: true,
          titleEn: true,
          titleAr: true,
          descriptionEn: true,
          descriptionAr: true,
          features: true,
          order: true,
        },
      }),

      // Gallery Images - published and ordered
      prisma.galleryImage.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        select: {
          id: true,
          titleEn: true,
          titleAr: true,
          image: true,
          category: true,
          location: true,
          size: true,
          descriptionEn: true,
          descriptionAr: true,
          order: true,
        },
      }),

      // Process Steps - published and ordered
      prisma.processStep.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        select: {
          id: true,
          number: true,
          titleEn: true,
          titleAr: true,
          descriptionEn: true,
          descriptionAr: true,
          duration: true,
          iconName: true,
          order: true,
        },
      }),

      // Statistics - published and ordered
      prisma.statistic.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        select: {
          id: true,
          number: true,
          labelEn: true,
          labelAr: true,
          section: true,
          order: true,
        },
      }),

      // Innovations - published and ordered
      prisma.innovation.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        select: {
          id: true,
          titleEn: true,
          titleAr: true,
          descriptionEn: true,
          descriptionAr: true,
          icon: true,
          order: true,
        },
      }),

      // UI Translations
      getUITranslations(locale as "en" | "ar"),
    ]);

    // Helper function to convert database enum to frontend category key
    const mapCategoryToKey = (category: string): string => {
      const mapping: Record<string, string> = {
        MODERN_WOODEN: "modernWooden",
        CLASSIC_WOODEN: "classicWooden",
        ALUMINUM: "aluminum",
        BEDROOMS: "bedrooms",
      };
      return mapping[category] || category.toLowerCase();
    };

    // Map data based on locale (en/ar)
    const localizedProjects = projects.map((p) => ({
      ...p,
      title: locale === "ar" ? p.titleAr : p.titleEn,
      description: locale === "ar" ? p.descriptionAr : p.descriptionEn,
      challenges: locale === "ar" ? p.challengesAr : p.challengesEn,
      category: mapCategoryToKey(p.category),
    }));

    const localizedTestimonials = testimonials.map((t) => ({
      ...t,
      name: locale === "ar" ? t.nameAr : t.nameEn,
      title: locale === "ar" ? t.titleAr : t.titleEn,
      quote: locale === "ar" ? t.quoteAr : t.quoteEn,
    }));

    const localizedServices = services.map((s) => ({
      ...s,
      title: locale === "ar" ? s.titleAr : s.titleEn,
      description: locale === "ar" ? s.descriptionAr : s.descriptionEn,
    }));

    const localizedGalleryImages = galleryImages.map((g) => ({
      ...g,
      title: locale === "ar" ? g.titleAr : g.titleEn,
      description: locale === "ar" ? g.descriptionAr : g.descriptionEn,
    }));

    const localizedProcessSteps = processSteps.map((p) => ({
      ...p,
      title: locale === "ar" ? p.titleAr : p.titleEn,
      description: locale === "ar" ? p.descriptionAr : p.descriptionEn,
    }));

    const localizedStatistics = statistics.map((s) => ({
      ...s,
      label: locale === "ar" ? s.labelAr : s.labelEn,
    }));

    const localizedInnovations = innovations.map((i) => ({
      ...i,
      title: locale === "ar" ? i.titleAr : i.titleEn,
      description: locale === "ar" ? i.descriptionAr : i.descriptionEn,
    }));

    return {
      projects: localizedProjects,
      testimonials: localizedTestimonials,
      services: localizedServices,
      galleryImages: localizedGalleryImages,
      processSteps: localizedProcessSteps,
      statistics: localizedStatistics,
      innovations: localizedInnovations,
      ui: uiTranslations,
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    // Return empty arrays on error so page doesn't crash
    return {
      projects: [],
      testimonials: [],
      services: [],
      galleryImages: [],
      processSteps: [],
      statistics: [],
      innovations: [],
      ui: {},
    };
  }
}

/**
 * Fetch featured projects only (for homepage hero/showcase)
 */
export async function getFeaturedProjects(
  locale: string = "en",
  limit: number = 6,
) {
  try {
    const projects = await prisma.project.findMany({
      where: {
        published: true,
        featured: true,
      },
      orderBy: { order: "asc" },
      take: limit,
      select: {
        id: true,
        titleEn: true,
        titleAr: true,
        slug: true,
        location: true,
        category: true,
        image: true,
        descriptionEn: true,
        descriptionAr: true,
        year: true,
      },
    });

    const mapCategoryToKey = (category: string): string => {
      const mapping: Record<string, string> = {
        MODERN_WOODEN: "modernWooden",
        CLASSIC_WOODEN: "classicWooden",
        ALUMINUM: "aluminum",
        BEDROOMS: "bedrooms",
      };
      return mapping[category] || category.toLowerCase();
    };

    return projects.map((p) => ({
      ...p,
      title: locale === "ar" ? p.titleAr : p.titleEn,
      description: locale === "ar" ? p.descriptionAr : p.descriptionEn,
      category: mapCategoryToKey(p.category),
    }));
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

/**
 * Fetch featured testimonials only (for homepage)
 */
export async function getFeaturedTestimonials(
  locale: string = "en",
  limit: number = 3,
) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        published: true,
        featured: true,
      },
      orderBy: { order: "asc" },
      take: limit,
      select: {
        id: true,
        nameEn: true,
        nameAr: true,
        titleEn: true,
        titleAr: true,
        location: true,
        image: true,
        quoteEn: true,
        quoteAr: true,
        rating: true,
        project: true,
      },
    });

    return testimonials.map((t) => ({
      ...t,
      name: locale === "ar" ? t.nameAr : t.nameEn,
      title: locale === "ar" ? t.titleAr : t.titleEn,
      quote: locale === "ar" ? t.quoteAr : t.quoteEn,
    }));
  } catch (error) {
    console.error("Error fetching featured testimonials:", error);
    return [];
  }
}

/**
 * Fetch homepage statistics by section
 */
export async function getStatisticsBySection(
  section: "HOMEPAGE_TRUST" | "GALLERY_STATS",
  locale: string = "en",
) {
  try {
    const statistics = await prisma.statistic.findMany({
      where: {
        published: true,
        section,
      },
      orderBy: { order: "asc" },
      select: {
        id: true,
        number: true,
        labelEn: true,
        labelAr: true,
        section: true,
      },
    });

    return statistics.map((s) => ({
      ...s,
      label: locale === "ar" ? s.labelAr : s.labelEn,
    }));
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return [];
  }
}

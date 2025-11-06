import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import AboutHero from "@/app/components/about/AboutHero";
import MissionVision from "@/app/components/about/MissionVision";
import CompanyValues from "@/app/components/about/CompanyValues";
import FounderShowcase from "@/app/components/about/FounderShowcase";
import TeamGrid from "@/app/components/about/TeamGrid";
import CompanyStats from "@/app/components/about/CompanyStats";
import AboutCTA from "@/app/components/about/AboutCTA";
import type { AboutPageData } from "@/types/about";

// Fetch about page data directly from database
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getAboutData(): Promise<AboutPageData> {
  try {
    // Fetch company information
    const company = await prisma.company.findFirst({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });

    // Fetch all published team members
    const teamMembers = await prisma.teamMember.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });

    // Fetch founder information
    const founder = await prisma.founder.findFirst({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });

    return {
      company,
      teamMembers,
      founder,
    };
  } catch (error) {
    console.error("Error fetching about data:", error);
    return {
      company: null,
      teamMembers: [],
      founder: null,
    };
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const data = await getAboutData();

  const isArabic = locale === "ar";
  const companyName = data.company
    ? isArabic
      ? data.company.nameAr
      : data.company.nameEn
    : "Kitchen Core";
  const description = data.company
    ? isArabic
      ? data.company.descriptionAr
      : data.company.descriptionEn
    : t("About.metaDescription");

  return {
    title: `${t("About.pageTitle")} | ${companyName}`,
    description: description.substring(0, 160),
    keywords: [
      "luxury kitchen design",
      "about kitchen core",
      "kitchen design company",
      "italian craftsmanship",
      "bespoke kitchens",
      "kitchen specialists",
      companyName,
    ],
    openGraph: {
      title: `${t("About.pageTitle")} | ${companyName}`,
      description: description.substring(0, 160),
      type: "website",
      locale: isArabic ? "ar_SA" : "en_US",
      images: data.company?.featuredImage
        ? [
            {
              url: data.company.featuredImage,
              width: 1200,
              height: 630,
              alt: `${companyName} - About Us`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("About.pageTitle")} | ${companyName}`,
      description: description.substring(0, 160),
      images: data.company?.featuredImage ? [data.company.featuredImage] : [],
    },
  };
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();
  const data = await getAboutData();

  // If no company data exists, show 404
  if (!data.company) {
    notFound();
  }

  const isArabic = locale === "ar";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <AboutHero company={data.company} locale={locale} />

      {/* Company Stats */}
      <CompanyStats company={data.company} locale={locale} />

      {/* Mission & Vision */}
      {(data.company.missionEn || data.company.visionEn) && (
        <MissionVision company={data.company} locale={locale} />
      )}

      {/* Company Values */}
      {data.company.valuesEn.length > 0 && (
        <CompanyValues company={data.company} locale={locale} />
      )}

      {/* Founder Section */}
      {data.founder && <FounderShowcase founder={data.founder} locale={locale} />}

      {/* Team Grid */}
      {data.teamMembers.length > 0 && (
        <TeamGrid teamMembers={data.teamMembers} locale={locale} />
      )}

      {/* CTA Section */}
      <AboutCTA locale={locale} />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: isArabic ? data.company.nameAr : data.company.nameEn,
            url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
            logo: data.company.featuredImage || "/logo.png",
            description: isArabic
              ? data.company.descriptionAr
              : data.company.descriptionEn,
            foundingDate: data.company.foundedYear,
            founder: data.founder
              ? {
                  "@type": "Person",
                  name: data.founder.name,
                  jobTitle: data.founder.title,
                }
              : undefined,
            numberOfEmployees: data.company.employeeCount,
            address: {
              "@type": "PostalAddress",
              addressCountry: "SA",
            },
          }),
        }}
      />
    </div>
  );
}

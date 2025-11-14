import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import EnhancedPortfolio from "../../components/EnhancedPortfolio";
import BeforeAfterSlider from "../../components/BeforeAfterSlider";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("projects.title"),
    description: t("projects.description"),
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  return (
    <main className="min-h-screen bg-black pt-28">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-black via-background-dark to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light block">
              OUR WORK
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
              Project Portfolio
            </h1>
            <p className="text-lg md:text-xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed">
              Explore our collection of luxury kitchen designs across the Middle
              East. Each project represents our commitment to excellence,
              innovation, and timeless elegance.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-green-glow rounded-full filter blur-3xl opacity-10 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-green-glow rounded-full filter blur-3xl opacity-10 -translate-y-1/2" />
      </section>

      {/* Portfolio Section - Hide "View All" button since we're already on projects page */}
      <EnhancedPortfolio showViewAllButton={false} />

      {/* Before & After Section - Transformation showcase */}
      <BeforeAfterSlider />
    </main>
  );
}

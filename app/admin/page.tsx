import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  // Get content stats
  const [
    projectsCount,
    galleryCount,
    testimonialsCount,
    servicesCount,
    videosCount,
    innovationsCount,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.galleryImage.count(),
    prisma.testimonial.count(),
    prisma.service.count(),
    prisma.video.count(),
    prisma.innovation.count(),
  ]);

  const stats = [
    { label: "Projects", count: projectsCount, href: "/admin/projects" },
    { label: "Gallery Images", count: galleryCount, href: "/admin/gallery" },
    {
      label: "Testimonials",
      count: testimonialsCount,
      href: "/admin/testimonials",
    },
    { label: "Services", count: servicesCount, href: "/admin/services" },
    { label: "Videos", count: videosCount, href: "/admin/videos" },
    {
      label: "Innovations",
      count: innovationsCount,
      href: "/admin/innovations",
    },
    {
      label: "Leads (CRM)",
      count: await prisma.lead.count(),
      href: "/admin/leads",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif text-white mb-2">
            Welcome back, {session.user.name}
          </h1>
          <p className="text-gray-light">Manage your Kitchen Core content</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-background-card border border-gray-dark p-6 hover:border-green-primary transition-colors"
            >
              <div className="text-4xl font-serif text-green-vibrant mb-2">
                {stat.count}
              </div>
              <div className="text-sm text-gray-light uppercase tracking-wider">
                {stat.label}
              </div>
            </Link>
          ))}
        </div>

        {/* Content Management */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif mb-6">Content Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/company"
              className="bg-green-primary text-black p-6 hover:bg-green-vibrant transition-colors font-medium"
            >
              Company & About
            </Link>
            <Link
              href="/admin/founder"
              className="bg-background-card border border-green-primary p-6 hover:bg-green-primary/10 transition-colors text-green-vibrant font-medium"
            >
              Founder Profile
            </Link>
            <Link
              href="/admin/statistics"
              className="bg-background-card border border-green-primary p-6 hover:bg-green-primary/10 transition-colors text-green-vibrant font-medium"
            >
              Statistics/Trust
            </Link>
            <Link
              href="/admin/settings"
              className="bg-background-card border border-gray-dark p-6 hover:border-green-primary transition-colors"
            >
              Site Settings
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-serif mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/projects/new"
              className="bg-background-card border border-gray-dark p-6 hover:border-green-primary transition-colors"
            >
              + New Project
            </Link>
            <Link
              href="/admin/gallery"
              className="bg-background-card border border-gray-dark p-6 hover:border-green-primary transition-colors"
            >
              Manage Gallery
            </Link>
            <Link
              href="/admin/leads"
              className="bg-background-card border border-gray-dark p-6 hover:border-green-primary transition-colors"
            >
              CRM Leads
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-dark flex justify-between items-center">
          <div className="text-sm text-gray-dark">Kitchen Core CMS v1.0</div>
          <div className="space-x-4">
            <Link
              href="/"
              className="text-sm text-gray-light hover:text-green-primary transition-colors"
            >
              View Website
            </Link>
            <Link
              href="/api/auth/signout"
              className="text-sm text-gray-light hover:text-green-primary transition-colors"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

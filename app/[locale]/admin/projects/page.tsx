import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ProjectsListClient from "./ProjectsListClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
    select: {
      id: true,
      title: true,
      slug: true,
      location: true,
      category: true,
      year: true,
      published: true,
      featured: true,
      order: true,
      image: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Portfolio Projects
            </h1>
            <p className="text-gray-600">Manage your project portfolio</p>
          </div>
          <Link
            href={`/${locale}/admin/projects/new`}
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            + New Project
          </Link>
        </div>

        {/* Responsive Projects Table/Cards */}
        <ProjectsListClient projects={projects} locale={locale} />

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href={`/${locale}/admin`}
            className="text-gray-600 hover:text-blue-600 text-sm inline-flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

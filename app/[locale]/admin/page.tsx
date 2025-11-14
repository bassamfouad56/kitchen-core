import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./components/AdminDashboardClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AdminDashboard({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  // Get content stats
  const [
    projectsCount,
    galleryCount,
    testimonialsCount,
    servicesCount,
    videosCount,
    innovationsCount,
    leadsCount,
    teamMembersCount,
    nassGalleryCount,
    blogPostsCount,
    publishedPostsCount,
    draftPostsCount,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.galleryImage.count(),
    prisma.testimonial.count(),
    prisma.service.count(),
    prisma.video.count(),
    prisma.innovation.count(),
    prisma.lead.count(),
    prisma.teamMember.count(),
    prisma.nassGallery.count(),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.blogPost.count({ where: { published: false } }),
  ]);

  const stats = [
    { labelKey: "projects", count: projectsCount, href: `/${locale}/admin/projects` },
    {
      labelKey: "galleryImages",
      count: galleryCount,
      href: `/${locale}/admin/gallery`,
    },
    {
      labelKey: "testimonials",
      count: testimonialsCount,
      href: `/${locale}/admin/testimonials`,
    },
    { labelKey: "services", count: servicesCount, href: `/${locale}/admin/services` },
    { labelKey: "videos", count: videosCount, href: `/${locale}/admin/videos` },
    {
      labelKey: "innovations",
      count: innovationsCount,
      href: `/${locale}/admin/innovations`,
    },
    {
      labelKey: "leadsCRM",
      count: leadsCount,
      href: `/${locale}/admin/leads`,
    },
    {
      labelKey: "teamMembers",
      count: teamMembersCount,
      href: `/${locale}/admin/team-members`,
    },
    {
      labelKey: "nassGallery",
      count: nassGalleryCount,
      href: `/${locale}/admin/nass-gallery`,
    },
    {
      labelKey: "blogPosts",
      count: blogPostsCount,
      href: `/${locale}/admin/blog`,
    },
    {
      labelKey: "publishedPosts",
      count: publishedPostsCount,
      href: `/${locale}/admin/blog`,
    },
    {
      labelKey: "draftPosts",
      count: draftPostsCount,
      href: `/${locale}/admin/blog`,
    },
  ];

  return (
    <AdminDashboardClient userName={session.user.name || ""} stats={stats} />
  );
}

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./components/AdminDashboardClient";

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
    { labelKey: "projects", count: projectsCount, href: "/admin/projects" },
    {
      labelKey: "galleryImages",
      count: galleryCount,
      href: "/admin/gallery",
    },
    {
      labelKey: "testimonials",
      count: testimonialsCount,
      href: "/admin/testimonials",
    },
    { labelKey: "services", count: servicesCount, href: "/admin/services" },
    { labelKey: "videos", count: videosCount, href: "/admin/videos" },
    {
      labelKey: "innovations",
      count: innovationsCount,
      href: "/admin/innovations",
    },
    {
      labelKey: "leadsCRM",
      count: leadsCount,
      href: "/admin/leads",
    },
    {
      labelKey: "teamMembers",
      count: teamMembersCount,
      href: "/admin/team-members",
    },
    {
      labelKey: "nassGallery",
      count: nassGalleryCount,
      href: "/admin/nass-gallery",
    },
    {
      labelKey: "blogPosts",
      count: blogPostsCount,
      href: "/admin/blog",
    },
    {
      labelKey: "publishedPosts",
      count: publishedPostsCount,
      href: "/admin/blog",
    },
    {
      labelKey: "draftPosts",
      count: draftPostsCount,
      href: "/admin/blog",
    },
  ];

  return (
    <AdminDashboardClient userName={session.user.name || ""} stats={stats} />
  );
}

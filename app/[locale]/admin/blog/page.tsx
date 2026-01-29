import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import BlogListClient from "./BlogListClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogManagementPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  return <BlogListClient />;
}

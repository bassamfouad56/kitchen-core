import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NewBlogPostClient from "./NewBlogPostClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NewBlogPostPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  return <NewBlogPostClient />;
}

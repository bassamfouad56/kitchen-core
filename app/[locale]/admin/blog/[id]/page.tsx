import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import EditBlogPostClient from "./EditBlogPostClient";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function EditBlogPostPage({ params }: Props) {
  const { locale, id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  return <EditBlogPostClient id={id} />;
}

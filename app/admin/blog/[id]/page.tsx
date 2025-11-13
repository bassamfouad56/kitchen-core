import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import EditBlogPostClient from "./EditBlogPostClient";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  return <EditBlogPostClient id={id} />;
}

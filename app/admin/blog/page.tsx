import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import BlogListClient from "./BlogListClient";

export default async function BlogManagementPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");

  if (!session) {
    redirect("/admin/login");
  }

  return <BlogListClient />;
}

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import NewBlogPostClient from "./NewBlogPostClient";

export default async function NewBlogPostPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");

  if (!session) {
    redirect("/admin/login");
  }

  return <NewBlogPostClient />;
}

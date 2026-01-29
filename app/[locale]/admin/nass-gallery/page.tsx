import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import NassGalleryListClient from "./NassGalleryListClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NassGalleryPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  return <NassGalleryListClient />;
}

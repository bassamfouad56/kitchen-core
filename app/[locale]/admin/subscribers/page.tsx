import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SubscribersClient from "./SubscribersClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SubscribersPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Newsletter Subscribers</h1>
        <p className="text-gray-600">
          Manage email subscribers and newsletter distribution
        </p>
      </div>

      <SubscribersClient subscribers={subscribers} locale={locale} />
    </div>
  );
}

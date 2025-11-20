import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import UsersListClient from "./UsersListClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function UsersPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  // Get all users except passwords
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-gray-600">
          Manage admin users and their access roles
        </p>
      </div>

      <UsersListClient
        users={users}
        locale={locale}
        currentUserEmail={session.user?.email || ""}
      />
    </div>
  );
}

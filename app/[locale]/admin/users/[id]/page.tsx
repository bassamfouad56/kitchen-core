import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EditUserClient from "./EditUserClient";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function EditUserPage({ params }: Props) {
  const { locale, id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    redirect(`/${locale}/admin/users`);
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit User</h1>
        <p className="text-gray-600">Update user information and permissions</p>
      </div>

      <EditUserClient
        user={user}
        locale={locale}
        currentUserEmail={session.user?.email || ""}
      />
    </div>
  );
}

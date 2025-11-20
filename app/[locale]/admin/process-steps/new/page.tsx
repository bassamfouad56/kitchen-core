import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import NewProcessStepClient from "./NewProcessStepClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NewProcessStepPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Process Step</h1>
        <p className="text-gray-600">Add a new step to the process timeline</p>
      </div>

      <NewProcessStepClient locale={locale} />
    </div>
  );
}

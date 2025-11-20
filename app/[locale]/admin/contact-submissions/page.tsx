import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ContactSubmissionsListClient from "./ContactSubmissionsListClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactSubmissionsPage({ params }: Props) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const processedCount = submissions.filter((s) => s.processed).length;
  const unprocessedCount = submissions.filter((s) => !s.processed).length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Contact Form Submissions</h1>
        <p className="text-gray-600">
          View and manage contact form submissions from the website
        </p>
        <div className="flex gap-4 mt-4">
          <div className="bg-blue-100 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-600">Total: </span>
            <span className="font-bold text-blue-800">
              {submissions.length}
            </span>
          </div>
          <div className="bg-green-100 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-600">Processed: </span>
            <span className="font-bold text-green-800">{processedCount}</span>
          </div>
          <div className="bg-orange-100 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-600">Unprocessed: </span>
            <span className="font-bold text-orange-800">
              {unprocessedCount}
            </span>
          </div>
        </div>
      </div>

      <ContactSubmissionsListClient submissions={submissions} locale={locale} />
    </div>
  );
}

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function LeadsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const leads = await prisma.lead.findMany({
    include: {
      _count: {
        select: { interactions: true, projects: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "CONTACTED":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "QUALIFIED":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "PROPOSAL_SENT":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "NEGOTIATING":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "WON":
        return "bg-green-600/20 text-green-400 border-green-600/30";
      case "LOST":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "ON_HOLD":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "LOW":
        return "text-gray-400";
      case "MEDIUM":
        return "text-yellow-400";
      case "HIGH":
        return "text-orange-400";
      case "URGENT":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif mb-2">Leads Management</h1>
            <p className="text-gray-light">
              Manage customer inquiries and potential clients
            </p>
          </div>
          <Link
            href={`/${locale}/admin/leads/new"
            className="bg-green-primary text-black px-6 py-3 font-medium hover:bg-green-vibrant transition-colors"
          >
            + New Lead
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-background-card border border-gray-dark p-4">
            <div className="text-2xl font-serif text-blue-400 mb-1">
              {leads.filter((l) => l.status === "NEW").length}
            </div>
            <div className="text-sm text-gray-light">New Leads</div>
          </div>
          <div className="bg-background-card border border-gray-dark p-4">
            <div className="text-2xl font-serif text-yellow-400 mb-1">
              {leads.filter((l) => l.status === "CONTACTED").length}
            </div>
            <div className="text-sm text-gray-light">Contacted</div>
          </div>
          <div className="bg-background-card border border-gray-dark p-4">
            <div className="text-2xl font-serif text-green-400 mb-1">
              {leads.filter((l) => l.status === "WON").length}
            </div>
            <div className="text-sm text-gray-light">Won</div>
          </div>
          <div className="bg-background-card border border-gray-dark p-4">
            <div className="text-2xl font-serif text-purple-400 mb-1">
              {leads.filter((l) => l.status === "PROPOSAL_SENT").length}
            </div>
            <div className="text-sm text-gray-light">Proposals Sent</div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-background-card border border-gray-dark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-dark">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-light">
                    Name
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-light">
                    Contact
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-light">
                    Project
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-light">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-light">
                    Priority
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-light">
                    Source
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-light">
                    Created
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-light">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-gray-dark/50 hover:bg-gray-900/20"
                  >
                    <td className="p-4">
                      <div>
                        <div className="font-medium">
                          {lead.firstName} {lead.lastName}
                        </div>
                        {lead.company && (
                          <div className="text-sm text-gray-light">
                            {lead.company}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div>{lead.email}</div>
                        {lead.phone && (
                          <div className="text-gray-light">{lead.phone}</div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        {lead.projectType && (
                          <div className="capitalize">
                            {lead.projectType.toLowerCase()}
                          </div>
                        )}
                        {lead.budget && (
                          <div className="text-gray-light">
                            Budget: {lead.budget}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs rounded border ${getStatusColor(lead.status)}`}
                      >
                        {lead.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-sm ${getPriorityColor(lead.priority)}`}
                      >
                        {lead.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-light capitalize">
                        {lead.source.toLowerCase().replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-light">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="text-green-primary hover:text-green-vibrant text-sm"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/leads/${lead.id}/edit`}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {leads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-light mb-4">No leads yet</p>
            <Link
              href={`/${locale}/admin/leads/new"
              className="inline-block px-6 py-3 bg-green-primary text-black font-medium hover:bg-green-vibrant transition-colors"
            >
              Add Your First Lead
            </Link>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href={`/${locale}/admin"
            className="text-gray-light hover:text-green-primary text-sm"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}








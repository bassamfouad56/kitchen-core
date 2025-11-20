"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  company: string | null;
  jobTitle: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  customerType: string;
  status: string;
  source: string | null;
  tags: string[];
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  projects: Array<{
    id: string;
    titleEn: string;
    titleAr: string;
    slug: string;
    category: string;
    location: string;
    year: string;
    area: string;
    budget: string;
    published: boolean;
    createdAt: Date;
  }>;
  interactions: Array<{
    id: string;
    type: string;
    subject: string | null;
    content: string;
    direction: string;
    outcome: string | null;
    scheduledFor: Date | null;
    completedAt: Date | null;
    createdBy: string | null;
    createdAt: Date;
  }>;
  _count: {
    projects: number;
    interactions: number;
  };
};

interface CustomerDetailsClientProps {
  customer: Customer;
  locale: string;
}

export default function CustomerDetailsClient({
  customer,
  locale,
}: CustomerDetailsClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "overview" | "projects" | "interactions"
  >("overview");
  const [showAddInteraction, setShowAddInteraction] = useState(false);
  const [interactionForm, setInteractionForm] = useState({
    type: "NOTE",
    subject: "",
    content: "",
    direction: "OUTBOUND",
    outcome: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddInteraction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/${locale}/api/admin/customers/${customer.id}/interactions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: interactionForm.type,
            subject: interactionForm.subject || null,
            content: interactionForm.content,
            direction: interactionForm.direction,
            outcome: interactionForm.outcome || null,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add interaction");
      }

      // Reset form
      setInteractionForm({
        type: "NOTE",
        subject: "",
        content: "",
        direction: "OUTBOUND",
        outcome: "",
      });
      setShowAddInteraction(false);
      router.refresh();
    } catch (error) {
      console.error("Error adding interaction:", error);
      setError(
        error instanceof Error ? error.message : "Failed to add interaction",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold">
              {customer.firstName} {customer.lastName}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                customer.status === "ACTIVE"
                  ? "bg-green-100 text-green-800"
                  : customer.status === "INACTIVE"
                    ? "bg-gray-100 text-gray-800"
                    : customer.status === "SUSPENDED"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
              }`}
            >
              {customer.status}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
              {customer.customerType}
            </span>
          </div>
          {customer.company && (
            <p className="text-lg text-gray-600">{customer.company}</p>
          )}
        </div>
        <div className="flex gap-3">
          <a
            href={`/${locale}/admin/customers`}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Back to List
          </a>
          <a
            href={`/${locale}/admin/customers/${customer.id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Customer
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "overview"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "projects"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Projects ({customer._count.projects})
          </button>
          <button
            onClick={() => setActiveTab("interactions")}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "interactions"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Interactions ({customer._count.interactions})
          </button>
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <a
                    href={`mailto:${customer.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {customer.email}
                  </a>
                </dd>
              </div>
              {customer.phone && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a
                      href={`tel:${customer.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {customer.phone}
                    </a>
                  </dd>
                </div>
              )}
              {customer.jobTitle && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Job Title
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {customer.jobTitle}
                  </dd>
                </div>
              )}
              {customer.address && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {customer.address}
                  </dd>
                </div>
              )}
              {customer.city && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    City / Country
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {customer.city}
                    {customer.country && `, ${customer.country}`}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Additional Details */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Additional Details</h2>
            <dl className="space-y-3">
              {customer.source && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Source</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {customer.source}
                  </dd>
                </div>
              )}
              {customer.tags.length > 0 && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Tags</dt>
                  <dd className="mt-1">
                    <div className="flex flex-wrap gap-2">
                      {customer.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Customer Since
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Last Updated
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(customer.updatedAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>

          {/* Notes */}
          {customer.notes && (
            <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
              <h2 className="text-xl font-bold mb-4">Notes</h2>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {customer.notes}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="bg-white rounded-lg shadow">
          {customer.projects.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No projects yet for this customer
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customer.projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {project.titleEn}
                        </div>
                        {project.titleAr && (
                          <div className="text-sm text-gray-500" dir="rtl">
                            {project.titleAr}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.budget}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            project.published
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {project.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a
                          href={`/${locale}/admin/projects/${project.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Interactions Tab */}
      {activeTab === "interactions" && (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Interaction History</h2>
            <button
              onClick={() => setShowAddInteraction(!showAddInteraction)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Add Interaction
            </button>
          </div>

          {/* Add Interaction Form */}
          {showAddInteraction && (
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h3 className="text-lg font-bold mb-4">Add New Interaction</h3>
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">{error}</p>
                </div>
              )}
              <form onSubmit={handleAddInteraction} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type *
                    </label>
                    <select
                      value={interactionForm.type}
                      onChange={(e) =>
                        setInteractionForm({
                          ...interactionForm,
                          type: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="NOTE">Note</option>
                      <option value="EMAIL">Email</option>
                      <option value="PHONE_CALL">Phone Call</option>
                      <option value="MEETING">Meeting</option>
                      <option value="SITE_VISIT">Site Visit</option>
                      <option value="PROPOSAL">Proposal</option>
                      <option value="FOLLOW_UP">Follow Up</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Direction
                    </label>
                    <select
                      value={interactionForm.direction}
                      onChange={(e) =>
                        setInteractionForm({
                          ...interactionForm,
                          direction: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="OUTBOUND">Outbound</option>
                      <option value="INBOUND">Inbound</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={interactionForm.subject}
                    onChange={(e) =>
                      setInteractionForm({
                        ...interactionForm,
                        subject: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Brief subject or title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={interactionForm.content}
                    onChange={(e) =>
                      setInteractionForm({
                        ...interactionForm,
                        content: e.target.value,
                      })
                    }
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Interaction details..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outcome
                  </label>
                  <select
                    value={interactionForm.outcome}
                    onChange={(e) =>
                      setInteractionForm({
                        ...interactionForm,
                        outcome: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Not set</option>
                    <option value="POSITIVE">Positive</option>
                    <option value="NEUTRAL">Neutral</option>
                    <option value="NEGATIVE">Negative</option>
                    <option value="NO_RESPONSE">No Response</option>
                    <option value="SCHEDULED">Scheduled</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {loading ? "Adding..." : "Add Interaction"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddInteraction(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Interactions Timeline */}
          <div className="bg-white rounded-lg shadow">
            {customer.interactions.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                No interactions yet. Add your first interaction above.
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {customer.interactions.map((interaction) => (
                  <div
                    key={interaction.id}
                    className="border-l-4 border-blue-500 pl-4 pb-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                          {interaction.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          {interaction.direction}
                        </span>
                        {interaction.outcome && (
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded ${
                              interaction.outcome === "POSITIVE"
                                ? "bg-green-100 text-green-800"
                                : interaction.outcome === "NEGATIVE"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {interaction.outcome}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(interaction.createdAt).toLocaleDateString()}{" "}
                        {new Date(interaction.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    {interaction.subject && (
                      <div className="font-medium text-gray-900 mb-1">
                        {interaction.subject}
                      </div>
                    )}
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {interaction.content}
                    </p>
                    {interaction.createdBy && (
                      <div className="text-xs text-gray-500 mt-2">
                        By: {interaction.createdBy}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

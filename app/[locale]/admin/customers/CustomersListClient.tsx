"use client";

import { useState, useMemo } from "react";
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
  createdAt: Date;
  updatedAt: Date;
  projects: Array<{
    id: string;
    titleEn: string;
    titleAr: string;
    category: string;
    year: string;
  }>;
  _count: {
    projects: number;
    interactions: number;
  };
};

interface CustomersListClientProps {
  customers: Customer[];
  statuses: string[];
  types: string[];
  locale: string;
}

export default function CustomersListClient({
  customers,
  statuses,
  types,
  locale,
}: CustomersListClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "recent" | "projects">(
    "recent",
  );

  // Filter and search customers
  const filteredCustomers = useMemo(() => {
    const filtered = customers.filter((customer) => {
      // Status filter
      if (selectedStatus !== "all" && customer.status !== selectedStatus) {
        return false;
      }

      // Type filter
      if (selectedType !== "all" && customer.customerType !== selectedType) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          customer.firstName.toLowerCase().includes(query) ||
          customer.lastName.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          customer.company?.toLowerCase().includes(query) ||
          false ||
          customer.phone?.toLowerCase().includes(query) ||
          false ||
          customer.city?.toLowerCase().includes(query) ||
          false
        );
      }

      return true;
    });

    // Sort
    if (sortBy === "name") {
      filtered.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortBy === "recent") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (sortBy === "projects") {
      filtered.sort((a, b) => b._count.projects - a._count.projects);
    }

    return filtered;
  }, [customers, selectedStatus, selectedType, searchQuery, sortBy]);

  const handleDelete = async (customerId: string, customerName: string) => {
    if (
      !confirm(
        `Are you sure you want to delete ${customerName}? This action cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `/${locale}/api/admin/customers/${customerId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete customer");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert(
        error instanceof Error ? error.message : "Failed to delete customer",
      );
    }
  };

  // Statistics
  const totalProjects = customers.reduce(
    (sum, c) => sum + c._count.projects,
    0,
  );
  const totalInteractions = customers.reduce(
    (sum, c) => sum + c._count.interactions,
    0,
  );
  const activeCustomers = customers.filter((c) => c.status === "ACTIVE").length;

  return (
    <div>
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Total Customers</div>
          <div className="text-3xl font-bold">{customers.length}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Active Customers</div>
          <div className="text-3xl font-bold text-green-600">
            {activeCustomers}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Total Projects</div>
          <div className="text-3xl font-bold text-blue-600">
            {totalProjects}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Total Interactions</div>
          <div className="text-3xl font-bold text-purple-600">
            {totalInteractions}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, company, phone, or city..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center mb-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All ({customers.length})</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status} (
                  {customers.filter((c) => c.status === status).length})
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type} (
                  {customers.filter((c) => c.customerType === type).length})
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "name" | "recent" | "projects")
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="name">Name (A-Z)</option>
              <option value="projects">Most Projects</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-sm text-gray-600">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Interactions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      {searchQuery ||
                      selectedStatus !== "all" ||
                      selectedType !== "all"
                        ? "No customers match your filters"
                        : "No customers yet. Add your first customer to get started."}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {customer.firstName} {customer.lastName}
                          </div>
                          {customer.company && (
                            <div className="text-sm text-gray-500">
                              {customer.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {customer.email}
                      </div>
                      {customer.phone && (
                        <div className="text-sm text-gray-500">
                          {customer.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {customer.customerType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer._count.projects}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer._count.interactions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <a
                          href={`/${locale}/admin/customers/${customer.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </a>
                        <a
                          href={`/${locale}/admin/customers/${customer.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </a>
                        <button
                          onClick={() =>
                            handleDelete(
                              customer.id,
                              `${customer.firstName} ${customer.lastName}`,
                            )
                          }
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

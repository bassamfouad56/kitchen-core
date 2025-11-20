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
  notes: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

interface EditCustomerClientProps {
  customer: Customer;
  locale: string;
}

export default function EditCustomerClient({
  customer,
  locale,
}: EditCustomerClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone || "",
    company: customer.company || "",
    jobTitle: customer.jobTitle || "",
    address: customer.address || "",
    city: customer.city || "",
    country: customer.country || "",
    customerType: customer.customerType,
    status: customer.status,
    source: customer.source || "",
    notes: customer.notes || "",
    tags: customer.tags.join(", "),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("First name, last name, and email are required");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/${locale}/api/admin/customers/${customer.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone || null,
            company: formData.company || null,
            jobTitle: formData.jobTitle || null,
            address: formData.address || null,
            city: formData.city || null,
            country: formData.country || null,
            customerType: formData.customerType,
            status: formData.status,
            source: formData.source || null,
            notes: formData.notes || null,
            tags: formData.tags
              ? formData.tags.split(",").map((tag) => tag.trim())
              : [],
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update customer");
      }

      setSuccess("Customer updated successfully");
      router.refresh();

      // Redirect to customer details after short delay
      setTimeout(() => {
        router.push(`/${locale}/admin/customers/${customer.id}`);
      }, 1000);
    } catch (error) {
      console.error("Error updating customer:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update customer",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-3xl">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">{success}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow"
      >
        {/* Basic Information */}
        <div>
          <h2 className="text-lg font-bold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-bold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div>
          <h2 className="text-lg font-bold mb-4">Company Information</h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="jobTitle"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h2 className="text-lg font-bold mb-4">Address Information</h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Street Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div>
          <h2 className="text-lg font-bold mb-4">Customer Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="customerType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Customer Type
              </label>
              <select
                id="customerType"
                name="customerType"
                value={formData.customerType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="INDIVIDUAL">Individual</option>
                <option value="BUSINESS">Business</option>
                <option value="CORPORATE">Corporate</option>
                <option value="GOVERNMENT">Government</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="SUSPENDED">Suspended</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h2 className="text-lg font-bold mb-4">Additional Information</h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="source"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Source
              </label>
              <select
                id="source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Not specified</option>
                <option value="WEBSITE">Website</option>
                <option value="REFERRAL">Referral</option>
                <option value="SOCIAL_MEDIA">Social Media</option>
                <option value="ADVERTISING">Advertising</option>
                <option value="EVENT">Event</option>
                <option value="COLD_CALL">Cold Call</option>
                <option value="OTHER">Other</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">
                How did this customer find you?
              </p>
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="vip, high-value, repeat"
              />
              <p className="mt-1 text-xs text-gray-500">
                Comma-separated tags for categorization
              </p>
            </div>

            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add any additional notes about this customer..."
              />
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Created:</span>{" "}
              {new Date(customer.createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Updated:</span>{" "}
              {new Date(customer.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

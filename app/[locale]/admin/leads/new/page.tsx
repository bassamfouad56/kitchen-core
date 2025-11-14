"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  projectType: string;
  budget: string;
  timeline: string;
  location: string;
  message: string;
  source: string;
  status: string;
  priority: string;
  assignedTo: string;
  notes: string;
  tags: string[];
}

export default function NewLeadPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [lead, setLead] = useState<LeadFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    projectType: "",
    budget: "",
    timeline: "",
    location: "",
    message: "",
    source: "WEBSITE",
    status: "NEW",
    priority: "MEDIUM",
    assignedTo: "",
    notes: "",
    tags: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include authentication cookies
        body: JSON.stringify(lead),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create lead");
      }

      router.push("/admin/leads");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create lead. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif mb-2">Create New Lead</h1>
          <p className="text-gray-light">Add a new potential customer</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm mb-2">First Name *</label>
              <input
                type="text"
                value={lead.firstName}
                onChange={(e) =>
                  setLead({ ...lead, firstName: e.target.value })
                }
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm mb-2">Last Name *</label>
              <input
                type="text"
                value={lead.lastName}
                onChange={(e) => setLead({ ...lead, lastName: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-2">Email *</label>
              <input
                type="email"
                value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm mb-2">Phone</label>
              <input
                type="tel"
                value={lead.phone}
                onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm mb-2">Company</label>
              <input
                type="text"
                value={lead.company}
                onChange={(e) => setLead({ ...lead, company: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              />
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm mb-2">Job Title</label>
              <input
                type="text"
                value={lead.jobTitle}
                onChange={(e) => setLead({ ...lead, jobTitle: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              />
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-sm mb-2">Project Type</label>
              <select
                value={lead.projectType}
                onChange={(e) =>
                  setLead({ ...lead, projectType: e.target.value })
                }
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              >
                <option value="">Select Project Type</option>
                <option value="PALACE">Palace</option>
                <option value="VILLA">Villa</option>
                <option value="ESTATE">Estate</option>
                <option value="PENTHOUSE">Penthouse</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm mb-2">Budget</label>
              <input
                type="text"
                value={lead.budget}
                onChange={(e) => setLead({ ...lead, budget: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              />
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-sm mb-2">Timeline</label>
              <input
                type="text"
                value={lead.timeline}
                onChange={(e) => setLead({ ...lead, timeline: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm mb-2">Location</label>
              <input
                type="text"
                value={lead.location}
                onChange={(e) => setLead({ ...lead, location: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm mb-2">Message *</label>
            <textarea
              value={lead.message}
              onChange={(e) => setLead({ ...lead, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              required
            />
          </div>

          {/* Source, Status, Priority */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm mb-2">Source</label>
              <select
                value={lead.source}
                onChange={(e) => setLead({ ...lead, source: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              >
                <option value="WEBSITE">Website</option>
                <option value="SOCIAL_MEDIA">Social Media</option>
                <option value="REFERRAL">Referral</option>
                <option value="ADVERTISING">Advertising</option>
                <option value="SHOWROOM">Showroom</option>
                <option value="EVENT">Event</option>
                <option value="PHONE">Phone</option>
                <option value="EMAIL">Email</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Status</label>
              <select
                value={lead.status}
                onChange={(e) => setLead({ ...lead, status: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              >
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="QUALIFIED">Qualified</option>
                <option value="PROPOSAL_SENT">Proposal Sent</option>
                <option value="NEGOTIATING">Negotiating</option>
                <option value="WON">Won</option>
                <option value="LOST">Lost</option>
                <option value="ON_HOLD">On Hold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Priority</label>
              <select
                value={lead.priority}
                onChange={(e) => setLead({ ...lead, priority: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm mb-2">Notes</label>
            <textarea
              value={lead.notes}
              onChange={(e) => setLead({ ...lead, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-dark">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-green-primary text-black hover:bg-green-vibrant transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Creating..." : "Create Lead"}
            </button>
            <Link
              href={`/${locale}/admin/leads"
              className="px-6 py-3 border border-gray-dark text-gray-light hover:text-white hover:border-white transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

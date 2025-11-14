"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  location?: string;
  message: string;
  source: string;
  status: string;
  priority: string;
  assignedTo?: string;
  notes?: string;
  lastContacted?: string;
  nextFollowUp?: string;
  tags: string[];
  metadata?: any;
  createdAt: string;
  updatedAt: string;
  interactions: any[];
  projects: any[];
  _count: {
    interactions: number;
    projects: number;
  };
}

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
  lastContacted: string;
  nextFollowUp: string;
  tags: string[];
}

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  const [formData, setFormData] = useState<LeadFormData>({
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
    lastContacted: "",
    nextFollowUp: "",
    tags: [],
  });

  useEffect(() => {
    params.then(p => {
      setLeadId(p.id)
      fetchLead(p.id)
    })
  }, []);

  const fetchLead = async (id: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`);
      if (!res.ok) throw new Error("Failed to fetch lead");

      const leadData = await res.json();
      setLead(leadData);

      // Populate form data
      setFormData({
        firstName: leadData.firstName || "",
        lastName: leadData.lastName || "",
        email: leadData.email || "",
        phone: leadData.phone || "",
        company: leadData.company || "",
        jobTitle: leadData.jobTitle || "",
        projectType: leadData.projectType || "",
        budget: leadData.budget || "",
        timeline: leadData.timeline || "",
        location: leadData.location || "",
        message: leadData.message || "",
        source: leadData.source || "WEBSITE",
        status: leadData.status || "NEW",
        priority: leadData.priority || "MEDIUM",
        assignedTo: leadData.assignedTo || "",
        notes: leadData.notes || "",
        lastContacted: leadData.lastContacted
          ? new Date(leadData.lastContacted).toISOString().split("T")[0]
          : "",
        nextFollowUp: leadData.nextFollowUp
          ? new Date(leadData.nextFollowUp).toISOString().split("T")[0]
          : "",
        tags: leadData.tags || [],
      });
    } catch (err) {
      setError("Failed to load lead");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadId) return;

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update lead");

      await fetchLead(leadId);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update lead. Please try again.");
    } finally {
      setSaving(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Lead not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif mb-2">
              {lead.firstName} {lead.lastName}
            </h1>
            <p className="text-gray-light">Lead Details</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 border border-gray-dark text-gray-light hover:text-white hover:border-white transition-colors"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            <Link
              href={`/${locale}/admin/leads"
              className="px-4 py-2 border border-gray-dark text-gray-light hover:text-white hover:border-white transition-colors"
            >
              Back to Leads
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-200">
            {error}
          </div>
        )}

        {isEditing ? (
          /* Edit Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Job Title</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Project Type</label>
                <select
                  value={formData.projectType}
                  onChange={(e) =>
                    setFormData({ ...formData, projectType: e.target.value })
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
              <div>
                <label className="block text-sm mb-2">Budget</label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Timeline</label>
                <input
                  type="text"
                  value={formData.timeline}
                  onChange={(e) =>
                    setFormData({ ...formData, timeline: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Source</label>
                <select
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value })
                  }
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
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
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
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Last Contacted</label>
                <input
                  type="date"
                  value={formData.lastContacted}
                  onChange={(e) =>
                    setFormData({ ...formData, lastContacted: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Next Follow-up</label>
                <input
                  type="date"
                  value={formData.nextFollowUp}
                  onChange={(e) =>
                    setFormData({ ...formData, nextFollowUp: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 bg-black border border-gray-dark text-white focus:border-green-primary focus:outline-none"
              />
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-dark">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-green-primary text-black hover:bg-green-vibrant transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border border-gray-dark text-gray-light hover:text-white hover:border-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          /* View Mode */
          <div className="space-y-6">
            {/* Status and Priority */}
            <div className="flex gap-4 items-center">
              <span
                className={`px-3 py-1 text-sm rounded border ${getStatusColor(lead.status)}`}
              >
                {lead.status.replace("_", " ")}
              </span>
              <span className="text-sm text-gray-light">
                Priority: {lead.priority}
              </span>
            </div>

            {/* Contact Information */}
            <div className="bg-background-card border border-gray-dark p-6">
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-light">Name</div>
                  <div className="font-medium">
                    {lead.firstName} {lead.lastName}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-light">Email</div>
                  <div className="font-medium">{lead.email}</div>
                </div>
                {lead.phone && (
                  <div>
                    <div className="text-sm text-gray-light">Phone</div>
                    <div className="font-medium">{lead.phone}</div>
                  </div>
                )}
                {lead.company && (
                  <div>
                    <div className="text-sm text-gray-light">Company</div>
                    <div className="font-medium">{lead.company}</div>
                  </div>
                )}
                {lead.jobTitle && (
                  <div>
                    <div className="text-sm text-gray-light">Job Title</div>
                    <div className="font-medium">{lead.jobTitle}</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-gray-light">Source</div>
                  <div className="font-medium capitalize">
                    {lead.source.toLowerCase().replace("_", " ")}
                  </div>
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="bg-background-card border border-gray-dark p-6">
              <h3 className="text-lg font-medium mb-4">Project Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lead.projectType && (
                  <div>
                    <div className="text-sm text-gray-light">Project Type</div>
                    <div className="font-medium capitalize">
                      {lead.projectType.toLowerCase()}
                    </div>
                  </div>
                )}
                {lead.budget && (
                  <div>
                    <div className="text-sm text-gray-light">Budget</div>
                    <div className="font-medium">{lead.budget}</div>
                  </div>
                )}
                {lead.timeline && (
                  <div>
                    <div className="text-sm text-gray-light">Timeline</div>
                    <div className="font-medium">{lead.timeline}</div>
                  </div>
                )}
                {lead.location && (
                  <div>
                    <div className="text-sm text-gray-light">Location</div>
                    <div className="font-medium">{lead.location}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="bg-background-card border border-gray-dark p-6">
              <h3 className="text-lg font-medium mb-4">Message</h3>
              <p className="text-gray-light whitespace-pre-wrap">
                {lead.message}
              </p>
            </div>

            {/* Notes */}
            {lead.notes && (
              <div className="bg-background-card border border-gray-dark p-6">
                <h3 className="text-lg font-medium mb-4">Notes</h3>
                <p className="text-gray-light whitespace-pre-wrap">
                  {lead.notes}
                </p>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-background-card border border-gray-dark p-6">
              <h3 className="text-lg font-medium mb-4">Timeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-light">Created</div>
                  <div className="font-medium">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </div>
                </div>
                {lead.lastContacted && (
                  <div>
                    <div className="text-sm text-gray-light">
                      Last Contacted
                    </div>
                    <div className="font-medium">
                      {new Date(lead.lastContacted).toLocaleDateString()}
                    </div>
                  </div>
                )}
                {lead.nextFollowUp && (
                  <div>
                    <div className="text-sm text-gray-light">
                      Next Follow-up
                    </div>
                    <div className="font-medium">
                      {new Date(lead.nextFollowUp).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-background-card border border-gray-dark p-6">
              <h3 className="text-lg font-medium mb-4">Activity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-light">Interactions</div>
                  <div className="font-medium">{lead._count.interactions}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-light">Projects</div>
                  <div className="font-medium">{lead._count.projects}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}








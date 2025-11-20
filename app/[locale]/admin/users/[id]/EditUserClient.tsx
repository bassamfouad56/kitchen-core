"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

interface EditUserClientProps {
  user: User;
  locale: string;
  currentUserEmail: string;
}

export default function EditUserClient({
  user,
  locale,
  currentUserEmail,
}: EditUserClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email,
    role: user.role as "ADMIN" | "EDITOR",
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const isSelf = user.email === currentUserEmail;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.email) {
      setError("Email is required");
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
      const response = await fetch(`/${locale}/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name || null,
          email: formData.email,
          role: formData.role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update user");
      }

      setSuccess("User updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Error updating user:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update user",
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      setError("Please enter and confirm the new password");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/${locale}/api/admin/users/${user.id}/password`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newPassword: passwordData.newPassword,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to change password");
      }

      setSuccess("Password changed successfully");
      setPasswordData({ newPassword: "", confirmPassword: "" });
      setShowPasswordChange(false);
    } catch (error) {
      console.error("Error changing password:", error);
      setError(
        error instanceof Error ? error.message : "Failed to change password",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {/* User Details Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow space-y-6"
      >
        <h2 className="text-xl font-semibold mb-4">User Details</h2>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Role <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            disabled={isSelf}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="EDITOR">Editor</option>
            <option value="ADMIN">Admin</option>
          </select>
          {isSelf && (
            <p className="mt-1 text-xs text-gray-500">
              You cannot change your own role
            </p>
          )}
        </div>

        {/* Metadata */}
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Created:</span>{" "}
              {new Date(user.createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Updated:</span>{" "}
              {new Date(user.updatedAt).toLocaleString()}
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

      {/* Password Change Section */}
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        {!showPasswordChange ? (
          <button
            onClick={() => setShowPasswordChange(true)}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
          >
            Change Password
          </button>
        ) : (
          <form onSubmit={handlePasswordChange} className="space-y-6">
            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordFieldChange}
                required
                minLength={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-gray-500">Minimum 8 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordFieldChange}
                required
                minLength={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordChange(false);
                  setPasswordData({ newPassword: "", confirmPassword: "" });
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

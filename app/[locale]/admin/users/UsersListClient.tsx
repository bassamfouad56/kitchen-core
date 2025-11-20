"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

interface UsersListClientProps {
  users: User[];
  locale: string;
  currentUserEmail: string;
}

export default function UsersListClient({
  users,
  locale,
  currentUserEmail,
}: UsersListClientProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (userId: string, userEmail: string) => {
    // Prevent self-deletion
    if (userEmail === currentUserEmail) {
      alert("You cannot delete yourself!");
      return;
    }

    if (!confirm(`Are you sure you want to delete user: ${userEmail}?`)) {
      return;
    }

    setDeleting(userId);
    try {
      const response = await fetch(`/${locale}/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete user");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(error instanceof Error ? error.message : "Failed to delete user");
    } finally {
      setDeleting(null);
    }
  };

  if (users.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600 mb-4">No users found</p>
        <Link
          href={`/${locale}/admin/users/new`}
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create First User
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Create New User Button */}
      <div className="mb-6">
        <Link
          href={`/${locale}/admin/users/new`}
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Create New User
        </Link>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name || "-"}
                    {user.email === currentUserEmail && (
                      <span className="ml-2 text-xs text-blue-600 font-semibold">
                        (You)
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === "ADMIN"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/${locale}/admin/users/${user.id}`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id, user.email)}
                    disabled={
                      deleting === user.id || user.email === currentUserEmail
                    }
                    className={`${
                      user.email === currentUserEmail
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-red-600 hover:text-red-900"
                    } disabled:text-gray-400`}
                    title={
                      user.email === currentUserEmail
                        ? "You cannot delete yourself"
                        : "Delete user"
                    }
                  >
                    {deleting === user.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Statistics */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Total Users</div>
          <div className="text-2xl font-bold text-blue-800">{users.length}</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Admins</div>
          <div className="text-2xl font-bold text-purple-800">
            {users.filter((u) => u.role === "ADMIN").length}
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Editors</div>
          <div className="text-2xl font-bold text-green-800">
            {users.filter((u) => u.role === "EDITOR").length}
          </div>
        </div>
      </div>
    </div>
  );
}

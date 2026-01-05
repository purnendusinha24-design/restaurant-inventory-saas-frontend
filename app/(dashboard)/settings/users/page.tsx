"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api/client";

type User = {
  id: string;
  email: string;
  name: string;
  role: "OWNER" | "MANAGER" | "STAFF";
  isActive: boolean;
  createdAt: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "STAFF",
  });

  async function loadUsers() {
    try {
      const data = await apiFetch<User[]>("/users");
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) return <div className="p-6">Loading users...</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Users</h1>
        <button
          onClick={() => setShowModal(true)}
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-300"
        >
          + Add User
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-sm text-slate-300">
          <thead className="bg-slate-900 text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Role</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-t border-slate-600 hover:bg-slate-400/50"
              >
                <td className="px-4 py-3  text-slate-800">{u.name}</td>
                <td className="px-4 py-3 text-slate-800">{u.email}</td>
                <td className="px-4 py-3">
                  <span className="rounded-md bg-slate-800 px-2 py-1 text-xs">
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 align-middle">
                  <button
                    onClick={async () => {
                      if (u.role === "OWNER") return;

                      const ok = confirm(
                        `Are you sure you want to ${
                          u.isActive ? "deactivate" : "activate"
                        } this user?`
                      );
                      if (!ok) return;

                      await apiFetch(`/users/${u.id}/status`, {
                        method: "PATCH",
                      });

                      loadUsers();
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1
      text-xs font-medium leading-none transition
      ${
        u.isActive
          ? "bg-green-500/20 text-green-700 ring-1 ring-green-600/30 hover:bg-green-500/30"
          : "bg-red-500/20 text-red-700 ring-1 ring-red-600/30 hover:bg-red-500/30"
      }
      ${u.role === "OWNER" ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
    `}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        u.isActive ? "bg-green-600" : "bg-red-600"
                      }`}
                    />
                    {u.isActive ? "Active" : "Inactive"}
                  </button>
                </td>

                <td className="px-4 py-3 text-slate-700">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-slate-900 p-6">
            <h2 className="mb-4 text-lg font-semibold">Add User</h2>

            <div className="space-y-3">
              <input
                placeholder="Name"
                className="w-full rounded bg-slate-800 px-3 py-2 text-sm text-white"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                placeholder="Email"
                className="w-full rounded bg-slate-800 px-3 py-2 text-sm text-white"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <select
                className="w-full rounded bg-slate-800 px-3 py-2 text-sm text-white"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="STAFF">Staff</option>
                <option value="MANAGER">Manager</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-slate-400"
              >
                Cancel
              </button>
              <button
                disabled={submitting}
                onClick={async () => {
                  setSubmitting(true);
                  try {
                    await apiFetch("/users", {
                      method: "POST",
                      body: JSON.stringify(form),
                    });
                    setShowModal(false);
                    loadUsers();
                  } catch (err) {
                    console.error(err);
                    alert("Failed to add user");
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
              >
                {submitting ? "Adding..." : "Add User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

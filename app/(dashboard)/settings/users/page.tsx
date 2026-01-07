"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/use-auth";
import { fetchUsers, updateUserStatus } from "@/lib/api/users";
import type { UserListItem } from "@/lib/api/types";
import { AddUserModal } from "@/components/users/add-user-modal";
import { deleteUser } from "@/lib/api/users";

/* ----------------------------------------
   Status style helper
----------------------------------------- */
const statusSelectClass = (status: UserListItem["status"]) =>
  status === "ACTIVE"
    ? "bg-green-900 text-green-300 border border-green-700"
    : "bg-red-900 text-red-300 border border-red-700";

export default function UsersPage() {
  const { user, isLoading: authLoading } = useAuth();

  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);

  const isOwner = user?.role === "OWNER";

  /* ----------------------------------------
     FETCH USERS
  ----------------------------------------- */
  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  /* ----------------------------------------
     STATUS TOGGLE
  ----------------------------------------- */
  const handleStatusChange = async (id: string) => {
    await updateUserStatus(id);

    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
            }
          : u
      )
    );
  };

  const handleDeleteUser = async (id: string) => {
    const confirmed = window.confirm(
      "This will permanently remove the invited user. Continue?"
    );

    if (!confirmed) return;

    await deleteUser(id);

    // Remove from UI immediately
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  /* ----------------------------------------
     BLOCK RENDER UNTIL READY
  ----------------------------------------- */
  if (authLoading || loading) {
    return <p className="text-slate-400">Loading users…</p>;
  }

  return (
    <div className="space-y-4">
      {/* OWNER ACTIONS */}
      {isOwner && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowAddUser(true)}
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white"
          >
            + Add User
          </button>
        </div>
      )}

      {/* EMPTY STATE */}
      {users.length === 0 ? (
        <div className="rounded-lg border border-slate-800 p-6 text-slate-400">
          No users found.
        </div>
      ) : (
        <div className="rounded-lg border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900 text-slate-300">
              <tr>
                <th className="px-4 py-2 text-center">Name</th>
                <th className="px-4 py-2 text-center">Email</th>
                <th className="px-4 py-2 text-center">Phone</th>
                <th className="px-4 py-2 text-center">Role</th>
                <th className="px-4 py-2 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => {
                const canEdit = isOwner && u.role !== "OWNER";

                return (
                  <tr
                    key={u.id}
                    className="border-t border-slate-800 hover:bg-slate-900/40"
                  >
                    <td className="px-4 py-2 text-blue-950 text-center">
                      {u.name}
                    </td>
                    <td className="px-4 py-2 text-blue-950 text-center">
                      {u.email}
                    </td>
                    <td className="px-4 py-2 text-blue-950 text-center">
                      {u.phone}
                    </td>
                    <td className="px-4 py-2 text-blue-950 text-center">
                      {u.role}
                    </td>

                    <td className="px-4 py-2 flex items-center gap-1.5">
                      {canEdit ? (
                        <select
                          value={u.status}
                          onChange={() => handleStatusChange(u.id)}
                          className={`
        rounded px-3 py-1 text-sm font-medium
        cursor-pointer transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-slate-500
        ${statusSelectClass(u.status)}
      `}
                        >
                          <option value="ACTIVE">Active</option>
                          <option value="INACTIVE">Inactive</option>
                        </select>
                      ) : (
                        <span
                          className={`
        inline-flex items-center rounded-full
        px-3 py-1 text-xs font-semibold
        ${
          u.status === "ACTIVE"
            ? "bg-green-900 text-green-300"
            : "bg-red-900 text-red-300"
        }
      `}
                        >
                          {u.status}
                        </span>
                      )}

                      {/* DELETE — INVITED ONLY */}
                      {isOwner && u.status === "INACTIVE" && (
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD USER MODAL */}
      {showAddUser && (
        <AddUserModal
          onClose={() => setShowAddUser(false)}
          onCreated={(newUser) => setUsers((prev) => [newUser, ...prev])}
        />
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { updateUser } from "@/lib/actions/user";

export default function AdminUsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;



  const handleUserUpdate = async (userId, updateData) => {
  try {
    setActionLoading(userId + JSON.stringify(updateData));

    const result = await updateUser(userId, updateData);

    if (!result?.success) {
      alert(result?.message || "Failed to update user.");
      return;
    }

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, ...updateData } : user
      )
    );
  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    setActionLoading("");
  }
};

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${baseUrl}/users`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (!data?.success) {
          setError(data?.message || "Failed to load users.");
          return;
        }

        setUsers(data?.data || []);
      } catch (error) {
        setError("Something went wrong while loading users.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [baseUrl]);

  if (loading) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <p className="text-slate-500">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-red-100 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">Unable to load</h2>
        <p className="mt-2 text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">No users found</h2>
        <p className="mt-2 text-sm text-slate-500">
          No user has registered yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-3xl bg-white border border-blue-100 shadow-sm overflow-hidden">
      <div className="border-b border-slate-100 p-5">
        <h2 className="text-xl font-bold text-slate-900">
          All Users
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Total users: {users.length}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
                User
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
                Email
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
                Role
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
                Status
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
                Created
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
  Action
</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user._id || user.id || user.email} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image || "/images/default-user.png"}
                      alt={user.name || "User"}
                      className="h-11 w-11 rounded-full object-cover border"
                      referrerPolicy="no-referrer"
                    />

                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {user.name || "Unknown User"}
                      </h3>

                      <p className="text-xs text-slate-500">
                        ID: {user._id || user.id || "N/A"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {user.email}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 capitalize">
                    {user.role || "patient"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 capitalize">
                    {user.status || "active"}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-slate-500">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                

                <td className="px-5 py-4">
  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => handleUserUpdate(user._id, { role: "patient" })}
      disabled={
        user.role === "patient" ||
        actionLoading === user._id + JSON.stringify({ role: "patient" })
      }
      className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 disabled:opacity-50"
    >
      Patient
    </button>

    <button
      onClick={() => handleUserUpdate(user._id, { role: "doctor" })}
      disabled={
        user.role === "doctor" ||
        actionLoading === user._id + JSON.stringify({ role: "doctor" })
      }
      className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 hover:bg-purple-100 disabled:opacity-50"
    >
      Doctor
    </button>

   
    <button
      onClick={() => handleUserUpdate(user._id, { status: "active" })}
      disabled={
        user.status === "active" ||
        actionLoading === user._id + JSON.stringify({ status: "active" })
      }
      className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100 disabled:opacity-50"
    >
      Active
    </button>

    <button
      onClick={() => handleUserUpdate(user._id, { status: "blocked" })}
      disabled={
        user.status === "blocked" ||
        actionLoading === user._id + JSON.stringify({ status: "blocked" })
      }
      className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
    >
      Block
    </button>
  </div>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
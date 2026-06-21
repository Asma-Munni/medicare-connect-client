
import AdminOverviewCards from "@/components/AdminOverViewCards";
import Link from "next/link";

export const metadata = {
  title: "Admin Dashboard | MediCare Connect",
  description: "Admin dashboard overview.",
};

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
          <p className="text-blue-600 font-semibold">Admin Dashboard</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Dashboard Overview
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View platform statistics, doctor verification status, appointment
            activity, and user summary.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/dashboard/admin/users"
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              Manage Users
            </Link>

            <Link
              href="/dashboard/admin/doctors"
              className="rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition"
            >
              Manage Doctors
            </Link>

            <Link
              href="/dashboard/admin/appointments"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              Manage Appointments
            </Link>
          </div>
        </div>

        <AdminOverviewCards />
      </section>
    </main>
  );
}
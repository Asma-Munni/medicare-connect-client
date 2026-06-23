import AdminAppointmentsList from "@/components/AdminAppointmentsList";
import { protectedFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Manage Appointments | MediCare Connect",
  description: "Admin appointment management page.",
};

export default async function AdminAppointmentsPage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/auth/signin");
  }

  if (user?.role !== "admin") {
    redirect("/unauthorized");
  }

  const result = await protectedFetch("/appointments");

  const appointments = result?.success ? result?.data || [] : [];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="mb-6">
          <p className="text-blue-600 font-semibold">Admin Dashboard</p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Manage Appointments
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View, accept, reject, complete, or cancel patient appointments.
          </p>
        </div>

        {!result?.success ? (
          <div className="rounded-3xl bg-white border border-red-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              Unable to load appointments
            </h2>

            <p className="mt-2 text-sm text-red-500">
              {result?.message || "Failed to load appointments."}
            </p>
          </div>
        ) : (
          <AdminAppointmentsList appointments={appointments} />
        )}
      </section>
    </main>
  );
}
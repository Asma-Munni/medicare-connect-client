import PatientAppointmentsList from "@/components/PatientAppointmentsList";
import { protectedFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Appointments | MediCare Connect",
  description: "View your booked appointments.",
};

export default async function PatientAppointmentsPage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/auth/signin");
  }

  if (user?.role !== "patient") {
    redirect("/unauthorized");
  }

  const patientId = user?.id || user?._id || user?.email;

  if (!patientId) {
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
          <div className="rounded-3xl bg-white border border-red-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              Unable to load appointments
            </h2>
            <p className="mt-2 text-sm text-red-500">
              Patient ID was not found. Please login again.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const result = await protectedFetch(
    `/appointments/patient/${encodeURIComponent(patientId)}`
  );

  const appointments = result?.success ? result?.data || [] : [];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
        <div className="mb-6">
          <p className="text-blue-600 font-semibold">Patient Dashboard</p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            My Appointments
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View your appointment requests, status, and payment information.
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
          <PatientAppointmentsList appointments={appointments} />
        )}
      </section>
    </main>
  );
}
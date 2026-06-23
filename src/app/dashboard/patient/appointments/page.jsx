import PatientAppointmentsList from "@/components/PatientAppointmentsList";
import { protectedFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "My Appointments | MediCare Connect",
  description: "View your booked appointments.",
};

export default async function PatientAppointmentsPage() {
  const user = await getUserSession();

  const patientId = user?.id || user?._id || user?.email;

  const result = await protectedFetch(`/appointments/patient/${patientId}`);

  const appointments = result?.data || [];

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

        <PatientAppointmentsList appointments={appointments} />
      </section>
    </main>
  );
}
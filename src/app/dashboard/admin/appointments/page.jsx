import PatientAppointmentsList from "@/components/PatientAppointmentsList";
import { protectedFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "My Appointments | MediCare Connect",
  description: "Patient appointment list page.",
};

export default async function PatientAppointmentsPage() {
  const user = await getUserSession();

  const patientId = user?.id || user?._id || user?.email;

  const result = await protectedFetch(`/appointments/patient/${patientId}`);

  const appointments = result?.data || [];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
          <p className="text-blue-600 font-semibold">Patient Dashboard</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            My Appointments
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View your booked appointments, appointment status, and payment
            status.
          </p>
        </div>

        <PatientAppointmentsList appointments={appointments} />
      </section>
    </main>
  );
}
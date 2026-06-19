import PatientAppointmentsList from "@/components/PatientAppointmentsList";


export const metadata = {
  title: "My Appointments | MediCare Connect",
  description: "View your booked appointments.",
};

export default function PatientAppointmentsPage() {
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

        <PatientAppointmentsList />
      </section>
    </main>
  );
}
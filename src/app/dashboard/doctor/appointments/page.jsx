import DoctorProfilePreview from "@/components/DoctorProfilePreview";
import DoctorAppointmentRequests from "@/components/DoctorAppointmentRequests";

export const metadata = {
  title: "Doctor Appointments | MediCare Connect",
  description: "Doctor appointment requests page.",
};

export default function DoctorAppointmentsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
          <p className="text-blue-600 font-semibold">Doctor Dashboard</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Appointment Requests
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View patient appointment requests for the logged-in doctor.
          </p>
        </div>

        <DoctorProfilePreview />

        <DoctorAppointmentRequests />
      </section>
    </main>
  );
}
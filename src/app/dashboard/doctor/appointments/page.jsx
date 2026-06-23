import DoctorProfilePreview from "@/components/DoctorProfilePreview";
import DoctorAppointmentRequests from "@/components/DoctorAppointmentRequests";
import { protectedFetch, serverFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Doctor Appointments | MediCare Connect",
  description: "Doctor appointment requests page.",
};

export default async function DoctorAppointmentsPage() {
  const user = await getUserSession();

  const doctorResult = user?.email
    ? await serverFetch(`/doctors/email/${encodeURIComponent(user.email)}`)
    : null;

  const doctor = doctorResult?.data || null;

  const appointmentsResult = doctor?._id
    ? await protectedFetch(`/appointments/doctor/${doctor._id}`)
    : null;

  const appointments = appointmentsResult?.data || [];

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

        <DoctorProfilePreview doctor={doctor} />

        <DoctorAppointmentRequests appointments={appointments} />
      </section>
    </main>
  );
}
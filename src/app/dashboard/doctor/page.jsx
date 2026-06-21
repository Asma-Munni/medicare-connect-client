import DoctorOverviewCards from "@/components/DoctorOverviewCards";
import Link from "next/link";

export const metadata = {
  title: "Doctor Dashboard | MediCare Connect",
  description: "Doctor dashboard overview.",
};

export default function DoctorDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
          <p className="text-blue-600 font-semibold">Doctor Dashboard</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Appointment Overview
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View your appointment requests, pending patients, accepted
            consultations, and completed appointments.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/dashboard/doctor/appointments"
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              Appointment Requests
            </Link>

            <Link
              href="/find-doctors"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              Find Doctors
            </Link>
          </div>
        </div>

        <DoctorOverviewCards />
      </section>
    </main>
  );
}
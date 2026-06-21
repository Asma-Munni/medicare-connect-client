import PatientOverviewCards from "@/components/PatientOverviewCards";
import Link from "next/link";

export const metadata = {
  title: "Patient Dashboard | MediCare Connect",
  description: "Patient dashboard overview.",
};

export default function PatientDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
          <p className="text-blue-600 font-semibold">Patient Dashboard</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            My Health Overview
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View your appointment summary, booking status, and payment
            information.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/find-doctors"
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              Find Doctors
            </Link>

            <Link
              href="/dashboard/patient/appointments"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              My Appointments
            </Link>
          </div>
        </div>

        <PatientOverviewCards />
      </section>
    </main>
  );
}
import Link from "next/link";
import { getUserSession } from "@/lib/core/session";
import { protectedFetch } from "@/lib/core/server";
import { redirect } from "next/navigation";
import DoctorOverviewCards from "@/components/DoctorOverviewCards";

export const metadata = {
  title: "Doctor Dashboard | MediCare Connect",
  description: "Doctor dashboard overview.",
};

export default async function DoctorDashboardPage() {
  const user = await getUserSession();

  // 🔐 AUTH CHECK
  if (!user) {
    redirect("/auth/signin");
  }

  // 🔐 ROLE CHECK
  if (user.role !== "doctor") {
    redirect("/unauthorized");
  }

  // 📦 GET DOCTOR PROFILE
  const result = await protectedFetch(
    `/doctors/email/${encodeURIComponent(user.email)}`
  );

  const doctor = result?.data;

  // ❌ NO PROFILE → CREATE PROFILE PAGE
  if (!doctor) {
    redirect("/dashboard/doctor/create-profile");
  }

  // ❌ NOT VERIFIED → BLOCK ACCESS
  if (doctor.verificationStatus !== "verified") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-3xl border border-blue-100 text-center max-w-md">
          <h2 className="text-2xl font-bold text-slate-900">
            Profile Pending Verification
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your profile is under review by admin. Please wait for approval.
          </p>

          <div className="mt-5 px-4 py-2 rounded-full bg-yellow-50 text-yellow-700 text-sm font-semibold">
            Status: {doctor.verificationStatus}
          </div>

          <Link
            href="/dashboard/doctor"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-full"
          >
            Refresh Dashboard
          </Link>
        </div>
      </main>
    );
  }

  // ✅ VERIFIED DOCTOR DASHBOARD
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6">

        {/* HEADER */}
        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
          <p className="text-blue-600 font-semibold">Doctor Dashboard</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Welcome Dr. {doctor.doctorName}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your appointments, patients, and consultations.
          </p>

          {/* ACTION BUTTONS */}
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

        {/* OVERVIEW CARDS */}
        <DoctorOverviewCards doctor={doctor} />

      </section>
    </main>
  );
}
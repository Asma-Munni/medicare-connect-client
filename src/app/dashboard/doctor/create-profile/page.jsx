import CreateDoctorProfileForm from "@/components/CreateDoctorProfileForm";
import { protectedFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create Profile | MediCare Connect",
  description: "Doctor profile creation page.",
};

export default async function DoctorCreateProfilePage() {
  const user = await getUserSession();

  // 🔐 AUTH CHECK
  if (!user) {
    redirect("/auth/signin");
  }

  // 🔐 ROLE CHECK
  if (user.role !== "doctor") {
    redirect("/unauthorized");
  }

  // ⚠️ SAFETY: email check
  if (!user.email) {
    return (
      <div className="p-6 text-center text-red-500">
        Doctor email not found
      </div>
    );
  }

  // 🔍 GET DOCTOR PROFILE
  const result = await protectedFetch(
    `/doctors/email/${encodeURIComponent(user.email)}`
  );

  const doctor = result?.success ? result.data : null;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto px-4 lg:px-8 py-6">

        {/* HEADER */}
        <div className="mb-6">
          <p className="text-blue-600 font-semibold">Doctor Dashboard</p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Create Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create your doctor profile and wait for admin verification
          </p>
        </div>

        {/* PROFILE EXISTS */}
        {doctor ? (
          <div className="rounded-3xl bg-white border border-blue-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-green-600">
              Profile Already Exists
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Verification Status:{" "}
              <span className="font-semibold">
                {doctor.verificationStatus || "pending"}
              </span>
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Go to your dashboard to manage appointments
            </p>
          </div>
        ) : (
          // CREATE PROFILE FORM
          <div className="rounded-3xl bg-white border border-blue-100 p-6">
            <CreateDoctorProfileForm user={user} />
          </div>
        )}

      </section>
    </main>
  );
}
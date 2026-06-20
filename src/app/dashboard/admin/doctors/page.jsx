import AdminDoctorsList from "@/components/AdminDoctorsList";

export const metadata = {
  title: "Manage Doctors | MediCare Connect",
  description: "Admin doctor verification page.",
};

export default function AdminDoctorsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
          <p className="text-blue-600 font-semibold">Admin Dashboard</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Manage Doctors
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Admin can verify, reject, or keep doctor profiles pending from this page.
          </p>
        </div>

        <AdminDoctorsList />
      </section>
    </main>
  );
}
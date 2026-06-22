import DoctorScheduleForm from "@/components/DoctorScheduleForm";

export const metadata = {
  title: "Manage Schedule | MediCare Connect",
  description: "Doctor schedule management page.",
};

export default function DoctorSchedulePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
          <p className="text-blue-600 font-semibold">Doctor Dashboard</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Manage Schedule
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update your available consultation days and time slots.
          </p>
        </div>

        <DoctorScheduleForm />
      </section>
    </main>
  );
}
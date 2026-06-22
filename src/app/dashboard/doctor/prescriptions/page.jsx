import DoctorPrescriptionsList from "@/components/DoctorPrescriptionsList";

export const metadata = {
  title: "Prescriptions | MediCare Connect",
  description: "Doctor prescription management page.",
};

export default function DoctorPrescriptionsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
          <p className="text-blue-600 font-semibold">Doctor Dashboard</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Prescriptions
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create prescriptions for completed appointments and manage previous
            prescription records.
          </p>
        </div>

        <DoctorPrescriptionsList />
      </section>
    </main>
  );
}
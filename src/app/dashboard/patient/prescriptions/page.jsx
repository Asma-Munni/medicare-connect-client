import PatientPrescriptionsList from "@/components/PatientPrescriptionsList";

export const metadata = {
  title: "My Prescriptions | MediCare Connect",
  description: "Patient prescription records page.",
};

export default function PatientPrescriptionsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
          <p className="text-blue-600 font-semibold">Patient Dashboard</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            My Prescriptions
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View prescriptions created by doctors after completed appointments.
          </p>
        </div>

        <PatientPrescriptionsList />
      </section>
    </main>
  );
}
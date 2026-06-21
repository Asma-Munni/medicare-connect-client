import PatientReviewsList from "@/components/PatientReviewsList";

export const metadata = {
  title: "My Reviews | MediCare Connect",
  description: "Patient doctor review page.",
};

export default function PatientReviewsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
          <p className="text-blue-600 font-semibold">Patient Dashboard</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            My Reviews
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Share your experience after completing an appointment with a doctor.
          </p>
        </div>

        <PatientReviewsList />
      </section>
    </main>
  );
}
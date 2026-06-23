import AdminPaymentsList from "@/components/AdminPaymentsList";
import { protectedFetch } from "@/lib/core/server";

export const metadata = {
  title: "Manage Payments | MediCare Connect",
  description: "Admin payment management page.",
};

export default async function AdminPaymentsPage() {
  const result = await protectedFetch("/payments");

  const payments = result?.data || [];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
          <p className="text-blue-600 font-semibold">Admin Dashboard</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Manage Payments
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View all Stripe payment records, transaction IDs, patient details,
            doctor details, and revenue summary.
          </p>
        </div>

        <AdminPaymentsList payments={payments} />
      </section>
    </main>
  );
}
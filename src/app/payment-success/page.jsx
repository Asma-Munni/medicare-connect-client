import { Suspense } from "react";
import PaymentSuccessContent from "@/components/PaymentSuccessContent";

export const metadata = {
  title: "Payment Success | MediCare Connect",
  description: "Stripe payment confirmation page.",
};

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-3xl mx-auto px-4 lg:px-8 py-10">
        <Suspense
          fallback={
            <div className="rounded-3xl bg-white border border-blue-100 p-8 text-center">
              <p className="text-slate-500">Loading payment details...</p>
            </div>
          }
        >
          <PaymentSuccessContent />
        </Suspense>
      </section>
    </main>
  );
}
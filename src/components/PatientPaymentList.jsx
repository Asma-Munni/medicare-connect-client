"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { CreditCard, ReceiptText } from "lucide-react";

export default function PatientPaymentsList() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadPayments = async () => {
      if (isPending) return;

      if (!user) {
        setLoading(false);
        setError("Please login to see your payment history.");
        return;
      }

      const patientId = user?.id || user?._id || user?.email;

      try {
        setLoading(true);

        const res = await fetch(`${baseUrl}/payments/patient/${patientId}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (!data?.success) {
          setError(data?.message || "Failed to load payment history.");
          return;
        }

        setPayments(data?.data || []);
      } catch (error) {
        setError("Something went wrong while loading payments.");
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, [isPending, user, baseUrl]);

  if (isPending || loading) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <p className="text-slate-500">Loading payment history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-red-100 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">Unable to load</h2>
        <p className="mt-2 text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-8 text-center">
        <CreditCard className="mx-auto text-blue-600" size={42} />

        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          No payments found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          You have not completed any appointment payment yet.
        </p>

        <Link
          href="/dashboard/patient/appointments"
          className="mt-5 inline-flex rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Go to Appointments
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-3xl bg-white border border-blue-100 shadow-sm overflow-hidden">
      <div className="border-b border-slate-100 p-5">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <ReceiptText size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Payment History
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Total payments: {payments.length}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
                Doctor
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
                Amount
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
                Method
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
                Status
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
                Transaction
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {payments.map((payment) => (
              <tr key={payment._id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    {payment.doctorName || "N/A"}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {payment.doctorEmail || "No email"}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm font-bold text-slate-900">
                    ৳{payment.amount || 0}
                  </span>
                  <p className="mt-1 text-xs uppercase text-slate-500">
                    {payment.currency || "bdt"}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                  {payment.paymentMethod || "Stripe"}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 capitalize">
                    {payment.paymentStatus || "paid"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <p className="max-w-[220px] truncate text-xs text-slate-500">
                    {payment.transactionId || payment.stripeSessionId}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {payment.paidAt
                    ? new Date(payment.paidAt).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
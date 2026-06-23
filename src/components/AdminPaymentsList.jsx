"use client";

import { CreditCard, ReceiptText } from "lucide-react";

export default function AdminPaymentsList({ payments = [] }) {
  const totalRevenue = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  if (payments.length === 0) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-8 text-center">
        <CreditCard className="mx-auto text-blue-600" size={42} />

        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          No payments found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          No patient has completed any Stripe payment yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-5">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <ReceiptText size={24} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-500">
            Total Payments
          </h3>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {payments.length}
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-5">
          <div className="h-12 w-12 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center">
            <CreditCard size={24} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-500">
            Total Revenue
          </h3>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            ৳{totalRevenue}
          </p>
        </div>
      </div>

      <div className="rounded-3xl bg-white border border-blue-100 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-xl font-bold text-slate-900">
            All Payment Records
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Stripe payment records from all patients.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
                  Patient
                </th>

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
                      {payment.patientName || "N/A"}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {payment.patientEmail || "No email"}
                    </p>
                  </td>

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
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [paymentResult, setPaymentResult] = useState(null);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId) {
        setError("Stripe session ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(
          `${baseUrl}/confirm-payment?session_id=${sessionId}`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (!data?.success) {
          setError(data?.message || "Payment confirmation failed.");
          return;
        }

        setPaymentResult(data);
      } catch (error) {
        setError("Something went wrong while confirming payment.");
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [sessionId, baseUrl]);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-8 text-center">
        <Loader2 className="mx-auto animate-spin text-blue-600" size={44} />

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Confirming Payment
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Please wait while we verify your Stripe payment.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-white border border-red-100 shadow-sm p-8 text-center">
        <XCircle className="mx-auto text-red-600" size={48} />

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Payment Confirmation Failed
        </h1>

        <p className="mt-2 text-sm text-red-500">{error}</p>

        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/dashboard/patient/appointments"
            className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            Go to Appointments
          </Link>
        </div>
      </div>
    );
  }

  const payment = paymentResult?.data;

  return (
    <div className="rounded-3xl bg-white border border-green-100 shadow-sm p-8 text-center">
      <CheckCircle className="mx-auto text-green-600" size={56} />

      <h1 className="mt-5 text-3xl font-bold text-slate-900">
        Payment Successful
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Your appointment payment has been confirmed successfully.
      </p>

      {payment && (
        <div className="mt-6 max-w-md mx-auto rounded-2xl bg-slate-50 p-5 text-left">
          <p className="text-sm text-slate-600">
            Doctor:{" "}
            <span className="font-semibold text-slate-900">
              {payment.doctorName}
            </span>
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Amount:{" "}
            <span className="font-semibold text-slate-900">
              ৳{payment.amount}
            </span>
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Method:{" "}
            <span className="font-semibold text-slate-900">
              {payment.paymentMethod}
            </span>
          </p>

          <p className="mt-2 text-sm text-slate-600 break-all">
            Transaction ID:{" "}
            <span className="font-semibold text-slate-900">
              {payment.transactionId}
            </span>
          </p>
        </div>
      )}

      <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
        <Link
          href="/dashboard/patient/appointments"
          className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          My Appointments
        </Link>

        <Link
          href="/dashboard/patient"
          className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
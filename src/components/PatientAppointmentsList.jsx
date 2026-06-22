"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { updateAppointmentStatus } from "@/lib/actions/appointment";
import Link from "next/link";

export default function PatientAppointmentsList() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentLoading, setPaymentLoading] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


  const handleCancelAppointment = async (id) => {
  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this appointment?"
  );

  if (!confirmCancel) return;

  try {
    const result = await updateAppointmentStatus(id, "cancelled");

    if (!result?.success) {
      alert(result?.message || "Failed to cancel appointment.");
      return;
    }

    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === id
          ? { ...appointment, appointmentStatus: "cancelled" }
          : appointment
      )
    );
  } catch (error) {
    alert("Something went wrong. Please try again.");
  }
};

const handlePayNow = async (appointment) => {
  try {
    setPaymentLoading(appointment._id);

    const patientId = user?.id || user?._id || user?.email;

    const res = await fetch(`${baseUrl}/create-payment-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appointmentId: appointment._id,
        patientId,
      }),
    });

    const data = await res.json();

    if (!data?.success) {
      alert(data?.message || "Failed to create payment session.");
      return;
    }

    window.location.href = data.url;
  } catch (error) {
    alert("Something went wrong while starting payment.");
  } finally {
    setPaymentLoading("");
  }
};

  useEffect(() => {
    const getAppointments = async () => {
      if (isPending) return;

      if (!user) {
        setLoading(false);
        setError("Please login to see your appointments.");
        return;
      }

      const patientId = user?.id || user?._id || user?.email;

      try {
        setLoading(true);

        const res = await fetch(
          `${baseUrl}/appointments/patient/${patientId}`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (!data?.success) {
          setError(data?.message || "Failed to load appointments.");
          return;
        }

        setAppointments(data?.data || []);
      } catch (err) {
        setError("Something went wrong while loading appointments.");
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, [isPending, user, baseUrl]);

  if (isPending || loading) {
    return (
      <div className="rounded-3xl bg-white border border-blue-100 p-8 text-center">
        <p className="text-slate-500">Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-white border border-red-100 p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900">Unable to load</h2>
        <p className="mt-2 text-sm text-red-500">{error}</p>

        <Link
          href="/auth/signin"
          className="mt-5 inline-flex rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Login
        </Link>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="rounded-3xl bg-white border border-blue-100 p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          No appointments found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          You have not booked any appointment yet.
        </p>

        <Link
          href="/find-doctors"
          className="mt-5 inline-flex rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Find Doctors
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment._id}
          className="rounded-3xl bg-white border border-blue-100 shadow-sm p-5"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {appointment.doctorName}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Patient: {appointment.patientName}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Problem: {appointment.symptoms || "Not provided"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 border border-blue-100">
                {appointment.appointmentDate}
              </span>

              <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 border border-slate-200">
                {appointment.appointmentTime}
              </span>

              <span className="rounded-full bg-yellow-50 px-4 py-2 text-xs font-semibold text-yellow-700 border border-yellow-100 capitalize">
                {appointment.appointmentStatus}
              </span>

              <span className="rounded-full bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 border border-red-100 capitalize">
                {appointment.paymentStatus}
              </span>
            </div>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-slate-600">
              Consultation Fee:{" "}
              <span className="font-bold text-slate-900">
                ৳{appointment.consultationFee}
              </span>
            </p>

            <div className="flex flex-wrap gap-2">
  {appointment.paymentStatus === "paid" ? (
  <button
    disabled
    className="rounded-full bg-green-50 px-5 py-2 text-xs font-semibold text-green-700 border border-green-100 cursor-not-allowed"
  >
    Paid
  </button>
) : appointment.appointmentStatus !== "cancelled" &&
  appointment.appointmentStatus !== "rejected" ? (
  <button
    onClick={() => handlePayNow(appointment)}
    disabled={paymentLoading === appointment._id}
    className="rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50"
  >
    {paymentLoading === appointment._id ? "Redirecting..." : "Pay Now"}
  </button>
) : (
  <button
    disabled
    className="rounded-full bg-slate-100 px-5 py-2 text-xs font-semibold text-slate-500 cursor-not-allowed"
  >
    Payment Unavailable
  </button>
)}

  {appointment.appointmentStatus !== "cancelled" &&
    appointment.appointmentStatus !== "completed" &&
    appointment.appointmentStatus !== "rejected" && (
      <button
        onClick={() => handleCancelAppointment(appointment._id)}
        className="rounded-full bg-red-50 px-5 py-2 text-xs font-semibold text-red-600 border border-red-100 hover:bg-red-100 transition"
      >
        Cancel Appointment
      </button>
    )}
</div>
          </div>
        </div>
      ))}
    </div>
  );
}
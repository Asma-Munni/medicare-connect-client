"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { createAppointment } from "@/lib/actions/appointment";

export default function BookAppointmentForm({ doctor }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!user) {
      router.push("/auth/signin");
      return;
    }

    if (!appointmentDate) {
      setError("Please select appointment date.");
      return;
    }

    if (!appointmentTime) {
      setError("Please select appointment time.");
      return;
    }
const appointmentData = {
  doctorId: doctor._id,
  doctorName: doctor.doctorName,
  doctorEmail: doctor.email,

  patientId: user?.id || user?._id || user?.email,
  patientName: user?.name,
  patientEmail: user?.email,

  appointmentDate,
  appointmentTime,
  symptoms,

  consultationFee: doctor.consultationFee,
};

console.log("Appointment Data:", appointmentData);
    try {
      setLoading(true);

      const result = await createAppointment(appointmentData);

      if (!result?.success) {
        setError(result?.message || "Failed to book appointment.");
        return;
      }

      setSuccess("Appointment request submitted successfully.");

      setAppointmentDate("");
      setAppointmentTime("");
      setSymptoms("");

      setTimeout(() => {
        router.push("/dashboard/patient/appointments");
      }, 800);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <p className="text-slate-500">Loading user information...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white border border-blue-100 shadow-sm p-5"
    >
      <h2 className="text-2xl font-bold text-slate-900">
        Book Appointment
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Select appointment date and available time slot.
      </p>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 rounded-xl bg-green-50 border border-green-100 px-4 py-3 text-sm text-green-600">
          {success}
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Patient Name
          </label>

          <input
            type="text"
            value={user?.name || ""}
            disabled
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">
            Patient Email
          </label>

          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">
            Appointment Date
          </label>

          <input
            type="date"
            min={today}
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">
            Time Slot
          </label>

          <select
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
          >
            <option value="">Select time slot</option>

            {doctor.availableSlots?.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-slate-700">
            Symptoms / Problem
          </label>

          <textarea
            rows="4"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Write your health problem shortly..."
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
          />
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-blue-50 p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-slate-600">Consultation Fee</p>

          <p className="text-xl font-bold text-slate-900">
            ৳{doctor.consultationFee}
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
      >
        {loading ? "Booking..." : "Confirm Appointment"}
      </button>
    </form>
  );
}
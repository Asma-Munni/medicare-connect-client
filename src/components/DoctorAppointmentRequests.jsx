"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function DoctorAppointmentRequests() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadAppointments = async () => {
      if (isPending) return;

      if (!user?.email) {
        setLoading(false);
        setError("Please login as a doctor.");
        return;
      }

      try {
        setLoading(true);

        // Step 1: get doctor profile by logged-in email
        const doctorRes = await fetch(
          `${baseUrl}/doctors/email/${encodeURIComponent(user.email)}`,
          {
            cache: "no-store",
          }
        );

        const doctorData = await doctorRes.json();

        if (!doctorData?.success) {
          setError("Doctor profile not found for this account.");
          return;
        }

        const doctor = doctorData.data;

        // Step 2: get appointments by doctor MongoDB _id
        const appointmentRes = await fetch(
          `${baseUrl}/appointments/doctor/${doctor._id}`,
          {
            cache: "no-store",
          }
        );

        const appointmentData = await appointmentRes.json();

        if (!appointmentData?.success) {
          setError(appointmentData?.message || "Failed to load appointments.");
          return;
        }

        setAppointments(appointmentData.data || []);
      } catch (error) {
        setError("Something went wrong while loading appointments.");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [isPending, user, baseUrl]);

  if (isPending || loading) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <p className="text-slate-500">Loading appointment requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-red-100 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">Unable to Load</h2>
        <p className="mt-2 text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          No appointment requests found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          You have not received any appointment request yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment._id}
          className="rounded-3xl bg-white border border-blue-100 shadow-sm p-5"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {appointment.patientName}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Email: {appointment.patientEmail}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Problem: {appointment.symptoms || "Not provided"}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Fee:{" "}
                <span className="font-bold text-slate-900">
                  ৳{appointment.consultationFee}
                </span>
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
        </div>
      ))}
    </div>
  );
}
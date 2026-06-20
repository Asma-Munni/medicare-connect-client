"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { updateAppointmentStatus } from "@/lib/actions/appointment";

export default function DoctorAppointmentRequests() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");
  


  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


  const handleStatusUpdate = async (appointmentId, status) => {
  try {
    setActionLoading(appointmentId + status);

    const result = await updateAppointmentStatus(appointmentId, status);

    if (!result?.success) {
      alert(result?.message || "Failed to update appointment status.");
      return;
    }

    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === appointmentId
          ? { ...appointment, appointmentStatus: status }
          : appointment
      )
    );
  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    setActionLoading("");
  }
};

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

            <div className="mt-4 border-t border-slate-100 pt-4 flex flex-wrap gap-2">
  {appointment.appointmentStatus === "pending" && (
    <>
      <button
        onClick={() => handleStatusUpdate(appointment._id, "accepted")}
        disabled={actionLoading === appointment._id + "accepted"}
        className="rounded-full bg-green-600 px-5 py-2 text-xs font-semibold text-white hover:bg-green-700 transition disabled:opacity-60"
      >
        Accept
      </button>

      <button
        onClick={() => handleStatusUpdate(appointment._id, "rejected")}
        disabled={actionLoading === appointment._id + "rejected"}
        className="rounded-full bg-red-600 px-5 py-2 text-xs font-semibold text-white hover:bg-red-700 transition disabled:opacity-60"
      >
        Reject
      </button>
    </>
  )}

  {appointment.appointmentStatus === "accepted" && (
    <button
      onClick={() => handleStatusUpdate(appointment._id, "completed")}
      disabled={actionLoading === appointment._id + "completed"}
      className="rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
    >
      Mark as Complete
    </button>
  )}

  {["rejected", "cancelled", "completed"].includes(
    appointment.appointmentStatus
  ) && (
    <p className="text-sm text-slate-500">
      No action available for this appointment.
    </p>
  )}
</div>
          </div>
        </div>
      ))}
    </div>
  );
}
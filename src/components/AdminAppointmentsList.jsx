"use client";

import { useEffect, useState } from "react";
import { updateAppointmentStatus } from "@/lib/actions/appointment";

export default function AdminAppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleStatusUpdate = async (appointmentId, appointmentStatus) => {
  try {
    setActionLoading(appointmentId + appointmentStatus);

    const result = await updateAppointmentStatus(
      appointmentId,
      appointmentStatus
    );

    if (!result?.success) {
      alert(result?.message || "Failed to update appointment status.");
      return;
    }

    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === appointmentId
          ? { ...appointment, appointmentStatus }
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
      try {
        setLoading(true);

        const res = await fetch(`${baseUrl}/appointments`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (!data?.success) {
          setError(data?.message || "Failed to load appointments.");
          return;
        }

        setAppointments(data?.data || []);
      } catch (error) {
        setError("Something went wrong while loading appointments.");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [baseUrl]);

  if (loading) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <p className="text-slate-500">Loading appointments...</p>
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

  if (appointments.length === 0) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">
          No appointments found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          No appointment has been booked yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-3xl bg-white border border-blue-100 shadow-sm overflow-hidden">
      <div className="border-b border-slate-100 p-5">
        <h2 className="text-xl font-bold text-slate-900">
          All Appointments
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Total appointments: {appointments.length}
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
                Date & Time
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
                Fee
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
                Appointment
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
                Payment
              </th>
              
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-600">
  Action
</th>

            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {appointments.map((appointment) => (
              <tr key={appointment._id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    {appointment.patientName || "N/A"}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {appointment.patientEmail || "No email"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Problem: {appointment.symptoms || "Not provided"}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    {appointment.doctorName || "N/A"}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {appointment.doctorEmail || "No email"}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <span className="block text-sm font-semibold text-slate-900">
                    {appointment.appointmentDate}
                  </span>

                  <span className="mt-1 block text-xs text-slate-500">
                    {appointment.appointmentTime}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm font-bold text-slate-900">
                  ৳{appointment.consultationFee || 0}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700 capitalize">
                    {appointment.appointmentStatus || "pending"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 capitalize">
                    {appointment.paymentStatus || "unpaid"}
                  </span>
                </td>

                <td className="px-5 py-4">
  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => handleStatusUpdate(appointment._id, "accepted")}
      disabled={
        appointment.appointmentStatus === "accepted" ||
        actionLoading === appointment._id + "accepted"
      }
      className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100 disabled:opacity-50"
    >
      Accept
    </button>

    <button
      onClick={() => handleStatusUpdate(appointment._id, "rejected")}
      disabled={
        appointment.appointmentStatus === "rejected" ||
        actionLoading === appointment._id + "rejected"
      }
      className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
    >
      Reject
    </button>

    <button
      onClick={() => handleStatusUpdate(appointment._id, "completed")}
      disabled={
        appointment.appointmentStatus === "completed" ||
        actionLoading === appointment._id + "completed"
      }
      className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 disabled:opacity-50"
    >
      Complete
    </button>

    <button
      onClick={() => handleStatusUpdate(appointment._id, "cancelled")}
      disabled={
        appointment.appointmentStatus === "cancelled" ||
        actionLoading === appointment._id + "cancelled"
      }
      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 disabled:opacity-50"
    >
      Cancel
    </button>
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
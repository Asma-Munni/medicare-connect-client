"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FileText, Pill, CalendarDays } from "lucide-react";

export default function PatientPrescriptionsList() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadPrescriptions = async () => {
      if (isPending) return;

      if (!user) {
        setLoading(false);
        setError("Please login to see your prescriptions.");
        return;
      }

      const patientId = user?.id || user?._id || user?.email;

      try {
        setLoading(true);

        const res = await fetch(`${baseUrl}/prescriptions/patient/${patientId}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (!data?.success) {
          setError(data?.message || "Failed to load prescriptions.");
          return;
        }

        setPrescriptions(data?.data || []);
      } catch (error) {
        setError("Something went wrong while loading prescriptions.");
      } finally {
        setLoading(false);
      }
    };

    loadPrescriptions();
  }, [isPending, user, baseUrl]);

  if (isPending || loading) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <p className="text-slate-500">Loading prescriptions...</p>
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

  if (prescriptions.length === 0) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-8 text-center">
        <FileText className="mx-auto text-blue-600" size={44} />

        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          No prescriptions found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Your prescriptions will appear here after your doctor creates them.
        </p>

        <Link
          href="/dashboard/patient/appointments"
          className="mt-5 inline-flex rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          My Appointments
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {prescriptions.map((prescription) => (
        <div
          key={prescription._id}
          className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <FileText size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Prescription
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Doctor: {prescription.doctorName}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Patient</p>
                  <h3 className="mt-1 text-sm font-bold text-slate-900">
                    {prescription.patientName}
                  </h3>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Appointment</p>
                  <h3 className="mt-1 text-sm font-bold text-slate-900">
                    {prescription.appointmentDate} at{" "}
                    {prescription.appointmentTime}
                  </h3>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-green-50 px-4 py-3">
              <p className="text-xs font-semibold text-green-700">
                Prescription Created
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900">
                {prescription.createdAt
                  ? new Date(prescription.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <h3 className="text-lg font-bold text-slate-900">Diagnosis</h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {prescription.diagnosis}
            </p>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2">
              <Pill className="text-blue-600" size={20} />
              <h3 className="text-lg font-bold text-slate-900">Medicines</h3>
            </div>

            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-100">
              <table className="w-full text-left">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-3 text-xs font-bold uppercase text-slate-600">
                      Medicine
                    </th>
                    <th className="px-4 py-3 text-xs font-bold uppercase text-slate-600">
                      Dosage
                    </th>
                    <th className="px-4 py-3 text-xs font-bold uppercase text-slate-600">
                      Frequency
                    </th>
                    <th className="px-4 py-3 text-xs font-bold uppercase text-slate-600">
                      Duration
                    </th>
                    <th className="px-4 py-3 text-xs font-bold uppercase text-slate-600">
                      Instruction
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {prescription.medicines?.map((medicine, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                        {medicine.name}
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-600">
                        {medicine.dosage}
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-600">
                        {medicine.frequency}
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-600">
                        {medicine.duration}
                      </td>

                      <td className="px-4 py-3 text-sm text-slate-600">
                        {medicine.instruction || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {prescription.advice && (
            <div className="mt-6 rounded-2xl bg-yellow-50 border border-yellow-100 p-4">
              <h3 className="text-lg font-bold text-slate-900">Advice</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {prescription.advice}
              </p>
            </div>
          )}

          {prescription.followUpDate && (
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-purple-50 border border-purple-100 p-4">
              <CalendarDays className="text-purple-700" size={22} />

              <div>
                <p className="text-xs font-semibold text-purple-700">
                  Follow-up Date
                </p>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  {prescription.followUpDate}
                </p>
              </div>
            </div>
          )}

          <div className="mt-5 border-t border-slate-100 pt-4">
  <Link
    href={`/dashboard/patient/prescriptions/${prescription._id}`}
    className="inline-flex rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
  >
    View Prescription Details
  </Link>
</div>
        </div>
      ))}
    </div>
  );
}
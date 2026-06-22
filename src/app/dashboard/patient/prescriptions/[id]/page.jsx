import Link from "next/link";
import { notFound } from "next/navigation";
import { getPrescriptionById } from "@/lib/api/prescriptions";
import { CalendarDays, FileText, Pill } from "lucide-react";

export const metadata = {
  title: "Prescription Details | MediCare Connect",
  description: "Patient prescription details page.",
};

export default async function PrescriptionDetailsPage({ params }) {
  const { id } = await params;

  const result = await getPrescriptionById(id);
  const prescription = result?.data;

  if (!prescription) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-5xl mx-auto px-4 lg:px-8 py-6">
        <Link
          href="/dashboard/patient/prescriptions"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to Prescriptions
        </Link>

        <div className="mt-5 rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <FileText size={24} />
            </div>

            <div>
              <p className="text-blue-600 font-semibold">
                MediCare Connect
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                Prescription Details
              </h1>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-slate-900">
                Patient Information
              </h2>

              <p className="mt-3 text-sm text-slate-600">
                Name:{" "}
                <span className="font-semibold text-slate-900">
                  {prescription.patientName}
                </span>
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Email:{" "}
                <span className="font-semibold text-slate-900">
                  {prescription.patientEmail}
                </span>
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Symptoms:{" "}
                <span className="font-semibold text-slate-900">
                  {prescription.symptoms || "Not provided"}
                </span>
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-slate-900">
                Doctor Information
              </h2>

              <p className="mt-3 text-sm text-slate-600">
                Name:{" "}
                <span className="font-semibold text-slate-900">
                  {prescription.doctorName}
                </span>
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Email:{" "}
                <span className="font-semibold text-slate-900">
                  {prescription.doctorEmail}
                </span>
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Appointment:{" "}
                <span className="font-semibold text-slate-900">
                  {prescription.appointmentDate} at{" "}
                  {prescription.appointmentTime}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-blue-50 p-5">
            <h2 className="text-lg font-bold text-slate-900">Diagnosis</h2>

            <p className="mt-2 text-sm leading-6 text-slate-700">
              {prescription.diagnosis}
            </p>
          </div>
          
          <div className="mt-6">
  <div className="flex items-center gap-2">
    <Pill className="text-blue-600" size={20} />
    <h2 className="text-lg font-bold text-slate-900">Medicines</h2>
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

  {prescription.advice && (
  <div className="mt-6 rounded-2xl bg-yellow-50 border border-yellow-100 p-5">
    <h2 className="text-lg font-bold text-slate-900">Advice</h2>

    <p className="mt-2 text-sm leading-6 text-slate-700">
      {prescription.advice}
    </p>
  </div>
)}

{prescription.followUpDate && (
  <div className="mt-6 flex items-center gap-3 rounded-2xl bg-purple-50 border border-purple-100 p-5">
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
</div>

        </div>
      </section>
    </main>
  );
}
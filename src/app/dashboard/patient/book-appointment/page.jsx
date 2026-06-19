import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoctorById } from "@/lib/api/doctors";
import BookAppointmentForm from "@/components/BookAppointmentForm";

export const metadata = {
  title: "Book Appointment | MediCare Connect",
  description: "Book an appointment with a verified doctor.",
};

export default async function BookAppointmentPage({ searchParams }) {
  const params = await searchParams;
  const doctorId = params?.doctorId;

  if (!doctorId) {
    notFound();
  }

  const result = await getDoctorById(doctorId);
  const doctor = result?.data;

  if (!doctor) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
        <Link
          href={`/find-doctors/${doctor._id}`}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to Doctor Details
        </Link>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Doctor Summary */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-4">
              <img
                src={doctor.profileImage}
                alt={doctor.doctorName}
                className="h-64 w-full rounded-2xl object-cover"
                referrerPolicy="no-referrer"
              />

              <h1 className="mt-4 text-2xl font-bold text-slate-900">
                {doctor.doctorName}
              </h1>

              <p className="mt-1 text-blue-600 font-semibold">
                {doctor.specialization}
              </p>

              <p className="mt-3 text-sm text-slate-600 leading-6">
                {doctor.qualifications}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-blue-50 p-3">
                  <p className="text-xs text-slate-500">Experience</p>
                  <h3 className="mt-1 font-bold text-slate-900">
                    {doctor.experience} Years
                  </h3>
                </div>

                <div className="rounded-2xl bg-blue-50 p-3">
                  <p className="text-xs text-slate-500">Fee</p>
                  <h3 className="mt-1 font-bold text-slate-900">
                    ৳{doctor.consultationFee}
                  </h3>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-slate-700">
                  Available Days
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {doctor.availableDays?.map((day) => (
                    <span
                      key={day}
                      className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 border border-blue-100"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-slate-700">
                  Available Slots
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {doctor.availableSlots?.map((slot) => (
                    <span
                      key={slot}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Appointment Form */}
          <div className="lg:col-span-3">
            <BookAppointmentForm doctor={doctor} />
          </div>
        </div>
      </section>
    </main>
  );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoctorById } from "@/lib/api/doctors";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const result = await getDoctorById(id);
  const doctor = result?.data;

  return {
    title: doctor
      ? `${doctor.doctorName} | MediCare Connect`
      : "Doctor Details | MediCare Connect",
    description: "Doctor details and appointment booking page.",
  };
}

export default async function DoctorDetailsPage({ params }) {
  const { id } = await params;

  const result = await getDoctorById(id);
  const doctor = result?.data;

  if (!doctor) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
        <Link
          href="/find-doctors"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to Doctors
        </Link>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-4">
              <img
                src={doctor.profileImage}
                alt={doctor.doctorName}
                className="h-72 w-full rounded-2xl object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-5">
              <h2 className="text-xl font-bold text-slate-900">
                About Doctor
              </h2>

              <p className="mt-3 text-sm text-slate-600 leading-6">
                {doctor.doctorName} is a verified {doctor.specialization}{" "}
                specialist with {doctor.experience} years of experience. The
                doctor currently practices at {doctor.hospitalName}. Patients
                can book appointments by selecting an available day and time
                slot.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-5 md:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 capitalize">
                  {doctor.verificationStatus}
                </span>

                <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-600">
                  ★ {doctor.averageRating || 0} / 5
                </span>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {doctor.totalReviews || 0} Reviews
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-bold text-slate-900">
                {doctor.doctorName}
              </h1>

              <p className="mt-1 text-blue-600 font-semibold">
                {doctor.specialization}
              </p>

              <p className="mt-2 text-sm text-slate-600 leading-6">
                {doctor.qualifications}
              </p>

              {/* Info Cards */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs text-slate-500">Experience</p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    {doctor.experience} Years
                  </h3>
                </div>

                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs text-slate-500">Consultation Fee</p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    ৳{doctor.consultationFee}
                  </h3>
                </div>

                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs text-slate-500">Hospital</p>
                  <h3 className="mt-1 text-sm font-bold text-slate-900 line-clamp-2">
                    {doctor.hospitalName}
                  </h3>
                </div>
              </div>

              {/* Available Days */}
              <div className="mt-5">
                <h2 className="text-lg font-bold text-slate-900">
                  Available Days
                </h2>

                <div className="mt-2 flex flex-wrap gap-2">
                  {doctor.availableDays?.map((day) => (
                    <span
                      key={day}
                      className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 border border-blue-100"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              {/* Available Slots */}
              <div className="mt-5">
                <h2 className="text-lg font-bold text-slate-900">
                  Available Slots
                </h2>

                <div className="mt-2 flex flex-wrap gap-2">
                  {doctor.availableSlots?.map((slot) => (
                    <span
                      key={slot}
                      className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 border border-slate-200"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>

              {/* Review Summary */}
              <div className="mt-5 rounded-2xl bg-yellow-50 border border-yellow-100 p-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Patient Reviews
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  Average rating{" "}
                  <span className="font-bold text-yellow-600">
                    ★ {doctor.averageRating || 0}
                  </span>{" "}
                  based on {doctor.totalReviews || 0} patient reviews.
                </p>
              </div>

              {/* Appointment Button at Bottom */}
              <div className="mt-4 pt-4 border-t border-slate-100">
               
              </div> 
              <Link
  href={`/dashboard/patient/book-appointment?doctorId=${doctor._id}`}
  className="block w-full rounded-full bg-blue-600 px-7 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700 transition"
>
  Book Appointment
</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
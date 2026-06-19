import Link from "next/link";

export default function DoctorCard({ doctor }) {
  return (
    <div className="rounded-3xl bg-white border border-blue-100 shadow-sm hover:shadow-xl transition overflow-hidden">
      <div className="relative">
        <img
          src={doctor.profileImage}
          alt={doctor.doctorName}
          className="h-56 w-full object-cover"
          referrerPolicy="no-referrer"
        />

        <span className="absolute top-4 right-4 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Verified
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-900">
          {doctor.doctorName}
        </h3>

        <p className="mt-1 text-blue-600 font-medium">
          {doctor.specialization}
        </p>

        <p className="mt-3 text-sm text-slate-500 line-clamp-2">
          {doctor.qualifications}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-blue-50 p-3">
            <p className="text-slate-500">Experience</p>
            <p className="font-bold text-slate-900">
              {doctor.experience} Years
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 p-3">
            <p className="text-slate-500">Fee</p>
            <p className="font-bold text-slate-900">
              ৳{doctor.consultationFee}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <p className="text-yellow-500 font-semibold">
            ★ {doctor.averageRating || 0}
          </p>

          <p className="text-slate-500">
            {doctor.totalReviews || 0} Reviews
          </p>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          {doctor.hospitalName}
        </p>

        <Link
          href={`/find-doctors/${doctor._id}`}
          className="mt-5 block w-full text-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
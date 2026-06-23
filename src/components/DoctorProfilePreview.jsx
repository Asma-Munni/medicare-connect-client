export default function DoctorProfilePreview({ doctor }) {
  if (!doctor) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-red-100 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">
          Profile Not Found
        </h2>

        <p className="mt-2 text-sm text-red-500">
          Doctor profile not found for this account.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-3xl bg-white border border-blue-100 shadow-sm p-5">
      <div className="flex flex-col md:flex-row md:items-center gap-5">
        <img
          src={doctor.profileImage || "/images/default-user.png"}
          alt={doctor.doctorName || "Doctor"}
          className="h-24 w-24 rounded-2xl object-cover border"
          referrerPolicy="no-referrer"
        />

        <div>
          <p className="text-sm text-blue-600 font-semibold">
            Logged in Doctor Profile
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {doctor.doctorName || "Doctor"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {doctor.specialization || "Specialization not added"} •{" "}
            {doctor.experience || 0} Years Experience
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Email: {doctor.email || "N/A"}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Doctor MongoDB ID: {doctor._id}
          </p>
        </div>
      </div>
    </div>
  );
}
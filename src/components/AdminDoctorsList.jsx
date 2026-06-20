"use client";

import { useEffect, useState } from "react";
import { updateDoctorVerification } from "@/lib/actions/doctor";

export default function AdminDoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


  const handleVerificationUpdate = async (doctorId, verificationStatus) => {
  try {
    setActionLoading(doctorId + verificationStatus);

    const result = await updateDoctorVerification(doctorId, verificationStatus);

    if (!result?.success) {
      alert(result?.message || "Failed to update doctor status.");
      return;
    }

    setDoctors((prevDoctors) =>
      prevDoctors.map((doctor) =>
        doctor._id === doctorId
          ? { ...doctor, verificationStatus }
          : doctor
      )
    );
  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    setActionLoading("");
  }
};

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${baseUrl}/doctors?limit=100`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (!data?.success) {
          setError(data?.message || "Failed to load doctors.");
          return;
        }

        setDoctors(data?.data || []);
      } catch (error) {
        setError("Something went wrong while loading doctors.");
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, [baseUrl]);

  if (loading) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <p className="text-slate-500">Loading doctors...</p>
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

  if (doctors.length === 0) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">No doctors found</h2>
        <p className="mt-2 text-sm text-slate-500">
          No doctor profile has been added yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
      {doctors.map((doctor) => (
        <div
          key={doctor._id}
          className="rounded-3xl bg-white border border-blue-100 shadow-sm p-5"
        >
          <div className="flex gap-4">
            <img
              src={doctor.profileImage}
              alt={doctor.doctorName}
              className="h-20 w-20 rounded-2xl object-cover"
              referrerPolicy="no-referrer"
            />

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  {doctor.doctorName}
                </h2>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 capitalize">
                  {doctor.verificationStatus}
                </span>
              </div>

              <p className="mt-1 text-sm font-semibold text-blue-600">
                {doctor.specialization}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {doctor.qualifications}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Email: {doctor.email}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                  {doctor.experience} Years
                </span>

                <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                  Fee ৳{doctor.consultationFee}
                </span>

                <span className="rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700">
                  ★ {doctor.averageRating || 0}
                </span>
              </div>



             <div className="mt-4 flex flex-wrap gap-2">
  <button
    onClick={() => handleVerificationUpdate(doctor._id, "verified")}
    disabled={
      doctor.verificationStatus === "verified" ||
      actionLoading === doctor._id + "verified"
    }
    className="rounded-full bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700 transition disabled:opacity-50"
  >
    Verify
  </button>

  <button
    onClick={() => handleVerificationUpdate(doctor._id, "pending")}
    disabled={
      doctor.verificationStatus === "pending" ||
      actionLoading === doctor._id + "pending"
    }
    className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-white hover:bg-yellow-600 transition disabled:opacity-50"
  >
    Pending
  </button>

  <button
    onClick={() => handleVerificationUpdate(doctor._id, "rejected")}
    disabled={
      doctor.verificationStatus === "rejected" ||
      actionLoading === doctor._id + "rejected"
    }
    className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 transition disabled:opacity-50"
  >
    Reject
  </button>
</div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
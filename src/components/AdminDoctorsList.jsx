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

      const result = await updateDoctorVerification(
        doctorId,
        verificationStatus
      );

      if (!result?.success) {
        alert(result?.message || "Failed to update doctor status.");
        return;
      }

      setDoctors((prev) =>
        prev.map((doc) =>
          doc._id === doctorId
            ? { ...doc, verificationStatus }
            : doc
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

        if (!baseUrl) {
          setError("Base URL missing");
          return;
        }

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

  if (!doctors.length) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">No doctors found</h2>
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
            />

            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-900">
                {doctor.doctorName}
              </h2>

              <p className="text-sm text-blue-600">
                {doctor.specialization}
              </p>

              <p className="text-sm text-slate-500">
                {doctor.email}
              </p>

              <span className="inline-block mt-2 rounded-full bg-slate-100 px-3 py-1 text-xs">
                {doctor.verificationStatus}
              </span>

              {/* ACTIONS */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() =>
                    handleVerificationUpdate(doctor._id, "verified")
                  }
                  disabled={
                    doctor.verificationStatus === "verified" ||
                    actionLoading === doctor._id + "verified"
                  }
                  className="px-3 py-1 text-xs rounded-full bg-green-600 text-white"
                >
                  Verify
                </button>

                <button
                  onClick={() =>
                    handleVerificationUpdate(doctor._id, "pending")
                  }
                  disabled={
                    doctor.verificationStatus === "pending" ||
                    actionLoading === doctor._id + "pending"
                  }
                  className="px-3 py-1 text-xs rounded-full bg-yellow-500 text-white"
                >
                  Pending
                </button>

                <button
                  onClick={() =>
                    handleVerificationUpdate(doctor._id, "rejected")
                  }
                  disabled={
                    doctor.verificationStatus === "rejected" ||
                    actionLoading === doctor._id + "rejected"
                  }
                  className="px-3 py-1 text-xs rounded-full bg-red-600 text-white"
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
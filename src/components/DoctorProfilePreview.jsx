"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function DoctorProfilePreview() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadDoctorProfile = async () => {
      if (isPending) return;

      if (!user?.email) {
        setLoading(false);
        setError("Please login as a doctor.");
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(
          `${baseUrl}/doctors/email/${encodeURIComponent(user.email)}`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (!data?.success) {
          setError("Doctor profile not found for this account.");
          return;
        }

        setDoctor(data.data);
      } catch (error) {
        setError("Failed to load doctor profile.");
      } finally {
        setLoading(false);
      }
    };

    loadDoctorProfile();
  }, [isPending, user, baseUrl]);

  if (isPending || loading) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <p className="text-slate-500">Loading doctor profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-red-100 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">Profile Not Found</h2>
        <p className="mt-2 text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-3xl bg-white border border-blue-100 shadow-sm p-5">
      <div className="flex flex-col md:flex-row md:items-center gap-5">
        <img
          src={doctor.profileImage}
          alt={doctor.doctorName}
          className="h-24 w-24 rounded-2xl object-cover"
          referrerPolicy="no-referrer"
        />

        <div>
          <p className="text-sm text-blue-600 font-semibold">
            Logged in Doctor Profile
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {doctor.doctorName}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {doctor.specialization} • {doctor.experience} Years Experience
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Email: {doctor.email}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Doctor MongoDB ID: {doctor._id}
          </p>
        </div>
      </div>
    </div>
  );
}
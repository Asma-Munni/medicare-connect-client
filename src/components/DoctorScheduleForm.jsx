"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { updateDoctorSchedule } from "@/lib/actions/doctor";
import toast from "react-hot-toast";
import { CalendarDays, Clock } from "lucide-react";

const weekDays = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
];

export default function DoctorScheduleForm() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [doctor, setDoctor] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadDoctor = async () => {
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
          { cache: "no-store" }
        );

        const data = await res.json();

        if (!data?.success) {
          setError("Doctor profile not found for this account.");
          return;
        }

        const doctorProfile = data.data;

        setDoctor(doctorProfile);
        setAvailableDays(doctorProfile.availableDays || []);
        setAvailableSlots(doctorProfile.availableSlots || []);
      } catch (error) {
        setError("Something went wrong while loading schedule.");
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [isPending, user, baseUrl]);

  const toggleDay = (day) => {
    setAvailableDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((item) => item !== day)
        : [...prevDays, day]
    );
  };

  const toggleSlot = (slot) => {
    setAvailableSlots((prevSlots) =>
      prevSlots.includes(slot)
        ? prevSlots.filter((item) => item !== slot)
        : [...prevSlots, slot]
    );
  };

  const handleUpdateSchedule = async () => {
    if (!doctor?._id) {
      toast.error("Doctor profile not found.");
      return;
    }

    if (availableDays.length === 0 || availableSlots.length === 0) {
      toast.error("Please select at least one day and one slot.");
      return;
    }

    try {
      setActionLoading(true);

      const result = await updateDoctorSchedule(doctor._id, {
        availableDays,
        availableSlots,
      });

      if (!result?.success) {
        toast.error(result?.message || "Failed to update schedule.");
        return;
      }

      toast.success("Schedule updated successfully.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <p className="text-slate-500">Loading doctor schedule...</p>
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

  return (
    <div className="mt-6 rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
          <CalendarDays size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Update Available Schedule
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Select your available days and consultation time slots.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold text-slate-900">Available Days</h3>

        <div className="mt-3 flex flex-wrap gap-3">
          {weekDays.map((day) => {
            const active = availableDays.includes(day);

            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-blue-50"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2">
          <Clock className="text-blue-600" size={20} />
          <h3 className="text-lg font-bold text-slate-900">
            Available Time Slots
          </h3>
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          {timeSlots.map((slot) => {
            const active = availableSlots.includes(slot);

            return (
              <button
                key={slot}
                type="button"
                onClick={() => toggleSlot(slot)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-green-600 border-green-600 text-white"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-green-50"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-slate-50 p-5">
        <h3 className="text-sm font-bold text-slate-900">Current Selection</h3>

        <p className="mt-2 text-sm text-slate-600">
          Days:{" "}
          <span className="font-semibold text-slate-900">
            {availableDays.length ? availableDays.join(", ") : "None selected"}
          </span>
        </p>

        <p className="mt-2 text-sm text-slate-600">
          Slots:{" "}
          <span className="font-semibold text-slate-900">
            {availableSlots.length
              ? availableSlots.join(", ")
              : "None selected"}
          </span>
        </p>
      </div>

      <button
        onClick={handleUpdateSchedule}
        disabled={actionLoading}
        className="mt-6 rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {actionLoading ? "Updating..." : "Update Schedule"}
      </button>
    </div>
  );
}
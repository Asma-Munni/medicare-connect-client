"use client";

import { useState } from "react";
import { createDoctorProfile } from "@/lib/actions/doctor";
import { authClient } from "@/lib/auth-client";

export default function CreateDoctorProfileForm({ user }) {
  const { data: session } = authClient.useSession();
  const token = session?.session?.token;

  const [form, setForm] = useState({
    doctorName: "",
    specialization: "",
    qualifications: "",
    experience: "",
    consultationFee: "",
    hospitalName: "",
    profileImage: "",
    email: user.email,

    // 🔥 NEW FIELDS
    availableDays: [],
    availableSlots: [],
  });

  const [loading, setLoading] = useState(false);

  // -------------------------
  // INPUT CHANGE
  // -------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // -------------------------
  // DAYS HANDLER (checkbox)
  // -------------------------
  const handleDayChange = (day) => {
    setForm((prev) => {
      const exists = prev.availableDays.includes(day);

      return {
        ...prev,
        availableDays: exists
          ? prev.availableDays.filter((d) => d !== day)
          : [...prev.availableDays, day],
      };
    });
  };

  // -------------------------
  // SLOT HANDLER (checkbox)
  // -------------------------
  const handleSlotChange = (slot) => {
    setForm((prev) => {
      const exists = prev.availableSlots.includes(slot);

      return {
        ...prev,
        availableSlots: exists
          ? prev.availableSlots.filter((s) => s !== slot)
          : [...prev.availableSlots, slot],
      };
    });
  };

  // -------------------------
  // SUBMIT
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login again");
      return;
    }

    try {
      setLoading(true);

      const result = await createDoctorProfile(form, token);

      if (!result?.success) {
        alert(result?.message);
        return;
      }

      alert("Doctor profile created successfully");
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // UI OPTIONS
  // -------------------------
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const slots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* BASIC FIELDS */}
      <input
        name="doctorName"
        onChange={handleChange}
        placeholder="Doctor Name"
        className="p-3 border rounded-xl"
      />

      <input
        name="specialization"
        onChange={handleChange}
        placeholder="Specialization"
        className="p-3 border rounded-xl"
      />

      <input
        name="qualifications"
        onChange={handleChange}
        placeholder="Qualifications"
        className="p-3 border rounded-xl"
      />

      <input
        name="experience"
        onChange={handleChange}
        placeholder="Experience"
        className="p-3 border rounded-xl"
      />

      <input
        name="consultationFee"
        onChange={handleChange}
        placeholder="Fee"
        className="p-3 border rounded-xl"
      />

      <input
        name="hospitalName"
        onChange={handleChange}
        placeholder="Hospital"
        className="p-3 border rounded-xl"
      />

      <input
        name="profileImage"
        onChange={handleChange}
        placeholder="Image URL"
        className="p-3 border rounded-xl md:col-span-2"
      />

      {/* ---------------- DAYS ---------------- */}
      <div className="md:col-span-2">
        <p className="font-semibold mb-2">Available Days</p>
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <label key={day} className="flex items-center gap-1">
              <input
                type="checkbox"
                onChange={() => handleDayChange(day)}
              />
              {day}
            </label>
          ))}
        </div>
      </div>

      {/* ---------------- SLOTS ---------------- */}
      <div className="md:col-span-2">
        <p className="font-semibold mb-2">Available Time Slots</p>
        <div className="flex flex-wrap gap-2">
          {slots.map((slot) => (
            <label key={slot} className="flex items-center gap-1">
              <input
                type="checkbox"
                onChange={() => handleSlotChange(slot)}
              />
              {slot}
            </label>
          ))}
        </div>
      </div>

      {/* SUBMIT */}
      <button
        disabled={loading}
        className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl"
      >
        {loading ? "Creating..." : "Create Profile"}
      </button>
    </form>
  );
}
"use client";

import { useState } from "react";
import { createDoctorProfile } from "@/lib/actions/doctor";
import { authClient } from "@/lib/auth-client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function CreateDoctorProfileForm() {
    
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
  });


  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

      alert("Doctor profile created successfully (pending verification)");
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input name="doctorName" onChange={handleChange} placeholder="Doctor Name" className="p-3 border rounded-xl" />
      <input name="specialization" onChange={handleChange} placeholder="Specialization" className="p-3 border rounded-xl" />
      <input name="qualifications" onChange={handleChange} placeholder="Qualifications" className="p-3 border rounded-xl" />
      <input name="experience" onChange={handleChange} placeholder="Experience" className="p-3 border rounded-xl" />
      <input name="consultationFee" onChange={handleChange} placeholder="Fee" className="p-3 border rounded-xl" />
      <input name="hospitalName" onChange={handleChange} placeholder="Hospital" className="p-3 border rounded-xl" />
      <input name="profileImage" onChange={handleChange} placeholder="Image URL" className="p-3 border rounded-xl md:col-span-2" />

      <button disabled={loading} className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl">
        {loading ? "Creating..." : "Create Profile"}
      </button>
    </form>
  );
}
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { updateProfile } from "@/lib/actions/profile";
import toast from "react-hot-toast";
import { User, Mail, Phone, MapPin, Image } from "lucide-react";

export default function ProfileForm() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || "",
        image: user?.image || "",
        phone: user?.phone || "",
        address: user?.address || "",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.error("Please login to update your profile.");
      return;
    }

    const userId = user?.id || user?._id;

    if (!userId) {
      toast.error("User ID not found.");
      return;
    }

    if (!formData.name) {
      toast.error("Name is required.");
      return;
    }

    try {
      setLoading(true);

      const result = await updateProfile(userId, {
        name: formData.name,
        image: formData.image,
        phone: formData.phone,
        address: formData.address,
      });

      if (!result?.success) {
        toast.error(result?.message || "Failed to update profile.");
        return;
      }

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-red-100 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">Login Required</h2>
        <p className="mt-2 text-sm text-red-500">
          Please login to update your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-5">
        <div className="h-24 w-24 rounded-3xl bg-blue-50 overflow-hidden border border-blue-100">
          {formData.image ? (
            <img
              src={formData.image}
              alt={formData.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-blue-700">
              <User size={36} />
            </div>
          )}
        </div>

        <div>
          <p className="text-blue-600 font-semibold">Profile Information</p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {user?.name || "User"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleUpdateProfile} className="mt-8 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
              <User className="text-slate-400" size={18} />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Email
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Mail className="text-slate-400" size={18} />

              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full bg-transparent text-sm text-slate-500 outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Phone
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
              <Phone className="text-slate-400" size={18} />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+8801700000000"
                className="w-full text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Profile Image URL
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
              <Image 
              className="text-slate-400" 
              
              size={18} />

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full text-sm outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">
            Address
          </label>

          <div className="mt-2 flex items-start gap-3 rounded-2xl border border-slate-200 px-4 py-3">
            <MapPin className="mt-1 text-slate-400" size={18} />

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={4}
              placeholder="Your address"
              className="w-full text-sm outline-none resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
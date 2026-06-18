"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    role: "patient",
    photoUrl: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      submit: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.photoUrl.trim()) {
      newErrors.photoUrl = "Photo URL is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Use 6+ chars, 1 number, 1 special character";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password does not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.photoUrl,

        // These will save if you added them in Better Auth additionalFields
        phone: formData.phone,
        gender: formData.gender,
        role: formData.role,

        callbackURL: "/dashboard",
      });

      if (error) {
        setErrors({
          submit: error.message || "Signup failed. Please try again.",
        });
        return;
      }

      console.log("Signup success:", data);

      setSuccess("Account created successfully!");

      setTimeout(() => {
        router.push("/auth/signin");
      }, 1000);
    } catch (error) {
      setErrors({
        submit: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      setErrors({
        submit: error.message || "Google signup failed.",
      });
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side */}
          <div className="hidden lg:flex bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-white flex-col justify-center">
            <Link href="/" className="inline-flex">
              <Image
                src="/images/logo.png"
                alt="MediCare Connect Logo"
                width={150}
                height={55}
                className="h-12 w-auto object-contain bg-white rounded-xl p-2"
                priority
              />
            </Link>

            <h1 className="mt-8 text-3xl font-bold leading-tight">
              Join MediCare Connect
            </h1>

            <p className="mt-4 text-sm leading-7 text-blue-50">
              Create your account to book doctor appointments, manage healthcare
              records, make secure payments, and access medical services.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/15 p-3">
                <h3 className="text-xl font-bold">50+</h3>
                <p className="text-xs">Doctors</p>
              </div>

              <div className="rounded-xl bg-white/15 p-3">
                <h3 className="text-xl font-bold">1k+</h3>
                <p className="text-xs">Patients</p>
              </div>

              <div className="rounded-xl bg-white/15 p-3">
                <h3 className="text-xl font-bold">24/7</h3>
                <p className="text-xs">Support</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-6 sm:p-8">
            <div className="lg:hidden mb-4">
              <Link href="/" className="inline-flex">
                <Image
                  src="/images/logo.png"
                  alt="MediCare Connect Logo"
                  width={140}
                  height={50}
                  className="h-11 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Create Account
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Sign up as a patient or doctor.
            </p>

            {success && (
              <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                {success}
              </p>
            )}

            {errors.submit && (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {errors.submit}
              </p>
            )}

            <form onSubmit={handleSignup} className="mt-5 space-y-3">
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone + Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

                  {errors.gender && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.gender}
                    </p>
                  )}
                </div>
              </div>

              {/* Role + Photo URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>

                <div>
                  <input
                    type="url"
                    name="photoUrl"
                    placeholder="Photo URL"
                    value={formData.photoUrl}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  {errors.photoUrl && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.photoUrl}
                    </p>
                  )}
                </div>
              </div>

              {/* Password + Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 pr-16 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 pr-16 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full rounded-xl bg-blue-600 px-5 py-2.5 text-white text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading || googleLoading}
              className="mt-3 w-full rounded-xl border border-slate-200 px-5 py-2.5 text-sm text-slate-700 font-semibold hover:bg-slate-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </button>

            <p className="mt-4 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
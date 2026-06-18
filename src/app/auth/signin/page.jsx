"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SigninPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/",
      });

      if (error) {
        setErrors({
          submit: error.message || "Invalid email or password.",
        });
        return;
      }

      console.log("Signin success:", data);

      setSuccess("Login successful!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (error) {
      setErrors({
        submit: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      setLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      setErrors({
        submit: error.message || "Google login failed.",
      });
      setLoading(false);
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
              Welcome Back
            </h1>

            <p className="mt-4 text-sm leading-7 text-blue-50">
              Login to manage appointments, view healthcare records, make
              payments, and access your role-based dashboard.
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
          <div className="p-6 sm:p-8 flex flex-col justify-center">
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
              Sign In
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Login with your email and password.
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

            <form onSubmit={handleSignin} className="mt-5 space-y-3">
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
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-500">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  Remember me
                </label>

                <Link
                  href="/auth/forgot-password"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-5 py-2.5 text-white text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <button
              type="button"
              onClick={handleGoogleSignin}
              disabled={loading}
              className="mt-3 w-full rounded-xl border border-slate-200 px-5 py-2.5 text-sm text-slate-700 font-semibold hover:bg-slate-50 transition disabled:opacity-60"
            >
              Continue with Google
            </button>

            <p className="mt-4 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
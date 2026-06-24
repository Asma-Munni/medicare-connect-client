"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import Calendar from "@gravity-ui/icons/Calendar";
import Bell from "@gravity-ui/icons/Bell";
import ArrowRight from "@gravity-ui/icons/ArrowRight";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Background Blur Shapes */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute top-32 -right-24 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-5">
              <Bell width={16} height={16} />
              Trusted Online Healthcare Platform
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Book Your Doctor
              <span className="block text-blue-600">
                Appointment Easily
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-slate-600 leading-8 max-w-xl">
              MediCare Connect helps patients find verified doctors, book
              appointments, make secure payments, and receive healthcare
              services from one modern platform.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/find-doctors"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
              >
                Find Doctors
                <ArrowRight width={18} height={18} />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition"
              >
                Create Account
              </Link>
            </div>

            {/* Small Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
                <h3 className="text-2xl font-bold text-slate-900">50+</h3>
                <p className="text-sm text-slate-500">Doctors</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
                <h3 className="text-2xl font-bold text-slate-900">1k+</h3>
                <p className="text-sm text-slate-500">Patients</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
                <h3 className="text-2xl font-bold text-slate-900">24/7</h3>
                <p className="text-sm text-slate-500">Support</p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              {/* Main Card */}
              <div className="relative rounded-[2rem] bg-white p-6 shadow-2xl border border-blue-100">
                <div className="absolute -top-5 -right-5 h-20 w-20 rounded-3xl bg-blue-600 rotate-12 opacity-90" />
                <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-3xl bg-cyan-400 -rotate-12 opacity-80" />

                <div className="relative rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-white overflow-hidden">
                  <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/10 -mr-12 -mt-12" />

                  <div className="relative">
                    <div className="h-20 w-20 rounded-2xl bg-white flex items-center justify-center mb-6">
                      <Image
                        src="/Images/logo.png"
                        alt="MediCare Connect Logo"
                        width={70}
                        height={70}
                        className="h-14 w-auto object-contain"
                      />
                    </div>

                    <h2 className="text-2xl font-bold">
                      Your Health, Our Priority
                    </h2>

                    <p className="mt-3 text-blue-50 leading-6">
                      Search doctors, choose available slots, and confirm
                      appointments with secure payment.
                    </p>
                  </div>
                </div>

                {/* Appointment Card */}
                <div className="relative mt-6 rounded-2xl bg-slate-50 border border-slate-100 p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                      <Calendar width={24} height={24} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Appointment Scheduled
                      </h3>
                      <p className="text-sm text-slate-500">
                        Today at 10:30 AM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 left-6 bg-white rounded-2xl shadow-xl border border-blue-100 px-5 py-4">
                <p className="text-sm text-slate-500">Verified Doctors</p>
                <h4 className="text-xl font-bold text-blue-600">Available Now</h4>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
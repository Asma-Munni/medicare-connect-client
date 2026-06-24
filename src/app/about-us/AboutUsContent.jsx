"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HeartPulse,
  CalendarCheck,
  ShieldCheck,
  Clock,
  Users,
  Stethoscope,
  CreditCard,
  FileText,
  UserRoundCheck,
  Activity,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const benefits = [
  {
    icon: CalendarCheck,
    title: "Easy Appointment Booking",
    text: "Patients can search doctors, choose available slots, and book appointments online without long waiting lines.",
  },
  {
    icon: Clock,
    title: "Reduced Waiting Time",
    text: "Digital scheduling helps patients and doctors manage time more efficiently.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Healthcare Records",
    text: "Medical information, prescriptions, appointments, and payment records can be managed securely.",
  },
  {
    icon: Activity,
    title: "Better Healthcare Experience",
    text: "MediCare Connect improves communication between patients, doctors, and administrators.",
  },
];

const roles = [
  {
    icon: Users,
    role: "Patient",
    points: [
      "Create account",
      "Search doctors",
      "Book appointments",
      "Make payments",
      "View appointment history",
      "Review doctors",
    ],
  },
  {
    icon: Stethoscope,
    role: "Doctor",
    points: [
      "Create professional profile",
      "Manage schedules",
      "Accept or reject appointments",
      "Update consultation status",
      "Manage prescriptions",
      "View patient reviews",
    ],
  },
  {
    icon: UserRoundCheck,
    role: "Admin",
    points: [
      "Manage users",
      "Verify doctors",
      "Oversee appointments",
      "Monitor payments",
      "Generate reports",
      "Control doctor status",
    ],
  },
];

const features = [
  {
    icon: Stethoscope,
    title: "Verified Doctors",
    text: "Doctors can create profiles, but only verified doctors are shown as trusted professionals.",
  },
  {
    icon: CreditCard,
    title: "Online Payment",
    text: "Patients can pay consultation fees securely before confirming appointments.",
  },
  {
    icon: FileText,
    title: "Prescription Management",
    text: "Doctors can create and update prescriptions after completing consultations.",
  },
];

export default function AboutUsContent() {
  return (
    <main className="bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-20 md:grid-cols-2 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
              <HeartPulse size={18} />
              About MediCare Connect
            </p>

            <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              Connecting Patients, Doctors and Hospitals in One Smart Platform
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
              MediCare Connect is a modern healthcare management platform that
              helps patients book appointments, manage medical records, make
              payments, and receive healthcare services more efficiently.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/find-doctors"
                className="rounded-xl bg-cyan-600 px-6 py-3 text-center font-semibold text-white shadow-md transition hover:bg-cyan-700"
              >
                Find Doctors
              </Link>

              <Link
                href="/contact-us"
                className="rounded-xl border border-cyan-600 px-6 py-3 text-center font-semibold text-cyan-700 transition hover:bg-cyan-50"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="rounded-[2rem] bg-white p-6 shadow-xl">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-cyan-500 to-blue-600 p-8 text-white">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                  <HeartPulse size={36} />
                </div>

                <h2 className="text-2xl font-bold">Smart Healthcare Access</h2>
                <p className="mt-3 text-cyan-50">
                  Search doctors, book appointments, complete payments, and
                  manage healthcare records from a single digital system.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/15 p-4">
                    <p className="text-3xl font-bold">24/7</p>
                    <p className="text-sm text-cyan-50">Online Access</p>
                  </div>
                  <div className="rounded-2xl bg-white/15 p-4">
                    <p className="text-3xl font-bold">100%</p>
                    <p className="text-sm text-cyan-50">Digital Process</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is MediCare Connect */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">
            Project Overview
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            What is MediCare Connect?
          </h2>
          <p className="mt-5 leading-7 text-slate-600">
            MediCare Connect is a centralized online healthcare platform. It
            connects patients with doctors and hospitals through a smooth digital
            system. Patients can book appointments, doctors can manage schedules
            and consultations, and admins can monitor the full healthcare
            ecosystem.
          </p>
        </div>
      </section>

      {/* Why Develop This Project */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">
              Why We Built This
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Solving Traditional Healthcare Problems
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Traditional appointment systems often involve long waiting times,
              manual paperwork, poor communication, and schedule confusion.
              MediCare Connect is designed to make healthcare access faster,
              smarter, and more reliable.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="h-full rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">
            User Roles
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Built for Patients, Doctors and Admins
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Each role has a separate purpose and dashboard access to make the
            platform organized, secure, and easy to use.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.role}
                className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {item.role}
                </h3>

                <ul className="mt-5 space-y-3">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >
                      <span className="mt-2 h-2 w-2 rounded-full bg-cyan-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Features */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">
              Platform Features
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              A Complete Healthcare Management Solution
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl bg-gradient-to-br from-slate-50 to-cyan-50 p-7 shadow-sm"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-cyan-700 shadow-sm">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-cyan-600 p-8 text-white">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="mt-4 leading-7 text-cyan-50">
              Our mission is to digitize healthcare appointment management and
              create a smooth, secure, and user-friendly experience for patients,
              doctors, and hospitals.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-8 text-white">
            <h2 className="text-2xl font-bold">Our Vision</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Our vision is to build a reliable healthcare ecosystem where
              people can access medical services faster, doctors can manage
              consultations better, and admins can monitor everything
              efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-12 text-center text-white shadow-lg md:px-12">
            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to Experience Smarter Healthcare?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-cyan-50">
              Find trusted doctors, book appointments easily, and manage your
              healthcare journey with MediCare Connect.
            </p>

            <Link
              href="/find-doctors"
              className="mt-8 inline-block rounded-xl bg-white px-7 py-3 font-semibold text-cyan-700 transition hover:bg-cyan-50"
            >
              Explore Doctors
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
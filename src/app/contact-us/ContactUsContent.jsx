"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  HeartPulse,
  MessageCircle,
  ShieldCheck,
  Ambulance,
  HelpCircle,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const contactCards = [
  {
    icon: Mail,
    title: "Email Support",
    value: "support@medicareconnect.com",
    text: "Send us your questions anytime.",
  },
  {
    icon: Phone,
    title: "Phone Support",
    value: "+880 1700-000000",
    text: "Available during office hours.",
  },
  {
    icon: MapPin,
    title: "Office Location",
    value: "Dhaka, Bangladesh",
    text: "Healthcare support center.",
  },
  {
    icon: Ambulance,
    title: "Emergency Hotline",
    value: "999",
    text: "For urgent medical emergencies.",
  },
];

const supportTopics = [
  {
    icon: HelpCircle,
    title: "Appointment Help",
    text: "Get help with booking, rescheduling, or cancelling doctor appointments.",
  },
  {
    icon: ShieldCheck,
    title: "Doctor Verification",
    text: "Doctors can contact us for profile verification and account approval.",
  },
  {
    icon: MessageCircle,
    title: "General Support",
    text: "Ask questions about payments, prescriptions, accounts, and dashboard access.",
  },
];

const faqs = [
  {
    question: "How can I book an appointment?",
    answer:
      "You can search doctors from the Find Doctors page, choose your preferred doctor, select an available slot, and confirm your appointment.",
  },
  {
    question: "Do I need to pay before confirming an appointment?",
    answer:
      "Yes, patients need to pay the consultation fee before the appointment is confirmed.",
  },
  {
    question: "Can doctors update their profile?",
    answer:
      "Yes, doctors can update qualifications, experience, consultation fee, and available slots from their dashboard.",
  },
];

export default function ContactUsContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(
      "Thank you for contacting MediCare Connect. Our support team will reach you soon."
    );

    setFormData({
      name: "",
      email: "",
      role: "",
      subject: "",
      message: "",
    });
  };

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
              Contact MediCare Connect
            </p>

            <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              We Are Here to Help You Access Better Healthcare
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
              Have questions about appointments, doctor profiles, payments, or
              dashboard access? Contact our support team and we will guide you
              through the process.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/find-doctors"
                className="rounded-xl bg-cyan-600 px-6 py-3 text-center font-semibold text-white shadow-md transition hover:bg-cyan-700"
              >
                Find Doctors
              </Link>

              <Link
                href="/about-us"
                className="rounded-xl border border-cyan-600 px-6 py-3 text-center font-semibold text-cyan-700 transition hover:bg-cyan-50"
              >
                Learn About Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-[2rem] bg-white p-6 shadow-xl"
          >
            <div className="rounded-[1.5rem] bg-gradient-to-br from-cyan-500 to-blue-600 p-8 text-white">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                <MessageCircle size={36} />
              </div>

              <h2 className="text-2xl font-bold">Need Quick Support?</h2>

              <p className="mt-3 text-cyan-50">
                Our support team helps patients, doctors, and admins with
                appointments, account issues, payment queries, and healthcare
                service guidance.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 rounded-2xl bg-white/15 p-4">
                  <Phone size={22} />
                  <div>
                    <p className="font-semibold">Call Support</p>
                    <p className="text-sm text-cyan-50">+880 1700-000000</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white/15 p-4">
                  <Mail size={22} />
                  <div>
                    <p className="font-semibold">Email Us</p>
                    <p className="text-sm text-cyan-50">
                      support@medicareconnect.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">
            Get in Touch
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Contact Information
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Reach us through email, phone, office location, or emergency
            support. We are ready to assist you.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                  <Icon size={24} />
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 font-semibold text-cyan-700">
                  {item.value}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact Form and Office Details */}
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 lg:grid-cols-2 lg:px-8">
          {/* Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-sm md:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">
              Send Message
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Contact Our Support Team
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Fill out the form below and our team will contact you as soon as
              possible.
            </p>

            {success && (
              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Your Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  >
                    <option value="">Select your role</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Write subject"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-cyan-700 md:w-auto"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Office Details */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-600 p-8 text-white shadow-lg">
              <h2 className="text-2xl font-bold">Office Hours</h2>

              <p className="mt-4 leading-7 text-cyan-50">
                Our support team is available to help patients, doctors, and
                admins with platform-related issues.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4 rounded-2xl bg-white/15 p-4">
                  <Clock size={24} />
                  <div>
                    <p className="font-semibold">Saturday - Thursday</p>
                    <p className="text-sm text-cyan-50">9:00 AM - 8:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-white/15 p-4">
                  <Clock size={24} />
                  <div>
                    <p className="font-semibold">Friday</p>
                    <p className="text-sm text-cyan-50">Emergency support only</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                Support Topics
              </h2>

              <div className="mt-6 space-y-5">
                {supportTopics.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                        <Icon size={22} />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">
            Frequently Asked Questions
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Common Questions
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Here are some common questions about MediCare Connect.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <h3 className="font-bold text-slate-900">{item.question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-12 text-center text-white shadow-lg md:px-12">
            <h2 className="text-3xl font-bold md:text-4xl">
              Need a Doctor Appointment?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-cyan-50">
              Search verified doctors, check consultation fees, choose available
              slots, and book your appointment easily.
            </p>

            <Link
              href="/find-doctors"
              className="mt-8 inline-block rounded-xl bg-white px-7 py-3 font-semibold text-cyan-700 transition hover:bg-cyan-50"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
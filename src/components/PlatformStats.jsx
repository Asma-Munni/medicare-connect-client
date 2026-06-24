"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Loader2,
  MessageSquare,
  Stethoscope,
  Users,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

export default function PlatformStats() {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    totalReviews: 0,
  });

  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${baseUrl}/home-stats`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (data?.success) {
          setStats(data?.data);
        }
      } catch (error) {
        console.log("Failed to load platform statistics", error);
      } finally {
        setLoading(false);
      }
    };

    if (baseUrl) {
      loadStats();
    }
  }, [baseUrl]);

  const statCards = [
    {
      title: "Total Doctors",
      value: stats.totalDoctors,
      icon: Stethoscope,
      text: "Verified medical specialists",
    },
    {
      title: "Total Patients",
      value: stats.totalPatients,
      icon: Users,
      text: "Registered patient accounts",
    },
    {
      title: "Total Appointments",
      value: stats.totalAppointments,
      icon: CalendarCheck,
      text: "Appointments created",
    },
    {
      title: "Total Reviews",
      value: stats.totalReviews,
      icon: MessageSquare,
      text: "Patient feedback submitted",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-cyan-50 via-white to-blue-50 py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">
            Platform Statistics
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            MediCare Connect in Numbers
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Real-time platform data showing doctors, patients, appointments,
            and reviews from the healthcare system.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-[160px] items-center justify-center rounded-3xl bg-white">
            <div className="flex items-center gap-3 text-cyan-700">
              <Loader2 className="animate-spin" size={24} />
              <span className="font-medium">Loading platform statistics...</span>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-3xl border border-slate-100 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-4xl font-bold text-slate-900">
                    {Number(item.value || 0).toLocaleString()}+
                  </h3>

                  <p className="mt-2 font-bold text-cyan-700">{item.title}</p>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
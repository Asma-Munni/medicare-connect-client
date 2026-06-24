"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  Briefcase,
  Loader2,
  MapPin,
  Star,
  Stethoscope,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadFeaturedDoctors = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${baseUrl}/doctors?verificationStatus=verified&sortBy=rating&order=desc&page=1&limit=6`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (data?.success) {
          setDoctors(data?.data || []);
        }
      } catch (error) {
        console.log("Failed to load featured doctors", error);
      } finally {
        setLoading(false);
      }
    };

    if (baseUrl) {
      loadFeaturedDoctors();
    }
  }, [baseUrl]);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">
              Featured Doctors
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Meet Our Verified Specialists
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Explore trusted doctors based on specialization, experience,
              consultation fee, and patient ratings.
            </p>
          </div>

          <Link
            href="/find-doctors"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-600 px-5 py-3 font-semibold text-cyan-700 transition hover:bg-cyan-50"
          >
            View All Doctors
            <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="flex min-h-[220px] items-center justify-center rounded-3xl bg-slate-50">
            <div className="flex items-center gap-3 text-cyan-700">
              <Loader2 className="animate-spin" size={24} />
              <span className="font-medium">Loading featured doctors...</span>
            </div>
          </div>
        ) : doctors.length === 0 ? (
          <div className="rounded-3xl bg-slate-50 p-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
              <Stethoscope size={32} />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              No verified doctors found
            </h3>

            <p className="mt-3 text-slate-600">
              Featured doctors will appear here after admin verification.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor._id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-48 bg-gradient-to-br from-cyan-100 to-blue-100">
                  {doctor.profileImage ? (
                    <img
                      src={doctor.profileImage}
                      alt={doctor.doctorName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl font-bold text-cyan-700">
                        {doctor.doctorName?.charAt(0) || "D"}
                      </div>
                    </div>
                  )}

                  <div className="absolute left-4 top-4 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    Verified
                  </div>

                  <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-bold text-amber-600 shadow-sm">
                    <Star size={16} fill="currentColor" />
                    {doctor.averageRating || doctor.rating || 0}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900">
                    {doctor.doctorName}
                  </h3>

                  <p className="mt-1 font-semibold text-cyan-700">
                    {doctor.specialization}
                  </p>

                  <div className="mt-5 space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-3">
                      <Briefcase size={18} className="text-cyan-600" />
                      <span>{doctor.experience || 0} Years Experience</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Banknote size={18} className="text-cyan-600" />
                      <span>Consultation Fee: ৳{doctor.consultationFee}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-cyan-600" />
                      <span>{doctor.hospitalName}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
                    <p className="text-sm text-slate-500">
                      {doctor.totalReviews || 0} Reviews
                    </p>

                    <Link
                      href={`/find-doctors/${doctor._id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import Calendar from "@gravity-ui/icons/Calendar";
import Bell from "@gravity-ui/icons/Bell";
import ArrowRight from "@gravity-ui/icons/ArrowRight";

const bannerSlides = [
  {
    image: "/Images/banner-medicare1.png",
    badge: "Trusted Online Healthcare Platform",
    title: "Book Your Doctor",
    highlight: "Appointment Easily",
    description:
      "Find verified doctors, choose available slots, and manage your healthcare from one simple platform.",
    primaryButton: "Find Doctors",
    secondaryButton: "Create Account",
  },
  {
    image: "/Images/banner-medicare2.png",
    badge: "Smart Appointment Booking",
    title: "Your Health,",
    highlight: "Our Priority",
    description:
      "Book appointments, consult expert doctors, and get healthcare support with confidence.",
    primaryButton: "Book Appointment",
    secondaryButton: "Explore Doctors",
  },
  {
    image: "/Images/banner-medicare3.png",
    badge: "Verified Doctors, Secure Care",
    title: "Trusted Care,",
    highlight: "Anytime",
    description:
      "Connect with experienced doctors, track your appointments, and access better healthcare easily.",
    primaryButton: "Find a Doctor",
    secondaryButton: "Learn More",
  },
  {
    image: "/Images/banner-medicare4.png",
    badge: "Better Care Experience",
    title: "Modern Healthcare",
    highlight: "Made Simple",
    description:
      "A smooth digital healthcare platform for patients, doctors, appointments, and secure payments.",
    primaryButton: "Get Started",
    secondaryButton: "View Services",
  },
];

export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const slide = bannerSlides[activeSlide];

  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="relative h-[620px] md:h-[680px] lg:h-[720px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.image}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt="MediCare Connect Banner"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 h-full flex items-center">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-blue-100 text-blue-700 text-sm font-semibold shadow-sm">
              <Bell width={16} height={16} />
              {slide.badge}
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 leading-tight">
              {slide.title}
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {slide.highlight}
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-slate-600 leading-8 max-w-xl">
              {slide.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/find-doctors"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
              >
                {slide.primaryButton}
                <ArrowRight width={18} height={18} />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white/80 backdrop-blur-md border border-blue-100 text-blue-700 font-semibold hover:bg-blue-50 transition"
              >
                {slide.secondaryButton}
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 max-w-md">
              <div className="rounded-2xl bg-white/80 backdrop-blur-md p-4 shadow-sm border border-blue-100">
                <h3 className="text-2xl font-bold text-slate-900">50+</h3>
                <p className="text-sm text-slate-500">Doctors</p>
              </div>

              <div className="rounded-2xl bg-white/80 backdrop-blur-md p-4 shadow-sm border border-blue-100">
                <h3 className="text-2xl font-bold text-slate-900">1k+</h3>
                <p className="text-sm text-slate-500">Patients</p>
              </div>

              <div className="rounded-2xl bg-white/80 backdrop-blur-md p-4 shadow-sm border border-blue-100">
                <h3 className="text-2xl font-bold text-slate-900">24/7</h3>
                <p className="text-sm text-slate-500">Support</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                activeSlide === index
                  ? "w-8 bg-blue-600"
                  : "w-2.5 bg-white/80 hover:bg-blue-300"
              }`}
              aria-label={`Go to banner slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-8 right-6 z-20 hidden md:flex items-center gap-3 rounded-full bg-white/85 backdrop-blur-md border border-blue-100 px-5 py-3 shadow-lg">
          <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calendar width={20} height={20} />
          </div>

          <div>
            <p className="text-xs text-slate-500">Quick Booking</p>
            <p className="text-sm font-bold text-slate-900">
              Appointment Available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
  CreditCard,
  ClipboardList,
} from "lucide-react";

export default function PatientOverviewCards() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadAppointments = async () => {
      if (isPending) return;

      if (!user) {
        setLoading(false);
        setError("Please login to see your appointment summary.");
        return;
      }

      const patientId = user?.id || user?._id || user?.email;

      try {
        setLoading(true);

        const res = await fetch(
          `${baseUrl}/appointments/patient/${patientId}`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (!data?.success) {
          setError(data?.message || "Failed to load appointment summary.");
          return;
        }

        setAppointments(data?.data || []);
      } catch (error) {
        setError("Something went wrong while loading summary.");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [isPending, user, baseUrl]);

  if (isPending || loading) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <p className="text-slate-500">Loading patient overview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-red-100 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">Unable to load</h2>
        <p className="mt-2 text-sm text-red-500">{error}</p>
      </div>
    );
  }

  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (item) => item.appointmentStatus === "pending"
  ).length;

  const acceptedAppointments = appointments.filter(
    (item) => item.appointmentStatus === "accepted"
  ).length;

  const completedAppointments = appointments.filter(
    (item) => item.appointmentStatus === "completed"
  ).length;

  const cancelledAppointments = appointments.filter(
    (item) => item.appointmentStatus === "cancelled"
  ).length;

  const unpaidAppointments = appointments.filter(
    (item) => item.paymentStatus === "unpaid"
  ).length;

  const cards = [
    {
      title: "Total Appointments",
      value: totalAppointments,
      icon: CalendarDays,
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      title: "Pending",
      value: pendingAppointments,
      icon: Clock,
      bg: "bg-yellow-50",
      text: "text-yellow-700",
    },
    {
      title: "Accepted",
      value: acceptedAppointments,
      icon: CheckCircle,
      bg: "bg-green-50",
      text: "text-green-700",
    },
    {
      title: "Completed",
      value: completedAppointments,
      icon: ClipboardList,
      bg: "bg-purple-50",
      text: "text-purple-700",
    },
    {
      title: "Cancelled",
      value: cancelledAppointments,
      icon: XCircle,
      bg: "bg-red-50",
      text: "text-red-700",
    },
    {
      title: "Unpaid",
      value: unpaidAppointments,
      icon: CreditCard,
      bg: "bg-slate-100",
      text: "text-slate-700",
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl bg-white border border-blue-100 shadow-sm p-5"
          >
            <div
              className={`h-12 w-12 rounded-2xl ${card.bg} ${card.text} flex items-center justify-center`}
            >
              <Icon size={24} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-500">
              {card.title}
            </h3>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
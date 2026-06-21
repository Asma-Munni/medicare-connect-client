"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Stethoscope,
  CalendarDays,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  UserCheck,
} from "lucide-react";

export default function AdminOverviewCards() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${baseUrl}/stats`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (!data?.success) {
          setError(data?.message || "Failed to load statistics.");
          return;
        }

        setStats(data.data);
      } catch (error) {
        setError("Something went wrong while loading statistics.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [baseUrl]);

  if (loading) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <p className="text-slate-500">Loading dashboard statistics...</p>
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

  const cards = [
    {
      title: "Total Users",
      value: stats?.users?.totalUsers || 0,
      icon: Users,
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      title: "Patients",
      value: stats?.users?.totalPatients || 0,
      icon: UserCheck,
      bg: "bg-green-50",
      text: "text-green-700",
    },
    {
      title: "Doctors",
      value: stats?.doctors?.totalDoctors || 0,
      icon: Stethoscope,
      bg: "bg-purple-50",
      text: "text-purple-700",
    },
    {
      title: "Verified Doctors",
      value: stats?.doctors?.verifiedDoctors || 0,
      icon: CheckCircle,
      bg: "bg-emerald-50",
      text: "text-emerald-700",
    },
    {
      title: "Pending Doctors",
      value: stats?.doctors?.pendingDoctors || 0,
      icon: Clock,
      bg: "bg-yellow-50",
      text: "text-yellow-700",
    },
    {
      title: "Total Appointments",
      value: stats?.appointments?.totalAppointments || 0,
      icon: CalendarDays,
      bg: "bg-cyan-50",
      text: "text-cyan-700",
    },
    {
      title: "Pending Appointments",
      value: stats?.appointments?.pendingAppointments || 0,
      icon: Clock,
      bg: "bg-orange-50",
      text: "text-orange-700",
    },
    {
      title: "Completed",
      value: stats?.appointments?.completedAppointments || 0,
      icon: CheckCircle,
      bg: "bg-green-50",
      text: "text-green-700",
    },
    {
      title: "Cancelled",
      value: stats?.appointments?.cancelledAppointments || 0,
      icon: XCircle,
      bg: "bg-red-50",
      text: "text-red-700",
    },
    {
      title: "Unpaid Appointments",
      value: stats?.payments?.unpaidAppointments || 0,
      icon: CreditCard,
      bg: "bg-slate-100",
      text: "text-slate-700",
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
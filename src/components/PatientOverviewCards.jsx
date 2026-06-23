import {
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
  CreditCard,
  ClipboardList,
} from "lucide-react";

import { getUserSession } from "@/lib/core/session";
import { protectedFetch } from "@/lib/core/server";

export default async function PatientOverviewCards() {
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-red-100 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">Unable to load</h2>
        <p className="mt-2 text-sm text-red-500">
          Please login to see your appointment summary.
        </p>
      </div>
    );
  }

  const patientId = user?.id || user?._id || user?.email;

  let appointments = [];
  let error = "";

  try {
    const data = await protectedFetch(`/appointments/patient/${patientId}`);

    if (!data?.success) {
      error = data?.message || "Failed to load appointment summary.";
    } else {
      appointments = data?.data || [];
    }
  } catch (err) {
    error = "Something went wrong while loading summary.";
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
    (item) =>
      item.appointmentStatus === "cancelled" ||
      item.appointmentStatus === "rejected"
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
      title: "Cancelled / Rejected",
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
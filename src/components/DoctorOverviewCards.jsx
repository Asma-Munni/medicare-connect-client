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
  UserCheck,
} from "lucide-react";

export default function DoctorOverviewCards() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadDoctorOverview = async () => {
      if (isPending) return;

      if (!user?.email) {
        setLoading(false);
        setError("Please login as a doctor to see your dashboard overview.");
        return;
      }

      try {
        setLoading(true);

        const doctorRes = await fetch(
          `${baseUrl}/doctors/email/${encodeURIComponent(user.email)}`,
          {
            cache: "no-store",
          }
        );

        const doctorData = await doctorRes.json();

        if (!doctorData?.success) {
          setError("Doctor profile not found for this account.");
          return;
        }

        const doctorProfile = doctorData.data;
        setDoctor(doctorProfile);

        const appointmentRes = await fetch(
          `${baseUrl}/appointments/doctor/${doctorProfile._id}`,
          {
            cache: "no-store",
          }
        );

        const appointmentData = await appointmentRes.json();

        if (!appointmentData?.success) {
          setError(appointmentData?.message || "Failed to load appointments.");
          return;
        }

        setAppointments(appointmentData?.data || []);
      } catch (error) {
        setError("Something went wrong while loading doctor overview.");
      } finally {
        setLoading(false);
      }
    };

    loadDoctorOverview();
  }, [isPending, user, baseUrl]);

  if (isPending || loading) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <p className="text-slate-500">Loading doctor overview...</p>
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

  const totalRequests = appointments.length;

  const pendingRequests = appointments.filter(
    (item) => item.appointmentStatus === "pending"
  ).length;

  const acceptedRequests = appointments.filter(
    (item) => item.appointmentStatus === "accepted"
  ).length;

  const completedRequests = appointments.filter(
    (item) => item.appointmentStatus === "completed"
  ).length;

  const rejectedRequests = appointments.filter(
    (item) => item.appointmentStatus === "rejected"
  ).length;

  const cancelledRequests = appointments.filter(
    (item) => item.appointmentStatus === "cancelled"
  ).length;

  const unpaidRequests = appointments.filter(
    (item) => item.paymentStatus === "unpaid"
  ).length;

  const cards = [
    {
      title: "Total Requests",
      value: totalRequests,
      icon: CalendarDays,
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      title: "Pending",
      value: pendingRequests,
      icon: Clock,
      bg: "bg-yellow-50",
      text: "text-yellow-700",
    },
    {
      title: "Accepted",
      value: acceptedRequests,
      icon: CheckCircle,
      bg: "bg-green-50",
      text: "text-green-700",
    },
    {
      title: "Completed",
      value: completedRequests,
      icon: ClipboardList,
      bg: "bg-purple-50",
      text: "text-purple-700",
    },
    {
      title: "Rejected",
      value: rejectedRequests,
      icon: XCircle,
      bg: "bg-red-50",
      text: "text-red-700",
    },
    {
      title: "Cancelled",
      value: cancelledRequests,
      icon: XCircle,
      bg: "bg-slate-100",
      text: "text-slate-700",
    },
    {
      title: "Unpaid",
      value: unpaidRequests,
      icon: CreditCard,
      bg: "bg-orange-50",
      text: "text-orange-700",
    },
  ];

  return (
    <>
      {doctor && (
        <div className="mt-6 rounded-3xl bg-white border border-blue-100 shadow-sm p-5">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <img
              src={doctor.profileImage}
              alt={doctor.doctorName}
              className="h-20 w-20 rounded-2xl object-cover border"
              referrerPolicy="no-referrer"
            />

            <div>
              <p className="text-sm text-blue-600 font-semibold">
                Doctor Profile
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {doctor.doctorName}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {doctor.specialization} • {doctor.experience} Years Experience
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {doctor.hospitalName}
              </p>
            </div>

            <div className="md:ml-auto">
              <span className="rounded-full bg-green-50 px-4 py-2 text-xs font-semibold text-green-700 capitalize">
                {doctor.verificationStatus}
              </span>
            </div>
          </div>
        </div>
      )}

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
    </>
  );
}
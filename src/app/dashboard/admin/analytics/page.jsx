import AdminAnalyticsCharts from "@/components/AdminAnalyticsCharts";
import { protectedFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Analytics | MediCare Connect",
  description: "Admin analytics and platform insights.",
};

const formatMonth = (dateValue) => {
  if (!dateValue) return "Unknown";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export default async function AdminAnalyticsPage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/auth/signin");
  }

  if (user?.role !== "admin") {
    redirect("/unauthorized");
  }

  const statsResult = await protectedFetch("/stats");
  const appointmentsResult = await protectedFetch("/appointments");
  const paymentsResult = await protectedFetch("/payments");
  const doctorsResult = await protectedFetch(
    "/doctors?limit=1000&sortBy=rating&order=desc"
  );

  const stats = statsResult?.data || {};
  const appointments = appointmentsResult?.data || [];
  const payments = paymentsResult?.data || [];
  const doctors = doctorsResult?.data || [];

  const totalRevenue = payments.reduce((sum, payment) => {
    return sum + Number(payment.amount || 0);
  }, 0);

  const appointmentStatusData = [
    {
      name: "Pending",
      value: stats?.appointments?.pendingAppointments || 0,
    },
    {
      name: "Accepted",
      value: stats?.appointments?.acceptedAppointments || 0,
    },
    {
      name: "Completed",
      value: stats?.appointments?.completedAppointments || 0,
    },
    {
      name: "Rejected",
      value: stats?.appointments?.rejectedAppointments || 0,
    },
    {
      name: "Cancelled",
      value: stats?.appointments?.cancelledAppointments || 0,
    },
  ];

  const doctorVerificationData = [
    {
      name: "Verified",
      value: stats?.doctors?.verifiedDoctors || 0,
    },
    {
      name: "Pending",
      value: stats?.doctors?.pendingDoctors || 0,
    },
    {
      name: "Rejected",
      value: stats?.doctors?.rejectedDoctors || 0,
    },
  ];

  const paymentStatusData = [
    {
      name: "Paid",
      value: stats?.payments?.paidAppointments || 0,
    },
    {
      name: "Unpaid",
      value: stats?.payments?.unpaidAppointments || 0,
    },
  ];

  const platformSummaryData = [
    {
      name: "Patients",
      value: stats?.users?.totalPatients || 0,
    },
    {
      name: "Doctors",
      value: stats?.doctors?.totalDoctors || 0,
    },
    {
      name: "Appointments",
      value: stats?.appointments?.totalAppointments || 0,
    },
    {
      name: "Payments",
      value: stats?.payments?.totalPayments || 0,
    },
  ];

  const monthlyPaymentMap = payments.reduce((acc, payment) => {
    const month = formatMonth(payment.paidAt || payment.createdAt);

    if (!acc[month]) {
      acc[month] = 0;
    }

    acc[month] += Number(payment.amount || 0);

    return acc;
  }, {});

  const monthlyRevenueData = Object.entries(monthlyPaymentMap).map(
    ([month, amount]) => ({
      month,
      amount,
    })
  );

  const monthlyAppointmentMap = appointments.reduce((acc, appointment) => {
    const month = formatMonth(appointment.createdAt);

    if (!acc[month]) {
      acc[month] = 0;
    }

    acc[month] += 1;

    return acc;
  }, {});

  const monthlyAppointmentData = Object.entries(monthlyAppointmentMap).map(
    ([month, total]) => ({
      month,
      total,
    })
  );

  const topDoctorData = doctors
    .map((doctor) => ({
      name: doctor.doctorName || "Doctor",
      rating: Number(doctor.averageRating || doctor.rating || 0),
      reviews: Number(doctor.totalReviews || 0),
    }))
    .filter((doctor) => doctor.rating > 0 || doctor.reviews > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const overviewCards = [
    {
      title: "Total Users",
      value: stats?.users?.totalUsers || 0,
      note: "All registered users",
    },
    {
      title: "Total Doctors",
      value: stats?.doctors?.totalDoctors || 0,
      note: `${stats?.doctors?.verifiedDoctors || 0} verified doctors`,
    },
    {
      title: "Total Appointments",
      value: stats?.appointments?.totalAppointments || 0,
      note: `${stats?.appointments?.completedAppointments || 0} completed`,
    },
    {
      title: "Total Revenue",
      value: `৳${totalRevenue}`,
      note: `${stats?.payments?.totalPayments || 0} payment records`,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="mb-6">
          <p className="text-blue-600 font-semibold">Admin Dashboard</p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Analytics
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor platform performance, appointment trends, doctor ratings,
            and payment activity.
          </p>
        </div>

        <AdminAnalyticsCharts
          overviewCards={overviewCards}
          appointmentStatusData={appointmentStatusData}
          doctorVerificationData={doctorVerificationData}
          paymentStatusData={paymentStatusData}
          platformSummaryData={platformSummaryData}
          monthlyRevenueData={monthlyRevenueData}
          monthlyAppointmentData={monthlyAppointmentData}
          topDoctorData={topDoctorData}
        />
      </section>
    </main>
  );
}
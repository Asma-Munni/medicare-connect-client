"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

import {
  BarChart3,
  Users,
  Stethoscope,
  CalendarDays,
  CreditCard,
} from "lucide-react";

const pieColors = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#64748b"];

export default function AdminAnalyticsCharts({
  overviewCards = [],
  appointmentStatusData = [],
  doctorVerificationData = [],
  paymentStatusData = [],
  platformSummaryData = [],
  monthlyRevenueData = [],
  monthlyAppointmentData = [],
  topDoctorData = [],
}) {
  const icons = [Users, Stethoscope, CalendarDays, CreditCard];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {overviewCards.map((card, index) => {
          const Icon = icons[index] || BarChart3;

          return (
            <div
              key={card.title}
              className="rounded-3xl bg-white border border-blue-100 shadow-sm p-5"
            >
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Icon size={24} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-500">
                {card.title}
              </h3>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                {card.value}
              </p>

              <p className="mt-2 text-xs text-slate-500">{card.note}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900">
            Appointment Status
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current status distribution of all appointments.
          </p>

          <div className="mt-5 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900">
            Doctor Verification
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Verified, pending, and rejected doctor profiles.
          </p>

          <div className="mt-5 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={doctorVerificationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                >
                  {doctorVerificationData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
  <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
    <h2 className="text-xl font-bold text-slate-900">Monthly Revenue</h2>

    <p className="mt-1 text-sm text-slate-500">
      Revenue generated from paid appointments.
    </p>

    <div className="mt-5 h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={monthlyRevenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#16a34a"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

  <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
    <h2 className="text-xl font-bold text-slate-900">
      Monthly Appointments
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Appointment creation trend by month.
    </p>

    <div className="mt-5 h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyAppointmentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="total" radius={[10, 10, 0, 0]} fill="#7c3aed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
  <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
    <h2 className="text-xl font-bold text-slate-900">Platform Summary</h2>

    <p className="mt-1 text-sm text-slate-500">
      Patients, doctors, appointments, and payment records overview.
    </p>

    <div className="mt-5 h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={platformSummaryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#0f172a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
    <h2 className="text-xl font-bold text-slate-900">
      Top Doctor Performance
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Highest rated doctors based on patient reviews.
    </p>

    {topDoctorData.length === 0 ? (
      <div className="mt-5 rounded-2xl bg-slate-50 p-8 text-center">
        <p className="text-sm text-slate-500">
          No doctor rating data available yet.
        </p>
      </div>
    ) : (
      <div className="mt-5 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topDoctorData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Bar dataKey="rating" radius={[10, 10, 0, 0]} fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )}
  </div>
</div>

<div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
  <h2 className="text-xl font-bold text-slate-900">Payment Status</h2>

  <p className="mt-1 text-sm text-slate-500">
    Paid and unpaid appointment comparison.
  </p>

  <div className="mt-5 h-80">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={paymentStatusData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={110}
          label
        >
          {paymentStatusData.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={pieColors[index % pieColors.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>
    </div>
  );
}
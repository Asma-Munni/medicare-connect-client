import RoleGuard from "@/components/RoleGuerd";


export default function DoctorDashboardPage() {
  return (
    <RoleGuard allowedRoles={["doctor"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Doctor Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Manage schedules, appointment requests, and prescriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Total Patients</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">0</h2>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Today&apos;s Appointments</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">0</h2>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Reviews Received</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">0</h2>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
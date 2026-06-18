import RoleGuard from "@/components/RoleGuard";


export default function AdminDashboardPage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Manage users, doctors, appointments, payments, and analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Total Patients</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">0</h2>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Total Doctors</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">0</h2>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Total Appointments</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">0</h2>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Total Payments</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">$0</h2>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
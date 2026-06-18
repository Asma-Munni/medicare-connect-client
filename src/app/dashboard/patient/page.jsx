import RoleGuard from "@/components/RoleGuerd";


export default function PatientDashboardPage() {
  return (
    <RoleGuard allowedRoles={["patient"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Patient Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your appointments, payments, and reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Upcoming Appointments</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">0</h2>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Appointment History</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">0</h2>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Total Payments</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">$0</h2>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Favorite Doctors</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">0</h2>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
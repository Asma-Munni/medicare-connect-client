import { Loader2, LayoutDashboard } from "lucide-react";

export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-8 text-center max-w-md w-full">
        <div className="mx-auto h-16 w-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
          <LayoutDashboard size={32} />
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <Loader2 className="animate-spin text-blue-600" size={22} />

          <h1 className="text-xl font-bold text-slate-900">
            Loading Dashboard
          </h1>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          Fetching your dashboard data securely.
        </p>
      </div>
    </main>
  );
}
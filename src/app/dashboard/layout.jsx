"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  User,
  CalendarDays,
  CreditCard,
  Star,
  Users,
  Stethoscope,
  ClipboardList,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const role = user?.role || "patient";

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/auth/signin");
    }
  }, [isPending, user, router]);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/auth/signin");
    router.refresh();
  };

  const patientMenus = [
    { name: "Overview", href: "/dashboard/patient", icon: LayoutDashboard },
    { name: "My Profile", href: "/dashboard/profile", icon: User },
    { name: "My Appointments", href: "/dashboard/patient/appointments", icon: CalendarDays },
    { name: "Payment History", href: "/dashboard/patient/payments", icon: CreditCard },
    { name: "My Reviews", href: "/dashboard/patient/reviews", icon: Star },
  ];

  const doctorMenus = [
    { name: "Overview", href: "/dashboard/doctor", icon: LayoutDashboard },
    { name: "Profile Management", href: "/dashboard/doctor/profile", icon: User },
    { name: "Manage Schedule", href: "/dashboard/doctor/schedule", icon: CalendarDays },
    { name: "Appointment Requests", href: "/dashboard/doctor/appointments", icon: ClipboardList },
    { name: "Prescriptions", href: "/dashboard/doctor/prescriptions", icon: Stethoscope },
  ];

  const adminMenus = [
    { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    { name: "Manage Doctors", href: "/dashboard/admin/doctors", icon: Stethoscope },
    { name: "Manage Appointments", href: "/dashboard/admin/appointments", icon: ClipboardList },
    { name: "Payment Management", href: "/dashboard/admin/payments", icon: CreditCard },
    { name: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  ];

  const menus =
    role === "admin" ? adminMenus : role === "doctor" ? doctorMenus : patientMenus;

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section className="min-h-screen bg-slate-50">
      {/* Mobile Topbar */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <h2 className="font-bold text-slate-900">Dashboard</h2>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-slate-700"
        >
          {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 z-30 h-screen w-72 bg-white border-r border-slate-200 p-5 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <Link href="/" className="block">
            <h1 className="text-2xl font-bold text-blue-600">MediCare</h1>
            <p className="text-sm text-slate-500">Connect Dashboard</p>
          </Link>

          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-blue-50 p-3">
            <img
              src={user.image || "/images/default-user.png"}
              alt={user.name || "User"}
              className="h-12 w-12 rounded-full object-cover border"
              referrerPolicy="no-referrer"
            />

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-900 truncate">
                {user.name}
              </h3>
              <p className="text-xs text-slate-500 capitalize">{role}</p>
            </div>
          </div>

          <nav className="mt-6 space-y-2">
            {menus.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="mb-6 hidden lg:flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 capitalize">
                {role} Dashboard
              </h2>
              <p className="text-sm text-slate-500">
                Welcome back, {user.name}
              </p>
            </div>
          </div>

          {children}
        </main>
      </div>
    </section>
  );
}
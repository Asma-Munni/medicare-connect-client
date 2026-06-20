"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Stethoscope,
  ClipboardList,
  LogOut,
  Menu,
  X,
  Search,
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
    {
      name: "Overview",
      href: "/dashboard/patient",
      icon: LayoutDashboard,
    },
    {
      name: "My Appointments",
      href: "/dashboard/patient/appointments",
      icon: CalendarDays,
    },
    {
      name: "Find Doctors",
      href: "/find-doctors",
      icon: Search,
    },
  ];

  const doctorMenus = [
    {
      name: "Overview",
      href: "/dashboard/doctor",
      icon: LayoutDashboard,
    },
    {
      name: "Appointment Requests",
      href: "/dashboard/doctor/appointments",
      icon: ClipboardList,
    },
    {
      name: "Find Doctors",
      href: "/find-doctors",
      icon: Search,
    },
  ];

const adminMenus = [
  {
    name: "Overview",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Manage Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    name: "Manage Doctors",
    href: "/dashboard/admin/doctors",
    icon: Stethoscope,
  },
  {
    name: "Manage Appointments",
    href: "/dashboard/admin/appointments",
    icon: ClipboardList,
  },
  {
    name: "Find Doctors",
    href: "/find-doctors",
    icon: Search,
  },
];

  const menus =
    role === "admin" ? adminMenus : role === "doctor" ? doctorMenus : patientMenus;

  const dashboardHome =
    role === "admin"
      ? "/dashboard/admin"
      : role === "doctor"
      ? "/dashboard/doctor"
      : "/dashboard/patient";

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
        <Link href={dashboardHome} className="block">
          <h2 className="font-bold text-slate-900">Dashboard</h2>
          <p className="text-xs text-slate-500 capitalize">{role} Panel</p>
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-slate-700"
          aria-label="Toggle sidebar"
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
                {user.name || "User"}
              </h3>

              <p className="text-xs text-slate-500 capitalize">
                {role} Account
              </p>
            </div>
          </div>

          <nav className="mt-6 space-y-2">
            {menus.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href ||
                (item.href !== dashboardHome &&
                  pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-5 left-5 right-5">
            <Link
              href="/"
              onClick={() => setSidebarOpen(false)}
              className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <LayoutDashboard size={18} />
              Back to Home
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="mb-6 hidden lg:flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 capitalize">
                {role} Dashboard
              </h2>

              <p className="text-sm text-slate-500">
                Welcome back, {user.name || "User"}
              </p>
            </div>

            <div className="rounded-full bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 capitalize">
              {role}
            </div>
          </div>

          {children}
        </main>
      </div>
    </section>
  );
}
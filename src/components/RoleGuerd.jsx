"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function RoleGuard({ allowedRoles, children }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const role = user?.role || "patient";

  const dashboardPath =
    role === "admin"
      ? "/dashboard/admin"
      : role === "doctor"
      ? "/dashboard/doctor"
      : "/dashboard/patient";

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/auth/signin");
    }

    if (!isPending && user && !allowedRoles.includes(role)) {
      router.replace(dashboardPath);
    }
  }, [isPending, user, role, allowedRoles, dashboardPath, router]);

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!allowedRoles.includes(role)) {
    return null;
  }

  return children;
}
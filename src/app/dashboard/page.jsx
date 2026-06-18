"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/auth/signin");
      return;
    }

    const role = session.user.role || "patient";

    if (role === "admin") {
      router.replace("/dashboard/admin");
    } else if (role === "doctor") {
      router.replace("/dashboard/doctor");
    } else {
      router.replace("/dashboard/patient");
    }
  }, [session, isPending, router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-slate-500">Redirecting to dashboard...</p>
    </div>
  );
}
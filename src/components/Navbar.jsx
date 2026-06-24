"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Find Doctors", path: "/find-doctors" },
  { name: "About Us", path: "/about-us" },
  { name: "Contact Us", path: "/contact-us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  console.log(session, "user session", isPending, "pending:");

  const user = session?.user;

  const userName = user?.name || "User";
  const userPhoto = user?.image || "/images/default-user.png";
  const userRole = user?.role || "patient";

  const dashboardPath =
    userRole === "admin"
      ? "/dashboard/admin"
      : userRole === "doctor"
      ? "/dashboard/doctor"
      : "/dashboard/patient";

  const handleLogout = async () => {
    await authClient.signOut();

    setProfileOpen(false);
    setMenuOpen(false);

    router.push("/auth/signin");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Images/logo.png"
              alt="MediCare Connect Logo"
              width={150}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition ${
                  pathname === link.path
                    ? "text-blue-600"
                    : "text-slate-700 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <Link
                href={dashboardPath}
                className={`text-sm font-medium transition ${
                  pathname.includes("/dashboard")
                    ? "text-blue-600"
                    : "text-slate-700 hover:text-blue-600"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth Buttons / Profile Dropdown */}
          <div className="hidden lg:flex items-center gap-3">
            {isPending ? (
              <div className="h-10 w-28 rounded-full bg-slate-100 animate-pulse" />
            ) : !user ? (
              <>
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Login
                </Link>

                <Link
                  href="/auth/signup"
                  className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 hover:bg-slate-50 transition"
                >
                  <Image
                    src={userPhoto}
                    alt={userName}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover border"
                  />

                  <div className="text-left pr-2">
                    <p className="text-sm font-semibold text-slate-800 leading-4">
                      {userName}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">
                      {userRole}
                    </p>
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-2xl border border-slate-100 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-800">
                        {userName}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <User size={16} />
                      Profile
                    </Link>

                    <Link
                      href={dashboardPath}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-slate-700"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden pb-5 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === link.path
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isPending ? (
              <div className="h-10 rounded-lg bg-slate-100 animate-pulse" />
            ) : user ? (
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50">
                  <Image
                    src={userPhoto}
                    alt={userName}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover border"
                  />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {userName}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">
                      {userRole}
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
                >
                  Profile
                </Link>

                <Link
                  href={dashboardPath}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-slate-200">
                <div className="flex gap-3">
                  <Link
                    href="/auth/signin"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center px-4 py-2 rounded-lg border border-blue-600 text-blue-600 text-sm font-medium"
                  >
                    Login
                  </Link>

                  <Link
                    href="/auth/signup"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
import Link from "next/link";
import { Home, Search, Stethoscope } from "lucide-react";

export const metadata = {
  title: "Page Not Found | MediCare Connect",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mx-auto h-24 w-24 rounded-3xl bg-blue-50 text-blue-700 flex items-center justify-center">
          <Stethoscope size={48} />
        </div>

        <p className="mt-8 text-blue-600 font-semibold">404 Error</p>

        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-slate-900">
          Page Not Found
        </h1>

        <p className="mt-4 text-sm md:text-base text-slate-500 leading-7">
          The page you are looking for may have been moved, deleted, or the URL
          may be incorrect. Please go back home or search for doctors.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            <Home size={18} />
            Back Home
          </Link>

          <Link
            href="/find-doctors"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            <Search size={18} />
            Find Doctors
          </Link>
        </div>
      </div>
    </main>
  );
}
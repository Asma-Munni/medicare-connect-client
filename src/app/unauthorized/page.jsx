import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-sm border border-blue-100">
        <h1 className="text-3xl font-bold text-slate-900">
          Unauthorized Access
        </h1>

        <p className="mt-3 text-slate-500">
          You do not have permission to access this page.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
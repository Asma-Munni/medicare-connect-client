import { Loader2, Stethoscope } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-8 text-center max-w-md w-full">
        <div className="mx-auto h-16 w-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
          <Stethoscope size={32} />
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <Loader2 className="animate-spin text-blue-600" size={22} />

          <h1 className="text-xl font-bold text-slate-900">
            Loading MediCare Connect
          </h1>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          Please wait while we prepare your healthcare experience.
        </p>
      </div>
    </main>
  );
}
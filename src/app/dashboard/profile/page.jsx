import ProfileForm from "@/components/ProfileForm";

export const metadata = {
  title: "My Profile | MediCare Connect",
  description: "User profile management page.",
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-5xl mx-auto px-4 lg:px-8 py-6">
        <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
          <p className="text-blue-600 font-semibold">Dashboard</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update your personal information, profile image, phone number, and
            address.
          </p>
        </div>

        <ProfileForm />
      </section>
    </main>
  );
}
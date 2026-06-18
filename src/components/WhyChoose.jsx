const benefits = [
  {
    title: "Verified Doctors",
    description:
      "All doctors are verified by admin before becoming available for patients.",
  },
  {
    title: "Easy Appointment",
    description:
      "Patients can search doctors, choose available slots, and book appointments easily.",
  },
  {
    title: "Secure Payment",
    description:
      "Consultation fees can be paid safely through integrated online payment system.",
  },
  {
    title: "Digital Records",
    description:
      "Appointment history, reviews, payments, and prescriptions are stored digitally.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-blue-600 font-semibold">
              Why Choose MediCare Connect
            </p>

            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
              A Smart Healthcare Platform for Patients and Doctors
            </h2>

            <p className="mt-5 text-slate-600 leading-8">
              MediCare Connect reduces waiting time, improves doctor schedule
              management, secures patient information, and creates a smooth
              healthcare experience for everyone.
            </p>

            <div className="mt-8">
              <a
                href="/find-doctors"
                className="inline-block px-7 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Book Appointment
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="h-11 w-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-6">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
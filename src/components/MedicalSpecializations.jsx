const specializations = [
  {
    title: "Cardiology",
    description: "Heart and blood pressure related treatment.",
    icon: "❤️",
  },
  {
    title: "Neurology",
    description: "Brain, nerve, and nervous system care.",
    icon: "🧠",
  },
  {
    title: "Orthopedics",
    description: "Bone, joint, and muscle treatment.",
    icon: "🦴",
  },
  {
    title: "Pediatrics",
    description: "Healthcare support for children.",
    icon: "👶",
  },
  {
    title: "Dermatology",
    description: "Skin, hair, and allergy treatment.",
    icon: "🩺",
  },
];

export default function MedicalSpecializations() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-blue-600 font-semibold">Specializations</p>

          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
            Medical Specializations
          </h2>

          <p className="mt-4 text-slate-600">
            Explore common medical departments and find the right doctor for
            your healthcare needs.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {specializations.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-blue-100 bg-blue-50/40 p-6 text-center hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="mx-auto h-16 w-16 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm">
                {item.icon}
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
    </section>
  );
}
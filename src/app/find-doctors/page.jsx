
import DoctorCard from "@/components/DoctorsCard";
import { getDoctors } from "@/lib/api/doctors";
import Link from "next/link";

export const metadata = {
  title: "Find Doctors | MediCare Connect",
  description: "Search and book appointments with verified doctors.",
};

const specializations = [
  "Cardiology",
  "Neurology",
  "Dermatology",
  "Orthopedics",
  "Pediatrics",
  "Medicine",
  "Gynecology",
  "ENT",
  "Psychiatry",
  "Urology",
  "Endocrinology",
  "Gastroenterology",
  "Ophthalmology",
  "Nephrology",
  "Dental",
  "Oncology",
  "Pulmonology",
];

const getSortConfig = (sort) => {
  if (sort === "fee-low") return { sortBy: "fee", order: "asc" };
  if (sort === "fee-high") return { sortBy: "fee", order: "desc" };
  if (sort === "experience") return { sortBy: "experience", order: "desc" };
  if (sort === "rating") return { sortBy: "rating", order: "desc" };

  return { sortBy: "createdAt", order: "desc" };
};

export default async function FindDoctorsPage({ searchParams }) {
  const params = searchParams || {};

  const search = params.search || "";
  const specialization = params.specialization || "";
  const sort = params.sort || "latest";
  const page = Number(params.page) || 1;
  const limit = 6;

  const { sortBy, order } = getSortConfig(sort);

  const result = await getDoctors({
    search,
    specialization,
    verificationStatus: "verified",
    sortBy,
    order,
    page,
    limit,
  });

  const doctors = result?.data || [];
  const meta = result?.meta || {};

  const createPageLink = (pageNumber) => {
    const query = new URLSearchParams();

    if (search) query.set("search", search);
    if (specialization) query.set("specialization", specialization);
    if (sort) query.set("sort", sort);

    query.set("page", String(pageNumber));

    return `/find-doctors?${query.toString()}`;
  };

  return (
    <main className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-blue-600 font-semibold">Find Doctors</p>

          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-slate-900">
            Search Verified Doctors
          </h1>

          <p className="mt-4 text-slate-600 leading-7">
            Browse verified doctors, compare consultation fees, check
            experience, and book appointments easily through MediCare Connect.
          </p>
        </div>

        <form
          action="/find-doctors"
          method="GET"
          className="mt-10 rounded-3xl bg-white border border-blue-100 shadow-sm p-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="search"
              placeholder="Search by name or specialization..."
              defaultValue={search}
              className="md:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <select
              name="specialization"
              defaultValue={specialization}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
            >
              <option value="">All Specializations</option>
              {specializations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              name="sort"
              defaultValue={sort}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
            >
              <option value="latest">Latest Doctors</option>
              <option value="fee-low">Fee: Low to High</option>
              <option value="fee-high">Fee: High to Low</option>
              <option value="experience">Most Experienced</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-7 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              Search Doctors
            </button>

            <Link
              href="/find-doctors"
              className="rounded-full border border-blue-200 px-7 py-2.5 text-center text-sm font-semibold text-blue-600 hover:bg-blue-50 transition"
            >
              Reset
            </Link>
          </div>
        </form>

        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-slate-600">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {doctors.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">
              {meta?.totalDoctors || 0}
            </span>{" "}
            doctors
          </p>

          {(search || specialization || sort !== "latest") && (
            <p className="text-sm text-blue-600">
              Active:{" "}
              {search && <span>Search = &quot;{search}&quot; </span>}
              {specialization && (
                <span>Specialization = &quot;{specialization}&quot; </span>
              )}
              {sort !== "latest" && <span>Sort = &quot;{sort}&quot;</span>}
            </p>
          )}
        </div>

        {doctors.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-white border border-slate-100 p-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              No doctors found
            </h2>

            <p className="mt-2 text-slate-500">
              Try another name, specialization, or reset the filters.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-3">
              <Link
                href={createPageLink(page - 1)}
                className={`rounded-xl border border-blue-200 px-5 py-2 text-sm font-semibold ${
                  meta?.hasPrevPage
                    ? "text-blue-600 hover:bg-blue-50"
                    : "pointer-events-none opacity-40 text-slate-400"
                }`}
              >
                Previous
              </Link>

              <span className="text-sm text-slate-600">
                Page {meta?.currentPage || 1} of {meta?.totalPages || 1}
              </span>

              <Link
                href={createPageLink(page + 1)}
                className={`rounded-xl border border-blue-200 px-5 py-2 text-sm font-semibold ${
                  meta?.hasNextPage
                    ? "text-blue-600 hover:bg-blue-50"
                    : "pointer-events-none opacity-40 text-slate-400"
                }`}
              >
                Next
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
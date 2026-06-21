"use client";

import { useEffect, useState } from "react";
import { Star, MessageSquare } from "lucide-react";

export default function HomeTestimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${baseUrl}/reviews?limit=6`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (data?.success) {
          setReviews(data?.data || []);
        }
      } catch (error) {
        console.log("Failed to load reviews", error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [baseUrl]);

  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-blue-600 font-semibold">Patient Success Stories</p>

          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
            What Patients Say About Our Doctors
          </h2>

          <p className="mt-3 text-sm md:text-base text-slate-500">
            Real feedback from patients after completing appointments with our
            verified doctors.
          </p>
        </div>

        {loading ? (
          <div className="mt-10 rounded-3xl bg-white border border-blue-100 p-6 text-center">
            <p className="text-slate-500">Loading patient reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-white border border-blue-100 p-6 text-center">
            <MessageSquare className="mx-auto text-blue-600" size={36} />
            <h3 className="mt-3 text-xl font-bold text-slate-900">
              No reviews yet
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Patient reviews will appear here after completed appointments.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {review.patientName || "Patient"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Reviewed {review.doctorName || "Doctor"}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1.5">
                    <Star size={16} className="text-yellow-600 fill-yellow-600" />
                    <span className="text-sm font-bold text-yellow-700">
                      {review.rating}/5
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-600">
                  “{review.comment}”
                </p>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-500">
                    Appointment completed with{" "}
                    <span className="font-semibold text-slate-700">
                      {review.doctorName}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
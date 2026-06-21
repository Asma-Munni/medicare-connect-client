"use client";

import { useEffect, useState } from "react";
import { Star, MessageSquare } from "lucide-react";

export default function DoctorReviews({ doctorId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadReviews = async () => {
      if (!doctorId) return;

      try {
        setLoading(true);

        const res = await fetch(`${baseUrl}/reviews/doctor/${doctorId}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (!data?.success) {
          setError(data?.message || "Failed to load reviews.");
          return;
        }

        setReviews(data?.data || []);
      } catch (error) {
        setError("Something went wrong while loading reviews.");
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [doctorId, baseUrl]);

  if (loading) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <p className="text-slate-500">Loading doctor reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-red-100 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">Unable to load reviews</h2>
        <p className="mt-2 text-sm text-red-500">{error}</p>
      </div>
    );
  }

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) /
          totalReviews
        ).toFixed(1)
      : "0.0";

  return (
    <div className="mt-6 rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-yellow-50 text-yellow-700 flex items-center justify-center">
            <MessageSquare size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Patient Reviews
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Feedback from completed appointments.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-yellow-50 px-4 py-3">
          <p className="text-sm font-semibold text-yellow-700">
            Average Rating
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {averageRating}/5
          </p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-center">
          <p className="text-sm text-slate-500">
            No review has been submitted for this doctor yet.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-2xl border border-slate-100 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {review.patientName || "Patient"}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {review.patientEmail || "No email"}
                  </p>
                </div>

                <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1.5">
                  <Star size={16} className="text-yellow-600 fill-yellow-600" />
                  <span className="text-sm font-bold text-yellow-700">
                    {review.rating}/5
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
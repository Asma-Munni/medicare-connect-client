"use client";

import { useEffect, useState } from "react";
import {
  createReview,
  getPatientReviewData,
} from "@/lib/actions/review";
import { Star, MessageSquare, CheckCircle } from "lucide-react";

export default function PatientReviewsList() {
  const [patientId, setPatientId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getPatientReviewData();

        if (!result?.success) {
          setError(result?.message || "Failed to load reviews.");
          return;
        }

        setPatientId(result?.data?.patientId || "");
        setAppointments(result?.data?.appointments || []);
        setReviews(result?.data?.reviews || []);
      } catch (error) {
        setError("Something went wrong while loading reviews.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (appointmentId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [appointmentId]: {
        ...prev[appointmentId],
        [field]: value,
      },
    }));
  };

  const handleReviewSubmit = async (appointment) => {
    const currentForm = formData[appointment._id] || {};
    const rating = currentForm.rating;
    const comment = currentForm.comment;

    if (!rating || !comment) {
      alert("Please select rating and write a comment.");
      return;
    }

    if (!patientId) {
      alert("Patient ID missing. Please reload the page.");
      return;
    }

    try {
      setActionLoading(appointment._id);

      const result = await createReview({
        appointmentId: appointment._id,
        patientId,
        doctorId: appointment.doctorId,
        rating: Number(rating),
        comment,
      });

      if (!result?.success) {
        alert(result?.message || "Failed to submit review.");
        return;
      }

      alert("Review submitted successfully.");

      if (result?.data) {
        setReviews((prev) => [result.data, ...prev]);
      }

      setFormData((prev) => ({
        ...prev,
        [appointment._id]: {
          rating: "",
          comment: "",
        },
      }));
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setActionLoading("");
    }
  };

  if (loading) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <p className="text-slate-500">Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-red-100 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">Unable to load</h2>
        <p className="mt-2 text-sm text-red-500">{error}</p>
      </div>
    );
  }

  const completedAppointments = appointments.filter(
    (appointment) => appointment.appointmentStatus === "completed"
  );

  const reviewedAppointmentIds = reviews.map((review) => review.appointmentId);

  const reviewableAppointments = completedAppointments.filter(
    (appointment) => !reviewedAppointmentIds.includes(appointment._id)
  );

  return (
    <div className="mt-6 space-y-6">
      <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-yellow-50 text-yellow-700 flex items-center justify-center">
            <Star size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Give Doctor Review
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              You can review only completed appointments.
            </p>
          </div>
        </div>

        {reviewableAppointments.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-center">
            <p className="text-sm text-slate-500">
              No completed appointment is available for review right now.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            {reviewableAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="rounded-2xl border border-slate-100 p-5"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">
                      {appointment.doctorName}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Date: {appointment.appointmentDate} at{" "}
                      {appointment.appointmentTime}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Problem: {appointment.symptoms || "Not provided"}
                    </p>

                    <span className="mt-3 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      Completed
                    </span>
                  </div>

                  <div className="w-full lg:w-[420px] space-y-3">
                    <select
                      value={formData[appointment._id]?.rating || ""}
                      onChange={(event) =>
                        handleInputChange(
                          appointment._id,
                          "rating",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
                    >
                      <option value="">Select Rating</option>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Average</option>
                      <option value="1">1 - Poor</option>
                    </select>

                    <textarea
                      value={formData[appointment._id]?.comment || ""}
                      onChange={(event) =>
                        handleInputChange(
                          appointment._id,
                          "comment",
                          event.target.value
                        )
                      }
                      rows={4}
                      placeholder="Write your experience..."
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
                    />

                    <button
                      type="button"
                      onClick={() => handleReviewSubmit(appointment)}
                      disabled={actionLoading === appointment._id}
                      className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                      {actionLoading === appointment._id
                        ? "Submitting..."
                        : "Submit Review"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <MessageSquare size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">My Reviews</h2>

            <p className="mt-1 text-sm text-slate-500">
              Reviews you already submitted.
            </p>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-center">
            <p className="text-sm text-slate-500">
              You have not submitted any review yet.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="rounded-2xl border border-slate-100 p-5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 text-green-600" size={20} />

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {review.doctorName || "Doctor"}
                    </h3>

                    <p className="mt-1 text-sm text-yellow-600 font-semibold">
                      Rating: {review.rating}/5
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
"use server";

import { revalidatePath } from "next/cache";
import { protectedFetch, serverMutation } from "../core/server";
import { getUserSession } from "../core/session";

export const getPatientReviewData = async () => {
  try {
    const user = await getUserSession();

    if (!user) {
      return {
        success: false,
        message: "Please login to manage your reviews.",
      };
    }

    const patientId = user?.id || user?._id || user?.email;

    if (!patientId) {
      return {
        success: false,
        message: "Patient ID was not found.",
      };
    }

    const appointmentResult = await protectedFetch(
      `/appointments/patient/${encodeURIComponent(patientId)}`
    );

    if (!appointmentResult?.success) {
      return {
        success: false,
        message:
          appointmentResult?.message || "Failed to load your appointments.",
      };
    }

    const reviewResult = await protectedFetch(
      `/reviews/patient/${encodeURIComponent(patientId)}`
    );

    if (!reviewResult?.success) {
      return {
        success: false,
        message: reviewResult?.message || "Failed to load your reviews.",
      };
    }

    return {
      success: true,
      data: {
        patientId,
        appointments: appointmentResult?.data || [],
        reviews: reviewResult?.data || [],
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while loading reviews.",
    };
  }
};

export const createReview = async (reviewData) => {
  const result = await serverMutation("/reviews", reviewData, "POST");

  revalidatePath("/dashboard/patient/reviews");
  revalidatePath("/find-doctors");

  if (reviewData?.doctorId) {
    revalidatePath(`/find-doctors/${reviewData.doctorId}`);
  }

  return result;
};
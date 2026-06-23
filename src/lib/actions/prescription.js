"use server";

import { revalidatePath } from "next/cache";
import { protectedFetch, serverMutation } from "../core/server";
import { getUserSession } from "../core/session";

export const getDoctorPrescriptionData = async () => {
  try {
    const user = await getUserSession();

    if (!user?.email) {
      return {
        success: false,
        message: "Please login as a doctor.",
      };
    }

    const doctorResult = await protectedFetch(
      `/doctors/email/${encodeURIComponent(user.email)}`
    );

    if (!doctorResult?.success) {
      return {
        success: false,
        message:
          doctorResult?.message || "Doctor profile not found for this account.",
      };
    }

    const doctor = doctorResult?.data;

    if (!doctor?._id) {
      return {
        success: false,
        message: "Doctor ID was not found.",
      };
    }

    const appointmentResult = await protectedFetch(
      `/appointments/doctor/${doctor._id}`
    );

    if (!appointmentResult?.success) {
      return {
        success: false,
        message: appointmentResult?.message || "Failed to load appointments.",
      };
    }

    const prescriptionResult = await protectedFetch(
      `/prescriptions/doctor/${doctor._id}`
    );

    if (!prescriptionResult?.success) {
      return {
        success: false,
        message:
          prescriptionResult?.message || "Failed to load prescriptions.",
      };
    }

    return {
      success: true,
      data: {
        doctor,
        appointments: appointmentResult?.data || [],
        prescriptions: prescriptionResult?.data || [],
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while loading prescriptions.",
    };
  }
};

export const createPrescription = async (prescriptionData) => {
  const result = await serverMutation("/prescriptions", prescriptionData, "POST");

  revalidatePath("/dashboard/doctor/prescriptions");
  revalidatePath("/dashboard/patient/prescriptions");

  return result;
};
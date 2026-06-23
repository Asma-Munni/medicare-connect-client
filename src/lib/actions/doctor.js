"use server";

import { revalidatePath } from "next/cache";
import { protectedFetch, serverMutation } from "../core/server";
import { getUserSession } from "../core/session";

export const getDoctorScheduleData = async () => {
  try {
    const user = await getUserSession();

    if (!user?.email) {
      return {
        success: false,
        message: "Please login as a doctor.",
      };
    }

    const result = await protectedFetch(
      `/doctors/email/${encodeURIComponent(user.email)}`
    );

    if (!result?.success) {
      return {
        success: false,
        message: result?.message || "Doctor profile not found for this account.",
      };
    }

    return {
      success: true,
      data: result?.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while loading doctor schedule.",
    };
  }
};

export const createDoctor = async (doctorData) => {
  const result = await serverMutation("/doctors", doctorData, "POST");

  revalidatePath("/dashboard/doctor/profile");
  revalidatePath("/find-doctors");

  return result;
};

export const updateDoctor = async (id, data) => {
  const result = await serverMutation(`/doctors/${id}`, data, "PATCH");

  revalidatePath("/dashboard/doctor/profile");
  revalidatePath("/find-doctors");
  revalidatePath(`/find-doctors/${id}`);

  return result;
};

export const updateDoctorVerification = async (id, verificationStatus) => {
  const result = await serverMutation(
    `/doctors/${id}/verification`,
    { verificationStatus },
    "PATCH"
  );

  revalidatePath("/dashboard/admin/doctors");
  revalidatePath("/find-doctors");

  return result;
};

export const updateDoctorSchedule = async (doctorId, scheduleData) => {
  const result = await serverMutation(
    `/doctors/${doctorId}/schedule`,
    scheduleData,
    "PATCH"
  );

  revalidatePath("/dashboard/doctor/schedule");
  revalidatePath("/dashboard/doctor");
  revalidatePath("/find-doctors");
  revalidatePath(`/find-doctors/${doctorId}`);

  return result;
};
"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

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
  revalidatePath("/find-doctors");
  revalidatePath(`/find-doctors/${doctorId}`);

  return result;
};
"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createAppointment = async (appointmentData) => {
  const result = await serverMutation(
    "/appointments",
    appointmentData,
    "POST"
  );

  revalidatePath("/dashboard/patient/appointments");
  revalidatePath("/dashboard/doctor/appointments");

  return result;
};



export const updateAppointmentStatus = async (id, appointmentStatus) => {
  const result = await serverMutation(
    `/appointments/${id}/status`,
    { appointmentStatus },
    "PATCH"
  );

  revalidatePath("/dashboard/patient/appointments");
  revalidatePath("/dashboard/doctor/appointments");

  return result;
};
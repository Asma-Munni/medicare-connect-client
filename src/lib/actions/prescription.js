"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createPrescription = async (prescriptionData) => {
  const result = await serverMutation("/prescriptions", prescriptionData, "POST");

  revalidatePath("/dashboard/doctor/prescriptions");
  revalidatePath("/dashboard/patient/prescriptions");

  return result;
};
"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const updateProfile = async (userId, profileData) => {
  const result = await serverMutation(
    `/users/${userId}/profile`,
    profileData,
    "PATCH"
  );

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard/patient");
  revalidatePath("/dashboard/doctor");
  revalidatePath("/dashboard/admin");

  return result;
};
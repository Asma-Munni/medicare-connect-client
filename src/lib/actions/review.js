"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createReview = async (reviewData) => {
  const result = await serverMutation("/reviews", reviewData, "POST");

  revalidatePath("/dashboard/patient/reviews");

  return result;
};
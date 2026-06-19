import { serverFetch } from "../core/server";

export const getDoctors = async ({
  search = "",
  specialization = "",
  verificationStatus = "verified",
  sortBy = "createdAt",
  order = "desc",
  page = 1,
  limit = 6,
} = {}) => {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (specialization) params.set("specialization", specialization);
  if (verificationStatus) params.set("verificationStatus", verificationStatus);

  params.set("sortBy", sortBy);
  params.set("order", order);
  params.set("page", String(page));
  params.set("limit", String(limit));

  return serverFetch(`/doctors?${params.toString()}`);
};

export const getDoctorById = async (id) => {
  return serverFetch(`/doctors/${id}`);
};
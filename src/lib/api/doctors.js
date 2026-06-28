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


export const createDoctorProfile = async (formData, token) => {
  try {
    const res = await fetch(`${baseUrl}/doctors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to create profile",
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message: error.message || "Network error",
    };
  }
};
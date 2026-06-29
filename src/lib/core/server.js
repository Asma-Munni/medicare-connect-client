import { redirect } from "next/navigation";
import { getUserToken } from "./session";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeader = async () => {
  const token = await getUserToken();

  // Development check only
  console.log("Server token:", token);

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

const handleStatusCode = async (res) => {
  let data = null;

  try {
    data = await res.json();
  } catch (error) {
    data = {
      success: false,
      message: "Invalid server response.",
    };
  }

  if (res.status === 401) {
    redirect("/auth/signin");
  }

  if (res.status === 403) {
    redirect("/unauthorized");
  }

  if (!res.ok) {
    return {
      success: false,
      message: data?.message || "Request failed.",
      status: res.status,
      data: data?.data || null,
    };
  }

  return data;
};

const buildUrl = (path) => {
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is missing.");
  }

  return `${baseUrl}${path}`;
};

export const serverFetch = async (path) => {
  const res = await fetch(buildUrl(path), {
    cache: "no-store",
  });

  return handleStatusCode(res);
};

export const protectedFetch = async (path) => {
  console.log("Server path:", path);

  const res = await fetch(buildUrl(path), {
    method: "GET",
    headers: {
      ...(await authHeader()),
    },
    cache: "no-store",
  });

  return handleStatusCode(res);
};

export const serverMutation = async (path, data, method = "POST") => {
  console.log("Server mutation path:", path);

  const res = await fetch(buildUrl(path), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  return handleStatusCode(res);
};
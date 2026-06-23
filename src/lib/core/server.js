import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const authHeader = async () =>{
  const token= await getUserToken();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {};
  return header;
}


const handleStatusCode = async (res) => {
  if (res.status === 401) {
    redirect("/auth/signin");
  }

  if (res.status === 403) {
    redirect("/unauthorized");
  }

  return res.json();
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
  });

  return handleStatusCode(res);
};

export const protectedFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      ...(await authHeader()),
    },
    cache: "no-store",
  });

  return handleStatusCode(res);
};

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
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
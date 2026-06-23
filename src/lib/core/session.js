import { authClient } from "@/lib/auth-client";
import { auth } from "../auth";
import { headers } from "next/headers";

export const getUserSession = async () => {
 const session = await auth.api.getSession({
  headers: await headers()
 })


 return session?.user || null;
};

export const getUserToken = async () =>{
 const session = await auth.api.getSession({
  headers: await headers()
 })


 return session?.session?.token || null;
};

"use server";

import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const userApi = axios.create({
  baseURL: BASE_API_URL,
});

export async function uploadProfilePic(formData: FormData) {
  const cookieStore = await cookies();
  const res = await userApi.post(`/auth/upload-picture`, formData, {
    withCredentials: true,
    headers: {
      Cookie: `token=${cookieStore.get("token")?.value};`,
      "Access-Control-Allow-Credentials": true,
    },
  });
  revalidateTag("user");

  return res.data;
}

export async function changePassword(passwordsData: {
  currPassword: string;
  confirmPassword: string;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Not authorized");

  const res = await userApi.post(`/auth/change-password`, passwordsData, {
    headers: {
      Cookie: `token=${token};`,
    },
  });

  return res.data;
}

export async function getOrders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await userApi.get(`/orders`, {
    headers: {
      Cookie: `token=${token};`,
    },
  });

  return res.data;
}

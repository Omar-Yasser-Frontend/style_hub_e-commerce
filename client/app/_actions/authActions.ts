"use server";

import axios from "axios";
import { cookies } from "next/headers";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getUser() {
  const cookieStore = await cookies();

  const res = await axios.get(`${BASE_API_URL}/auth/check-auth`, {
    headers: {
      tag: "user",
      Cookie: `token=${cookieStore.get("token")?.value};`,
      cache: "no-store",
    },
  });

  // const res = await fetch(`${BASE_API_URL}/auth/check-auth`, {
  //   headers: {
  //     tag: "user",
  //     Cookie: `token=${cookieStore.get("token")?.value};`,
  //   },
  //   next: { tags: ["user"] },
  // });

  // if (!res.ok) throw new Error("Failed to fetch user data");

  // const userData = await res.json();

  return res.data.data;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

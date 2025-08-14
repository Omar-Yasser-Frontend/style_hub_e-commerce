"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const commentApi = axios.create({
  baseURL: BASE_URL,
});

export async function createComment(
  commentRatingAndId: { productId: string; rating: number },
  formData: FormData
) {
  const cookieStore = await cookies();
  const commentData = {
    ...Object.fromEntries(formData),
    ...commentRatingAndId,
  };

  const res = await commentApi.post(`/comments`, commentData, {
    headers: {
      Cookie: `token=${cookieStore.get("token")?.value};`,
    },
  });

  return res.data;
}

export async function reavalidattingPath(path: string) {
  revalidatePath(path);
}

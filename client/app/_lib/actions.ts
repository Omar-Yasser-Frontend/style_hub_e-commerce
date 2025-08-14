"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export async function getCommentsById(productId: string) {
  const res = await fetch(`${BASE_URL}/comments/${productId}`);

  if (!res.ok) throw new Error("Failed to get comments on this product");

  const data = await res.json();

  return data;
}

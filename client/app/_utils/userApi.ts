import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function search({
  searchInput,
  abortController,
}: {
  searchInput: string;
  abortController: AbortController;
}) {
  const res = await axios.get(`${BASE_URL}/search?q=${searchInput}`, {
    signal: abortController.signal,
  });
  

  return res.data;
}

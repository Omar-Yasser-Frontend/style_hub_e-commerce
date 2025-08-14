import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export async function createIntent() {
  const res = await axios.get(`${BASE_URL}/payment/intent`, {
    withCredentials: true,
  });

  // const res = await fetch(`${BASE_URL}/payment/intent`, {
  // credentials: "include",
  // });

  return res.data;
}

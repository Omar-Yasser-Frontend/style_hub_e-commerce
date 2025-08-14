import toast from "react-hot-toast";
import { LoginType } from "../_types/login";
import axios from "axios";
import { signupType } from "../_types/signup";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const errorMessages = {
  INVALID_CREDENTIALS: "Invalid email or password.",
  NO_PASSWORD: "User uses another login functionality.",
  USER_NOT_FOUND: "User not found.",
  INVALID_CURRENT_PASSWORD: "Current password is incorrect.",
  ALREADY_ACTIVE: "You are already active.",
  PICTURE_UPDATE_FAILED: "Failed to update profile picture.",
  USER_CREATION_FAILED: "Failed to create user account.",
  NOT_AUTHORIZED: "Not authorized",
  EMAIL_EXISTS: "User already exists",
};

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

authApi.interceptors.response.use(
  (response) => response.data,
  (err) => {
    console.log(err);

    if (err.response) {
      if (err.response.data.code === "NOT_LOGGED_IN") return;
      const code = err.response.data?.code;
      const message =
        code && errorMessages[code as keyof typeof errorMessages]
          ? errorMessages[code as keyof typeof errorMessages]
          : "An unexpected error occurred.";

      toast.error(message);
    } else if (err.request) {
      toast.error("Unable to connect to the server. Please try again later.");
    } else {
      toast.error("Error while preparing the request.");
    }

    return Promise.reject(err);
  }
);

if (!BASE_API_URL) throw new Error("Missing NEXT_PUBLIC_BASE_URL env variable");

export async function getCookie() {
  const res = await authApi.get("/auth/check-auth");

  console.log(res);

  return res.data;
}

export async function loginPassword(userData: LoginType) {
  const res = await authApi.post("/auth/login", userData);
  return res;
}

export async function signup(userData: signupType) {
  const res = await authApi.post("/auth/sign-up", userData);
  return res;
}

export async function setGoogleCookie(token: string) {
  const res = await authApi.post("/auth/set-login", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}

export async function uploadProfilePic(formData: FormData) {
  const res = await authApi.post("/auth/upload-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
}

export async function changePassword(passwordsData: {
  password: string;
  currPassword: string;
  confirmPassword: string;
}) {
  const res = await authApi.post("/auth/change-password", passwordsData);
  return res;
}

export async function logout() {
  const res = await authApi.get("/auth/logout");
  return res;
}

export async function confirmAccount(code: string) {
  const res = await authApi.post("/auth/confirm-account", { code });
  return res;
}

export async function sendCode() {
  const res = await authApi.get("/auth/send-code");
  return res;
}

export async function forgotPassword(email: string) {
  const res = await authApi.post("/auth/forgot-password", { email });
  return res;
}

export async function resetPassword({
  password: newPassword,
  token: resetToken,
}: {
  password: string;
  token: string;
}) {
  const res = await authApi.post("/auth/reset-password", {
    newPassword,
    resetToken,
  });
  return res;
}

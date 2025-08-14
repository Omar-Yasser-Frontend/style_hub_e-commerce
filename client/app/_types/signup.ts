import z from "zod";
import { passwordRegex } from "../constants";

const schema = z
  .object({
    firstName: z.string().trim().min(3, "Name must be at least 3 characters"),
    lastName: z.string().trim().min(3, "Name must be at least 3 characters"),
    email: z
      .string()
      .trim()
      .min(1, "Email is too short")
      .max(100, "Email is too long")
      .email("Invalid email"),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .max(75, "Password is too long")
      .regex(passwordRegex),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password confirmation should be like password",
    path: ["confirmPassword"],
  });

type signupType = z.infer<typeof schema> & { name?: string };

export default schema;
export { type signupType };

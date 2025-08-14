import { z } from "zod";
import { passwordRegex } from "../constants";

const loginSchema = z.object({
  email: z
    .string({ message: "Email must be a string" })
    .min(1, { message: "Email is required" })
    .max(100, "Email is too long")
    .email("Invalid email"),
  password: z
    .string({ message: "Password must be string" })
    .min(8, { message: "Password must contain 8 letters or more" })
    .max(100, "Password is too long")
    .regex(passwordRegex, {
      message:
        "Password Must Include at least 8 letters includes capital and small letter, numbers and special characters",
    }),
});

type LoginType = z.infer<typeof loginSchema>;

export default loginSchema;
export type { LoginType };

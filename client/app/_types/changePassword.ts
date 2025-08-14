import z from "zod";
import { passwordRegex } from "../constants";

const changePswrd = z
  .object({
    currPassword: z
      .string()
      .min(8, "Password Should be at least 8 letters")
      .max(75, "Password is too long")
      .regex(
        passwordRegex,
        "Password Must Include at least 8 letters includes capital and small letter, numbers and special characters"
      ),
    password: z
      .string()
      .min(8, "Password Should be at least 8 letters")
      .max(75, "Password is too long")
      .regex(
        passwordRegex,
        "Password Must Include at least 8 letters includes capital and small letter, numbers and special characters,"
      ),
    confirmPassword: z
      .string()
      .min(8, "Password Should be at least 8 letters")
      .max(75, "Password is too long")
      .regex(
        passwordRegex,
        "Password Must includes capital and small letter, numbers and special characters,"
      ),
  })
  .refine(
    (form) => form.password === form.confirmPassword,
    "Confirm password should match new password"
  );

type changepswrdType = z.infer<typeof changePswrd>;

export default changePswrd;
export { type changepswrdType };

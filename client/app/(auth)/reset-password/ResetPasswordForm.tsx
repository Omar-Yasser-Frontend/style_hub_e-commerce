"use client";

import FormInput from "@/app/_components/FormInput";
import SubmitButton from "@/app/_components/SubmitButton";
import { passwordRegex } from "@/app/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import useResetPassword from "./useResetPassword";

const formValidation = z
  .object({
    password: z
      .string()
      .min(8, "password must at 8 letters")
      .max(75, "Password is too long")
      .regex(
        passwordRegex,
        "password must include letters, numbers and special characters"
      ),
    confirmPassword: z
      .string()
      .min(8, "password must at 8 letters")
      .max(75, "Password is too long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Confirm password should be the same as password",
  });

type FormType = z.infer<typeof formValidation>;

function ResetPasswordForm() {
  // need to add suspense
  const searchParams = useSearchParams();
  const router = useRouter();
  const { resetPassword, isPending } = useResetPassword();
  const token = searchParams.get("token");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>({
    mode: "all",
    resolver: zodResolver(formValidation),
  });

  useEffect(() => {
    if (!token) router.replace("/");
  }, [router, token]);

  return (
    <form
      onSubmit={handleSubmit((data) =>
        resetPassword({ token: token as string, password: data.password })
      )}
    >
      <FormInput
        register={register("password")}
        label="Password"
        id="password"
        type="password"
        error={errors.password?.message}
      />

      <FormInput
        register={register("confirmPassword")}
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        error={errors.confirmPassword?.message}
      />

      <SubmitButton isPending={isPending} disabled={isPending}>
        Change Password
      </SubmitButton>
    </form>
  );
}

export default ResetPasswordForm;

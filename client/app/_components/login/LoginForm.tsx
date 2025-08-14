"use client";

import FormInput from "../FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema, { LoginType } from "@/app/_types/login";
import useLoginPassword from "@/app/_hooks/useLoginPassword";
import SubmitButton from "../SubmitButton";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });
  const { loginPassword, isPending } = useLoginPassword();

  function submitHandler(data: LoginType) {
    loginPassword(data);
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <FormInput
        label="Email Address"
        id="email"
        register={register("email")}
        error={errors?.email?.message}
      />

      <FormInput
        label="Password"
        type="password"
        id="password"
        register={register("password")}
        error={errors.password?.message}
      />

      <SubmitButton isPending={isPending}>Login</SubmitButton>
    </form>
  );
}

export default LoginForm;

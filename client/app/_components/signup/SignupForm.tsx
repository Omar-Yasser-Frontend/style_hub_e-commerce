"use client";

import FormInput from "../FormInput";
import { useForm } from "react-hook-form";
import schema, { signupType } from "@/app/_types/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignup from "@/app/_hooks/useSignup";
import SubmitButton from "../SubmitButton";

function SignupForm() {
  const { signup, isPending } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupType>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: signupType) =>
    signup({ ...data, name: `${data.firstName} ${data.lastName}` });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="First Name"
          id="firstName"
          register={register("firstName")}
          error={errors.firstName?.message}
        />

        <FormInput
          label="Last Name"
          id="lastName"
          register={register("lastName")}
          error={errors.lastName?.message}
        />
      </div>

      <FormInput
        id="email"
        label="Email Address"
        register={register("email")}
        error={errors.email?.message}
      />

      <FormInput
        id="password"
        label="Password"
        register={register("password")}
        type="password"
        error={errors.password?.message}
      />

      <FormInput
        id="confirmPassword"
        label="Confirm Password"
        register={register("confirmPassword")}
        type="password"
        error={errors.confirmPassword?.message}
      />

      <SubmitButton isPending={isPending}>Sign Up</SubmitButton>
    </form>
  );
}

export default SignupForm;

"use client";

import { useForm } from "react-hook-form";
import FormInput from "../../FormInput";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../../SubmitButton";
import useForgotPassword from "@/app/_hooks/useForgotPassword";

const formSchema = z.object({
  email: z
    .string({ message: "Email must be a string" })
    .min(1, { message: "Email is required" })
    .max(100, "Email is too long")
    .email("Invalid email"),
});

type formType = z.infer<typeof formSchema>;

function ForgotPasswordForm() {
  const { forgotPassword, isPending } = useForgotPassword();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all", resolver: zodResolver(formSchema) });

  function onSubmit(data: formType) {
    console.log("Submitting...");
    forgotPassword(data.email);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        register={register("email")}
        id="email"
        label="Email"
        error={errors.email?.message}
      />
      <SubmitButton isPending={isPending}>Reset Password</SubmitButton>
    </form>
  );
}

export default ForgotPasswordForm;

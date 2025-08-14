"use client";

import FormInput from "../../_components/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useConfirmation from "@/app/_hooks/useConfirmation";
import useSendCode from "@/app/_hooks/useSendCode";
import AuthHeader from "@/app/_components/auth/AuthHeader";

const confirmationSchema = z.object({
  code: z
    .string()
    .min(1, "Confirmation code is required")
    .max(6, "Code must be 6 digits")
    .refine((code) => !isNaN(Number(code)), "Code must be numbers only"),
});

type ConfirmationType = z.infer<typeof confirmationSchema>;

function ConfirmationPage() {
  const { sendCode, isPending: isPendingCode } = useSendCode();
  const { confirmAccount, isPending, isError } = useConfirmation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmationType>({
    resolver: zodResolver(confirmationSchema),
    mode: "all",
  });

  const onSubmit = (data: ConfirmationType) => confirmAccount(data.code);

  return (
    <>
      <AuthHeader message="Active Your Account" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {isError && (
          <p className="text-sm text-red-500 my-4 font-semibold">
            Failed to confirm account
          </p>
        )}
        <FormInput
          label="Confirmation Code"
          id="code"
          register={register("code")}
          error={errors?.code?.message}
          maxlength={6}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-burgundy text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors mt-6 cursor-pointer"
        >
          Confirm
        </button>
      </form>

      <button
        onClick={(e) => {
          e.preventDefault();
          sendCode();
        }}
        disabled={isPendingCode}
        className={`my-4 cursor-pointer ${
          isPendingCode ? "text-blue-300" : "text-blue-600"
        }`}
      >
        {isPendingCode ? "Sending..." : "Send code?"}
      </button>
    </>
  );
}

export default ConfirmationPage;

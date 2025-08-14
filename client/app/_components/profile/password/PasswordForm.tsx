import { changePassword } from "@/app/_actions/userActions";
import changePswrd, { changepswrdType } from "@/app/_types/changePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormInput from "../../FormInput";
import LoadingSpinnerMini from "../../LoadingSpinnerMini";
import { AxiosError } from "axios";

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

function PasswordForm() {
  const [status, setStatus] = useState("idle");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<changepswrdType>({
    resolver: zodResolver(changePswrd),
    mode: "all",
  });

  return (
    <section className="p-6">
      <form
        onSubmit={handleSubmit(async (data: changepswrdType) => {
          try {
            setStatus("loading");
            await changePassword(data);
            toast.success("Password Changed Successfully");
          } catch (err) {
            const axiosError = err as AxiosError<{ code: string }>;
            toast.error(
              errorMessages[
                axiosError.response?.data?.code as keyof typeof errorMessages
              ] || "Something went wrong"
            );
          } finally {
            setStatus("idle");
          }
        })}
        className="max-w-lg mx-auto bg-white rounded-xl shadow flex flex-col gap-6 p-6"
      >
        <h2 className="text-xl font-bold mb-2">Change Password</h2>
        <div>
          <FormInput
            id="currPassword"
            type="password"
            label="Current Password"
            register={register("currPassword")}
            error={errors.currPassword?.message}
          />
        </div>
        <div>
          <FormInput
            id="password"
            type="password"
            label="New Password"
            register={register("password")}
            error={errors.password?.message}
          />
        </div>
        <div>
          <FormInput
            id="confirmPassword"
            type="password"
            label="Confirm New Password"
            register={register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>
        {/* <SubmitFormBtn message="Change Password" /> */}
        <button
          type="submit"
          className="py-3 px-5 text-white bg-accent rounded-lg hover:contrast-80 font-semibold mt-2"
        >
          {status === "idle" ? "Change Password" : <LoadingSpinnerMini />}
        </button>
      </form>
    </section>
  );
}

export default PasswordForm;

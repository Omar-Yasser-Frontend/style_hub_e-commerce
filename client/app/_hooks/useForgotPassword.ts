import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../_utils/authApi";
import toast from "react-hot-toast";

function useForgotPassword() {
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {
      toast.success(
        "reset code successfully please check your email for magic link"
      );
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
      console.log(err.name);
      console.log(err.cause);
    },
  });

  return { forgotPassword, isPending };
}

export default useForgotPassword;

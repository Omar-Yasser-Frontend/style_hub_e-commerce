import { useMutation } from "@tanstack/react-query";
import { sendCode as sendCodeApi } from "../_utils/authApi";
import toast from "react-hot-toast";

function useSendCode() {
  const { mutate: sendCode, isPending } = useMutation({
    mutationFn: sendCodeApi,
    onSuccess: () => toast.success("Code updated"),
    onError: () => toast.error("Failed create new code"),
  });

  return { sendCode, isPending };
}
export default useSendCode;

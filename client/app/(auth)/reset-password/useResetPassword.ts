import { resetPassword as resetPasswordApi } from "@/app/_utils/authApi";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function useResetPassword() {
  const router = useRouter();
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success("Password changed successfully");
      router.push("/login");
    },
    onError: () => {
      toast.error("Failed to Change password");
    },
  });

  return { resetPassword, isPending };
}

export default useResetPassword;

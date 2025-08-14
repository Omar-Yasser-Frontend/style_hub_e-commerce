import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginPassword as loginPasswordApi } from "../_utils/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function useLoginPassword() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isPending, mutate: loginPassword } = useMutation({
    mutationFn: loginPasswordApi,
    onSuccess: () => {
      toast.success("Login Success");
      router.push("/");
      queryClient.invalidateQueries();
    },
  });

  return { isPending, loginPassword };
}

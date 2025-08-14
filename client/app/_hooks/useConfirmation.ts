import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmAccount as confirmAccountApi } from "../_utils/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function useConfirmation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const {
    mutate: confirmAccount,
    isPending,
    isError,
  } = useMutation({
    mutationFn: confirmAccountApi,
    onSuccess: () => {
      toast.success("Account confirmed successfully");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { confirmAccount, isPending, isError };
}

export default useConfirmation;

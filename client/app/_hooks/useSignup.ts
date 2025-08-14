import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../_utils/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function useSignup() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,

    onSuccess: () => {
      router.push("/confirmation");
      toast.success(
        "Account created successfully please enter confirm code to activate accound"
      );
      queryClient.invalidateQueries();
    },
  });

  return { signup, isPending };
}

export default useSignup;

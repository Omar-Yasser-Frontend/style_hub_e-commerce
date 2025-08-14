import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setGoogleCookie } from "../_utils/authApi";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

function useGoogleLogin() {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();
  const {
    mutate: googleLogin,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: setGoogleCookie,

    onError: () => {
      toast.error("Failed to login using Google");
    },
    onSuccess: () => {
      toast.success("Login successfully");
      queryClient.invalidateQueries();
      console.log(pathname);
      router.push("/");
    },
  });

  console.log(isError);
  console.log(error);

  return {
    googleLogin,
    isPending,
    isError,
    error,
  };
}

export default useGoogleLogin;

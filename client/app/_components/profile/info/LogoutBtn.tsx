"use client";

import { logout } from "@/app/_actions/authActions";
import SubmitFormBtn from "@/app/products/details/[productId]/SubmitFormBtn";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function LogoutBtn() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return (
    <form
      action={async () => {
        try {
          await logout();
          queryClient.invalidateQueries({ queryKey: ["user"] });
          toast.success("Logout Successfully");
          router.push("/");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          toast.error("Failed to logout");
        }
      }}
      className="mt-8 ml-auto w-fit"
    >
      <SubmitFormBtn message="Logout" />
    </form>
  );
}

export default LogoutBtn;

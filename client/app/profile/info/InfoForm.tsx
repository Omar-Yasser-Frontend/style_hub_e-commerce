"use client";

import { uploadProfilePic } from "@/app/_actions/userActions";
import LogoutBtn from "@/app/_components/profile/info/LogoutBtn";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

export default function InfoForm({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  // const { user, isPending, isError, error } = useGetUser();
  // const { uploadingPic, isPending: isPendingUploading } = useUploadProfilePic();
  // const [isHydrated, setIsHydrated] = useState(false);

  // useEffect(() => {
  //   if (!isHydrated) setIsHydrated(true);
  // }, [isHydrated]);

  // if (isPending || !isHydrated) return <div>Loading...</div>;
  // if (isError) return <div>Error: {error?.message}</div>;

  return (
    <section className="max-w-lg mx-auto bg-white rounded-xl shadow p-6">
      <form
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   if (!imageFileRef.current || isPendingUploading) return;

        //   const formData = new FormData();
        //   formData.append("profilePic", imageFileRef.current);
        //   uploadingPic(formData);
        // }}
        action={async (formData: FormData) => {
          try {
            await uploadProfilePic(formData);
            toast.success("Profile picture updated");
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["user"] });
          } catch (err) {
            const error = err as AxiosError<{ code: string }>;
            toast.error(
              errorMessages[
                error.response?.data?.code as keyof typeof errorMessages
              ] || "Something went wrong"
            );
          }
        }}
        // encType="multipart/form-data"
        className="flex flex-col gap-6"
      >
        {children}
      </form>
      <LogoutBtn />
    </section>
  );
}

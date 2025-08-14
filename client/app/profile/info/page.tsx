import { getUser } from "@/app/_actions/authActions";
import ImagePreview from "./ImagePreview";
import InfoForm from "./InfoForm";
import SubmitFormBtn from "@/app/products/details/[productId]/SubmitFormBtn";
import ErrorMessage from "@/app/_components/ErrorMessage";
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

async function page() {
  try {
    const user = await getUser();

    return (
      <InfoForm>
        <h2 className="text-xl font-bold mb-2">Profile Information</h2>
        {/* User Image */}
        <div className="flex items-center gap-4">
          <ImagePreview userImage={user.image} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>
        <SubmitFormBtn message="Save Changes" />
      </InfoForm>
    );
  } catch (err) {
    const error = err as AxiosError<{ code: string }>;
    return (
      <ErrorMessage
        message={
          errorMessages[
            error.response?.data?.code as keyof typeof errorMessages
          ]
        }
      />
    );
  }
}

export default page;

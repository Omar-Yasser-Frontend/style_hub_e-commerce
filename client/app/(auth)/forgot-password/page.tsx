import AuthHeader from "@/app/_components/auth/AuthHeader";
import ForgotPasswordForm from "@/app/_components/auth/forgot-password/ForgotPasswordForm";

function page() {
  return (
    <>
      <AuthHeader message="Forgot Your Password?" />

      <ForgotPasswordForm />
    </>
  );
}

export default page;

import LoginForm from "@/app/_components/login/LoginForm";
import Link from "next/link";
import ForgotPassword from "../../ForgotPassword";

function LoginPage() {
  return (
    <>
      <LoginForm />

      <ForgotPassword />

      <div className="text-center mt-6">
        <p className="text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-burgundy hover:text-accent font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}

export default LoginPage;

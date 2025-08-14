"use client";

import SignupForm from "@/app/_components/signup/SignupForm";
import Link from "next/link";
import ForgotPassword from "../../ForgotPassword";

function SignInPage() {
  return (
    <>
      {/* Sign Up Form */}
      <SignupForm />

      <ForgotPassword />

      {/* Login Link */}
      <div className="text-center mt-6">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-burgundy hover:text-accent font-medium transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignInPage;

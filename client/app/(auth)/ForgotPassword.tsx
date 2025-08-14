import Link from "next/link";

function ForgotPassword() {
  return (
    <Link href={"/forgot-password"} className="text-blue-600 text-sm mt-3">
      Forgot Password?
    </Link>
  );
}

export default ForgotPassword;

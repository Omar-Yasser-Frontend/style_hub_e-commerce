import AuthHeader from "@/app/_components/auth/AuthHeader";
import GoogleLoginBtn from "@/app/_components/login/GoogleLoginBtn";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthHeader message="Create your account" />

      <GoogleLoginBtn />

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500 font-medium">OR</span>
        </div>
      </div>
      {children}
    </>
  );
}

export default layout;

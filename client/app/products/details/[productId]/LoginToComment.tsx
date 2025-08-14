import PrimaryBtn from "@/app/_components/PrimaryBtn";

function LoginToComment() {
  return (
    <div className="mt-6 flex flex-col items-start">
      <span className="text-gray-500 mb-2">
        You can only comment if you are logged in.
      </span>
      <PrimaryBtn href="/auth/login">Login to Comment</PrimaryBtn>
    </div>
  );
}

export default LoginToComment;

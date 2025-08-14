"use client";

import LoadingSpinnerMini from "@/app/_components/LoadingSpinnerMini";
import { useFormStatus } from "react-dom";

function SubmitFormBtn({ message = "Post Comment" }: { message?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="py-3 px-5 text-white bg-accent rounded-lg cursor-pointer hover:contrast-80 font-semibold"
    >
      {pending ? <LoadingSpinnerMini invert={false} /> : message}
      {/* Post Comment */}
    </button>
  );
}

export default SubmitFormBtn;

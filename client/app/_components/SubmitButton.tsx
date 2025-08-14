"use client";

import LoadingSpinnerMini from "./LoadingSpinnerMini";

interface SubmitButtonProps {
  isPending: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

function SubmitButton({
  isPending,
  children,
  className,
  disabled = false,
}: SubmitButtonProps) {
  const styles =
    "w-full bg-burgundy text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors mt-6 cursor-pointer";
  return (
    <button
      type="submit"
      className={`${styles} ${className ? className : ""}`}
      disabled={disabled || isPending}
    >
      {isPending ? <LoadingSpinnerMini invert={false} /> : children}
    </button>
  );
}

export default SubmitButton;

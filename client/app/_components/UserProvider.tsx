"use client";

import useGetUser from "../_hooks/useGetUser";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import useSendCode from "../_hooks/useSendCode";

function UserProvider({ children }: { children: React.ReactNode }) {
  const { user } = useGetUser();
  const { sendCode } = useSendCode();
  const pathname = usePathname();
  const router = useRouter();

  if (!user || pathname === "/confirmation") return children;

  return (
    <>
      {children}
      {!user?.isActive &&
        createPortal(
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-amber-100 p-6 z-50 rounded-xl sm:w-auto w-[90vw]">
            <span>User account not active yet, please</span>{" "}
            <button
              onClick={() => {
                router.push("/confirmation");
                sendCode();
              }}
              className="text-blue-600"
            >
              confirm account
            </button>
            .
          </div>,
          document.body
        )}
    </>
  );
}

export default UserProvider;

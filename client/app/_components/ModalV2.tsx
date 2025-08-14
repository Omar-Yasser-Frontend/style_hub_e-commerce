"use client";

import { AiOutlineClose } from "react-icons/ai";
import useOutsideClick from "../_hooks/useOutsideClick";

function ModalV2({
  children,
  dir = "center",
  close = () => console.log("closing..."),
}: {
  children: React.ReactNode;
  dir?: "center" | "to-right";
  close: () => void;
}) {
  const ref = useOutsideClick(close);

  return (
    <div
      className={`fixed inset-0 flex z-[1000] ${
        dir === "center"
          ? "items-center justify-center bg-[#ffffff73]"
          : "items-stretch justify-end bg-[#00000073]"
      }`}
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="bg-white relative min-w-[250px]"
      >
        {children}
      </div>
    </div>
  );
}

ModalV2.Close = function Close({
  close,
  absolute,
  className,
}: {
  close: () => void;
  absolute?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex ${className} ${
        absolute ? "absolute top-0 right-0" : ""
      }`}
    >
      <button
        onClick={() => close()}
        className={`w-10 h-10 ml-auto border-burgundy text-burgundy border-2 flex items-center justify-center rounded-full cursor-pointer bg-white ${
          absolute ? "" : ""
        }`}
      >
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default ModalV2;

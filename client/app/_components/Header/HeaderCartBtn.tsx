"use client";

import { CgShoppingBag } from "react-icons/cg";
import NavBtn from "./NavBtn";
import useCart from "@/app/_hooks/useCart";

function HeaderCartBtn() {
  const { cart } = useCart();

  return (
    <NavBtn href="/cart" className="relative">
      {cart?.length ? (
        <div className="absolute w-5 aspect-square flex items-center justify-center text-white rounded-full top-1 right-1 -translate-y-1/2 translate-x-1/2 bg-red-600 text-xs">
          {cart.length}
        </div>
      ) : null}
      <CgShoppingBag className="text-base sm:text-lg" />
    </NavBtn>
  );
}

export default HeaderCartBtn;

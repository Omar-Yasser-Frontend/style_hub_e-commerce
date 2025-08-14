"use client";

import { FaShoppingCart } from "react-icons/fa";
import useCart from "../_hooks/useCart";
import { Cart, CartAction } from "../_types/cart";
import LoadingSpinnerMini from "./LoadingSpinnerMini";
import { useEffect, useState } from "react";

type CartHookType = {
  cart: Cart;
  dispatch: (action: CartAction) => void;
  isPending?: boolean;
};

function AddToCart({ id, price }: { id: number; price: number }) {
  const { cart, dispatch, isPending }: CartHookType = useCart();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Prevent hydration mismatch by not rendering until after hydration
  if (!isHydrated) {
    return (
      <div className="mt-auto w-full flex items-center justify-center py-2 min-h-9">
        <LoadingSpinnerMini />
      </div>
    );
  }

  // Show loading state while cart data is being fetched
  if (isPending || cart === undefined) {
    return (
      <div className="mt-auto w-full flex items-center justify-center py-2 min-h-9">
        <LoadingSpinnerMini />
      </div>
    );
  }

  const currItem = cart?.find((item) => item.id === id);
  const quantityBtnStyle =
    "w-10 bg-accent hover:bg-accent/90 cursor-pointer text-white rounded-full aspect-square relative";

  const updateQuantity = (action: "+" | "-", quantity: number) => {
    if (!currItem) return;
    if (action === "-" && currItem?.quantity - quantity <= 0) {
      return dispatch({ type: "delete", payload: { id } });
    }
    return action === "+"
      ? dispatch({
          type: "update",
          payload: {
            id,
            price,
            quantity: currItem?.quantity + quantity,
          },
        })
      : dispatch({
          type: "update",
          payload: {
            id,
            price,
            quantity: currItem?.quantity - quantity,
          },
        });
  };

  if (currItem) {
    return (
      <div className="mt-auto w-full flex items-center justify-between gap-2 py-2 min-h-9">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            updateQuantity("-", 1);
          }}
          className={quantityBtnStyle}
        >
          -
        </button>
        <span>{currItem.quantity}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            updateQuantity("+", 1);
          }}
          className={quantityBtnStyle}
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        dispatch({ type: "create", payload: { id, price, quantity: 1 } });
      }}
      className="mt-auto w-full flex items-center justify-center gap-2 py-2 rounded bg-accent text-white font-semibold shadow hover:bg-accent/90 transition-all text-sm justify-self-end align-self-end cursor-pointer min-h-9 px-4"
    >
      <FaShoppingCart className="text-base" />
      <span>Add to Cart</span>
    </button>
  );
}

export default AddToCart;

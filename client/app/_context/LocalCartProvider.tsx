"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { type Cart, type Product, CartAction } from "../_types/cart";

type CartContextType = {
  cart: Cart;
  dispatch: React.Dispatch<CartAction>;
};

const context = createContext<CartContextType | undefined>(undefined);

const initialState: Cart = [];

function reducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "create":
      return [...state, action.payload];
    case "delete":
      return state.filter((product) => product.id !== action.payload.id);
    case "update":
      return state.map((product: Product) =>
        product.id === action.payload.id
          ? { ...product, ...action.payload }
          : product
      );
    default:
      return state;
  }
}

function LocalCartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <context.Provider value={{ cart: state, dispatch }}>
      {children}
    </context.Provider>
  );
}

export function useLocalCart() {
  const localCartContext = useContext(context);

  if (localCartContext === undefined)
    throw new Error("Hook used out side it's context");

  return localCartContext;
}

export default LocalCartProvider;

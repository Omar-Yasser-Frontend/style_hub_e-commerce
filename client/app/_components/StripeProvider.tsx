"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useIntent from "../_hooks/useIntent";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET as string
);

const errorMessage = {
  EMPTY_CART: "Your cart is empty.",
};

function StripeProvider({ children }: { children: React.ReactNode }) {
  const { data, isError, isPending, error } = useIntent();

  if (isPending) return <LoadingSpinner />;

  if (isError)
    return (
      <ErrorMessage
        message={
          errorMessage[
            (error as { response?: { data?: { code?: string } } })?.response
              ?.data?.code as keyof typeof errorMessage
          ] || "Something went wrong"
        }
      />
    );

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: data.client_secret }}
    >
      {children}
    </Elements>
  );
}

export default StripeProvider;

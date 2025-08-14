"use client";

import SectionHeading from "../_components/SectionHeading";
import StripeProvider from "../_components/StripeProvider";
import CheckoutForm from "./CheckoutForm";

function CheckoutPage() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center py-8 px-4 bg-soft-bg">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mt-2">
          <SectionHeading>Checkout</SectionHeading>
          <StripeProvider>
            <CheckoutForm />
          </StripeProvider>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import CartOrderInfo from "../_components/cart/CartOrderInfo";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://localhost:3000",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      <div className="mt-6">
        <CartOrderInfo />
      </div>

      <button
        type="submit"
        className="py-3 px-5 text-white bg-accent rounded-lg cursor-pointer hover:contrast-80 flex items-center gap-3 mt-6 w-full justify-center text-lg font-semibold transition-all duration-200"
      >
        Submit
      </button>
    </form>
  );
}

export default CheckoutForm;

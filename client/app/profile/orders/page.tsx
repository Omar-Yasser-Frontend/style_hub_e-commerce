import { getOrders } from "@/app/_actions/userActions";
import ErrorMessage from "@/app/_components/ErrorMessage";
import OrderCard from "@/app/_components/profile/order/OrderCard";
import { AxiosError } from "axios";

const errorMessages = {
  INVALID_CREDENTIALS: "Invalid email or password.",
  NO_PASSWORD: "User uses another login functionality.",
  USER_NOT_FOUND: "User not found.",
  INVALID_CURRENT_PASSWORD: "Current password is incorrect.",
  ALREADY_ACTIVE: "You are already active.",
  PICTURE_UPDATE_FAILED: "Failed to update profile picture.",
  USER_CREATION_FAILED: "Failed to create user account.",
  NOT_AUTHORIZED: "Not authorized",
  EMAIL_EXISTS: "User already exists",
};

export default async function OrdersPage() {
  try {
    const orders = await getOrders();

    const ordersList = Array.isArray(orders) ? orders : [];

    return (
      <section className="bg-white p-6 shadow rounded-xl">
        <h1 className="text-3xl font-bold text-[var(--text-color)] mb-6">
          Your Orders
        </h1>
        <div className="grid gap-6 max-w-2xl mx-auto">
          {ordersList.length ? (
            ordersList.map((order, index) => (
              <OrderCard key={order._id || `order-${index}`} order={order} />
            ))
          ) : (
            <p className="w-fit mx-auto text-gray-500 py-12">No orders yet</p>
          )}
        </div>
      </section>
    );
  } catch (err) {
    const error = err as AxiosError<{ code: string }>;
    return (
      <ErrorMessage
        message={
          errorMessages[
            error.response?.data?.code as keyof typeof errorMessages
          ] || "Something went wrong"
        }
      />
    );
  }
}

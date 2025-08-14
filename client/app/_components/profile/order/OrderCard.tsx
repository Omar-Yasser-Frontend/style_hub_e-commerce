import { formatOrderDate } from "@/app/_utils/helper";

type OrderItem = {
  productId: number;
  price: number;
  quantity: number;
  title: string;
};

type Order = {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
};

const statusColors: Record<Order["status"], string> = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-teal-100 text-teal-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrderCard({ order }: { order: Order }) {
  return (
    <div className="bg-[var(--color-soft-bg)] border border-[var(--color-border)] rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColors[order.status]
          }`}
        >
          {order.status.toUpperCase()}
        </span>
        <span className="text-sm text-gray-500">
          {formatOrderDate(order.createdAt)}
        </span>
      </div>

      <div>
        <h3 className="font-bold text-[var(--color-black-txt)] mb-2">Items:</h3>
        <ul className="space-y-1 text-sm text-gray-700">
          {order.items.map((item, idx) => (
            <li
              key={`${order._id}-item-${item.productId}-${idx}`}
              className="flex justify-between"
            >
              <span>
                {item.title} x {item.quantity}
              </span>
              <span className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end">
        <span className="font-semibold text-[var(--color-accent)]">
          Total: ${order.totalAmount.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

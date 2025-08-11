// components/OrderSummaryCard.tsx
import { useState } from "react";
// import OrderDetailsModal from "./OrderDetailsModal";
import { Modal } from "./Modal";
import type { Order } from "../api/serverApi";

interface Props {
  orders: Order[] | undefined;
}

const OrderSummaryCard = ({ orders }: Props) => {
  if (!orders || orders.length === 0) return null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const sorted = [...orders].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const total = sorted.length;
  const lastDate = new Date(sorted[0].date).toLocaleDateString();
  const recent = sorted.slice(0, 3);

  return (
    <div className="bg-primary rounded-2xl shadow-md p-6 w-full max-w-2xl mt-6 border border-highlight backdrop-blur-md">
      <h2 className="text-xl font-bold text-secondary mb-4">Order Summary</h2>

      {/* Summary Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 text-sm text-muted">
        <p>
          Total Orders:{" "}
          <span className="text-accent font-semibold">{total}</span>
        </p>
        <p>
          Last Order:{" "}
          <span className="text-accent font-semibold">{lastDate}</span>
        </p>
      </div>

      {/* Recent Orders */}
      <div className="space-y-4">
        {recent.map((order) => (
          <div
            key={order._id}
            className="rounded-xl p-4 border border-highlight bg-primary bg-opacity-5 backdrop-blur-md shadow hover:shadow-lg transition-all"
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-3">
              <h3 className="text-lg font-semibold text-accent">
                Order #{order._id.slice(-5).toUpperCase()}
              </h3>
              <button
                className="text-accent text-right text-xs underline hover:opacity-80"
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedOrder(order._id);
                }}
              >
                View Details
              </button>
            </div>

            {/* Items List */}
            <ul className="text-sm text-secondary space-y-1 pl-3">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>• {item.name}</span>
                  <span className="text-muted">× {item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen} orderId={selectedOrder!} />
      )}
    </div>
  );
};

export default OrderSummaryCard;

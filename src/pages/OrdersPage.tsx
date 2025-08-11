import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useGetAllOrdersQuery } from "../api/serverApi";
import { Modal } from "../components/Modal";
import { EmptyState } from "../components/EmptyState";

const OrdersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const { user } = useAuth();
  const { data: orders, isLoading } = useGetAllOrdersQuery(user?._id);

  return (
    <div className="max-w-4xl mx-auto p-6 md:mt-10 mt-6">
      <h2 className="md:text-3xl text-2xl font-bold mb-8 text-secondary">
        My Orders
      </h2>

      {isLoading ? (
        <EmptyState
          title="Loading Orders"
          message="Please wait while we fetch your orders."
          imageSrc="/loading.jpg"
        />
      ) : orders?.length === 0 ? (
        <EmptyState
          title="No Orders Found"
          message="You haven't placed any orders yet."
          imageSrc="/empty-cart-illustration.png"
          buttonText="Shop Now"
          buttonLink="/products"
        />
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => {
            return (
              <div
                key={order._id}
                className="rounded-2xl p-5 border border-highlight bg-primary backdrop-blur-md shadow-lg transition-all hover:shadow-xl"
              >
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="text-md md:text-lg font-semibold text-accent">
                      Order #{order._id.slice(-5).toUpperCase()}
                    </h3>
                  </div>
                </div>

                <ul className="text-sm text-secondary space-y-1 pl-2">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      • <span className="font-medium">{item.name}</span> ×{" "}
                      {item.quantity}
                    </li>
                  ))}
                </ul>

                <button
                  className="mt-2 inline-block text-accent text-xs underline hover:opacity-80"
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedOrder(order._id);
                  }}
                >
                  View Order Details
                </button>
              </div>
            );
          })}
        </div>
      )}

      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen} orderId={selectedOrder!} />
      )}
    </div>
  );
};

export default OrdersPage;

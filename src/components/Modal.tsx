import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import * as ReactDOM from "react-dom";
import { useGetOrderQuery } from "../api/serverApi";

interface AddModalProps {
  setIsOpen: (value: boolean) => void;
  orderId: string;
}

export const Modal: React.FC<AddModalProps> = ({ setIsOpen, orderId }) => {
  const { data: order, isLoading } = useGetOrderQuery(orderId);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  if (isLoading) return <div></div>;

  const total = order?.items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />

      {/* Modal */}
      <div
        className="fixed z-60 top-1/2 left-1/2 w-[95%] max-w-sm sm:max-w-md 
               -translate-x-1/2 -translate-y-1/2
               bg-primary border border-muted
               rounded-xl shadow-xl p-4 sm:p-6"
      >
        {/* Close Button */}
        <button
          title="Close"
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-muted hover:text-secondary transition"
        >
          <AiOutlineClose size={20} />
        </button>

        {/* Title */}
        <div className="text-lg sm:text-xl font-semibold text-secondary mb-4">
          Order #{order?._id.slice(-6).toUpperCase()}
        </div>

        {/* Content */}
        <div>
          <div className="space-y-4">
            {order?.items?.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center gap-4">
                <img
                  src={item.productId?.image}
                  alt={item.productId?.name}
                  className="w-16 h-16 rounded border border-muted object-cover"
                />
                <div>
                  <h4 className="font-medium text-secondary">
                    {item.productId?.name}
                  </h4>
                  <p className="text-sm text-muted">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex justify-between pt-4 border-t border-muted font-semibold text-secondary">
              <span>Total:</span>
              <span>₹{total?.toFixed(0)}</span>
            </div>

            <div className="text-sm text-muted pt-2">
              Ordered on: {/* fix ts error */}
              {order?.date
                ? new Date(order.date).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.querySelector(".portalModalDiv") as HTMLDivElement
  );
};

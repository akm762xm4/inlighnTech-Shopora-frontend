import { useCart } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

const FloatingCheckoutButton = () => {
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isHidden = location.pathname === "/cart" || totalQty === 0;
  if (isHidden) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={() => navigate("/cart")}
        className="flex items-center gap-3 px-6 py-3 rounded-full 
               bg-primary/80 backdrop-blur-md
               shadow-[0_4px_30px_rgba(0,0,0,0.1)] 
               border border-muted
               text-secondary
               transition-all hover:scale-105 hover:shadow-xl"
      >
        <span className="font-semibold text-sm">View Cart</span>
        <span className="bg-accent text-primary px-3 py-1 rounded-full font-bold text-xs shadow-sm">
          ₹{totalAmount.toFixed(0)}
        </span>
      </button>
    </div>
  );
};

export default FloatingCheckoutButton;

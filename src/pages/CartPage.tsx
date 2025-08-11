import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { toast } from "sonner";
import { useCreateOrderMutation } from "../api/serverApi";

const CartPage = () => {
  const [createOrder] = useCreateOrderMutation();
  const { cart, updateQty, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!user) {
      toast("Please log in to place an order.");
      return;
    }

    try {
      const orderItems = cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      await createOrder({
        items: orderItems,
        userId: user._id,
      });

      toast.success("Order placed successfully!");
      clearCart();
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong while placing the order.");
    }
  };

  if (cart.length === 0)
    return (
      <EmptyState
        title="Your cart is empty"
        message="Looks like you haven’t added anything to your cart yet. Browse products and find something you'll love!"
        imageSrc="/empty-cart-illustration.png"
        buttonText="Explore Products"
        buttonLink="/"
      />
    );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 md:py-10 py-6">
      <h2 className="md:text-3xl text-2xl font-bold mb-8 text-secondary">
        Your Shopping Cart
      </h2>

      <ul className="space-y-6">
        {cart.map((item) => (
          <li
            key={item._id}
            className="flex flex-col sm:flex-row gap-4 bg-primary border border-highlight rounded-3xl p-5 shadow-sm backdrop-blur-sm"
          >
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full sm:w-28 sm:h-28 h-48 object-cover rounded-2xl border border-highlight"
            />

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between">
              {/* Name + Price */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <h3 className="text-lg sm:text-xl font-semibold text-secondary">
                  {item.name}
                </h3>
                <p className="text-lg font-bold text-accent">₹{item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={() => updateQty(item._id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                  className="w-10 h-10 rounded-full border border-highlight text-xl font-bold hover:bg-accent hover:text-white disabled:opacity-50 transition"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQty(item._id, item.quantity + 1)}
                  className="w-10 h-10 rounded-full border border-highlight text-xl font-bold hover:bg-accent hover:text-white transition"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 p-2 rounded-full mt-3 text-sm font-medium text-primary transition self-start"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Order Summary */}
      <div className="mt-12 border-t border-highlight pt-6 space-y-6">
        <p className="md:text-2xl text-xl font-bold text-secondary text-right">
          Total: ₹{totalPrice.toFixed(2)}
        </p>

        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-4">
          <button
            onClick={clearCart}
            className="px-5 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition w-full sm:w-auto"
          >
            Clear Cart
          </button>
          <button
            onClick={handlePlaceOrder}
            className="px-6 py-3 rounded-full bg-accent text-white font-bold hover:opacity-90 transition shadow-md w-full sm:w-auto"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

import { createContext, useContext, useState, type ReactNode } from "react";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQty: (id: string, qty: number) => void; // 👈 new
  getItemQuantity: (id: string) => number; // 👈 new
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((i) => i._id === item._id);
      if (exists) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (_id: string) => {
    setCart((prev) => prev.filter((i) => i._id !== _id));
  };

  const clearCart = () => setCart([]);

  const updateQty = (id: string, qty: number) => {
    // if (qty < 1) return; // optional: prevent 0 or negative values
    // remove from cart if quantity is 0
    if (qty <= 0) {
      removeFromCart(id);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: qty } : item
        )
      );
    }
  };
  const getItemQuantity = (id: string) => {
    const item = cart.find((i) => i._id === id);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQty,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

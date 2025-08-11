import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, MoreVertical } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="z-50 flex items-center md:px-6 px-4 py-4 rounded-3xl backdrop-blur-md bg-primary/80 shadow-lg md:mx-6 mx-3 md:mt-6 mt-4 border border-highlight">
      <div className="flex items-center md:gap-6 gap-4">
        {/* Logo */}
        <Link to="/">
          <img src="/logo.png" alt="Shopora" className="h-10" />
        </Link>

        {/* Navigation Links */}
        <Link
          to="/products"
          className="text-sm font-medium text-secondary hover:text-accent"
        >
          Products
        </Link>
      </div>

      {/* Cart + User/Login */}
      <div className="flex items-center md:gap-4 gap-2 ml-auto relative">
        <Link
          to="/cart"
          className="relative p-2 rounded-full bg-primary shadow-md hover:shadow-lg"
        >
          <ShoppingCart className="w-6 h-6 text-secondary " />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-accent text-secondary text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </Link>

        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-medium text-secondary hover:text-accent bg-highlight p-2 rounded-xl"
          >
            Login
          </button>
        ) : (
          <div className="relative" ref={menuRef}>
            <button
              title="User Menu"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-2 rounded-full hover:bg-primary"
            >
              <MoreVertical className="w-6 h-6 text-secondary" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 p-2 bg-primary shadow-lg rounded-lg border border-highlight z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  My Orders
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

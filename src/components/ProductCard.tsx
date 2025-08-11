import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";

type ProductProps = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

const ProductCard = ({ _id, name, price, image }: ProductProps) => {
  const navigate = useNavigate();
  const { addToCart, getItemQuantity, updateQty } = useCart();
  const quantity = getItemQuantity(_id);

  const handleAdd = () => {
    addToCart({ _id, name, price, image, quantity: 1 });
  };

  return (
    <div className="rounded-3xl bg-primary border border-muted shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col overflow-hidden">
      {/* Product Image */}
      <div
        className="aspect-[4/3] w-full overflow-hidden relative"
        onClick={() => navigate(`/products/${_id}`)}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between gap-2">
        {/* Name & Tagline */}
        <div onClick={() => navigate(`/products/${_id}`)}>
          <h3 className="text-base font-semibold text-secondary truncate">
            {name}
          </h3>
          <p className="text-xs text-muted">Curated Selection</p>
        </div>

        {/* Price */}
        <div className="text-lg font-bold text-accent mt-1">₹{price}</div>

        {/* Cart Controls */}
        {quantity > 0 ? (
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => updateQty(_id, quantity - 1)}
              className="w-9 h-9 flex items-center justify-center bg-highlight text-secondary rounded-full text-xl font-bold hover:opacity-90 transition"
            >
              –
            </button>
            <span className="text-secondary font-medium">{quantity}</span>
            <button
              onClick={handleAdd}
              className="w-9 h-9 flex items-center justify-center bg-accent text-secondary rounded-full text-xl font-bold hover:opacity-90 transition"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="mt-4 w-full py-2 rounded-xl bg-accent text-secondary font-medium hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

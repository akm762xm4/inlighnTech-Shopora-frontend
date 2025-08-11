import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../api/serverApi";
import { useCart } from "../context/CartContext";
import { EmptyState } from "../components/EmptyState";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProductByIdQuery(id);

  const { addToCart, updateQty, getItemQuantity } = useCart();

  if (isLoading)
    return (
      <EmptyState
        title="Loading..."
        message="Please wait while we fetch the product details."
        imageSrc="/loading.jpg"
      />
    );
  if (!product) return null;

  const quantity = getItemQuantity(product._id);
  const handleAdd = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[420px] object-cover rounded-xl shadow-md"
      />

      {/* Product Info */}
      <div className="flex flex-col justify-between">
        <div>
          {/* Title & Brand */}
          <h1 className="text-3xl font-bold text-secondary mb-2">
            {product.name}
          </h1>
          {product.brand && (
            <p className="text-sm text-muted mb-3">
              by <span className="font-medium">{product.brand}</span>
            </p>
          )}

          {/* Badges: Category, Featured, Rating */}
          <div className="flex items-center gap-3 mb-4">
            {product.category && (
              <span className="px-3 py-1 text-xs bg-highlight text-muted rounded-full">
                {product.category}
              </span>
            )}
            {product.isFeatured && (
              <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                🌟 Featured
              </span>
            )}
            {product.rating > 0 && (
              <span className="flex items-center text-sm text-muted">
                ⭐ {product.rating} ({product.numReviews})
              </span>
            )}
          </div>

          {/* Price */}
          <p className="text-accent text-2xl font-bold mb-2">
            ₹{product.price}
          </p>

          {/* Stock Info */}
          <p
            className={`mb-4 text-sm font-medium ${
              product.countInStock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.countInStock > 0
              ? `In Stock (${product.countInStock} available)`
              : "Out of Stock"}
          </p>

          {/* Description */}
          <p className="text-muted mb-6">{product.description}</p>
        </div>

        {/* Cart Actions */}
        {product.countInStock > 0 ? (
          quantity > 0 ? (
            <div className="flex items-center gap-4">
              <button
                onClick={updateQty.bind(null, product._id, quantity - 1)}
                className="bg-highlight text-secondary w-10 h-10 rounded-full font-bold text-lg"
              >
                –
              </button>
              <span className="font-semibold text-lg">{quantity}</span>
              <button
                onClick={handleAdd}
                className="bg-accent text-primary w-10 h-10 rounded-full font-bold text-lg hover:opacity-90"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="bg-accent text-primary px-6 py-2 rounded hover:opacity-90 transition"
            >
              Add to Cart
            </button>
          )
        ) : (
          <button
            disabled
            className="bg-highlight text-muted px-6 py-2 rounded cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

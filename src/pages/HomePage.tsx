import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../api/serverApi"; // Adjust this to match your actual fetch call
import ProductCard from "../components/ProductCard";
import { EmptyState } from "../components/EmptyState";

const HomePage = () => {
  const { data: products, isLoading } = useGetProductsQuery();

  // show only if products are unavailable,do not show if products are loading
  if (isLoading) {
    return (
      <EmptyState
        title="wait a moment"
        message="Loading products, please wait..."
        imageSrc="/loading.jpg"
      />
    );
  }

  return (
    <div className="p-4 md:px-12">
      {/* Hero Section */}
      <section className="bg-primary p-6 md:p-8 rounded-3xl shadow-md border border-highlight flex flex-col-reverse md:flex-row items-center gap-6 md:gap-10 mb-12">
        {/* Text Section */}
        <div className="flex-1 md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 md:mb-4 text-secondary leading-snug">
            Discover the Future of Style.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted mb-5 md:mb-6 max-w-lg mx-auto md:mx-0">
            Explore handpicked collections of premium products that match your
            lifestyle.
          </p>
          <Link
            to="/products"
            className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium rounded-xl bg-accent text-secondary hover:opacity-90 transition"
          >
            Shop Now
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex-1 w-full">
          <img
            src="/hero-product.jpg"
            alt="Hero"
            className="rounded-2xl md:rounded-3xl shadow-lg w-full object-cover h-48 sm:h-64 md:h-auto"
          />
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-secondary">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.slice(0, 8).map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

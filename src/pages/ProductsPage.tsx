import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../api/serverApi";
import { FiX } from "react-icons/fi";
import { EmptyState } from "../components/EmptyState";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  // Use API Product type for compatibility
  const [filtered, setFiltered] = useState<typeof products>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setFiltered(products ?? []);
    setCategories(
      Array.from(
        new Set(
          (products ?? [])
            .map((product) => product.category)
            .filter((c): c is string => typeof c === "string")
        )
      )
    );
  }, [products]);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    const filteredProducts = (products ?? []).filter((product) =>
      product.name.toLowerCase().includes(term)
    );
    setFiltered(filteredProducts);
  }, [searchTerm, products]);

  const handleClearSearch = () => setSearchTerm("");

  const handleSort = (sortType: string) => {
    let sorted = [...(filtered ?? [])];

    switch (sortType) {
      case "priceLowToHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort(
          (a, b) =>
            new Date((b as any).createdAt ?? 0).getTime() -
            new Date((a as any).createdAt ?? 0).getTime()
        );
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted = [...(products ?? [])];
    }

    setFiltered(sorted);
  };

  const handleFilter = (category: string) => {
    if (category === "all") {
      setFiltered(products ?? []);
    } else {
      const filteredData = (products ?? []).filter(
        (product) =>
          (product.category ?? "").toLowerCase() === category.toLowerCase()
      );
      setFiltered(filteredData);
    }
  };

  if (isLoading)
    return (
      <EmptyState
        title="Loading Products..."
        message="Please wait while we load the products."
        imageSrc="/no-data.png"
      />
    );

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* 🔎 Control Section */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Searchbar */}
        <div className="relative w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full h-12 pl-5 pr-10 rounded-full bg-primary border border-highlight shadow-sm text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {searchTerm && (
            <button
              title="Clear Search"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent"
            >
              <FiX size={18} />
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex gap-3 w-full">
          {/* Category Filter Dropdown */}
          <select
            title="Filter by category"
            onChange={(e) => handleFilter(e.target.value)}
            className="flex-1 h-10 px-4 rounded-lg border border-highlight bg-primary/80 backdrop-blur-md text-sm text-secondary shadow focus:outline-none focus:ring-2 focus:ring-accent"
            defaultValue="all"
          >
            <option value="all">All Categories</option>
            {categories
              .filter((c) => c !== "all")
              .map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
          </select>

          <select
            title="Sort products"
            onChange={(e) => handleSort(e.target.value)}
            className="flex-1 h-10 px-4 rounded-lg border border-highlight bg-primary/80 backdrop-blur-md text-sm text-secondary shadow focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">Sort by</option>
            <option value="priceLowToHigh">Price: ↑</option>
            <option value="priceHighToLow">Price: ↓</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <section>
        {(filtered?.length ?? 0) === 0 ? (
          <EmptyState
            title="No Products Found"
            message="Sorry, we couldn't find any products matching your criteria."
            imageSrc="/no-data.png"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(filtered ?? []).map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductsPage;

import React, { useState } from "react";
import ProductModal from "./ProductModal";
import { useCart } from "../context/CartContext";
import { Product } from "../types";

interface CategoryProductsDisplayProps {
  product: Product;
}

const CategoryProductsDisplay: React.FC<CategoryProductsDisplayProps> = ({ product }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { dispatch } = useCart();

  const handleAddToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <>
      <div
        className="relative overflow-hidden h-96 w-full rounded-lg group shadow-lg cursor-pointer"
        onClick={() => setModalOpen(true)}
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.imageUrl || "/placeholder.jpg"} // Catch Image
          alt={product.name || "Product image"}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-black bg-opacity-50">
          <h3 className="text-white text-2xl font-bold mb-2">{product.name}</h3>
          <p className="text-gray-200 text-sm truncate">{product.description}</p>
          <p className="text-gray-200 text-sm font-semibold mt-2">
            Price: ${product.price.toFixed(2)}
          </p>
        </div>
      </div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default CategoryProductsDisplay;


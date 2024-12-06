import React from "react";
import { Deal } from "../types";
import auth from "../utils/auth";

interface ModalProps {
    deal: Deal;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (deal: any) => void;
}

const DealModal: React.FC<ModalProps> = ({ deal, isOpen, onClose, onAddToCart }) => {
    if (!isOpen || !deal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-md shadow-lg">
                {/* Product Name */}
                <h2 className="text-2xl font-bold text-center mb-4">{deal.name}</h2>

                {/* Product Image */}
                <div className="flex justify-center mb-4">
                    <img
                        src={deal.imageUrl}
                        alt={deal.name}
                        className="w-64 h-64 object-contain rounded-md shadow-sm"
                    />
                </div>

                {/* Product Details */}
                <div className="text-gray-300">
                    <p className="mb-2">
                        <strong>Description:</strong> {deal.description}
                    </p>
                    <p className="mb-2">
                        <strong>Price:</strong> ${deal.salePrice.toFixed(2)}
                    </p>
                    <p className="mb-4">
                        <strong>Stock:</strong> {deal.stock} left
                    </p>
                </div>

                {/* Modal Buttons */}
                <div className="flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    {/* Only show add to cart if logged in. */}
                    {auth.loggedIn() ? (
                        <button
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
                            onClick={() => {
                                onAddToCart(deal);
                                onClose();
                            }}
                        >
                            Add to Cart
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DealModal;
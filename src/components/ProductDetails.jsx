import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';

const ProductDetails = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://farmdirect-production.up.railway.app/api/v1/productID/`, {
        
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.response?.data?.message || 'Failed to load product details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <p
        className="text-center text-base sm:text-lg md:text-xl text-gray-600 py-6 sm:py-8"
        aria-label="Loading product"
      >
        Loading product...
      </p>
    );
  }

  if (error) {
    return (
      <p
        className="text-center text-base sm:text-lg md:text-xl text-red-500 py-6 sm:py-8"
        aria-label="Product error"
      >
        {error}
      </p>
    );
  }

  if (!product) {
    return (
      <p
        className="text-center text-base sm:text-lg md:text-xl text-red-500 py-6 sm:py-8"
        aria-label="Product not found"
      >
        Product not found.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 min-h-[60vh]">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-green-900">
        {product.name}
      </h2>
      <section
        className="max-w-sm sm:max-w-md md:max-w-lg mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md"
        aria-label={`Details for product ${product.name}`}
      >
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="h-48 sm:h-64 md:h-72 w-full object-cover mb-4 sm:mb-5 md:mb-6 rounded-lg"
            aria-label={`Image of ${product.name}`}
          />
        )}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <p className="text-sm sm:text-base md:text-lg text-gray-700">
            <strong>Description:</strong> {product.description}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-green-600 font-semibold">
            <strong>Price:</strong> ${product.price.toFixed(2)}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-700">
            <strong>Quantity:</strong> {product.quantity}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-700">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-700">
            <strong>Harvest Date:</strong> {new Date(product.harvestDate).toLocaleDateString()}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-700">
            <strong>Expiry Date:</strong> {new Date(product.expiryDate).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
          {user && user.role === 'customer' && (
            <button
              onClick={() => {
                if (!user) {
                  navigate('/login');
                } else {
                  addToCart(product);
                }
              }}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base md:text-lg"
              aria-label={`Add ${product.name} to cart`}
            >
              Add to Cart
            </button>
          )}
          <button
            onClick={() => navigate('/products')}
            className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm sm:text-base md:text-lg"
            aria-label="Return to products list"
          >
            Back to Products
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
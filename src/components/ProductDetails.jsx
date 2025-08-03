import React, { useEffect, useState } from 'react';
import { mockBackend } from '../utils/mockApi';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authUser';

const ProductDetails = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const products = mockBackend.getProducts();
    const foundProduct = products.find(p => p.id === +productId);
    setProduct(foundProduct);
  }, [productId]);

  if (!product) return <p className="text-center text-gray-500">Product not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">{product.name}</h2>
      <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
        {product.image && <img src={product.image} alt={product.name} className="h-48 w-full object-cover mb-4" />}
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Quantity:</strong> {product.quantity}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Harvest Date:</strong> {new Date(product.harvestDate).toLocaleDateString()}</p>
        <p><strong>Expiry Date:</strong> {new Date(product.expiryDate).toLocaleDateString()}</p>
        {user && user.role === 'customer' && (
          <button
            onClick={() => addToCart(product)}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add to Cart
          </button>
        )}
        <button
          onClick={() => navigate('/products')}
          className="mt-4 ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
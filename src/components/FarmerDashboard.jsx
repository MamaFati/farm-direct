import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useAuth } from '../utils/auth';
import ProductUpload from './productUpload';
import { useNavigate } from 'react-router-dom';

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState({ products: false, orders: false });
  const [error, setError] = useState({ products: null, orders: null });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.id) {
      navigate('/login');
      return;
    }

    const fetchProducts = async () => {
      setIsLoading(prev => ({ ...prev, products: true }));
      try {
        const response = await axios.get(farm-direct/src/components/login.jsx, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const farmerProducts = response.data.filter(p => p.farmerId === user.id);
        setProducts(farmerProducts);
      } catch (error) {
        setError(prev => ({ ...prev, products: 'Failed to load products.' }));
      } finally {
        setIsLoading(prev => ({ ...prev, products: false }));
      }
    };

    const fetchOrders = async () => {
      setIsLoading(prev => ({ ...prev, orders: true }));
      try {
        const response = await axios.get('https://farmdirect-production.up.railway.app/api/v1/products/', {
          
        });
        const farmerOrders = response.data.filter(order =>
          order.items.some(item => item.product.farmerId === user.id)
        );
        setOrders(farmerOrders);
      } catch (error) {
        setError(prev => ({ ...prev, orders: 'Failed to load orders.' }));
      } finally {
        setIsLoading(prev => ({ ...prev, orders: false }));
      }
    };

    fetchProducts();
    fetchOrders();
  }, [user, navigate]);

  if (!user) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 min-h-[60vh]">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-green-900">
        Farmer Dashboard
      </h2>
      <ProductUpload user={user} />
      <h3 className="text-base sm:text-lg md:text-xl font-semibold mt-6 sm:mt-8 md:mt-10 mb-3 sm:mb-4 md:mb-5 text-green-900">
        Your Products
      </h3>
      {isLoading.products ? (
        <p className="text-center text-base sm:text-lg md:text-xl text-gray-600 py-4 sm:py-6" aria-label="Loading products">
          Loading products...
        </p>
      ) : error.products ? (
        <p className="text-center text-base sm:text-lg md:text-xl text-red-500 py-4 sm:py-6" aria-label="Products error">
          {error.products}
        </p>
      ) : products.length === 0 ? (
        <p className="text-center text-base sm:text-lg md:text-xl text-red-500 py-4 sm:py-6" aria-label="No products found">
          No products listed.
        </p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6"
              aria-label={`Product ${product.name}`}
            >
              <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700">
                {product.name}
              </h4>
              <p className="text-sm sm:text-base md:text-lg text-green-600 font-semibold">
                Price: ${product.price.toFixed(2)}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-700">
                Quantity: {product.quantity}
              </p>
            </div>
          ))}
        </section>
      )}
      <h3 className="text-base sm:text-lg md:text-xl font-semibold mt-6 sm:mt-8 md:mt-10 mb-3 sm:mb-4 md:mb-5 text-green-900">
        Incoming Orders
      </h3>
      {isLoading.orders ? (
        <p className="text-center text-base sm:text-lg md:text-xl text-gray-600 py-4 sm:py-6" aria-label="Loading orders">
          Loading orders...
        </p>
      ) : error.orders ? (
        <p className="text-center text-base sm:text-lg md:text-xl text-red-500 py-4 sm:py-6" aria-label="Orders error">
          {error.orders}
        </p>
      ) : orders.length === 0 ? (
        <p className="text-center text-base sm:text-lg md:text-xl text-red-500 py-4 sm:py-6" aria-label="No orders found">
          No orders received.
        </p>
      ) : (
        <section className="space-y-4 sm:space-y-5 md:space-y-6">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6"
              aria-label={`Order ${order.id}`}
            >
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <p className="text-sm sm:text-base md:text-lg text-gray-700">
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p className="text-sm sm:text-base md:text-lg text-gray-700">
                  <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                </p>
                <h4 className="mt-2 sm:mt-3 md:mt-4 font-semibold text-sm sm:text-base md:text-lg text-green-900">
                  Items:
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {order.items
                    .filter(item => item.product.farmerId === user.id)
                    .map(item => (
                      <li
                        key={item.product.id}
                        className="text-sm sm:text-base md:text-lg text-gray-700"
                        aria-label={`Order item: ${item.product.name}, quantity ${item.quantity}`}
                      >
                        {item.product.name} - {item.quantity} x ${item.product.price.toFixed(2)}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default FarmerDashboard;
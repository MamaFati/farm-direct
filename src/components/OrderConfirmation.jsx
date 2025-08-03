import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../utils/auth';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://farmdirect-production.up.railway.app/api/v1/order/', {
           
        });
        const orders = response.data;
        if (orders.length > 0) {
          setOrder(orders[orders.length - 1]);
        } else {
          setError('No orders found.');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.response?.data?.message || 'Failed to load order details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [user, navigate]);

  if (!user) {
    return null; // Redirect handled in useEffect
  }

  if (isLoading) {
    return (
      <p
        className="text-center text-base sm:text-lg md:text-xl text-gray-600 py-6 sm:py-8"
        aria-label="Loading order"
      >
        Loading order...
      </p>
    );
  }

  if (error) {
    return (
      <p
        className="text-center text-base sm:text-lg md:text-xl text-red-500 py-6 sm:py-8"
        aria-label="Order error"
      >
        {error}
      </p>
    );
  }

  if (!order) {
    return (
      <p
        className="text-center text-base sm:text-lg md:text-xl text-red-500 py-6 sm:py-8"
        aria-label="No order found"
      >
        No order found.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-green-900 mb-4 sm:mb-6 md:mb-8">
        Order Confirmation
      </h2>
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <p className="text-green-600 font-semibold text-base sm:text-lg md:text-xl mb-4 sm:mb-5">
          Thank you for your order!
        </p>
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <p className="text-sm sm:text-base md:text-lg text-gray-700">
            <strong>Order ID:</strong> {order.id}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-700">
            <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-green-600 font-semibold">
            <strong>Total:</strong> ${order.total.toFixed(2)}
          </p>
          <h3 className="mt-4 sm:mt-5 md:mt-6 font-semibold text-base sm:text-lg md:text-xl text-green-900">
            Items:
          </h3>
          <ul className="space-y-2 sm:space-y-3">
            {order.items.map(item => (
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
        <button
          onClick={() => navigate('/customer-dashboard')}
          className="mt-4 sm:mt-5 md:mt-6 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
          aria-label="Return to customer dashboard"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
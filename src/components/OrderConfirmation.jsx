import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const orders = mockBackend.getOrders();
  const latestOrder = orders[orders.length - 1];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Order Confirmation</h2>
      <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
        <p className="text-green-600 font-bold">Thank you for your order!</p>
        <p><strong>Order ID:</strong> {latestOrder.id}</p>
        <p><strong>Date:</strong> {new Date(latestOrder.date).toLocaleDateString()}</p>
        <p><strong>Total:</strong> ${latestOrder.total.toFixed(2)}</p>
        <h3 className="mt-4 font-semibold">Items:</h3>
        {latestOrder.items.map(item => (
          <div key={item.product.id}>
            <p>{item.product.name} - {item.quantity} x ${item.product.price}</p>
          </div>
        ))}
        <button
          onClick={() => navigate('/customer-dashboard')}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
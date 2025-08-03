 import React from 'react';
import { mockBackend } from '../utils/mockApi';

const OrderHistory = ({ user }) => {
  const orders = mockBackend.getOrders().filter(order => order.userId === user.id);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow-md">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              <h3 className="mt-2 font-semibold">Items:</h3>
              {order.items.map(item => (
                <p key={item.product.id}>{item.product.name} - {item.quantity} x ${item.product.price}</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
 import React from 'react';
import { mockBackend } from '../utils/mockApi';

const OrderHistory = ({ user }) => {
  const orders = mockBackend.getOrders().filter(order => order.userId === user.id);

 return (
  <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-green-900 mb-4 sm:mb-6 md:mb-8">
      Order History
    </h2>
    {orders.length === 0 ? (
      <p className="text-center text-base sm:text-lg md:text-xl text-red-500 py-4 sm:py-6" aria-label="No orders found">
        No orders found.
      </p>
    ) : (
      <section className="space-y-4 sm:space-y-6 md:space-y-8 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
        {orders.map(order => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8"
            aria-label={`Order ${order.id}`}
          >
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
              <h3 className="mt-2 sm:mt-3 md:mt-4 font-semibold text-base sm:text-lg md:text-xl text-green-900">
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
          </div>
        ))}
      </section>
    )}
  </div>
);
};

export default OrderHistory;
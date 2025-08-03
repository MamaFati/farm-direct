import React from 'react';
import { mockBackend } from '../utils/mockApi';
import ProductUpload from './productUpload';

const FarmerDashboard = ({ user }) => {
  const products = mockBackend.getProducts().filter(p => p.farmerId === user.id);
  const orders = mockBackend.getOrders().filter(order => 
    order.items.some(item => item.product.farmerId === user.id)
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Farmer Dashboard</h2>
      <ProductUpload user={user} />
      <h3 className="text-xl font-semibold mt-8 mb-4">Your Products</h3>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products listed.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          ))}
        </div>
      )}
      <h3 className="text-xl font-semibold mt-8 mb-4">Incoming Orders</h3>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders received.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow-md">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <h4 className="mt-2 font-semibold">Items:</h4>
              {order.items
                .filter(item => item.product.farmerId === user.id)
                .map(item => (
                  <p key={item.product.id}>{item.product.name} - {item.quantity} x ${item.product.price}</p>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
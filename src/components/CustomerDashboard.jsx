import React from 'react';
import OrderHistory from './OrderHistory';

const CustomerDashboard = ({ user }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Customer Dashboard</h2>
      <OrderHistory user={user} />
    </div>
  );
};

export default CustomerDashboard;
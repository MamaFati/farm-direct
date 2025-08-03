import React from 'react';
import { mockBackend } from '../utils/mockApi';

const Profile = ({ user }) => {
  const farmers = mockBackend.getFarmers();
  const farmer = farmers.find(f => f.userId === user.id);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
      <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
        <p><strong>Email:</strong> {user.email}</p>
        {farmer ? (
          <>
            <p><strong>Name:</strong> {farmer.name}</p>
            <p><strong>Farm Name:</strong> {farmer.farmName}</p>
            <p><strong>Location:</strong> {farmer.location}</p>
          </>
        ) : (
          <p className="text-gray-500">No farmer profile found. Please register as a farmer.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
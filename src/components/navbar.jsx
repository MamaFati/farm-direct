import React from 'react';

const Navbar = ({ setPage, user, logout }) => {
  return (
    <nav className="bg-green-600/50 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">FarmDirect</h1>
        <div>
          {user ? (
            <>
              <a onClick={() => setPage(user.role === 'farmer' ? 'farmer-dashboard' : 'customer-dashboard')} className="mr-8 text-white    cursor-pointer hover:underline">Dashboard</a>
              <a onClick={() => setPage('profile')} className="mr-8 text-white    cursor-pointer hover:underline">Profile</a>
              <a onClick={logout} className="hover:underline">Logout</a>
            </>
          ) : (
            <>
              <a onClick={() => setPage('home')} className="mr-8 text-white    cursor-pointer hover:underline">Home</a>
              <a onClick={() => setPage('products')} className="mr-8 text-white    cursor-pointer hover:underline">Products</a>
              <a onClick={() => setPage('register')} className="mr-8 text-white    cursor-pointer hover:underline">Register</a>
              <a onClick={() => setPage('login')} className="mr-8 text-white    cursor-pointer hover:underline">Login</a>
            </>
            
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
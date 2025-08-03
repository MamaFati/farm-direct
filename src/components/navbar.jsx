import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    setIsMenuOpen(false); // Close menu on navigation
    navigate(`/${page}`);
  };

  return (
    <nav className="bg-green-600/50 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">FarmDirect</h1>
        {/* Hamburger Icon for Mobile */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
          </svg>
        </button>
        {/* Navigation Links */}
        <div className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } sm:flex flex-col sm:flex-row sm:items-center absolute sm:static top-16 left-0 w-full sm:w-auto bg-green-600/50 sm:bg-transparent sm:space-x-4 p-4 sm:p-0`}>
          {user ? (
            <>
              <button
                onClick={() => handleNavigation(user.role === 'farmer' ? 'farmer-dashboard' : 'customer-dashboard')}
                className="text-white text-left hover:underline py-2 sm:py-0"
                aria-label="Navigate to Dashboard"
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNavigation('profile')}
                className="text-white text-left hover:underline py-2 sm:py-0"
                aria-label="Navigate to Profile"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                  navigate('/');
                }}
                className="text-white text-left hover:underline py-2 sm:py-0"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavigation('home')}
                className="text-white text-left hover:underline py-2 sm:py-0"
                aria-label="Navigate to Home"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation('products')}
                className="text-white text-left hover:underline py-2 sm:py-0"
                aria-label="Navigate to Products"
              >
                Products
              </button>
              <button
                onClick={() => handleNavigation('register')}
                className="text-white text-left hover:underline py-2 sm:py-0"
                aria-label="Navigate to Register"
              >
                Register
              </button>
              <button
                onClick={() => handleNavigation('login')}
                className="text-white text-left hover:underline py-2 sm:py-0"
                aria-label="Navigate to Login"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
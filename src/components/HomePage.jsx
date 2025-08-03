import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[70vh] px-4">
      <div className="bg-white/20 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-2xl sm:max-w-3xl md:max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-7xl italic text-green-700 font-bold text-center mb-6 sm:mb-8 drop-shadow-md sm:drop-shadow-lg">
          Welcome to FarmDirect
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-green-900 font-bold text-center mb-4 sm:mb-6">
          Register, Upload products, and Connect with buyers.
        </p>
        <div className="flex flex-col sm:flex-col md:flex-row gap-4 sm:gap-4 md:gap-6 justify-center mt-6 sm:mt-8">
          <button
            onClick={() => navigate('/register')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-auto"
            aria-label="Navigate to Register"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/products')}
            className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full md:w-auto"
            aria-label="Navigate to Products"
          >
            Browse Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
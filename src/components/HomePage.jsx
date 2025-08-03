import React from 'react';

const HomePage = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh]  ">
    <div className="bg-white/20 rounded-xl shadow-lg p-10 w-full max-w-3xl">
      <h1 className="text-7xl italic text-green-700 font-bold text-center mb-8 drop-shadow-lg">
        Welcome to FarmDirect
      </h1>
      <p className="text-3xl md:text-5xl text-green-900 font-bold text-center mb-6">
        Register, Upload products, and Connect with buyers.
      </p>
      <div className="flex flex-col md:flex-row gap-6 justify-center mt-8">
        <a
          href="/register"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition"
        >
          Get Started
        </a>
        <a
          href="/products"
          className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold py-3 px-8 rounded-lg shadow transition"
        >
          Browse Products
        </a>
      </div>
    </div>
  </div>
);

export default HomePage;
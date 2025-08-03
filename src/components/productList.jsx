import React, { useEffect, useState } from 'react';
import { mockBackend } from '../utils/mockApi';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const navigate = useNavigate();

  useEffect(() => {
    let filteredProducts = mockBackend.getProducts();
    if (search) {
      filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    filteredProducts = filteredProducts.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    setProducts(filteredProducts);
  }, [search, category, priceRange]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Products</h2>
      <div className="mb-4 space-y-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex space-x-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Categories</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
            <option value="dairy">Dairy</option>
          </select>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price Range</label>
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="p-2 border rounded w-24 mr-2"
            />
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="p-2 border rounded w-24"
            />
          </div>
        </div>
      </div>
      {products.length === 0 ? (
        <p className=" text-center text-7xl italic text-white font-bold ">Out Of Stock </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              {product.image && <img src={product.image} alt={product.name} className="h-32 w-full object-cover mb-2" />}
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-600 font-bold">${product.price}</p>
              <p className="text-gray-500">Quantity: {product.quantity}</p>
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
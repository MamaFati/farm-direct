import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
// import FarmerRegistration from './components/farmerRegistration';
import Login from './components/login';
import ProductList from './components/productList';
import Register from './components/Register';
import Profile from './components/profile';
import { useAuth } from './utils/authUser';
import './App.css';  
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import FarmerDashboard from './components/FarmerDashboard';
import CustomerDashboard from './components/CustomerDashboard';
 
import { mockBackend } from './utils/mockApi';
import HomePage from './components/HomePage';

function App() {
  const { user, login, logout } = useAuth();
  const [cart, setCart] = useState([]);

  const handleRegister = (userData) => {
    mockBackend.saveUser(userData);
    login(userData.email, userData.password); 
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1, userId: user.id }]);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-main">
        <Navbar setPage={(page) => window.location.pathname = `/${page}`} user={user} logout={logout} />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/home" element={<HomePage  />} />
      
            <Route path="/register" element={<Register onRegister={handleRegister} />} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/cart" element={user && user.role === 'customer' ? <Cart cart={cart} setCart={setCart} /> : <Navigate to="/login" />} />
            <Route path="/order-confirmation" element={user && user.role === 'customer' ? <OrderConfirmation /> : <Navigate to="/login" />} />
            <Route path="/farmer-dashboard" element={user && user.role === 'farmer' ? <FarmerDashboard user={user} /> : <Navigate to="/login" />} />
            <Route path="/customer-dashboard" element={user && user.role === 'customer' ? <CustomerDashboard user={user} /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
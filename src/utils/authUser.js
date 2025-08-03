import { useState, useEffect } from 'react';
import { mockBackend } from './mockApi';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = mockBackend.verifyToken(token);
        setUser({ id: decoded.id, email: decoded.email, role: decoded.role });
      } catch (error) {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
      }
    }
  }, [token]);

  const login = (email, password) => {
    const { user, token } = mockBackend.loginUser(email, password);
    setUser(user);
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);  
    setToken(null);
    localStorage.removeItem('token');
  };

  return { user, token, login, logout };  }
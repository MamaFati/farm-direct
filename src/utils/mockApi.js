// import jwt from 'jsonwebtoken';

// const SECRET_KEY = '12345@12345'; // In production, use an environment variable

// jwt removed

export const mockBackend = {
  saveUser: (user) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === user.email)) throw new Error('User already exists');
    const newUser = { ...user, id: Date.now() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
  },
  loginUser: (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    // Use a mock token for demonstration
    const token = `mock-token-${user.id}`;
    return { user, token };
  },
  verifyToken: (token) => {
    // Simple mock verification: check token format
    if (token && token.startsWith('mock-token-')) {
      return { valid: true };
    } else {
      throw new Error('Invalid or expired token');
    }
  },
  saveProduct: (product) => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push({ ...product, id: Date.now() });
    localStorage.setItem('products', JSON.stringify(products));
  },
  getProducts: () => JSON.parse(localStorage.getItem('products') || '[]'),
  saveOrder: (order) => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push({ ...order, id: Date.now(), date: new Date().toISOString() });
    localStorage.setItem('orders', JSON.stringify(orders));
  },
  getOrders: () => JSON.parse(localStorage.getItem('orders') || '[]'),
};
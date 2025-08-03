import React, { useState } from 'react';
import { mockBackend } from '../utils/mockApi';
import { validateForm } from '../utils/validateForm';

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'customer', name: '', farmName: '', location: '' });
  const [errors, setErrors] = useState({});

  const fields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'name', label: 'Name', type: 'text' },
    ...(formData.role === 'farmer' ? [
      { name: 'farmName', label: 'Farm Name', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
    ] : []),
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const userData = { email: formData.email, password: formData.password, role: formData.role };
      if (formData.role === 'farmer') {
        userData.farmerDetails = { name: formData.name, farmName: formData.farmName, location: formData.location };
      } else {
        userData.name = formData.name;
      }
      mockBackend.saveUser(userData);
      onRegister(userData);
      setFormData({ email: '', password: '', role: 'customer', name: '', farmName: '', location: '' });
      setErrors({});
      alert('Registration successful! You are now logged in.');
    } catch (error) {
      setErrors({ general: error.message });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="customer">Customer</option>
            <option value="farmer">Farmer</option>
          </select>
        </div>
        {fields.map(field => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            <input
              type={field.type}
              value={formData[field.name]}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              className="mt-1 block w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
          </div>
        ))}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { validateForm } from '../utils/validateForm';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '',password2: '', role: 'customer', name: '',   });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'password2', label: 'Repeat Password', type: 'password' },
    { name: 'username', label: 'Name', type: 'text' },
       
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const userData = { 
        email: formData.email, 
        password: formData.password, 
        role: formData.role,
        username: formData.name,
      };
      if (formData.role === 'farmer') {
        userData.farmerDetails = { name: formData.name, farmName: formData.farmName, location: formData.location };
      }
      const response = await axios.post('https://farmdirect-production.up.railway.app/api/v1/auth/register/', userData);
      const { token, user } = response.data;
      setFormData({ email: '', password: '',password2: '', role: 'customer', username: '',   });
      setErrors({});
      // Redirect based on user role
      if (user.role === 'farmer') {
        navigate('/farmer-dashboard');
      } else if (user.role === 'customer') {
        navigate('/customer-dashboard');
      } else {
        setErrors({ general: 'Invalid user role.' });
      }
    } catch (error) {
      setErrors({ general: error.response?.data?.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] sm:min-h-[70vh] px-4">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-green-900">
          Register
        </h2>
        {errors.general && (
          <p className="text-red-500 text-sm sm:text-base md:text-lg mb-4 sm:mb-5 text-center">
            {errors.general}
          </p>
        )}
        <form className="space-y-4 sm:space-y-5 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="role"
              className="block text-sm sm:text-base md:text-lg font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="mt-1 block w-full p-2 sm:p-3 md:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base md:text-lg"
              aria-label="Select user role"
              disabled={isLoading}
            >
              <option value="customer">Customer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>
          {fields.map(field => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm sm:text-base md:text-lg font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                className="mt-1 block w-full p-2 sm:p-3 md:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base md:text-lg"
                aria-label={field.label}
                disabled={isLoading}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-xs sm:text-sm md:text-base mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-3 md:py-3 px-4 sm:px-6 md:px-6 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base md:text-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label={isLoading ? 'Registering' : 'Submit registration form'}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
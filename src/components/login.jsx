import React, { useState } from 'react';
import { validateForm } from '../utils/validateForm';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const fields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      onLogin(formData.email, formData.password);
      setFormData({ email: '', password: '' });
      setErrors({});
    } catch (error) {
      setErrors({ general: error.message });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] sm:min-h-[70vh] px-4">
      <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center text-green-900">
          Login
        </h2>
        {errors.general && (
          <p className="text-red-500 text-sm sm:text-sm md:text-base mb-4 text-center">
            {errors.general}
          </p>
        )}
        <form className="space-y-3 sm:space-y-4 md:space-y-5" onSubmit={handleSubmit}>
          {fields.map(field => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm sm:text-sm md:text-base font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                className="mt-1 block w-full p-2 sm:p-2 md:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-sm md:text-base"
                aria-label={field.label}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-2 md:py-3 px-4 sm:px-6 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base md:text-lg"
            aria-label="Submit login form"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
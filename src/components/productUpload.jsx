import React, { useState } from 'react';
import { mockBackend } from '../utils/mockApi';
import { validateForm } from '../utils/validateForm';

const ProductUpload = ({ farmerId }) => {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', quantity: '' });
  const [errors, setErrors] = useState({});

  const fields = [
    { name: 'name', label: 'Product Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'quantity', label: 'Quantity', type: 'number' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      mockBackend.saveProduct({ ...formData, farmerId });
      setFormData({ name: '', description: '', price: '', quantity: '' });
      setErrors({});
      alert('Product uploaded successfully!');
    } catch (error) {
      setErrors({ general: 'Product upload failed. Please try again.' });
    }
  };

  if (!farmerId) {
    return <p className="text-red-500 text-center">Please register as a farmer first.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Product</h2>
      {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}
      <form className="space-y-4">
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
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default ProductUpload;
export const validateForm = (formData, fields) => {
  const errors = {};
  fields.forEach(field => {
    if (!formData[field.name]) {
      errors[field.name] = `${field.label} is required`;
    } else if (field.type === 'email' && !/\S+@\S+\.\S+/.test(formData[field.name])) {
      errors[field.name] = 'Invalid email format';
    } else if (field.type === 'number' && formData[field.name] <= 0) {
      errors[field.name] = `${field.label} must be positive`;
    } else if (field.type === 'date' && new Date(formData[field.name]) < new Date()) {
      errors[field.name] = `${field.label} must be in the future`;
    }
  });
  return errors;
};
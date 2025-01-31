import React from 'react';

export const Input = ({ type = 'text', placeholder, value, onChange, className = '', ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600 ${className}`}
      {...props}
    />
  );
};

export default Input;

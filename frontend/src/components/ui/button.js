import React from 'react';

export const Button = ({ type = 'button', className = '', disabled = false, children, ...props }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`py-2 px-4 rounded-md text-white transition-all ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

import React from 'react';

export const Alert = ({ variant = 'info', children }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'destructive':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'info':
      default:
        return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  return (
    <div className={`border-l-4 p-4 rounded-md ${getVariantStyles()}`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children }) => (
  <p className="text-sm">{children}</p>
);

export default Alert;

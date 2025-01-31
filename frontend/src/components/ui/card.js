import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({ children, className }) => (
  <div className={`shadow-lg rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div  >
    {children}
  </div>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold text-center text-black">
    {children}
  </h3>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Badge = ({ className, children }) => {
  return (
    <span className={classNames('inline-block px-2 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full', className)}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};



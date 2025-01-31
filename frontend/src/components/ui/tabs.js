import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

export const TabsList = ({ children, className }) => (
  <div className={classNames('flex', className)}>
    {children}
  </div>
);

export const TabsTrigger = ({ value, activeTab, setActiveTab, children }) => (
  <button
    className={classNames('py-2 px-4', { 'bg-blue-500 text-white': activeTab === value })}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

export const TabsContent = ({ value, activeTab, children }) => {
  if (activeTab !== value) return null;
  return <div>{children}</div>;
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

TabsList.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TabsTrigger.propTypes = {
  value: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

TabsContent.propTypes = {
  value: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

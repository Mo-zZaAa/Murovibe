import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`ui-loading-spinner ui-loading-spinner--${size} ${className}`}>
      <div className="ui-loading-spinner__circle"></div>
      <div className="ui-loading-spinner__text">AI가 생각하고 있어요...</div>
    </div>
  );
};

export default LoadingSpinner;

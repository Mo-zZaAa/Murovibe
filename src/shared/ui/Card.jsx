import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'medium',
  ...props 
}) => {
  return (
    <div 
      className={`ui-card ui-card--${variant} ui-card--${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

import React from 'react';
import './TextArea.css';

const TextArea = ({
  value,
  onChange,
  placeholder = '',
  rows = 4,
  maxLength,
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <div className="ui-textarea-wrapper">
      <textarea
        className={`ui-textarea ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        {...props}
      />
      {maxLength && (
        <div className="ui-textarea-counter">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default TextArea;

import React, { useState } from 'react';
import './style.css';

const SwitchSelector = ({ options, selectedOption, onChange }) => {
  return (
    <div className="switch-container">
      {options.map((option) => (
        <div
          key={option.value}
          className={`switch ${
            selectedOption === option.value ? 'active' : ''
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default SwitchSelector;

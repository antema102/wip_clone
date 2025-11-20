import React, { useState } from 'react';

interface CheckboxProps {
  label?: string,
  checked: boolean, 
  onChange: any, 
  styles?: any
}

const Checkbox = ({ label, checked, onChange, styles }: CheckboxProps) => {

  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={styles}
      />
      {label}
    </label>
  );
};

export default Checkbox;

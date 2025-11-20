import React, { useEffect, useState } from 'react';
import { styles } from './styles';

import { SwitchComponent } from '../../Switch';

interface Props {
  title?: string;
  value: { [key: string]: boolean };
  onChange: (arg?: string, arg1?: string[] | boolean, arg2?: boolean) => void;
  style?: any;
  name: string;
}
export default ({ title = '', onChange, name, value, style = {} }: Props) => {
  const handleChange = () => {
    onChange(name, !value[name], true);
  };

  useEffect(() => {
    if (typeof value[name] !== 'boolean') {
      onChange(name, false, true);
    }
  }, []);

  return (
    <SwitchComponent
      title={title}
      onChangeValue={handleChange}
      value={value[name]}
      style={[styles.namedSwitchField, style]}
    />
  );
};

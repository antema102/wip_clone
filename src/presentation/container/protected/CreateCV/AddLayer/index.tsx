import React from 'react';

import Buttons from '../../../../components/Button/button';
import { COLORS, icons } from '../../../../../resources/constants';
import globalStyle from '../../../../globalStyle/globalStyle';
import styles from '../styles';
export const AddLayer = (props) => {
  const { title, label, onChange, color, style } = props;
  return (
    <div
      style={[{ justifyContent: 'space-between', flexDirection: 'row' }, style]}
    >
      <span style={styles.titleBtn}>{title}</span>
      <Buttons
        {...props}
        onClick={onChange}
        title={label}
        color={color}
        _style={[
          {
            width: 32,
            height: 32,
            backgroundColor: COLORS.orange,
            borderRadius: 18,
            paddingTop: 10,
          },
          globalStyle.elevationOrange,
        ]}
        icon={icons.plus}
        iconStyles={{
          marginTop: -5,
          marginLeft: 5,
          justifyContent: 'center',
          width: 20,
          height: 20,
        }}
      />
    </div>
  );
};

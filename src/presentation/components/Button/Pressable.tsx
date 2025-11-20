import React from 'react';
;

import { buttonsStyles } from './style';
import { SIZES } from '../../../resources/constants';

interface Props {
  onPress: any;
  title: string;
  color: string;
  icon?: any | undefined;
  _style?: any;
  styleBtnTxt?: any;
  iconStyles?: any;
  isDisable?: boolean;
}

const Buttons = {
  color,
  title,
  onPress,
  icon,
  iconStyles,
  _style,
  styleBtnTxt,
  isDisable = false}: Props): any => {
  return (
    <div style={{}}>
      <button
        onClick={onPress}
        disabled={isDisable}
        style={[{ backgroundColor: color }, _style]}
      >
        {icon && (
          <img src={icon} style={[buttonsStyles.iconStyle, iconStyles]} />
        )}
        <span style={styleBtnTxt}>{title}</span>
      </button>
    </div>
  );
};

export default Buttons;

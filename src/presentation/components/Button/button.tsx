import React from 'react';

import { buttonsStyles } from './style';
import { SIZES, icons } from '../../../resources/constants';

interface Props {
  onPress?: any;
  title: string;
  color?: string;
  icon?: any | undefined;
  _style?: any;
  styleBtnTxt?: any;
  iconStyles?: any;
  isDisable?: boolean;
  iconRight?: any;
  iconNext?: any;
}

const Buttons = ({
  color,
  title,
  onPress,
  icon,
  iconStyles,
  _style,
  styleBtnTxt,
  iconRight,
  isDisable = false,
  iconNext,
}: Props): any => {
  return (
    <div style={{}}>
      <button
        onClick={onPress}
        disabled={isDisable}
        style={[{ backgroundColor: color }, _style]}
      >
        {icon && !iconNext && (
          <img
            src={icon}
            style={[buttonsStyles.iconStyle, iconStyles, { marginRight: 8 }]}
          />
        )}
        {iconNext && (
          <img
            src={icon}
            style={[
              buttonsStyles.nextIconStyle,
              iconStyles,
              { marginRight: 8 },
            ]}
          />
        )}
        {!iconRight && <span style={styleBtnTxt}>{title}</span>}
        {iconRight && (
          <div style={{ flexDirection: 'row', flex: 1 }}>
            <span style={[styleBtnTxt, { marginRight: 'auto' }]}>{title}</span>
            <img src={icons.action} style={buttonsStyles.iconStyle2} />
          </div>
        )}
      </button>
    </div>
  );
};

export default Buttons;

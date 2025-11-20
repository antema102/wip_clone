import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

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
    <View style={{}}>
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisable}
        style={[{ backgroundColor: color }, _style]}
      >
        {icon && !iconNext && (
          <Image source={icon} style={[buttonsStyles.iconStyle, iconStyles, { marginRight: 8 }]} />
        )}
        {iconNext && (
          <Image
            source={icon}
            style={[buttonsStyles.nextIconStyle, iconStyles, { marginRight: 8 }]}
          />
        )}
        {!iconRight && <Text style={styleBtnTxt}>{title}</Text>}
        {iconRight && (
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={[styleBtnTxt, { marginRight: 'auto' }]}>{title}</Text>
            <Image
              source={{ uri: icons.action }}
              style={buttonsStyles.iconStyle2}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Buttons;

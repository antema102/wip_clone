import React from 'react';
import { View, TouchableOpacity, Image, Text, Pressable } from 'react-native';

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

const Buttons = ({
  color,
  title,
  onPress,
  icon,
  iconStyles,
  _style,
  styleBtnTxt,
  isDisable = false,
}: Props): any => {
  return (
    <View style={{}}>
      <Pressable
        onPress={onPress}
        disabled={isDisable}
        style={[{ backgroundColor: color }, _style]}
      >
        {icon && (
          <Image source={icon} style={[buttonsStyles.iconStyle, iconStyles]} />
        )}
        <Text style={styleBtnTxt}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default Buttons;

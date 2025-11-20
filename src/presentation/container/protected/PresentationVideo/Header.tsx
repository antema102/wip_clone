import React from 'react';
import {View, Text, Image} from 'react-native';
import globalStyle from '../../../globalStyle/globalStyle';
import { RESUME_VIDEO } from '../../../../data/constants/strings';

export const HeaderComponent = () => {
  return (
    <View style={globalStyle.headerContainer}>
      <Text style={globalStyle.headerScreenTitle}>
        {RESUME_VIDEO.WELCOMING}
      </Text>
    </View>
  );
};

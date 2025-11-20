import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export const HeaderScreen = (title: string) => {
  return (
    <View style={[styles.blueBanner, styles.displayLeftHorizontal]}>
      <Text style={[styles.displayCenterVertical, styles.headerFullTitle]}>
        {title}
      </Text>
    </View>
  );
};

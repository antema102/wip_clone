import React from 'react';
import { View, Text } from 'react-native';

import { globalStyle } from '../../globalStyle/globalStyle';

interface Props {
  title: string;
  description?: string;
}

export const HeaderScreen = ({ title, description }: Props) => {
  return (
    <View style={globalStyle.smallHeaderContainer}>
      <Text style={globalStyle.headerScreenTitle}>{title}</Text>
      {description && description !== '' && (
        <Text style={globalStyle.headerScreenDescription}>{description}</Text>
      )}
    </View>
  );
};

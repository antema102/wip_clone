import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export const HeaderScreen = ({ title, description }: { title: string, description: string }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerScreenTitle}>{title}</Text>
      <Text style={styles.headerScreenDescription}>{description}</Text>
    </View>
  );
};

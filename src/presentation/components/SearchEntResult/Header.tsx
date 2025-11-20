import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';

export const HeaderScreen = ({title, description}) => {

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerScreenTitle}>{title}</Text>
      <Text style={styles.headerScreenDescription}>{description}</Text>
    </View>
  );
};

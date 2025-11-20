import React from 'react';
import { View, ActivityIndicator, StyleSheet,ViewProps,ViewStyle } from 'react-native';

interface MiniLoaderProps {
  CustomStyle?:ViewStyle
}

const MiniLoader = ({CustomStyle}: MiniLoaderProps) => {
  return (
    <View style={[styles.loaderContainer, CustomStyle]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    zIndex: 1000, // Ensure the loader appears above other content
  },
});

export default MiniLoader;

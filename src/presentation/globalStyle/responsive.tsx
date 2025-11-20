import { Dimensions } from 'react-native';

export const adjustingImage = (percentage: number) => {
  const screenHeight = Dimensions.get('window').height;
  const imageHeightPercentage = percentage;
  const imageHeight = (screenHeight * imageHeightPercentage) / 100;
  return imageHeight;
};
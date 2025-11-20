import { Dimensions, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../../resources/constants';
const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

export const viewStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  image:{
    height:15,
    width:15,
    objectFit:'contain'
  }
});

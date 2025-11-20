import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../resources/constants';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.white,
    height: windowHeight > 1600 ? 400 : 280,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imagesSideBar: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
});

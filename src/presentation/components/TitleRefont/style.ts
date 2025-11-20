import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, icons, images, SIZES } from '../../../resources/constants';
const winWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    backgroundColor: COLORS.blue_title,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    left: '50%',
    top: -25,
    transform: [{ translateX: '-50%' }, { translateY: 0 }],
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: COLORS.black,
    textAlign:'center'
  },
});

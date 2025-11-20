import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../../../resources/constants';
let windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  headerCreateCv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    height: 200,
    backgroundColor: COLORS.blueLight,
    borderStartEndRadius: 10,
    borderStartStartRadius: 10,
  },
  headerCreateCvText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    maxWidth:500
  },
  headerCreateCvIcon: {
    height: 185,
    width: 185,
    objectFit:"cover"
  },
});

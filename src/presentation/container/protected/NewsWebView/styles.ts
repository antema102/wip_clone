import {StyleSheet} from 'react-native';
import { COLORS, SIZES } from '../../../../resources/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: SIZES.h5,
    color: COLORS.gray_title,
    marginBottom: SIZES.padding5,
  },
});

import {StyleSheet, Dimensions} from 'react-native';
import { COLORS } from '../../../../resources/constants';

export const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
  },
  imageStyle: {
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 120,
    width: 120,
    height: 120,
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
  },
  badgeIcon: {
    tintColor: 'black',
    width: 24,
    height: 24,
  },
});

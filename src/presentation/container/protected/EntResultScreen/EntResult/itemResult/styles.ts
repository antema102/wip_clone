import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../../../../resources/constants';
export const styles = StyleSheet.create({
  itemResult: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  text:{
    fontWeight: 700
  }
});

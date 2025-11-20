import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../../../../../resources/constants';
const windowDim = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginTop:54
  },
});

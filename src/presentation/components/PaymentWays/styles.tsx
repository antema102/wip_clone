import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../../../resources/constants';

let windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignHorizontally: {
    flexDirection: 'row',
    marginVertical: 7,
  },
  imgStyle: {
    resizeMode: 'contain',
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
    height: 120,
    width: 120,
  },
  intermediate: {
    width: 40,
  },

});

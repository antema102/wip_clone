import {StyleSheet, Dimensions} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../resources/constants';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  Logo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImg: {
    width: '100%', // Set the width of the product image container to 100%
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    color: COLORS.black,
    fontSize: SIZES.h5,
    textAlign: 'center',
  },
  centerElement: {
    width: '100%',
    alignItems: 'center',
    marginTop: 70,
  },
  linkView: {
    width: '20%',
    position: 'absolute',
    height: 30,
    backgroundColor: 'white',
    bottom: '10%',
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding2,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: '#696969',
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3,
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentColors: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  contentSize: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  separator: {
    backgroundColor: '#eeeeee',
    marginHorizontal: 30,
  },
});

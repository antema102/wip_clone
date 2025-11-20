import {StyleSheet, Dimensions} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../../resources/constants';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  Logo: {
    width: '100%',// Set the width of the logo container to 100%
    aspectRatio: 2,
    alignItems: 'center',
    justifyContent: 'center',
    top: 20
  },
  productImg: {
    width: '100%', // Set the width of the product image container to 100%
    height: '100%', // Set the height of the product image container to 100%
    resizeMode: 'contain', // Maintain the aspect ratio and fit the image within the container
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
    height: 2,
    backgroundColor: '#eeeeee',
    marginTop: 20,
    marginHorizontal: 30,
  },
});

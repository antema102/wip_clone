import { StyleSheet, Dimensions } from 'react-native';

import { COLORS, SIZES } from '../../../resources/constants';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    paddingHorizontal: 0,
  },

  button: {
    // width: 150,
    width: width / 2.4,
    height: 50,
    borderColor: COLORS.gray_border,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding2,
    // marginRight: 10,
    // marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: 'red',
  },
  tagNavContainer: {
    // width: '30%', // Adjust the width as per your desired layout
    height: 50,
    borderColor: COLORS.gray_border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: SIZES.padding2,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: width > 991 ? SIZES.h5 : 12,
    textAlign: 'center',
  }
});

import {StyleSheet, Dimensions} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../resources/constants';
let windowDim = Dimensions.get('window').width;
let windowHeig = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
    width: windowDim,
    height: windowDim * 0.16,
    maxHeight: 64,
    zIndex: 99,
  },
  containerHeader: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    width: windowDim,
    height: windowDim * 0.16,
    maxHeight: 64,
    zIndex: 99,
    paddingLeft: SIZES.padding,
  },

  logo: {
    width: 96,
    height: 35,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  vmore: {
    width: 24,
    height: 24,
  },

  back: {
    alignSelf: 'center',
    width: 24,
    height: 24,
  },

  bellRing: {
    width: 24,
    height: 24,
    tintColor: COLORS.secondary,
  },

  modal: {
    backgroundColor: COLORS.white,
    width: 260,
    height: 104,
    borderRadius: 8,
    position: 'absolute',
    right: 24,
    top: 55,
    padding: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 8,
  },
  modalContainer: {
    backgroundColor:'transparent',
    width: windowDim,
    height: windowHeig,
    position: 'absolute',
    alignItems: 'flex-start',
    justifyContent: 'center',


  },
  iconsMenu: {
    width: 22,
    height: 22,
    marginRight: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  iconsMenuH: {
    width: 22,
    height: 22,
    marginRight: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  ValignFlex: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 6,
    justifyContent: 'flex-start',
    alignItem: 'center',
  },
  logoWrap: {
    width: windowDim * 0.6,
    alignSelf: 'center',
    alignContent: 'center',
  },
  backWrap: {
    width: 24,
    alignSelf: 'center',
    alignContent: 'center',
  },
  bellingWrap: {
    width: 24,
    alignSelf: 'center',
    alignContent: 'center',
  },
  vmoreWrap: {
    width: 24,
    alignSelf: 'center',
    alignContent: 'center',
  },
  badgeStyle: {
    position: 'absolute',
    top: -10,
    right: -17,
    backgroundColor:'white'
  },
});


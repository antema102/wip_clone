import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../resources/constants';

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  containers: {
    width: '100%',
    padding: SIZES.padding,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5
  },
  pageContainer: {
    height: winHeight * 1,
    width: '100%',
    paddingHorizontal: SIZES.padding,
    paddingTop: 30,
    paddingBottom: 40,
    // marginBottom: 0,
    overflow: 'scroll'
  },
  blueBanner: {
    width: '100%',
    backgroundColor: COLORS.primary,
    position: 'relative',
    // height: winHeight * .16,
    // overflow: 'visible',
    zIndex: 1,
    height: 130,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'visible',
    padding: 20,
    // top: 60,
  },
  imgBanner: {
    resizeMode: 'contain',
    position: 'absolute',
    marginLeft: 450,
    zIndex: 2,
    top: winWidth * 0.01,
    height: winHeight * 0.16 - 2,
    width: winWidth * 0.3,
  },
  textBienvenue: {
    fontSize: SIZES.h3,
    color: COLORS.white,
    width: '70%',
    height: '100%',
    paddingHorizontal: 0,
    paddingVertical: winWidth * 0.08,
    marginLeft: 20,
  },
  displayCenterVertical: {
    left: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayCenterHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayLeftHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  childFlexCenterHorizontal: {
    flex: 1,
    alignSelf: 'center',
  },

  content: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  button: {
    height: 56,
    width: 363,
    left: 24,
    top: 312,
    borderRadius: 16,
    padding: 16,
  },
  buttonHome: {
    paddingHorizontal: 8,
    height: 56,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActions: {
    paddingRight: SIZES.padding2,
    height: 56,
    borderRadius: SIZES.radius,
    flexDirection: 'row-reverse',
    backgroundColor: COLORS.secondary,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonHomeActionsaisir: {
    paddingHorizontal: 8,
    height: 56,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHomeExport: {
    paddingHorizontal: 8,
    height: 56,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigBtnTxt: {
    fontSize: SIZES.body3,
    color: COLORS.white,
    fontWeight: '700',
    paddingLeft: 20,
  },
  tagNavContainer: {
    width: winWidth / 2.4,
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
  },
  tagNav: {
    color: COLORS.black,
    fontSize: SIZES.h5,
  },
  wrapPost: {
    // padding: SIZES.padding2,
    padding: 12,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding2,
    borderWidth: 1,
    borderColor: COLORS.gray_border,
  },
  customDate: {
    fontSize: SIZES.body5,
    color: COLORS.secondary,
  },
  customPost: {
    fontSize: SIZES.body4,
    color: COLORS.black,
    letterSpacing: 0.2,
    lineHeight: SIZES.padding2,
  },
  wrapItem: {
    paddingVertical: SIZES.padding,
    // backgroundColor: 'green',
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderTopColor: COLORS.gray_border,
  },
  titleItem: {
    color: COLORS.black,
    fontSize: SIZES.body3,
    fontFamily: 'Oxygen-Regular',
  },
  descrItem: {
    color: COLORS.black,
    fontSize: SIZES.body5,
    fontFamily: 'Oxygen-Regular',
    minHeight: 40,
    lineHeight: 40,
  },
  libreButtom: {
    height: 32,
    lineHeight: 28,
    paddingHorizontal: SIZES.padding2,
    borderRadius: 8,
    color: COLORS.white,
    fontSize: SIZES.body5,
    marginRight: SIZES.padding2,
  },
  bkgBlue: {
    backgroundColor: COLORS.primary,
  },
  bkgOrange: {
    backgroundColor: COLORS.orange,
  },
  text: {
    color: COLORS.black,
    fontSize: SIZES.h5,
    textAlign: 'center',
  },


  MainPageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items horizontally with space between them
    alignItems: 'center', // Align items vertically in the center (optional)
    height: 100, // Set the height of the container (optional)
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: winWidth > 991 ? 20 :'',
    borderTopRightRadius:  winWidth > 991 ? 20 :'',
    zIndex: 99999,
    width:"100%"
  },
  item1: {
    height: 50,
    alignSelf: 'flex-start',
    width: '70%',
    marginLeft: 20, // Align this item to the flex-start (left)
    marginTop: 35, // Align this item to the flex-start (left)
  },
  item1Title : {
    fontSize: SIZES.h3,
    color: COLORS.white,
  },
  item1SubTitle : {
    fontSize: 12,
    color: COLORS.white,
  },
  item2: {
    alignSelf: 'flex-end',
    resizeMode: 'contain',
    top: winWidth * 0.01,
    height: winHeight * 0.16 - 15,
    width: winWidth * 0.1
  },
});
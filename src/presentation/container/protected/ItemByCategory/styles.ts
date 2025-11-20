;
import { COLORS, SIZES } from '../../../../resources/constants';

const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
export default ({
  containers: {
    height: '100%',
    width: '100%',
    padding: SIZES.padding,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5},
  pageContainer: {
    height: winHeight * 1,
    width: '100%',
    paddingHorizontal: SIZES.padding,
    paddingTop: 30,
    paddingBottom: 40,
    // marginBottom: 0,
    overflow: 'scroll',
    backgroundColor: COLORS.white},
  blueBanner: {
    paddingHorizontal: SIZES.padding,
    width: '100%',
    backgroundColor: COLORS.primary,
    position: 'relative',
    // height: winHeight * .16,
    overflow: 'visible',
    zIndex: 1,
    // top: 60},
  imgBanner: {
    objectFit: 'contain' as const,
    position: 'absolute',
    right: 10,
    zIndex: 2,
    top: winWidth * 0.03,
    height: winHeight * 0.16 - 2,
    width: winWidth * 0.3},
  textBienvenue: {
    fontSize: SIZES.h3,
    color: COLORS.white,
    width: '70%',
    height: '100%',
    paddingHorizontal: 0,
    paddingVertical: winWidth * 0.08},
  displayCenterVertical: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'},
  displayCenterHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'},
  displayLeftHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'},
  childFlexCenterHorizontal: {
    flex: 1,
    alignSelf: 'center'},

  content: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row'},

  button: {
    height: 56,
    width: 363,
    left: 24,
    top: 312,
    borderRadius: 16,
    padding: 16},
  buttonHome: {
    paddingHorizontal: 8,
    height: 56,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center'},
  buttonActions: {
    paddingRight: SIZES.padding2,
    height: 56,
    borderRadius: SIZES.radius,
    flexDirection: 'row-reverse',
    backgroundColor: COLORS.secondary,
    justifyContent: 'space-between',
    alignItems: 'center'},
  buttonHomeActionsaisir: {
    paddingHorizontal: 8,
    height: 56,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center'},
  buttonHomeExport: {
    paddingHorizontal: 8,
    height: 56,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center'},
  bigBtnTxt: {
    fontSize: SIZES.body3,
    color: COLORS.white,
    fontFamily: 'Oxygen',
    fontWeight: '700'},
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
    paddingHorizontal: 10},
  tagNav: {
    color: COLORS.black,
    fontSize: SIZES.h5,
    fontFamily: 'IBMPlexSans-SemiBold'},
  wrapPost: {
    // padding: SIZES.padding2,
    padding: 12,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding2,
    borderWidth: 1,
    borderColor: COLORS.gray_border},
  customDate: {
    fontSize: SIZES.body5,
    fontFamily: 'Oxygen-Bold',
    color: COLORS.secondary},
  customPost: {
    fontSize: SIZES.body4,
    fontFamily: 'Oxygen-Regular',
    color: COLORS.black,
    letterSpacing: 0.2,
    lineHeight: SIZES.padding2},
  wrapItem: {
    paddingVertical: SIZES.padding,
    // backgroundColor: 'green',
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderTopColor: COLORS.gray_border},
  titleItem: {
    color: COLORS.black,
    fontSize: SIZES.body3,
    fontFamily: 'Oxygen-Bold'},
  descrItem: {
    color: COLORS.black,
    fontSize: SIZES.body5,
    fontFamily: 'Oxygen-Light',
    minHeight: 40,
    lineHeight: 40},
  libreButtom: {
    height: 32,
    lineHeight: 28,
    paddingHorizontal: SIZES.padding2,
    borderRadius: 8,
    color: COLORS.white,
    fontSize: SIZES.body5,
    marginRight: SIZES.padding2},
  bkgBlue: {
    backgroundColor: COLORS.primary},
  bkgOrange: {
    backgroundColor: COLORS.orange},
  oxygenBold: {
    fontFamily: 'Oxygen-Bold'},
  text: {
    fontFamily: 'IBMPlexSans-SemiBold',
    color: COLORS.black,
    fontSize: SIZES.h5,
    textAlign: 'center'},
  card_template: {
    width: winWidth * 0.58,
    height: winWidth * 0.3,
    marginRight: SIZES.padding2,
    marginTop: 6,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    borderRadius: winWidth * 0.03,
    padding: winWidth * 0.046},

  title: {
    fontFamily: 'Oxygen',
    fontWeight: '700',
    fontSize: 16,
    color: '#00003E'},

  navbarBtn: {
    width: 100,
    height: 20,
    borderColor: COLORS.gray_border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 5,
    marginRight: 10,
    paddingLeft: 10},

  textBtn: {
    color: 'red',
    fontFamily: 'Oxygen',
    fontSize: 12},

  textList: {
    fontFamily: 'IBM Plex Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    color: COLORS.secondary,
    marginBottom: 5},

  duration: {
    color: COLORS.secondary,
    fontFamily: 'IBM Plex Sans',
    fontStyle: 'normal',
    fontWeight: 'normal'},

  list: {
    display: 'flex',
    flexDirection: 'row',
    borderStyle: 'dashed',
    borderColor: COLORS.gray_line,
    borderWidth: 1,
    paddingTop: 15},

  image: {
    width: 48,
    height: 48,
    borderRadius: 6,
    flex: 0},
  simpleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: SIZES.padding4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray_border,
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    marginBottom: SIZES.padding4},
  activeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: SIZES.padding4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    marginBottom: SIZES.padding4,
    backgroundColor: COLORS.blue_back},
  textMenu: {
    fontFamily: 'Oxygen-Bold',
    fontSize: SIZES.body5,
    color: COLORS.black},
  textMenuActive: {
    fontFamily: 'Oxygen-Bold',
    fontSize: SIZES.body5,
    color: COLORS.primary},

  card_title: {
    fontFamily: 'Oxygen-Bold',
    color: COLORS.white,
    fontSize: SIZES.h5,
    paddingLeft: winWidth * 0.03,
    width: winWidth * 0.58 - 76,
    justifyContent: 'center'},
  jobPlace: {
    fontFamily: 'Oxygen-Regular',
    fontSize: SIZES.body5,
    color: COLORS.white,
    paddingLeft: winWidth * 0.03,
    width: winWidth * 0.58 - 66},
  candidatExp: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'Oxygen',
    letterSpacing: 0.2,
    flex: 12},
  favorisView: {position: 'absolute', right: 0},
  favorisImage: {
    width: 19.5,
    height: 18},
  footerFrame: {
    flexDirection: 'row',
    marginTop: 32,
    width: winWidth * 0.75},
  jobPlaceItem: {
    fontFamily: 'Oxygen-Regular',
    fontSize: SIZES.body5,
    color: COLORS.black,
    width: winWidth - 86},
  jobDate: {
    flex: 1,
    flexBasis: '100%',
    fontFamily: 'Oxygen-Regular',
    fontSize: SIZES.body5,
    color: COLORS.white,
    marginTop: SIZES.padding3},
  jobDateItem: {
    flex: 1,
    flexBasis: '100%',
    fontFamily: 'Oxygen-Regular',
    fontSize: SIZES.body5,
    color: COLORS.secondary,
    marginTop: 10},
  wrapperText: {
    width: winWidth * 0.58 - 86,
    flex: 1,
    paddingRight: 20},
  wrapperTextItem: {
    width: winWidth - 100,
    flex: 0,
    paddingRight: 10,
    paddingLeft: 10},
  listItemOffer: {
    marginVertical: 10,
    overflow: 'scroll'},
  card_templateItem: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: winWidth * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.blue_border,
    borderStyle: 'dashed'},
  wapperTitle: {
    height: 50,
    justifyContent: 'center',
    marginTop: 10}});

;
import { COLORS, SIZES } from '../../../../../resources/constants';
let windowDim = window.innerWidth;

export const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8},
  buttonBack: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center'},
  titleh2: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: SIZES.h3,
    paddingTop: 15},
  titleh2Container: {
    height: 50,
    justifyContent: 'center'},
  text1_2: {
    height: 30,
    fontWeight: 'bold',
    fontSize: SIZES.h5,
    color: COLORS.secondary},
  inputWrap: {
    borderWidth: 1,
    borderColor: COLORS.blue_border,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    paddingLeft: 10,
    paddingVertical: 0,
    marginHorizontal: 25
  },
  dart: {
    width: 16,
    height: 15,
    backgroundColor: '#F0F9FF'},
  paragraph: {
    fontSize: SIZES.h5,
    color: COLORS.gray_title},
  card_template: {
    width: windowDim * 0.58,
    height: windowDim * 0.3,
    marginRight: SIZES.padding2,
    marginTop: 6,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    borderRadius: windowDim * 0.03,
    padding: windowDim * 0.046
  },

  title: {
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
    fontSize: 12},

  textList: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    color: COLORS.secondary,
    marginBottom: 5},

  duration: {
    color: COLORS.secondary,
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
    fontWeight: 'bold',
    fontSize: SIZES.body5,
    color: COLORS.black},
  textMenuActive: {
    fontWeight: 'bold',
    fontSize: SIZES.body5,
    color: COLORS.primary},

  card_title: {
    fontWeight: 'bold',
    color: COLORS.white,
    fontSize: SIZES.h5,
    paddingLeft: windowDim * 0.03,
    width: windowDim * 0.58 - 76,
    justifyContent: 'center'},
  jobPlace: {
    fontSize: SIZES.body5,
    color: COLORS.white,
    paddingLeft: windowDim * 0.03,
    width: windowDim * 0.58 - 66},
  candidatExp: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0.2,
    flex: 12},
  favorisView: {position: 'absolute', right: 0},
  favorisImage: {
    width: 19.5,
    height: 18},
  footerFrame: {
    flexDirection: 'row',
    marginTop: 32,
    width: windowDim * 0.75},
  jobPlaceItem: {
    fontSize: SIZES.body5,
    color: COLORS.black,
    width: windowDim - 86},
  jobDate: {
    flex: 1,
    flexBasis: '100%',
    fontSize: SIZES.body5,
    color: COLORS.white,
    marginTop: SIZES.padding3},
  jobDateItem: {
    flex: 1,
    flexBasis: '100%',
    fontSize: SIZES.body5,
    color: COLORS.secondary,
    marginTop: 10},
  wrapperText: {
    width: windowDim * 0.58 - 86,
    flex: 1,
    paddingRight: 20},
  wrapperTextItem: {
    width: windowDim - 100,
    flex: 0,
    paddingRight: 10,
    paddingLeft: 10},
  listItemOffer: {
    marginVertical: 10,
    overflow: 'scroll'},
  blue_container: {
    flexDirection: 'column',
    backgroundColor: COLORS.blue_back},
  card_templateItem: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: windowDim * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.blue_border,
    borderStyle: 'dashed'},
  wapperTitle: {
    height: 50,
    justifyContent: 'center',
    marginTop: 10},
  containers: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    boxShadow: 'none',
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    backgroundColor: 'white'
  },
  containt: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: COLORS.secondary},
  vtitle: {
    marginBottom: 16},
  bigBtnTxt: {
    fontSize: SIZES.body3,
    color: COLORS.white,
    fontWeight: 'bold',
    paddingLeft: 20},
  txtDetails: {
    fontSize: SIZES.padding2,
    color: COLORS.black,
    lineHeight: 24,
    fontStyle: 'normal',
    // width: windowDim - 48,
    paddingRight: 8},
  offerSpace: {
    marginTop: 24},
  offerTitle: {
    fontSize: SIZES.h2,
    color: COLORS.black,
    alignItems: 'center'
  },
  offerPosition: {
    height: windowDim * 0.05,
    justifyContent: 'center'},

  candidatIdentity: {
    backgroundColor: '#f0f9ff',
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20
  },
  candidatIdentityName: {
    color: '#01129e',
    fontSize: 18},
  offerActions: {
    paddingRight: SIZES.padding2,
    marginHorizontal: 40,
    height: 52,
    borderRadius: SIZES.radius,
    flexDirection: 'row-reverse',
    backgroundColor: COLORS.orange,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden'},
  buttonActions: {
    paddingRight: SIZES.padding2,
    marginHorizontal: 40,
    height: 52,
    borderRadius: SIZES.radius,
    flexDirection: 'row-reverse',
    backgroundColor: '#01129E',
    justifyContent: 'space-between',
    alignItems: 'center'},
  buttonActionsOrange: {
    paddingRight: SIZES.padding2,
    height: 52,
    borderRadius: SIZES.radius,
    flexDirection: 'row-reverse',
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center',
    gap:16
  },
  compatibilityContainer: {
    backgroundColor: '#01129e',
    padding: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center'},
  compatibilityItem: {
    flex: 1,
    alignItems: 'center'},
  candidateAboutContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopColor: COLORS.blue_border,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    marginHorizontal: 24,
    paddingTop: 24},
  candidateAboutItem: {
    width: '50%'},
  candidateExpContainer: {
    padding: SIZES.padding},
  candidateExpTitle: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: 'bold',
    lineHeight: 24,
    fontStyle: 'normal',
    marginBottom: 16,
    letterSpacing: 0.15},
  candidatExpItem: {
    paddingTop: 20,
    flexDirection: 'row'},
  viewBlue: {
    marginTop: 8},
  viewText: {
    marginHorizontal: 10},
  pointBlue: {
    width: 8,
    height: 8},
  compatibilityBtnContainer: {
    marginHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f0f9ff',
    alignItems: 'center'},
  compatibilityBtnTitle: {
    marginBottom: 40}});

import { COLORS, SIZES } from '../../../../resources/constants';

const Colors = {
  mBackColor: '#efefef',
  mBorderColor: '#efefef',
  white: '#FFFFFF',
  shadowColor: '#A69E9E'
};

const Metrics = {
  containerWidth: 600,
  switchWidth: 200
};

const styles = {
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
    elevation: 5
  },
  webformContain: {
    padding: 20,
    backgroundColor:COLORS.white,
    marginTop:60,
    borderRadius:10
  },
  ContactButtonContainer: {
    elevation: 8,
    backgroundColor: '#01129E',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  containerTerms: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginTop: 20
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  checkBoxContaint: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30,
    alignContent:'center'
  },
  checkBoxText: {
    color: 'black',
    marginLeft: 3,
    marginTop: 8
  },
  linkTerms: {
    color: '#007bff'
  },
  checkBox: {
    // backgroundColor: 'red',
    color: 'red',
    tintColor: 'red',
    borderColor: 'red',
    shadowColor: 'red',
    overlayColor: 'red'
  },
  alignSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%'
  },
  titleGroup: {
    fontSize: SIZES.h5,
    color: COLORS.black,
    alignItems: 'center'
  },
  ContactButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  formContainer: {
    padding: 8,
    flex: 1
  },
  buttonHomeActionsaisir: {
    paddingHorizontal: 8,
    height: 56,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bigBtnTxt: {
    fontSize: SIZES.body3,
    color: COLORS.white,
    fontWeight: '700'
  },
  containerTitle: {
    backgroundColor: COLORS.blue_focused,
    height: 72,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: SIZES.padding
  },
  titleItem: {
    color: COLORS.secondary,
    fontSize: SIZES.h4,
    fontWeight: 'bold'
  },
  displayHorizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  button: {
    margin: 15,
    color: '#fff',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#69bbea'
  },
  container: {
    paddingHorizontal: 0
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
    color: '#c0cbd3'
  },
  info: {
    backgroundColor: 'black',
    width: 20,
    borderRadius: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  colorWhite: {
    zIndex: 9999,
    color: 'white'
  },
  App: {
    textAlign: 'left',
    paddingTop: 10
  },
  titleBtn: {
    fontSize: SIZES.h5,
    fontWeight: 'bold',
    color: COLORS.black
  },
  label: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black'
  },
  bold: {
    fontWeight: 'bold'
  },
  textError: {
    color: '#f00',
    fontSize: 14
  },
  item: {
    marginBottom: 14
  },
  btnAnnuler: {},
  btnValider: {
    paddingHorizontal: 24},

  // --------------------------

  // Current Screen
  CurrentScreenContainer: {
    marginTop: 24,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  currentActive: {
    backgroundColor: COLORS.orange,
    borderWidth: 0
  },
  currentInactive: {
    backgroundColor: COLORS.white
  },
  // Styles for all current style
  CurrentScreenStyle: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    borderWidth: 1,
    borderColor: COLORS.gray_borderLight
  },
  CurrentScreenBtnCurrent: {
    color: COLORS.primary,
    backgroundColor: COLORS.blue_back,
    fontWeight: 'bold'
  },
  CurrentScreenBtnFinished: {
    color: COLORS.primary,
    backgroundColor: COLORS.blue_back,
    fontWeight: 'bold'
  },
  CurrentScreenBtnCreate: {
    color: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.gray_border,
    fontWeight: 'bold',
    backgroundColor: COLORS.white
  },
  textMenu: {
    fontWeight: 'bold',
    fontSize: SIZES.body3
  },
  textSousMenu: {
    fontSize: SIZES.body3
  },
  // --------------------------

  // header here
  headerScreenContainer: {
    backgroundColor: '#2ca5ff',
    paddingVertical: 20,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerScreenTextContainer: {
    width: '70%'
  },
  headerScreenImage: {},
  headerScreenTitle: {
    color: 'white'},
  // headerScreenDescription: {
  //   color: 'white',
  // },
  // ---------------------------

  // Current residence
  currentResidence: {
    backgroundColor: '#f0f9ff',
    padding: 20,
    marginVertical: 24,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.blue_border
  },
  inputWrap: {
    borderWidth: 1,
    borderColor: COLORS.blue_border,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    paddingLeft: 10,
    backgroundColor: COLORS.white
  },
  headerform: {
    backgroundColor: COLORS.blue_back,
    height: 84,
    flexDirection: 'column',
    justifyContent: 'center',
    // width: width,
    // marginLeft: -24,
    // position: 'absolute'
  },
  footerForm: {
    // backgroundColor: COLORS.blue_back,
    height: 84,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    // marginLeft: -24,
    // position: 'absolute'
  },
  submitJob: {
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: COLORS.secondary,
    alignSelf: 'flex-end',
    alignItems: 'center',
    // marginRight: 24,
    justifyContent: 'space-between',
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  textButton: {
    fontSize: SIZES.h5,
    color: COLORS.white,
    fontWeight: 'bold'
  },
  elevationBlue2: {
    elevation: 8,
    shadowColor: COLORS.secondary,
    opacity: 1,
    shadowOffset: {
      width: 0,
      height: 8},
    shadowOpacity: 0.6,
    shadowRadius: 12
  },
  elevationBlue: {
    elevation: 12,
    shadowColor: COLORS.secondary,
    opacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    marginVertical: 4
  },
  elevationOrange: {
    elevation: 12,
    shadowColor: COLORS.orange,
    opacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    marginVertical: 4},

  // Bouton remove
  btnRemoveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'},

  btnRemoveTitle: {
    fontSize: SIZES.h5,
    fontWeight: 'bold',
    color: COLORS.black},

  btnRemove: {
    backgroundColor: COLORS.secondary,
    height: 32,
    width: 32,
    borderRadius: 32,
    color: COLORS.white,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  textIput: {
    fontSize: SIZES.h5,
    color: COLORS.black,
    fontWeight: 'bold',
    height: 38,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginBottom: 0
  },
  buttonCv: {
    backgroundColor: '#000099',
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems:'center'
  },
  buttonIcons: {
    height: 25,
    width: 25,
    objectFit:'contain'
  }
};

export default styles;

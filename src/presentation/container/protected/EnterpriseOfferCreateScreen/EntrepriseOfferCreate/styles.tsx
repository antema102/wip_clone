import { COLORS, SIZES } from '../../../../../resources/constants';
const {width} = Dimensions.get('window');

const windowDim = window.innerWidth;

const Colors = {
  mBackColor: '#efefef',
  mBorderColor: '#efefef',
  white: '#FFFFFF',
  shadowColor: '#A69E9E'};

// const Metrics = {
//   containerWidth: width - 30,
//   switchWidth: width / 2.7,
// };
export const styles = {
  formContainer: {
    padding: 8,
    flex: 1
  },
  displayHorizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  titleGroup: {
    fontWeight: 'bold',
    fontSize: SIZES.h5,
    color: COLORS.black,
    alignItems: 'center'},containers: {
    width: '100%',
    padding: SIZES.padding,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5},
  // containers: {
  //   width: Metrics.containerWidth,
  //   height: 55,
  //   flexDirection: 'row',
  //   backgroundColor: Colors.mBackColor,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderWidth: 1,
  //   borderColor: Colors.mBorderColor,
  //   borderRadius: 27.5,
  // },
  // button: {
  //   margin: 15,
  //   color: '#fff',
  //   padding: 10,
  //   paddingLeft: 30,
  //   paddingRight: 30,
  //   backgroundColor: '#69bbea',
  // },
  container: {
    marginVertical: 8
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
    paddingTop: '10px'
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
    paddingHorizontal: 24,
    // minWidth: 120
  },

  button: {
    borderRadius: 20,
    paddingHorizontal: 40
  },
  fullFlex: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    // width: width - 50,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heightForm: {
    height: width * 0.16
  },
  heightBanner: {
    height: width * 0.26
  },
  buttonOrange: {
    backgroundColor: COLORS.orange,
    borderRadius: SIZES.radius,
    paddingHorizontal: 24,
    height: 48
  },
  labelWhite: {
    color: COLORS.white,
    lineHeight: 48,
    fontFamily: 'Oxygen',
    fontSize: 14,
    fontWeight: 'bold'
  },
  shadowOrange: {
    shadowColor: '#FE6D02',
    shadowOffset: {
      width: 1,
      height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 5
  },
  inputWrap: {
    borderWidth: 1,
    borderColor: COLORS.blue_border,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    paddingLeft: 10,
    paddingVertical: 0
  },
  borderForm: {
    borderWidth: 1,
    borderColor: COLORS.blue_border,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    paddingLeft: 10,
    backgroundColor: COLORS.white
  },
  textInput: {
    fontSize: SIZES.h5,
    color: COLORS.black,
    fontFamily: 'Oxygen-Bold',
    height: 38,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginBottom: 0
  },
  screenContainer2: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20
  },
  buttonAnnuler: {
    height: 50,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.blueInput,
    marginBottom: SIZES.padding2,
    width: 200
  },
  textBtnSecondary: {
    color: COLORS.blueInput,
    fontWeight: 'bold',
    fontSize: SIZES.h5
  },
  buttonAnnuler2: {
    height: 50,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginBottom: SIZES.padding2,
    width: 200,
    position: 'absolute',
    right: 0,
    top: 20
  },
  textBtnSecondary2: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.h5
  }
};
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../../../../../resources/constants';

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  containerForm: {
    width: windowWidth - 48,
    flex: 1,
    bottom: 50,
    top: 0,

  }, containers: {
    width: '100%',
    padding: SIZES.padding,
    borderRadius: 10,
    shadowColor: '#000',
    paddingTop:64,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    fontFamily: 'Oxygen-Regular'
  },
  pageContainer: {
    height: windowHeight * 1,
    width: '100%',
    paddingHorizontal: SIZES.padding,
    paddingTop: 30,
    paddingBottom: 40,
    // marginBottom: 0,
    overflow: 'scroll'
  },
  containt: {},
  vtitle: {
    width: windowWidth,
  },
  headerScreenDescription: {
    color: 'white',
  },
  candidateContainer: {},
  title: {},
  candidateImgContainer: {},
  candidateDetailsContainer: {},
  candidateBtnContainer: {},
  candidatImg: {},
  candidatName: {},
  candidatPost: {},
  candidatExp: {},
  footerContainer: {},
  footerScreenLabel: {},
  footerScreenBtn: {},
  smallBtnTxt: {},
  smallButtonContainer: {},

  // ---------------------------------------------------------
  defaultCriterion: {},
  minusBtn: {
    width: '100%',
  },
  namedSwitchField: {},

  layerContainer: {
    width: '100%',
  },
  layerTitleContainer: {},
  fullWidth: {
    width: windowWidth - 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerForm: {
    backgroundColor: COLORS.blue_back,
    height: 84,
    flexDirection: 'column',
    justifyContent: 'center',
    width: windowWidth,
    marginLeft: -24,
  },
  footerFormLarge: {
    backgroundColor: COLORS.blue_back,
    height: 84,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth,
    paddingHorizontal: SIZES.padding,
    marginLeft: -24,
  },
  submitJob: {
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: COLORS.secondary,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: SIZES.radius,
    flexDirection: 'row',
  },
  submitJobSimple: {
    height: 52,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textButton: {
    fontSize: SIZES.h5,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  textButtonOrange: {
    color: COLORS.orange,
    fontSize: SIZES.h5,
    fontWeight: 'bold',
  },
  iconReload: {
    width: 16,
    height: 16,
    marginLeft: 6,
  },
  reinit: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.orange,
  },
  footerFormLargeSec: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  contentForm: {
    flex: 0.7,
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
    alignItems: 'center',
  },

});

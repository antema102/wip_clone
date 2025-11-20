import {StyleSheet, Dimensions} from 'react-native';

let windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  containers: {
  },
  containt: {
  },
  vtitle: {
  },
  headerContainer: {
    padding: 24,
    backgroundColor: '#2ca5ff',
    height: windowWidth * 0.25,
    maxHeight: 112,
  },
  headerScreenTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'oxygen',
  },
  headerScreenDescription: {
    color: 'white',
  },
  candidateContainer: {
    // borderBottomColor: COLORS.blue_border,
    // borderBottomWidth: 1,
    // borderStyle: 'dashed',
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    // marginTop: 16,
    // marginHorizontal: 16,
    // flexDirection: 'row',
  },
  title: {
    // fontSize: 32,
  },
  candidateImgContainer: {
    // flex: 1,
  },
  candidateDetailsContainer: {
    // flex: 2,
  },
  candidateBtnContainer: {
    // flex: 2,
    // maxWidth: 128,
  },
  candidatImg: {
    // width: 50,
    // height: 50,
    // borderRadius: SIZES.radiusTwo,
  },
  candidatName: {
    // fontSize: 16,
    // color: COLORS.black,
    // fontWeight: 'bold',
    // fontFamily: 'Oxygen',
    // height: windowWidth * .07,
  },
  candidatPost: {
    // fontSize: 12,
    // color: COLORS.black,
    // fontWeight: 'normal',
    // fontFamily: 'Oxygen',
    // letterSpacing: .2,
    // height: windowWidth * .04,
  },
  candidatExp: {
    // fontSize: 12,
    // color: COLORS.primary,
    // fontWeight: 'normal',
    // fontFamily: 'Oxygen',
    // letterSpacing: .2,
    // marginTop: 20,
  },
  footerContainer: {
    // backgroundColor: COLORS.blue_back,
    // height: 84,
    // paddingLeft: 40,
    // paddingRight: 24,
    // paddingVertical: 0,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  footerScreenLabel: {
    // alignSelf: 'center',
    // fontSize: SIZES.body3,
    // fontFamily: 'IBMPlexSans-SemiBold',
    // color: COLORS.secondary,
  },
  footerScreenBtn: {},
  smallBtnTxt: {
    // fontSize: SIZES.body5,
    // color: COLORS.white,
    // fontFamily: 'Oxygen',
    // fontWeight: '700',
  },
  smallButtonContainer: {
    // height: 32,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: SIZES.radiusTwo,
  },

  // ---------------------------------------------------------
  defaultCriterion: {
    // backgroundColor: '#f0f9ff',
    // borderRadius: 16,
    // padding: 16,
    // marginTop: 16,
  },
  minusBtn: {
    // paddingBottom: 2,
    // paddingHorizontal: 10,
    // borderRadius: 20,
  },
  namedSwitchField: {
    // marginTop: 20,
    // borderWidth: 1,
    // borderColor: '#dae7f1',
    // borderRadius: 16,
    // paddingLeft: 20,
  },

  // ---------------------------------------------------------
  // Refine Candidats
  // ----------------
  refineContainer: {
    // paddingBottom: 100,
    padding: 20,
  },
  layerContainer: {
    padding: 20,
    // margin: 20,
    backgroundColor: 'blue',
    borderWidth: 5,
    borderColor: 'red',
    borderRadius: 16,
    height: '100%',
    width: '100%',
  },
  iconSliders:{
    height:24,
    width:24,
    resizeMode:'cover',
  },
  layerTitleContainer: {
    // marginTop: 20,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // paddingVertical: 16
  },
});

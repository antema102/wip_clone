import {StyleSheet, Dimensions} from 'react-native';
import { COLORS, SIZES } from '../../../../resources/constants';

let windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  containers: {
    height: '100%',
    width: '100%',
  },
  containt: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
  },
  vtitle: {
    marginBottom: 16,
  },
  badgeContainer: {
    backgroundColor: COLORS.badge_color,
    paddingBottom: 20,
    height: 30,
    width: 130,
    flexDirection: 'row'
  },
  headerContainer: {
    padding: 24,
    backgroundColor: '#2ca5ff',
    height: windowWidth * 0.25,
    maxHeight: 112,
  },
  recommmandationBadge: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginTop: 3,
  },
  headerScreenTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerScreenDescription: {
    color: 'white',
  },
  candidateContainer: {
    // paddingTop: 20,
    // marginVertical: -50,
    // marginHorizontal: 16,
    flexDirection: 'row',
  },
  title: {
    fontSize: 32,
  },
  candidateImgContainer: {
  },
  candidateDetailsContainer: {
    flex: 2,
  },
  candidateBtnContainer: {
    flex: 2,
    maxWidth: 150,
    top: 20
  },
  candidatImg: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radiusTwo,
    marginRight:16
  },
  candidatName: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  candidatPost: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: 'normal',
    letterSpacing: 0.2,
    // height: windowWidth * 0.04,
  },
  candidatExp: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: 'normal',
    letterSpacing: 0.2,
    marginTop: 20,
  },
  footerContainer: {
    backgroundColor: COLORS.blue_back,
    height: 84,
    paddingLeft: 40,
    paddingRight: 24,
    paddingVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerScreenLabel: {
    alignSelf: 'center',
    fontSize: SIZES.body3,
    fontFamily: 'IBMPlexSans-SemiBold',
    color: COLORS.secondary,
  },
  footerScreenBtn: {},
  smallBtnTxt: {
    fontSize: 11,
    color: COLORS.white,
    fontWeight: '700',
    padding: 8
  },
  smallButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radiusTwo,
  },

  // ---------------------------------------------------------
  // Refine Candidats
  // ----------------
  refineContainer: {
    flex: 1,
  },
  layerContainer: {},
  layerTitleContainer: {},
});

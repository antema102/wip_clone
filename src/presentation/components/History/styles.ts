import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../../../resources/constants';

let largeurFenetre = Dimensions.get('window').width;

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
  headerContainer: {
    padding: 24,
    backgroundColor: '#2ca5ff',
    height: largeurFenetre * 0.25,
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
    borderBottomColor: COLORS.blue_border,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    paddingHorizontal: 10,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  title: {
    fontSize: 32,
  },
  candidateImgContainer: {
    flex: 1,
    marginRight: 10,
  },
  candidateDetailsContainer: {
    flex: 2,
  },
  candidateBtnContainer: {
    flex: 2,
    maxWidth: 128,
  },
  candidatImg: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radiusTwo,
  },
  candidatName: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  candidatPost: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: 'normal',
    letterSpacing: 0.2,
  },
  historyplace: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: 'normal',
    fontFamily: 'Oxygen',
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  candidatExp: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: 'normal',
    fontFamily: 'Oxygen',
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
    fontSize: SIZES.body5,
    color: COLORS.white,
    fontFamily: 'Oxygen',
    fontWeight: '700',
  },
  smallButtonContainer: {
    height: 32,
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

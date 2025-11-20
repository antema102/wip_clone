import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, SIZES} from '../../../../resources/constants';

let windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  containers: {},
  containt: {},
  vtitle: {},
  headerContainer: {
    padding: 24,
    backgroundColor: COLORS.primary,
    height: windowWidth * 0.25,
    maxHeight: 112,
  },
  headerScreenTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Oxygen-Bold',
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
  minusBtn: {},
  namedSwitchField: {},

  // ---------------------------------------------------------
  // Refine Candidats
  // ----------------
  refineContainer: {
    padding: 20,
  },
  layerContainer: {
    padding: 20,
    borderWidth: 5,
    borderRadius: SIZES.radius,
    width: '100%',
  },
  layerTitleContainer: {},
});

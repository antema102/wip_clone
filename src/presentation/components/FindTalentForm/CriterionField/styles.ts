import {StyleSheet, Dimensions} from 'react-native';
import { COLORS, SIZES } from '../../../../resources/constants';

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
  withoutSwitch: {
    flexDirection: 'row',
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
    backgroundColor: 'blue',
    borderWidth: 5,
    borderColor: 'red',
    borderRadius: 16,
    height: '100%',
    width: '100%',
  },
  layerTitleContainer: {},
  titleGroup: {
    fontSize: SIZES.h5,
    color: COLORS.black,
    alignItems: 'center',
  },
  alignSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%'
  },
  contentChamp: {
    minHeight: 56,
  },
});

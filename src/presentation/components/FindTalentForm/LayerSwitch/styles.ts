import { COLORS } from '../../../../resources/constants';

let windowWidth = window.innerWidth;

export const styles = {
  containers: {},
  containt: {},
  vtitle: {},
  headerContainer: {
    padding: 24,
    backgroundColor: COLORS.primary,
    height: windowWidth * 0.25,
    maxHeight: 112
  },
  headerScreenTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: 'Oxygen-Bold'
  },
  headerScreenDescription: {
    color: 'white'
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
    padding: 20
  },
  layerContainer: {
    padding: 20,
    backgroundColor: 'blue',
    borderWidth: 5,
    borderColor: 'red',
    borderRadius: 16,
    height: '100%',
    width: '100%'
  },
  layerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10
  },
  imgContainer: {
    backgroundColor: COLORS.secondary,
    width: 32,
    height: 32,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconMoins: {
    width: 20,
    height: 20
  },
  iconPlus: {
    width: 20,
    height: 20
  }
};
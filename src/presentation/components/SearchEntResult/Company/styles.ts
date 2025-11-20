;
import { COLORS, SIZES } from '../../../../resources/constants';

let windowWidth = window.innerWidth;

export const styles = {
  containers: {
    height: '100%',
    width: '100%'},
  containt: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: COLORS.secondary},
  vtitle: {
    marginBottom: 16},
  headerContainer: {
    padding: 24,
    backgroundColor: '#2ca5ff',
    // height: windowWidth * 0.25,
    maxHeight: 112},
  headerScreenTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'},
  headerScreenDescription: {
    color: 'white'},
  candidateContainer: {
    borderStyle: 'dashed',
    gap:16
  },
  title: {
    fontSize: 32},
  candidateImgContainer: {
  },
  candidateDetailsContainer: {
    flex: 1},
  detailsContainer: {
    flex: 1},
  candidatImg: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radiusTwo},
  candidatName: {
    fontSize: SIZES.h5,
    color: COLORS.black,
    fontWeight: 'bold',
    // height: windowWidth * 0.07},
  candidatPost: {
    fontSize: SIZES.body5,
    color: COLORS.black,
    letterSpacing: 0.2,
    maxWidth:400,
    lineHeight:20,
    marginTop:4
  },
  footerContainer: {
    backgroundColor: COLORS.blue_back,
    height: 84,
    paddingLeft: 40,
    paddingRight: 24,
    paddingVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'},
  footerScreenLabel: {
    alignSelf: 'center',
    fontSize: SIZES.body3,
    color: COLORS.secondary},
  footerScreenBtn: {},
  smallBtnTxt: {
    fontSize: SIZES.body5,
    color: COLORS.white,
    fontWeight: 'bold'},

  // compatibility
  compatibilityContainer: {
    flexDirection: 'row',
    marginBottom: SIZES.padding,
    marginTop: SIZES.padding2},
  compatibilityBtn: {
    paddingHorizontal: 10,
    height: 28,
    borderRadius: SIZES.radiusTwo,
    textAlign: 'center',
    marginRight: SIZES.padding6,
    color: COLORS.white,
    lineHeight: 28},
  compatibilityBtnBlue: {
    paddingHorizontal: 10,
    height: 28,
    borderRadius: SIZES.radiusTwo,
    textAlign: 'center',
    marginRight: 0,
    color: COLORS.primary,
    lineHeight: 28},
  smallButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radiusTwo,
    padding: 4
  },
  candidateBtnContainer: {
    flex: 2,
    maxWidth: 160
  },

  // ---------------------------------------------------------
  // Refine Candidats
  // ----------------
  refineContainer: {
    flex: 1},
  layerContainer: {},
  layerTitleContainer: {}});

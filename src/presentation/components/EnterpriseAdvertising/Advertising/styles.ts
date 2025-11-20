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
    // borderBottomColor: COLORS.blue_border,
    // borderBottomWidth: 1,
    // borderStyle: 'dashed',
    width: '100%', 
   // flexDirection: 'row'},
  title: {
    fontSize: 32},
  candidateImgContainer: {
    //flex: 1},
  candidateDetailsContainer: {
    flex: 1
    //flex: 5},

  candidatImg: {
    width: 80,
    height: 80,
    borderRadius: 4},
  candidatName: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: 'bold',
    height: 30},
  candidatPost: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: 'normal',
    letterSpacing: 0.2,
    height: 30},
  candidatExp: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0.2,
    flex: 12},
  favorisView:{
    position: 'absolute',
    right: 0},

  favorisImage: {
    width: 30.5,
    height: 28},
  footerFrame: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginLeft:60,
    height:30
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
    fontWeight: 'bold',
    color: COLORS.secondary},
  footerScreenBtn: {},
  smallBtnTxt: {
    fontSize: SIZES.body5,
    color: COLORS.white,
    fontWeight: '700'},
  smallButtonContainer: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radiusTwo},

  // ---------------------------------------------------------
  // Refine Candidats
  // ----------------
  refineContainer: {
    flex: 1},
  layerContainer: {},
  layerTitleContainer: {}});

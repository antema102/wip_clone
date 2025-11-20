import { COLORS, SIZES } from '../../../../resources/constants';

let windowWidth = window.innerWidth;

export const styles = {
  containers: {
    height: '100%',
    width: '100%'
  },
  containt: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: COLORS.secondary
  },
  vtitle: {
    marginBottom: 16
  },
  headerContainer: {
    padding: 24,
    backgroundColor: COLORS.primary,
    height: windowWidth * 0.25,
    maxHeight: 112
  },
  headerScreenTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  headerScreenDescription: {
    color: 'white'
  },
  candidateContainer: {
    borderBottomColor: "#rgba(51, 153, 255, 0.2)",
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginTop: 16,
    flexDirection: 'row'
  },
  title: {
    fontSize: 32
  },
  candidateImgContainer: {
    // width: windowWidth * 0.01,
    alignItems: 'flex-start'
  },
  candidateDetailsContainer: {
    // width: windowWidth * 0.84,
    marginLeft: '5%'
  },
  candidateBtnContainer: {
    flex: 2,
    maxWidth: 128
  },
  candidatImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 14
  },
  candidatName: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: 'bold',
    minHeight: 25,
    lineHeight: 16
  },
  candidatPost: {
    fontSize: 14,
    color: COLORS.black,
    letterSpacing: 0.2,
    height: 25
  },
  jobDate: {
    color:" rgba(0, 0, 0, 0.6)",
    fontStyle: 'normal',
    letterSpacing: 0.2,
    flex: 1
  },
  candidatExp: {
    fontSize: 12,
    color: COLORS.primary,
    letterSpacing: 0.2,
    marginTop: 20
  },
  footerContainer: {
    backgroundColor: COLORS.blue_back,
    height: 84,
    paddingLeft: 40,
    paddingRight: 24,
    paddingVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  footerScreenLabel: {
    alignSelf: 'center',
    fontSize: SIZES.body3,
    color: COLORS.secondary
  },
  footerScreenBtn: {},
  smallBtnTxt: {
    fontSize: SIZES.body5,
    color: COLORS.white,
    fontWeight: 'bold'
  },
  smallButtonContainer: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radiusTwo},

  // -----------------
  // Refine Candidats
  // ----------------
  refineContainer: {
    flex: 1
  },
  layerContainer: {},
  layerTitleContainer: {
  }
};
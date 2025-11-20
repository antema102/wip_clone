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
    backgroundColor: '#2ca5ff',
    // height: windowWidth * 0.25,
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
  companyContainer: {
    // borderBottomColor: COLORS.blue_border,
    // borderBottomWidth: 1,
    // borderStyle: 'dashed',
    // paddingVertical: 10,
    margin: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.vector_blue,
    padding: 24,
    borderRadius: 10,
    // marginHorizontal: 16,
    // // marginTop: 16,
    // // flexDirection: 'row'
  },
  candidateContainer: {
    // borderBottomColor: COLORS.blue_border,
    // borderBottomWidth: 1,
    // borderStyle: 'dashed',
    // paddingVertical: 10,
    marginHorizontal: 24,
    // // marginTop: 16,
    // // flexDirection: 'row'
  },
  candidateFavorite: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 32
  },
  candidateImgContainer: {
    //flex: 1
  },
  candidateDetailsContainer: {
    marginLeft: 24,
    maxWidth: 150},

  candidatImg: {
    width: 75,
    height:75,
    borderRadius: '50%'
  },
  candidatName: {
    color: COLORS.black,
    fontWeight: 'bold'
  },
  candidatPost: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: 'normal',
    letterSpacing: 0.2,
    top: 10
  },
  candidatExp: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0.2,
    paddingTop: 16,
    flex: 1
  },
  favorisView: {
    position: 'absolute',
    right: 0},

  favorisImage: {
    width: 20,
    height: 20,
    objectFit: 'contain' as const
  },
  footerFrame: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 60,
    marginRight: 10,
    height: 20
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
    fontWeight: 'bold',
    color: COLORS.secondary
  },
  footerScreenBtn: {},
  smallBtnTxt: {
    fontSize: SIZES.body5,
    color: COLORS.white,
    fontWeight: '700'
  },
  smallButtonContainer: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radiusTwo},

  // ---------------------------------------------------------
  // Refine Candidats
  // ----------------
  refineContainer: {
    flex: 1
  },
  layerContainer: {},
  layerTitleContainer: {
  }
};
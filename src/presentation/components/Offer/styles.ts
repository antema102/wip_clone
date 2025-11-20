import { COLORS, SIZES } from '../../../resources/constants';

let windowWidth = window.innerWidth;

export const styles = {
  containers: {
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
    height: windowWidth * 0.25,
    maxHeight: 112
  },
  headerScreenTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'oxygen'
  },
  headerScreenDescription: {
    color: 'white'
  },
  offerContainer: {
    marginTop: 24,
    marginBottom: 24,
    marginHorizontal: 24,
    flexDirection: 'column',
    paddingVertical: 62,
    paddingHorizontal: 34,
    backgroundColor: '#F5F5F5',
    borderRadius: 10
  },
  title: {
    fontSize: 32
  },
  candidateImgContainer: {
    flex: 1
  },
  candidateDetailsContainer: {
    flex: 2
  },
  offerBtnContainer: {
    flexDirection: 'row'
  },
  btnDetail: {
    marginTop: 16,
    paddingBottom: 16
  },
  btnDetailPostule: {
    marginRight: 10,
    marginTop: 16,
    // paddingBottom: 16,
    position: 'absolute',
    right: 0,
    bottom: 0},

  btnDetailtxtPostule: {},
  images: {
    height: 36,
    width: 36,
    objectFit: 'cover'
  },
  candidatName: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: 'bold'
  },
  candidatPost: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: 'normal',
    // height: windowWidth * 0.04},

  smallBtnTxt: {
    fontSize: SIZES.body4,
    color: COLORS.white,
    fontWeight: '700'
  },
  smallButtonContainer: {
    height: 46,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radiusTwo,
    paddingHorizontal: 8},

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
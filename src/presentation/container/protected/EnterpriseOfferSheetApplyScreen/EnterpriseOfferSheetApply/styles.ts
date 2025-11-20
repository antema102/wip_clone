import { COLORS, SIZES } from '../../../../../resources/constants';

let windowWidth = window.innerWidth;

export const styles = {
  containers: {
    width: '100%',
    height: '100%',
    padding: SIZES.padding,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    boxShadow: 'none',
    backgroundColor: 'l'
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
    fontWeight: 'bold'
  },
  headerScreenDescription: {
    color: 'white'
  },
  candidateAboutContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopColor: COLORS.blue_border,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    marginHorizontal: 24,
    paddingTop: 24
  },
  candidateAboutItem: {
    width: '50%',
    //paddingHorizontal: 20
  },
  candidateContainer: {
    borderBottomColor: COLORS.blue_border,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: 'row'
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
  candidateBtnContainer: {
    flex: 2,
    maxWidth: 128
  },
  candidatImg: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radiusTwo
  },
  candidatName: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: 'bold',
    height: windowWidth * 0.07
  },
  candidatPost: {
    fontSize: 12,
    color: COLORS.black,
    letterSpacing: 0.2,
    height: windowWidth * 0.04
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
  titleOfferList: {
    fontSize: 16
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
  layerTitleContainer: {},
  containerFormList: {
    width: windowWidth - 48
  },
  shadowButton: {
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 8},
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6
  },
  noEvents: {
    fontSize: 20,
    color: '#01129E',
    fontWeight: 'bold',
    lineHeight: 24,
    letterSpacing: 0.15,
    textAlign: 'center',
    paddingBottom: '25%',
    paddingTop: '25%'
  },
  contentImage:{
    flexDirection:'row',
    gap:8,
    alignItems:'center',
    paddingVertical:32
  },


  imageArrow:{
    height:16,
    width:16,
    objectFit:'contain'
  }
});

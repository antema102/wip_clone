import { COLORS, SIZES } from '../../../resources/constants';
const windowWidth = window.innerWidth;

export default {
  centeredView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 35,
    paddingHorizontal: 20,
    paddingBottom: 7,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#585757',
    marginVertical: 5,
  },
  linkStyle: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    textDecorationLine: 'underline',
    color: '#01129E',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Oxygen-Regular',
    color: COLORS.black,
  },
  imgLogo: {
    width: '100%',
    height: 400,
    objectFit: 'fill' as const,
  },
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
    height: windowWidth * 0.25,
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  title: {
    fontSize: 32,
  },
  candidateImgContainer: {
    flex: 1,
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
    fontFamily: 'Oxygen',
    height: windowWidth * 0.07,
  },
  candidatPost: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: 'normal',
    fontFamily: 'Oxygen',
    letterSpacing: 0.2,
    height: windowWidth * 0.04,
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
  containerFormList: {
    width: windowWidth,
  },
  item: {
    padding: 5,
    borderColor: COLORS.blue_border,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 16,
    marginHorizontal: 16,
  },
  itemDetails: {
    flexDirection: 'row',
  },
  textLabel: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: '#0088CC',
    paddingLeft: 10,
    marginVertical: 5,

    width: 80,
    fontFamily: 'Arial',
  },
  textValue: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.black,
    marginVertical: 5,
    paddingRight: 10,
    fontFamily: 'Arial',
  },
};

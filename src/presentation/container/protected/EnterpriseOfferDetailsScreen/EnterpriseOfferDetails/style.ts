import { COLORS, SIZES } from '../../../../../resources/constants';
const windowDimension = window.innerWidth;

export const styles = {
  containers: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // backgroundColor: COLORS.white
  },
  containt: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: COLORS.secondary
  },
  containeroffer: {
    borderRadius:20,
    flexDirection:'row',
    gap:24
  },
  avatarOffer: {
    borderRadius: '50%',
    overflow: 'hidden',
    height:125,
    width:125,
    borderWidth:1,
    borderColor:COLORS.text_input
  },
  avatarImg: {
    height: '100%',
    width: '100%'
  },
  contentOffer: {
    gap: 42,
    flex:1
  },
  headerOffer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center'
  },
  titleOffer: {
    marginBottom: 14,
    fontSize: windowDimension > 991 ? 20 : 14,
    fontWeight: '700'
  },
  subTitleOffer: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10
  },
  textSubOffer: {
    fontSize: 16,
    color: '#rgba(0, 0, 0, 0.2)'},

  vtitle: {
    marginBottom: 16
  },
  bigBtnTxt: {
    fontSize: SIZES.body3,
    color: COLORS.white,
    fontWeight: 'bold'
  },
  txtDetails: {
    fontSize: SIZES.padding2,
    color: COLORS.black,
    lineHeight: 24,
    fontStyle: 'normal',
    // width: windowDimension - 48,
    paddingRight: 8
  },
  offerSpace: {
    marginTop: 24
  },
  offerTitle: {
    fontSize: SIZES.h2,
    color: COLORS.black,
    alignItems: 'center'
  },
  offerPosition: {
    height:
      windowDimension <= 991 ? windowDimension * 0.2 : windowDimension * 0.05,
    justifyContent: 'center'},

  candidatIdentity: {
    paddingBottom: 20,
    backgroundColor: '#f0f9ff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  candidatIdentityName: {
    color: '#01129e',
    fontSize: 18
  },
  offerActions: {
    paddingRight: SIZES.padding2,
    marginHorizontal: 40,
    height: 52,
    borderRadius: SIZES.radius,
    flexDirection: 'row-reverse',
    backgroundColor: COLORS.orange,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden'
  },
  buttonActions: {
    paddingRight: SIZES.padding2,
    marginHorizontal: 40,
    height: 52,
    borderRadius: SIZES.radius,
    flexDirection: 'row-reverse',
    backgroundColor: '#01129E',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonActionsOrange: {
    paddingRight: SIZES.padding2,
    marginHorizontal: 40,
    height: 52,
    borderRadius: SIZES.radius,
    flexDirection: 'row-reverse',
    backgroundColor: COLORS.orange,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  compatibilityContainer: {
    backgroundColor: '#01129e',
    padding: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  compatibilityItem: {
    flex: 1,
    alignItems: 'center'
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
    width: '50%'
  },
  candidateExpContainer: {
    paddingTop: 34
  },
  candidateExpContent:{
 paddingVertical: 10, paddingHorizontal: 24,
  backgroundColor: COLORS.blueLight, borderRadius: 10,maxWidth:250,justifyContent:'center',alignItems:'center', 
  marginBottom:24
  },
  candidateExpTitle: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 'bold',
    lineHeight: 24,
    fontStyle: 'normal',
    letterSpacing: 0.15
  },
  candidatExpItem: {
    paddingTop: 20,
    flexDirection: 'row'
  },
  viewBlue: {
    marginTop: 8
  },
  viewText: {
    marginHorizontal: 10
  },
  pointBlue: {
    width: 8,
    height: 8
  },
  compatibilityBtnContainer: {
    marginHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f0f9ff',
    alignItems: 'center'
  },
  compatibilityBtnTitle: {
    marginBottom: 40
  },
  titleh2Container: {
    height: 50,
    justifyContent: 'center'
  },
  titleh2: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 24,
    paddingTop: 0
  },
  stHeader: {
    flexDirection: 'row',
    // width: windowDimension - 48,
    borderRadius: 0,
    paddingTop: SIZES.padding2,
    paddingBottom: SIZES.padding2,
    backgroundColor: COLORS.blue_back,
    borderBottomColor: COLORS.trait_blue,
    marginBottom: 10
  },
  containerLogoEntBottom: {
    width: 80,
    height: 80,
    // borderRadius:SIZES.radiusTwo,
    overflow: 'hidden',
    // backgroundColor:COLORS.white
  },
  imgLogoEntBottom: {
    objectFit: 'cover' as const,
    // maxHeight:80,
    // maxWidth:80,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  imageStyle: {
    borderRadius: 6,
    width: 80,
    height: 80
  },
  textContainer: {
    flexDirection: 'column',
    paddingHorizontal: SIZES.padding
  },
  titlePrimaire: {
    fontWeight: 'bold',
    fontSize: SIZES.h5,
    lineHeight: 16
  },
  descriptionPrimary: {
    fontSize: SIZES.body5,
    color: COLORS.black,
    marginVertical: 10,
    // width: windowDimension - 130
  },
  paragraph: {
    fontSize: SIZES.h5,
    color: COLORS.gray_title
  },
  text1_2: {
    height: 30,
    fontWeight: 'bold',
    fontSize: SIZES.h5,
    color: COLORS.secondary
  },
  dart: {
    width: 16,
    height: 15
  },
  nextContainer: {
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor:COLORS.white,
    paddingBottom:42
  },
  blue_container: {
    flexDirection: 'column',
    backgroundColor: COLORS.blue_back
  },
  page_container: {
    backgroundColor: COLORS.blue_back
  },
  ContactButtonContainer: {
    elevation: 8,
    backgroundColor: COLORS.vector_orange,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 36
  },
  ContactButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center'},

  textinput: {
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5},

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: -10
  },
  buttonBlue: {
    paddingHorizontal: SIZES.padding,
    height: 52,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding2,
    // width: windowDimension - 96
  },
  btnTxt: {
    color: COLORS.white,
    fontSize: SIZES.h5
  },
  textBtnSecondary: {
    color: COLORS.secondary,
    fontSize: SIZES.h5
  },
  buttonAnnuler: {
    paddingHorizontal: SIZES.padding,
    height: 50,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginBottom: SIZES.padding2,
    // width: windowDimension - 96
  },
  bloc3_3: {
    flexDirection: 'row'
  },
  bloc2: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 0
  },
  iconStyle: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusTwo,
    marginTop: 4
  },
  textBloc1: {
    flexDirection: 'column',
    height: 19,
    width: 267
  },
  item3: {
    backgroundColor: '#F0F9FF',
    paddingVertical: 5,
    marginVertical: 3,
    marginHorizontal: 0,
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16
  },
  text: {
    fontWeight: '700',
    fontSize: 12
  },
  label: {
    fontWeight: 'bold',
    fontSize: SIZES.body5,
    letterSpacing: 0.2,
    color: COLORS.black,
    textTransform: 'uppercase'
  },
  value: {
    fontWeight: 'bold',
    fontSize: SIZES.body4,
    letterSpacing: 0.2,
    color: COLORS.black
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  screenContainer: {
    paddingBottom: 32},

  itemTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#00003E'},

  image: {
    width: 48,
    height: 48,
    borderRadius: 6,
    flex: 0
  },
  candidatExp: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0.2,
    flex: 12},

  favorisView: { position: 'absolute', right: 0 },
  favorisImage: {
    width: 19.5,
    height: 18},

  footerFrame: {
    flexDirection: 'row',
    marginTop: 32,
    // width: windowDimension * 0.75},

  jobPlaceItem: {
    fontSize: SIZES.body5,
    color: COLORS.black,
    // width: windowDimension - 86},

  wrapperTextItem: {
    // width: windowDimension - 100,
    flex: 0,
    paddingRight: 10,
    paddingLeft: 10},

  listItemOffer: {
    marginVertical: 10,
    overflow: 'scroll'},

  card_templateItem: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    // paddingVertical: windowDimension * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.blue_border,
    borderStyle: 'dashed'
  },
  containersPageWidth: {
    width: '100%'
  },
  candidateExpContainerMobile:{

  }
});

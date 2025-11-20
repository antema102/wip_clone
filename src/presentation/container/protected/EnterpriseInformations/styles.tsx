import { COLORS, SIZES } from '../../../../resources/constants';

const windowDim = window.innerWidth;

const styles = {
  stHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 128,
    // width: windowDim,
    flex: 1,
    borderRadius: 0,
    padding: 24
  },
  main_container: {
    flex: 1
  },
  pageContainer: {
    paddingHorizontal: SIZES.padding,
    marginTop: 0,
    marginBottom: 70
  },
  image2: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'gray'
  },
  image3: {
    width: 76,
    height: 76,
    backgroundColor: 'white'
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding
  },
  bloc3: {
    width: 363,
    height: 80,
    flexDirection: 'row'
  },
  ButtonBloc: {
    flexDirection: 'column',
    height: 156,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F9FF'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8
  },
  titlePrimaire: {
    fontWeight: 'bold',
    fontSize: SIZES.h5,
    color: COLORS.primary,
    lineHeight: 16
  },
  descriptionPrimary: {
    fontSize: SIZES.body5,
    color: COLORS.black,
    marginVertical: 10,
    // width: windowDim - 130
  },
  navigator: {
    flex: 1
  },
  container: {
    marginTop: 10
  },
  item: {
    backgroundColor: 'white',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row'
  },
  item2: {
    backgroundColor: 'white',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 5,
    flexDirection: 'row'
  },
  title: {
    height: 24,
    fontFamily: 'regular',
    fontSize: 16
  },
  title1: {
    height: 50,
    fontSize: 16,
    textAlign: 'center'
  },
  containerAreaButton: {
    marginTop: SIZES.padding,
    // width: windowDim - 50,
    flex: 1
  },
  screenContainer: {
    alignItems:'flex-end'},

  screenContainer2: {
    flex: 1,
    flexDirection: 'row'
  },
  ModifyButtonContainer: {
    // elevation: 8,
    backgroundColor: COLORS.vector_orange,
    borderRadius: 10,
    maxWidth:200,
    paddingVertical:8,
    paddingHorizontal:24,
    marginTop:24
  },
  buttonAnnuler2: {
    height: 50,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginBottom: SIZES.padding2,
    width: '20%',
    position: 'absolute',
    right: 0,
    top: 20
  },
  ModifyButtonContainerSpecial: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    paddingRight: 30,
    // width: windowDim / 2 - 20,
    height: 50
  },
  UndoButtonContainer: {
    // elevation: 8,
    backgroundColor: COLORS.orange,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  ModifyButtonText: {
    fontSize: 16,
    color: '#fff',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  text10: {
    width: 363,
    height: 100,
    fontSize: 16,
    lineHeight: 150,
    marginTop: 24,
    color: '#00003E',
    marginLeft: 0
  },
  textTitle: {
    flex: 1,
    fontSize: 16,
    color: '#0000CC',
    fontWeight: '700',
    marginLeft: 0,
    marginTop: 10
  },
  textinput: {
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  contentStyle: {},
  iconActus: {
    width: 24,
    height: 24,
    backgroundColor: 'white',
    marginRight: 20,
    marginBottom: 12,
    tintColor:COLORS.blueLight
  },
  itemWrapper: {
    backgroundColor: 'white',
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 72,
    borderBottomColor: COLORS.gray_border,
    borderBottomWidth: 1
  },
  valueActus: {
    flex: 1,
    flexWrap: 'wrap',
    color: COLORS.black,
    fontSize: SIZES.h5
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  itemWrapperOffer: {
    paddingHorizontal: SIZES.padding
  },
  itemOffer: {
    flexDirection: 'row',
    borderBottomColor: COLORS.gray_border,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    paddingVertical: SIZES.padding
  },
  logoSte: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radiusTwo,
    marginRight: SIZES.padding2
  },
  titlePost: {
    fontFamily: 'Oxygen-Bold',
    color: COLORS.black,
    fontSize: SIZES.h5,
    // width: windowDim - 110
  },
  textAlign: {
    alignItems: 'flex-start'
  },
  lieuPost: {
    fontFamily: 'Oxygen-Regular',
    color: COLORS.black,
    fontSize: SIZES.body5,
    flexWrap: 'wrap'
  },
  periodePost: {
    fontFamily: 'Oxygen-Regular',
    color: COLORS.secondary,
    fontSize: SIZES.body5,
    marginTop: 12
  },
  contenOffer: {
    marginBottom: 60
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // width: windowDim - 48,
    paddingHorizontal: SIZES.padding
  },
  buttonAnnuler: {
    height: 50,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginBottom: SIZES.padding2,
    width: '20%',
    left: 0,
    top: 20
  },
  buttonOpen: {
    backgroundColor: "#F194FF"
  },
  buttonClose: {
    backgroundColor: "#2196F3"
  },
  textStyle: {
    color: "white",
    fontFamily: 'Oxygen-Bold',
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
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
    // width: windowDim - 96
  },
  btnTxt: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.h5
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: -10
  },
  textBtnSecondary: {
    color: COLORS.secondary,
    fontWeight: 'bold',
    fontSize: SIZES.h5
  },
  textBtnSecondary2: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.h5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 1
  },
  container2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 50
  },
  pickedDateContainer: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 10
  },
  pickedDate: {
    fontSize: 18,
    color: 'black'
  },
  btnContainer: {
    padding: 30},
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  specialborderForm: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.blue_border,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding7,
    paddingLeft: 10,
    backgroundColor: COLORS.white,
    height: 40,
    borderStyle: 'solid',
    fontSize: 16,
    color: '#000000',
    marginBottom: 20
  }};

export default styles;
;
import { COLORS, SIZES, FONTS } from '../../resources/constants';

const windowDim = window.innerWidth;
const windowHeight = window.innerHeight;
export const formsStyles = {
  containerHeader: {
    flex: 1,
    paddingTop: Platform.OS === 'web' ? 0 : 20},
  formContainFull: {
    width: '100%',
    backgroundColor: 'white'},
  webformContainFull: {
    width: '100%'},
  webformContain: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'relative'},
  webformContainContract: {
    display: 'flex',
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Platform.OS === 'web' ? 0 : 0},
  realFlex: {
    flex: Platform.OS === 'web' ? 1 : 0},
  formContainPayment: {
    paddingTop: Platform.OS === 'web' ? 0 : 5,
    paddingBottom: Platform.OS === 'web' ? 48 : 16,
    paddingHorizontal: Platform.OS === 'web' ? 40 : 20,
    backgroundColor: '#fff',
    maxWidth: Platform.OS === 'web' ? 1025 : '100%',
    width: '100%',
    borderRadius: Platform.OS === 'web' ? 10 : 0,
    minHeight: windowHeight - 75},
  webformContainChat: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center',
    marginVertical: Platform.OS === 'web' ? 40 : 0,
    flex: 1,
    height: Platform.OS === 'web' ? windowHeight - 75 : '100%'},

  formContainChat: {
    height: Platform.OS === 'web' ? windowHeight - 75 : '100%',
    paddingTop: Platform.OS === 'web' ? 48 : 5,
    paddingBottom: Platform.OS === 'web' ? 48 : 16,
    paddingHorizontal: Platform.OS === 'web' ? 80 : 20,
    backgroundColor: '#fff',
    maxWidth: Platform.OS === 'web' ? 1025 : '100%',
    width: '100%',
    borderRadius: Platform.OS === 'web' ? 10 : 0,
    minHeight: windowHeight - 75},
  bgTrans: {
    backgroundColor: 'transparent'},
  formWebs: {
    maxWidth: 640},
  fondUnlogged: {
    objectFit: 'cover' as const},
  formGroup: {
    paddingVertical: 16},
  itemSearchStyle: {
    borderWidth: 1,
    borderColor: 'rgba(224, 224, 224, 1)',
    borderRadius: 30,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginRight: 20,
    marginTop: 16,
    marginBottom: 5,
    marginLeft: 20,
    height: 50},
  itemSearchIcone: {
    marginLeft: 15,
    marginTop: 15,
    width: 20,
    height: 20},
  itemSearchIconeDetailContract: {
    marginLeft: 15,
    marginTop: 50,
    width: 20,
    height: 20},
  itemSearchIconeContract: {
    marginLeft: 15,
    marginTop: 15,
    width: 20,
    height: 20,
    right: 90,
    display: 'flex'},
  itemSearchInput: {
    marginLeft: 20,
    flex: 1},

  itemInputStyleTextArea: {
    borderRadius: 4,
    backgroundColor: COLORS.white,
    color: COLORS.black,
    fontSize: 14,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start'},
  itemSelectStyle: {
    borderRadius: 4,
    borderColor: COLORS.blue_border,
    fontSize: 14,
    marginTop: 20,
    height: 20,
    margin: 0,
    fontFamily: 'Oxygen-Regular',
    width: '98%'},
  itemSelectPickerStyle: {
    width: '104%',
    borderRadius: 4,
    top: -10,
    left: -10,
    zIndex: 0},
  itemTextAreaStyle: {
    borderWidth: 1,
    borderColor: 'rgba(224, 224, 224, 1)',
    borderRadius: 25,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 20,
    height: 150,
    color: '#fff'},
  containerResponse: {
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 8},
  inputError: {
    borderColor: '#f00'},
  imagesLink: {
    width: 40,
    height: 40,
    objectFit: 'contain' as const},
  line: {
    flex: 1,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    marginHorizontal: 10},
  formLogInscr: {
    backgroundColor: '#fff',
    position: 'relative',
    flex: 1,
    marginTop: 42, 
    borderRadius: 10},
  FondMobile: {
    width: windowDim / 2.1,
    height: windowHeight / 3,
    objectFit: 'cover' as const,
    position: 'absolute',
    right: -20,
    top: -5},
  profilInscOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden'},
  profilInsc: {
    width: 80,
    height: 80,
    borderRadius: 40},
  profilForm: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'},
  profilFormInput: {
    backgroundColor: 'rgba(240, 244, 248, 0.875)',
    borderRadius: 30,
    color: '#000',
    fontSize: 14,
    flexDirection: 'row',
    fontWeight: '700',
    marginTop: 5,
    paddingLeft: 16,
    marginBottom: 16,
    height: 50,
    fontFamily: 'Oxygen-Regular'},
  profilFormInputEditable: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderStyle: 'solid',
    color: '#000',
    fontSize: 14,
    flexDirection: 'row',
    fontWeight: '700',
    marginTop: 5,
    paddingLeft: 16,
    marginBottom: 16,
    height: 50,
    fontFamily: 'Oxygen-Regular'},
  autoComplete: {
    borderWidth: 1,
    borderColor: 'rgba(224, 224, 224, 1)',
    borderRadius: 12,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 14,
    flexDirection: 'column',
    padding: 16,
    marginBottom: 16,
    fontFamily: 'Oxygen-Regular'},
  autoCompleteTxt: {
    backgroundColor: '#fff',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
    fontFamily: 'Oxygen-Regular'},
  iconEye: {
    height: 14,
    width: 28,
    marginLeft: 10,
    marginTop: 2},
  iconEdit: {
    height: 19.5,
    width: 19.5,
    marginLeft: -10,
    marginTop: 2,
    tintColor: COLORS.vector_orange
  },
  iconSelect: {
    height: 20,
    width: 20,
    marginRight: 10,
    marginTop: -6,
    zIndex: 40,
    tintColor: COLORS.black
  },
  dateIcon: {
    height: 22,
    width: 20,
    marginLeft: 283},
  paymentContain: {
    minHeight: windowHeight - 80,
    backgroundColor: '#fff'},
  rowFlex: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row'},
  columnFlex: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column'},
  switchContainer: {
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minHeight: 50,
    marginVertical: 10},

  /* ADD STYLES */

  labelStyle: {
    color: COLORS.blueLight,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4},
  labelStyleTerms: {
    color: '#007bff',
    fontSize: 12,
    fontWeight: '700',
    textDecorationLine: 'underline',
    textAlignVertical: 'bottom'},
  itemInputStyle: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: 'Oxygen-Bold',
    flexDirection: 'row',
    textAlignVertical: 'center',
    paddingHorizontal: 0,
    margin: 0,
    height: 40,
    lineHeight: 20,
    width: '97%'},
  formContain: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center'},
  inputWrap: {
    borderWidth: 1,
    borderColor: COLORS.blue_border,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    paddingLeft: 10,
    backgroundColor: COLORS.white},
  inputWrapBlue: {
    backgroundColor: COLORS.blue_back,
    padding: SIZES.padding2,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding2,
    position: 'relative'},
  inputWrapBlueCreate: {
    backgroundColor: COLORS.blue_back,
    padding: SIZES.padding2,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding2,
    paddingTop: 0,
    marginBottom: 0},
  inputWrapBorderBlue: {
    backgroundColor: COLORS.white,
    padding: SIZES.padding2,
    borderRadius: SIZES.radius,
    borderColor: COLORS.blue_border,
    marginTop: SIZES.padding,
    borderWidth: 1},
  wrappContent: {}});

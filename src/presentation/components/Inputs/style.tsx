import { COLORS, SIZES } from '../../../resources/constants';

export default {
  container: {
    flex: 1,
    marginHorizontal: 4,
  },
  fit: {
    marginLeft: 20,
    marginRight: 20,
  },
  above: {
    zIndex: 2000,
  },
  rechercheTextInput: {
    marginLeft: 20,
    flex: 1,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 4,
    height: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black',
  },
  title: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black',
  },
  normalTitle: {
    marginRight: 20,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(15, 87, 158, 1)',
    marginTop: 24,
    marginBottom: 8,
  },
  secondTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  thirdTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  titleGreen: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D5C42',
  },
  titleGreenCenter: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D5C42',
    textAlign: 'center',
  },
  titleGreen14: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1D5C42',
  },
  titleGreen11: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1D5C42',
  },
  titleBlue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'IBMPlexSans-Bold',
  },
  txtBlack: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.black,
    fontFamily: 'Oxygen-Bold',
    letterSpacing: 0.2,
  },
  fileImage: {
    width: 40,
    height: 40,
    objectFit: 'contain' as const,
    marginLeft: 20,
    tintColor: '#C6DBEA',
  },
  txtBlue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#00003E',
    letterSpacing: 0.2,
  },
  paragraph14: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    marginVertical: 8,
  },

  error: {
    fontSize: 14,
    fontWeight: '400',
    color: '#F00',
  },
  linkblue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F579E',
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#0F579E',
  },
  linkUnderline: {
    fontSize: 16,
    fontWeight: '400',
    color: '#58A618',
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#58A618',
  },
  validate: {
    backgroundColor: '#23a4ea',
  },
  inValidate: {
    minWidth: 140,
    backgroundColor: 'gray',
    color: 'black',
  },
  textError: {
    color: '#f00',
    fontSize: 14,
  },
  appButtonContainer: {
    marginVertical: 4,
    marginRight: 4,
    marginLeft: 4,
    color: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: 50,
  },
  appButtonContainerBtn: {
    margin: 15,
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: 50,
  },

  // Label style
  black_paragraph: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.black,
  },
  paragraph: {
    fontSize: SIZES.body3,
    lineHeight: 20,
    color: COLORS.Gray6,
    letterSpacing: 1.25,
    fontWeight: 'bold',
  },
  password: {
    fontSize: SIZES.body4,
    lineHeight: 14,
    color: COLORS.grey_neutral,
    letterSpacing: 0.2,
    fontWeight: '700',
    flexGrow: 0,
  },
  link: {
    fontSize: SIZES.body4,
    fontWeight: '700',
    color: COLORS.primary,
  },
  customDatePicker: {},
};

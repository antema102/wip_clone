const height = window.innerHeight;
const width = window.innerWidth;

export const COLORS = {
  // base colors
  primary: '#2CA5FF', // bleu
  secondary: '#01129E', // indigo
  orange: '#FE6D02', // Orange
  Gray6: '#7B8794',
  blueLight: '#3399ff',
  blueInput: '#3399FF',
  blue_back: '#F0F9FF',
  gray_fond: '#F2EFE0',
  blue_focused: '#C6DBEA',
  gray_dashed: '#C6DBEA',
  gray_border: '#C6DBEA',
  badge_color: '#FFF2C5',
  blue_border: '#CCEAFF',
  gray_title: '#323F4B',
  gray_line: '#E3E7EB',
  gray_borderLight: '#000000',

  blue_title: '#CFE7FF',
  trait_blue: '#ACCCF8',
  vector_orange: '#ff6600',
  vector_blue: 'rgba(51, 153, 255, 0.10)',
  border_blue: '#203F63',
  // colors
  black: '#00003C',
  white: '#FFFFFF',
  grey_neutral: '#7B8794',
  transparent: 'rgba(0,0,0,0)',

  // old color
  lightGray: '#F5F5F6',
  lightGray2: '#F6F6F7',
  lightGray3: '#EFEFF1',
  lightGray4: '#F8F8F9',
  // transparent: 'transparent',
  darkgray: '#898C95',

  stroke1: '#F2F2F2',

  ///
  gray_gmail: '#C4C4C4',
  twiter_color: '#007AB9',
  fb_color: '#3B5998',
  text_input: '#E0E0E0',
  yellow: '#FFFF00',
  red_color: '#FF0000',
  gray_connect: '#6E5D5D',
  bleu_fonce_text: '#3B5998',
  disableGray: 'rgba(240, 244, 248, 0.87)',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 10,
  radiusTwo: 8,
  padding: 24,
  padding2: 16,
  padding3: 20,
  padding4: 5,
  padding5: 10,
  padding6: 8,
  padding7: 10,

  // font sizes
  largeTitle: 50,
  h1: 32,
  h2: 25,
  h3: 18,
  h4: 20,
  h5: 16,
  h6: 10,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: 'IBMPlexSans-Bold',
    fontSize: SIZES.largeTitle,
    lineHeight: 46,
  },
  h1: {
    fontFamily: 'IBMPlexSans-Bold',
    fontSize: SIZES.h1,
    lineHeight: 32,
  },
  h2: { fontSize: SIZES.h2, lineHeight: 25 },
  h3: { fontSize: SIZES.h3, lineHeight: 25 },
  h4: { fontSize: SIZES.h4, lineHeight: 25 },
  h5: { fontSize: SIZES.h5, lineHeight: 20 },
  body1: {
    fontFamily: 'Oxygen-Regular',
    fontSize: SIZES.body1,
    lineHeight: 32,
  },
  body2: {
    fontFamily: 'Oxygen-Regular',
    fontSize: SIZES.body2,
    lineHeight: 25,
  },
  body3: {
    fontFamily: 'Oxygen-Regular',
    fontSize: SIZES.body3,
    lineHeight: 20,
  },
  body4: {
    fontFamily: 'Oxygen-Regular',
    fontSize: SIZES.body4,
    lineHeight: 20,
  },
  body5: {
    fontFamily: 'Oxygen-Regular',
    fontSize: SIZES.body5,
    lineHeight: 20,
  },

  oxyTitleWhite: {
    fontWeight: 'bold',
    fontSize: SIZES.h5,
    lineHeight: 20,
    color: COLORS.white,
  },
  oxygenListeBlack: {
    fontSize: SIZES.h5,
    lineHeight: 20,
    color: COLORS.black,
  },
  labelBlue: {
    fontFamily: 'Oxygen-Bold',
    color: COLORS.primary,
    fontSize: SIZES.body5,
    lineHeight: 20,
  },
  labelBlack: {
    fontFamily: 'Oxygen-Bold',
    color: COLORS.black,
    fontSize: SIZES.body5,
    lineHeight: 20,
  },
  inputText: {
    fontFamily: 'Oxygen-Bold',
    color: COLORS.black,
    fontSize: SIZES.h5,
    marginTop: -12,
  },
  h3Black: {
    fontWeight: 'bold',
    fontSize: SIZES.h4,
    lineHeight: 25,
    color: COLORS.black,
  },
  btnHeader: {
    fontFamily: 'Oxygen-Regular',
    color: COLORS.black,
    fontSize: SIZES.h5,
    lineHeight: 25,
  },
  titleHomeBlack: {
    color: COLORS.black,
    fontSize: SIZES.h3,
  },
  titleBlack: {
    color: COLORS.black,
    fontSize: SIZES.h5,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;

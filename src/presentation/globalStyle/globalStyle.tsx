import { COLORS, SIZES, FONTS } from '../../resources/constants';
let windowDim = window.innerWidth;

export const reloadStyles = (): any => {
  windowDim = window.innerWidth;
  const gs = {
    simpleButton: {
      color: COLORS.black,
      fontFamily: 'Oxygen-Regular',
      fontSize: 15,
      textTransform: 'uppercase',
      position: 'relative',
      zIndex: 6,
      height: 40,
      lineHeight: 40
    },

    row: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      overflow: 'visible'},
    link: {
      color: '#58A618',
      fontSize: 12,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      fontFamily: 'Oxygen-Regular'},
    btnContainer: {
      flex: 2,
      maxWidth: windowDim - 30,
      marginBottom: 16,
      borderRadius: SIZES.radius
    },
    btnContainerMobile:{
      marginBottom: 24,
      backgroundColor: COLORS.secondary,
      borderRadius: SIZES.radius
    },
    btnContainerWhite: {
      flex: 2,
      maxWidth: windowDim - 32,
      marginBottom: 24,
      justifyContent: 'flex-end'},
    btnContainerOrange: {
      flex: 2,
      maxWidth: windowDim - 32,
      marginBottom: 24,
      backgroundColor: COLORS.orange,
      borderRadius: SIZES.radius
    },
    shadowBlue: {
      shadowColor: COLORS.secondary,
      shadowOffset: {
        width: 0,
        height: 6
    },
      shadowRadius: 20,
      elevation: 6,
      zIndex: 10
    },
    title3: {
      fontSize: windowDim <= 991 ? 16 : SIZES.h4,
      lineHeight: 25,
      color: COLORS.black,
      letterSpacing: 0.15
    },
    titleHome: {
      ...FONTS.titleHomeBlack,
      fontWeight: 'bold'
    },
    titleOffer: {
      ...FONTS.titleBlack
    },
    fullFlex: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      width: windowDim - 50,
      justifyContent: 'space-between',
      alignItems: 'center'},
    heightBanner: {
      height: windowDim * 0.2
    },
    labelWhite: {
      color: COLORS.white,
      lineHeight: 48,
      fontFamily: 'Oxygen-Regular',
      fontSize: 14
    },
    iconButton: {},
    shadowOrange: {
      shadowColor: '#FE6D02',
      shadowOffset: {
        width: 1,
        height: 2
    },
      shadowOpacity: 0.4,
      shadowRadius: 7,
      elevation: 5
    },
    displayLeftVertical: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: 50,
      marginTop: -18,
      marginLeft: 16,
      paddingRight: 20
    },
    displayLeftVerticalFile: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: 50,
      marginTop: -8,
      marginLeft: 16,
      paddingRight: 20
    },
    grayHeaderContainer: {
      paddingVertical: SIZES.padding,
      paddingHorizontal: SIZES.padding2,
      backgroundColor: COLORS.blue_back,
      height: 160,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center'},
    fileDownloaderContainer: {
      paddingVertical: SIZES.padding,
      marginHorizontal: SIZES.padding,
      backgroundColor: COLORS.blue_back,
      marginVertical: SIZES.padding5,
      height: 80,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center'},
    headerContainer: {
      paddingHorizontal: SIZES.padding,
      backgroundColor: COLORS.primary,
      height: windowDim * 0.05,
      justifyContent: 'center',
      // width: windowDim * 1
    },
    smallHeaderContainer: {
      paddingHorizontal: SIZES.padding,
      paddingTop: 0,
      backgroundColor: COLORS.primary,
      height: windowDim * 0.26,
      justifyContent: 'center',

      width: windowDim
    },
    headerScreenTitle: {
      color: 'white',
      fontSize: SIZES.body2,
      lineHeight: 24,
      marginTop: -6
    },
    headerScreenDescription: {
      color: 'white',
      fontSize: SIZES.body5,
      justifyContent: 'center'},
    listConseilContainer: {
      paddingHorizontal: SIZES.padding,
      paddingVertical: 8,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap:16
      // width: windowDim - 60
    },
    olListPuce: {
      backgroundColor: COLORS.primary,
      minWidth: 32,
      height: 32,
      borderRadius: 18,
      paddingVertical: 6,
      textAlign: 'center',
      ...FONTS.oxyTitleWhite
    },
    olList: {
      ...FONTS.oxygenListeBlack
    },
    ContainerLinkVideo: {
      height: 80,
      justifyContent: 'center',
      paddingLeft: SIZES.padding
    },
    linkVideo: {
      color: COLORS.secondary,
      fontSize: SIZES.body3,
      marginRight: 6
    },
    pageContainer: {
      height: '100%',
      width: windowDim,
      paddingHorizontal: SIZES.padding,
      paddingTop: 10,
      paddingBottom: 40,
      overflow: 'scroll',
      backgroundColor: COLORS.white
    },
    pageContainerPresentation: {
      height: '100%',
      // width: windowDim,
      paddingHorizontal: SIZES.padding2,
      paddingBottom: 40,
      // overflow: 'scroll',
      backgroundColor: COLORS.white
    },
    buttonHomeActionsaisir: {
      height: 56,
      borderRadius: SIZES.radius,
      flexDirection: 'row',
      backgroundColor: COLORS.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
      shadowColor: COLORS.secondary,
      shadowOffset: {
        width: 0,
        height: 6
    },
      shadowRadius: 8,
      shadowOpacity: 1,
      elevation: 9,
      zIndex: 999
    },
    bigBtnTxt: {
      fontSize: SIZES.body3,
      color: COLORS.white
    },
    buttonHomeExport: {
      paddingHorizontal: 8,
      height: 56,
      borderRadius: SIZES.radius,
      flexDirection: 'row',
      backgroundColor: COLORS.orange,
      justifyContent: 'center',
      alignItems: 'center'},

    buttonBoost: {
      paddingHorizontal: 8,
      height: 56,
      borderRadius: SIZES.radius,
      flexDirection: 'row',
      backgroundColor: 'green',
      justifyContent: 'center',
      alignItems: 'center'},

    buttonHomeDisplay: {
      paddingHorizontal: 8,
      height: 56,
      borderRadius: SIZES.radius,
      flexDirection: 'row',
      backgroundColor: COLORS.blueInput,
      justifyContent: 'center',
      alignItems: 'center'},
    nextButton: {
      height: 40,
      borderRadius: SIZES.radius,
      flexDirection: 'row',
      backgroundColor: '#F0F9FF',
      justifyContent: 'center',
      alignItems: 'center'},
    containerDots: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      height: 60,
      paddingVertical: 10
    },
    dotIcon: {
      width: windowDim * 0.04,
      height: windowDim * 0.04,
      borderWidth: 2,
      borderColor: COLORS.secondary,
      borderRadius: windowDim * 0.02,
      marginHorizontal: windowDim * 0.03,
      padding: 2
    },
    customVideo: {
      width: windowDim - 48,
      height: windowDim * 0.6,
      position: 'relative'},
    buttonActions: {
      paddingRight: SIZES.padding2,
      height: 56,
      borderRadius: SIZES.radius,
      flexDirection: 'row-reverse',
      backgroundColor: COLORS.secondary,
      justifyContent: 'space-between',
      alignItems: 'center'},
    buttonActionsOrange: {
      paddingRight: SIZES.padding2,
      marginHorizontal: SIZES.padding,
      height: 52,
      borderRadius: SIZES.radius,
      flexDirection: 'row-reverse',
      backgroundColor: COLORS.orange,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SIZES.padding
    },
    buttonActionsBlue: {
      paddingRight: SIZES.padding2,
      marginHorizontal: SIZES.padding,
      height: 52,
      borderRadius: SIZES.radius,
      flexDirection: 'row-reverse',
      backgroundColor: COLORS.secondary,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SIZES.padding
    },
    btnBottomContainer: {
      width: windowDim,
      height: 80,
      alignItems: 'flex-end',
      justifyContent: 'center'},
    shadowButtonCircular: {
      shadowColor: COLORS.secondary,
      shadowOffset: {
        width: 0,
        height: 8
    },
      shadowOpacity: 0.8,
      shadowRadius: 8,
      elevation: 6
    },
    imgBannerNotcrop: {
      resizeMode: 'contain',
      position: 'absolute',
      right: -10,
      zIndex: 4,
      top: windowDim * 0.06,
      height: windowDim * 0.24 - 2,
      width: windowDim * 0.3
    },
    imgBanner: {
      resizeMode: 'contain',
      position: 'absolute',
      right: 10,
      zIndex: 2,
      top: windowDim * 0.03,
      height: windowDim * 0.16 - 2,
      width: windowDim * 0.3
    },
    blueBanner: {
      paddingHorizontal: SIZES.padding,
      width: '100%',
      backgroundColor: COLORS.primary,
      position: 'relative',
      height: windowDim * 0.16,
      overflow: 'visible',
      zIndex: 1
    },
    displayCenterVertical: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start'},
    displayLeftHorizontal: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: windowDim
    },
    textBienvenue: {
      fontSize: SIZES.h3,
      color: COLORS.white,
      width: '70%',
      height: '100%',
      paddingHorizontal: 0,
      paddingVertical: windowDim * 0.08
    },
    alignTxtHeader: {},
    formContain: {
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
      width: windowDim,
      flex: 1
    },
    elevationBlue: {
      marginHorizontal: 5,
      elevation: 10,
      shadowColor: COLORS.secondary,
      opacity: 1,
      shadowOffset: {
        width: 0,
        height: 8
    },
      shadowOpacity: 0.6,
      shadowRadius: 12
    },
    elevationOrange: {
      elevation: 8,
      shadowColor: COLORS.orange,
      opacity: 1,
      shadowOffset: {
        width: 0,
        height: 8
      },
      shadowOpacity: 0.6,
      shadowRadius: 12,
      zIndex: 999
    },
    roundedBlue: {
      borderWidth: 1,
      borderColor: COLORS.blue_border,
      borderRadius: SIZES.radius,
      padding: SIZES.padding2,
      marginTop: SIZES.padding,
      marginBottom: SIZES.padding
    },
    containersPage: {
      height: '100%',
      width: '100%'
    },
    containersPageWidth: {
      width: '100%',
      marginBottom: 180
    },
    floatWrapperBtn: {
      height: 124,
      flex: 1,
      position: 'absolute',
      bottom: 56,
      justifyContent: 'center',
      right: 0
    },
    btnCircular: {
      marginRight: 22,
      width: 48,
      height: 48,
      borderRadius: 26,
      backgroundColor: COLORS.secondary,
      alignItems: 'center',
      justifyContent: 'center'
    },
    iconStyle: {
      width: 16,
      height: 15,
      objectFit: 'cover' as const,
      marginLeft: 10
    }
  };
  return gs;
};

export const globalStyle = reloadStyles();

export default globalStyle;

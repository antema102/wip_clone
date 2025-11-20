import { COLORS, SIZES } from '../../../../../resources/constants';
const windowDim = window.innerWidth;

export const styles = {
  containers: {
    flex: 1
  },
  subscriptionContainer: {
    marginHorizontal: 50,
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.gray_border,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.blue_title
  },
  subscriptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white
  },
  subscriptionStatus: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.vector_orange
  },
  content: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: COLORS.vector_orange,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderStyle: 'dashed',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  contentMobile: {
    marginHorizontal: 24
  },
  contentDesktop: {
    marginHorizontal: 50
  },
  title: {
    fontSize: 20,
    fontWeight: '600'
  },
  warningText: {
    fontSize: 18,
    marginBottom: 8,
    color: COLORS.vector_orange,
    fontWeight: '700'
  },
  buttonsStylesRefonteOrange: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: COLORS.vector_orange,
    borderRadius: 10,
    flex: 1
  },
  buttonsStylesRefonteBlue: {
    paddingVertical: 14,
    paddingHorizontal: 34,
    backgroundColor: COLORS.blue_title,
    borderRadius: 10
  },
  buttonStyles: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 50
  },
  buttonText: {
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold'
  },
  buttonTextOrange: {
    color: COLORS.white,
    fontWeight: '700'
  },
  buttonTextBlue: {
    fontWeight: '700'
  },
  buttonTextSpecial: {
    color: COLORS.white,
    marginTop: -20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  paymentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyles: {
    color: COLORS.white,
    marginTop: 5,
    marginLeft: 500
  },
  alignHorizontally: {
    flexDirection: 'row',
    marginVertical: 7
  },
  imgStyle: {
    objectFit: 'contain' as const,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
    height: 120,
    width: 120
  },
  intermediate: {
    width: 40
  },
  heightForm: {
    height: windowDim * 0.16
  },
  submitButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 150,
    marginHorizontal: 100,
    marginTop: 15
  },
  borderForm: {
    borderWidth: 1,
    borderColor: COLORS.blue_border,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    paddingLeft: 10,
    paddingBottom: 5,
    backgroundColor: COLORS.white,
    height: 70
  },
  inputWrap: {
    borderWidth: 1,
    borderColor: COLORS.blueLight,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    paddingLeft: 10,
    paddingVertical: 8
  },
  inputWrapDisabled: {
    backgroundColor: COLORS.disableGray
  },
  inputWrapButton: {
    marginTop: SIZES.padding,
    paddingVertical: 0,
    height: 50
  },
  containerFormList: {
    width: '50%',
    alignItems: 'center'
  },
  contentResultContainer: {
    alignItems: 'center',
    paddingVertical: 100
  },
  contentResult: {
    textAlign: 'center'
  },
  mainContainer: {
    marginTop: 60,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'relative'
  },
  titleContainer: {
    minWidth: 400
  },
  titleContainerMobile: {},
  innerContainer: {
    marginTop: 32
  },
  formContainer: {
    borderWidth: 1,
    borderColor: COLORS.blue_title,
    borderRadius: 10,
    padding: 24,
    marginTop: 34,
    marginBottom: 24
  },
  formContainerMobile: {
    marginHorizontal: 24
  },
  formContainerDesktop: {
    marginHorizontal: 50
  },
  errorText: {
    color: COLORS.red_color
  },
  actionButtonContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  actionButtonWrapper: {
    marginTop: 24
  }
};
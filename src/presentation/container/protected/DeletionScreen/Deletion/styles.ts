;
import { COLORS, SIZES } from '../../../../../resources/constants';
const windowDim = window.innerWidth;
const windowHeight = window.innerHeight;
export const styles = {
  containers: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop:24,borderRadius:10
  },
  noSubscription: {
  },
  withSubscription: {
  },

  buttonStyles: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 50},
  buttonText: {
    textAlign: 'center',
    fontSize: SIZES.body3,
    color: COLORS.white,
    fontWeight: 'bold',
    marginTop: 5},
  buttonTextSpecial: {
    color: COLORS.white,
    marginTop: -20,
    textAlign: 'center'},
  paymentContainer: {
    justifyContent: 'center',
    alignItems: 'center'},
  iconStyles: {
    color: COLORS.white,
    marginTop: 5,
    marginLeft: 500
  },
  alignHorizontally: {
    flexDirection: 'row',
    marginVertical: 7},
  imgStyle: {
    objectFit: 'contain' as const,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
    height: 120,
    width: 120},
  intermediate: {
    width: 40},
  heightForm: {
    height: windowDim * 0.16},
  submitButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 150,
    marginHorizontal: 100,
    marginTop: 15},
  borderForm: {
    borderWidth: 1,
    borderColor: COLORS.blue_border,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    paddingLeft: 10,
    paddingBottom: 5,
    backgroundColor: COLORS.white,
    height: 70},
  inputWrap: {
    borderWidth: 1,
    borderColor: COLORS.blue_border,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    paddingLeft: 10,
    paddingVertical: 0,
    marginHorizontal: 50},
  inputWrapButton: {
    marginVertical: 5,
    paddingVertical: 0,
    marginHorizontal: 50},
  deletionWarning: {
    backgroundColor: 'red'},
  containerFormList: {
    width: '50%',
    alignItems: 'center'},
  contentResultContainer: {
    alignItems: 'center',
    paddingVertical: 100},
  contentResult: {
    textAlign: 'center'},
  simpleTitle: {
    fontSize: SIZES.body4,
    marginRight: 10,
    color: COLORS.black},
  textTitle: {
    flex: 1,
    fontSize: 16,
    color: '#0000CC',
    fontWeight: '700',
    marginTop: 20,
    marginLeft: 0}});

import { COLORS, SIZES } from '../../../../resources/constants';

const { width } = Dimensions.get('window');
export const styles = {
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 150,
  },
  buttonStyles: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 5,
    borderRadius: 10,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.blue_border,
    marginHorizontal: width < 991 ? 10 : 0,
  },
  loginForm: {
    borderWidth: 1,
    borderColor: COLORS.blue_border,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    width: width < 991 ? '100%' : '60%',
    backgroundColor: COLORS.white,
    paddingHorizontal: '5%',
  },
  logoForm: {
    width: '70%',
    paddingTop: '20%',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonTextStyles: {
    color: COLORS.white,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  alignHorizontal: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  container: {
    height: SIZES.height,
    backgroundColor: COLORS.blue_border,
    flexDirection: 'row',
  },
  borderFormForLogin: {
    borderWidth: 1,
    borderColor: COLORS.blue_border,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    paddingLeft: 10,
    height: 50,
    backgroundColor: COLORS.white,
    flex: 1,
  },
  heightBanner: {
    paddingTop: 20,
  },
  sampleLine: {
    paddingTop: 30,
    width: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E7EB',
  },
  textTitle: {
    flex: 1,
    fontSize: 16,
    color: '#0000CC',
    fontWeight: '700',
    marginTop: 20,
    marginLeft: 0,
  },
};

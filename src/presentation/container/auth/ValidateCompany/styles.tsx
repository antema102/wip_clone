import { Dimensions, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../resources/constants';
const { width } = Dimensions.get('window');

export const styles = {
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 150
  },
  fullFlexCheckBox: {
    display: 'flex',
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  checkBoxContaint: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkBoxText: {
    width: '20%%',
    color: 'black',
    marginLeft: 2,
  },
  
  fullFlex: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    width: width - 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkBox: {
    // backgroundColor: 'red',
    color: 'red',
    tintColor: 'red',
    borderColor: 'red',
    shadowColor: 'red',
    overlayColor: 'red',
  },
  borderForm: {
    borderWidth: 1,
    borderColor: COLORS.blue_border,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    paddingLeft: 10,
    paddingBottom: 5,
    backgroundColor: COLORS.white,
    height: 70,
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
  },
  loginForm: {
    borderWidth: 1,
    borderColor: COLORS.blue_border,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    width: '95%',
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
  heightForm: {
    height: width * 0.16,
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
    width: '95%',
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
    fontFamily: 'Oxygen-Regular',
    fontSize: 16,
    color: '#0000CC',
    fontWeight: '700',
    marginTop: 20,
    marginLeft: 0,
  },
};

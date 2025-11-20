import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../../../../../resources/constants';
const windowDim = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius:10,
    marginTop:50,
    paddingTop:24
  },
  buttonStyles: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 5,
    borderRadius: 10,
  },
  heightForm: {
    height: windowDim * 0.16,
  },
  errorText: {
    marginTop: 10,
    color: COLORS.red_color,
    marginHorizontal: 50,
  },
  submitButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 150,
    marginHorizontal: 100,
    marginTop: 15,
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
  inputWrap: {
    borderWidth: 1,
    borderColor: COLORS.blue_border,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    paddingLeft: 10,
    paddingVertical: 0,
    marginHorizontal: 50,
  },
  containerFormList: {
    width: '50%',
    alignItems: 'center',
  },
  contentResultContainer: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  contentResult: {
    textAlign: 'center',
  },
  imgStyle: {
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
    height: 120,
    width: 120,
  },
});

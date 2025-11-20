;
import { COLORS, SIZES } from '../../../../resources/constants';

const {width} = Dimensions.get('window');

export default ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    paddingHorizontal: 0},

  button: {
    // width: 150,
    width: width / 2.4,
    height: 50,
    borderColor: COLORS.gray_border,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding2,
    // marginRight: 10,
    // marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: 'red'},

  text: {
    fontFamily: 'IBMPlexSans-SemiBold',
    color: COLORS.black,
    fontSize: SIZES.h5,
    textAlign: 'center'},
  tagNavContainer: {
    width: width / 2.4,
    height: 50,
    borderColor: COLORS.gray_border,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding2,
    // marginRight: 10,
    // marginHorizontal: 10,
    paddingHorizontal: 10}});

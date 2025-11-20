;
import { COLORS, SIZES } from '../../../resources/constants';

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
  simpleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: SIZES.padding4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray_border,
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    marginBottom: SIZES.padding4},
  activeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: SIZES.padding4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    marginBottom: SIZES.padding4,
    backgroundColor: COLORS.blue_back},
  textMenu: {
    fontWeight: 'bold',
    fontSize: SIZES.body5,
    color: COLORS.black},
  textMenuActive: {
    fontWeight: 'bold',
    fontSize: SIZES.body5,
    color: COLORS.primary}});

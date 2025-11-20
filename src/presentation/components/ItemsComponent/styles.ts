;
import { COLORS, SIZES } from '../../../resources/constants';

const winWidth = window.innerWidth;

export default ({
  container: {
    flex: 1,
    justifyContent: 'center',

    padding: 8},

  card_template: {
    // width: winWidth * 0.58,
    // height: winWidth * 0.3,
    marginRight: SIZES.padding2,
    marginTop: 6,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    // borderRadius: winWidth * 0.03,
    // padding: winWidth * 0.046},

  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#00003E'},

  navbarBtn: {
    width: 100,
    height: 20,
    borderColor: COLORS.gray_border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 5,
    marginRight: 10,
    paddingLeft: 10},

  textBtn: {
    color: 'red',
    fontSize: 12},

  textList: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    color: COLORS.secondary,
    marginBottom: 5},

  duration: {
    color: COLORS.secondary,
    fontStyle: 'normal',
    fontWeight: 'normal'},

  list: {
    display: 'flex',
    flexDirection: 'row',
    borderStyle: 'dashed',
    borderColor: COLORS.gray_line,
    borderWidth: 1,
    paddingTop: 15},

  image: {
    width: 58,
    height: 58,
    borderRadius: 6},
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
    color: COLORS.primary},

  card_title: {
    fontWeight: 'bold',
    color: COLORS.white,
    fontSize: SIZES.h5,
    paddingLeft: winWidth * 0.03,
    // width: winWidth * 0.58 - 76,
    justifyContent: 'center'},
  jobPlace: {
    fontSize: SIZES.body5,
    color: COLORS.white,
    // paddingLeft: winWidth * 0.03,
    // width: winWidth * 0.58 - 66},
  candidatExp: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0.2,
    flex: 12},
  favorisView: {position: 'absolute', right: 0},
  favorisImage: {
    width: 19.5,
    height: 18},
  footerFrame: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 32,
    // width: winWidth * 0.9},
  jobPlaceItem: {
    fontSize: SIZES.body5,
    color: COLORS.black,
    // width: winWidth - 86},
  jobDate: {
    flex: 1,
    flexBasis: '100%',
    fontSize: SIZES.body5,
    color: COLORS.white,
    marginTop: SIZES.padding3},
  jobDateItem: {
    flex: 1,
    flexBasis: '100%',
    fontSize: SIZES.body5,
    color: COLORS.secondary,
    marginTop: 10},
  wrapperText: {
    // width: winWidth * 0.58 - 86,
    flex: 1,
    paddingRight: 20},
  wrapperTextItem: {
    // width: winWidth - 100,
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10},
  listItemOffer: {
    marginVertical: 10,
    overflow: 'scroll'},
  card_templateItem: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between'},
  wapperTitle: {
    height: 50,
    justifyContent: 'center',
    marginTop: 10}});

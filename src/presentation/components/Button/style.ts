;
import { COLORS, SIZES } from '../../../resources/constants';
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

export const buttonsStyles = {
  bkg_socio: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    width: 56,
    height: 56,
    paddingVertical: 20},
  buttonContainerHome: {
    paddingHorizontal: 8,
    height: 56,
    borderRadius: SIZES.radius,
    flexDirection: 'row'},
  buttonContainer: {
    paddingHorizontal: 8,
    height: 32,
    borderRadius: 8,
    flexDirection: 'row'},
  txtButton: {
    fontFamily: 'Oxygen',
    color: COLORS.white,
    fontSize: 12,
    lineHeight: 32,
    textAlign: 'center'},
  iconStyle: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignSelf: 'center'},
  nextIconStyle: {
    width: 40,
    height: 24,
    justifyContent: 'center',
    alignSelf: 'center'},
  iconStyle2: {
    width: 20,
    height: 20,
    marginLeft: 3,
    justifyContent: 'center',
    alignSelf: 'center'},
  
  btnValiderWhite: {
    // color: '#01129E',
    color:'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontStyle: 'normal',
    paddingHorizontal: 4,
    lineHeight: 20},
  
  btnValiderOuterWhite: {
    margin: 12,
    minWidth: 130,
    backgroundColor: '#FF333D',
    borderRadius: 16,
    height: 50,
    maxHeight: 50,
    paddingHorizontal: 4,
    flexGrow: 1,
    flexShrink: 1,
    // borderColor: COLORS.secondary,
    // borderWidth: 1}});

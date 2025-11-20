;
import { COLORS, icons, images, SIZES } from '../../../resources/constants';
const winWidth = window.innerWidth;
export const styles = {
  ButtonTabs: {
    color: COLORS.black,
    fontSize: winWidth > 991 ? 16 : 14,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign:'center'
  },
  contenair: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50},
  content: {
    padding: 16,
    borderRadius: 50,
    alignItems:'stretch'
  },
  item:{
    gap:14,
    justifyContent:'center',
    alignItems:'center'
  },
  active: {
    color: COLORS.blueInput,
    fontSize: winWidth > 991 ? 16 : 14,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign:'center'
  },
  lines: {
    height: 4,
    backgroundColor: COLORS.secondary,
    marginTop: 10},
  activebtn: {
    backgroundColor: COLORS.blueInput},
  noBtn: {
    backgroundColor:'#D9CAD5'},
  images:{
    height:20,
    width:20},
  activeImages:{
    tintColor:'white'
  },
  noActiveImages:{
    tintColor:COLORS.black
  }
});

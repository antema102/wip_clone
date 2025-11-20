;
import { COLORS } from '../../../resources/constants';
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

export const styles = {
  containerText: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.black,
    flexDirection: 'row',
    gap:5,
    minWidth:160
  },
  contentTextMobile: {
    paddingVertical:6 ,
    paddingHorizontal:10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.black,
    flexDirection: 'row',
    alignItems:'center'
  },
  textLabel:{
    fontWeight:600,fontSize:12
  }});

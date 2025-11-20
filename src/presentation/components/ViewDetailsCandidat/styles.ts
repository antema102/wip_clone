import { Dimensions, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../../resources/constants';
const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
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
  },
  
});

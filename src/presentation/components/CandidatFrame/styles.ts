;
import { COLORS, SIZES } from '../../../resources/constants';

let windowWidth = window.innerWidth;

export const styles = {
  blueBanner: {
    paddingHorizontal: SIZES.padding,
    width: '100%',
    backgroundColor: '#C6DBEA',
    position: 'relative',
    overflow: 'visible',
    zIndex: 1,
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // top: 60},
  displayLeftHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'},
  displayCenterVertical: {
    display: 'flex',
    flexDirection: 'column',
    //alignItems: 'center',
    justifyContent: 'center'},
  text: {
    fontSize: SIZES.h3,
    color: COLORS.secondary,
    width: '100%',
    height: '100%',
    fontWeight: 'bold',
    paddingHorizontal: 0,
    paddingVertical: windowWidth * 0.08,
    lineHeight: 24,
    letterSpacing: 0.15}});

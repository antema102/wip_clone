import { COLORS, FONTS, SIZES } from '../../../resources/constants';
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
export const styles = {
  content: {
    backgroundColor: COLORS.white,
    height: windowHeight > 1600 ? 400 : 280,
    borderRadius: 10,
    overflow: 'hidden'
  },
  imagesSideBar: {
    height: '100%',
    width: '100%',
    objectFit: 'cover'
  }
};
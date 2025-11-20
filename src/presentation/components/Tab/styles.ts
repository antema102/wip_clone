import { COLORS, SIZES } from '../../../resources/constants';
export const styles = {
  ButtonTabs: {
    color: COLORS.black,
    fontSize: SIZES.h5
  },
  active: {
    fontSize: SIZES.h5,
    fontWeight: 'bold'
  },
  content: {
    backgroundColor: COLORS.blue_title,
    paddingVertical: 16,
    minWidth: 280,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'relative'
  },
  lines: {
    height: 3,
    width: 50,
    backgroundColor: '#FF6600',
    position: 'absolute',
    bottom: 0
  },
  tabContent: {
    position: 'absolute',
    top: -110
  },
  search1: {
    position: 'absolute',
    left: 75,
    top: -70
  },
  search2: {
    position: 'absolute',
    top: -70,
    right: 75
  },
  container: {
    backgroundColor: COLORS.blue_title,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    position: 'relative',
    width: 250
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.black
  },
  linesSearch: {
    height: 5,
    width: 75,
    backgroundColor: '#FF6600',
    position: 'absolute',
    left: '50%',
    bottom: -5,
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }]},
  textContent: {
    paddingVertical: 14,
    paddingHorizontal: 24
  },
  textTitle: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '700'
  }
};
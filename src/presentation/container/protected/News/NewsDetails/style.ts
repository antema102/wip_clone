import { COLORS, SIZES } from '../../../../../resources/constants';

const windowDim = window.innerWidth;

const styles = {
  container: {
    // flexDirection: 'row'
  },
  category: {
    fontSize: SIZES.font,
    color: COLORS.secondary,
    marginBottom: SIZES.padding6
  },
  image: {
    width: 24,
    height: 24,
    flex: 0
  },
  bigBtnTxt: {
    fontSize: SIZES.body3,
    color: COLORS.white,
    fontWeight: '700'
  },
  buttonHomeExport: {
    paddingHorizontal: 8,
    height: 56,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center'
  },
  warn: {
    color: COLORS.secondary,
    fontWeight: 'bold',
    fontSize: SIZES.h5,
    marginBottom: SIZES.padding5
  },
  advice: {
    color: COLORS.black,
    fontSize: SIZES.body5
  },
  info: {
    backgroundColor: COLORS.blue_back,
    borderRadius: SIZES.radius,
    padding: SIZES.padding5,
    width: 50,
    flexDirection: 'row',
    marginBottom: SIZES.padding
  },
  filter: {
    flexWrap: 'wrap',
    borderColor: COLORS.blue_border,
    borderWidth: 1,
    borderRadius: 8,
    height: 32,
    width: 'auto',
    fontWeight: '700',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding5,
    marginBottom: SIZES.padding5,
    paddingHorizontal: 8
  },
  itemActive: {
    backgroundColor: COLORS.blue_back
  },
  headWrapperText: {
    // width: windowDim - 85,
    flex: 0,
    marginRight: 10,
    paddingHorizontal: SIZES.padding6
  },
  wrapperText: {
    flex: 1,
    alignItems: 'flex-start'
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: SIZES.font,
    color: COLORS.gray_title,
    marginBottom: SIZES.padding5,
    width: '100%'
  },
  date: {
    color: COLORS.primary,
    fontSize: SIZES.body5,
    backgroundColor: COLORS.blue_back,
    borderRadius: SIZES.radiusTwo,
    paddingHorizontal: SIZES.padding6,
    marginBottom: SIZES.padding6,
    lineHeight: 28
  },
  source: {
    fontWeight: '700'
  },
  wrapperImg: {
    marginTop: SIZES.padding,
    flex: 1,
    alignItems: 'flex-end'
  },
  itemImg: {  
    width: 96,
    height: 74,
    borderRadius: SIZES.radiusTwo
  },
  wrapperItem: {
    display: 'flex',
    flexDirection: 'row', // This places text on the left and image on the right
    alignItems: 'flex-start', // Align items at the start
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding2,
    borderBottomColor: COLORS.gray_border,
    borderBottomWidth: 1,
    borderStyle: 'dashed'
  },
  noResultFoundContainer: {
    height: 300, 
    justifyContent: 'center'
  },
  noResultFoundText: {
    textAlign: 'center',
    color: 'black'}
};

export default styles;
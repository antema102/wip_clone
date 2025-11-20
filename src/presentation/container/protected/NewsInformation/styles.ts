import {StyleSheet, Dimensions} from 'react-native';
import { COLORS, SIZES } from '../../../../resources/constants';

const windowDim = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  MainContainer: {
    backgroundColor: COLORS.white, 
    flex: 1,
     borderTopLeftRadius: 20, 
     borderTopRightRadius: 20 
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingVertical: SIZES.padding2,
    borderBottomColor: COLORS.gray_border,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  category: {
    fontSize: SIZES.font,
    color: COLORS.secondary,
    marginBottom: SIZES.padding6,
  },
  image: {
    width: 24,
    height: 24,
    flex: 0,
  },
  bigBtnTxt: {
    fontSize: SIZES.body3,
    color: COLORS.white,
    fontWeight: '700',
  },
  buttonHomeExport: {
    paddingHorizontal: 8,
    height: 56,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warn: {
    color: COLORS.secondary,
    fontSize: SIZES.h5,
    marginBottom: SIZES.padding5,
  },
  advice: {
    color: COLORS.black,
    fontSize: SIZES.body5,
  },
  info: {
    backgroundColor: COLORS.blue_back,
    borderRadius: SIZES.radius,
    padding: SIZES.padding5,
    width: windowDim - 50,
    flexDirection: 'row',
    marginBottom: SIZES.padding,
  },
  filter: {
    flexWrap: 'wrap',
    borderColor: COLORS.blue_border,
    borderWidth: 1,
    borderRadius: 8,
    height: 32,
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding4,
    marginBottom: SIZES.padding4,
    paddingHorizontal: 8,
  },
  headWrapperText: {
    width: windowDim - 85,
    flex: 0,
    marginRight: 10,
    paddingHorizontal: SIZES.padding6,
  },
  wrapperText: {
    //width: windowDim - 155,
    flex: 0,
    marginRight: 10,
    
  },
  title: {
    fontWeight: 'bold',
    fontSize: SIZES.h5,
    color: COLORS.gray_title,
    marginBottom: SIZES.padding5,
  },
  content: {
    fontSize: SIZES.font,
    color: COLORS.gray_title,
    marginBottom: SIZES.padding5,
  },
  date: {
    color: COLORS.primary,
    fontSize: SIZES.body5,
    backgroundColor: COLORS.blue_back,
    borderRadius: SIZES.radiusTwo,
    paddingHorizontal: SIZES.padding6,
    marginBottom: SIZES.padding6,
    lineHeight: 28,
  },
  source: {},
  wrapperImg: {
    flex: 1,
    width: "100%",
    alignItems: 'center'
  },
  itemImg: {
    width: '100%',
    height: 400,
    borderRadius: SIZES.radiusTwo,
  },
  seeMoreContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.secondary,
  },
  seeMoreText: {
    color: COLORS.white,
  }
});

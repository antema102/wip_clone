import { COLORS, SIZES } from '../../../../../resources/constants';

let windowWidth = window.innerWidth;

export const styles = {
  containers: {
    width: '100%',
    padding: SIZES.padding,
    shadowColor: '#000',
    backgroundColor: COLORS.white,
    marginTop: 24,
    borderRadius: 10,
    position: 'relative',
    shadowOffset: {
      width: 0,
      height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    boxShadow: 'none'
  },
  containerFormList: {
    width: '100%'
  },
  contentResultContainer: {
  },
  contentResult: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: 'bold',
    letterSpacing: 0.15,
    textAlign:'center'
  },
  contentTitle: {
    paddingVertical: 32
  },
  title:{
    color:'#203F63',
    fontWeight:'700'
  },
  image:{
    height:175,
    width:200,
    objectFit:'cover'
  }
});

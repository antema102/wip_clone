;
import { COLORS, SIZES } from '../../../resources/constants';

const { width } = Dimensions.get('window');

export default ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginLeft: 20,
    marginRight: 20,
    boxShadow: 'none'},
  containerMobiles: {
    backgroundColor: 'white'},
  container2: {
    flex: 1,
    bottom: 100,
    backgroundColor: COLORS.gray_dashed,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    padding: 100,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 120,
    boxShadow: 'none'},
  stats: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20},
  stat: {
    flex: 1,
    alignItems: 'center'},
  statLabel: {
    color: '#999',
    fontSize: 14},
  statValue: {
    fontSize: 18},
  button: {
    height: 56,
    width: 363,
    left: 24,
    top: 312,
    borderRadius: 16,
    padding: 16},
  buttonHome: {
    paddingHorizontal: 8,
    height: 42,
    width: 220,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.secondary},
  buttonActions: {
    paddingRight: SIZES.padding2,
    height: 42,
    width: 220,
    borderRadius: SIZES.radius,
    flexDirection: 'row-reverse',
    backgroundColor: COLORS.secondary,
    justifyContent: 'space-between'},
  buttonHomeActionsaisir: {
    paddingHorizontal: 8,
    height: 42,
    width: 220,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    alignItems: 'center'},
  buttonHomeExport: {
    paddingHorizontal: 8,
    height: 42,
    width: 220,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center'},
  bigBtnTxt: {
    fontSize: SIZES.body4,
    color: COLORS.white,
    fontWeight: '700'},
  alignSwitch: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom:16
  },
  titleGroup: {
    fontWeight: 'bold',
    fontSize: 20,
    color: COLORS.black,
    // alignItems: 'center',
    marginRight: 20},
  contentProfil: {
    paddingHorizontal: 24,
    flexDirection: 'column'},
  containerMore:{
    marginTop:16,
    paddingHorizontal:24,
    paddingTop:16,
    paddingBottom:14
  },
  textMore:{
    fontSize:14,fontWeight:700,marginBottom:14
  },
  contentMore:{
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row'
  },
  stylesButtons:{
    height:30
  }
});

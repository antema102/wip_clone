;
import { COLORS, SIZES } from '../../../../../resources/constants';

const winWidth = window.innerWidth;

export const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',

    padding: 8},

  card_template: {
    marginRight: SIZES.padding2,
    marginTop: 6,
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 10},

  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#00003E',
    paddingBottom:8
  },

  navbarBtn: {
    width: 100,
    height: 20,
    borderColor: COLORS.gray_border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 5,
    marginRight: 10,
    paddingLeft: 10},

  textBtn: {
    color: 'red',
    fontSize: 12},

  textList: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    color: COLORS.secondary,
    marginBottom: 5},

  duration: {
    color: COLORS.secondary,
    fontStyle: 'normal',
    fontWeight: 'normal'},

  list: {
    display: 'flex',
    flexDirection: 'row',
    borderStyle: 'dashed',
    borderColor: COLORS.gray_line,
    borderWidth: 1,
    paddingTop: 15},

  image: {
    width: 68,
    height: 68,
    borderRadius: 8,
    top: 10},
  simpleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: SIZES.padding4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray_border,
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    marginBottom: SIZES.padding4},
  activeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: SIZES.padding4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    marginBottom: SIZES.padding4,
    backgroundColor: COLORS.blue_back},
  textMenu: {
    fontWeight: 'bold',
    fontSize: SIZES.body5,
    color: COLORS.black},
  textMenuActive: {
    fontWeight: 'bold',
    fontSize: SIZES.body5,
    color: COLORS.primary},

  card_title: {
    fontWeight: 'bold',
    color: COLORS.white,
    fontSize: SIZES.h5,
    paddingLeft: 20,
    width: '100%',
    // justifyContent: 'center'},
  jobPlace: {
    fontSize: SIZES.body5,
    color: COLORS.white,
    paddingLeft: 20,
    width: '100%'},
  candidatExp: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0.2,
    flex: 12},
  favorisView: { flex: 1, flexDirection: 'flex-end', bottom: 5 },
  favorisImage: {
    width: 25.5,
    height: 24},
  footerFrame: {
    flexDirection: 'row',
    paddingBottom: 15,
    marginHorizontal: 10,
    marginTop: 32,
    // width: winWidth * 0.75
  },
  jobPlaceItem: {
    fontSize: SIZES.body5,
    color: COLORS.black,
    paddingBottom:8
    // width: winWidth - 86},
  jobDate: {
    flex: 1,
    flexBasis: '100%',
    fontFamily: 'Oxygen-Regular',
    fontSize: SIZES.body5,
    color: COLORS.white,
    marginTop: SIZES.padding3},
  jobDateItem: {
    flex: 1,
    flexBasis: '100%',
    fontFamily: 'Oxygen-Regular',
    fontSize: SIZES.body5,
    color: COLORS.secondary,
    marginTop: 10},
  wrapperText: {
    // width: winWidth * 0.58 - 86,
    flex: 1,
    paddingRight: 20},
  wrapperTextItem: {
    top: 10,
    flex: 1,
    paddingRight: 24,
    paddingLeft: 24},
  listItemOffer: {
    marginVertical: 10,
    overflow: 'scroll'},
  card_templateItem: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor:COLORS.vector_blue,
    padding:24,
    borderRadius:10,
    marginBottom:18,
    minHeight:125
  },
  wapperTitle: {
    height: 50,
    justifyContent: 'center',
    marginTop: 24},
  carouselContainer: {
    flex: 1,
    marginVertical: 20},
  header: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.padding2,
    borderRadius: 10,
    padding: 10,
    borderWidth:1,
    borderColor:COLORS.primary
  },
  headerMobile: {
    backgroundColor: COLORS.white,
    marginRight: SIZES.padding2,
    width: '80%',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
    borderWidth:1,
    elevation: 5, // Ombre pour Android
    shadowColor: '#000', // Couleur de l'ombre pour iOS
    shadowOffset: { width: 0, height: 2 }, // Direction de l'ombre pour iOS
    shadowOpacity: 0.2, // Opacité de l'ombre pour iOS
    shadowRadius: 4, // Rayon de l'ombre pour iOS
    borderColor:COLORS.blueInput
  },
  headerContainer: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Vertically center items
    padding: 10,
    marginBottom: 10, // Add margin to separate items
    backgroundColor: COLORS.primary,
    borderRadius: 10},
  avatarContainer: {
    marginRight: 10, // Add spacing between avatar and information
    flexDirection: 'row',
    backgroundColor: '#fff', // Nécessaire pour que l'ombre soit visible
    borderRadius: 8, // Arrondi des bords
    elevation: 5, // Ombre pour Android
    shadowColor: '#000', // Couleur de l'ombre pour iOS
    shadowOffset: { width: 0, height: 2 }, // Direction de l'ombre pour iOS
    shadowOpacity: 0.2, // Opacité de l'ombre pour iOS
    shadowRadius: 4, // Rayon de l'ombre pour iOS
  },
  informationContainer: {
    flex: 1, // Let the information container take up remaining space
    paddingLeft: 10},
  avatar: {
    width: 80, // You can adjust this size as needed
    height: 80,
    borderRadius: 4},
  name: {
    fontSize: 16, // You can adjust this size as needed
    fontWeight: 'bold',
    color: COLORS.secondary},
  nameMobile: {
    fontSize: 14, // You can adjust this size as needed
    fontWeight: 'bold',
    color:COLORS.black,
    width: 160},
  label: {
    fontSize: winWidth > 991 ? 14 : 12,
    color:COLORS.secondary,
    marginTop: 16, // Add spacing between labels
  }});

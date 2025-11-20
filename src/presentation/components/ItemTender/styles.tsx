;
import { COLORS, SIZES } from '../../../resources/constants';

let windowWidth = window.innerWidth;

export const styles = {
  abonnementList: {
    flex:3
  },

  subscriptionContainer: {
    paddingHorizontal:34,
    paddingVertical:34,
    backgroundColor:'rgba(207, 231, 255, 0.28)',
    borderRadius:10,
    marginVertical:24
  },
  subscriptionDetailsContainer: {
    flexDirection:'row'
  },
  noStyle: {},
  btnDetail: {
    marginTop: 16,
    paddingBottom: 16},


  description: {
    marginRight: 16,
    marginTop: 16,
    // paddingBottom: 16,
    textAlignVertical: 'center'},

  subscriptionName: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: 'bold'},
  descriptionText: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: 'normal',
    letterSpacing: 0.2,
    // height: windowWidth * 0.04,
    textAlignVertical: 'center'},

  smallBtnTxt: {
    fontSize: SIZES.body5,
    color: COLORS.white,
    fontWeight: '700'},
  smallButtonContainer: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radiusTwo,
    paddingHorizontal: 8},
  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'},

  buttonAcheter: {
    height: 50,
    borderRadius: SIZES.radius,
    backgroundColor: '#01129E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginBottom: SIZES.padding2},
  detailSub: {
    marginBottom: 20,
    marginTop: 20},
  titleDetails: {
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#01129E'},
  detailValue: {
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#323F4B'},
  detailItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15},
  textBtnSecondary: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.h5},
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 35,
    paddingHorizontal: 20,
    paddingBottom: 7,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5},
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'}});

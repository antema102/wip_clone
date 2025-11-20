;
import { COLORS, SIZES } from '../../../resources/constants';

let windowWidth = window.innerWidth;

export const styles = {
  abonnementList: {},

  subscriptionContainer: {
    borderBottomColor: COLORS.blue_border,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    marginTop: 24,
    marginHorizontal: 24,
    flexDirection: 'column'},
  subscriptionDetailsContainer: {
    flex: 2},
  btnDetail: {
    marginTop: 16,
    paddingBottom: 16},
  btnBuy: {
    paddingBottom: 50,
    position: 'absolute',
    right: 20,
    bottom: 0},

  description: {
    marginRight: 16,
    marginTop: 16,
    paddingBottom: 16,
    textAlignVertical: 'center'},

  subscriptionName: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: 'bold',
    fontFamily: 'Oxygen'},
  descriptionText: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: 'normal',
    fontFamily: 'Oxygen',
    letterSpacing: 0.2,
    height: windowWidth * 0.04,
    textAlignVertical: 'center'},

  smallBtnTxt: {
    fontSize: SIZES.body4,
    color: COLORS.white,
    fontFamily: 'Oxygen',
    fontWeight: '700'},
  smallButtonContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radiusTwo,
    paddingHorizontal: 8,
    width: 100},
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
    width: '100%',
    marginBottom: 20,
    marginTop: 20},
  titleDetails: {
    fontFamily: 'Oxygen',
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#01129E',
    fontSize: 16,
    lineHeight: 24},
  detailValue: {
    fontFamily: 'Oxygen',
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#323F4B',
    fontSize: 16,
    lineHeight: 24},
  detailItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15},
  textBtnSecondary: {
    color: COLORS.white,
    fontFamily: 'IBMPlexSans-SemiBold',
    fontSize: SIZES.h5},
  icon: {
    width: 24, // Set the width of the image
    height: 24, // Set the height of the image
  },
  modalView: {
    width: '30%',
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

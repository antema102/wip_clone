import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../../../resources/constants';

let windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  abonnementList: {
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: COLORS.vector_orange,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    width: 250
  },

  subscriptionContainer: {
    marginTop: 24,
    marginHorizontal: 24,
    flexDirection: 'column',
  },
  subscriptionDetailsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16
  },
  btnDetail: {
    marginTop: 16,
    paddingBottom: 16,
  },
  btnBuy: {
    minWidth: 200,
  },
  description: {
  },

  subscriptionName: {
    fontSize: 20,
    color: COLORS.vector_orange,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 15,
    color: COLORS.black,
    fontWeight: 'normal',
    letterSpacing: 0.2,
    textAlignVertical: 'center',
  },

  smallBtnTxt: {
    fontSize: SIZES.body4,
    color: COLORS.white,
    fontWeight: '700',
  },
  smallButtonContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radiusTwo,
    paddingHorizontal: 8,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  buttonAcheter: {
    height: 50,
    borderRadius: SIZES.radius,
    backgroundColor:COLORS.vector_orange,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding2,
  },
  detailSub: {
    width: '100%',
    marginBottom: 20,
    marginTop: 20,
  },
  titleDetails: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
  },
  detailValue: {
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#323F4B',
    fontSize: 16,
    lineHeight: 24,
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
  },
  textBtnSecondary: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.h5,
  },
  icon: {
    width: 24, // Set the width of the image
    height: 24, // Set the height of the image
    tintColor:COLORS.vector_orange
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

import { COLORS, SIZES } from '../../../resources/constants';

const windowDim = window.innerWidth;
export default {
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },

  buttonAnnuler2: {
    height: 50,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginBottom: SIZES.padding2,
  },
  buttonAnnuler: {
    height: 50,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginBottom: SIZES.padding2,
  },
  textBtnSecondary: {
    color: COLORS.secondary,
    fontSize: SIZES.h5,
  },
  textBtnSecondary2: {
    color: COLORS.white,
    fontSize: SIZES.h5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
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
  screenContainer2: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
  },
  buttonStyles: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 5,
    borderRadius: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: COLORS.black,
  },
};

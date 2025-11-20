import { COLORS } from '../../../resources/constants';

export default {
  containerSelect: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
  },
  textError: {
    color: '#f00',
    fontSize: 14,
    fontFamily: 'Oxygen-Regular',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.25)',
  },
  modalView: {
    width: '90%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    marginVertical: 5,
  },
  button: {
    paddingVertical: 20,
    width: '100%',
    borderColor: COLORS.lightGray,
    borderTopWidth: 1,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: COLORS.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
};

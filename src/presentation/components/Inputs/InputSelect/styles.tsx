import { COLORS, SIZES } from '../../../../resources/constants';

export default {
  containerSelect: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
  },
  textError: {
    color: '#f00',
    fontSize: 14,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.25)',
  },
  modalView: {
    width: 'auto%',
    height: 'auto',
    maxHeight: '60%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
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
    paddingHorizontal: 10,
    fontSize: SIZES.h5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
};

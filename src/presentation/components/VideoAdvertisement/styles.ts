import { COLORS } from '../../../resources/constants';

export default {
  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  iconClose: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 0,
    justifyContent: 'flex-end',
    marginTop: 2,
    paddingBottom: 5,
    marginRight: 5,
    position: 'absolute',
    zIndex: 2,
  },
  videoShape: {
    borderRadius: 15,
    cursor: 'pointer',
  },
  container: {
    height: '100%',
    width: '100%',
    padding: 40,
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: 'normal',
    letterSpacing: 0.2,
    textAlignVertical: 'center',
  },
  modalView: {
    marginVertical: '3%',
    backgroundColor: 'black',
    borderRadius: 20,
    flex: 1,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: COLORS.black,
  },
};

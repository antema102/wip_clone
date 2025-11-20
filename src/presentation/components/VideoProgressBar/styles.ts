
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5e5e5'
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  takingVideoCircleShape: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 150 / 2,
    marginLeft: screenWidth / 2 - 30
  },
  switchingCircleShape: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 150 / 2,
    marginLeft: screenWidth / 4 - 40
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  containerModal: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    top: 60,
    width: '50%',
    height: 175,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  waitingText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  progressContainer: {
    width: '60%',
    height: 40,
    padding: 3,
    borderColor: '#000099',
    borderWidth: 3,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  inner: {
    width: '100%',
    height: 30,
    borderRadius: 15,
    backgroundColor: '#44E2F3'
  },
  label: {
    fontSize: 23,
    color: 'black',
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center'
  }
};
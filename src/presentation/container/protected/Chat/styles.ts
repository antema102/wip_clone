import {StyleSheet} from 'react-native';
import { COLORS, SIZES } from '../../../../resources/constants';

export const styles = StyleSheet.create({
  containers: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    boxShadow: 'none'
  },

  contentAdvice: {
    backgroundColor: COLORS.blue_back,
    marginTop: 60,
    borderRadius: SIZES.radius,
  },
  resumeTitle: {
    padding: SIZES.padding,
    fontSize: SIZES.h5,
    color: COLORS.black,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  container: {
    width: '100%',
    backgroundColor: 'transparent'
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  takingVideoCircleShape: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 150 / 2,
  },
  switchingCircleShape: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 150 / 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerModal: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    height: 100,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
  waitingText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    height: 40,
    padding: 3,
    borderColor: '#000099',
    borderWidth: 3,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  inner: {
    width: '100%',
    height: 30,
    borderRadius: 15,
    backgroundColor: '#44E2F3',
  },
  label: {
    fontSize: 23,
    color: 'black',
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
  },
  contentPage:{
    borderRadius:10,
    marginTop:60,
    position:'relative'
  },
  content:{
    position: 'absolute', 
    backgroundColor: COLORS.blue_back,
    paddingVertical:16,
    paddingHorizontal:24,
    borderRadius:10,
    left:'50%',
    top: -25,
    transform: [
      { translateX: '-50%' },
      { translateY: 0 }
    ]
  },
  title:{
    fontWeight: '700', 
    fontSize: 16,
    color:COLORS.black 
  },
});

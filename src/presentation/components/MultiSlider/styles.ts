
const {height: screenHeight, width: screenWidth} = Dimensions.get('window');

export const styles = {
  sliderWrapper: {
    flex: 1,
    marginVertical: 20,
    justifyContent: 'center',
    width: '100%'
  },
  viewContainer: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20
  },
  labelText: {
    fontSize: 20,
    color: 'black'
  }
};
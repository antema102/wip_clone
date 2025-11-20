import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  listItemOffer: {
    marginVertical: 10,
    overflow: 'scroll',
    flex: 1,
    marginHorizontal: 15,
  },
});

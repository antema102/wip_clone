import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { COLORS, SIZES } from '../../resources/constants'

export const FlatDetails = (props) => {
    const { variable } = props
  return (
    <View style={styles.item}>
      <View style={styles.bloc3}>
        <View style={styles.iconStyle} />
        <View><Text style={[{ marginLeft: 10, }, styles.paragraph]}>{variable.title} : </Text></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  iconStyle: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusTwo,
    marginTop: 4,
  },
  TextDetails: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 16,
  },
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  bloc3: {
    flexDirection: 'row',
    flex: 1,
  },
  bloc2: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  image2: {
    width: 8,
    height: 8,
    backgroundColor: '#F0F9FF'
  },
  item: {
    backgroundColor: 'white',
    padding: 5,
    marginVertical: 8,
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
  },
  text: {
    fontFamily: 'Oxygen-Regular',
    fontSize: 12,
  },
  textLign: {
    paddingLeft: 10,
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  paragraph: {
    fontFamily: 'Oxygen-Regular',
    fontSize: SIZES.h5,
    color: COLORS.gray_title,
  }
})
export default FlatDetails
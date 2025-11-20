import React from 'react'
import { View, Text, StyleProp, ViewStyle , Image } from 'react-native'
import { styles } from './styles'
import { images } from '../../../resources/constants'
import { useMobile } from '../../../service/hooks/useMobile'
interface TypeNotFounds {
  label?: string,
  text?: string,
  image?: any,
  customImage?: StyleProp<ViewStyle>
}
const NotFounds = ({ label, text, image, customImage }: TypeNotFounds) => {
  const { isMobile } = useMobile()
  return (
    <View style={styles.containerNoEvents}>
      <View style={styles.containerNoEvents}>
        {image ?
          <Image source={image} style={[styles.ImageNoEvents, customImage]} />
          :
          <Image source={images.notFound} style={[styles.ImageNoEvents, customImage]} />
        }
        {label &&
          <View style={styles.textNoEvents}>
            <Text style={[{ fontWeight: '700' }, isMobile ? { fontSize: 18 } : { fontSize: 26 }]}>{label}</Text>
            <Text>  {text} </Text>
          </View>
        }
      </View>
    </View>
  )
}

export default NotFounds

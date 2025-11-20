import React from 'react'
import { View, Image, ImageStyle, StyleProp } from 'react-native'
import { images } from '../../../resources/constants'
import { styles } from './style'

interface typeBanner {
    _customStyle?: StyleProp<ImageStyle>;
}
const BannerRefonte = ({ _customStyle }: typeBanner) => {
    return (
        <View style={styles.containerImage}>
            <Image source={{ uri: images.header_gif }} style={[styles.image, _customStyle]} />
        </View>
    )
}

export default BannerRefonte

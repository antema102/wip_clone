import React from 'react'
import { View, Image } from 'react-native'
import { images } from '../../../resources/constants'
import { styles } from './style'
const AdsSideBar = () => {
    return (
        <View style={styles.content}>
            <Image source={{ uri: images.recrute_gif }} style={styles.imagesSideBar} />
        </View>
    )
}

export default AdsSideBar

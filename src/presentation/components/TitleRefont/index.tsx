import React from 'react'
import { View, Text,StyleProp,ViewStyle } from 'react-native'
import {styles} from './style'

interface TitleRefontType {
    title: string,
    _customStyle?: StyleProp<ViewStyle>; // Utilisation du bon type pour le style
}

const TitleRefont = ({ title,_customStyle }: TitleRefontType) => {
    return (
        <View style={[styles.content,_customStyle]}>
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    )
}

export default TitleRefont;

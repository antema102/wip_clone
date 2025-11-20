import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'
import Label from '../../../../../components/Inputs/Label';

interface itemResultType {
    label:string,
    text?: any;
}
const ItemResult = ({ text,label }: itemResultType) => {
    return (
        <View style={styles.itemResult}>
            <View style={styles.content}>
                <Text style={styles.text}>{label }:</Text>
                <Text >{text}</Text>
            </View>
        </View>

    )
}

export default ItemResult
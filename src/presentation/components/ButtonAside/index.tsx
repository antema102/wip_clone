import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Divider } from 'primereact/divider';
import styles from './styles';

interface ButtonAsideProps {
    title: string;
    onPress?: any;
    icon?: any;
    toogle?: any
}

const ButtonAside = ({ title, onPress, icon, toogle }: ButtonAsideProps) => {
    return (
        toogle ?
            <View style={styles.containerButton}>
                <View style={styles.button}>
                    <View style={styles.buttonContent}>
                        <Image source={icon} style={styles.buttonIcon} />
                        <Text style={styles.buttonTitle}>{title}</Text>
                    </View>
                </View>
                <Divider type='solid' />
            </View> :
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <View style={styles.buttonContent}>
                        <Image source={icon} style={styles.buttonIcon} />
                        <Text style={styles.buttonTitle}>{title}</Text>
                    </View>
                </TouchableOpacity>
                <Divider type='solid' />
            </View>
    )
}

export default ButtonAside
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { styles } from './styles';
import { images } from '../../../resources/constants';

type headerProps = {
    title: string,
    subtitle?: string,
    headPhoto?:any,
    noImage?: boolean
}

const SidePageHeader = ({ title, subtitle, headPhoto, noImage }: headerProps) => {
    return (
        <View
            style={styles.MainPageHeader}>
            <View style={[styles.item1]}>
                <Text style={styles.item1Title}>
                    {title}
                </Text>
                {subtitle && <Text style={styles.item1SubTitle}>
                    {subtitle}
                </Text>}
            </View>
            {!noImage && <Image source={headPhoto ? headPhoto : images.bienvenue} style={[styles.item2]} />}
        </View>
    )
}

export default SidePageHeader
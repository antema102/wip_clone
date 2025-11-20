import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'
import { useMobile } from '../../../service/hooks/useMobile'
interface ViewDetailsType {
    label: string,
    value: string
}
const ViewDetailsCandidat = ({ label, value }: ViewDetailsType) => {
    const { isMobile } = useMobile()
    return (
        <View style={isMobile ? "" : styles.containerText}>
            {!isMobile && (
                <Text style={styles.textLabel}>
                    {label} :
                </Text>
            )}
            <View style={isMobile ? styles.contentTextMobile : {}}>
                {label === "Experience" && isMobile && (
                    <Text style={{ fontSize: 12, fontWeight: '700' }}>
                        Experience :
                    </Text>
                )}
                {label === "Salaire brut (Ariary)" && isMobile ?
                    <Text style={{ fontSize: 12 }}>
                        {value} Ar
                    </Text>
                    :
                    <Text style={{ fontSize: 12 }}>
                        {value}
                    </Text>
                }
            </View>
        </View>
    )
}

export default ViewDetailsCandidat

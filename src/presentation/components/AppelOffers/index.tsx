import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './style'
import { DataView } from 'primereact/dataview'

interface appelOffersType {
    listOffers: Array<string>,
    navigateCombinaisonCandidat: any
}

const AppelOffers = ({ listOffers, navigateCombinaisonCandidat }: appelOffersType) => {

    const itemOffers = (data: string, index: number) => {
        return (
            <TouchableOpacity style={styles.appelOffersButton} onPress={() => navigateCombinaisonCandidat(index, data)}>
                <Text style={styles.appelOffersButtonText}>{data}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.appelOffersContainer}>
            <Text style={styles.appelOffersTitle}>Appels d’offres :</Text>
            <View style={styles.appelOffersContent}>
                <DataView
                    value={listOffers}
                    itemTemplate={(data, index) => itemOffers(data, index)}
                    rows={2}
                    paginator
                    paginatorTemplate="PrevPageLink PageLinks NextPageLink" />
            </View>
        </View>
    )
}

export default AppelOffers

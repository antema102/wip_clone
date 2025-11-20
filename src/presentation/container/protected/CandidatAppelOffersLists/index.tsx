import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './style'
import { DataView } from 'primereact/dataview'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { paginatorTemplateCustom } from '../../../components/PaginatoTemplateCustom'
import { useLang } from '../../../../data/translation'
import * as stringsEn from '../../../../data/constants/strings_en';
import * as stringsFr from '../../../../data/constants/strings';
import { ROLEACCOUNT } from '../../../../data/constants/strings';
import { useTender } from '../../../../service/redux/ducks/tender';
import MiniLoader from '../../../components/MiniLoader';

const CandidatAppelOffersLists = () => {
    const { lang } = useLang()
    const activeString = lang === 'fr' ? stringsFr : stringsEn;
    const [listDatas, setListDatas] = useState();
    const { accessToken, user } = useSelector(({ auth }: any) => auth);
    const { getTenderCategory } = useTender();
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigate()
    const { dataCategory } = useSelector(({ tender }: any) => tender);

    const reidirectionTender = (index: any, item: string) => {
        navigation('/ListScreen', {
            state: {
                id: index,
                title: `Liste des appels d'offres ${item}`,
                companyName: item,
            }
        });
    };

    const getCategoryForTenders = async () => {
        setIsLoading(true);
        const data = {
            audience: user?.role === ROLEACCOUNT.candidate ? 0 : 1,
        };
        const response = await getTenderCategory(data, accessToken);
        setListDatas(response.data);
        setIsLoading(false);
    };

    useEffect(() => {
        getCategoryForTenders()
    }, []);

    const itemOffers = (data: string, index: number) => {
        return (
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={styles.appelOffersButton} onPress={() => reidirectionTender(index, data)}>
                    <Text style={styles.appelOffersButtonText}>{data}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            <View style={styles.appelOffersContainer}>
                <Text style={styles.appelOffersTitle}>{activeString.APPEL_OFFRE.TITLE_OFFERS}</Text>
                {
                    isLoading ?
                        <MiniLoader /> :
                        <View >
                            <DataView
                                value={listDatas}
                                itemTemplate={(data, index) => itemOffers(data, index)}
                                rows={2}
                                paginatorTemplate={paginatorTemplateCustom}
                                paginator />
                        </View>
                }
            </View>
        </View>

    )
}

export default CandidatAppelOffersLists

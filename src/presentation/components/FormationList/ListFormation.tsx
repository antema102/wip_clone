import React from 'react';
import { View, FlatList, Text } from 'react-native';
import globalStyle from '../../globalStyle/globalStyle';
import { Offer } from '../Offer';
import { DataView } from 'primereact/dataview';
import FixedButtonCircle from '../Button/FixedButtonCircle';
import { useNavigate } from 'react-router-dom';
import { paginatorTemplateCustom } from '../PaginatoTemplateCustom';
import { useLang } from '../../../data/translation';
import * as stringsEn from '../../../data/constants/strings_en';
import * as stringsFr from '../../../data/constants/strings';


interface ListFormation {
    displayOfferSheet: (id: string) => void,
    data: string[],
    displayOfferSheetApply?: any,
    isFormation?: boolean,
}

export const ListFormation = (props: ListFormation) => {

    const { displayOfferSheet, data, displayOfferSheetApply } = props;
    const navigate = useNavigate();
    const createFormation = () => navigate('/EntrepriseFormationCreateScreen');
    const { lang } = useLang();

    const activeString = lang === 'fr' ? stringsFr : stringsEn; const renderItemTemplate = (item: any) => (
        <Offer
            item={item}
            displayOfferSheet={displayOfferSheet}
            displayOfferSheetApply={displayOfferSheetApply}
            isFormation={true}
        />
    );
    return (
        <View style={globalStyle.containersPageWidth}>
            <View style={{}}>
                {/** Listes des formations */}
                {data.length ?
                    <DataView value={data}
                        layout="list"
                        itemTemplate={renderItemTemplate}
                        paginator
                        paginatorTemplate={paginatorTemplateCustom}
                        rows={4} /> :
                    <View style={{ margin: 'auto', paddingTop: 34 }}>
                        <Text style={{ fontWeight: 700 }}>{activeString.FORMATIONS.NOT_FOUND}</Text>
                    </View>
                }
                <FixedButtonCircle handleNavigate={createFormation}
                    activeTooltip={true}
                    tooltipValue={'Création formation, stage, alternance'}
                    styles={{
                        height: 124,
                        flex: 1,
                        position: 'fixed',
                        bottom: 56,
                        justifyContent: 'center',
                        right: 500,
                    }} />
            </View>
        </View>
    );
};

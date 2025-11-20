import React from 'react';

;
import { DataView } from 'primereact/dataview';
import { Offer } from '../Offer';
import { useNavigate } from 'react-router-dom'
import FixedButtonCircle from '../Button/FixedButtonCircle';
import { useSelector } from 'react-redux';
import { paginatorTemplateCustom } from '../PaginatoTemplateCustom';
import { useLang } from '../../../data/translation';
import * as stringsFr from '../../../data/constants/strings';
import * as stringsEn from '../../../data/constants/strings_en';

interface ListOfferProps {
    displayOfferSheet: (offer: any) => void;
    displayOfferSheetApply: (offer: any) => void;
    data: any[];
}

export const ListOffer = (props: ListOfferProps) => {
    const { displayOfferSheet, data, displayOfferSheetApply } = props;
    const navigate = useNavigate();
    const { user } = useSelector(({ auth }: any) => auth);

    const { lang } = useLang();
    const activeString = lang === 'fr' ? stringsFr : stringsEn;

    const createOffer = () => navigate('/EntrepriseOfferCreateScreen');
    const renderItemTemplate = (item: any) => (
        <Offer
            item={item}
            displayOfferSheet={displayOfferSheet}
            displayOfferSheetApply={displayOfferSheetApply}
        />
    );

    // Normaliser `data` en tableau (prévenir l'erreur data.filter is not a function)
    const offersArray: any[] = Array.isArray(data)
        ? data
        : (data && Array.isArray((data as any).data) ? (data as any).data
            : (data && Array.isArray((data as any).items) ? (data as any).items : []));

    return (
        <div style={{}}>
            {/** Listes des Offres */}
            {offersArray.length ?
                <DataView
                    value={offersArray}
                    layout="list"
                    itemTemplate={renderItemTemplate}
                    paginator
                    paginatorTemplate={paginatorTemplateCustom}
                    rows={4}
                /> :
                <div style={{ marginHorizontal: 'auto', paddingTop: 34 }}>
                    <span style={{ fontWeight: 700 }}> {activeString.OFFERS.NO_OFFER} </span>
                </div>
            }
            <FixedButtonCircle handleNavigate={createOffer}
                activeTooltip={true}
                tooltipValue={`Creation offre d'emploi`}
                styles={{
                    height: 124,
                    flex: 1,
                    position: 'fixed',
                    bottom: 56,
                    justifyContent: 'center',
                    right: 500}} />
        </div>
    );
};


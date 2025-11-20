import React, { useState, useEffect } from 'react';
;
import { COLORS, images } from '../../../resources/constants';
import { HOME, HOME_COMPANY } from '../../../data/constants/strings';
import { globalStyle } from '../../globalStyle/globalStyle';
import 'primeicons/primeicons.css';
import { styles } from './styles';
import Tabs from '../Tab';
import { EnterpriseFormationList } from '../FormationList';
import { EnterpriseOfferScreen } from '../EnterpriseOffer';
import './styles.css';
import { useSelector } from 'react-redux';
import { UserSA } from '../../../service/applicatif/User.sa';
import * as stringsFr from '../../../data/constants/strings';
import * as stringsEn from '../../../data/constants/strings_en';
import { useLang } from '../../../data/translation';
import { useNavigate } from 'react-router-dom';

const HomeEntreprise = (props: any): any => {
    const [isVisible, setIsVisible] = useState(false);
    const [isFormation, setIsFormation] = useState(false);
    const { user, accessToken } = useSelector(({ auth }) => auth);
    const { getUserText, getUserEchelle} = UserSA();

    const storeDynamicText = async (value: any) => {
        try {
            await localStorage.setItem('dynamic', JSON.stringify(value));
        } catch (error) { }
    };

    const storeDynamicEchelle = async (value: any) => {
        try {
            await localStorage.setItem('dynamicEchelle', JSON.stringify(value));
        } catch (error) { }
    };

    const storeDynamic = async () => {
        const response = await getUserText(accessToken);
        const responseEchelle = await getUserEchelle(accessToken);
        storeDynamicText(response?.data?.items);
        storeDynamicEchelle(responseEchelle?.data?.items);
    };


    useEffect(() => {
        storeDynamic();
    }, []);

    const { lang } = useLang();
    const activeString = lang === 'fr' ? stringsFr : stringsEn;
    return (
        <div style={[styles.containers, { borderRadius: 10, marginTop: 52, backgroundColor: COLORS.white, minHeight: 300 }]}>
            <div style={{ paddingTop: 34 }}>
                <span style={globalStyle.titleHome}>{activeString.HOME.PREFERENCE}</span>
            </div>
            <Tabs
                title1={activeString.OFFERS.OFFER}
                title2={activeString.OFFERS.OFFERT_LAST}
                isFormation={isFormation}
                setIsVisible={setIsVisible}
                Offers={
                    () => (
                        <EnterpriseOfferScreen
                            isFormation={false}
                            {...props}
                        />
                    )}
                Formations={
                    () => (
                        <EnterpriseFormationList
                            isFormation={true}
                            {...props}
                        />
                    )}
            />
        </div>
    );
};

export default HomeEntreprise;

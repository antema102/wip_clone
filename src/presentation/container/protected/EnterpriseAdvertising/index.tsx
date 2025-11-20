import React, { Fragment, useEffect, useState } from 'react';
import {
    View,
    RefreshControl,
    TouchableOpacity,
    ScrollView,
    Image,
    Text,
} from 'react-native';
import { useSelector } from 'react-redux';

import { UserSA } from '../../../../service/applicatif/User.sa';
import { DETAIL_PROFIL, ROLEACCOUNT } from '../../../../data/constants/strings';
import Loader from '../../../components/CreateCV/Loader';
import MainPageHeader from '../../../components/MainPageHeader';
import { Advertising } from '../../../components/EnterpriseAdvertising/Advertising';
import { COLORS, icons } from '../../../../resources/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import FixedButtonCircle from '../../../components/Button/FixedButtonCircle';
import { DataView } from 'primereact/dataview';
import { styles } from './styles';
import MiniLoader from '../../../components/MiniLoader';
import * as stringsFr from '../../../../data/constants/strings';
import * as stringsEn from '../../../../data/constants/strings_en';
import { useLang } from '../../../../data/translation';
import { useMobile } from '../../../../service/hooks/useMobile';
import { paginatorTemplateCustom } from '../../../components/PaginatoTemplateCustom';
import NotFounds from '../../../components/NotFounds';
import TitleRefont from '../../../components/TitleRefont';

export const EnterpriseAdvertisingScreen = (props: any) => {
    const { route } = props;
    const { state } = useLocation();
    const navigate = useNavigate();
    const [refreshing, setRefreshing] = useState(false);
    const { getAdverstisementsByOwnerId, getCostsUser, getPostsByOwnerId } = UserSA();
    const { user, accessToken } = useSelector(({ auth }: any) => auth);
    const [data, setData] = useState<any>([]);
    const [index, setIndex] = useState(1);
    const [page, setPage] = useState(1);
    const [pageArray, setPageArray] = useState();
    const [endPage, setEndPage] = useState(2);
    const [costsPrice, setCostsPrice] = useState();

    const { lang } = useLang();
    const activeString = lang === 'fr' ? stringsFr : stringsEn;

    const { isMobile, loading: loadingMobile } = useMobile();

    const location = useLocation();
    const url = location.pathname;

    const handleBackButton = () => {
        navigate(
            user?.role === activeString.ROLEACCOUNT.company
                ? '/DetailProfilEntrepriseScreen'
                : '/DetailProfilScreen',
        );
        return true;
    };

    const getCostsForUser = async () => {
        try {
            const response = await getCostsUser(accessToken);
            setCostsPrice(response?.data?.items);
            setRefreshing(false);
        } catch (error) { }
    };

    const storePage1 = async value => {
        try {
            await localStorage.setItem('page1', JSON.stringify(value));
        } catch (error) { }
    };

    const handlePage = async response => {
        if (response?.data?.items?.length !== 0) {
            const totalPage = Math.ceil(response?.data?.total / response?.data?.size);
            setEndPage(totalPage);
            const items = Array.from({ length: totalPage }, (_, index) => index);
            setPageArray(items);
            setData(response?.data?.items);
            setPage(index);
        } else {
            setIndex(index - 1);
            setPage(index - 1);
        }
    };

    const getAllAdvertisementByOwnerId = async () => {
        setRefreshing(true);
        const responseData = await localStorage.getItem('page1');
        let response;
        if (!responseData || state?.newData || index !== 1) {
            response =
                user?.role === activeString.ROLEACCOUNT.company
                    ? await getAdverstisementsByOwnerId(user?.id, accessToken, index)
                    : await getPostsByOwnerId(user?.id, accessToken, index);
            storePage1(response);
            await handlePage(response);
        } else {
            response = JSON.parse(responseData);
            await handlePage(response);
            response =
                user?.role === activeString.ROLEACCOUNT.company
                    ? await getAdverstisementsByOwnerId(user?.id, accessToken, index)
                    : await getPostsByOwnerId(user?.id, accessToken, index);
            storePage1(response);
            await handlePage(response);
        }
        getCostsForUser();
    };

    useEffect(() => {
        if (state?.newData) {
            navigate(location.pathname, { state: { newData: null } });
        }
    }, [])

    const createAnnouce = () => navigate('/EntrepriseOfferCreateScreen', {
        state: {
            offerDetail: {},
            advertisement: user?.role === activeString.ROLEACCOUNT.company ? 0 : 1,
            costsPrice
        }
    })

    const renderItemTemplate = (item: any) => (<Fragment>
        <Advertising
            data={item}
            navigation={navigate}
            isAd={user?.role === activeString.ROLEACCOUNT.company ? true : false}
        />
    </Fragment>);

    useEffect(() => {
        getAllAdvertisementByOwnerId();
    }, [index]);
    return (
        <View>
            {refreshing || loadingMobile && <Loader />}
            <View style={styles.container}>
                <View style={{ position: 'relative' }}>
                    <View style={[styles.containers]}>

                        <TitleRefont title={
                            user?.role === activeString.ROLEACCOUNT.company
                                ? activeString.DETAIL_PROFIL.HEADER_AD_TITLE
                                : activeString.DETAIL_PROFIL.HEADER_POST_TITLE
                        } />

                        {refreshing || loadingMobile ? <MiniLoader CustomStyle={{ position: 'fixed' }} /> : <>
                            {
                                data !== undefined ?
                                    <DataView value={data} layout="list" itemTemplate={renderItemTemplate} paginator rows={4} paginatorTemplate={paginatorTemplateCustom} />
                                    :
                                    <NotFounds image={icons.folder} customImage={{ height: 100, width: 100 }}
                                    />
                            }<FixedButtonCircle handleNavigate={createAnnouce}
                                activeTooltip={true}
                                tooltipValue={user?.role === activeString.ROLEACCOUNT.company ? ' Création publicité' : ' Ajouter une petits annonce'}
                                styles={
                                    isMobile ? {
                                        height: 124,
                                        flex: 1,
                                        position: 'abosulte',
                                        bottom: -75,
                                        left: 25
                                    } :
                                        {
                                            height: 124,
                                            flex: 1,
                                            position: 'fixed',
                                            bottom: 56,
                                            justifyContent: 'center',
                                            right: 500,
                                        }
                                } /> </>}
                    </View>
                </View>
            </View>
        </View>
    );
};

export default EnterpriseAdvertisingScreen;

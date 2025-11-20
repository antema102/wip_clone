import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
} from 'react-native';
import { useSelector } from 'react-redux';


import { styles } from './styles';
import { UserSA } from '../../../../service/applicatif/User.sa';
import { useTender } from '../../../../service/redux/ducks/tender';
import { DETAIL_PROFIL, ROLEACCOUNT, STATUS, TENDER } from '../../../../data/constants/strings';
import { useNavigate } from 'react-router';
import Loader from '../../../components/Loader';
import MainPageHeader from '../../../components/MainPageHeader';
import { ItemTender } from '../../../components/ItemTender';
import { COLORS } from '../../../../resources/constants';
import { PDFViewerScreen } from '../PDFVIewerScreen';
import FixedButtonCircle from '../../../components/Button/FixedButtonCircle';
import { Divider } from 'primereact/divider';
import { DataView } from 'primereact/dataview';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Popup from '../../../components/CreateCV/Popup';
import { Toast } from 'primereact/toast';
import MiniLoader from '../../../components/MiniLoader';
import HeaderTitle from '../HeaderTitle';
import NotFounds from '../../../components/NotFounds';
import TitleRefont from '../../../components/TitleRefont';
import { paginatorTemplateCustom } from '../../../components/PaginatoTemplateCustom';
import { icons } from '../../../../resources/constants';
import { useLang } from '../../../../data/translation';
import * as stringsEn from '../../../../data/constants/strings_en';
import * as stringsFr from '../../../../data/constants/strings';

export const EnterpriseTender = (props: any) => {

    const [refreshing, setRefreshing] = useState(false);
    const { getAllTenders, getCostsUser, getTenderPDF, deleteTenderById } = UserSA();
    const { user, accessToken } = useSelector(({ auth }: any) => auth);
    const [data, setData] = useState();
    const [dataUri, setDataUri] = useState('');
    const [visible, setVisible] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [newData, setNewData] = useState(false);
    const [error, setError] = useState(true);
    const [index, setIndex] = useState(1);
    const [page, setPage] = useState(1);
    const [pageArray, setPageArray] = useState();
    const [endPage, setEndPage] = useState(2);
    const [costsPrice, setCostsPrice] = useState();
    const [itemToDelete, setItemToDelete] = useState('');
    const { getTenderCategory } = useTender();
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const { lang } = useLang()
    const activeString = lang === 'fr' ? stringsFr : stringsEn;

    const navigateToCreate = () =>
        navigate('/EntrepriseOfferCreateScreen', {
            state: {
                offerDetail: {},
                advertisement: 2,
                costsPrice,
            }
        });

    const activatePopupDeletion = async (itemId: string) => {
        setConfirmation(true);
        setItemToDelete(itemId);
    };

    const deleteTender = async (itemID: string) => {
        setRefreshing(true);
        try {
            const data = {
                audience: user?.role === ROLEACCOUNT.candidate ? 0 : 1,
            };
            const response = await deleteTenderById(itemID, accessToken);
            await getTenderCategory(data, accessToken);
            if (response && response.data.isError) {
                setRefreshing(false);
                toast.current.show({ severity: 'error', summary: 'Information', detail: response.data.message, life: 3000 });
            } else {
                setRefreshing(false);
                // toast.current.show({ severity: 'success', summary: 'Information', detail: STATUS.TENDER_DELETE_SUCCESS, life: 3000 });
                setConfirmation(false);
                setNewData(true);
            }
        } catch (error) { }
    };

    const getCostsForUser = async () => {
        try {
            const response = await getCostsUser(accessToken);
            setCostsPrice(response?.data?.items);
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

    const displayPDF = async (itemID: string) => {
        setRefreshing(true);
        const response = await getTenderPDF(itemID, accessToken);
        setDataUri(response?.data[0]?.file);
        setVisible(true);
        setRefreshing(false);
    };

    const getAllTendersOfThisUser = async () => {
        setRefreshing(true);
        const responseData = await localStorage.getItem('page1');
        let response;
        if (!responseData || newData === true || index !== 1) {
            response = await getAllTenders(user?.id, accessToken, index);
            storePage1(response);
            await handlePage(response);
            setRefreshing(false);
        } else {
            response = JSON.parse(responseData);
            await handlePage(response);
            response = await getAllTenders(user?.id, accessToken, index);
            storePage1(response);
            await handlePage(response);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        getAllTendersOfThisUser();
    }, [index, newData]);

    useEffect(() => {
        getCostsForUser();
    }, []);

    const renderItemTemplate = (item: any) => (<Fragment>
        <ItemTender
            item1={item?.title}
            item2={item?.detail}
            item={item}
            action={displayPDF}
            isDelete={true}
            actionDelete={() => activatePopupDeletion(item?.id)}
        />
    </Fragment>);
    {/* <Header {...props} typeApp="Enterprise ?" special={true} /> */ }
    {/* {refreshing && <Loader />} */ }
    return (
        <>
            <View style={styles.container}>
                <Toast ref={toast} />
                <ConfirmDialog />
                <PDFViewerScreen visible={visible} setVisible={setVisible} data={dataUri} isDownloadAllowed={false} />
                {refreshing ? <MiniLoader CustomStyle={{ position: 'fixed' }} /> :
                    (<>
                        <View style={{ backgroundColor: COLORS.white, borderRadius: 10, marginTop: 52 }}>
                            <TitleRefont title={activeString.DETAIL_PROFIL.HEADER_TENDER_TITLE} />
                            <View style={styles.containers}>

                                {data?.length ?
                                    <DataView
                                        value={data}
                                        layout="list"
                                        itemTemplate={renderItemTemplate}
                                        paginatorTemplate={paginatorTemplateCustom}
                                        paginator
                                        rows={4} /> :
                                    (
                                        <NotFounds label={activeString.DETAIL_PROFIL.NOTFOUND_APPEL_OFFERS} image={icons.cardProfil} customImage={{ height: 125, width: 125 }} />
                                    )
                                }
                                <FixedButtonCircle handleNavigate={navigateToCreate}
                                    activeTooltip={true}
                                    tooltipValue={`Création Appel d'offre`}
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
                    </>)
                }
                <Popup
                    message={TENDER.CONFIRMATION_TENDER}
                    visible={confirmation}
                    validation={setConfirmation}
                    btnTitle="OK"
                    action={() => deleteTender(itemToDelete)}
                    cancel={true}
                />
            </View>
        </>
    );
};

export const EnterpriseTenderScreen: any = EnterpriseTender;

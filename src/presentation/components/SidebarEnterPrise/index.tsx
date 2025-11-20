import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DataView } from 'primereact/dataview';
import { History } from '../History';
import { useNavigate } from 'react-router';
import globalStyle from '../../globalStyle/globalStyle';
import { HOME_COMPANY } from '../../../data/constants/strings';
import { useHomeCompany } from '../ActivityOffer/useHomeCompany';
import styles from './styles';
import HistoryPopup from '../HistoryPopUp';
import './style.css';
import SideBarCandidat from '../SideBarCandidat';
import { useLang } from '../../../data/translation';
import SkeletonCards from '../SkeletonCards';
import * as stringsEn from '../../../data/constants/strings_en';
import * as stringsFr from '../../../data/constants/strings';

const HistorySearch = (props) => {
    const { allHistory, isLoading }: any = useHomeCompany();
    const navigate = useNavigate();
    const [modalAd, setModalAd] = useState(false);
    const [showQuit, setShowQuit] = useState(false);
    const [historyId, setHistoryId] = useState('');
    const { lang } = useLang()
    const activeString = lang === 'fr' ? stringsFr : stringsEn;
    const displayHistoryDetail = idHistory => {
        setModalAd(true);
        setHistoryId(idHistory);
        setShowQuit(true);
    };
    const itemTemplate = (search, id) => {
        return (
            <View key={`allHistory_${id}`} style={[styles.card, { backgroundColor: 'white', marginBottom: 8 }]}>
                <History
                    item={search}
                    displayHistoryDetail={displayHistoryDetail}
                />
            </View>
        );
    };
    return (
        <>
            <View style={styles.containers}>
                <View>
                    {/* {allHistory && ( */}
                    <Text style={[globalStyle.title3, { fontWeight: 'bold', marginBottom: 16 }]}>{activeString.HOME_COMPANY.HISTORY}</Text>
                    {
                        isLoading ? (
                            <View>
                                <SkeletonCards />
                            </View>
                        ) :
                            allHistory?.length ?
                                <DataView
                                    value={allHistory}
                                    itemTemplate={itemTemplate}
                                    paginator
                                    paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                                    rows={3} /> :
                                null}
                    <View style={{ marginVertical: 24 }}>
                        <SideBarCandidat {...props} />
                    </View>
                </View>
                <HistoryPopup
                    showQuit={showQuit}
                    visible={modalAd}
                    historyId={historyId}
                    setVisible={setModalAd}
                />
            </View>
        </>
    );
};

const SidebarEnterPrise = React.memo(HistorySearch);

export default SidebarEnterPrise;

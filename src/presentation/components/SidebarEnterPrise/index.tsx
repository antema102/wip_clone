import React, { useEffect, useState } from 'react';
;
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
            <div key={`allHistory_${id}`} style={[styles.card, { backgroundColor: 'white', marginBottom: 8 }]}>
                <History
                    item={search}
                    displayHistoryDetail={displayHistoryDetail}
                />
            </div>
        );
    };
    return (
        <>
            <div style={styles.containers}>
                <div>
                    {/* {allHistory && ( */}
                    <span style={[globalStyle.title3, { fontWeight: 'bold', marginBottom: 16 }]}>{activeString.HOME_COMPANY.HISTORY}</span>
                    {
                        isLoading ? (
                            <div>
                                <SkeletonCards />
                            </div>
                        ) :
                            allHistory?.length ?
                                <DataView
                                    value={allHistory}
                                    itemTemplate={itemTemplate}
                                    paginator
                                    paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                                    rows={3} /> :
                                null}
                    <div style={{ marginVertical: 24 }}>
                        <SideBarCandidat {...props} />
                    </div>
                </div>
                <HistoryPopup
                    showQuit={showQuit}
                    visible={modalAd}
                    historyId={historyId}
                    setVisible={setModalAd}
                />
            </div>
        </>
    );
};

const SidebarEnterPrise = React.memo(HistorySearch);

export default SidebarEnterPrise;

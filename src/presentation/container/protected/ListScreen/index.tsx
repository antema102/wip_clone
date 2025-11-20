import React, { Fragment, useEffect, useState } from 'react';
;
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { styles } from './styles';
import { UserSA } from '../../../../service/applicatif/User.sa';
import { ROLEACCOUNT } from '../../../../data/constants/strings';
import { ItemTender } from '../../../components/ItemTender';
import { PDFViewerScreen } from '../PDFVIewerScreen';
import { Divider } from 'primereact/divider';
import { DataView } from 'primereact/dataview';
import Loader from '../../../components/CreateCV/Loader';
import MiniLoader from '../../../components/MiniLoader';
import { useMobile } from '../../../../service/hooks/useMobile';
import TitleRefont from '../../../components/TitleRefont';
import { paginatorTemplateCustom } from '../../../components/PaginatoTemplateCustom';
const ListScreen = props => {
    const { state } = useLocation();
    const title = state?.title;
    const companyName = state?.companyName;
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState();
    const { accessToken, user } = useSelector(({ auth }) => auth);
    const { getTendersByName, getTenderPDF } = UserSA();
    const [visible, setVisible] = useState(false);
    const [dataUri, setDataUri] = useState('');
    const { isMobile } = useMobile();

    const displayPDF = async (itemID: string) => {
        setIsLoading(true);
        const response = await getTenderPDF(itemID, accessToken);
        setDataUri(response?.data[0].file);
        setIsLoading(false);
        setVisible(true);
    };

    const getTenders = async () => {
        setRefreshing(true);
        const dataForm = {
            audience: user?.role === ROLEACCOUNT.candidate ? 0 : 1,
            companyName: companyName};
        const response = await getTendersByName(dataForm, accessToken);
        setData(response?.data?.items);
        setRefreshing(false);
    };

    const renderItemTemplate = (item: any) => (<Fragment>
        <ItemTender
            item1={item?.title}
            item2={item?.detail}
            item={item}
            action={displayPDF}
        />
        <Divider type={'dashed'} />
    </Fragment>);

    useEffect(() => {
        getTenders();
    }, [state]);

    return (
        <>
            <div style={styles.container}>
                {isLoading ? <MiniLoader CustomStyle={{ position: 'fixed' }} /> : <PDFViewerScreen visible={visible} setVisible={setVisible} data={dataUri} isDownloadAllowed={false} />}
                {/* <Header {...props} /> */}
                {/* <HeaderTitle title={title} /> */}
                <div style={styles.containers}>
                    <TitleRefont title={title} />
                    {
                        refreshing ?
                            <div style={{ minHeight: 150, justifyContent: 'center', alignItems: 'center' }}>
                                <MiniLoader />
                            </div>
                            :
                            data && (
                                <DataView
                                    value={data}
                                    layout="list"
                                    itemTemplate={renderItemTemplate}
                                    {...(!isMobile && {
                                        paginator: true,
                                        rows: 4})}
                                    paginatorTemplate={paginatorTemplateCustom}
                                />
                            ) 

                    }
                </div>

            </View >
        </>
    );
};

export default ListScreen;
import React, { useEffect, useState } from 'react';
;
import { useOfferr } from '../../../../../service/redux/ducks/offer';
import { ListOfferApply } from './ListOfferApply';
import ViewFrame from '../../../../components/ViewDetails/viewFrame';
import MainPageHeader from '../../../../components/MainPageHeader';
import Loader from '../../../../components/Loader';
import { styles } from './styles';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../../../../resources/constants';
import ViewFrameCompments from '../../../../components/ViewFrameCompoments';
import { icons } from '../../../../../resources/constants';
import { viewStyles } from '../../../../components/ViewDetails/style';
import { images } from '../../../../../resources/constants';
import { thousandSeparator } from '../../../../../data/factory';
export const EnterpriseOfferSheetApply = props => {
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const { offerJobById } = useOfferr();
    const navigate = useNavigate();
    const id = props?.id?.id;
    const avatar = props?.id?.images
    const displayOfferApply = idCandidate => {
        navigate('/CandidatDetailScreen', { state: { idCandidate } });
    };
    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        init();
        setRefreshing(false);
    }, []);

    const init = () => setRefreshing(true);

    useEffect(() => {
        getOfferJobById();
    }, [id]);

    const getOfferJobById = async () => {
        try {
            const response = await offerJobById(id, '');
            setData(response?.data);
            setIsLoading(false);
        } catch (error) {
            setData([]);
            setIsLoading(false);
        }
    };
    return (
        <div>
            {/* <Header {...props} typeApp="Enterprise ?" /> */}
            {isLoading || refreshing ? (
                <Loader />
            ) : (
                <>
                    <div style={{overflowY: "auto", ...{ backgroundColor: COLORS.white, borderRadius: 10 }}}>
                        {/* <MainPageHeader title={data?.name || ''} /> */}
                        {data?.users?.length ?
                            (<>
                                <div style={{ paddingHorizontal: 32 }}>
                                    <button style={styles.contentImage} onClick={handleBack}>
                                        <img src={icons.arrowPrevious} style={styles.imageArrow} />
                                        <span>Retour</span>
                                    </button>
                                    <div style={{ marginTop: 8, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                                        <div>
                                            <img height={80} width={80} src={avatar ? avatar : images.avatar_1} style={{ objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ gap: 4 }}>
                                            <span style={{ fontSize: 20, fontWeight: '600' }}>{data?.name}</span>
                                            <div style={{ flexDirection: 'row', gap: 4 }}>
                                                <span style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: 12 }}>{data?.lieu}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={styles.containers}>
                                    {/* <ViewFrame data={data} /> */}
                                    <ViewFrameCompments data={data} />
                                    <div style={''}>
                                        <>
                                            <div style={{ alignItems: 'center', gap: 14, flexDirection: 'row', paddingTop: 16 }}>
                                                {/* <div style={{ height: 15, width: 15, backgroundColor: '#D9D9D9' }}></div> */}
                                                <span style={styles.titleOfferList}>
                                                    Ceux qui ont postulé
                                                </span>
                                            </div>
                                            <ListOfferApply
                                                dataUsers={data?.users}
                                                displayOfferApply={displayOfferApply}
                                            />
                                        </>
                                    </div>

                                </div>
                            </>
                            )
                            : (
                                <span style={styles.noEvents}>
                                    Aucun candidat a postulé sur cette offre
                                </span>
                            )

                        }
                    </div>
                </>
            )}
        </div>
    );
};

export default EnterpriseOfferSheetApply;

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
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
        <View>
            {/* <Header {...props} typeApp="Enterprise ?" /> */}
            {isLoading || refreshing ? (
                <Loader />
            ) : (
                <>
                    <ScrollView style={{ backgroundColor: COLORS.white, borderRadius: 10 }}>
                        {/* <MainPageHeader title={data?.name || ''} /> */}
                        {data?.users?.length ?
                            (<>
                                <View style={{ paddingHorizontal: 32 }}>
                                    <TouchableOpacity style={styles.contentImage} onPress={handleBack}>
                                        <img src={icons.arrowPrevious} style={styles.imageArrow} />
                                        <Text>Retour</Text>
                                    </TouchableOpacity>
                                    <View style={{ marginTop: 8, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                                        <View>
                                            <img height={80} width={80} src={avatar ? avatar : images.avatar_1} style={{ objectFit: 'cover' }} />
                                        </View>
                                        <View style={{ gap: 4 }}>
                                            <Text style={{ fontSize: 20, fontWeight: '600' }}>{data?.name}</Text>
                                            <View style={{ flexDirection: 'row', gap: 4 }}>
                                                <Text style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: 12 }}>{data?.lieu}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.containers}>
                                    {/* <ViewFrame data={data} /> */}
                                    <ViewFrameCompments data={data} />
                                    <View style={''}>
                                        <>
                                            <View style={{ alignItems: 'center', gap: 14, flexDirection: 'row', paddingTop: 16 }}>
                                                {/* <View style={{ height: 15, width: 15, backgroundColor: '#D9D9D9' }}></View> */}
                                                <Text style={styles.titleOfferList}>
                                                    Ceux qui ont postulé
                                                </Text>
                                            </View>
                                            <ListOfferApply
                                                dataUsers={data?.users}
                                                displayOfferApply={displayOfferApply}
                                            />
                                        </>
                                    </View>

                                </View>
                            </>
                            )
                            : (
                                <Text style={styles.noEvents}>
                                    Aucun candidat a postulé sur cette offre
                                </Text>
                            )

                        }
                    </ScrollView>
                </>
            )}
        </View>
    );
};

export default EnterpriseOfferSheetApply;

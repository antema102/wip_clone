import React from 'react';
import { View, Text, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { AnnounceService } from '../../../../service/applicatif/Announce.sa';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import { styles } from '../MatchingEnterpriseList/FindTalentList/styles';
import { COLORS } from '../../../../resources/constants';

interface AnnouncesType {
    isAll?: boolean,
    item: string,
}

const Announces = (props: AnnouncesType) => {
    const [listAnnounce, setListAnnounce] = useState<{ file: string, title: string, description: string, contact: string }[]>([]);
    const { item, isAll } = props;
    const [isLoading, setIsLoading] = useState(false);
    const { accessToken } = useSelector(({ auth }: any) => auth);
    const { allAnnounce, getAnnouncesByCategoryName } = AnnounceService();
    const getAnnounces = async () => {
        if (isAll) {
            try {
                setIsLoading(true);
                const res = await allAnnounce(accessToken);
                if (res?.data?.items != undefined) {
                    setListAnnounce(res.data.items);
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const getAnnouncesByCategory = async (name: string) => {
        setIsLoading(true);
        const res = await getAnnouncesByCategoryName(accessToken, name);
        if (res?.data?.items != undefined) {
            setListAnnounce(res.data.items);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getAnnounces();
    }, [isAll]);

    useEffect(() => {
        getAnnouncesByCategory(item);
    }, [item]);

    return (<>{isLoading ? <Loader /> :
        <View
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 20,
                justifyContent: 'space-between',
                minHeight: 155,
                backgroundColor: COLORS.white,
                marginHorizontal: 20,
            }}>
            <View style={{ flex: 1 }}>
                {listAnnounce.map((item, index) => {
                    return (
                        <View
                            key={`announce_,${index}`}
                            style={styles.itemAnnounces}>
                            <View style={styles.candidateImgContainer}>
                                <Image
                                    style={{
                                        width: 110,
                                        height: 110,
                                        borderRadius: 8,
                                    }}
                                    source={{ uri: item.file }}
                                />
                            </View>
                            <View
                                style={[styles.candidateDetailsContainer, { marginLeft: 15 }]}>
                                <Text style={styles.candidatName}>{item.title}</Text>
                                <Text style={{ color: 'black' }}>{item.description}</Text>
                                <Text style={{ color: 'blue', marginTop: 3 }}>
                                    {item.contact}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    }
    </>
    );
};

export default Announces;

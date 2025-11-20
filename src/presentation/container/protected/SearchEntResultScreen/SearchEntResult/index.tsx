import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ListCompany } from './ListCompany';
import MainPageHeader from '../../../../components/MainPageHeader';
import { SEARCHENT_RESULT } from '../../../../../data/constants/strings';
import { useNavigate } from 'react-router-dom'
import { styles } from './styles';
import { COLORS } from '../../../../../resources/constants';
import HeaderTitle from '../../HeaderTitle';
import { useMobile } from '../../../../../service/hooks/useMobile';
import BannerRefonte from '../../../../components/BannerRefonte';
export const SearchEntResult = props => {
    const { data } = props;
    const navigate = useNavigate()
    const { isMobile } = useMobile()

    const [refreshing, setRefreshing] = useState(false);

    const _displayCandidateDetail = (typeId, offerId, compatibility) => navigate('/EnterpriseOfferDetailsScreen', { state: { typeId, offerId, compatibility, candidat: true } })

    useEffect(() => {
        init();
        // setRefreshing(false);
    }, []);

    const init = () => setRefreshing(true);
    return (
        <View>
            <View>
                <View style={styles.containers}>
                    <View style={styles.containerFormList}>
                        <ListCompany data={data} displayCandidateDetail={_displayCandidateDetail} isMobile={isMobile} />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default SearchEntResult;

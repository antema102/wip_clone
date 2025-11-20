import React, { useEffect, useState } from 'react';
;
import { useSelector } from 'react-redux';
import { Loader } from '../../components/Loader';
import { OfferService } from '../../../service/applicatif/Offer.sa';
import { useNavigate } from 'react-router-dom';
import { ListOffer } from './ListOffer';
import { stylesCard } from '../SideBarCandidat/styles';

export const EnterpriseOffer = (props: any) => {
    const navigate = useNavigate();
    const { allOfferJobByEntWithoutVideo } = OfferService();
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [offerList, setOfferList] = useState([]);
    const { user, accessToken } = useSelector(({ auth }) => auth);

    useEffect(() => {
        getAllOfferJobByEnt();
    }, [])

    const getAllOfferJobByEnt = async () => {
        setIsLoading(true);
        try {
            const response = await allOfferJobByEntWithoutVideo(accessToken);
            if (!response.isError) {
                setOfferList(response?.data);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const displayOfferSheet = (idOffer: string) =>
        navigate('/EnterpriseOfferSheetScreen', { state: { id: idOffer, avatar: props.avatar } });

    const displayOfferSheetApply = (idOffer: string) =>
        navigate('/EnterpriseOfferSheetApplyScreen', { state: { id: idOffer, avatar: props.avatar } });

    useEffect(() => {
        setRefreshing(false);
    }, []);

    return (
        <div style={{}}>
            <div style={stylesCard.containerFormList}>
                {!isLoading ? (
                    <ListOffer
                        data={offerList}
                        displayOfferSheet={displayOfferSheet}
                        displayOfferSheetApply={displayOfferSheetApply}
                    />
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
};

export const EnterpriseOfferScreen: any = EnterpriseOffer;

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import styles from './style';
import { useFormation } from '../../../../service/redux/ducks/formation';
import { OfferService } from '../../../../service/applicatif/Offer.sa';
import { FormationSA } from '../../../../service/applicatif/Formation.sa';
import Loader from '../../../components/Loader';
import { COLORS } from '../../../../resources/constants';
import DynamicBox from '../../../components/DynamicBox';
import { useNavigate } from 'react-router-dom';

export const companySectors = [
  'Finance',
  'Comptabilité',
  'Développement IT',
  'BPO',
  'Tourisme',
  'Hôtellerie',
  ,
];

const Offers = (props: any) => {
  const { findAllFormation } = useFormation();
  const [countFormations, setCountFormations] = useState(0);
  const [listJobs, setListJobs] = useState();
  const [listFormations, setListFormations] = useState();
  const [isRefreshing, setIsRefreshing] = useState(true);

  const { accessToken } = useSelector(({ auth }: any) => auth);
  const { navigation } = props;
  const { getAllCategoryAvailable } = OfferService();
  const { getAllFormationsAvailable } = FormationSA();

  const countFormation = async () => {
    const resFormation = await findAllFormation(accessToken);
    setCountFormations(resFormation?.length || 0);
  };

  const getAllOffersAvailable = async () => {
    const response = await getAllCategoryAvailable(accessToken);
    setListJobs(response?.data?.listItem);
    setIsRefreshing(false);
  };

  const getAllFormationsCategoryAvailable = async () => {
    const response = await getAllFormationsAvailable(accessToken);
    setListFormations(response?.data?.listItem);
    setIsRefreshing(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      countFormation(),
      getAllOffersAvailable(),
      getAllFormationsCategoryAvailable(),
    ]);
  }, []);

  useEffect(() => { }, [isRefreshing]);

  const navigateCombinaisonCandidat = (item:any, index:number) => navigate('/CombinaisonCandidatScreen', {
    state: {
      idJob: item?.id,
      allJobParams: listJobs,
      isOffer: true,
      isClicked: index,
      initial: item,
    }
  });


  const navigateItemByCategory = () => navigate('/ItemByCategoryScreen', {
    state: {
      list: listFormations,
      isFormation: true,
    }
  });

  return (
    <View
      style={{
        marginTop: 20,
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}>
      {isRefreshing ? (
        <Loader />
      ) : (
        <>
          <DynamicBox listJobs={listJobs} countFormations={countFormations} navigateItemByCategory={navigateItemByCategory} navigateCombinaisonCandidat={navigateCombinaisonCandidat}/>
        </>
      )}
    </View>
  );
};

export default Offers;

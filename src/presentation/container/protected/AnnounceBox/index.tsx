import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
;
import { useNavigate } from 'react-router-dom';
import { OfferService } from '../../../../service/applicatif/Offer.sa';
import { useTender } from '../../../../service/redux/ducks/tender';
import { ROLEACCOUNT } from '../../../../data/constants/strings';
import { COLORS } from '../../../../resources/constants';
import Loader from '../../../components/Loader';
import styles from './styles';
import DynamicBox from '../../../components/DynamicBox';

interface Props {
  category?: string;
}

const AnnounceBox = ({ category }: Props) => {
  const navigation = useNavigate();
  const { getAllPostsAvailable } = OfferService();
  const { getTenderCategory } = useTender();
  const [listDatas, setListDatas] = useState();
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const { accessToken, user } = useSelector(({ auth }: any) => auth);
  const { dataCategory } = useSelector(({ tender }: any) => tender);

  const getAllPostsAvailableCategory = async () => {
    setIsRefreshing(true);
    const response = await getAllPostsAvailable(accessToken);
    setListDatas(response?.data?.listItem);
    setIsRefreshing(false);
  };

  const getCategoryForTenders = async () => {
    setIsRefreshing(true);
    const data = {
      audience: user?.role === ROLEACCOUNT.candidate ? 0 : 1};
    await getTenderCategory(data, accessToken);
    if (dataCategory.length === 0) {
      setIsEmpty(true);
    }

    setListDatas(dataCategory);
    setIsRefreshing(false);
  };

  const reidirectionPost = (index: any, item: any) => {
    navigation('/ItemByCategoryScreen', {
      state: {
        list: listDatas,
        isClicked: index,
        item: item}
    });
  };

  const reidirectionTender = (index: any, item: string) => {
    navigation('/ListScreen', {
      state: {
        title: "Liste des appels d'offres",
        companyName: item}
    });
  };

  const handleFunction = async () => {
    switch (category) {
      case 'post':
        getAllPostsAvailableCategory();
        break;
      case 'tender':
        getCategoryForTenders();
        break;
      default:
        break;
    }
  };

  const handleRedirection = async (index: any, item: any) => {
    switch (category) {
      case 'post':
        reidirectionPost(item, index);
        break;
      case 'tender':
        reidirectionTender(item, index);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleFunction();
  }, []);

  return (<>
    {isRefreshing ? <Loader /> : (
      <div
        style={{
          marginTop: 20,
          justifyContent: 'space-between',
          minHeight: 100,
          backgroundColor: COLORS.white}}>

        {
          isEmpty && (dataCategory?.length === 0) ? (
            <div style={styles.centerItem}>
              <span style={styles.noItemText}> Aucun résultat</span>
            </div>
          ) :
            (
              category === 'tender' ?
                <DynamicBox listJobs={dataCategory} navigateCombinaisonCandidat={handleRedirection} />
                :
                <DynamicBox listJobs={listDatas} navigateCombinaisonCandidat={handleRedirection} />
            )}
      </div>
    )}
  </>
  );
};

export default AnnounceBox;

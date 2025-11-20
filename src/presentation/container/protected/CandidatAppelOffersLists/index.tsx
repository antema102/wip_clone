import React, { useEffect, useState } from 'react';

import { styles } from './style';
import { DataView } from 'primereact/dataview';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { paginatorTemplateCustom } from '../../../components/PaginatoTemplateCustom';
import { useLang } from '../../../../data/translation';
import * as stringsEn from '../../../../data/constants/strings_en';
import * as stringsFr from '../../../../data/constants/strings';
import { ROLEACCOUNT } from '../../../../data/constants/strings';
import { useTender } from '../../../../service/redux/ducks/tender';
import MiniLoader from '../../../components/MiniLoader';

const CandidatAppelOffersLists = () => {
  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;
  const [listDatas, setListDatas] = useState();
  const { accessToken, user } = useSelector(({ auth }: any) => auth);
  const { getTenderCategory } = useTender();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigate();
  const { dataCategory } = useSelector(({ tender }: any) => tender);

  const reidirectionTender = (index: any, item: string) => {
    navigation('/ListScreen', {
      state: {
        id: index,
        title: `Liste des appels d'offres ${item}`,
        companyName: item,
      },
    });
  };

  const getCategoryForTenders = async () => {
    setIsLoading(true);
    const data = {
      audience: user?.role === ROLEACCOUNT.candidate ? 0 : 1,
    };
    const response = await getTenderCategory(data, accessToken);
    setListDatas(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getCategoryForTenders();
  }, []);

  const itemOffers = (data: string, index: number) => {
    return (
      <div style={{ alignItems: 'center' }}>
        <button
          style={styles.appelOffersButton}
          onClick={() => {
            reidirectionTender(index, data);
          }}
        >
          <span style={styles.appelOffersButtonText}>{data}</span>
        </button>
      </div>
    );
  };

  return (
    <div>
      <div style={styles.appelOffersContainer}>
        <span style={styles.appelOffersTitle}>
          {activeString.APPEL_OFFRE.TITLE_OFFERS}
        </span>
        {isLoading ? (
          <MiniLoader />
        ) : (
          <div>
            <DataView
              value={listDatas}
              itemTemplate={(data, index) => itemOffers(data, index)}
              rows={2}
              paginatorTemplate={paginatorTemplateCustom}
              paginator
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidatAppelOffersLists;

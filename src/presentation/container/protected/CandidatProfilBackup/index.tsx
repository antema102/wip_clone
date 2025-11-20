import React, { useEffect, useState } from 'react';
;
import { styles } from './styles';

import { ListBackup } from './ListBackup';
import { COLORS } from '../../../../resources/constants';
import { useNavigate } from 'react-router-dom';
import MainPageHeader from '../../../components/MainPageHeader';
import * as stringsFr from '../../../../data/constants/strings';
import * as stringsEn from '../../../../data/constants/strings_en';
import { useLang } from '../../../../data/translation';
import HeaderTitle from '../HeaderTitle';
import BannerRefonte from '../../../components/BannerRefonte';
import TitleRefont from '../../../components/TitleRefont';
import { useMobile } from '../../../../service/hooks/useMobile';
export const CandidatProfilBackupScreen = props => {
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  const { isMobile } = useMobile()
  const detailsFavorites = idOffer => {
    navigate('/EnterpriseOfferDetailsScreen', {
      state: {
        id: idOffer,
        candidat: true}
    });
  };

  useEffect(() => {
    init();
    setRefreshing(false);
  }, []);

  const init = () => {
    setRefreshing(true);
  };

  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;

  return (
    <div style={{...styles.container, ...(isMobile ? {} : {
    })}}>
      <div style={[styles.containers, { minHeight: 250 }]}>
        <TitleRefont title={activeString.DETAIL_PROFIL.MES_SAUVEGARDES} _customStyle={{ paddingHorizontal: 75 }} />
        <ListBackup isFavorite={true} detailsFavorites={detailsFavorites} />
      </div>
    </div>
  );
};

export default CandidatProfilBackupScreen;

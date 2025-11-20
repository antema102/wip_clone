import React, { useEffect, useState } from 'react';
import { styles } from './styles';

import { ListBackup } from './ListBackup';
import { useBackup } from './useBackup';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import MainPageHeader from '../../../components/MainPageHeader';
import { COLORS } from '../../../../resources/constants';
import * as stringsFr from '../../../../data/constants/strings';
import * as stringsEn from '../../../../data/constants/strings_en';
import { useLang } from '../../../../data/translation';
import TitleRefont from '../../../components/TitleRefont';
const EnterpriseProfilBackupScreen = (props) => {
  const navigate = useNavigate();

  const [cvId, setCvId] = useState(null);
  const { allFavoris, isLoading, removeFavoris, dateFav } = useBackup(cvId);

  const detailsFavorites = (id) => {
    navigate('/CandidatDetailScreen', { state: { id } });
  };

  const removeFavorites = (cvId) => {
    removeFavoris(cvId);
    setCvId(cvId);
  };

  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;

  return (
    <div style={styles.container}>
      <TitleRefont title={activeString.DETAIL_PROFIL.MES_SAUVEGARDES} />
      <ListBackup
        dateFav={dateFav}
        favoritesList={allFavoris}
        removeFavoris={removeFavorites}
        detailsFavorites={detailsFavorites}
        loading={isLoading}
      />
    </div>
  );
};

export default EnterpriseProfilBackupScreen;

import React, { Fragment } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { ProfilBackup } from '../../../components/CandidatProfilBackup/ProfilBackup/indexCV';
import { Divider } from 'primereact/divider';
import { DataView } from 'primereact/dataview';
import { paginatorTemplateCustom } from '../../../components/PaginatoTemplateCustom';
import NotFounds from '../../../components/NotFounds';
import { images } from '../../../../resources/constants';
import { useLang } from '../../../../data/translation';
import * as stringsFr from '../../../../data/constants/strings';
import * as stringsEn from '../../../../data/constants/strings_en';
import MiniLoader from '../../../components/MiniLoader';
export const ListBackup = (props) => {

  const { favoritesList, removeFavoris, dateFav, detailsFavorites, loading } = props
  const { lang } = useLang()
  const activeString = lang === 'fr' ? stringsFr : stringsEn;

  const renderItemTemplate = (item) => (
    <Fragment>
      <ProfilBackup
        item={item}
        dateFav={dateFav}
        detailsFavorites={detailsFavorites}
        removeFavoris={removeFavoris} />
    </Fragment>);

  return (
    loading ?
      <MiniLoader CustomStyle={{ backgroundColor: 'white', zIndex: -1, borderRadius: 10 }} /> :
      favoritesList.length ?
        <DataView
          value={favoritesList}
          layout="list"
          itemTemplate={renderItemTemplate}
          paginatorTemplate={paginatorTemplateCustom}
          paginator
          rows={3} />
        :
        <NotFounds
          label={activeString.ENTERPRISE_INFORMATIONS.EMPTY}
          image={images.cardProfil}
          customImage={{ height: 100, width: 100 }}
        />

  );
};

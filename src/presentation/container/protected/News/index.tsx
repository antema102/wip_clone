import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { HOME_COMPANY } from '../../../../data/constants/strings';
import globalStyle from '../../../globalStyle/globalStyle';
import DynamicBox from '../../../components/DynamicBox';
import { useLocation, useNavigate } from 'react-router-dom';
import AnnounceBox from '../AnnounceBox';
import * as stringsFr from '../../../../data/constants/strings';
import * as stringsEn from '../../../../data/constants/strings_en';
import { useLang } from '../../../../data/translation';


export interface CategoriesType {
  Internationale: string;
  Nationale: string;
  Vaovao: string;
  Economie: string;
  People: string;
  HighTech: string;
}

export const categories: CategoriesType = {
  Internationale: 'Internationale',
  Nationale: 'Nationale',
  Vaovao: 'Vaovao',
  Economie: 'Economie',
  People: 'People',
  HighTech: 'HighTech',
};

export type CategoryKey = keyof typeof categories;

const News = (props: string[]) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const navigateCombinaisonCandidat = (category: CategoryKey, index: number) => navigate('/CombinaisonCandidatScreen', {
    state: {
      category: categories[category],
      isCliked: index,
      isOffer: false,
    }
  });

  const { lang } = useLang();
  const activeStrings = lang === 'fr' ? stringsFr : stringsEn;
  return (
    <View>
      <View
        style={{
          marginTop: 20,
          justifyContent: 'space-between',
          backgroundColor: '#fff',
        }}>
        <DynamicBox {...state} listJobs={Object.keys(categories)} navigateCombinaisonCandidat={navigateCombinaisonCandidat} />
      </View>
      <View style={{ flex: 1, top: 10 }}>
        <Text style={globalStyle.titleHome}>
          {activeStrings.HOME_COMPANY.TENDER_CANDIDAT}{' :'}
        </Text>
      </View>
      <AnnounceBox {...props} category={'tender'} />
    </View>
  );
};

export default News;

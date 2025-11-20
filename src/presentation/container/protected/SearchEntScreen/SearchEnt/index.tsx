import React, { useEffect, useState } from 'react';
;

import { RefineCompany } from './RefineCompany';
import { defaultValues } from './dto';
import Loader from '../../../../components/Loader';
import { COLORS } from '../../../../../resources/constants';
import Tabs from '../../../../components/Tab';
import { FindTalentForm } from '../../MatchingEntreprise/FindTalentForm';
import { SEARCHENT_RESULT } from '../../../../../data/constants/strings';
import * as stringsFr from '../../../../../data/constants/strings';
import * as stringsEn from '../../../../../data/constants/strings_en';
import { useLang } from '../../../../../data/translation';
import MiniLoader from '../../../../components/MiniLoader';
export const SearchEnt = (props: any) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormation, setIsFormation] = useState(false);

  const { lang } = useLang();

  const activeString = lang === 'fr' ? stringsFr : stringsEn;

  return (
    <div>
      {isLoading && <MiniLoader />}
      {/* <Main {...props} /> */}
      <div style={{ marginTop: 60, backgroundColor: COLORS.white, padding: 18, borderRadius: 10, paddingTop: 42 }}>
        <Tabs
          title1={activeString.SEARCH_STATUT.FIND_OFFER}
          title2={activeString.SEARCH_STATUT.FIND_CANDIDATE}
          isFormation={isFormation}
          type={'candidate'}
          Formations={
            () => <
              FindTalentForm {...props} candidat={true} isFormation={setIsFormation(true)}  />
          }
          Offers={
            () =>
              <RefineCompany
                data={{ ...defaultValues }}
                setIsLoading={setIsLoading}
                navigation={navigation}
                candidat={true}
                isFormation={setIsFormation(false)} />}
        />

      </div>
    </div>
  );
};

export default SearchEnt;

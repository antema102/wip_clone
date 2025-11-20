import React from 'react';
;

import { styles } from './styles';
import { ListCandidat } from './ListCandidat';
import { useResult } from './useResult';
import Loader from '../../../../components/Loader';
import MainPageHeader from '../../../../components/MainPageHeader';
import { COLORS } from '../../../../../resources/constants';
import { FooterCandidat } from '../../../../components/FindTalentList/Footer';
import { useNavigate } from 'react-router-dom';
import globalStyle from '../../../../globalStyle/globalStyle';
import * as stringsFr from '../../../../../data/constants/strings';
import * as stringsEn from '../../../../../data/constants/strings_en';
import { useLang } from '../../../../../data/translation';
import BannerRefonte from '../../../../components/BannerRefonte';
import {images} from '../../../../../resources/constants';
import { Divider } from 'primereact/divider';
export const FindTalentList = props => {
  const navigate = useNavigate();
  const { refreshing, isLoading, resultMatching } = useResult(props?.response);
  const _displayCandidateDetail = (idCandidate, score) => {
    navigate('/CandidatDetailScreen', { state: { id: idCandidate, score } });
  };
  const dataMatch = props.matching;
  const result = resultMatching.reduce(
    (acc, cur, idx) => acc.concat({ ...cur, ...dataMatch[idx] }),
    [],
  );

  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;
  // <HeaderTitle title={activeString.FIND_TALENT_C.TITLE_C} />

  return (
    <div style={styles.container}>
      <div style={[styles.containers, { backgroundColor: COLORS.white, marginTop: 24, borderRadius: 10 }]}>
        <div style={{ height: 50, padding: 20}}>
          <span style={globalStyle.titleHome}>Profils Trouvés {resultMatching.length} :</span>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {resultMatching.length ? (
              <ListCandidat
                data={result}
                displayCandidateDetail={_displayCandidateDetail}
              />
            ) : (

              <div style={{ alignItems: 'center', gap: 24, paddingTop: 34 }}>
                <div style={{ paddingVertical: 18, paddingHorizontal: 32, backgroundColor: COLORS.blue_title, minWidth: 300, borderRadius: 20 }}>
                  <span style={styles.contentResult}>Aucun profil trouvé</span>
                </div>

                <div style={{ alignItems: 'center'}}>
                  <Divider type='solid' align='center' style={{ width: 100 }} />
                  <img src={images.hands } style={styles.image} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {/* <div
        style={{
          position: 'absolute',
          width: '100%',
          bottom: 0}}>
        <FooterCandidat totalCandidate={resultMatching.length} />
      </div> */}
    </div>
  );
};

export const FindTalentScreen: any = FindTalentList;

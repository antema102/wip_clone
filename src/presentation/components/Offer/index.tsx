import React, { useState } from 'react';
import { styles } from './styles';
import { COLORS, icons } from '../../../resources/constants';
import CustomButton from '../Button/button';
import './style.css';
import { useLang } from '../../../data/translation';
import * as stringsFr from '../../../data/constants/strings';
import * as stringsEn from '../../../data/constants/strings_en';
export const Offer = (props) => {
  const { item, displayOfferSheet, displayOfferSheetApply, isFormation } =
    props;
  const { name, type, disponibility, users } = item;
  const [title, setTitle] = useState('');
  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;

  const onPress = () => {
    isFormation ? displayOfferSheet(item) : displayOfferSheet(item.id);
  };
  const onPressApply = () => {
    displayOfferSheetApply(item.id);
  };

  React.useEffect(() => {
    if (!users?.length) {
      setTitle(activeString.OFFERS.NO_CANDIDATE);
    } else if (users?.length === 1) {
      setTitle('1 candidat ');
    } else {
      setTitle(`${users?.length} ${activeString.OFFERS.APPLIED}`);
    }
  }, [users, lang]);

  return (
    <>
      <div style={styles.offerContainer}>
        <button onClick={onPress}>
          <div style={styles.candidateDetailsContainer}>
            <div
              style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}
            >
              <img src={icons.userCompany} style={styles.images} />
              <div style={{ gap: 6 }}>
                <span style={styles.candidatName} numberOfLines={2}>
                  {isFormation ? item.title : name}
                </span>
                <div style={styles.btnDetailtxtPostule}>
                  {isFormation ? (
                    <span style={styles.candidatPost}>
                      {item.isPayant ? 'Payante ' : 'Gratuite'}
                    </span>
                  ) : (
                    <span style={styles.candidatPost}>
                      {disponibility} {disponibility && type?.name ? ' - ' : ''}{' '}
                      {type?.name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div style={styles.offerBtnContainer}>
              {users?.length ? (
                <div style={styles.btnDetailPostule}>
                  <CustomButton
                    color={COLORS.orange}
                    title={title}
                    onClick={onPressApply}
                    _style={styles.smallButtonContainer}
                    styleBtnTxt={styles.smallBtnTxt}
                  />
                </div>
              ) : (
                <div />
              )}
              {isFormation ? (
                <div style={styles.btnDetailPostule}>
                  <CustomButton
                    color={COLORS.orange}
                    title="Détails"
                    onClick={onPress}
                    _style={styles.smallButtonContainer}
                    styleBtnTxt={styles.smallBtnTxt}
                  />
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

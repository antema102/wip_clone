import React, { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { styles } from './styles';
import { COLORS } from '../../../resources/constants';
import CustomButton from '../Button/button';
import './style.css';
import { icons } from '../../../resources/constants';
import { useLang } from '../../../data/translation';
import * as stringsFr from '../../../data/constants/strings';
import * as stringsEn from '../../../data/constants/strings_en';

export const Offer = props => {

  const { item, displayOfferSheet, displayOfferSheetApply, isFormation } = props;
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
      <View style={styles.offerContainer}>
        <Pressable onPress={onPress}>
          <View style={styles.candidateDetailsContainer}>
            <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
              <Image source={icons.userCompany} style={styles.images} />
              <View style={{ gap: 6 }}>
                <Text style={styles.candidatName} numberOfLines={2}>
                  {isFormation ? item.title : name}
                </Text>
                <View style={styles.btnDetailtxtPostule}>
                  {isFormation ? (
                    <Text style={styles.candidatPost}>
                      {item.isPayant ? 'Payante ' : 'Gratuite'}
                    </Text>
                  ) : (
                    <Text style={styles.candidatPost}>
                      {disponibility} {disponibility && type?.name ? ' - ' : ''}{' '}
                      {type?.name}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.offerBtnContainer}>
              {users?.length ? (
                <View style={styles.btnDetailPostule}>
                  <CustomButton
                    color={COLORS.orange}
                    title={title}
                    onPress={onPressApply}
                    _style={styles.smallButtonContainer}
                    styleBtnTxt={styles.smallBtnTxt}
                  />
                </View>
              ) : (
                <View />
              )}
              {isFormation ? (
                <View style={styles.btnDetailPostule}>
                  <CustomButton
                    color={COLORS.orange}
                    title="Détails"
                    onPress={onPress}
                    _style={styles.smallButtonContainer}
                    styleBtnTxt={styles.smallBtnTxt}
                  />
                </View>
              ) : (
                <View />
              )}
            </View>

          </View>
        </Pressable>
      </View>
    </>
  );

};

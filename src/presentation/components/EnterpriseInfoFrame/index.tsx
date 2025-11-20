import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import Avatar from '../DetailProfil/UploadFile/UploadAvatar';
import { COLORS, SIZES } from '../../../resources/constants';
import * as stringsEn from '../../../data/constants/strings_en';
import * as stringsFr from '../../../data/constants/strings';
import { useLang } from '../../../data/translation';

interface FrameProps {
  isHeader: boolean;
  infoUser: {
    name?: string;
    activity?: string;
    email?: string;
    phone?: string;
    stat?: string;
    nif?: string;
    headQuarter?: string;
    representing?: string;
  };
  avatar: string;
  handleRedirection: () => void;
}

export const Frame = (props: FrameProps) => {

  const { isHeader, infoUser, avatar, handleRedirection } = props;
  const { lang } = useLang()
  const activeString = lang === 'fr' ? stringsFr : stringsEn;
  useEffect(() => { }, [infoUser]);

  return (
    <View style={[styles.stHeader, { borderBottomWidth: isHeader ? 0 : 1 }]}>
      <View style={styles.containerLogoEntBottom}>
        <Avatar style={styles.imageStyle} value={avatar} />
      </View>

      <View style={styles.textContainer}>
        <View style={{ marginBottom: 10 }}>
          <Text
            style={[
              styles.titlePrimaire,
              { color: isHeader ? COLORS.primary : COLORS.black },
            ]}>
            {infoUser?.name && infoUser?.name !== 'invalide'
              ? infoUser?.name
              : ''}
          </Text>
        </View>
        <View>
          {isHeader ? (
            <Text style={styles.descriptionPrimary} numberOfLines={4}>
              {infoUser?.activity}
            </Text>
          ) : (
            <Text style={styles.descriptionPrimary} numberOfLines={4}>
              {[
                infoUser?.email,
                infoUser?.phone,
                infoUser?.stat,
                infoUser?.nif,
                infoUser?.headQuarter,
              ]
                .filter(Boolean)
                .join(' , ')}
            </Text>
          )}
        </View>
        <View>
          <Text style={styles.descriptionPrimary}
          >
            {infoUser?.activity}
          </Text>
        </View>
        <View>
          {infoUser?.representing &&
            infoUser?.representing !== 'invalide' ? (
            <Text
              style={styles.descriptionPrimary}
            >
              {infoUser?.representing}
            </Text>
          ) : null}
        </View>
        <View>
          <TouchableOpacity onPress={handleRedirection}>
            <Text style={[styles.descriptionPrimary, { color: COLORS.secondary }]}>{activeString.ENTERPRISE_OFFER.MORE_PLUS} ....</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

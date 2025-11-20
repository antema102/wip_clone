import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { dateToString } from '../../../../data/factory/dateFactory';
import { getAcronym } from '../../../../data/factory/index';
import { useSelector } from 'react-redux';
import { images } from '../../../../resources/constants';
import { UploadFileService } from '../../../../service/applicatif/UploadFile.sa';

interface OfferApplyType {
  item:
  {
    active: 'Actif' | 'Non Actif',
    email?: string,
    _id: string,
    image: string,
    createdAt: Date,
    firstName: string,
    lastName: string
  },
  displayOfferApply: (id: string) => void,
}

export const OfferApply = (props: OfferApplyType) => {
  const { item, displayOfferApply } = props;
  const { active, email, _id, image, createdAt, firstName, lastName } = item;
  const date = dateToString(createdAt);
  const { user, accessToken } = useSelector(({ auth }: any) => auth);
  const [avatar, setAvatar] = useState<string>('');
  const { downloadImageById } = UploadFileService();

  const condition = user?.abonnementId === '63d0ef142e1204452fd2f2bf';

  const getAvatar = async (id: string) => {
    try {
      const avatarDownloaded: any = await downloadImageById(id, accessToken);
      if (avatarDownloaded) {
        setAvatar(URL.createObjectURL(avatarDownloaded));
      }
    } catch (error) { }
  };

  useEffect(() => {
    getAvatar(_id)
  }, []);

  return (
    <TouchableOpacity
      style={styles.candidateContainer}
      onPress={() => displayOfferApply(_id)}>
      <View style={styles.candidateImgContainer}>
        <Image
          style={styles.candidatImg}
          source={image ? { uri: avatar } : { uri: images.avatar_1 }}
        />
      </View>

      <View style={styles.candidateDetailsContainer}>
        {/** A propos du candidat */}
        <Text style={styles.candidatName}>
          {condition
            ? getAcronym(`${firstName} ${lastName}`)
            : `${firstName} ${lastName}`}
        </Text>
        <Text style={styles.candidatPost}>
          {' '}
          {active ? 'Actif' : 'Non Actif'}
        </Text>
        <Text style={styles.jobDate}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

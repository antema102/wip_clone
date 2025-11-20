import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { View, Text, Image, TouchableOpacity } from 'react-native';
import { icons, images } from '../../../../resources/constants';
import { UploadFileService } from '../../../../service/applicatif/UploadFile.sa';
import { styles } from './styles';
import { Divider } from 'primereact/divider';
import { useMobile } from '../../../../service/hooks/useMobile';

interface ProfilBackupProps {
  detailsFavorites: (id: string) => void;
  item: {
    name: string;
    job: string;
    date: string;
    place: string;
    ref: string;
    lieu: string;
    image?: string;
    id: string;
    proprietaire?: string;
  };
  isFavorite: boolean;
  removeFavoris: (id: string) => void;
  index: number;
}

export const ProfilBackup = (props: ProfilBackupProps) => {
  const { detailsFavorites, item, isFavorite, removeFavoris, index } = props;
  const { name, job, date, place, ref, lieu, image, id } = item;
  const { accessToken } = useSelector(({ auth }: any) => auth);
  const [avatar, setAvatar] = useState('');
  const { downloadImageById } = UploadFileService();
  const { isMobile } = useMobile()

  const getAvatar = async (id: string, accessToken: string) => {
    try {
      const responseGetAvatar: any = await downloadImageById(id, accessToken);
      if (responseGetAvatar) {
        setAvatar(URL.createObjectURL(responseGetAvatar));
      }
    } catch (error) { }
  };

  useEffect(() => {
    if (item?.proprietaire) {
      getAvatar(item.proprietaire, accessToken);
    }
  }, []);

  return (
    <View key={index} style={styles.candidateContainer} >
      {isFavorite ? <>
        <View style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: 'rgba(51, 153, 255, 0.1)', padding: 32, borderRadius: 10, marginBottom: 24, width: '100%' }}>
          <TouchableOpacity style={{ flexDirection: 'row', gap: 22, alignItems: 'center' }} onPress={() => detailsFavorites(id)}>
            <View style={styles.candidateImgContainer}>
              <Image style={styles.candidatImg} source={avatar ? { uri: avatar } : { uri: images.avatar_6 }} />
            </View>
            <View style={isMobile ? styles.candidateDetailsContainer : ''}>
              {/** Nom du job - Lieu */}
              <Text style={[styles.candidatName, isMobile ? { fontSize: 12 } : { fontSize: 16 }]}>{name}</Text>
              <Text style={styles.candidatPost}>
                {ref} - {lieu}
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.candidatExp}>{date}</Text>
            <TouchableOpacity onPress={() => removeFavoris(id)}>
              <Image style={styles.favorisImage} source={{ uri: icons.favoris }} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <Divider type={'solid'} /> */}
      </>
        :
        <>
          <View style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <TouchableOpacity style={{ flexDirection: 'row', gap: 22, alignItems: 'center' }} onPress={() => detailsFavorites(id)}>
              <View style={styles.candidateImgContainer}>
                <Image style={styles.candidatImg} source={avatar ? { uri: avatar } : { uri: images.avatar_6 }} />
              </View>
              <View style={styles.candidateDetailsContainer}>
                {/** Nom du job - Lieu */}
                <Text style={[styles.candidatName, isMobile ? { fontSize: 12 } : { fontSize: 16 }]}>{name}</Text>
                <Text style={styles.candidatPost}>
                  {job} - {place}
                </Text>
              </View>
            </TouchableOpacity>

            <View>
              <Text style={styles.candidatExp}>{date}</Text>
              <TouchableOpacity onPress={() => removeFavoris(id)}>
                <Image style={styles.favorisImage} source={{ uri: icons.Lmore }} />
              </TouchableOpacity>
            </View>
          </View>
          <Divider type={'solid'} />
        </>
      }
    </View>
  );
};
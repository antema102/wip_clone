import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { resultDate } from '../../../data/factory/dateFactory';
import { images } from '../../../resources/constants';
import styles from './styles';
import { useLang } from '../../../data/translation';
import * as stringsFr from '../../../data/constants/strings';
import * as stringsEn from '../../../data/constants/strings_en';
import { UploadFileService } from '../../../service/applicatif/UploadFile.sa';
import { useSelector } from 'react-redux';
import Avatar from '../Skeleton/Avatar';

const NotificationItem = props => {
  const { lang } = useLang()
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const { item, displayDetail } = props;
  const activeString = lang === 'fr' ? stringsFr : stringsEn;
  const { accessToken } = useSelector(({ auth }) => auth);
  const { downloadImageById } = UploadFileService();

  const getAvatar = async (id: string, accessToken: string) => {
    try {
      setIsLoading(true);
      const responseGetAvatar = await downloadImageById(id, accessToken);
      if (responseGetAvatar) {
        setAvatar(URL.createObjectURL(responseGetAvatar));
      } else {
        setAvatar(null);
      }
    } catch (error) {
      console.error(error);
      setAvatar(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAvatar(item?.senderId, accessToken);
  }, []);

  return (
    <TouchableOpacity onPress={() => displayDetail(item)}>
      <View style={styles.itemWrapperOffer}>
        <View style={styles.itemOffer}>
          {isLoading ? (
            <Avatar />  
          ) : (
            avatar ? (
              <Image
                style={styles.logoSte} 
                source={{ uri: avatar }} 
              />
            ) : (
              <Image
                style={styles.logoSte}
                source={{ uri: images.avatar_6 }}  
              />
            )
          )}
          <View style={[styles.textAlign, { marginLeft: 16 }]}>
            <View>
              <Text style={styles.titlePost} numberOfLines={2}>
                {activeString.NOTIFICATION.RECEIPT}
              </Text>
            </View>
            <View style={{ marginVertical: 5 }}>
              <Text style={styles.lieuPost}>{item.body}</Text>
            </View>
            <View>
              <Text style={styles.periodePost}>{resultDate(item.createdAt)}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;

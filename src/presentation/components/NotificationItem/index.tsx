import React, { useEffect, useState } from 'react';

import { resultDate } from '../../../data/factory/dateFactory';
import { images } from '../../../resources/constants';
import styles from './styles';
import { useLang } from '../../../data/translation';
import * as stringsFr from '../../../data/constants/strings';
import * as stringsEn from '../../../data/constants/strings_en';
import { UploadFileService } from '../../../service/applicatif/UploadFile.sa';
import { useSelector } from 'react-redux';
import Avatar from '../Skeleton/Avatar';

const NotificationItem = (props) => {
  const { lang } = useLang();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { item, displayDetail } = props;
  const activeString = lang === 'fr' ? stringsFr : stringsEn;
  const { accessToken } = useSelector(({ auth }) => auth);
  const { downloadImageById } = UploadFileService();

  const getAvatar = async (id: string, accessToken: string) => {
    try {
      setIsLoading(true);
      const responseGetAvatar = await downloadImageById(id, accessToken);
      if (responseGetAvatar != null) {
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
    <button onClick={() => displayDetail(item)}>
      <div style={styles.itemWrapperOffer}>
        <div style={styles.itemOffer}>
          {isLoading ? (
            <Avatar />
          ) : avatar ? (
            <img style={styles.logoSte} src={avatar} />
          ) : (
            <img style={styles.logoSte} src={images.avatar_6} />
          )}
          <div style={[styles.textAlign, { marginLeft: 16 }]}>
            <div>
              <span style={styles.titlePost} numberOfLines={2}>
                {activeString.NOTIFICATION.RECEIPT}
              </span>
            </div>
            <div style={{ marginVertical: 5 }}>
              <span style={styles.lieuPost}>{item.body}</span>
            </div>
            <div>
              <span style={styles.periodePost}>
                {resultDate(item.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default NotificationItem;

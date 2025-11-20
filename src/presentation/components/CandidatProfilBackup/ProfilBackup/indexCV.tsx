import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { styles } from './styles';
import { dateToString } from '../../../../data/factory/dateFactory';
import { ROLEACCOUNT } from '../../../../data/constants/strings';
import { getAcronym } from '../../../../data/factory/index';
import { icons, images } from '../../../../resources/constants';
import { UploadFileService } from '../../../../service/applicatif/UploadFile.sa';
import * as stringsEn from '../../../../data/constants/strings_en';
import * as stringsFr from '../../../../data/constants/strings';
import { useLang } from '../../../../data/translation';
interface userType {
  firstName: string;
  lastName: string;
  civility: string;
  id: string;
}

interface ProfilBackupProps {
  item: {
    user: userType;
    id: string;
    disponibility: string;
    lastExperience: Array<{
      jobPlace?: string;
      jobType?: string;
      jobDescription?: string;
      [key: string]: any;
    }>;
  };
  removeFavoris: (id: string) => void;
  dateToString: (id: Date) => void;
  detailsFavorites: (id: string) => void;
  dateFav: Date;
}

export const ProfilBackup = (props: ProfilBackupProps) => {
  const { item, removeFavoris, dateFav, detailsFavorites } = props;
  const { disponibility, lastExperience, id, user } = item;
  const { accessToken, user: currentUser } = useSelector(
    ({ auth }: any) => auth
  );
  const date = dateToString(dateFav);
  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;

  const condition =
    currentUser?.abonnementId === '63d0ef142e1204452fd2f2bf' ||
    currentUser?.role === activeString.ROLEACCOUNT.candidate;

  const [avatar, setAvatar] = useState<string>('');

  const { downloadImageById } = UploadFileService();

  const getAvatar = async () => {
    try {
      const avatarDownloaded: any = await downloadImageById(
        item?.user?.id,
        accessToken
      );
      if (avatarDownloaded) {
        setAvatar(URL.createObjectURL(avatarDownloaded));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <div style={styles.companyContainer}>
      <button
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onClick={() => {
          detailsFavorites(id);
        }}
      >
        <div style={styles.candidateImgContainer}>
          <img
            style={styles.candidatImg}
            src={avatar || { uri: images.avatar_6 }}
          />
        </div>
        <div style={styles.candidateDetailsContainer}>
          <span style={styles.candidatName}>
            {condition
              ? getAcronym(
                  `${item?.user?.firstName ?? ''} ${item?.user?.lastName ?? ''}`
                )
              : `${item?.user?.firstName ?? ''} ${item?.user?.lastName ?? ''}`}
          </span>
          <span style={styles.candidatPost}>
            {[
              disponibility,
              lastExperience[0]?.jobPlace,
              lastExperience[0]?.jobType,
              lastExperience[0]?.jobDescription,
              user.civility,
            ]
              .filter(Boolean)
              .join(' - ')}
          </span>
          <span style={styles.candidatExp}>{date}</span>
        </div>
      </button>
      <button
        onClick={() => {
          removeFavoris(id);
        }}
      >
        <img style={styles.favorisImage} src={icons.favoris} />
      </button>
    </div>
  );
};

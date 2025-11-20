import React from 'react';
import { useState, useEffect } from 'react';
;
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
  displayOfferApply: (id: string) => void}

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
    <button
      style={styles.candidateContainer}
      onClick={() => displayOfferApply(_id)}>
      <div style={styles.candidateImgContainer}>
        <img
          style={styles.candidatImg}
          src={image ? { uri: avatar } : { uri: images.avatar_1 }}
        />
      </div>

      <div style={styles.candidateDetailsContainer}>
        {/** A propos du candidat */}
        <span style={styles.candidatName}>
          {condition
            ? getAcronym(`${firstName} ${lastName}`)
            : `${firstName} ${lastName}`}
        </span>
        <span style={styles.candidatPost}>
          {' '}
          {active ? 'Actif' : 'Non Actif'}
        </span>
        <span style={styles.jobDate}>{date}</span>
      </div>
    </button>
  );
};

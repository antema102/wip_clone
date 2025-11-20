import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

;
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
    <div key={index} style={styles.candidateContainer} >
      {isFavorite ? <>
        <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: 'rgba(51, 153, 255, 0.1)', padding: 32, borderRadius: 10, marginBottom: 24, width: '100%' }}>
          <button style={{ flexDirection: 'row', gap: 22, alignItems: 'center' }} onClick={() => detailsFavorites(id)}>
            <div style={styles.candidateImgContainer}>
              <img style={styles.candidatImg} src={avatar  ? avatar  : { uri: images.avatar_6 }} />
            </div>
            <div style={isMobile ? styles.candidateDetailsContainer : ''}>
              {/** Nom du job - Lieu */}
              <span style={{...styles.candidatName, ...(isMobile ? { fontSize: 12 } : { fontSize: 16 })}}>{name}</span>
              <span style={styles.candidatPost}>
                {ref} - {lieu}
              </span>
            </div>
          </button>
          <div>
            <span style={styles.candidatExp}>{date}</span>
            <button onClick={() => removeFavoris(id)}>
              <img style={styles.favorisImage} src={icons.favoris } />
            </button>
          </div>
        </div>
        {/* <Divider type={'solid'} /> */}
      </>
        :
        <>
          <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <button style={{ flexDirection: 'row', gap: 22, alignItems: 'center' }} onClick={() => detailsFavorites(id)}>
              <div style={styles.candidateImgContainer}>
                <img style={styles.candidatImg} src={avatar  ? avatar  : { uri: images.avatar_6 }} />
              </div>
              <div style={styles.candidateDetailsContainer}>
                {/** Nom du job - Lieu */}
                <span style={{...styles.candidatName, ...(isMobile ? { fontSize: 12 } : { fontSize: 16 })}}>{name}</span>
                <span style={styles.candidatPost}>
                  {job} - {place}
                </span>
              </div>
            </button>

            <div>
              <span style={styles.candidatExp}>{date}</span>
              <button onClick={() => removeFavoris(id)}>
                <img style={styles.favorisImage} src={icons.Lmore } />
              </button>
            </div>
          </div>
          <Divider type={'solid'} />
        </>
      }
    </div>
  );
};
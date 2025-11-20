import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { UserSA } from '../../../service/applicatif/User.sa';
import { UploadFileService } from '../../../service/applicatif/UploadFile.sa';
import { icons } from '../../../resources/constants';
import styles from './styles';
import UserInfo from '../UserInfo';
import MiniLoader from '../MiniLoader';
import * as stringsFr from '../../../data/constants/strings';
import * as stringsEn from '../../../data/constants/strings_en';
import { useLang } from '../../../data/translation';
import ButtonAside from '../ButtonAside';
interface profilType {
  name?: string;
  activity?: string;
  post?: string;
}

const ProfilEntreprise = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user, accessToken } = useSelector(({ auth }: any) => auth);
  const [profil, setProfil] = useState<profilType>({
    name: '',
    activity: '',
    post: '',
  });
  const { getUserById } = UserSA();

  const [avatar, setAvatar] = useState<string>('');
  const { downloadImage } = UploadFileService();

  const getAvatar = async () => {
    try {
      const avatarDownloaded: any = await downloadImage(accessToken);
      if (avatarDownloaded) {
        setAvatar(URL.createObjectURL(avatarDownloaded));
      }
    } catch (error) {}
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files != null && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getDataUser = async () => {
    try {
      const { data }: any = await getUserById(user?.id, accessToken);
      if (data) {
        setProfil({ name: `${data?.name}`, activity: `${data?.activity}` });
      }
    } finally {
      getAvatar();
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);

  const condition = user?.abonnementId === '643e8da6bd0b9b4dfe55307d';

  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;

  return (
    <>
      <div style={styles.container}>
        <UserInfo
          userAvatar={avatar}
          setUserAvatar={setAvatar}
          userName={profil?.name}
          userPost={profil?.post}
          isChangeable={true}
        />
        <div style={styles.contentProfil}>
          <ButtonAside
            onClick={() => {
              navigate('/MyAccount');
            }}
            title={activeString.DETAIL_PROFIL.MON_COMPTE}
            icon={icons.profil}
          />
          <ButtonAside
            onClick={() => {
              navigate('/EnterpriseInformations');
            }}
            title={activeString.DETAIL_PROFIL.MON_INFO}
            icon={icons.cv}
          />
          <ButtonAside
            onClick={() => {
              navigate('/EnterpriseProfilBackupScreen');
            }}
            title={activeString.DETAIL_PROFIL.MES_SAUVEGARDES}
            icon={icons.save}
          />
          {condition && (
            <ButtonAside
              onClick={() => {
                navigate('/PresentationVideoScreen');
              }}
              title={activeString.DETAIL_PROFIL.MA_PRESENTATION_VIDEO}
              icon={icons.video}
            />
          )}
          <ButtonAside
            onClick={() => {
              navigate('/EnterpriseAdvertisingScreen');
            }}
            title={activeString.DETAIL_PROFIL.GESTION_PUBLICITES}
            icon={icons.ads}
          />
          <ButtonAside
            onClick={() => {
              navigate('/EntrepriseOfferCreateScreen');
            }}
            title={activeString.DETAIL_PROFIL.GESTION_APPEL_OFFRE}
            icon={icons.work}
          />
        </div>
      </div>
      <div style={[styles.containerMore]}>
        <span style={styles.textMore}>{activeString.STRING_ALL.FOLLOW}</span>
        <div style={styles.contentMore}>
          <button>
            <Link
              to={'https://www.linkedin.com/company/wipwork/'}
              target="_blank"
            >
              <img src={icons.linkedin} style={styles.stylesButtons} />
            </Link>
          </button>
          <button>
            <Link to="https://youtube.com" target="_blank">
              <img src={icons.youtubeRound} style={styles.stylesButtons} />
            </Link>
          </button>
          <button>
            <Link
              to="https://www.facebook.com/profile.php?id=100092615205995"
              target="_blank"
            >
              <img src={icons.facebook_blue} style={styles.stylesButtons} />
            </Link>
          </button>
          <button>
            <Link to="https://www.instagram.com" target="_blank">
              <img src={icons.instagram} style={styles.stylesButtons} />
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilEntreprise;

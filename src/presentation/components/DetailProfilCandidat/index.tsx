import React, { useEffect, useState } from 'react'

import styles from './styles';
import { COLORS, icons } from '../../../resources/constants';
import { useSelector } from 'react-redux';
import { CVService } from '../../../service/applicatif/curriculumVitae.sa';
import { UploadFileService } from '../../../service/applicatif/UploadFile.sa';
import { useCV } from '../../../service/redux/ducks/cv';
import { useNavigate, Link } from 'react-router-dom';
import UserInfo from '../UserInfo';
import * as stringsEn from '../../../data/constants/strings_en';
import * as stringsFr from '../../../data/constants/strings';
import { useLang } from '../../../data/translation';
import { useMobile } from '../../../service/hooks/useMobile';
import ButtonAside from '../ButtonAside';
import Toggle from '../Toggle';
import { UserSA } from '../../../service/applicatif/User.sa';

type Profil = {
    name: string;
    post: string;
};

const ProfilCandidat = () => {
    const { hasCV } = useSelector(({ cv }: any) => cv);
    const { user, accessToken } = useSelector(({ auth }: any) => auth);
    const [profil, setProfile] = useState<Profil>({ name: '', post: '' });
    const [avatar, setAvatar] = useState<string>('');
    const [isCV, setIsCV] = useState(false);
    const { fetchMyData, getAvailability, sendAvailability } = CVService();
    const { postUser, getUserById } = UserSA()
    const navigate = useNavigate();
    const { findUserCv } = useCV();
    const { downloadImage } = UploadFileService();
    const { hasMyVideo } = useSelector(({ user }) => user);
    const { lang } = useLang();
    const activeString = lang === 'fr' ? stringsFr : stringsEn;
    const { isMobile } = useMobile();
    const [invisible, setInvisible] = useState(false)
    const [actif, setActif] = useState(false)
    const [passif, setPassif] = useState(false)
    const [statusUser, setStatusUser] = useState<Boolean>(false)
    const [toogle, setToogle] = useState<boolean>(false);

    const handleGetUserById = async () => {
        try {
            const response = await getUserById(user?.id, accessToken);
            const data = response?.data;
            setStatusUser(data.active);
            return data.active;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const getAvatar = async () => {
        try {
            const image = await getUserById(user.id, accessToken)
            const avatar = image.data.image
            if (avatar.startsWith('https') || avatar.startsWith('http')) {
                setAvatar(avatar)
            }
            else {
                const avatarDownloaded: any = await downloadImage(accessToken);
                if (avatarDownloaded) {
                    setAvatar(URL.createObjectURL(avatarDownloaded));
                }
            }
        } catch (error) {
            console.error()
        }
    };

    const getAvailabilityStatus = async () => {
        try {
            const newStatusUser = await handleGetUserById();
            if (!newStatusUser) {
                setInvisible(true);
                setActif(false);
                setPassif(false);
                setStatusUser(false);
            } else {
                const response: any = await getAvailability(accessToken);
                const available = response?.data[0].isAvailable;
                if (available) {
                    setInvisible(false);
                    setActif(true);
                    setPassif(false);
                    setStatusUser(true);
                } else {
                    setInvisible(false);
                    setActif(false);
                    setPassif(true);
                    setStatusUser(true);
                }
            }
        } catch (error) {
            console.warn(error);
        }
    };

    const changeAvailabilityStatus = async (type: string) => {
        try {
            if (type === 'invisible') {
                await postUser('desactivate', accessToken)
                setInvisible(true)
                setPassif(false)
                setActif(false)
                setStatusUser(false);
            } else if (type === 'actif') {
                if (!statusUser) {
                    await postUser('activate', accessToken)
                    setStatusUser(true);
                }
                await sendAvailability(accessToken, 'true');
                setInvisible(false)
                setPassif(false)
                setActif(true)
            }
            else if (type === 'passif') {
                if (!statusUser) {
                    await postUser('activate', accessToken)
                    setStatusUser(true);
                }
                await sendAvailability(accessToken, 'false');
                setInvisible(false)
                setPassif(true)
                setActif(false)
            }
        } catch (error) {
            console.error(error)
        }
    };

    const handleRedirectionCv = () => {
        hasCV
            ? navigate('/CreateCV', { state: { type: 'read' } })
            : navigate('/IntermediateCvScreen');
    };

    const checkCV = async () => {
        const responseCV = await findUserCv();
        if (responseCV?.data?.isError) {
            setIsCV(false);
        } else {
            setIsCV(true);
            getAvailabilityStatus();
        }
    };

    const getMyCV = async () => {
        checkCV();
        try {
            const { data }: any = await fetchMyData(user?.accessToken);
            if (data.id) {
                setProfile({
                    name: `${data?.user?.lastName || ''} - ${data?.user?.firstName || ''
                        }`,
                    post: `${data?.jobWish?.name || ''}`});
            }
        } finally {
            getAvatar();
        }
    };

    const handleToogle = () => {
        setToogle((prev) => !prev);
    };
    useEffect(() => {
        getMyCV();
    }, []);

    return (
        <>
            <div style={isMobile ? styles.containerMobiles : styles.container}>
                <UserInfo userAvatar={avatar} setUserAvatar={setAvatar} userName={profil?.name} userPost={profil?.post} isChangeable={true} />
                <div style={styles.contentProfil}>
                    {isCV && (
                        <button onClick={handleToogle}>
                            <ButtonAside title={activeString.DETAIL_PROFIL.STATUS} icon={icons.statut} toogle={true} />
                            {toogle && (
                                <Toggle
                                    actif={actif}
                                    passif={passif}
                                    invisible={invisible}
                                    handleChange={changeAvailabilityStatus}
                                />
                            )}
                        </button>
                    )}
                    {isCV &&
                        <ButtonAside title={activeString.DETAIL_PROFIL.MON_CV} onClick={handleRedirectionCv} icon={icons.cv} />
                    }
                    {hasMyVideo &&
                        <ButtonAside title={activeString.DETAIL_PROFIL.MA_PRESENTATION_VIDEO} onClick={() => navigate('/ResumeVideoScreen', { state: { isShow: true } })} icon={icons.video} />
                    }
                    <ButtonAside title={activeString.DETAIL_PROFIL.MES_SAUVEGARDES} onClick={() => navigate('/CandidatProfilBackupScreen')} icon={icons.ads} />
                    <ButtonAside title={activeString.DETAIL_PROFIL.MON_COMPTE} onClick={() => navigate('/MyAccount')} icon={icons.profil} />
                    <ButtonAside title={activeString.DETAIL_PROFIL.PETITES_ANNONCES} onClick={() => navigate('/EnterpriseAdvertisingScreen')} icon={icons.description} />
                </div>
            </div>
            <div style={isMobile ? { padding: 24, backgroundColor: COLORS.white } : [styles.container, styles.containerMore]}>
                <span style={styles.textMore}>{activeString.STRING_ALL.FOLLOW}</span>
                <div style={styles.contentMore}>
                    <button>
                        <Link to={'https://www.linkedin.com/company/wipwork/'} target='_blank'>
                            <img src={icons.linkedin} style={styles.stylesButtons} />
                        </Link>
                    </button>
                    <button>
                        <Link to='https://youtube.com' target='_blank'>
                            <img src={icons.youtubeRound} style={styles.stylesButtons} />
                        </Link>
                    </button>
                    <button>
                        <Link to='https://www.facebook.com/profile.php?id=100092615205995' target='_blank'>
                            <img src={icons.facebook_blue} style={styles.stylesButtons} />
                        </Link>
                    </button>
                    <button>
                        <Link to='https://www.instagram.com' target='_blank'>
                            <img src={icons.instagram} style={styles.stylesButtons} />
                        </Link>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProfilCandidat;
import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';

import { useSelector } from 'react-redux';
import { CVService } from '../../../../../service/applicatif/curriculumVitae.sa';
import { useFavorites } from '../../../../../service/redux/ducks/favorites';
import { UserSA } from '../../../../../service/applicatif/User.sa';
import { useHome } from './useHome';
import { useOfferr } from '../../../../../service/redux/ducks/offer';
import { UploadFileService } from '../../../../../service/applicatif/UploadFile.sa';
import { ROLEACCOUNT, RESUME_VIDEO, DETAIL_PROFIL } from '../../../../../data/constants/strings';
import { COLORS, SIZES, icons, images } from '../../../../../resources/constants';
import { getAcronym, thousandSeparator, extractNumberBeforeAns } from '../../../../../data/factory';
import FileDownloader from '../../../../components/FileDownloader';
import { language, levelOfStudy, logerOrNot } from '../../../../../data/constants/enum';
import { calculateAge } from '../../../../../data/factory/dateFactory';
import ProgressBar from '../../../../components/ProgressBar';
import Popup from './Popup';
import Loader from '../../../../components/Loader';
import { useNavigate } from 'react-router-dom';
import { styles } from './styles';
import DisplayVideo from '../../DisplayVideo';
import CustomModal from '../../../../components/Modal';
import VideoProgressBar from '../../../../components/VideoProgressBar';


interface data {
    data: CandidatData
}

interface CandidatData {
    user: {
        id: string;
        phone: string;
        firstName?: string;
        lastName?: string;
        birthDate?: string;
        civility?: string;
        childrenNumber?: number;
    };
    adress?: {
        zone?: string;
        country?: { name?: string };
        province?: { name?: string };
    };
    statut?: string;
    jobWish?: {
        name?: string;
        yearOfExperience?: string;
        salaryExpectation?: string;
    };
    recommandation?: any[];
    portfolio?: any;
    lastExperience: any[];
    studyArea?: any[];
    lenght?: number;
    disponibility?: string;
    pet?: string;
    transport?: string;
    loger: keyof typeof logerOrNot;
    sport: string[];
    interest?: string;
    jobLocalisation: any[];
    presentation?: string;
    languages?: any[];
}

const CandidatDetail = ({ stateValue }: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [offerName, setOfferName] = useState('');
    const navigate = useNavigate();

    const [datas, setData] = useState<CandidatData>();
    const [visible, setVisible] = useState(false);
    const [videoURL, setVideoURL] = useState('');
    const [progressBar, setProgressBar] = useState(0);

    const { getCVById, getCVByIdUser } = CVService();

    const { allFavorites, addFavorite, deleteFavoris } = useFavorites();
    const { getUserById, displayUserVideoPresentation } = UserSA();
    const [transmitter, setTransmitter] = useState<any>({});
    const [receiver, setReceiver] = useState<any>({});
    const { user, accessToken } = useSelector(({ auth }: any) => auth);
    const [avatar, setAvatar] = useState('');
    const [candidatID, setCandidatID] = useState('');
    const [CVVideo, setCVVideo] = useState(false);
    const { offerJobById } = useOfferr();
    const [didApply, setDidApply] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isThereprogressStatus, setIsThereProgressStatus] = useState(false);

    const { downloadImageById, testCVVideo } = UploadFileService();

    const getOfferJobById = async () => {
        if (stateValue?.offerId) {
            const response = await offerJobById(stateValue?.offerId, '');
            const { data } = response;
            setOfferName(data?.name);
            setDidApply(true);
        }
    };

    const getAvatar = async (id: string) => {
        try {
            const avatarDownloaded: any = await downloadImageById(id, accessToken);
            if (avatarDownloaded) {
                setAvatar(URL.createObjectURL(avatarDownloaded));
            }
        } catch (error) { }
    };

    const isFavorites = (favorites: any[]): boolean =>
        !!favorites.find(item => item?.id === stateValue?.id);

    const getAllFavorites = async () => {
        try {
            const res = await allFavorites(accessToken);

            if (!res.isError) {
                setIsFavorite(Boolean(isFavorites(res?.data?.items[0]?.cv)));
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getCVVideoByID = async (id: string) => {
        try {
            const res: any = await testCVVideo(id, accessToken);

            if (res?.data?.cvId) {
                setCVVideo(true);
            }
        } finally {
            getAllFavorites();
        }
    };

    const getUsers = async (receiverId: string) => {
        try {
            const { data: receiverData } = await getUserById(receiverId, accessToken);
            const { data: transmitterData } = await getUserById(user?.id, accessToken);
            setReceiver(receiverData);
            setTransmitter(transmitterData);
        } catch (error) { }
    };

    const setDatas = (res: data) => {
        setData(res.data);
        getAvatar(res?.data?.user?.id);
        getOfferJobById();
        getCVVideoByID(res?.data?.user?.id);
        setPhoneNumber(res?.data?.user?.phone);
        getUsers(res?.data?.user?.id);
        setCandidatID(res?.data?.user?.id);
    };

    const getCVbyIdCV = async (idCV: string, idUser: string | null = null) => {
        let successCall: boolean = true;
        try {
            const res = await getCVById(accessToken, idCV);
            if (res.data && !res?.isError) {
                setDatas(res);
            }
        } catch (error) {
        }
    };

    const getCVbyIdUser = async (idUser: string) => {
        try {
            const res = await getCVByIdUser(accessToken, idUser);
            if (res.data && !res?.isError) {
                setDatas(res);
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        if (stateValue?.id) {
            getCVbyIdCV(stateValue?.id, stateValue?.candidatId);
        } else if (stateValue?.idCandidate) {
            getCVbyIdUser(stateValue?.idCandidate);
        }
    }, []);

    const toggleFavorites = () => {
        setIsLoading(true);
        if (isFavorite) {
            removeToFavoris();
        } else {
            addToFavoris();
        }
    };

    const addToFavoris = async () => {
        try {
            const res: any = await addFavorite(accessToken, stateValue?.id);
            if (!res.isError) {
                setIsFavorite(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const removeToFavoris = async () => {
        try {
            const res = await deleteFavoris(accessToken, stateValue?.id);

            if (!res.isError) {
                setIsFavorite(false);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getSeniority = (years: string): string => {
        const yearsOfExperience = extractNumberBeforeAns(years) || 0;
        switch (true) {
            case yearsOfExperience > 5:
                return 'Senior';
            case yearsOfExperience > 2:
                return 'Confirmé';
            default:
                return 'Junior';
        }
    };

    const getLanguageLvl = (languageLevel: string): number => {
        switch (true) {
            case languageLevel === 'natif':
                return 95;
            case languageLevel === 'advanced':
                return 75;
            case languageLevel === 'intermediate':
                return 50;
            default:
                return 25;
        }
    };

    const displayVideoCandidat = async () => {
        setVisible(true)
    };

    const hideTheProgressBar = async () => {
        setModalVisible(false);
    };

    const condition =
        user?.abonnementId === '63d0ef142e1204452fd2f2bf' ||
        user?.role === ROLEACCOUNT.candidate;


    const languageFiltered = (data: any): any => {
        const filteredData = data.filter((value: any, index: number, self: any[]) => {
            return self.findIndex((v: any) => v.name === value.name) === index;
        });
        return filteredData;
    };

    return (
        <>
            <div style={styles.container}>
                <div style={{overflowY: "auto"}} style={{ backgroundColor: 'transparent' }}>

                    <Dialog
                        animationType="slide"
                        transparent
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        {isThereprogressStatus ? (
                            <div style={styles.centeredView}>
                                <VideoProgressBar
                                    progressBar={progressBar}
                                    waitingText={RESUME_VIDEO.WAITING_WHILE_DOWNLOADING}
                                    goBack={hideTheProgressBar}
                                />
                            </div>
                        ) : (
                            null
                        )}
                    </Dialog>

                    {/* <Header {...props} /> */}
                    <div style={styles.containers}>
                        <div style={styles.vtitle}>
                            {/** Image Profile, Name and Profession */}
                            <div style={styles.candidatIdentity}>
                                <img
                                    style={styles.imageStyle}
                                    src={avatar ? { uri: avatar } : { uri: images.avatar_6 }}
                                />
                                <span style={styles.candidatIdentityName}>
                                    {condition
                                        ? getAcronym(
                                            `${datas?.user?.firstName || ''} ${datas?.user?.lastName || ''
                                            }`,
                                        )
                                        : `${datas?.user?.firstName || ''} ${datas?.user?.lastName || ''
                                        }`}
                                </span>
                                <span style={styles.candidatIdentityPost}>
                                    {datas?.jobWish?.name || ''}
                                </span>
                            </div>

                            {/* * Compatibility Component */}
                            <div style={[styles.compatibilityContainer]}>

                                {stateValue?.score ? (
                                    <div style={[styles.compatibilityItem]}>
                                        <span
                                            style={{
                                                color: COLORS.white,
                                                height: 26,
                                                fontSize: SIZES.h5}}>{`${stateValue.score}%`}</span>
                                        <span style={styles.labelInfos}>de compatibilité</span>
                                    </div>
                                ) : null}

                                {user?.role === 'company' && (<div style={[styles.compatibilityItem]}>
                                    <button
                                        onClick={toggleFavorites}
                                        style={styles.compatibilityItem}>
                                        <img
                                            src={isFavorite ? { uri: icons.favoris } : { uri: icons.deFavoris }}
                                            style={{ width: 28, height: 26, objectFit: 'cover' as const }}
                                        />
                                        <span style={styles.labelInfos}>
                                            {isFavorite ? 'Favoris' : 'Ajouter aux favoris'}
                                        </span>
                                    </button>
                                </div>)
                                }
                                {!condition && CVVideo ? (
                                    <div style={[styles.compatibilityItem]}>
                                        <button
                                            onClick={() => displayVideoCandidat()}
                                            style={styles.compatibilityItem}>
                                            <img
                                                src={{ uri: icons.youtube }}
                                                style={{ width: 28, height: 26, objectFit: 'cover' as const }}
                                            />
                                            <span style={styles.labelInfos}>Présentation</span>
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                            {/** Candidate about */}
                            <div style={styles.candidateAboutContainer}>
                                <div style={styles.candidateAboutItem}>
                                    <div style={styles.puceBlue} />
                                    <div>
                                        <span style={styles.labelPrim}>LIEU :</span>
                                        <span style={styles.descrPrim}>{`${datas?.adress?.zone || ''
                                            }`}</span>
                                    </div>
                                </div>

                                <div style={styles.candidateAboutItem}>
                                    <div style={styles.puceBlue} />
                                    <div>
                                        <span style={styles.labelPrim}>STATUT :</span>
                                        <span style={styles.descrPrim}>{datas?.statut}</span>
                                    </div>
                                </div>

                                <div style={styles.candidateAboutItem}>
                                    <div style={styles.puceBlue} />
                                    <div>
                                        <span style={styles.labelPrim}>PROFIL :</span>
                                        <span style={styles.descrPrim}>
                                            {datas?.jobWish?.yearOfExperience
                                                ? getSeniority(datas?.jobWish?.yearOfExperience)
                                                : ''}
                                        </span>
                                    </div>
                                </div>

                                <div style={styles.candidateAboutItem}>
                                    <div style={styles.puceBlue} />
                                    <div>
                                        <span style={styles.labelPrim}>PRESTATION :</span>
                                        <span style={styles.descrPrim}>
                                            {datas?.jobWish?.salaryExpectation
                                                ? thousandSeparator(
                                                    datas?.jobWish?.salaryExpectation,
                                                    '.',
                                                )
                                                : ''}
                                        </span>
                                    </div>
                                </div>

                                <div style={styles.candidateAboutItem}>
                                    <div style={styles.puceBlue} />
                                    <div>
                                        <span style={styles.labelPrim}>EXPERIENCES :</span>
                                        <span style={styles.descrPrim}>
                                            {datas?.jobWish?.yearOfExperience
                                                ? `${datas?.jobWish?.yearOfExperience}`
                                                : ''}
                                        </span>
                                    </div>
                                </div>

                                <div style={styles.candidateAboutItem}>
                                    <div style={styles.puceBlue} />
                                    <div>
                                        <span style={styles.labelPrim}>DISPONIBILITÉ :</span>
                                        <span style={styles.descrPrim}>
                                            {datas?.disponibility ? `${datas?.disponibility}` : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {datas?.recommandation && datas?.recommandation.length !== 0 && (
                                <div style={styles.badgeContainer}>
                                    <img
                                        src={{ uri: icons.badge }}
                                        style={{ width: 24, height: 24, objectFit: 'contain' as const }}
                                    />
                                    <span style={{ marginLeft: 5, color: '#BF9500' }}>
                                        Recommandation :
                                    </span>
                                </div>
                            )}

                            {datas?.recommandation &&
                                datas?.recommandation.length !== 0 &&
                                datas?.recommandation?.map((item: {}) => (
                                    <div style={{ width: '100%' }}>
                                        <FileDownloader data={item} />
                                    </div>
                                ))}

                            {datas?.portfolio ? (
                                <div style={{ width: '100%' }}>
                                    <FileDownloader data={datas.portfolio} isPortfolio={true} />
                                </div>
                            ) : null}

                            {/** Candidate Experiences */}
                            {datas?.lastExperience.length !== 0 && (<div style={styles.candidateExpContainer}>
                                <span style={styles.candidateExpTitle}>Expériences</span>
                                <div
                                    data={datas?.lastExperience}
                                    renderItem={({ item, index }) => (
                                        <div style={styles.candidatExpItem}>
                                            <span
                                                style={
                                                    styles.refExp
                                                }>{`${item.year} : ${item.jobPlace}`}</span>
                                            <span style={styles.refExpPost}>{item.jobType}</span>
                                            <div
                                                style={{
                                                    height: 2,
                                                    width: 30,
                                                    backgroundColor: COLORS.trait_blue,
                                                    marginTop: 10}}
                                            />
                                        </div>
                                    )}
                                    keyExtractor={(item, index) => `experiences_${index}`}
                                />
                            </div>)}

                            {/** Candidate Formations */}
                            <div style={styles.candidateExpContainer}>
                                <span style={styles.candidateExpTitle}>Formations</span>
                                <div
                                    data={datas?.studyArea}
                                    renderItem={({ item }) => (
                                        <div style={styles.candidatExpItem}>
                                            <span style={styles.refExp}>{item?.level}</span>
                                            <span style={styles.refExpPost}>{item.filiere}</span>
                                            {item?.university ? (
                                                <div style={styles.inBetween}>
                                                    <span style={styles.others}>
                                                        Ecole ou université :{' '}
                                                    </span>
                                                    <span style={styles.othersBig}>{item?.university}</span>
                                                </div>
                                            ) : null}
                                            <div
                                                style={{
                                                    height: 2,
                                                    width: 30,
                                                    backgroundColor: COLORS.trait_blue,
                                                    marginTop: 10}}
                                            />
                                        </div>
                                    )}
                                    keyExtractor={(item, index) => `formations_${index}`}
                                />
                            </div>

                            {datas && datas.lenght !== 0 && (
                                <div style={styles.candidateExpContainer}>
                                    <span style={styles.candidateExpTitle}>AUTRES</span>
                                    <div style={styles.inBetween}>
                                        <span style={styles.others}>Age : </span>
                                        <span style={styles.othersBig}>
                                            {calculateAge(datas?.user?.birthDate)}
                                        </span>
                                    </div>
                                    <div style={styles.inBetween}>
                                        <span style={styles.others}>Etat civil : </span>
                                        <span style={styles.othersBig}>{datas?.user?.civility}</span>
                                    </div>
                                    <div style={styles.inBetween}>
                                        <span style={styles.others}>Nombre d'enfants : </span>
                                        <span style={styles.othersBig}>
                                            {datas?.user?.childrenNumber}
                                        </span>
                                    </div>
                                    <div style={styles.inBetween}>
                                        <span style={styles.others}>Animal de compagnie: </span>
                                        <span style={styles.othersBig}>{datas?.pet}</span>
                                    </div>
                                    <div style={styles.inBetween}>
                                        <span style={styles.others}>Moyen de transport: </span>
                                        <span style={styles.othersBig}>{datas?.transport}</span>
                                    </div>
                                    <div style={styles.inBetween}>
                                        <span style={styles.others}>Logé : </span>
                                        <span style={styles.othersBig}>
                                            {logerOrNot[datas?.loger]}
                                        </span>
                                    </div>
                                    <div style={styles.inBetween}>
                                        <span style={styles.others}>Pays actuel : </span>
                                        <span style={styles.othersBig}>
                                            {datas?.adress?.country?.name}
                                        </span>
                                    </div>
                                    <div style={styles.inBetween}>
                                        <span style={styles.others}>Province actuelle : </span>
                                        <span style={styles.othersBig}>
                                            {datas?.adress?.province?.name}
                                        </span>
                                    </div>
                                    <div style={styles.inBetween}>
                                        <span style={styles.others}>Zone actuelle : </span>
                                        <span style={styles.othersBig}>{datas?.adress?.zone}</span>
                                    </div>
                                    <div style={styles.inBetween}>
                                        <span style={styles.others}>Sport : </span>
                                        <span style={styles.othersBig}>{datas?.sport[0]}</span>
                                    </div>
                                    <div style={styles.inBetween}>
                                        <span style={styles.othersLarge}>Centre d'intérêt : </span>
                                        <span style={styles.othersBigLarge}>{datas?.interest}</span>
                                    </div>

                                    {datas?.jobLocalisation[0] ? (
                                        <div>
                                            <div style={styles.inBetween}>
                                                <span style={styles.others}>Pays souhaité: </span>
                                                <span style={styles.othersBig}>
                                                    {datas?.jobLocalisation[0].country?.name}
                                                </span>
                                            </div>
                                            <div style={styles.inBetween}>
                                                <span style={styles.others}>Province souhaitée: </span>
                                                <span style={styles.othersBig}>
                                                    {datas?.jobLocalisation[0].province?.name}
                                                </span>
                                            </div>
                                            <div style={styles.inBetween}>
                                                <span style={styles.others}>
                                                    Quartier ou Commune souhaitée :{' '}
                                                </span>
                                                <span style={styles.othersBig}>
                                                    {datas?.jobLocalisation[0].zone}
                                                </span>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            )}

                            {datas?.presentation ? (
                                <div style={styles.candidateExpContainer}>
                                    <span style={styles.candidateExpTitle}>A propos de moi</span>
                                    <div style={styles.inBetween}>
                                        <span style={styles.others}>{datas?.presentation}</span>
                                    </div>
                                </div>
                            ) : null}

                            {/** Candidate Languages */}
                            <div style={styles.candidateExpContainer}>
                                <span style={styles.candidateExpTitle}>Langues</span>
                                {datas?.languages && <div
                                    data={languageFiltered(datas?.languages)}
                                    renderItem={({ item }) => (
                                        <div style={styles.candidatExpItem}>
                                            <span style={styles.refExpPost}>{item?.name}</span>
                                            <ProgressBar
                                                bgcolor={COLORS.primary}
                                                level={getLanguageLvl(item.level)}
                                            />
                                        </div>
                                    )}
                                    keyExtractor={(item, index) => `languages_${index}`}
                                />}
                            </div>

                            {/** Contacting the Candidate */}
                            <div />
                            <div style={styles.compatibilityBtnContainer}>
                                <span style={styles.compatibilityBtnTitle}>
                                    {stateValue?.score
                                        ? `Compatibilité avec votre profil: ${stateValue.score}%`
                                        : ''}
                                </span>
                                <Popup
                                    phone={phoneNumber}
                                    compatibility={''}
                                    transmitter={transmitter}
                                    receiver={receiver}
                                    senderId={user?.id}
                                    offerId={stateValue?.offerId}
                                    jobTitle={offerName}
                                    didApply={didApply}
                                />
                            </div>
                            <div style={styles.ofsset120} />
                        </div>
                    </div>
                    {isLoading ? <Loader /> : <div />}
                </div>
            </div>
            {visible ? <CustomModal title={'Présentation vidéo'} visible={visible} setVisible={setVisible} content={<DisplayVideo candidatId={candidatID} viewOnly={user?.role === ROLEACCOUNT.candidate ? false : true} />} /> : null}
        </>
    );
};

export default CandidatDetail;

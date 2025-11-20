import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    FlatList,
    Platform,
    TouchableOpacity,
    Modal,
} from 'react-native';
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
            <View style={styles.container}>
                <ScrollView style={{ backgroundColor: 'transparent' }}>

                    <Modal
                        animationType="slide"
                        transparent
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        {isThereprogressStatus ? (
                            <View style={styles.centeredView}>
                                <VideoProgressBar
                                    progressBar={progressBar}
                                    waitingText={RESUME_VIDEO.WAITING_WHILE_DOWNLOADING}
                                    goBack={hideTheProgressBar}
                                />
                            </View>
                        ) : (
                            null
                        )}
                    </Modal>

                    {/* <Header {...props} /> */}
                    <View style={styles.containers}>
                        <View style={styles.vtitle}>
                            {/** Image Profile, Name and Profession */}
                            <View style={styles.candidatIdentity}>
                                <Image
                                    style={styles.imageStyle}
                                    source={avatar ? { uri: avatar } : { uri: images.avatar_6 }}
                                />
                                <Text style={styles.candidatIdentityName}>
                                    {condition
                                        ? getAcronym(
                                            `${datas?.user?.firstName || ''} ${datas?.user?.lastName || ''
                                            }`,
                                        )
                                        : `${datas?.user?.firstName || ''} ${datas?.user?.lastName || ''
                                        }`}
                                </Text>
                                <Text style={styles.candidatIdentityPost}>
                                    {datas?.jobWish?.name || ''}
                                </Text>
                            </View>

                            {/* * Compatibility Component */}
                            <View style={[styles.compatibilityContainer]}>

                                {stateValue?.score ? (
                                    <View style={[styles.compatibilityItem]}>
                                        <Text
                                            style={{
                                                color: COLORS.white,
                                                height: 26,
                                                fontSize: SIZES.h5,
                                            }}>{`${stateValue.score}%`}</Text>
                                        <Text style={styles.labelInfos}>de compatibilité</Text>
                                    </View>
                                ) : null}

                                {user?.role === 'company' && (<View style={[styles.compatibilityItem]}>
                                    <TouchableOpacity
                                        onPress={toggleFavorites}
                                        style={styles.compatibilityItem}>
                                        <Image
                                            source={isFavorite ? { uri: icons.favoris } : { uri: icons.deFavoris }}
                                            style={{ width: 28, height: 26, resizeMode: 'cover' }}
                                        />
                                        <Text style={styles.labelInfos}>
                                            {isFavorite ? 'Favoris' : 'Ajouter aux favoris'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>)
                                }
                                {!condition && CVVideo ? (
                                    <View style={[styles.compatibilityItem]}>
                                        <TouchableOpacity
                                            onPress={() => displayVideoCandidat()}
                                            style={styles.compatibilityItem}>
                                            <Image
                                                source={{ uri: icons.youtube }}
                                                style={{ width: 28, height: 26, resizeMode: 'cover' }}
                                            />
                                            <Text style={styles.labelInfos}>Présentation</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : null}
                            </View>
                            {/** Candidate about */}
                            <View style={styles.candidateAboutContainer}>
                                <View style={styles.candidateAboutItem}>
                                    <View style={styles.puceBlue} />
                                    <View>
                                        <Text style={styles.labelPrim}>LIEU :</Text>
                                        <Text style={styles.descrPrim}>{`${datas?.adress?.zone || ''
                                            }`}</Text>
                                    </View>
                                </View>

                                <View style={styles.candidateAboutItem}>
                                    <View style={styles.puceBlue} />
                                    <View>
                                        <Text style={styles.labelPrim}>STATUT :</Text>
                                        <Text style={styles.descrPrim}>{datas?.statut}</Text>
                                    </View>
                                </View>

                                <View style={styles.candidateAboutItem}>
                                    <View style={styles.puceBlue} />
                                    <View>
                                        <Text style={styles.labelPrim}>PROFIL :</Text>
                                        <Text style={styles.descrPrim}>
                                            {datas?.jobWish?.yearOfExperience
                                                ? getSeniority(datas?.jobWish?.yearOfExperience)
                                                : ''}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.candidateAboutItem}>
                                    <View style={styles.puceBlue} />
                                    <View>
                                        <Text style={styles.labelPrim}>PRESTATION :</Text>
                                        <Text style={styles.descrPrim}>
                                            {datas?.jobWish?.salaryExpectation
                                                ? thousandSeparator(
                                                    datas?.jobWish?.salaryExpectation,
                                                    '.',
                                                )
                                                : ''}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.candidateAboutItem}>
                                    <View style={styles.puceBlue} />
                                    <View>
                                        <Text style={styles.labelPrim}>EXPERIENCES :</Text>
                                        <Text style={styles.descrPrim}>
                                            {datas?.jobWish?.yearOfExperience
                                                ? `${datas?.jobWish?.yearOfExperience}`
                                                : ''}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.candidateAboutItem}>
                                    <View style={styles.puceBlue} />
                                    <View>
                                        <Text style={styles.labelPrim}>DISPONIBILITÉ :</Text>
                                        <Text style={styles.descrPrim}>
                                            {datas?.disponibility ? `${datas?.disponibility}` : ''}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {datas?.recommandation && datas?.recommandation.length !== 0 && (
                                <View style={styles.badgeContainer}>
                                    <Image
                                        source={{ uri: icons.badge }}
                                        style={{ width: 24, height: 24, resizeMode: 'contain' }}
                                    />
                                    <Text style={{ marginLeft: 5, color: '#BF9500' }}>
                                        Recommandation :
                                    </Text>
                                </View>
                            )}

                            {datas?.recommandation &&
                                datas?.recommandation.length !== 0 &&
                                datas?.recommandation?.map((item: {}) => (
                                    <View style={{ width: '100%' }}>
                                        <FileDownloader data={item} />
                                    </View>
                                ))}

                            {datas?.portfolio ? (
                                <View style={{ width: '100%' }}>
                                    <FileDownloader data={datas.portfolio} isPortfolio={true} />
                                </View>
                            ) : null}

                            {/** Candidate Experiences */}
                            {datas?.lastExperience.length !== 0 && (<View style={styles.candidateExpContainer}>
                                <Text style={styles.candidateExpTitle}>Expériences</Text>
                                <FlatList
                                    data={datas?.lastExperience}
                                    renderItem={({ item, index }) => (
                                        <View style={styles.candidatExpItem}>
                                            <Text
                                                style={
                                                    styles.refExp
                                                }>{`${item.year} : ${item.jobPlace}`}</Text>
                                            <Text style={styles.refExpPost}>{item.jobType}</Text>
                                            <View
                                                style={{
                                                    height: 2,
                                                    width: 30,
                                                    backgroundColor: COLORS.trait_blue,
                                                    marginTop: 10,
                                                }}
                                            />
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => `experiences_${index}`}
                                />
                            </View>)}

                            {/** Candidate Formations */}
                            <View style={styles.candidateExpContainer}>
                                <Text style={styles.candidateExpTitle}>Formations</Text>
                                <FlatList
                                    data={datas?.studyArea}
                                    renderItem={({ item }) => (
                                        <View style={styles.candidatExpItem}>
                                            <Text style={styles.refExp}>{item?.level}</Text>
                                            <Text style={styles.refExpPost}>{item.filiere}</Text>
                                            {item?.university ? (
                                                <View style={styles.inBetween}>
                                                    <Text style={styles.others}>
                                                        Ecole ou université :{' '}
                                                    </Text>
                                                    <Text style={styles.othersBig}>{item?.university}</Text>
                                                </View>
                                            ) : null}
                                            <View
                                                style={{
                                                    height: 2,
                                                    width: 30,
                                                    backgroundColor: COLORS.trait_blue,
                                                    marginTop: 10,
                                                }}
                                            />
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => `formations_${index}`}
                                />
                            </View>

                            {datas && datas.lenght !== 0 && (
                                <View style={styles.candidateExpContainer}>
                                    <Text style={styles.candidateExpTitle}>AUTRES</Text>
                                    <View style={styles.inBetween}>
                                        <Text style={styles.others}>Age : </Text>
                                        <Text style={styles.othersBig}>
                                            {calculateAge(datas?.user?.birthDate)}
                                        </Text>
                                    </View>
                                    <View style={styles.inBetween}>
                                        <Text style={styles.others}>Etat civil : </Text>
                                        <Text style={styles.othersBig}>{datas?.user?.civility}</Text>
                                    </View>
                                    <View style={styles.inBetween}>
                                        <Text style={styles.others}>Nombre d'enfants : </Text>
                                        <Text style={styles.othersBig}>
                                            {datas?.user?.childrenNumber}
                                        </Text>
                                    </View>
                                    <View style={styles.inBetween}>
                                        <Text style={styles.others}>Animal de compagnie: </Text>
                                        <Text style={styles.othersBig}>{datas?.pet}</Text>
                                    </View>
                                    <View style={styles.inBetween}>
                                        <Text style={styles.others}>Moyen de transport: </Text>
                                        <Text style={styles.othersBig}>{datas?.transport}</Text>
                                    </View>
                                    <View style={styles.inBetween}>
                                        <Text style={styles.others}>Logé : </Text>
                                        <Text style={styles.othersBig}>
                                            {logerOrNot[datas?.loger]}
                                        </Text>
                                    </View>
                                    <View style={styles.inBetween}>
                                        <Text style={styles.others}>Pays actuel : </Text>
                                        <Text style={styles.othersBig}>
                                            {datas?.adress?.country?.name}
                                        </Text>
                                    </View>
                                    <View style={styles.inBetween}>
                                        <Text style={styles.others}>Province actuelle : </Text>
                                        <Text style={styles.othersBig}>
                                            {datas?.adress?.province?.name}
                                        </Text>
                                    </View>
                                    <View style={styles.inBetween}>
                                        <Text style={styles.others}>Zone actuelle : </Text>
                                        <Text style={styles.othersBig}>{datas?.adress?.zone}</Text>
                                    </View>
                                    <View style={styles.inBetween}>
                                        <Text style={styles.others}>Sport : </Text>
                                        <Text style={styles.othersBig}>{datas?.sport[0]}</Text>
                                    </View>
                                    <View style={styles.inBetween}>
                                        <Text style={styles.othersLarge}>Centre d'intérêt : </Text>
                                        <Text style={styles.othersBigLarge}>{datas?.interest}</Text>
                                    </View>

                                    {datas?.jobLocalisation[0] ? (
                                        <View>
                                            <View style={styles.inBetween}>
                                                <Text style={styles.others}>Pays souhaité: </Text>
                                                <Text style={styles.othersBig}>
                                                    {datas?.jobLocalisation[0].country?.name}
                                                </Text>
                                            </View>
                                            <View style={styles.inBetween}>
                                                <Text style={styles.others}>Province souhaitée: </Text>
                                                <Text style={styles.othersBig}>
                                                    {datas?.jobLocalisation[0].province?.name}
                                                </Text>
                                            </View>
                                            <View style={styles.inBetween}>
                                                <Text style={styles.others}>
                                                    Quartier ou Commune souhaitée :{' '}
                                                </Text>
                                                <Text style={styles.othersBig}>
                                                    {datas?.jobLocalisation[0].zone}
                                                </Text>
                                            </View>
                                        </View>
                                    ) : null}
                                </View>
                            )}

                            {datas?.presentation ? (
                                <View style={styles.candidateExpContainer}>
                                    <Text style={styles.candidateExpTitle}>A propos de moi</Text>
                                    <View style={styles.inBetween}>
                                        <Text style={styles.others}>{datas?.presentation}</Text>
                                    </View>
                                </View>
                            ) : null}

                            {/** Candidate Languages */}
                            <View style={styles.candidateExpContainer}>
                                <Text style={styles.candidateExpTitle}>Langues</Text>
                                {datas?.languages && <FlatList
                                    data={languageFiltered(datas?.languages)}
                                    renderItem={({ item }) => (
                                        <View style={styles.candidatExpItem}>
                                            <Text style={styles.refExpPost}>{item?.name}</Text>
                                            <ProgressBar
                                                bgcolor={COLORS.primary}
                                                level={getLanguageLvl(item.level)}
                                            />
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => `languages_${index}`}
                                />}
                            </View>

                            {/** Contacting the Candidate */}
                            <View />
                            <View style={styles.compatibilityBtnContainer}>
                                <Text style={styles.compatibilityBtnTitle}>
                                    {stateValue?.score
                                        ? `Compatibilité avec votre profil: ${stateValue.score}%`
                                        : ''}
                                </Text>
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
                            </View>
                            <View style={styles.ofsset120} />
                        </View>
                    </View>
                    {isLoading ? <Loader /> : <View />}
                </ScrollView>
            </View>
            {visible ? <CustomModal title={'Présentation vidéo'} visible={visible} setVisible={setVisible} content={<DisplayVideo candidatId={candidatID} viewOnly={user?.role === ROLEACCOUNT.candidate ? false : true} />} /> : null}
        </>
    );
};

export default CandidatDetail;

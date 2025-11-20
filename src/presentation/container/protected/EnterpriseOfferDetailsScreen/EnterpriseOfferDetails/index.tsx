import React, { useState, useEffect } from 'react';
import {
    View,
    RefreshControl,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    ScrollView
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styles } from './style';
import Popup from './Popup';
import { useCV } from '../../../../../service/redux/ducks/cv';
import { OfferService } from '../../../../../service/applicatif/Offer.sa';
import { useUser } from '../../../../../service/redux/ducks/user';
import { UploadFileService } from '../../../../../service/applicatif/UploadFile.sa';
import { thousandSeparator } from '../../../../../data/factory';
import Loader from '../../../../components/Loader';
import globalStyle from '../../../../globalStyle/globalStyle';
import { Frame } from '../../../../components/EnterpriseInfoFrame';
import ViewDetails from '../../../../components/ViewDetails/viewDetails';
import VideoPlayer from '../../../../components/VideoPlayer';
import { COLORS, SIZES, icons, images } from '../../../../../resources/constants';
import FlatOffer from './FlatOffer';
import ViewDetailsCandidat from '../../../../components/ViewDetailsCandidat';
import { useMobile } from '../../../../../service/hooks/useMobile';
import { useLang } from '../../../../../data/translation';
import * as stringsEn from '../../../../../data/constants/strings_en';
import * as stringsFr from '../../../../../data/constants/strings';
import { useOfferr } from '../../../../../service/redux/ducks/offer';
import { useAuth } from '../../../../../service/redux/ducks/auth';


const EnterpriseOfferDetails = (props: any) => {
    const { lang } = useLang()
    const activeString = lang === 'fr' ? stringsFr : stringsEn;
    const { stateValue } = props;
    const { idCompany, ItemDetail, compatibility, offerId } = stateValue || {};
    const formation = stateValue?.formation;
    const id =
        idCompany || offerId || stateValue?.id || formation?.proprietaire?.id;
    const typeId = stateValue?.typeId;
    const candidat = stateValue?.candidat || false;
    const { isFormation } = stateValue || false;
    const { isMobile } = useMobile()
    const [offerDetail, setOfferDetail] = useState<any>([]);
    const [offerList, setOfferList] = useState([]);
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [infoUser, setInfoUser] = useState<any>(null);
    const [companyId, setCompanyID] = useState(formation ? id : 0);
    const [tableau, setTableau] =  useState<any>([]);
    const [avatar, setAvatar] = useState<string>('');
    const { offerJobById, allOfferJobByType } = OfferService();
    const { getUserById } = useUser();
    const { allJobByType } = useSelector(({ offer }: any) => offer);
    const { accessToken } = useSelector(({ auth }: any) => auth);
    const [filePath, setFilePath] = useState('');
    const navigate = useNavigate();
    const { incrementOfferJobView } = useOfferr();
    useAuth();
    const { downloadImageById } = UploadFileService();

    const getAvatar = async id => {
        try {
            const avatarDownloaded: any = await downloadImageById(id, accessToken);
            if (avatarDownloaded) {
                setAvatar(URL.createObjectURL(avatarDownloaded));
            }

        } catch (error) { }
    };

    useEffect(() => {
        getOfferJobById();
        getUser(id);
    }, []);


    useEffect(() => {
        if (!typeId && allJobByType?.data) {
            const { items } = allJobByType?.data;
            const lastOffer = items.slice(0, 3);
            setOfferList(lastOffer);
        } else {
            getAllOfferJob();
        }
    }, []);

    const getAllOfferJob = async () => {
        try {
            setIsLoading(true);
            const res = await allOfferJobByType(accessToken, typeId);
            const { items } = res.data;
            const lastOffer = items.slice(0, 3);
            setOfferList(lastOffer);
            setIsLoading(false);
        } catch {
            setIsLoading(false);
        }
    };

    const getOfferJobById = async () => {
        try {
            const response = await offerJobById(id, '');
            const { data } = response;
            setOfferDetail(data);
            if (!data?.users?.length) {
                setTitle("Aucun candidat n'a postulé à cette offre");
            } else if (data?.users?.length === 1) {
                setTitle('Un candidat a postulé à cette offre');
            } else {
                setTitle(
                    `${data?.users?.length} candidats ont postulé sur cette offre`,
                );
            }
            setTableau(data.users);
            setCompanyID(data?.proprietaire?.id);
            getUser(data?.proprietaire?.id);
            setIsLoading(false);
        } catch (error) {
            setOfferDetail([]);
            setIsLoading(false);
        }
    };

    const getUser = async idCompany => {
        try {
            setIsLoading(true);
            const res = await getUserById(idCompany, '');
            if (!res.isError) {
                setInfoUser(res.data);
                getAvatar(idCompany);
            } else {
                setInfoUser([]);
            }
        } catch {
            setInfoUser([]);
        } finally {
            setIsLoading(false);
        }
    };

    const showDetails = id => {
        navigate('/EnterpriseOfferDetailsScreen', { id, candidat: true });
    };

    const loadVideo = async (base64: string) => {
        setFilePath(`data:video/mp4;base64,${base64}`);
    };

    useEffect(() => {
        if (offerDetail?.video) {
            loadVideo(offerDetail.video);
        }
    }, [offerDetail]);

    const handleCondition = () => {
        let value: any = '';
        if (formation) {
            value = formation?.email;
        } if (offerDetail.salaire) {
            value = thousandSeparator(offerDetail.salaire, '.');
        }
        else if (offerDetail.salaire == 0) {
            value = 0;
        }
        return value;
    };

    const handleGoBack = () => {
        navigate(-1);
    };
    const incrementOfferView = async () => {
        try {
            await incrementOfferJobView(id, accessToken);
        } catch (error) {
            console.error("Erreur lors de l'incrémentation des vues", error);
        }
    };

    useEffect(() => {
        if (id && accessToken) {
            incrementOfferView();
        }
    }, [id, accessToken]);


    const redirectionPlus = () => {
        navigate('/EntResultScreen', {
            state: {
                companyId,
            }
        })
    };
    return (
        <View>
            {/* <Header {...props} typeApp={candidat ? 'Candidat ?' : 'Enterprise ?'} /> */}
            {isLoading && (<Loader />)}
            <View style={styles.container}>
                <View style={styles.containers}>
                    {/* <View style={styles.containeroffer} > */}
                    <View style={[{ backgroundColor: COLORS.white }, styles.containeroffer, isMobile ? { padding: 24 } : {
                        padding: 36,
                    }]}>
                        {!isMobile &&
                            <View style={{ height: 75 }} >
                                <TouchableOpacity onPress={handleGoBack}>
                                    <Image source={icons.arrowPrevious} style={{ objectFit: 'contain', height: 16, width: 16, tintColor: COLORS.black }} />
                                </TouchableOpacity>
                            </View>
                        }

                        <View style={isMobile ? { flex: 1 } : styles.contentOffer}>
                            <View>
                                {candidat ? (
                                    <View style={isMobile ? styles.headerOfferMobile : styles.headerOffer}>
                                        <View style={styles.avatarOffer}>
                                            <img src={avatar ? avatar : images.avatar_6} style={styles.avatarImg} />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.titleOffer}>
                                                {formation ? formation?.title : offerDetail?.name}
                                            </Text>
                                            <View style={styles.subTitleOffer}>
                                                <Text style={styles.textSubOffer}>
                                                    {
                                                        infoUser?.name && infoUser?.name !== 'invalide'
                                                            ? infoUser?.name
                                                            : ''
                                                    }
                                                </Text>
                                                <Text style={styles.textSubOffer}>
                                                    • {
                                                        formation
                                                            ? formation?.place || ''
                                                            : offerDetail?.lieu || ''
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                ) : (
                                    <View>
                                        <CustomButton
                                            onPress={() =>
                                                navigate(
                                                    'EnterpriseOffreSheetApplyScreen',
                                                    { state: { id: offerDetail?.id } },
                                                )
                                            }
                                            title={title}
                                            _style={[
                                                globalStyle.elevationOrange,
                                                globalStyle.buttonActionsOrange,
                                            ]}
                                            color="red"
                                            icon={icons.action}
                                            styleBtnTxt={styles.bigBtnTxt}
                                        />
                                    </View>
                                )}
                            </View>
                            {/** Offer about */}
                            <View style={isMobile ? { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 32 } : { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', columnGap: 16, rowGap: 10 }}>
                                <ViewDetailsCandidat label={activeString.ENTERPRISE_OFFER.LIEU}
                                    value={
                                        formation
                                            ? formation?.place || ''
                                            : offerDetail?.lieu || ''
                                    } />
                                <ViewDetailsCandidat
                                    label={formation ? activeString.ENTERPRISE_OFFER.THEME : activeString.ENTERPRISE_OFFER.TRAVAIL}
                                    value={
                                        formation
                                            ? formation?.theme || ' '
                                            : offerDetail?.disponibility || ''
                                    }
                                />
                                <ViewDetailsCandidat
                                    label={formation ? activeString.ENTERPRISE_OFFER.PAYANT : activeString.ENTERPRISE_OFFER.CONTRACT}
                                    value={
                                        formation
                                            ? formation?.isPayante
                                                ? 'OUI '
                                                : 'NON'
                                            : offerDetail?.contrat || ''
                                    }
                                />
                                <ViewDetailsCandidat
                                    label={formation ? activeString.ENTERPRISE_OFFER.PRIX : activeString.ENTERPRISE_OFFER.PROFIL}
                                    value={
                                        formation
                                            ? `${thousandSeparator(formation?.prix, '.') || 0
                                            } Ar`
                                            : offerDetail?.profil || ''
                                    }
                                />
                                {formation ? (
                                    <ViewDetailsCandidat
                                        label="Durée"
                                        value={formation?.duration}
                                    />
                                ) : null}
                                <ViewDetailsCandidat
                                    label={formation ? activeString.ENTERPRISE_OFFER.TELEPHONE : activeString.ENTERPRISE_OFFER.EXPERIENCE}
                                    value={
                                        formation
                                            ? formation?.phone
                                            : offerDetail?.experience || ''
                                    }
                                />
                                <ViewDetailsCandidat
                                    label={formation ? activeString.ENTERPRISE_OFFER.EMAIL : activeString.ENTERPRISE_OFFER.SALAIRE_BRUTE}
                                    value={handleCondition()}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={!isMobile ? { backgroundColor: COLORS.white, borderStartEndRadius: 20, borderStartStartRadius: 20, marginTop: 24, paddingHorizontal: 70, paddingVertical: 24 } : { padding: 24, marginTop: 24, backgroundColor: COLORS.white, borderRadius: 10 }}>
                        {/** Candidate Experiences */}
                        <View style={[isMobile ? '' : styles.candidateExpContainer, isFormation && { marginBottom: 34 }]}>

                            <View style={styles.candidateExpContent}>
                                <Text style={styles.candidateExpTitle}>{activeString.ENTERPRISE_OFFER.DESCRIPTION}</Text>
                            </View>

                            <Text style={styles.txtDetails}>
                                {formation
                                    ? formation?.description
                                    : offerDetail?.description || ''}
                            </Text>
                        </View>

                        {/** Candidate Formations */}
                        {!isFormation && (
                            <View style={[styles.candidateExpContainer, { paddingBottom: 26 }]}>
                                <View style={styles.candidateExpContent}>
                                    <Text style={styles.candidateExpTitle}>{activeString.ENTERPRISE_OFFER.YOUR_TASK}</Text>
                                </View>
                                <Text style={styles.txtDetails}>
                                    {offerDetail?.taches || ''}
                                </Text>
                            </View>
                        )}
                    </View>

                    {!isFormation && (
                        <View style={styles.nextContainer}>
                            <View style={{ height: 1, flex: 1, backgroundColor: COLORS.vector_orange }} />
                            <View>
                                <Popup
                                    {...props}
                                    idCompany={companyId}
                                    idJob={id}
                                    infoUser={infoUser}
                                    users={tableau}
                                    offerTitle={offerDetail.name}
                                />
                            </View>
                            <View style={{ height: 1, flex: 1, backgroundColor: COLORS.vector_orange }} />
                        </View>
                    )}

                    {filePath !== '' ? (
                        <View style={styles.candidateExpContainer}>
                            <VideoPlayer filePath={filePath} poster={'https://i.picsum.photos/id/866/1600/900.jpg'} />
                        </View>
                    ) : null}

                    <View style={[{ paddingBottom: 100, backgroundColor: COLORS.white }, isMobile ? { paddingHorizontal: 24 } : { paddingHorizontal: 70, }]}>
                        <Text style={styles.titleh2}>{activeString.ENTERPRISE_OFFER.ABOUT_COMPANY}</Text>
                    </View>

                    {!isLoading && infoUser &&
                        (
                            <View style={[
                                { backgroundColor: 'rgba(207, 231, 255, 0.8)' },
                                isMobile ? { paddingHorizontal: 24 } : { paddingHorizontal: 70 }
                            ]}>
                                <Frame
                                    isHeader={false}
                                    infoUser={infoUser}
                                    avatar={avatar}
                                    setIsLoading={setIsLoading}
                                    isLoading={isLoading}
                                    handleRedirection={redirectionPlus}
                                />
                            </View>
                        )
                    }

                    {!offerList.length || isFormation ? (
                        <View style={{ marginBottom: 0 }} />
                    ) : (
                        <View style={styles.nextContainer}>
                            <View style={styles.titleh2Container}>
                                <Text style={styles.titleh2}>{activeString.ENTERPRISE_OFFER.SIMILAR_OFFERS}</Text>
                            </View>
                            <View
                                style={{
                                    paddingVertical: 0,
                                    borderTopColor: COLORS.gray_line,
                                }}>
                                <FlatOffer
                                    offerList={offerList}
                                    showDetails={showDetails}
                                />
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};


export default EnterpriseOfferDetails;

import React, { useState, useEffect } from 'react';
;
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
                companyId}
        })
    };
    return (
        <div>
            {/* <Header {...props} typeApp={candidat ? 'Candidat ?' : 'Enterprise ?'} /> */}
            {isLoading && (<Loader />)}
            <div style={styles.container}>
                <div style={styles.containers}>
                    {/* <div style={styles.containeroffer} > */}
                    <div style={[{ backgroundColor: COLORS.white }, styles.containeroffer, isMobile ? { padding: 24 } : {
                        padding: 36}]}>
                        {!isMobile &&
                            <div style={{ height: 75 }} >
                                <button onClick={handleGoBack}>
                                    <img src={icons.arrowPrevious} style={{ objectFit: 'contain', height: 16, width: 16, tintColor: COLORS.black }} />
                                </button>
                            </div>
                        }

                        <div style={isMobile ? { flex: 1 } : styles.contentOffer}>
                            <div>
                                {candidat ? (
                                    <div style={isMobile ? styles.headerOfferMobile : styles.headerOffer}>
                                        <div style={styles.avatarOffer}>
                                            <img src={avatar ? avatar : images.avatar_6} style={styles.avatarImg} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <span style={styles.titleOffer}>
                                                {formation ? formation?.title : offerDetail?.name}
                                            </span>
                                            <div style={styles.subTitleOffer}>
                                                <span style={styles.textSubOffer}>
                                                    {
                                                        infoUser?.name && infoUser?.name !== 'invalide'
                                                            ? infoUser?.name
                                                            : ''
                                                    }
                                                </span>
                                                <span style={styles.textSubOffer}>
                                                    • {
                                                        formation
                                                            ? formation?.place || ''
                                                            : offerDetail?.lieu || ''
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                ) : (
                                    <div>
                                        <CustomButton
                                            onClick={() =>
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
                                    </div>
                                )}
                            </div>
                            {/** Offer about */}
                            <div style={isMobile ? { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 32 } : { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', columnGap: 16, rowGap: 10 }}>
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
                            </div>
                        </div>
                    </div>

                    <div style={!isMobile ? { backgroundColor: COLORS.white, borderStartEndRadius: 20, borderStartStartRadius: 20, marginTop: 24, paddingHorizontal: 70, paddingVertical: 24 } : { padding: 24, marginTop: 24, backgroundColor: COLORS.white, borderRadius: 10 }}>
                        {/** Candidate Experiences */}
                        <div style={[isMobile ? '' : styles.candidateExpContainer, isFormation && { marginBottom: 34 }]}>

                            <div style={styles.candidateExpContent}>
                                <span style={styles.candidateExpTitle}>{activeString.ENTERPRISE_OFFER.DESCRIPTION}</span>
                            </div>

                            <span style={styles.txtDetails}>
                                {formation
                                    ? formation?.description
                                    : offerDetail?.description || ''}
                            </span>
                        </div>

                        {/** Candidate Formations */}
                        {!isFormation && (
                            <div style={[styles.candidateExpContainer, { paddingBottom: 26 }]}>
                                <div style={styles.candidateExpContent}>
                                    <span style={styles.candidateExpTitle}>{activeString.ENTERPRISE_OFFER.YOUR_TASK}</span>
                                </div>
                                <span style={styles.txtDetails}>
                                    {offerDetail?.taches || ''}
                                </span>
                            </div>
                        )}
                    </div>

                    {!isFormation && (
                        <div style={styles.nextContainer}>
                            <div style={{ height: 1, flex: 1, backgroundColor: COLORS.vector_orange }} />
                            <div>
                                <Popup
                                    {...props}
                                    idCompany={companyId}
                                    idJob={id}
                                    infoUser={infoUser}
                                    users={tableau}
                                    offerTitle={offerDetail.name}
                                />
                            </div>
                            <div style={{ height: 1, flex: 1, backgroundColor: COLORS.vector_orange }} />
                        </div>
                    )}

                    {filePath !== '' ? (
                        <div style={styles.candidateExpContainer}>
                            <VideoPlayer filePath={filePath} poster={'https://i.picsum.photos/id/866/1600/900.jpg'} />
                        </div>
                    ) : null}

                    <div style={[{ paddingBottom: 100, backgroundColor: COLORS.white }, isMobile ? { paddingHorizontal: 24 } : { paddingHorizontal: 70}]}>
                        <span style={styles.titleh2}>{activeString.ENTERPRISE_OFFER.ABOUT_COMPANY}</span>
                    </div>

                    {!isLoading && infoUser &&
                        (
                            <div style={[
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
                            </div>
                        )
                    }

                    {!offerList.length || isFormation ? (
                        <div style={{ marginBottom: 0 }} />
                    ) : (
                        <div style={styles.nextContainer}>
                            <div style={styles.titleh2Container}>
                                <span style={styles.titleh2}>{activeString.ENTERPRISE_OFFER.SIMILAR_OFFERS}</span>
                            </div>
                            <div
                                style={{
                                    paddingVertical: 0,
                                    borderTopColor: COLORS.gray_line}}>
                                <FlatOffer
                                    offerList={offerList}
                                    showDetails={showDetails}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default EnterpriseOfferDetails;

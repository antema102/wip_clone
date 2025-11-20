import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { useNavigate } from 'react-router-dom';

import { useUser } from '../../../../../service/redux/ducks/user';
import { useSelector } from 'react-redux';
import { UploadFileService } from '../../../../../service/applicatif/UploadFile.sa';
import { useOfferr } from '../../../../../service/redux/ducks/offer';
import { useFormation } from '../../../../../service/redux/ducks/formation';
import { OfferService } from '../../../../../service/applicatif/Offer.sa';
import { ENTERPRISE_INFORMATIONS, STATUS, ERROR } from '../../../../../data/constants/strings';
import { storeSoldeWip } from '../../../../../service/redux/ducks/payment';
import Loader from '../../../../components/Loader';
import globalStyle from '../../../../globalStyle/globalStyle';
import { styles } from './styles';
import { COLORS, SIZES, icons } from '../../../../../resources/constants';
import CustomButton from '../../../../components/Button/button';
import CustomButtons from '../../../../components/Button/button';
import { WhiteButtons } from '../../../../components/Inputs/WhiteButtons';
import VideoPlayer from '../../../../components/VideoPlayer';
import Popup from '../../../../components/CreateCV/Popup';
import MiniLoader from '../../../../components/MiniLoader';
import { InputField } from '../../../../components/Inputs/InputField';
import CustomModal from '../../../../components/Modal';
import { PaymentWays } from '../../../../components/PaymentWays';
import ViewDetailsCandidat from '../../../../components/ViewDetailsCandidat';
import { useMobile } from '../../../../../service/hooks/useMobile';
import { images } from '../../../../../resources/constants';
import { thousandSeparator } from '../../../../../data/factory';
import { useLang } from '../../../../../data/translation';
import * as stringsEn from '../../../../../data/constants/strings_en';
import * as stringsFr from '../../../../../data/constants/strings';

const EnterpriseOfferSheet = (props: any) => {
    const id = props?.stateValue?.id;
    const candidat = props.candidat || false;
    const { isFromCandidat } = props;
    const { isFormation } = props?.stateValue || false;
    const { formation } = props?.stateValue || null;
    const [offerDetail, setOfferDetail] = useState<any>(null);
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { getUserById } = useUser();
    const { accessToken } = useSelector(({ auth }: any) => auth);
    const [isLoadingDel, setIsLoadingDel] = useState(false);
    const [isBoosted, setIsBoosted] = useState(false);
    const [message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [boostVisible, setBoostVisible] = useState(false);
    const [okBoost, setOkBoost] = useState(false);
    const [boostStatus, setBoostStatus] = useState(false);
    const [modalVisibleDel, setModalVisibleDel] = useState(false);
    const [infoUser, setInfoUser] = useState<any>(null);
    const { downloadImage } = UploadFileService();
    const { offerJobById, deleteOfferJob, getOfferJobView } = useOfferr();
    const [avatar, setAvatar] = useState<string>('');
    const { deleteFormationByID } = useFormation();
    const [filePath, setFilePath] = useState('');
    const [messageVisible, setMessageVisible] = useState(false);
    const { boostOffer, updateOfferJob } = OfferService();
    const navigate = useNavigate();
    const [descriptionError, setDescriptionError] = useState(false);
    const [tachesError, setTachesError] = useState(false);
    const [description, setDescription] = useState(
        offerDetail?.description ? offerDetail?.description : '',
    );
    const [taches, setTaches] = useState(
        offerDetail?.taches ? offerDetail?.taches : '',
    );
    const [showPayment, setShowPayment] = useState(false);
    const [viewsCount, setViewsCount] = useState<number>(0);
    const { isMobile } = useMobile();

    const userId = formation?.proprietaire?.id;
    const { lang } = useLang()
    const activeString = lang === 'fr' ? stringsFr : stringsEn;

    useEffect(() => {
        setIsLoading(true);
        if (isFormation) {
            setOfferDetail(formation);
            getUser();
            setIsLoading(false);
        }
    }, [formation]);

    //------------------------------
    /*useEffect(() => {
       const fetchViewsCount = async () => {
           try {
               const response = await fetch(`/api/offer/views/${id}`);;
               if (!response.ok) {
                   throw new Error('Failed to fetch views count');
               }
               const data = await response.json();
               setViewsCount(data.views);
           } catch (error) {
               console.error('Failed to fetch views count:', error);
           }
       };
   
       if (id) {
           fetchViewsCount();
       }
   }, [id]);*/
    //-----------------------------------

    const redirection = async () => {
        setBoostVisible(false);
        setShowPayment(true);
    };

    const getUser = async () => {
        const user = await getUserById(userId, accessToken);
        setInfoUser(user);
    };

    const getAvatar = async () => {
        try {
            const responseGetAvatar: any = await downloadImage(accessToken);
            if (responseGetAvatar) {
                setAvatar(URL.createObjectURL(responseGetAvatar));
            }
        } catch (error) { }
    };

    useEffect(() => {
        getAvatar()
    }, []);


    useEffect(() => {
        if (!isFormation) {
            setIsLoading(true);
            setOfferDetail([]);
            getOfferJobById();
            getOfferView();
        }
    }, [id]);

    const loadVideo = async (base64: string) => {
        setFilePath(`data:video/mp4;base64,${base64}`);
    };

    const getOfferJobById = async () => {
        try {
            const response = await offerJobById(id, '');
            const { data } = response;
            setOfferDetail(data);
            setDescription(data?.description);
            setTaches(data?.taches);
            setBoostStatus(data?.boost);
            if (!data?.users?.length) {
                setTitle("0 candidat n'a postulé à cette offre");
            } else if (data?.users?.length === 1) {
                setTitle('1 candidat a postulé à cette offre');
            } else {
                setTitle(
                    `${data?.users?.length} candidats ont postulé sur cette offre`,
                );
            }
            setIsLoading(false);
        } catch (error) {
            setOfferDetail([]);
            setIsLoading(false);
        }
    };

    const getOfferView = async () => {
        try {
            const response = await getOfferJobView(id, accessToken);
            const { data } = response;
            setViewsCount(data?.views || 0);
        } catch (error) {
            setViewsCount(0);
        }
    };

    const handleDelete = () => {
        setModalVisible(true);
        setMessage(
            `Voulez-vous vraiment supprimer ${isFormation ? 'cette formation' : 'cette offre'
            }`,
        );
    };
    const handlePopupDel = () => {
        setModalVisibleDel(false);
    };

    const handleCancel = () => {
        setModalVisibleDel(false);
        setModalVisible(false);
    };

    const handleBoost = async () => {
        setIsBoosted(true);
        try {
            const response = await boostOffer(accessToken, offerDetail?.id);
            if (response && response.data.isError) {
                setMessage(response?.data?.message);
                setMessageVisible(false);
                setBoostVisible(true);
            } else {
                setMessage(STATUS.BOOST_SUCCESS);
                storeSoldeWip(response?.data?.soldeWip);
                setBoostStatus(true);
                setMessageVisible(false);
                setOkBoost(true);
            }
            setIsBoosted(false);
        } catch (error) {
            setIsBoosted(false);
        }
    };

    const handlePopup = async () => {
        setIsLoadingDel(true);
        setModalVisible(false);
        try {
            const response = isFormation
                ? await deleteFormationByID(formation.id, accessToken)
                : await deleteOfferJob('', offerDetail.id);

            if (!response?.isError) {
                setMessage(
                    response?.message || isFormation
                        ? 'Formation supprimée '
                        : STATUS.OFFER_DELETE_SUCCES,
                );
            } else {
                setMessage(
                    response?.message || isFormation
                        ? 'Erreur suppression formation'
                        : STATUS.OFFER_DELETE_FAIL,
                );
            }

            setModalVisibleDel(true);
            setIsLoadingDel(false);
            if (!response.isError) {
                if (isFormation) {
                    navigate('/home', {
                        state: {
                            isFormation: true}
                    });
                } else {
                    navigate('/home', {
                        state: {
                            isFormation: false}
                    });
                }
            }
        } catch (error) {
            setMessage(STATUS.OFFER_DELETE_FAIL);
            setModalVisibleDel(true);
            setIsLoadingDel(false);
        }
    };

    const checkEmptyDescription = () => !description.trim();
    const checkEmptyTache = () => !taches.trim();

    const handleChange = (
        name: string,
        value: any,
        fired: boolean,
        label: string,
    ) => {
        switch (name) {
            case 'description':
                setDescriptionError(!value.length);
                setDescription(value);
                break;
            case 'taches':
                setTachesError(!value.length);
                setTaches(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async () => {
        if (checkEmptyDescription()) {
            setDescriptionError(true);
        }
        if (checkEmptyTache()) {
            setTachesError(true);
        }
        if (!descriptionError && !tachesError) {
            const data = {
                data: {
                    description: description,
                    taches: taches,
                    id: offerDetail?.id}};
            setIsLoadingDel(true);
            const response = await updateOfferJob('', offerDetail?.id, data);
            if (response && response.data.isError) {
                setMessage(response.data.message);
                setOkBoost(true);
            } else {
                setMessage(ENTERPRISE_INFORMATIONS.MODIFICATION_SUCCEED);
                setOkBoost(true);
            }
            setIsLoadingDel(false);
        }
    };

    useEffect(() => {
        if (offerDetail?.isVideo) {
            loadVideo(offerDetail.video);
        }
    }, [offerDetail]);

    const handleBack = () => {
        navigate(-1)
    }
    return (
        <div style={isMobile ? styles.container : ''}>
            <CustomModal title={"Moyen de paiement"} visible={showPayment} setVisible={setShowPayment} content={<PaymentWays />} />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div style={[styles.containers]}>
                        <div style={{ width: "100%" }}>
                            <div style={styles.vtitle}>
                                <div style={{ paddingHorizontal: 26 }}>

                                    <button style={[styles.buttonBack, { marginTop: 24 }]} onClick={handleBack}>
                                        <img src={icons.arrowPrevious} height={16} width={16} style={{ objectFit: 'contain' }} />
                                        <span>Retour</span>
                                    </button>

                                    <div style={{ gap: 16 }}>

                                        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                                            <div>
                                                <img height={100} width={100} src={avatar ? avatar : images.avatar_1} style={{ objectFit: 'cover' }} />
                                            </div>
                                            <div style={{ gap: 4 }}>
                                                <span style={{ fontSize: 20, fontWeight: '600' }}>{isFormation ? offerDetail.title : offerDetail.name}</span>
                                                <div style={{ flexDirection: 'row', gap: 4 }}>
                                                    <span style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: 12 }}>• {offerDetail?.place || offerDetail?.lieu || ''}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', columnGap: 16, rowGap: 10, marginVertical: 24 }}>
                                            <ViewDetailsCandidat
                                                label={activeString.ENTERPRISE_OFFER.LIEU}
                                                value={offerDetail?.place || offerDetail?.lieu || ''}
                                            />
                                            <ViewDetailsCandidat
                                                label={isFormation ? activeString.ENTERPRISE_OFFER.THEME : activeString.ENTERPRISE_OFFER.TRAVAIL}
                                                value={
                                                    isFormation
                                                        ? offerDetail.title
                                                        : offerDetail?.disponibility || ''
                                                }
                                            />
                                            <ViewDetailsCandidat
                                                label={isFormation ? activeString.ENTERPRISE_OFFER.PAYANT : activeString.ENTERPRISE_OFFER.CONTRACT}
                                                value={
                                                    isFormation
                                                        ? offerDetail.isPayant
                                                            ? 'oui'
                                                            : 'non'
                                                        : offerDetail?.contrat || ''
                                                }
                                            />
                                            <ViewDetailsCandidat
                                                label={isFormation ? activeString.ENTERPRISE_OFFER.PRIX : activeString.ENTERPRISE_OFFER.PROFIL}
                                                value={
                                                    isFormation
                                                        ? offerDetail?.prix || ''
                                                        : offerDetail?.profil || ''
                                                }
                                            />
                                            {
                                                isFormation ? (
                                                    <ViewDetailsCandidat
                                                        label={activeString.ENTERPRISE_OFFER.DUREE}
                                                        value={offerDetail?.duration}
                                                    />) : null
                                            }
                                            <ViewDetailsCandidat
                                                label={isFormation ? activeString.ENTERPRISE_OFFER.TELEPHONE : activeString.ENTERPRISE_OFFER.EXPERIENCE}
                                                value={
                                                    isFormation
                                                        ? offerDetail?.phone
                                                        : offerDetail?.experience
                                                }
                                            />
                                            <ViewDetailsCandidat
                                                label={isFormation ? activeString.ENTERPRISE_OFFER.EMAIL : `${activeString.ENTERPRISE_OFFER.SALAIRE_BRUTE} (Ariary)`}
                                                value={
                                                    isFormation
                                                        ? offerDetail?.email
                                                        : `${thousandSeparator(offerDetail?.salaire, '.')}`
                                                }
                                            />
                                            <ViewDetailsCandidat
                                                label={activeString.ENTERPRISE_OFFER.PUBLICATION_DATE}
                                                value={format(offerDetail?.createdAt, 'dd MMMM yyyy', { locale: fr })}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ marginVertical: 16 }}>
                                        <div style={[{ alignSelf: 'flex-start' }, !isMobile && { borderRightWidth: 1, borderRightColor: '#D9D9D9', paddingRight: 16 }]}>
                                            <div style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                                                <div><img src={icons.statistique} height={14} width={14} /> </div>
                                                <span>{activeString.ENTERPRISE_OFFER.STATISTICS}</span>
                                            </div>

                                            <div style={{ paddingTop: 14, gap: 16 }}>
                                                <span style={{ fontWeight: 700, fontSize: 20 }}>{viewsCount} {activeString.ENTERPRISE_OFFER.VIEW} </span>
                                                <span>{activeString.ENTERPRISE_OFFER.NUMBER_OF_CANDIDATES_VIEWED_YOUR_OFFER} {isFormation ? "formation " : "offre "}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {!isFormation ? (
                                        <div style={{ top: 20, marginBottom: 24 }}>
                                            <CustomButton
                                                onClick={() =>
                                                    navigate(
                                                        '/EnterpriseOfferSheetApplyScreen',
                                                        { state: { id: offerDetail.id, images: avatar } },
                                                    )
                                                }
                                                title={title}
                                                _style={[
                                                    styles.buttonActionsOrange,
                                                    { flex: 1, padding: 15 }
                                                ]}
                                                color={'red'}
                                                icon={icons.action}
                                                styleBtnTxt={styles.bigBtnTxt}
                                            />
                                        </div>
                                    ) : null}
                                </div>

                                {!isFormation ? <div style={[{ marginBottom: 20 }, styles.inputWrap]}>
                                    <InputField
                                        label={'Description'}
                                        value={description}
                                        name="description"
                                        onChange={handleChange}
                                        type="textArea"
                                        required
                                        maxLength={150}
                                    />
                                </div>
                                    : <div style={styles.candidateExpContainer}>
                                        <span style={styles.candidateExpTitle}>Description</span>
                                        <span style={styles.txtDetails}>
                                            {' '}
                                            {offerDetail?.description}
                                        </span>
                                    </div>}

                                {descriptionError && (
                                    <span style={{ color: COLORS.red_color, marginLeft: 25 }}>{ERROR.EMPTY_FIELD}</span>
                                )}

                                {!isFormation ? <div style={[{ marginBottom: 20 }, styles.inputWrap]}>
                                    <InputField
                                        label={activeString.ENTERPRISE_OFFER.YOUR_TASK}
                                        value={taches}
                                        name="taches"
                                        onChange={handleChange}
                                        required
                                        type="textArea"
                                        maxLength={150}
                                    />
                                </div> : null}
                                {tachesError && (
                                    <span style={{ color: COLORS.red_color, marginLeft: 25 }}>{activeString.ERROR.EMPTY_FIELD}</span>
                                )}

                                {filePath &&
                                    <div style={styles.candidateExpContainer}>
                                        <VideoPlayer filePath={filePath} />
                                    </div>
                                }
                            </div>

                            {!isFormation && (
                                <div style={{ paddingVertical: 20, marginHorizontal: 25 }}>
                                    <CustomButtons
                                        onClick={() => setMessageVisible(true)}
                                        title={
                                            boostStatus ? activeString.ENTERPRISE_OFFER.BOOSTED_OFFER : activeString.ENTERPRISE_OFFER.BOOST_THIS_OFFER
                                        }
                                        _style={{...globalStyle.buttonBoost, ...(boostStatus
                                                ? { backgroundColor: COLORS.blueInput }
                                                : { backgroundColor: 'green' })}}
                                        color={'red'}
                                        icon={icons.boost}
                                        styleBtnTxt={globalStyle.bigBtnTxt}
                                        isDisable={boostStatus}
                                    />
                                </div>
                            )}

                            {!isFormation && (
                                <div style={{ paddingVertical: 20, marginHorizontal: 25 }}>
                                    <CustomButtons
                                        onClick={handleSubmit}
                                        title={activeString.ENTERPRISE_OFFER.MODIFY}
                                        _style={[
                                            globalStyle.buttonBoost,
                                            { backgroundColor: 'green' },
                                        ]}
                                        color={'red'}
                                        styleBtnTxt={globalStyle.bigBtnTxt}
                                    />
                                </div>
                            )}

                            {!isFromCandidat && (
                                <div
                                    style={[
                                        globalStyle.btnContainerWhite,
                                        { paddingHorizontal: SIZES.padding },
                                    ]}>
                                    <WhiteButtons
                                        submitAction={handleDelete}
                                        submitTitle={
                                            isFormation
                                                ? activeString.ENTERPRISE_OFFER.DELETE_MY_TRAINING
                                                : activeString.ENTERPRISE_OFFER.DELETE_MY_OFFER
                                        }
                                        color={{ color: 'white', backgroundColor: 'red' }}
                                    />
                                </div>
                            )}

                            <Popup
                                message={message}
                                visible={boostVisible}
                                validation={setBoostVisible}
                                btnTitle={'OK'}
                                action={okBoost ? null : redirection}
                            />

                            <Popup
                                message={message}
                                visible={okBoost}
                                validation={setOkBoost}
                                btnTitle={'OK'}
                            />

                            <Popup
                                message={message}
                                visible={modalVisible || modalVisibleDel}
                                validation={modalVisibleDel ? handlePopupDel : handlePopup}
                                btnTitle={'OK'}
                                isFormation={true}
                                handleCancelFormation={handleCancel}
                                cancel={!modalVisibleDel}
                            />

                            {isBoosted ? <MiniLoader CustomStyle={{ position: 'fixed' }} /> : (
                                <Popup
                                    message={activeString.ENTERPRISE_INFORMATIONS.PAYMENT_BOOST}
                                    visible={messageVisible}
                                    validation={setMessageVisible}
                                    btnTitle="OK"
                                    cancel
                                    action={handleBoost}
                                />
                            )}
                        </div>
                        {isLoadingDel && <Loader />}
                    </div>
                    {props.candidate ? (
                        <div style={globalStyle.floatWrapperBtn}>
                            <button
                                onClick={() =>
                                    navigate('/EntrepriseOfferCreateScreen', {
                                        state: {
                                            detailOffer: offerDetail}
                                    })
                                }
                                style={[
                                    globalStyle.btnCircular,
                                    globalStyle.shadowButtonCircular,
                                ]}>
                                <img
                                    src={icons.edit}
                                    style={{ justifyContent: 'center', width: 18, height: 18 }}
                                />
                            </button>
                        </div>
                    ) : (
                        <div />
                    )}
                </>
            )}
        </div>
    );
};

export default EnterpriseOfferSheet;

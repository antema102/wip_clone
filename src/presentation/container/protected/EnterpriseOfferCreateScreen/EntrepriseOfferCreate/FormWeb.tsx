import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

import { TitleLabels } from './titleLabels';
import { TitleLabels_en } from './titleLabels_en';
import { availability, contratData, profilData } from './data';
import { OfferService } from '../../../../../service/applicatif/Offer.sa';
import { getDynamicListByKey } from '../../../../../service/technique/dynamicService';
import { ENTERPRISE_INFORMATIONS, ERROR, STATUS } from '../../../../../data/constants/strings';
import { storeSoldeWip } from '../../../../../service/redux/ducks/payment';
import { COLORS, SIZES, icons } from '../../../../../resources/constants';
import { InputField } from '../../../../components/Inputs/InputField';
import { InputSelect } from '../../../../components/Inputs/InputSelect';
import { formsStyles } from '../../../../globalStyle/formStyles';
import CustomButtons from '../../../../components/Button/button';
import { styles } from './styles';
import globalStyle from '../../../../globalStyle/globalStyle';
import VideoPlayer from '../../../../components/VideoPlayer';
import { SubmitButtons } from '../../../../components/Inputs/SubmitButtons';
import Popup from '../../../../components/CreateCV/Popup';
import Loader from '../../../../components/Loader';
import { useNavigate } from 'react-router-dom';
import FileUploader from '../../../../components/FileUploader';
import CustomModal from '../../../../components/Modal';
import { PaymentWays } from '../../../../components/PaymentWays';
import { useLang } from '../../../../../data/translation';
import * as stringFr from '../../../../../data/constants/strings';
import * as stringEn from '../../../../../data/constants/strings_en';

export const Form = (props: any) => {
    const { data, navigation } = props;
    const { createOfferJob, updateOfferJob } = OfferService();
    const [isUpdate, setIsUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [ref, setRef] = useState('');
    const [description, setDescription] = useState('');
    const [taches, setTaches] = useState('');
    const [disponibility, setDisponibility] = useState(availability);
    const [lieu, setPlace] = useState('');
    const [contrat, setContrat] = useState(contratData);
    const [profil, setProfil] = useState(profilData);
    const [experience, setExperience] = useState('');
    const [salaire, setPrestation] = useState('');
    const [isVideo, setIsVideo] = useState(false);
    const [filePath, setFilePath] = useState('');
    const [boost, setBoost] = useState(false);
    const [messageVisible, setMessageVisible] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    const {lang} = useLang();
    const activeString = lang === 'fr' ? stringFr : stringEn;
    const activeStr = lang === 'fr' ? TitleLabels : TitleLabels_en;

    const [activityList, setActivityList] = useState<any>();
    const [availabilityList, setAvailabilityList] = useState<any>();
    const [statusList, setStatusList] = useState<any>();
    const [profilList, setProfilList] = useState<any>();
    const [experienceList, setExperienceList] = useState<any>();
    const [resultVisible, setResultVisible] = useState(false);

    const [nameError, setNameError] = useState(false);
    const [refError, setRefError] = useState(false);

    const [descriptionError, setDescriptionError] = useState(false);
    const [tachesError, setTachesError] = useState(false);
    const [disponibilityError, setDisponibilityError] = useState(false);
    const [placeError, setPlaceError] = useState(false);
    const [experienceError, setExperienceError] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [contratError, setContratError] = useState(false);
    const [typeDataError, setTypeDataError] = useState(false);
    const [salaryError, setSalaryError] = useState(false);

    const [nameTxtError, setNameTxtError] = useState('');
    const [videoTxtError, setVideoTxtError] = useState('');
    const [refTxtError, setRefTxtError] = useState('');
    const [descriptionTxtError, setDescriptionTxtError] = useState('');
    const [tachesTxtError, setTachesTxtError] = useState('');
    const [placeErrorTxtError, setPlaceTxtError] = useState('');
    const [experienceTxtError, setExperienceTxtError] = useState('');
    const [disponibilityTxtError, setDisponibilityTxtError] = useState('');
    const [contratTxtError, setContratTxtError] = useState('');
    const [typeDataTxtError, setTypeDataTxtError] = useState('');
    const [salaryTxtError, setSalaryTxtError] = useState('');
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('');

    const [salary, setSalary] = useState(0);
    const [values, setValues] = useState({
        name: '',
        description: '',
        taches: '',
        disponibility: disponibility[0]?.value,
        lieu: '',
        contrat: contrat[0]?.value,
        profil: profil[0]?.value,
        experience: '',
        salaire: '',
        type: '',
        ref: '',
        isVideo: false,
        video: '',
        boost: false,
        price: 50000,
    });

    const redirection = async () => {
        setResultVisible(false);
        setShowPayment(true);
      };

    const handleCancel = () => {
        setValues({
            name: '',
            description: '',
            taches: '',
            disponibility: disponibility[0]?.value,
            lieu: '',
            contrat: contrat[0]?.value,
            profil: profil[0]?.value,
            experience: '',
            salaire: '',
            type: '',
            ref: '',
            isVideo: false,
            video: '',
            boost: false,
            price: 50000,
        });
          navigation('/home', {state:{isFormation: false}});
    };


    const getDynamicList = async () => {
        setIsLoading(true);
        try {
            const data = await localStorage.getItem('dynamic');
            const dataJSON = JSON.parse(data);
            const activity = getDynamicListByKey('activities', dataJSON);
            const availability = getDynamicListByKey('availabilities', dataJSON);
            const status = getDynamicListByKey('status', dataJSON);
            const profil = getDynamicListByKey('profils', dataJSON);
            const experience = getDynamicListByKey('experiences', dataJSON);
            setAvailabilityList(availability);
            setStatusList(status);
            setActivityList(activity);
            setProfilList(profil);
            setExperienceList(experience);
        } catch (error) {
            // handle error
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getDynamicList();
        if (typeof data !== 'undefined') {
            setIsUpdate(true);
            setValues({
                name: data.name,
                description: data.description,
                taches: data.taches,
                disponibility: data.disponibility,
                lieu: data?.lieu || '',
                contrat: data.contrat,
                profil: data.profil,
                experience: data.experience,
                salaire: data?.salaire || '',
                type: data?.type,
                ref: data?.ref || '',
                isVideo: data?.isVideo,
                video: data?.video,
                boost: data?.boost,
                price: 50000,
            });
            setName(data.name);
            setDescription(data.description);
            setTaches(data.taches);
            setDisponibility(data.disponibility);
            setContrat(data.contrat);
            setPlace(data.lieu);
            setProfil(data.profil);
            setExperience(data.experience);
            setPrestation(data.salaire);
            setRef(data.ref);
        }
    }, []);

    const handleChange = (
        name: string,
        value: any,
        fired: boolean,
        label: string,
    ) => {
        setValues({ ...values, [name]: value });

        switch (name) {
            case 'name':
                setNameError(!value.length);
                setName(value);
                break;
            case 'ref':
                setRefError(!value.length);
                setRef(value);
                break;
            case 'description':
                setDescriptionError(!value.length);
                setDescription(value);
                break;
            case 'lieu':
                setPlaceError(!value.length);
                setPlace(value);
                break;
            case 'taches':
                setTachesError(!value.length);
                setTaches(value);
                break;
            case 'experience':
                setExperienceError(!value.length);
                setExperience(value);
                break;
            case 'salaire':
                setSalaryError(!value > 0);
                setPrestation(value);
                break;
            case 'type':
                values.type = value;
                break;
            case 'disponibility':
                setDisponibilityError(value.trim() === '');
                break;

            default:
                break;
        }
    };

    const checkEmptyName = () => !name.trim();
    const checkEmptyRef = () => !ref.trim();
    const checkEmptyDescription = () => !description.trim();
    const checkEmptyTache = () => !taches.trim();
    const checkEmptyExperience = () => !experience.trim();
    const checkEmptyPlace = () => !lieu.trim();
    const checkEmptyDisponibilty = () =>
        !values?.disponibility?.trim() || values?.disponibility === undefined;
    const checkEmptyContrat = () =>
        !values?.contrat?.trim() || values?.contrat === undefined;
    const checkEmptyTypeData = () => !values?.type === undefined;
    const checkSalary = () => !(salary > 0);

    const showingPay = () => {
        if (values.boost) {
            setMessageVisible(true);
        } else {
            handleSubmit();
        }
    };

    // -------------------
    const handleSubmit = async () => {
        if (checkEmptyName()) {
            setNameError(true);
            setNameTxtError(activeString.ERROR.EMPTY_FIELD);
        }
        if (checkEmptyRef()) {
            setRefError(true);
            setRefTxtError(activeString.ERROR.EMPTY_FIELD);
        }
        if (checkEmptyDescription()) {
            setDescriptionError(true);
            setDescriptionTxtError(activeString.ERROR.EMPTY_FIELD);
        }

        if (checkEmptyTache()) {
            setTachesError(true);
            setTachesTxtError(activeString.ERROR.EMPTY_FIELD);
        }
        if (checkEmptyPlace()) {
            setPlaceError(true);
            setPlaceTxtError(activeString.ERROR.EMPTY_FIELD);
        }
        if (checkEmptyExperience()) {
            setExperienceError(true);
            setExperienceTxtError(activeString.ERROR.EMPTY_FIELD);
        }

        if (checkEmptyDisponibilty()) {
            setDisponibilityError(true);
            setDisponibilityTxtError(activeString.ERROR.EMPTY_FIELD);
        }
        if (checkEmptyContrat()) {
            setContratError(true);
            setContratTxtError(activeString.ERROR.EMPTY_FIELD);
        }
        if (checkEmptyTypeData()) {
            setTypeDataError(true);
            setTypeDataTxtError(activeString.ERROR.EMPTY_FIELD);
        }
        if (checkSalary()) {
            setSalaryError(true);
            setSalaryTxtError('Le salaire brut (Ariary) doit être supérieur à 0');
        } else {
            setSalaryError(false);
        }

        if (
            !checkEmptyName() &&
            !checkEmptyDescription() &&
            !checkEmptyTache() &&
            !checkEmptyExperience() &&
            !checkEmptyPlace() &&
            !checkEmptyRef() &&
            !checkEmptyDisponibilty() &&
            !checkEmptyContrat() &&
            !checkEmptyTypeData()
        ) {
            setIsLoading(true);
            setMessageVisible(false);
            if (!isUpdate) {
                try {
                    const data = { ...values };
                    const response = await createOfferJob({ data });
                    if (response && response.data.isError) {
                        setTimeout(() => {
                            setResultVisible(true);
                        }, 300);
                        setMessage(response.data.message);
                    } else {
                        setMessage(activeString.STATUS.OFFER_SUCCESS);
                        storeSoldeWip(response?.data?.soldeWip);
                        setTimeout(() => {
                            setModalVisible(true);
                        }, 300);
                        navigate('/home');
                    }
                    setIsLoading(false);
                } catch (error) {
                    setIsLoading(false);
                    setMessage(activeString.STATUS.OFFER_FAIL);
                }
            } else {
                try {
                    const response = await updateOfferJob('', data?.id, {
                        ...values,
                        id: data.id,
                    });
                    if (response && response.data.isError) {
                        setTimeout(() => {
                            setModalVisible(true);
                        }, 300);
                        setMessage(response.data.message);
                    } else {
                        setMessage(activeString.STATUS.OFFER_UPDATE_SUCCES);
                        setTimeout(() => {
                            setModalVisible(true);
                        }, 300);
                    }
                    setIsLoading(false);
                } catch (error) {
                    setIsLoading(false);
                    setMessage(activeString.STATUS.OFFER_UPDATE_FAIL);
                }
            }
        }
    };

    const settingSalary = formattedValue => {
        if (formattedValue) {
            values.salaire = salary.toString();
        } else {
            values.salaire = '';
        }
    };

    const selectVideo = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoElement = document.createElement('video');
            videoElement.preload = 'metadata'; // Load only metadata, not the whole video
            videoElement.onloadedmetadata = function () {
                const duration = Math.round(videoElement.duration); // Video duration in seconds
                if(duration > 10) {
                    setVideoTxtError(activeString.ERROR.FILE_TOO_LARGE_OFFER);
                    setVideoError(true);
                } else if (file.size >= 10000000) {
                    setVideoTxtError(activeString.ERROR.FILE_TOO_HEAVY);
                    setVideoError(true);
                } else {
                    setFilePath('');
                    setFileName(file?.name);
                    const fileReader = new FileReader();
                    fileReader.onload = async (e) => {
                        const videoData = e?.target?.result?.split(',')[1]; // Extract base64 data
                        setFilePath(`data:video/mp4;base64,${videoData}`);
                        values.video = videoData;
                        handleChange('isVideo', true, true, '');
                        setVideoError(false);
                        setIsVideo(true);
                    };
                    fileReader.readAsDataURL(file);
                }  
                // Clean up the temporary video element
                URL.revokeObjectURL(videoElement.src);
                videoElement.remove();
            };

            // Set the video source to the file object URL
            videoElement.src = URL.createObjectURL(file);
        }
    };


    return (
        <View
            style={{
                paddingHorizontal: SIZES.padding,
                justifyContent: 'space-between',
            }}>
            <CustomModal title={"Moyen de paiement"} visible={showPayment} setVisible={setShowPayment} content={<PaymentWays/>} />
            <View style={styles.inputWrap}>
                <InputField
                    label={activeStr.create.ref}
                    value={values.ref}
                    name="ref"
                    onChange={handleChange}
                    required
                    maxLength={150}
                />
            </View>
            {refError && <Text style={{ color: COLORS.red_color }}>{refTxtError}</Text>}

            <View style={styles.inputWrap}>
                <InputField
                    label={activeStr.create.name}
                    value={values.name}
                    name="name"
                    onChange={handleChange}
                    required
                    maxLength={150}
                />
            </View>
            {nameError && (
                <Text style={{ color: COLORS.red_color }}>{nameTxtError}</Text>
            )}
            <View style={[{ marginBottom: 20 }, styles.inputWrap]}>
                <InputField
                    label={activeStr.create.description}
                    value={values.description}
                    name="description"
                    onChange={handleChange}
                    type="textArea"
                    required
                    maxLength={350}
                />
            </View>
            {descriptionError && (
                <Text style={{ color: COLORS.red_color }}>{descriptionTxtError}</Text>
            )}
            <View style={[{ marginBottom: 20 }, styles.inputWrap]}>
                <InputField
                    label={activeStr.create.taches}
                    value={values.taches}
                    name="taches"
                    onChange={handleChange}
                    required
                    type="textArea"
                    maxLength={400}
                />
            </View>
            {tachesError && (
                <Text style={{ color: COLORS.red_color }}>{tachesTxtError}</Text>
            )}
            {availabilityList && (
                <View style={styles.inputWrap}>
                    <InputSelect
                        label={activeStr.create.disponipility}
                        name="disponibility"
                        value={values.disponibility}
                        onChange={handleChange}
                        isEditable={true}
                        required
                        data={availabilityList}
                    />
                </View>
            )}
            {disponibilityError && (
                <Text style={{ color: COLORS.red_color }}>{disponibilityTxtError}</Text>
            )}
            <View style={styles.inputWrap}>
                <InputField
                    label={activeStr.create.place}
                    value={values.lieu}
                    name="lieu"
                    onChange={handleChange}
                    maxLength={50}
                    required
                />
            </View>
            {placeError && (
                <Text style={{ color: COLORS.red_color }}>{placeErrorTxtError}</Text>
            )}

            {statusList && (
                <View style={styles.inputWrap}>
                    <InputSelect
                        label={activeStr.create.contrat}
                        name="contrat"
                        value={values.contrat}
                        onChange={handleChange}
                        isEditable={true}
                        data={statusList}
                        required
                    />
                </View>
            )}
            
            {contratError && (
                <Text style={{ color: COLORS.red_color }}>{contratTxtError}</Text>
            )}

            {profilList && (
                <View style={styles.inputWrap}>
                    <InputSelect
                        label={activeStr.create.profil}
                        name="profil"
                        value={values.profil}
                        onChange={handleChange}
                        isEditable={true}
                        data={profilList}
                        required
                    />
                </View>
            )}
            {activityList && (
                <View style={styles.inputWrap}>
                    <InputSelect
                        label={activeStr.create.type}
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                        isEditable={true}
                        data={activityList}
                        required
                    />
                </View>
            )}
            {typeDataError && (
                <Text style={{ color: COLORS.red_color }}>{typeDataTxtError}</Text>
            )}

            {experienceList && (
                <View style={styles.inputWrap}>
                    <InputSelect
                        label={activeStr.create.experience}
                        name="experience"
                        value={values.experience}
                        onChange={handleChange}
                        isEditable={true}
                        data={experienceList}
                        required
                    />
                </View>
            )}

            {experienceError && (
                <Text style={{ color: COLORS.red_color }}>{experienceTxtError}</Text>
            )}
            <View style={styles.inputWrap}>
                <View>
                    <Text style={[formsStyles.labelStyle]}>
                        {activeStr.create.prestation}
                    </Text>
                </View>
                <CurrencyInput
                    value={salary}
                    onChangeValue={setSalary}
                    delimiter=","
                    separator="."
                    precision={0}
                    name="salaire"
                    onChangeText={formattedValue => {
                        settingSalary(formattedValue);
                    }}
                    style={[styles.textInput, { outline: 'none', borderWidth: 0 }]}
                />
            </View>
            {salaryError && (
                <Text style={{ color: COLORS.red_color }}>{salaryTxtError}</Text>
            )}

            <View style={{ paddingVertical: 20 }}>
                <FileUploader handleFileChange={selectVideo} accept="video/*" fileName={fileName} />
            </View>

            {videoError && (
                <Text style={{ color: COLORS.red_color }}>{videoTxtError}</Text>
            )}

            <View style={{ paddingVertical: 20 }}>
                <CustomButtons
                    onPress={() => setValues({ ...values, boost: !values.boost })}
                    title={values.boost ? activeString.ENTERPRISE_OFFER.BOOSTED_OFFER : activeString.ENTERPRISE_OFFER.BOOSTED_OFFER}
                    _style={[
                        globalStyle.buttonBoost,
                        values.boost
                            ? { backgroundColor: COLORS.twiter_color }
                            : { backgroundColor: 'green' },
                    ]}
                    color={'red'}
                    icon={icons.boost}
                    styleBtnTxt={globalStyle.bigBtnTxt}
                />
            </View>

            <VideoPlayer filePath={filePath} poster={'https://i.picsum.photos/id/866/1600/900.jpg'} />

            <View
                style={{
                    flex: 1,
                    height: 150,
                    width: '100%'
                }}>
                <SubmitButtons
                    underlineType={true}
                    submitAction={showingPay}
                    cancelAction={handleCancel}
                    submitTitle="Enregistrer"
                />
            </View>
            <Popup
                message={message}
                visible={modalVisible}
                validation={setModalVisible}
                navigation={navigate}
                navigateTo="EnterpriseOffreFormationScreen"
                btnTitle={'OK'}
            />
            <Popup
                message={message}
                visible={resultVisible}
                validation={setResultVisible}
                btnTitle="OK"
                action={redirection}
            />
            <Popup
                message={activeString.ENTERPRISE_INFORMATIONS.PAYMENT_BOOST}
                visible={messageVisible}
                validation={setMessageVisible}
                btnTitle="OK"
                cancel
                action={handleSubmit}
            />
            {isLoading && <Loader />}
        </View>
    );
};

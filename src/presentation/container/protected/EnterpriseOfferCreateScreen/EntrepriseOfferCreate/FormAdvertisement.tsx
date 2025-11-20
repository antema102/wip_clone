import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { TitleLabels } from './titleLabels';
import { styles } from './styles';
import { UserSA } from '../../../../../service/applicatif/User.sa';
import { storeSoldeWip, usePayment } from '../../../../../service/redux/ducks/payment';
import { getDynamicEchelleByKey, getDynamicListByKey } from '../../../../../service/technique/dynamicService';
import { useNavigate } from 'react-router-dom';
import { publicity, tarifs } from '../../../../../data/constants/enum';
import { ENTERPRISE_INFORMATIONS, ERROR, STATUS, TENDER } from '../../../../../data/constants/strings';
import { convertDateWithoutHours } from '../../../../../data/factory/dateFactory';
import { COLORS, SIZES, icons } from '../../../../../resources/constants';
import { InputField } from '../../../../components/Inputs/InputField';
import { InputSelect } from '../../../../components/Inputs/InputSelect';
import { audienceList, logerOrNot } from '../../CreateCV/data';
import { CustomInputDatePicker } from '../../../../components/Inputs/CustomInputDatePicker';
import MultiSlider from '../../../../components/MultiSlider';
import { SubmitButtons } from '../../../../components/Inputs/SubmitButtons';
import VideoPlayer from '../../../../components/VideoPlayer';
import Popup from '../../../../components/CreateCV/Popup';
import Loader from '../../../../components/Loader';
import FileUploader from '../../../../components/FileUploader';
import CustomButtons from '../../../../components/Button/button';
import globalStyle from '../../../../globalStyle/globalStyle';
import CustomModal from '../../../../components/Modal';
import { PaymentWays } from '../../../../components/PaymentWays';


export const FormAdvertisement = (props: any) => {
    const { data, modiferData, costsPrice } = props;
    const currentDate = new Date();
    const initialDateIOS = currentDate.toISOString();
    const [isUpdate, setIsUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const { createAdvertisement, editAdvertisement, removeAdvertisement } = UserSA();
    const [isVideo, setIsVideo] = useState(false);
    const [filePath, setFilePath] = useState('');
    const [videoName, setVideoName] = useState('');
    const [imageName, setImageName] = useState('');
    const [showPayment, setShowPayment] = useState(false);
    const [resultVisible, setResultVisible] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const navigate = useNavigate();

    //Checking value error
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [childError, setChildError] = useState(false);
    const [activityError, setActivityError] = useState(false);
    const [hobbyError, setHobbyError] = useState(false);
    const [petError, setPetError] = useState(false);
    const [transportError, setTransportError] = useState(false);
    const [datePublicationError, setDatePublicationError] = useState(false);
    const [abonmentDurationError, setAbonmentDurationError] = useState(false);
    const [categorieError, setCategorieError] = useState(false);
    const { accessToken } = useSelector(({ auth }) => auth);

    const [activityList, setActivityList] = useState<any>();
    const [sportList, setSportList] = useState<any>();
    const [transportList, setTransportList] = useState<any>();
    const [petList, setPetList] = useState<any>();
    const { dispatchUser } = usePayment();

    //Text value error
    const [nameTxtError, setNameTxtError] = useState('');
    const [audienceError, setAudienceError] = useState(false);
    const [descriptionTxtError, setDescriptionTxtError] = useState('');
    const [imageTxtError, setImageTxtError] = useState('');
    const [childTxtError, setChildTxtError] = useState('');
    const [activityTxtError, setActivityTxtError] = useState('');
    const [hobbyTxtError, setHobbyTxtError] = useState('');
    const [petTxtError, setPetTxtError] = useState('');
    const [transportTxtError, setTransportTxtError] = useState('');

    type AbonmentDurationType = 1 | 7 | 30 | null;

    const [values, setValues] = useState<{
        name: string;
        description: string;
        type: string;
        minPrice: number | string;
        maxPrice: number | string;
        link: string;
        child: boolean | string;
        activityArea: string;
        hobby: string;
        minAge: number;
        maxAge: number;
        image: any;
        isVideo: boolean;
        pet: string;
        transport: string;
        datePublication: string;
        categorie: string;
        abonmentDuration: AbonmentDurationType;
        price: number;
        thumbnail: string;
        audience: number | string;
    }>(
        modiferData
            ? {
                name: modiferData.name,
                description: modiferData.description,
                type: modiferData.type,
                minPrice: modiferData.minPrice,
                maxPrice: modiferData.maxPrice,
                link: modiferData.link,
                child: modiferData.child,
                activityArea: modiferData.activityArea,
                hobby: modiferData.hobby,
                minAge: modiferData.minAge,
                maxAge: modiferData.maxAge,
                image: modiferData.image,
                isVideo: modiferData.isVideo,
                pet: modiferData.pet,
                transport: modiferData.transport,
                datePublication: '',
                categorie: '',
                abonmentDuration: null,
                price: 0,
                thumbnail: '',
                audience: 3}
            : {
                name: '',
                description: '',
                type: 'cible',
                minPrice: 0,
                maxPrice: 0,
                link: '',
                child: false,
                activityArea: '',
                hobby: '',
                minAge: 0,
                maxAge: 100,
                image: '',
                pet: '',
                transport: '',
                isVideo: false,
                datePublication: '',
                categorie: '',
                abonmentDuration: null,
                price: 0,
                thumbnail: '',
                audience: 3},
    );

    /** build Datafrom */
    const buildFormData = (values: any) => {
        const formData = new FormData();
        for (const key in values) {
            if (key === 'image' && values.image instanceof File) {
                const file = values.image;
                const name = file.name || (values.isVideo ? 'video.mp4' : 'photo.jpg');
                formData.append('image', file, name);
            } else if (key === 'thumbnail' && values.thumbnail instanceof File) {
                formData.append('thumbnail', values.thumbnail, 'thumbnail.jpg');

            } else {
                formData.append(key, String(values[key]));
            }
        }

        return formData;
    };
    const redirection = async () => {
        setResultVisible(false);
        setShowPayment(true);
    };

    const getDynamicList = async () => {
        setIsLoading(true);
        try {
            const data = await localStorage.getItem('dynamic');
            const dataEchelle = await localStorage.getItem('dynamicEchelle');
            const dataJSON = JSON.parse(data);
            const dataJSONEchelle = JSON.parse(dataEchelle);
            const activity = getDynamicListByKey('activities', dataJSON);
            const sport = getDynamicListByKey('sports', dataJSON);
            const transport = getDynamicListByKey('transports', dataJSON);
            const pet = getDynamicListByKey('pets', dataJSON);
            const price = getDynamicEchelleByKey('price', dataJSONEchelle);
            setMinPrice(price[0]);
            setMaxPrice(price[1]);
            setActivityList(activity);
            setSportList(sport);
            setTransportList(transport);
            setPetList(pet);
        } catch (error) {
            // handle error
        } finally {
            setIsLoading(false);
        }
    };

    const handlingPrice = (duration: number, type: string) => {
        const typeMap = {
            spot: [0, 1, 2],
            video: [3, 4, 5],
            banner: [6, 7, 8],
            image: [9, 10, 11]};
        if (type in typeMap) {
            const [idx1, idx2, idx3] = typeMap[type];
            switch (duration) {
                case 1:
                    return costsPrice[idx1].price;
                case 7:
                    return costsPrice[idx2].price;
                default:
                    return costsPrice[idx3].price;
            }
        }
    };

    const handlingAbonmentDuration = (value: string) => {
        if (value.startsWith('Tarif par jour')) {
            return 1;
        } else if (value.startsWith('Tarif dans la semaine')) {
            return 7;
        } else {
            return 30;
        }
    };

    const handeTarif = (value: string) => {
        const spot = [
            `Tarif par jour (${costsPrice[0].price} Wip)`,
            `Tarif dans la semaine (${costsPrice[1].price} Wip)`,
            `Tarif dans le mois (${costsPrice[2].price} Wip)`,
        ];
        const spotList = spot.map(value => ({ value, label: value }));
        const video = [
            `Tarif par jour (${costsPrice[3].price} Wip)`,
            `Tarif dans la semaine (${costsPrice[4].price} Wip)`,
            `Tarif dans le mois (${costsPrice[5].price} Wip)`,
        ];
        const videoList = video.map(value => ({ value, label: value }));
        const banner = [
            `Tarif par jour (${costsPrice[6].price} Wip)`,
            `Tarif dans la semaine (${costsPrice[7].price} Wip)`,
            `Tarif dans le mois (${costsPrice[8].price} Wip)`,
        ];
        const bannerList = banner.map(value => ({ value, label: value }));
        const image = [
            `Tarif par jour (${costsPrice[9].price} Wip)`,
            `Tarif dans la semaine (${costsPrice[10].price} Wip)`,
            `Tarif dans le mois (${costsPrice[11].price} Wip)`,
        ];
        const imageList = image.map(value => ({ value, label: value }));

        switch (value) {
            case 'spot':
                return spotList;
            case 'video':
                return videoList;
            case 'image':
                return imageList;
            case 'banner':
                return bannerList;
            default:
                return '';
        }
    };

    useEffect(() => {
        !modiferData && getDynamicList();
    }, []);

    const [name, setName] = useState(values.name);
    const [description, setDescription] = useState(values.description);
    const [type, setType] = useState(publicity);
    const [datePublication, setDatePublication] = useState('');
    const [minPrice, setMinPrice] = useState(values.minPrice);
    const [maxPrice, setMaxPrice] = useState(values.maxPrice);
    const [link, setLink] = useState(values.link);
    const [child, setChild] = useState(values.child);
    const [activity, setActivity] = useState(values.activityArea);
    const [hobby, setHobby] = useState(values.hobby);
    const [pets, setPet] = useState(values.pet);
    const [transports, setTransport] = useState(values.transport);
    const [minAge, setMinAge] = useState(values.minAge);
    const [maxAge, setMaxAge] = useState(values.maxAge);
    const [image, setImage] = useState(values.image);

    const handleCancel = () => {
        setValues({
            name: '',
            description: '',
            type: 'cible',
            minPrice: 0,
            maxPrice: '',
            link: '',
            child: false,
            activityArea: '',
            hobby: '',
            pet: '',
            transport: '',
            minAge: 0,
            maxAge: 100,
            image: '',
            isVideo: false,
            datePublication: '',
            categorie: '',
            abonmentDuration: null,
            price: 0,
            thumbnail: '',
            audience: 3});
        navigate('/EnterpriseAdvertisingScreen');
    };

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
            case 'audience':
                setAudienceError(!value.length);
                break;
            case 'description':
                setDescriptionError(!value.length);
                setDescription(value);
                break;
            case 'categorie':
                setCategorieError(!value.length);
                break;
            case 'abonmentDuration':
                setAbonmentDurationError(!value.length);
                break;
            case 'activityArea':
                setActivityError(false);
                setActivity(value);
                break;
            case 'datePublication':
                setDatePublicationError(false);
                setDatePublication(value);
                break;
            case 'hobby':
                setHobbyError(false);
                setHobby(value);
                break;
            case 'pet':
                setPetError(false);
                setPet(value);
                break;
            case 'transport':
                setTransportError(false);
                setTransport(value);
                break;
            case 'child':
                setChildError(false);
                setChild(value);
                break;
            default:
                break;
        }
    };

    const checkEmptyName = () => !name?.trim();
    const checkEmptyDescription = () => !description?.trim();

    // -------------------
    const handleSubmit = async () => {
        if (checkEmptyName()) {
            setNameError(true);
            setNameTxtError(ERROR.EMPTY_FIELD);
        }
        if (checkEmptyDescription()) {
            setDescriptionError(true);
            setDescriptionTxtError(ERROR.EMPTY_FIELD);
        }

        if (values.image === '') {
            setImageError(true);
            setImageTxtError(ERROR.EMPTY_IMAGE);
        }

        if (values.categorie === '') {
            setCategorieError(true);
        }

        if (values.abonmentDuration == null) {
            setAbonmentDurationError(true);
        }

        if (values.datePublication === '') {
            setDatePublicationError(true);
        }
        if (values.audience === 3 || !values.audience) {
            setAudienceError(true);
        }
        if (values.type === 'cible' && values.audience == 0) {
            if (values.activityArea === '') {
                setActivityError(true);
                setActivityTxtError(ERROR.EMPTY_PICK);
            }
            if (values.hobby === '') {
                setHobbyError(true);
                setHobbyTxtError(ERROR.EMPTY_PICK);
            }
            if (values.pet === '') {
                setPetError(true);
                setPetTxtError(ERROR.EMPTY_PICK);
            }
            if (values.transport === '') {
                setTransportError(true);
                setTransportTxtError(ERROR.EMPTY_PICK);
            }
        }
        if (values.audience != 0) {
            values.type = 'global';
        }

        const sampleCondition =
            !checkEmptyName() &&
            !checkEmptyDescription() &&
            values.categorie !== '' &&
            values.abonmentDuration !== null &&
            values.datePublication !== '' &&
            values.image !== '' &&
            !audienceError;
        const condition =
            values.type === 'cible' &&
                values.audience == 0 &&
                (values.categorie === 'image' || values.categorie === 'video')
                ? sampleCondition &&
                values.hobby !== '' &&
                values.pet !== '' &&
                values.transport !== '' &&
                values.activityArea !== ''
                : sampleCondition;
        if (condition) {
            // @ts-ignore
            const tempValue = values.abonmentDuration;
            values.abonmentDuration = handlingAbonmentDuration(
                String(values.abonmentDuration),
            );
            // @ts-ignore
            values.audience = parseInt(values.audience);
            values.price = handlingPrice(values.abonmentDuration, values.categorie);
            values.datePublication = convertDateWithoutHours(values.datePublication);
            values.maxAge = maxAge;
            values.minAge = minAge;
            values.minPrice = minPrice;
            values.maxPrice = maxPrice;
            values.isVideo = isVideo;
            if (values.child === 'true') {
                values.child = true;
            }
            if (values.child === 'false') {
                values.child = false;
            }
            if (values.child === '') {
                values.child = false;
            }
            setIsLoading(true);
            let response;
            if (modiferData) {
                const formData = buildFormData(values);
                response = await editAdvertisement(modiferData.id, formData, accessToken);
            } else {
                const formData = buildFormData(values);
                const tempFunction = createAdvertisement(formData);
                values.abonmentDuration = tempValue;
                response = await tempFunction;
            }
            if (response && response?.data?.isError) {
                setResultVisible(true);
                setMessage(response.data.message);
            } else {
                await dispatchUser(response?.data);
                await storeSoldeWip(response?.data?.soldeWip);
                setMessage(
                    modiferData
                        ? STATUS.ADVERTISEMENT_EDIT_SUCCESS
                        : STATUS.ADVERTISEMENT_SUCCESS,
                );
                setModalVisible(true);
            }
            setIsLoading(false);
            setFilePath('')
            setImageName('')
        }
    };

    const handleDelete = async () => {
        const response = await removeAdvertisement(modiferData.id, accessToken);
        if (response && response.data.isError) {
            setConfirmation(false);
            setModalVisible(true);
            setMessage(response.data.message);
        } else {
            setConfirmation(false);
            setMessage(STATUS.ADVERTISEMENT_DELETE_SUCCESS);
            setModalVisible(true);
        }
    };

    const selectImage = async (event: any, isThumbnail: boolean) => {
        try {
            const file = event?.target?.files[0];
            const fileReader = new FileReader();
            if (!isThumbnail && file.type === 'video/mp4') {
                fileReader.onload = async (e) => {
                    const video = document.createElement('video');
                    video.src = e?.target?.result as string;
                    video.onloadedmetadata = () => {
                        if (
                            Math.round(video.duration) <=
                            (values.categorie === 'spot' ? 40 : 30) &&
                            file.size <= 10000000
                        ) {
                            setFilePath('');
                            const videoURL = URL.createObjectURL(file);
                            setFilePath(videoURL);
                            setVideoName(file?.name);
                            values.image = file;
                            handleChange('isVideo', true, true, '');
                            setImageError(false);
                            setIsVideo(true);
                            setImageName('')
                        } else if (file.size > 10000000) {
                            setImageTxtError(ERROR.FILE_TOO_HEAVY);
                            setImageError(true);
                        } else {
                            setImageTxtError(
                                values.categorie === 'spot'
                                    ? ERROR.FILE_TOO_LARGE_OFFER
                                    : ERROR.FILE_TOO_LARGE
                            );
                            setImageError(true);
                        }
                    };
                };
            } else {
                if (!isThumbnail) {
                    setFilePath('');
                }
                fileReader.onload = async (e) => {
                    const imageData = e?.target?.result?.split(',')[1];
                    setImageName(imageData);
                    setVideoName("")
                    if (isThumbnail) {
                        values.thumbnail = imageData;
                    } else {
                        values.image = file;
                        handleChange('isVideo', false, true, '');
                        setImageError(false);
                        setFilePath('');
                    }
                };
            }
            fileReader.readAsDataURL(file);
        } catch (error) {
        }
    };

    useEffect(() => { }, [filePath, minPrice, maxPrice]);

    return (
        <div
            style={{
                paddingHorizontal: SIZES.padding,
                justifyContent: 'space-between'}}>
            <CustomModal title={"Moyen de paiement"} visible={showPayment} setVisible={setShowPayment} content={<PaymentWays />} />
            <div style={{...styles.inputWrap, ...(modiferData ? { backgroundColor: COLORS.disableGray } : {})}}>
                <InputField
                    label={TitleLabels.advertisement.name}
                    value={values.name}
                    name="name"
                    onChange={handleChange}
                    required
                    maxLength={150}
                    isEditable={!modiferData}
                />
            </div>
            {nameError && (
                <span style={{ color: COLORS.red_color }}>{nameTxtError}</span>
            )}

            <div style={{...{ marginBottom: 20 }, ...styles.inputWrap, ...(modiferData ? { backgroundColor: COLORS.disableGray } : {})}}>
                <InputField
                    label={TitleLabels.advertisement.description}
                    value={values.description}
                    name="description"
                    onChange={handleChange}
                    type="textArea"
                    required
                    maxLength={100}
                    isEditable={!modiferData}
                />
            </div>
            {descriptionError && (
                <span style={{ color: COLORS.red_color }}>{descriptionTxtError}</span>
            )}

            {!modiferData && (
                <div style={styles.inputWrap}>
                    <InputSelect
                        label={TitleLabels.tender.audience}
                        name="audience"
                        value={`${values.audience}`}
                        onChange={handleChange}
                        isEditable={true}
                        data={audienceList}
                    />
                </div>
            )}

            {audienceError && (
                <span style={{ color: COLORS.red_color }}>{ERROR.EMPTY_PICK}</span>
            )}

            {!modiferData ? (
                <div style={styles.inputWrap}>
                    <InputSelect
                        label={TitleLabels.advertisement.categorie}
                        name="categorie"
                        value={values.categorie}
                        onChange={handleChange}
                        isEditable={true}
                        data={tarifs}
                    />
                </div>)
                :
                (
                    <div style={styles.inputWrap}>
                        <InputSelect
                            label={TitleLabels.advertisement.categorie}
                            name="categorie"
                            value={modiferData.categorie}
                            onChange={handleChange}
                            isEditable={false}
                            data={tarifs}
                        />
                    </div>
                )
            }

            {categorieError && (
                <span style={{ color: COLORS.red_color }}>{ERROR.EMPTY_PICK}</span>
            )}

            {!modiferData && (
                <div style={styles.inputWrap}>
                    <InputSelect
                        label={TitleLabels.advertisement.tarif}
                        name="abonmentDuration"
                        value={values.abonmentDuration}
                        onChange={handleChange}
                        isEditable={true}
                        data={handeTarif(values.categorie)}
                    />
                </div>
            )}

            {abonmentDurationError && (<span style={{ color: COLORS.red_color }}>{ERROR.EMPTY_PICK}</span>)}

            {!modiferData && (
                <div style={styles.inputWrap}>
                    <CustomInputDatePicker
                        value={values.datePublication}
                        required
                        label={TitleLabels.advertisement.date}
                        name={'datePublication'}
                        onChange={handleChange}
                        isEditable={true}
                        type={'date'}
                        dateMax={
                            new Date(
                                new Date().getFullYear() + 1,
                                new Date().getMonth(),
                                new Date().getDate(),
                            ).toISOString()
                        }
                        dateMin={
                            new Date(
                                new Date().getFullYear(),
                                new Date().getMonth(),
                                new Date().getDate(),
                            ).toISOString()
                        }
                    />
                </div>
            )}

            {datePublicationError && (
                <span style={{ color: COLORS.red_color }}>{ERROR.EMPTY_PICK}</span>
            )}

            {!modiferData &&
                values.categorie !== 'video' &&
                values.categorie !== 'spot' ? (
                <div style={styles.inputWrap}>
                    <InputField
                        label={TitleLabels.advertisement.link}
                        value={values.link}
                        name="link"
                        onChange={handleChange}
                        maxLength={150}
                        isEditable={!modiferData}
                    />
                </div>
            ) : null}

            {(values?.categorie === 'video' || values?.categorie === 'image') &&
                values.audience == 0 ? (
                <div style={styles.inputWrap}>
                    <InputSelect
                        label={TitleLabels.advertisement.type}
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                        isEditable={true}
                        data={type}
                    />
                </div>
            ) : null}

            {!modiferData &&
                values?.type !== 'global' &&
                values.audience == 0 &&
                (values.categorie === 'video' || values.categorie === 'image') ? (
                <>
                    <div style={styles.inputWrap}>
                        <InputSelect
                            label={TitleLabels.advertisement.child}
                            name="child"
                            value={`${values.child}`}
                            onChange={handleChange}
                            isEditable={true}
                            data={logerOrNot}
                        />
                    </div>
                    {childError && (
                        <span style={{ color: COLORS.red_color }}>{childTxtError}</span>
                    )}

                    {activityList && (
                        <div style={styles.inputWrap}>
                            <InputSelect
                                label={TitleLabels.advertisement.activityArea}
                                name="activityArea"
                                value={values.activityArea}
                                onChange={handleChange}
                                isEditable={true}
                                data={activityList}
                            />
                        </div>
                    )}
                    {activityError && (
                        <span style={{ color: COLORS.red_color }}>{activityTxtError}</span>
                    )}

                    {sportList && (
                        <div style={styles.inputWrap}>
                            <InputSelect
                                label={TitleLabels.advertisement.hobby}
                                name="hobby"
                                value={values.hobby}
                                onChange={handleChange}
                                isEditable={true}
                                data={sportList}
                            />
                        </div>
                    )}
                    {hobbyError && (
                        <span style={{ color: COLORS.red_color }}>{hobbyTxtError}</span>
                    )}

                    {petList && (
                        <div style={styles.inputWrap}>
                            <InputSelect
                                label={TitleLabels.advertisement.pet}
                                name="pet"
                                value={values.pet}
                                onChange={handleChange}
                                isEditable={true}
                                data={petList}
                            />
                        </div>
                    )}
                    {petError && (
                        <span style={{ color: COLORS.red_color }}>{petTxtError}</span>
                    )}

                    {transportList && (
                        <div style={styles.inputWrap}>
                            <InputSelect
                                label={TitleLabels.advertisement.transport}
                                name="transport"
                                value={values.transport}
                                onChange={handleChange}
                                isEditable={true}
                                data={transportList}
                            />
                        </div>
                    )}
                    {transportError && (
                        <span style={{ color: COLORS.red_color }}>{transportTxtError}</span>
                    )}

                    <div style={{ marginTop: 20 }}>
                        <span style={styles.titleGroup}>
                            {TitleLabels.advertisement.price}
                        </span>
                    </div>

                    {maxPrice ? (
                        <MultiSlider
                            min={minPrice}
                            max={maxPrice}
                            setMin={setMinPrice}
                            setMax={setMaxPrice}
                            isPrice={true}
                        />
                    ) : null}

                    <div style={{ marginTop: 20 }}>
                        <span style={styles.titleGroup}>
                            {TitleLabels.advertisement.age}
                        </span>
                    </div>
                    <MultiSlider
                        min={minAge}
                        max={maxAge}
                        setMin={setMinAge}
                        setMax={setMaxAge}
                    />
                </>
            ) : null}

            {!modiferData && (
                <div style={{ paddingVertical: 20 }}>
                    <FileUploader handleFileChange={(e) => selectImage(e, false)} fileName={videoName ? videoName : 'Importer'} />
                </div>
            )}
            {imageError && (
                <span style={{ color: COLORS.red_color }}>{imageTxtError}</span>
            )}

            {filePath !== '' ? (
                <VideoPlayer
                    filePath={filePath}
                    width={'100%'}
                    height={250}
                    poster={'https://i.picsum.photos/id/866/1600/900.jpg'}
                />
            ) : null}

            {
                imageName !== '' ? (
                    <div
                        style={{ justifyContent: 'center', alignItems: 'center', height: 300 }}
                    >
                        <img src={`data:image/jpg;base64,${imageName}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                ) : null
            }

            {
                modiferData ? (
                    modiferData.isVideo ? (
                        <VideoPlayer
                            filePath={modiferData.image}
                            width="100%"
                            height={250}
                            poster="https://i.picsum.photos/id/866/1600/900.jpg"
                        />
                    ) : (
                        <div style={{ justifyContent: 'center', alignItems: 'center', height: 300 }}>
                            <img
                                src={modiferData.image}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                alt="Preview"
                            />
                        </div>
                    )
                ) : null
            }


            <div
                style={{
                    flex: 1,
                    height: 260}}>
                <div>
                    {!modiferData && (
                        <div style={styles.screenContainer2}>
                            <button
                                style={[styles.buttonAnnuler]}
                                onClick={(e: any) => handleCancel()}>
                                <span style={styles.textBtnSecondary}>Annuler</span>
                            </button>
                            <button style={[styles.buttonAnnuler2]} onClick={handleSubmit}>
                                <span style={styles.textBtnSecondary2}>
                                    {ENTERPRISE_INFORMATIONS.VALIDATE}
                                </span>
                            </button>
                        </div>
                    )}
                </div>
                {modiferData && (
                    <SubmitButtons
                        underlineType={true}
                        supprimer={true}
                        submitAction={() => setConfirmation(true)}
                        submitTitle="Supprimer"
                    />
                )}

            </div>
            <Popup
                message={TENDER.CONFIRMATION_AD}
                visible={confirmation}
                validation={setConfirmation}
                btnTitle="OK"
                action={() => handleDelete()}
                cancel={true}
            />
            <Popup
                message={message}
                visible={resultVisible}
                validation={setResultVisible}
                btnTitle="OK"
                action={redirection}
            />
            <Popup
                message={message}
                visible={modalVisible}
                validation={setModalVisible}
                navigation={navigate}
                navigateTo="/EnterpriseAdvertisingScreen"
                btnTitle={'OK'}
                advertisementOKAds={true}
            />
            {isLoading && <Loader />}
        </div>
    );
};

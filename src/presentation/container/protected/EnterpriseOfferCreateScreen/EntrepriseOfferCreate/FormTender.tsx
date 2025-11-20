import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Platform,
    BackHandler,
    TouchableOpacity,
} from 'react-native';

import { InputField } from '../../../../components/Inputs/InputField';
import { useSelector } from 'react-redux';

import { TitleLabels } from './titleLabels';
import { TitleLabels_en } from './titleLabels_en';
import { styles } from './styles';
import { UserSA } from '../../../../../service/applicatif/User.sa';
import { storeSoldeWip, usePayment } from '../../../../../service/redux/ducks/payment';
import { ENTERPRISE_INFORMATIONS, ERROR, STATUS } from '../../../../../data/constants/strings';
import { COLORS, SIZES, icons } from '../../../../../resources/constants';
import { InputSelect } from '../../../../components/Inputs/InputSelect';
import { audienceList } from '../../CreateCV/data';
import { CustomInputDatePicker } from '../../../../components/Inputs/CustomInputDatePicker';
import globalStyle from '../../../../globalStyle/globalStyle';
import CustomButtons from '../../../../components/Button/button';
import Popup from '../../../../components/CreateCV/Popup';
import Loader from '../../../../components/CreateCV/Loader';
import FileUploader from '../../../../components/FileUploader';
import { PDFViewerScreen } from '../../PDFVIewerScreen';
import { convertDateWithoutHours } from '../../../../../data/factory/dateFactory';
import CustomModal from '../../../../components/Modal';
import { PaymentWays } from '../../../../components/PaymentWays';
import { useLang } from '../../../../../data/translation';
import * as stringFr from '../../../../../data/constants/strings';
import * as stringEn from '../../../../../data/constants/strings_en';
import FileUploaderCompoment from '../../../../components/FileUploaderCompoment';
export const FormTender = (props: any) => {
    const { data, navigation, modiferData, costsPrice } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const currentDate = new Date();
    const initialDateIOS = new Date(currentDate);
    initialDateIOS.setDate(currentDate.getDate() + 1);
    const [visible, setVisible] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    /* Langue */
    const { lang } = useLang();
    const activeString = lang === 'fr' ? stringFr : stringEn;
    const activeStr = lang === 'fr' ? TitleLabels : TitleLabels_en;

    /* Values names */
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [audience, setAudience] = useState(3);
    const [file, setFile] = useState('');

    /* Values errors */
    const [titleError, setTitleError] = useState(false);
    const [detailError, setDetailError] = useState(false);
    const [audienceError, setAudienceError] = useState(false);
    const [fileError, setFileError] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const { getCostsUserByName, createTender } = UserSA();
    const [datePublicationError, setDatePublicationError] = useState(false);
    const [abonmentDurationError, setAbonmentDurationError] = useState(false);
    const { accessToken } = useSelector(({ auth }) => auth);
    const { dispatchUser } = usePayment();
    const [resultVisible, setResultVisible] = useState(false);
    const [fileName, setFileName] = useState('Regarder le fichier');
    const [values, setValues] = useState({
        title: '',
        detail: '',
        file: '',
        audience: 3,
        datePublication: '',
        abonmentDuration: null,
        price: 0,
    });
    const [dataCost, setDataCost] = useState();
    const [priceWeek, setPriceWeek] = useState();
    const [priceMonth, setPriceMonth] = useState();
    const handleBackButton = () => {
        navigation('/EnterpriseTenderScreen');
        return true;
    };

    const redirection = async () => {
        setResultVisible(false);
        setShowPayment(true);
    };

    const getCost = async () => {
        setIsLoading(true);
        const [result1, result2, data] = await Promise.all([
            getCostsUserByName(accessToken, "Appel d'offre hebdomadaire"),
            getCostsUserByName(accessToken, "Appel d'offre mensuel"),
            localStorage.getItem('dynamic'),
        ]);
        const cost = [
            `Tarif dans la semaine (${result1?.data?.items[0]?.price} Wip)`,
            `Tarif dans le mois (${result2?.data?.items[0]?.price} Wip)`,
        ];
        const costList = cost.map(value => ({ value, label: value }));
        setPriceWeek(result1?.data?.items[0]?.price);
        setPriceMonth(result2?.data?.items[0]?.price);
        // @ts-ignore
        setDataCost(costList);
        setIsLoading(false);
    };

    const handlingPrice = (duration: number) => {
        switch (duration) {
            case 7:
                return priceWeek;
            default:
                return priceMonth;
        }
    };

    useEffect(() => {
        getCost();
        // handleBackButton();
    }, []);

    const handleCancel = () => {
        setValues({
            title: '',
            detail: '',
            file: '',
            audience: 3,
            datePublication:
                Platform.OS === 'ios'
                    ? `${initialDateIOS}`
                    : '',
            abonmentDuration: null,
            price: 0,
        });
        handleBackButton();
    };

    React.useEffect(() => {
        if (typeof data !== 'undefined') {
            setValues({
                title: '',
                detail: '',
                file: '',
                audience: 3,
                datePublication:
                    Platform.OS === 'ios'
                        ? `${initialDateIOS}`
                        : '',
                abonmentDuration: null,
                price: 0,
            });
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
            case 'title':
                setTitleError(!value.length);
                break;
            case 'detail':
                setDetailError(!value.length);
                break;
            case 'datePublication':
                setDatePublicationError(!value.toString().length);
                break;
            case 'abonmentDuration':
                setAbonmentDurationError(!value.length);
                break;
            default:
                break;
        }
    };

    const handlingAbonmentDuration = (value: string) => {
        if (value.startsWith('Tarif dans la semaine')) {
            return 7;
        } else {
            return 30;
        }
    };

    // -------------------
    const handleSubmit = async () => {
        let isFileInvalid = false;
        if (values.title === '') {
            setTitleError(true);
        }
        if (values.detail === '') {
            setDetailError(true);
        }
        if (values.abonmentDuration == null) {
            setAbonmentDurationError(true);
        }
        if (values.datePublication === '') {
            setDatePublicationError(true);
        }
        if (values.audience === 3) {
            setAudienceError(true);
        }
        if (values.file === '') {
            isFileInvalid = true;
            setFileError(true);
        }
        const condition =
            !titleError &&
            !detailError &&
            !abonmentDurationError &&
            !datePublicationError &&
            !audienceError &&
            !isFileInvalid;
        if (condition) {
            setIsLoading(true);
            const temp = values.abonmentDuration;
            // @ts-ignore
            values.datePublication = convertDateWithoutHours(values.datePublication);
            values.abonmentDuration = handlingAbonmentDuration(
                values.abonmentDuration,
            );
            values.price = handlingPrice(values.abonmentDuration) || 19;
            const response = await createTender(values, accessToken);
            if (response && response?.data?.isError) {
                setResultVisible(true);
                setMessage(response.data.message);
            } else {
                await dispatchUser(response?.data);
                await storeSoldeWip(response?.data?.soldeWip);
                setMessage(activeString.STATUS.TENDER_SUCCESS);
                setModalVisible(true);
            }
            setIsLoading(false);
            values.abonmentDuration = temp;
        }
    };

    const showPDFViewer = () => {
        setVisible(true);
    };

    const namePDF = (name: string) => {
        if (!name.endsWith('.pdf')) {
            return (name += '.pdf');
        } else {
            return name;
        }
    };

    const pickAndEncodePDF = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event?.target?.files[0];

            if (file) {
                const fileReader = new FileReader();

                fileReader.onload = (e) => {
                    const content = e?.target?.result?.split(',')[1];
                    setFile(content);
                    setFileError(false);
                    values.file = content;
                };

                fileReader.readAsDataURL(file);
                setFileName(file.name ? namePDF(file.name.slice(0, 15)) : '');
            }
        } catch (error) {
        }
    };

    return (<>
        <PDFViewerScreen visible={visible} setVisible={setVisible} data={file} isDownloadAllowed={false} />
        <View
            style={{
                paddingHorizontal: SIZES.padding,
                justifyContent: 'space-between',
            }}>
            <CustomModal title={"Moyen de paiement"} visible={showPayment} setVisible={setShowPayment} content={<PaymentWays />} />
            <View style={styles.inputWrap}>
                <InputField
                    label={activeStr.tender.title}
                    value={values.title}
                    name="title"
                    onChange={handleChange}
                    required
                    maxLength={150}
                    isEditable={true}
                />
            </View>
            {titleError && (
                <Text style={{ color: COLORS.red_color }}>{activeString.ERROR.EMPTY_FIELD}</Text>
            )}

            <View style={styles.inputWrap}>
                <InputField
                    label={activeStr.tender.detail}
                    value={values.detail}
                    name="detail"
                    onChange={handleChange}
                    required
                    maxLength={150}
                    isEditable={true}
                />
            </View>
            {detailError && (
                <Text style={{ color: COLORS.red_color }}>{activeString.ERROR.EMPTY_FIELD}</Text>
            )}

            <View style={styles.inputWrap}>
                <InputSelect
                    label={activeStr.tender.audience}
                    name="audience"
                    value={`${values.audience}`}
                    onChange={handleChange}
                    isEditable={true}
                    data={audienceList}
                />
            </View>
            {audienceError && (
                <Text style={{ color: COLORS.red_color }}>{activeString.ERROR.EMPTY_PICK}</Text>
            )}

            {!modiferData && dataCost && (
                <View style={styles.inputWrap}>
                    <InputSelect
                        label={activeStr.advertisement.tarif}
                        name="abonmentDuration"
                        value={values.abonmentDuration}
                        onChange={handleChange}
                        isEditable={true}
                        data={dataCost}
                    />
                </View>
            )}

            {abonmentDurationError && (
                <Text style={{ color: COLORS.red_color }}>{activeString.ERROR.EMPTY_PICK}</Text>
            )}

            {!modiferData && (
                <View style={styles.inputWrap}>
                    <CustomInputDatePicker
                        value={values.datePublication}
                        required
                        label={activeStr.advertisement.date}
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
                                new Date().getDate() + 1,
                            ).toISOString()
                        }
                    />
                </View>
            )}

            {datePublicationError && (
                <Text style={{ color: COLORS.red_color }}>{activeString.ERROR.EMPTY_PICK}</Text>
            )}

            {/* <FileUploader
                    handleFileChange={pickAndEncodePDF}
                    fileName={'Importer PDF'}
                    icon={icons.filetext}
                    disable={false}
                    accept=".pdf"
                    color={COLORS.secondary}
                /> */}
            <FileUploaderCompoment
                fileName='Importer PDF'
                label='Importer votre PDF'
                accept='.pdf'
                handleFileChange={pickAndEncodePDF}
                type='pdf'
                file={file}
                pdfName={fileName}
                onPressPdf={async () => await showPDFViewer()}
            />

            {fileError && (
                <Text style={{ color: COLORS.red_color }}>{activeString.ERROR.EMPTY_PICK_PDF}</Text>
            )}
            
            <View
                style={{
                    flex: 1,
                    height: 260,
                }}>
                {!modiferData && (
                    <View>
                        <View>

                            <TouchableOpacity
                                style={[styles.buttonAnnuler]}
                                onPress={(e: any) => handleCancel()}>
                                <Text style={styles.textBtnSecondary}>Annuler</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.buttonAnnuler2]}
                                onPress={isLoading ? null : () => handleSubmit()}>
                                <Text style={styles.textBtnSecondary2}>
                                    {ENTERPRISE_INFORMATIONS.VALIDATE}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                )}
            </View>
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
                navigation={navigation}
                navigateTo="/EnterpriseTenderScreen"
                btnTitle={'OK'}
                advertisementOK={true}
            />
            {/* {isLoading && <Loader />} */}
        </View>
    </>
    );
};

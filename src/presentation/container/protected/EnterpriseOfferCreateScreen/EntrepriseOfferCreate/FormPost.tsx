import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { TitleLabels } from './titleLabels';
import { TitleLabels_en } from './titleLabels_en';
import { styles } from './styles';
import { storeSoldeWip, usePayment } from '../../../../../service/redux/ducks/payment';
import { UserSA } from '../../../../../service/applicatif/User.sa';
import { getDynamicListByKey } from '../../../../../service/technique/dynamicService';
import { ENTERPRISE_INFORMATIONS, ERROR, STATUS, TENDER } from '../../../../../data/constants/strings';
import { COLORS, SIZES, icons } from '../../../../../resources/constants';
import { InputField } from '../../../../components/Inputs/InputField';
import { InputSelect } from '../../../../components/Inputs/InputSelect';
import { InputDatePicker } from '../../../../components/Inputs/InputDatePicker';
import globalStyle from '../../../../globalStyle/globalStyle';
import { SubmitButtons } from '../../../../components/Inputs/SubmitButtons';
import Loader from '../../../../components/Loader';
import Popup from '../../../../components/CreateCV/Popup';
import { CustomInputDatePicker } from '../../../../components/Inputs/CustomInputDatePicker';
import FileUploader from '../../../../components/FileUploader';
import { convertDateWithoutHours } from '../../../../../data/factory/dateFactory';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../../../components/Modal';
import { PaymentWays } from '../../../../components/PaymentWays';
import * as stringsFr from '../../../../../data/constants/strings';
import * as stringsEn from '../../../../../data/constants/strings_en';
import { useLang } from '../../../../../data/translation';
import FileUploaderCompoment from '../../../../components/FileUploaderCompoment';

export const FormPost = (props: any) => {

  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;
  const activeStr = lang === 'fr' ? TitleLabels : TitleLabels_en;

  const winWidth = window.innerWidth;
  const { data, navigation, modiferData, costsPrice } = props;
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { getCostsUserByName, removePost, createPost } = UserSA();
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [datePublicationError, setDatePublicationError] = useState(false);
  const [abonmentDurationError, setAbonmentDurationError] = useState(false);
  const [contactError, setContactError] = useState(false);
  const { accessToken } = useSelector(({ auth }) => auth);
  const { dispatchUser } = usePayment();
  const [activityList, setActivityList] = useState<any>();
  const [activityError, setActivityError] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [imgName, setImgName] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState<any>(null)

  const [nameTxtError, setNameTxtError] = useState('');
  const [descriptionTxtError, setDescriptionTxtError] = useState('');
  const [values, setValues] = useState(
    modiferData
      ? {
        title: modiferData?.title,
        description: modiferData?.description,
        file: '',
        duration: 0,
        datePublication: '',
        price: 0,
        thumbnail: '',
        contact: modiferData?.contact,
        activityArea: modiferData?.activityArea}
      : {
        title: '',
        description: '',
        file: '',
        duration: 0,
        datePublication: '',
        price: 0,
        thumbnail: '',
        contact: '',
        activityArea: ''},
  );
  const [dataCost, setDataCost] = useState();
  const [priceDay, setPriceDay] = useState();
  const [priceWeek, setPriceWeek] = useState();
  const [priceMonth, setPriceMonth] = useState();

  const handleBackButton = () => {
    navigate('/EnterpriseAdvertisingScreen');
    return true;
  };

  const redirection = async () => {
    setResultVisible(false);
    setShowPayment(true);
  };

  const getCost = async () => {
    setIsLoading(true);
    const [result1, result2, result3, data] = await Promise.all([
      getCostsUserByName(accessToken, 'Petite annonce journaliere'),
      getCostsUserByName(accessToken, 'Petite annonce hebdomadaire'),
      getCostsUserByName(accessToken, 'Petite annonce mensuelle'),
      localStorage.getItem('dynamic'),
    ]);
    const dataJSON = JSON.parse(data);
    const activity = getDynamicListByKey('secteurAnnonces', dataJSON);
    setActivityList(activity);
    const cost = [
      `Tarif par jour (${result1?.data?.items[0].price} Wip)`,
      `Tarif dans la semaine (${result2?.data?.items[0].price} Wip)`,
      `Tarif dans le mois (${result3?.data?.items[0].price} Wip)`,
    ];
    const costList = cost.map(value => ({ value, label: value }));
    setPriceDay(result1?.data?.items[0].price);
    setPriceWeek(result2?.data?.items[0].price);
    setPriceMonth(result3?.data?.items[0].price);
    // @ts-ignore
    setDataCost(costList);
    setIsLoading(false);
  };

  const handlingPrice = (duration: number) => {
    switch (duration) {
      case 1:
        return priceDay;
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
      description: '',
      file: '',
      duration: 0,
      price: 0,
      datePublication: '',
      thumbnail: '',
      contact: '',
      activityArea: ''});
    navigate('/EnterpriseAdvertisingScreen');
  };


  useEffect(() => {
    if (typeof data !== 'undefined') {
      setIsUpdate(true);
      setValues({
        title: '',
        description: '',
        file: '',
        duration: 0,
        datePublication: '',
        price: 0,
        thumbnail: '',
        contact: '',
        activityArea: ''});
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
        setNameError(!value.length);
        break;
      case 'description':
        setDescriptionError(!value.length);
        break;
      case 'datePublication':
        setDatePublicationError(!value.toString().length);
        break;
      case 'duration':
        setAbonmentDurationError(!value.length);
        break;
      case 'contact':
        setContactError(!value.length);
        break;
      case 'activityArea':
        setActivityError(!value.length);
        break;
      default:
        break;
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

  // -------------------
  const handleSubmit = async () => {
    if (values.title === '') {
      setNameError(true);
      setNameTxtError(activeString.ERROR.EMPTY_FIELD);
    }
    if (values.description === '') {
      setDescriptionError(true);
      setDescriptionTxtError(activeString.ERROR.EMPTY_FIELD);
    }
    if (values.duration == null) {
      setAbonmentDurationError(true);
    }
    if (values.contact === '') {
      setContactError(true);
    }
    if (values.activityArea === '') {
      setActivityError(true);
    }
    if (values.file === '') {
      setImageError(true);
    }
    if (values.datePublication === '') {
      setDatePublicationError(true);
    }
    const condition =
      !nameError &&
      !descriptionError &&
      !abonmentDurationError &&
      !contactError &&
      !imageError &&
      !datePublicationError &&
      values?.activityArea;
    if (condition) {
      setIsLoading(true);
      const temp = values.duration;
      // @ts-ignore
      values.datePublication = convertDateWithoutHours(values.datePublication);
      values.duration = handlingAbonmentDuration(values.duration);
      values.price = handlingPrice(values.duration) || 19;
      const response = await createPost(values, accessToken);
      if (response && response?.data?.isError) {
        setResultVisible(true);
        setMessage(response.data.message);
      } else {
        await dispatchUser(response?.data);
        await storeSoldeWip(response?.data?.soldeWip);
        setMessage(activeString.STATUS.POST_SUCCESS);
        setModalVisible(true);
      }
      setIsLoading(false);
      values.duration = temp;
    }
  };

  const handleDelete = async () => {
    const response = await removePost(modiferData.id, accessToken);
    if (response && response.data.isError) {
      setConfirmation(false);
      setModalVisible(true);
      setMessage(response.data.message);
    } else {
      setConfirmation(false);
      setMessage(activeString.STATUS.ADVERTISEMENT_DELETE_SUCCESS);
      setModalVisible(true);
    }
  };

  const selectImage = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        setImgName(file?.name);
        const fileReader = new FileReader();
        fileReader.onload = async (e) => {
          const imageData = e?.target?.result?.split(',')[1];
          // setFilePath(`data:image/png;base64,${videoData}`);
          values.file = imageData;
          setImgSrc(e.target?.result)
          setImageError(false);
        };

        // Read the file as a data URL
        fileReader.readAsDataURL(file);
      }
    } catch (error) {
    }
  };


  return (
    <div
      style={{
        paddingHorizontal: SIZES.padding,
        justifyContent: 'space-between'}}>
      <CustomModal title={"Moyen de paiement"} visible={showPayment} setVisible={setShowPayment} content={<PaymentWays />} />
      <div style={{...styles.inputWrap, ...(modiferData ? { backgroundColor: COLORS.disableGray } : {})}}>
        <InputField
          label={activeStr.advertisement.name}
          value={values.title}
          name="title"
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
          label={activeStr.advertisement.description}
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

      <div style={{...styles.inputWrap, ...(modiferData ? { backgroundColor: COLORS.disableGray } : {})}}>
        <InputField
          label={activeStr.advertisement.contact}
          value={values.contact}
          required
          type="numeric"
          name="contact"
          onChange={handleChange}
          maxLength={10}
          isEditable={!modiferData}
        />
      </div>

      {contactError && (
        <span style={{ color: COLORS.red_color }}>{activeString.ERROR.EMPTY_FIELD}</span>
      )}

      {!modiferData && activityList && (
        <div style={styles.inputWrap}>
          <InputSelect
            label={activeStr.advertisement.categoriePost}
            name="activityArea"
            value={values.activityArea}
            onChange={handleChange}
            isEditable={true}
            data={activityList}
          />
        </div>
      )}

      {activityError && (
        <span style={{ color: COLORS.red_color }}>{activeString.ERROR.EMPTY_PICK}</span>
      )}

      {!modiferData && dataCost && (
        <div style={styles.inputWrap}>
          <InputSelect
            label={activeStr.advertisement.tarif}
            name="duration"
            value={values.duration}
            onChange={handleChange}
            isEditable={true}
            data={dataCost}
          />
        </div>
      )}

      {abonmentDurationError && (
        <span style={{ color: COLORS.red_color }}>{activeString.ERROR.EMPTY_PICK}</span>
      )}

      {!modiferData && (
        <div style={styles.inputWrap}>
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
        </div>
      )}

      {datePublicationError && (
        <span style={{ color: COLORS.red_color }}>{activeString.ERROR.EMPTY_PICK}</span>
      )}

      {/* {!modiferData && (
        <div style={{ paddingVertical: 20 }}>
          <CustomButtons
            onClick={() => selectImage(false)}
            title={'import'}
            _style={[globalStyle.elevationOrange, globalStyle.buttonHomeExport]}
            color={'red'}
            icon={icons.camera}
            styleBtnTxt={globalStyle.bigBtnTxt}
          />
          <FileUploader handleFileChange={selectImage} fileName={imgName ? imgName : 'Importer une image'} accept='image/*' />
        </div>
      )} */}

      {
      !modiferData &&
        <FileUploaderCompoment
          img={imgSrc}
          handleFileChange={selectImage}
          fileName={'Importer une images'}
          label='Importer votre images'
          accept='image/*'
          type='images'
        />
      }

      {imageError && (
        <span style={{ color: COLORS.red_color }}>{activeString.ERROR.EMPTY_IMAGE}</span>
      )}

      <div
        style={{
          flex: 1,
          height: 260}}>
        {!modiferData && (
          <div>
            <div style={styles.screenContainer2}>
              <button
                style={[styles.buttonAnnuler]}
                onClick={(e: any) => handleCancel()}>
                <span style={styles.textBtnSecondary}>Annuler</span>
              </button>
              <button style={[styles.buttonAnnuler2]} onClick={handleSubmit}>
                <span style={styles.textBtnSecondary2}>
                  {activeString.ENTERPRISE_INFORMATIONS.VALIDATE}
                </span>
              </button>
            </div>
          </div>
        )}
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
        message={activeString.TENDER.CONFIRMATION_POST}
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
        advertisementOK={true}
      />
      {isLoading && <Loader />}
    </div>
  );
};

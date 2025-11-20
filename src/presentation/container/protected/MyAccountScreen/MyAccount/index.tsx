import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { COLORS, icons, images } from '../../../../../resources/constants';
import { UserSA } from '../../../../../service/applicatif/User.sa';
import { InputField } from '../../../../components/Inputs/InputField';
import Popup from '../../../../components/CreateCV/Popup';
import { CandidatFrame } from '../../../../components/CandidatFrame';
import { TitleLabels } from './titleLabels';
import { lang } from './data';
import { useUser } from '../../../../../service/redux/ducks/user';
import {
  ERROR,
  ROLEACCOUNT,
  STATUS,
  TEXT_INFORMATIONS,
} from '../../../../../data/constants/strings';
import CustomButton from '../../../../components/Button/button';
import { WhiteButtons } from '../../../../components/Inputs/WhiteButtons';
import { styles } from './styles';
import { InputSelect } from '../../../../components/Inputs/InputSelect';
import * as stringsFr from '../../../../../data/constants/strings';
import * as stringsEn from '../../../../../data/constants/strings_en';
import { useLang } from '../../../../../data/translation';
import BannerRefonte from '../../../../components/BannerRefonte';
import TitleRefont from '../../../../components/TitleRefont';
import { useMobile } from '../../../../../service/hooks/useMobile';
export const MyAccount = (props) => {
  const { payCb, getUserById } = UserSA();
  const navigate = useNavigate();
  const { accessToken, user } = useSelector(({ auth }: any) => auth);
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState('');
  const [creditWIP, setCreditWIP] = useState(0);
  const [messageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState('');
  const { updateUser, updatePassword } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showIcons, setShowIcons] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPwd, setErroPwd] = useState(false);
  const [txtErrorMail, setTextErrorMail] = useState('');
  const [txtErrorPwd, setTxtErrorPwd] = useState('');
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [abonnementStatus, setAbonnementStatus] = useState<string>('');
  const condition = user?.role === ROLEACCOUNT.company && !user?.abonnementId;

  const { isMobile } = useMobile();
  const [values, setValues] = useState({
    email: user?.email || '',
    password: '',
    lang: '',
  });

  const { lang: currentLang } = useLang();
  const activeString = currentLang === 'fr' ? stringsFr : stringsEn;

  const handleChange = (name: string, value: any, fired: boolean) => {
    setValues({ ...values, [name]: value });
    if (name == 'email') {
      setErrorEmail(!(value !== ''));
      setEmail(value);
      setIsEditEmail(true);
    } else if (name == 'password') {
      setErroPwd(!(value !== ''));
      setPassword(value);
      setIsEdit(true);
    }
  };

  const handleConfirm = () => {
    setModalDeleteVisible(false);
    navigate('/Deletion');
    window.scrollTo(0, 0);
  };

  const checkPwd = () => !password.trim();

  const changePassword = async () => {
    if (checkPwd()) {
      setErroPwd(true);
      setTxtErrorPwd(activeString.ERROR.EMPTY_PWD);
    } else {
      setIsLoading(true);
      try {
        const response = await updatePassword(
          user?.accessToken,
          values.password
        );
        if (!response?.data?.isError) {
          setMessage(
            response?.data?.message || activeString.STATUS.PASSWORD_SUCCESS
          );
          setModalVisible(true);
        } else {
          setMessage(
            response?.data?.message || activeString.STATUS.PASSWORD_FAIL
          );
          setModalVisible(true);
        }
        setIsLoading(false);
      } catch (error) {
        setMessage(activeString.STATUS.PASSWORD_FAIL);
        setIsLoading(false);
        setModalVisible(true);
      }
    }
  };

  const handleButton = () => {
    setModalDeleteVisible(true);
  };

  const getSoldeWip = async () => {
    const response = await getUserById(user.id, accessToken);
    setCreditWIP(response?.data?.soldeWip || '0');
    getAbonnementStatus(response?.data?.abonnementId);
  };

  const handleSubscription = () => {
    navigate('/Subscription');
    window.scrollTo(0, 0);
  };

  const handleOrangePayment = () => {
    navigate('/CBScreen#top', { state: { type: 'orange' } });
    window.scrollTo(0, 0);
  };

  const handleMvolaPayment = () => {
    navigate('/CBScreen#top', { state: { type: 'mvola' } });
    window.scrollTo(0, 0);
  };

  const handleVisaPayment = () => {
    navigate('/CBScreen#top', { state: { type: 'visa' } });
    window.scrollTo(0, 0);
  };

  const getAbonnementStatus = (abonnementId: string) => {
    if (abonnementId === '643e8d24bd0b9b4dfe552f70') {
      setAbonnementStatus('Abonnement Journalier');
    } else if (abonnementId === '643e8da6bd0b9b4dfe55307d') {
      setAbonnementStatus('Abonnement Pro+');
    } else if (abonnementId === '6903247bd4a86732cb6f4f05') {
      setAbonnementStatus('Abonnement Master');
    } else if (abonnementId === '69032fe9d4a86732cb6f4f09') {
      setAbonnementStatus('Abonnement World Pro');
    }
  };

  useEffect(() => {
    getSoldeWip();
  }, []);

  return (
    <div style={styles.containers}>
      <div style={styles.mainContainer}>
        <TitleRefont
          title={activeString.DETAIL_PROFIL.MON_COMPTE}
          _customStyle={
            isMobile ? styles.titleContainerMobile : styles.titleContainer
          }
        />

        <div style={styles.innerContainer}>
          {!condition && (
            <div style={styles.subscriptionContainer}>
              <span style={styles.subscriptionText}>
                {activeString.ACCOUNT_CANDIDAT.CURRENT_SUBSCRIPTION}{' '}
                <span style={styles.subscriptionStatus}>
                  : {abonnementStatus}
                </span>
              </span>
            </div>
          )}

          <div
            style={{
              ...styles.content,
              ...(isMobile ? styles.contentMobile : styles.contentDesktop),
            }}
          >
            <div style={{ flex: 3 }}>
              {condition && (
                <span style={styles.warningText}>
                  {activeString.ACCOUNT_CANDIDAT.ABONNEMENT}
                </span>
              )}
              <span style={styles.title}>
                {`${activeString.ACCOUNT_CANDIDAT.MES_SOLDES} : ${creditWIP}`}
              </span>
            </div>
            <button
              style={styles.buttonsStylesRefonteOrange}
              onClick={() => {
                setShowIcons(!showIcons);
              }}
            >
              <span style={styles.buttonTextOrange}>
                {activeString.ACCOUNT_CANDIDAT.KREDIT}
              </span>
            </button>
          </div>

          <div
            style={{
              ...styles.formContainer,
              ...(isMobile
                ? styles.formContainerMobile
                : styles.formContainerDesktop),
            }}
          >
            <div style={[styles.inputWrap, styles.inputWrapDisabled]}>
              <InputSelect
                label={TitleLabels.profil.lang}
                name="disponibility"
                value={'fr'}
                onChange={handleChange}
                isEditable={false}
                required
                data={lang}
              />
            </div>

            <div style={[styles.inputWrap, styles.inputWrapDisabled]}>
              <InputField
                label={TitleLabels.profil.email}
                required
                name="email"
                value={user.email}
                maxLength={100}
                isEditable={false}
              />
            </div>

            <div style={styles.inputWrap}>
              <InputField
                label={TitleLabels.profil.password}
                type="password"
                value={values.password}
                name="password"
                onChange={handleChange}
                maxLength={50}
                editIcon
                changePassword={changePassword}
                edit={isEdit}
              />
            </div>
            {errorPwd && <span style={styles.errorText}>{txtErrorPwd}</span>}

            {user.role === activeString.ROLEACCOUNT.company && (
              <div style={styles.inputWrapButton}>
                <CustomButton
                  _style={styles.buttonStyles}
                  styleBtnTxt={styles.buttonTextSpecial}
                  color={COLORS.secondary}
                  onClick={handleSubscription}
                  iconStyles={styles.iconStyles}
                  title={'Paiement abonnement'}
                  icon={icons.action}
                />
              </div>
            )}

            {showIcons && (
              <div style={styles.paymentContainer}>
                <div style={styles.alignHorizontally}>
                  <button onClick={handleMvolaPayment}>
                    <img style={styles.imgStyle} src={images.mvola} />
                  </button>
                  <div style={styles.intermediate} />
                  <button onClick={handleOrangePayment}>
                    <img style={styles.imgStyle} src={images.orangeMoney} />
                  </button>
                  <div style={styles.intermediate} />
                  <button onClick={handleVisaPayment}>
                    <img style={styles.imgStyle} src={images.visa} />
                  </button>
                </div>
              </div>
            )}

            <div style={styles.actionButtonContainer}>
              <div style={styles.actionButtonWrapper}>
                <button
                  style={styles.buttonsStylesRefonteBlue}
                  onClick={handleButton}
                >
                  <span style={styles.buttonTextBlue}>
                    {activeString.ACCOUNT_CANDIDAT.SUP}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popup
        message={message}
        visible={modalVisible}
        validation={setModalVisible}
        btnTitle={'OK'}
      />
      <Popup
        message={activeString.TEXT_INFORMATIONS.ACCOUNT_DELETION}
        visible={modalDeleteVisible}
        validation={setModalDeleteVisible}
        action={handleConfirm}
        btnTitle={'Continuer'}
        cancel={true}
      />
    </div>
  );
};

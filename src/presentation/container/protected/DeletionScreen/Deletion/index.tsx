import React, { useEffect, useState } from 'react';
;
import { connect, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import CustomButton from '../../../../components/Button/button';
import { DateToddmmyyyyFormat } from '../../../../../data/factory';
import { styles } from './styles';
import globalStyle from '../../../../globalStyle/globalStyle';
import { COLORS, icons, images } from '../../../../../resources/constants';
import { UserSA } from '../../../../../service/applicatif/User.sa';
import { socketST } from '../../../../../service/technique/Socket';
import { InputField } from '../../../../components/Inputs/InputField';
import {
  ERROR,
  ROLEACCOUNT,
  DELETION} from '../../../../../data/constants/strings';
import { HttpStatus } from '../../../../../data/constants/Http-status';
import { WhiteButtons } from '../../../../components/Inputs/WhiteButtons';
import Loader from '../../../../components/Loader';
import Popup from '../../../../components/CreateCV/Popup';
import { useAuth } from '../../../../../service/redux/ducks/auth';
import { useInscription } from '../../../../../service/redux/ducks/inscription';

export const Deletion = (props) => {
  const { accessToken, user } = useSelector(({ auth }: any) => auth);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSuccesVisible, setModalSuccesVisible] = useState(false);
  const { deletionAccount } = UserSA();
  const { setRegisterStatusInitiate } = useInscription();
  const { logOut } = useAuth();
  const texteToUser =
    user?.role === ROLEACCOUNT.company ? DELETION.COMPANY : DELETION.CANDIDATE;
  const condition = user?.role === ROLEACCOUNT.company && !user?.abonnementId

  const handleChange = (name: string, value: any, fired: boolean) => {
    setPassword(value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const data = {
      password: password};
    try {
      const response = await deletionAccount(data, accessToken);
      if (
        response?.status === HttpStatus.ErrorClient ||
        response?.status === HttpStatus.BadRequest
      ) {
        setMessage(response?.data?.message);
        setIsLoading(false);
        setTimeout(() => {
          setModalVisible(true);
        }, 2000);
      } else {
        setIsLoading(false);
        setTimeout(() => {
          setModalSuccesVisible(true);
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  function deleteAllLocalStorage() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
    }
  }

  const handleLogOut = async () => {
    setIsLoading(true);
    logOut();
    deleteAllLocalStorage();
    socketST.disConnectToServer()
    try {
      await Promise.all([
        setRegisterStatusInitiate()
      ]);
    } catch (error) {
      setIsLoading(false);
    }
  };



  return (
    <div
      style={{...styles.containers, ...(condition ? styles.noSubscription : styles.withSubscription)}}>
      <div style={[styles.inputWrapButton, { marginTop: 30 }]}>
        <span style={[globalStyle.title3, { fontWeight: 'bold' }]}>{DELETION.TITLE}</span>
      </div>
      <div style={styles.inputWrapButton}>
        <span style={styles.simpleTitle}>{texteToUser}</span>
      </div>
      <div style={styles.inputWrapButton}>
        <span style={styles.textTitle}>{DELETION.AUTHENTICATION}</span>
      </div>
      <div style={styles.inputWrap}>
        <InputField
          label={'Mot de passe'}
          required
          type="password"
          value={password}
          name="password"
          typekeyboard="default"
          onChange={handleChange}
          maxLength={50}
        />
      </div>
      <div style={[styles.inputWrapButton, { marginVertical: 30 }]}>
        <CustomButton
          _style={[styles.buttonStyles, styles.deletionWarning]}
          styleBtnTxt={styles.buttonText}
          color={COLORS.secondary}
          onClick={() => handleSubmit()}
          title={DELETION.BUTTON_CONFIRM}
        />
      </div>
      <Popup
        message={message}
        visible={modalVisible}
        validation={setModalVisible}
        btnTitle="OK"
      />
      <Popup
        message={DELETION.DELETION_SUCCES}
        visible={modalSuccesVisible}
        validation={setModalSuccesVisible}
        btnTitle="ok"
        action={handleLogOut}
      />
      {isLoading && <Loader />}
    </div>
  );
};

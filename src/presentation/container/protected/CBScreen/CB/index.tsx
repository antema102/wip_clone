import React, { useEffect, useState } from 'react';
import { View, RefreshControl, BackHandler, Alert, Text } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import CustomButton from '../../../../components/Button/button';
import { DateToddmmyyyyFormat } from '../../../../../data/factory';
import { styles } from './styles';
import globalStyle from '../../../../globalStyle/globalStyle';
import MainPageHeader from '../../../../components/MainPageHeader';
import { COLORS, icons } from '../../../../../resources/constants';
import { UserSA } from '../../../../../service/applicatif/User.sa';
import { socketST } from '../../../../../service/technique/Socket';
import { InputField } from '../../../../components/Inputs/InputField';
import SidePageHeader from '../../../../components/SidePageHeader';
import Popup from '../../../../components/CreateCV/Popup';
import Loader from '../../../../components/Loader';
import { MVOLA_VALIDATION, ORANGE_TELEPHONE_VALIDATION } from '../../../../../common/utils/validation';
import TitleRefont from '../../../../components/TitleRefont';
export const CB = (props: any) => {
  const { type } = props.stateValue;
  const navigate = useNavigate();
  const { payCb, getUserById, payMvola, getTransactionMvola, payOrange } = UserSA();
  const { accessToken, user } = useSelector(({ auth }: any) => auth);
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState('');
  const [creditWIP, setCreditWIP] = useState(0);
  const [numTel, setNumTel] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorNum, setErrorNum] = useState(false);
  const [errorText, setErrorText] = useState('');
  const condition = type === 'visa' ? (!reason || !amount) : (errorNum || !reason || !amount || !numTel);

  const getSoldeWip = async () => {
    const response = await getUserById(user.id, accessToken);
    setCreditWIP(response?.data?.soldeWip || '0');
  };

  const toFormData = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== 'motif') {
        formData.append(key, data[key]);
      }
    });
    return formData;
  };

  const returnRegex = () => {
    switch (type) {
      case 'mvola':
        return MVOLA_VALIDATION
      case 'orange':
        return ORANGE_TELEPHONE_VALIDATION
      default:
        break;
    }
  };

  const postFormData = async (data: any, defaultUrl: string, defaultHeader: any) => {
    try {
      const axiosParams = {
        method: 'POST',
        headers: defaultHeader,
        url: defaultUrl,
        data,
        timeout: 800000,
        withCredentials: true,
      };
      const res = await axios({ ...axiosParams });
      return res;
    } catch (e) {
      const errors =
        e && e.response && e.response.data
          ? JSON.parse(JSON.stringify(e.response.data))
          : { error: true };
      return errors;
    }
  };

  const handleChange = (name: string, value: any) => {
    if (name === 'telephone') {
      setNumTel(value);
      if (value !== '') {
        const regex = returnRegex() || MVOLA_VALIDATION;
        if (!regex.test(value)) {
          setErrorNum(true);
          setErrorText('Veuillez insérer un numéro valide');
        } else {
          setErrorNum(false);
        }
      } else {
        setErrorNum(true);
        setErrorText('Veuillez remplir ce champ');
      }
    }
    if (name === 'montant') {
      setAmount(value);
    }
    if (name === 'motif') {
      setReason(value);
    }
  };

  const returnTitle = () => {
    switch (type) {
      case 'mvola':
        return "Mvola"
      case 'orange':
        return 'Orange money'
      case 'visa':
        return 'Carte banquaire'
      default:
        break;
    }
  };

  const handleCancel = () => {
    setAmount(0);
    setNumTel('')
    setReason('')
    setErrorNum(false);
    navigate(-1);
  };

  const handlePayment = async () => {
    if (type === 'visa') {
      const data = {
        montant: amount,
        motif: reason,
        nationality: 'MD',
      };
      const response = await payCb(data, accessToken);
      const formData = toFormData(response?.data?.data);
      const res = await postFormData(formData, response?.data.paiementUrl, {
        'Content-Type': 'multipart/form-data',
      });
      const newWindow = window.open(
        response?.data.paiementUrl,
        '_blank',
        'width=800,height=600'
      );
      window.onmessage = (message: any) => {
        if (message.data === 'close') {
          newWindow?.close();
        }
      };
      newWindow?.focus();
    } else if (type === 'mvola') {
      setMessage(
        `Veuillez confirmer la transaction envoyée vers le numéro :${numTel}`,
      );
      setIsLoading(true)
      setTimeout(() => {
        setMessageVisible(true)
      }, 5000);
      const data = {
        montant: amount,
        motif: reason,
        clientNumber: numTel,
        utilisateurId: user?.id,
        nationality: 'MD',
      };
      const response = await payMvola(data, accessToken);
      setTimeout(async () => {
        const status = await getTransactionMvola(
          accessToken,
          response?.data?.transactionId,
        );
        setIsLoading(false);
        const telmaStatus = status?.data?.status;
        if (telmaStatus === 'completed') {
          setMessage(
            `Paiement effectué avec succès. Voici la référence de votre transaction : ${status?.data?.reference}`,
          );
        } else if (telmaStatus === 'failed') {
          setMessage(
            'Échec de la transaction, vous avez inséré un mauvais code ou votre crédit est insuffisant',
          );
        } else {
          setMessage("Délai d'attente dépassé");
        }
      }, 40 * 1000);
    } else if (type === 'orange') {
      const data = {
        montant: amount,
        motif: reason,
        numero: numTel,
        nationality: 'MD',
      };
      const response = await payOrange(data, accessToken);
      const newWindow = window.open(
        `${response.data.paiementUrl}`,
        '_blank',
        'width=800,height=600'
      );
      window.onmessage = (message: any) => {
        if (message.data === 'close') {
          newWindow?.close();
        }
      };
    }
  };

  const initSocket = async () => {
    if (type === 'visa') {
      try {
        const socket = await socketST.connectToServer(accessToken);
        socket.on('cb_callback', async (data: any) => {
          const { statut, reference, currentUser } = data;
          if (statut === 'Succès') {
            const messageToShow = `Paiement effectué avec succès. Voici votre numéro de transaction : ${reference}`;
            setMessage(messageToShow);
            setCreditWIP(currentUser?.soldeWip)
            setMessageVisible(true);
          }
          if (statut === 'Echec') {
            const messageToShow =
              "Il s'est produit une erreur pendant la transaction. Veuillez vérifier votre solde et votre code.";
            setMessage(messageToShow);
            setMessageVisible(true);
          }
        });
      } catch (error) {
      }
    } else if (type === 'orange') {
      try {
        const socket = await socketST.connectToServer(accessToken);
        socket.on('orange_money_callback', async (data: any) => {
          const { statut, reference, currentUser } = data;
          if (statut === 'Succès') {
            setMessage(
              `Paiement effectué avec succès. Voici votre numéro de transaction${reference}`,
            );
            setMessageVisible(true);
          }
          if (statut === 'Echec') {
            setMessage(
              "Il s'est produit une erreur pendant la transaction. Veuillez vérifier votre solde et votre code.",
            );
            setMessageVisible(true);
          }
        });
      } catch (error) { }
    }
  };

  useEffect(() => {
    getSoldeWip()
  }, []);

  useEffect(() => {
    initSocket();
  }, []);

  return (
    <View
      style={styles.containers}>
      <TitleRefont title={`${returnTitle()}`} />
      {type !== 'visa' ? <View style={styles.inputWrap}>
        <InputField
          label="Numéro de téléphone"
          value={numTel}
          name="telephone"
          type="numeric"
          onChange={handleChange}
          isEditable={true}
        />
      </View> : null}
      {errorNum && (
        <View style={styles.errorText}>
          <Text style={{ color: COLORS.red_color }}>{errorText}</Text>
        </View>
      )}

      <View style={styles.inputWrap}>
        <InputField
          label="Montant en Ariary"
          required
          value={amount}
          name="montant"
          type="numeric"
          onChange={handleChange}
          isEditable={true}
        />
      </View>
      <View style={styles.inputWrap}>
        <InputField
          label={"Date d'effet"}
          required
          name="dateEffet"
          value={DateToddmmyyyyFormat(new Date())}
          maxLength={100}
          isEditable={false}
        />
      </View>
      <View style={styles.inputWrap}>
        <InputField
          label={'Motif'}
          required
          onChange={handleChange}
          name="motif"
          value={reason}
          isEditable={true}
        />
      </View>
      <View style={styles.submitButtons}>
        <CustomButton
          _style={styles.buttonStyles}
          styleBtnTxt={{ color: COLORS.white, fontWeight: 'bold' }}
          color={COLORS.secondary}
          onPress={() => handlePayment()}
          title="Acheter"
          isDisable={condition}
        />

        <CustomButton
          _style={styles.buttonStyles}
          styleBtnTxt={{ color: COLORS.white, fontWeight: 'bold' }}
          color={COLORS.orange}
          onPress={() => handleCancel()}
          title="Annuler"
        />
      </View>
      <Popup
        message={message}
        visible={messageVisible}
        validation={setMessageVisible}
        btnTitle="OK"
      />
      {isLoading && <Loader />}
    </View>
  );
};

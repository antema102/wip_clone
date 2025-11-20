import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';

import { useSelector } from 'react-redux';
import { styles } from './styles';
import { useNavigate } from 'react-router-dom';
import { UserSA } from '../../../../../service/applicatif/User.sa';
import { CONTACT_CANDIDAT, DETAIL_PROFIL, ENTERPRISE_INFORMATIONS, ROLEACCOUNT } from '../../../../../data/constants/strings';
import { COLORS, icons } from '../../../../../resources/constants';
import Buttons from '../../../../components/Button/button';
import globalStyle from '../../../../globalStyle/globalStyle';
import Loader from '../../../../components/Loader';
import { storeSoldeWip, usePayment } from '../../../../../service/redux/ducks/payment';
import PopupMesage from '../../../../components/CreateCV/Popup';
import Button from '../../../../components/Button/button';
import CustomModal from '../../../../components/Modal';
import { PaymentWays } from '../../../../components/PaymentWays';

interface PopupType {
  phone: number;
  receiver: { [key: string]: string };
  [key: string]: string | number | { [key: string]: string };
}


const Popup = (props: PopupType) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const [messageVisible, setMessageVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [showVisible, setShowVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken, user } = useSelector(({ auth }: any) => auth);
  const { dispatchUser } = usePayment();
  const { phone, receiver, transmitter, senderId, offerId, jobTitle, didApply } = props;
  const { sendingNotifications, payContact, checkContact, updateUserMessage, getAccessToken } = UserSA();

  const handlingPhoneNumber = async () => {
    if (phone) {
      window.open(`tel:${phone}`);
    } else {
      window.alert(
        'Information : ',
        CONTACT_CANDIDAT.NO_PHONE_PHONENUMBER,
        [{ text: ENTERPRISE_INFORMATIONS.UNDO }, { text: 'OK' }],
        { cancelable: false },
      );
    }
  };

  const condition =
    user?.abonnementId === '63d0ef142e1204452fd2f2bf' ||
    user?.role === ROLEACCOUNT.candidate;

  const action = async () => {
    setIsLoading(true);
    const response = await payContact({ price: 5000 }, accessToken);
    if (response && response.data.isError) {
      setMessage(response.data.message);
      setMessageVisible(false);
      setIsLoading(false);
      setTimeout(() => {
        setResultVisible(true);
      }, 300);
    } else {
      await dispatchUser(response?.data);
      await storeSoldeWip(response?.data?.soldeWip);
      setMessageVisible(false);
      setIsLoading(false);
      setTimeout(() => {
        setModalVisible(true);
      }, 300);
    }
  };

  const redirection = async () => {
    setResultVisible(false);
    setShowPayment(true)
  };

  const checkContactLimit = async () => {
    if (user?.abonnementId === '63d0ef142e1204452fd2f2bf') {
      const response = await checkContact(accessToken);
      setMessageVisible(response?.data === true);
      setModalVisible(response?.data === false);
    } else {
      setMessageVisible(true);
    }
  };



  const toContactTheCandidate = async () => {

    const raw = JSON.stringify({
      message: {
        token: receiver.googleToken,
        notification: {
          body: `L'entreprise : ${transmitter.name} est intéressée par votre profil pour le poste de : ${jobTitle}, veuillez cliquer pour voir plus d'informations`,
          title: CONTACT_CANDIDAT.MESSAGE_TITLE},
        data: {
          senderId: senderId,
          offerId: offerId}}
    });

    const getAccessTokenFirebase = async (token: string) => {
      try {
        const response = await getAccessToken(token);
        return response.accessToken
      }
      catch (error) {
        console.error('updateNotification error:', error);
      }
    }

    const notificationData = {
      data: {
        title: CONTACT_CANDIDAT.MESSAGE_TITLE,
        body: `L'entreprise : ${transmitter.name} est intéressée par votre profil pour le poste de : ${jobTitle}, veuillez cliquer pour voir plus d'informations`,
        userId: receiver.id,
        senderId: senderId,
        offerId: offerId,
        read: false
      }
    };

    const updateNotification = async (data: typeof notificationData) => {
      try {
        const response = await updateUserMessage(data);
        return response;
      } catch (error) {
        console.error('updateNotification error:', error);
      }
    };

    const token = await getAccessTokenFirebase(accessToken)
    const response = await sendingNotifications(raw, token)
    if (response.name) {
      updateNotification(notificationData)
      setModalVisible(false);
      setShowVisible(true);
    } else {
      updateNotification({ data: { ...notificationData.data, read: true } });
      setModalVisible(false);
      setShowVisible(true);
    }
    setMessage(CONTACT_CANDIDAT.MESSAGE_SENT);
  };

  useEffect(() => {
  }, [messageVisible]);

  return (
    <>
      <CustomModal title={"Moyen de paiement"} visible={showPayment} setVisible={setShowPayment} content={<PaymentWays />} />
      <PopupMesage
        message={ENTERPRISE_INFORMATIONS.PAYMENT_CONTACT}
        visible={messageVisible}
        validation={setMessageVisible}
        btnTitle="OK"
        cancel
        action={action}
      />
      <PopupMesage
        message={message}
        visible={resultVisible}
        validation={setResultVisible}
        btnTitle="OK"
        action={redirection}
      />
      <PopupMesage
        message={message}
        visible={showVisible}
        validation={setShowVisible}
        btnTitle="OK"
      />
      <div>
        <Dialog
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <div style={styles.centeredView}>
            <div style={styles.modalView}>
              <div
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  paddingVertical: 0,
                  justifyContent: 'center'
                }}>
                <button onClick={() => setModalVisible(!modalVisible)}>
                  <div
                    style={{
                      height: 20,
                      paddingTop: 5}}>
                    <img src={{ uri: icons.Close }} />
                  </div>
                </button>
              </div>
              <div style={{ height: 15 }} />
              <div style={styles.buttonContainer}>
                <Buttons
                  title={`Tel : ${phone ? phone : CONTACT_CANDIDAT.NO_PHONE_PHONENUMBER}`}
                  _style={[
                    styles.buttonBlueForContact
                  ]}
                  styleBtnTxt={styles.btnTxt}
                  isDisable={true}
                // onClick={handlingPhoneNumber}
                />
                <Button
                  title={DETAIL_PROFIL.MAIL_TITLE}
                  _style={[
                    styles.buttonBlueForContact,
                    globalStyle.elevationBlue,
                  ]}
                  styleBtnTxt={styles.btnTxt}
                  onClick={() => window.open(`mailto:${receiver.email}`)}
                />
                {didApply ? (
                  <Button
                    title={DETAIL_PROFIL.NOTIFICATION_TITLE}
                    _style={[
                      styles.buttonBlueForContact,
                      globalStyle.elevationBlue,
                    ]}
                    styleBtnTxt={styles.btnTxt}
                    onClick={async () => toContactTheCandidate()}
                  />
                ) : null}
                <button
                  style={[styles.buttonAnnuler]}
                  onClick={() => setModalVisible(!modalVisible)}>
                  <span style={styles.textBtnSecondary}>Annuler</span>
                </button>
              </div>
            </div>
          </div>
        </Dialog>
        <Button
          onClick={() =>
            condition ? checkContactLimit() : setModalVisible(true)
          }
          title="Contacter ce profil"
          color={COLORS.secondary}
          _style={[globalStyle.elevationOrange, styles.buttonBlue]}
          styleBtnTxt={styles.txtBtn}
        />
        {isLoading && <Loader />}
      </div>
    </>
  );
};

export default Popup;

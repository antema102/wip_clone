import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Alert, Modal, Text, Pressable, View, TouchableOpacity, Image } from "react-native";

import { styles } from './style'
import { useOfferr } from "../../../../../service/redux/ducks/offer";
import { UserSA } from "../../../../../service/applicatif/User.sa";
import { CONTACT_ENTERPRISE } from "../../../../../data/constants/strings";
import { COLORS, icons } from "../../../../../resources/constants";
import globalStyle from "../../../../globalStyle/globalStyle";
import Button from '../../../../components/Button/button';
import { useNavigate } from "react-router-dom";
import PopupMessage from '../../../../components/CreateCV/Popup';
import Loader from "../../../../components/Loader";
import { useUser } from '../../../../../service/redux/ducks/user';

const Popup = (props) => {
  const { idJob, users, idCompany, offerTitle, navigation, infoUser } = props
  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResults] = useState(0);
  const [messageVisible, setMessageVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [apply, setApply] = useState(false)
  const [textToDisplay, setTextToDisplay] = useState('Postuler');
  const { offerApply, offerDecline } = useOfferr();
  const { getUserById, sendingNotifications, updateUserMessage, getAccessToken } = UserSA();

  const [transmitter, setTransmitter] = useState<any>({});
  const [receiver, setReceiver] = useState<any>({});
  const { user, accessToken } = useSelector(({ auth }) => auth);
  const { hasMyVideo, hasMyCV } = useSelector(({ user }) => user);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const responseReceiver = await getUserById(idCompany, accessToken);
      const responseTransmitter = await getUserById(user.id, accessToken);
      setReceiver(responseReceiver?.data);
      setTransmitter(responseTransmitter?.data);
    } catch (error) {
      console.log()
    }
  }

  const shouldIapply = () => {
    if (hasMyCV && hasMyVideo) {
      setModalVisible(true);
    } else if (!hasMyCV) {
      navigate('/CreateCV', { state: { isCreate: true, isFromSearch: true } });
    } else {
      navigate('/ResumeVideoScreen', { state: { isFromSearch: true } });
    }
  };

  const setButtonText = () => {
    const resultIndex = users.findIndex(element => element._id === user.id);
    setIsLoading(true)
    if (hasMyCV && hasMyVideo) {
      if (resultIndex === -1) {
        setIsLoading(false)
        setApply(true);
        return CONTACT_ENTERPRISE.APPLY;
      } else {
        setIsLoading(false)
        setApply(false);
        return CONTACT_ENTERPRISE.RESIGN;
      }
    } else {
      setIsLoading(false)
      return CONTACT_ENTERPRISE.COMPLETE_THE_CV_FIRST;
    }
  };

  useEffect(() => {
    setTextToDisplay(setButtonText);
  }, [hasMyCV, hasMyVideo, users]);

  useEffect(() => {
    getUsers()
  }, [])

  const applyPost = async () => {
    setIsLoading(true)
    if (apply) {
      try {
        const res = await offerApply(user?.accessToken, idJob)
        if (!res.isError) {
          toContactTheEnterprise()
          setTextToDisplay(CONTACT_ENTERPRISE.RESIGN)
          setApply(false)
        }
      } catch {
        setApply(true)
      }
    }
    else {
      try {
        const res = await offerDecline(user?.accessToken, idJob)
        if (!res.isError) {
          Alert.alert(
            'Information : ',
            CONTACT_ENTERPRISE.MESSAGE_DECLINE,
            [
              { text: 'Annuler' },
              { text: 'OK' },
            ],
            { cancelable: false },
          );
          setTextToDisplay(CONTACT_ENTERPRISE.APPLY)
          setApply(true)
        }
        setModalVisible(false)
      } catch {
        setApply(false)
      }

    }
    setIsLoading(false)
  }
  const ApplyButton = ({ action, title }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => action()}
      style={styles.ContactButtonContainer}
    >
      <Text style={styles.ContactButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  const getAccessTokenFirebase = async (token: string) => {
    try {
      const response = await getAccessToken(token);
      return response.accessToken
    }
    catch (error) {
      console.error('updateNotification error:', error);
    }
  }

  const toContactTheEnterprise = async () => {
    const notificationBody = `Le candidat : ${transmitter.email} a postulé à l'offre : "${offerTitle}" que vous avez publiée récemment`;
    const raw = JSON.stringify({
      message: {
        token: infoUser.googleToken,
        notification: {
          title: CONTACT_ENTERPRISE.MESSAGE_TITLE,
          body: notificationBody,
        }
      },
    });

    const notificationData = {
      data: {
        title: CONTACT_ENTERPRISE.MESSAGE_TITLE,
        body: notificationBody,
        userId: infoUser.id,
        senderId: user.id,
        offerId: idJob,
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
    try {
      const response = await sendingNotifications(raw, token);
      setMessage(CONTACT_ENTERPRISE.MESSAGE_SENT);
      if (response.name) {
        updateNotification(notificationData)
      } else {
        updateNotification({ data: { ...notificationData.data, read: true } });
      }
    } catch (err) {
      console.error('Notification sending failed:', err);
      setMessage(CONTACT_ENTERPRISE.MESSAGE_NOT_SENT);
    }
    setModalVisible(false);
    setMessageVisible(true);
  };

  return (
    <View>
      {isLoading && <Loader />}
      <PopupMessage
        message={message}
        visible={messageVisible}
        validation={setMessageVisible}
        btnTitle="OK"
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ width: '100%', flexDirection: 'row', paddingVertical: 0, justifyContent: 'flex-end', marginTop: -10, marginRight: -10, }}>

              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <View style={{ height: 20, paddingLeft: 10, paddingTop: 5, right: 0 }}>
                  <Image source={{ uri: icons.Close }} />
                </View>
              </Pressable>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Confirmer"
                _style={[styles.buttonBlue, globalStyle.elevationBlue]}
                styleBtnTxt={styles.btnTxt}
                onPress={applyPost}
              />
              <Pressable
                style={[styles.buttonAnnuler]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textBtnSecondary}>{CONTACT_ENTERPRISE.UNDO}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View >
        <ApplyButton title={textToDisplay} size="sm" backgroundColor={COLORS.secondary} action={shouldIapply} />
      </View>

    </View >
  );
};

export default Popup

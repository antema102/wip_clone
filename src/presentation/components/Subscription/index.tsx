import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Modal, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { styles } from './styles';
import { COLORS, icons } from '../../../resources/constants';
import globalStyle from '../../globalStyle/globalStyle';
import CustomButton from '../Button/button';
import {
  ENTERPRISE_INFORMATIONS,
  ERROR,
} from '../../../data/constants/strings';
import { UserSA } from '../../../service/applicatif/User.sa';
import { useAuth } from '../../../service/redux/ducks/auth';
import Popup from '../CreateCV/Popup';
import CustomModal from '../Modal';
import { PaymentWays } from '../PaymentWays';


export const SubscriptionComponent = props => {
  const { item } = props;
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);
  const onPressDetail = () => {
    setIsShowModal(true);
  };
  const onCloseDetail = () => {
    setIsShowModal(false);
  };
  const [message, setMessage] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [status, setStatus] = useState(false);
  const { accessToken, user } = useSelector(({ auth }: any) => auth);
  const { buySubscription } = UserSA();
  const [resultVisible, setResultVisible] = useState(false);
  const [notEnoughMoney, setNotEnoughMoney] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const { updateCredentials } = useAuth();

  const handlePayment = async (id: string, price: number) => {
    const data = {
      userId: user.id,
      montant: price,
    };
    const response = await buySubscription(accessToken, data, id);
    if (response && response.data.isError) {
      setMessage(response.data.message);
      setIsShowModal(false);
      if (response.data.message === ERROR.NOT_ENOUGH_MONEY) {
        setNotEnoughMoney(true)
      } else {
        setResultVisible(true);
      }
    } else {
      setStatus(true);
      await updateCredentials(response?.data);
      setMessage(ENTERPRISE_INFORMATIONS.ABONNEMENT_SUCCES);
      setIsShowModal(false);
      setMessageVisible(true);
    }
  };

  const redirectionSucces = () => {
    navigate('/home');
  };

  const redirectionNotEnoughMoney = () => {
    setNotEnoughMoney(false);
    setTimeout(() => {
      setShowPayment(true);
    }, 300);
  };

  return (
    <View style={styles.subscriptionContainer}>
      <CustomModal title={"Moyen de paiement"} visible={showPayment} setVisible={setShowPayment} content={<PaymentWays />} />
      <Popup
        message={message}
        visible={messageVisible}
        validation={setMessageVisible}
        btnTitle="Ok"
        action={redirectionSucces}
      />
      <Popup
        message={message}
        visible={notEnoughMoney}
        validation={setNotEnoughMoney}
        btnTitle="Ok"
        action={redirectionNotEnoughMoney}
      />
      <Popup
        message={message}
        visible={resultVisible}
        validation={setResultVisible}
        btnTitle="Ok"
      />
      <Pressable onPress={null}>
        <View style={styles.subscriptionDetailsContainer}>
          <View style={styles.abonnementList}>
            <Text style={styles.subscriptionName} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={styles.description}>
              <Text
                style={styles.descriptionText}>{`${item.price} Ariary`}</Text>
            </View>
          </View>

          <View style={styles.btnBuy}>
            <CustomButton
              color={COLORS.orange}
              title="Détails"
              onPress={onPressDetail}
              _style={styles.smallButtonContainer}
              styleBtnTxt={styles.smallBtnTxt}
            />
          </View>

        </View>
      </Pressable>

      <Modal
        animationType="none"
        transparent={true}
        visible={isShowModal}
        onRequestClose={onCloseDetail}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                paddingVertical: 0,
                justifyContent: 'flex-end',
                marginTop: -20,
                paddingBottom: 5,
                marginRight: -10,
              }}>
              <Pressable onPress={onCloseDetail}>
                <View
                  style={{
                    height: 30,
                    paddingLeft: 10,
                    paddingTop: 5,
                    right: 0
                  }}>
                  <Image source={icons.Close} style={styles.icon} />
                </View>
              </Pressable>
            </View>
            <View style={{ paddingBottom: 10 }}>
              <Text style={[globalStyle.titleHome, { fontSize: 40, marginTop: 10, color: COLORS.vector_orange }]}>{item.name}</Text>
            </View>
            <View style={styles.detailSub}>
              <View style={styles.detailItem}>
                <Text style={styles.titleDetails}>Durée: </Text>
                <Text
                  style={styles.detailValue}>{` ${item.duration} jours`}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.titleDetails}>Prix: </Text>
                <Text
                  style={styles.detailValue}>{` ${item.price} Ariary`}</Text>
              </View>
              <View>
                <Text style={styles.titleDetails}>Détails: </Text>
                <Text style={styles.detailValue}>{item?.description}</Text>
              </View>
            </View>
            <View style={{ width: '60%', marginTop: 10 }}>
              <Pressable
                style={[styles.buttonAcheter]}
                onPress={() => handlePayment(item?.id, item?.price)}>
                <Text style={styles.textBtnSecondary}>Acheter l'offre</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

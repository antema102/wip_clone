import React, {useState, useEffect} from 'react';
import { Dialog } from 'primereact/dialog';

import {useSelector} from 'react-redux';

import {styles} from './styles';
import { COLORS, icons } from '../../../resources/constants';
import globalStyle from '../../globalStyle/globalStyle';
import CustomButton from '../Button/button';
import {
  ENTERPRISE_INFORMATIONS
} from '../../../data/constants/strings';
import { UserSA } from '../../../service/applicatif/User.sa';
import { useAuth } from '../../../service/redux/ducks/auth';
import Popup from '../CreateCV/Popup';

export const SubscriptionComponent = props => {
  const {item} = props;
  const [isShowsetIsShowModal] = useState(false);
  const onPressDetail = () => {
    setIsShowModal(true);
  };
  const onCloseDetail = () => {
    setIsShowModal(false);
  };
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(false);
  const {accessToken, user} = useSelector(({auth}: any) => auth);
  const {buySubscription} = UserSA();
  const [resultVisible, setResultVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const {updateCredentials} = useAuth();

  const handlePayment = async (id: string, price: number) => {
    const data = {
      userId: user.id,
      montant: price};
    const response = await buySubscription(accessToken, data, id);
    if (response && response.data.isError) {
      setMessage(response.data.message);
      setIsShowModal(false);
      setMessageVisible(true);
    } else {
      setStatus(true);
      await updateCredentials(response?.data);
      setMessage(ENTERPRISE_INFORMATIONS.ABONNEMENT_SUCCES);
      setIsShowModal(false);
      setMessageVisible(true);
    }
  };

  return (
    <div style={styles.subscriptionContainer}>
        <Popup
          message={message}
          visible={messageVisible}
          validation={setMessageVisible}
          btnTitle="Ok"
        />
      <button onClick={null}>
        <div style={styles.subscriptionDetailsContainer}>
          <div style={styles.abonnementList}>
            <span style={styles.subscriptionName} numberOfLines={2}>
              {item.name}
            </span>
            <div style={styles.description}>
              <span
                style={styles.descriptionText}>{`${item.price} Ariary`}</span>
            </div>
          </div>
          <div style={styles.btnBuy}>
            <CustomButton
              color={COLORS.orange}
              title="Détails"
              onClick={onPressDetail}
              _style={styles.smallButtonContainer}
              styleBtnTxt={styles.smallBtnTxt}
            />
          </div>
        </div>
      </button>
      <Dialog
        animationType="none"
        transparent={true}
        visible={isShowModal}
        onRequestClose={onCloseDetail}>
        <div style={styles.centeredView}>
          <div style={styles.modalView}>
            <div
              style={{
                width: '100%',
                flexDirection: 'row',
                paddingVertical: 0,
                justifyContent: 'flex-end',
                marginTop: -20,
                paddingBottom: 5,
                marginRight: -10}}>
              <button onClick={onCloseDetail}>
                <div
                  style={{
                    height: 30,
                    paddingLeft: 10,
                    paddingTop: 5,
                    right: 0
                  }}>
                 <img src={icons.Close} style={styles.icon}  />
                </div>
              </button>
            </div>
            <div style={{paddingBottom: 10}}>
              <span style={[globalStyle.titleHome, {fontSize: 40, marginTop: 10}]}>{item.name}</span>
            </div>
            <div style={styles.detailSub}>
              <div style={styles.detailItem}>
                <span style={styles.titleDetails}>Durée: </span>
                <span
                  style={styles.detailValue}>{` ${item.duration} jours`}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.titleDetails}>Prix: </span>
                <span
                  style={styles.detailValue}>{` ${item.price} Ariary`}</span>
              </div>
              <div>
                <span style={styles.titleDetails}>Détails: </span>
                <span style={styles.detailValue}>{item?.description}</span>
              </div>
            </div>
            <div style={{width: '60%', marginTop: 10}}>
              <button
                style={[styles.buttonAcheter]}
                onClick={() => handlePayment(item?.id, item?.price)}>
                <span style={styles.textBtnSecondary}>Acheter l'offre</span>
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

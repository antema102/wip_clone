import React from 'react';
import { Modal, Text, Pressable, View, BackHandler } from 'react-native';
import CustomBtn from '../../Button/button';
import { useInscription } from '../../../../service/redux/ducks/inscription';
import { useAuth } from '../../../../service/redux/ducks/auth';
import { setTokenStatus } from '../../../../service/redux/ducks/app';
import store from '../../../../service/store';
import { COLORS } from '../../../../resources/constants';
import styles from './styles';

interface PopupProps {
  message?: string;
  visible?: boolean;
  validation?: any;
  btnTitle: string;
  navigation?: any;
  navigateTo?: string;
  cancel?: boolean;
  navigationParams?: any;
  expired?: any;
  advertisementOK?: boolean;
  isFormation?: boolean;
  handleCancelFormation?: any;
  isBuyCredit?: boolean;
  action?: any;
  advertisementOKAds?: boolean;
}

const Popup = (props: PopupProps) => {
  const { logOut } = useAuth();
  const { setRegisterStatusInitiate } = useInscription();

  const {
    message,
    visible,
    validation,
    btnTitle,
    navigation,
    navigateTo,
    cancel,
    navigationParams,
    expired,
    advertisementOK,
    isFormation,
    handleCancelFormation,
    isBuyCredit,
    action,
    advertisementOKAds,
  } = props;

  const handleExpiredToken = async () => {
    store.dispatch(setTokenStatus(false));
    validation(false)
    try {
      await logOut();
      await setRegisterStatusInitiate();
    } catch (error) { }
  };

  const handleValidation = () => {
    if (!action) {
      validation(!visible);
      if (navigation && navigateTo) {
        if (advertisementOKAds) {
          navigation(navigateTo, { state: { newData: true } });
          setTimeout(() => window.location.reload(), 50);
        } else if (advertisementOK) {
          navigation(navigateTo, { state: { newData: true } });
        } else if (isFormation) {
          navigation(navigateTo, { state: { isFormation: true } });
        } else if (isBuyCredit) {
          navigation(navigateTo);
        } else {
          navigation(navigateTo, { state: navigationParams });
        }
      }
      if (navigateTo && navigateTo === 'BackHandler') {
        BackHandler.exitApp();
      }
    } else {
      action();
    }
  };

  const handleCancel = () =>
    isFormation ? handleCancelFormation() : validation(!visible);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={handleCancel}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <View style={styles.buttonContainer}>
              <CustomBtn
                _style={styles.buttonStyles}
                styleBtnTxt={{ color: COLORS.white }}
                color={COLORS.secondary}
                onPress={expired ? handleExpiredToken : handleValidation}
                title={btnTitle}
              />
              {cancel && (
                <CustomBtn
                  _style={styles.buttonStyles}
                  styleBtnTxt={{ color: COLORS.white }}
                  color={COLORS.orange}
                  onPress={handleCancel}
                  title={'Annuler'}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Popup;

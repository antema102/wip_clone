import React from 'react';
import { Dialog } from 'primereact/dialog';

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
    advertisementOKAds} = props;

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
    <div style={styles.centeredView}>
      <Dialog
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={handleCancel}>
        <div style={styles.centeredView}>
          <div style={styles.modalView}>
            <span style={styles.modalText}>{message}</span>
            <div style={styles.buttonContainer}>
              <CustomBtn
                _style={styles.buttonStyles}
                styleBtnTxt={{ color: COLORS.white }}
                color={COLORS.secondary}
                onClick={expired ? handleExpiredToken : handleValidation}
                title={btnTitle}
              />
              {cancel && (
                <CustomBtn
                  _style={styles.buttonStyles}
                  styleBtnTxt={{ color: COLORS.white }}
                  color={COLORS.orange}
                  onClick={handleCancel}
                  title={'Annuler'}
                />
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Popup;

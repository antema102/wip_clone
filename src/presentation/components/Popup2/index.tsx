import React from 'react';
import { Dialog } from 'primereact/dialog';

import CustomBtn from '../Button/button';
import styles from './styles';
import { COLORS } from '../../../resources/constants';

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
}

const Popup = (props: PopupProps) => {
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
    action} = props;

  const handleValidation = () => {
    if (!action) {
      validation(!visible);
    } else {
      action();
    }
  };

  const handleCancel = () => validation(!visible);

  return (
    <div style={styles.centeredView}>
      <Dialog
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={handleCancel}
      >
        <div style={styles.centeredView}>
          <div style={styles.modalView}>
            <span style={styles.modalText}>{message}</span>
            <div style={styles.buttonContainer}>
              <CustomBtn
                _style={styles.buttonStyles}
                styleBtnTxt={{ color: COLORS.white }}
                color={COLORS.secondary}
                onClick={handleValidation}
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

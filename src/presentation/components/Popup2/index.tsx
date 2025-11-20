import React from 'react';
import { Modal, Text, Pressable, View, BackHandler } from 'react-native';
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
    action,
  } = props;

  const handleValidation = () => {
    if (!action) {
      validation(!visible);
    } else {
      action();
    }
  };

  const handleCancel = () => validation(!visible);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={handleCancel}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <View style={styles.buttonContainer}>
              <CustomBtn
                _style={styles.buttonStyles}
                styleBtnTxt={{ color: COLORS.white }}
                color={COLORS.secondary}
                onPress={handleValidation}
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

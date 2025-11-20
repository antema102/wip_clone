import React from 'react';
import {Modal, View } from 'react-native';
import CustomBtn from '../Button/button';
import styles from './styles';
import { COLORS } from '../../../resources/constants';


interface Props {
  visible?: boolean;
  onClose?: any;
  children?: any;
  cancel?: any;
  validation?: any;
  btnTitle?: any;
  closeTitle?: string;
}

const Popup = ({
  visible,
  onClose,
  children,
  cancel,
  validation,
  btnTitle = 'Valider',
  closeTitle = 'Fermer'
}: Props) => {

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent
        visible={visible}
        onRequestClose={() => {
          onClose(!visible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            { children }
            <View style={{flexDirection: 'row', marginTop: 20}}>
              { validation ? 
              <CustomBtn
                _style={[styles.buttonStyles, {marginRight: 20}]}
                styleBtnTxt={{color: COLORS.white}}
                color={COLORS.secondary}
                onPress={validation}
                title={btnTitle}
              /> : null }
              
              { cancel ? 
              <CustomBtn
                _style={styles.buttonStyles}
                styleBtnTxt={{color: COLORS.white}}
                color={COLORS.secondary}
                onPress={() => onClose(false)}
                title={closeTitle}
              /> : null }
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Popup;

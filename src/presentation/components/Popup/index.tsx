import React from 'react';
import { Dialog } from 'primereact/dialog';

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

const Popup = {
  visible,
  onClose,
  children,
  cancel,
  validation,
  btnTitle = 'Valider',
  closeTitle = 'Fermer'
}: Props) => {

  return (
    <div style={styles.centeredView}>
      <Dialog
        animationType="none"
        transparent
        visible={visible}
        onRequestClose={() => {
          onClose(!visible);
        }}>
        <div style={styles.centeredView}>
          <div style={styles.modalView}>
            { children }
            <div style={{flexDirection: 'row', marginTop: 20}}>
              { validation ? 
              <CustomBtn
                _style={[styles.buttonStyles, {marginRight: 20}]}
                styleBtnTxt={{color: COLORS.white}}
                color={COLORS.secondary}
                onClick={validation}
                title={btnTitle}
              /> : null }
              
              { cancel ? 
              <CustomBtn
                _style={styles.buttonStyles}
                styleBtnTxt={{color: COLORS.white}}
                color={COLORS.secondary}
                onClick={() => onClose(false)}
                title={closeTitle}
              /> : null }
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Popup;

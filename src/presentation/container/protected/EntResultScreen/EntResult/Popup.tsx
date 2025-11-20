import React, { useState } from 'react';

import styles from './styles';
import globalStyle from '../../../../globalStyle/globalStyle';
import { icons } from '../../../../../resources/constants';
import { DETAIL_PROFIL } from '../../../../../data/constants/strings';
import Button from '../../../../components/Button/button';

const Popup = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { web, email, compatibility, phone } = props;

  const ContactButton = ({ title }) => (
    <button
      activeOpacity={0.8}
      onClick={() =>
        setTimeout(() => {
          setModalVisible(true);
        }, 300)
      }
      style={[styles.ContactButtonContainer, globalStyle.elevationBlue]}
    >
      <span style={styles.ContactButtonText}>{title}</span>
    </button>
  );
  return (
    <div>
      <Dialog
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <div style={styles.centeredView}>
          <div style={styles.modalView}>
            <div
              style={{
                width: '100%',
                flexDirection: 'row',
                paddingVertical: 0,
                justifyContent: 'flex-end',
                marginTop: -10,
                marginRight: -10,
              }}
            >
              <button
                onClick={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <div
                  style={{
                    height: 20,
                    paddingLeft: 10,
                    paddingTop: 5,
                    right: 0,
                  }}
                >
                  <img src={icons.Close} />
                </div>
              </button>
            </div>
            <div style={{ height: 15 }}></div>
            <div style={styles.buttonContainer}>
              {phone ? (
                <Button
                  title={`Tel : ${phone}`}
                  _style={[styles.buttonBlue, globalStyle.elevationBlue]}
                  styleBtnTxt={styles.btnTxt}
                  size=""
                  isDisable={true}
                />
              ) : null}
              <Button
                title={DETAIL_PROFIL.MAIL_TITLE}
                _style={[styles.buttonBlue, globalStyle.elevationBlue]}
                styleBtnTxt={styles.btnTxt}
                size=""
                onClick={() => window.open(`mailto:${email}`)}
              />

              <Button
                title={DETAIL_PROFIL.WEB_TITLE}
                _style={[styles.buttonBlue, globalStyle.elevationBlue]}
                styleBtnTxt={styles.btnTxt}
                size=""
                onClick={() => window.open(`https://${web}`)}
              />
              <button
                style={[styles.buttonAnnuler]}
                onClick={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <span style={styles.textBtnSecondary}>Annuler</span>
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <div style={styles.containerAreaButton}>
        <div style={styles.ButtonBloc}>
          <div style={styles.screenContainer}>
            <ContactButton
              title="Contacter l'entreprise"
              size=""
              backgroundColor="#01129E"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;

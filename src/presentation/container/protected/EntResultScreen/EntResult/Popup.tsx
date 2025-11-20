import React, { useState } from "react";
import { Modal, Text, Pressable, View, Linking, TouchableOpacity, Image } from "react-native";
import styles from './styles'
import globalStyle from "../../../../globalStyle/globalStyle";
import { icons } from "../../../../../resources/constants";
import { DETAIL_PROFIL } from "../../../../../data/constants/strings";
import Button from '../../../../components/Button/button';



const Popup = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { web, email, compatibility, phone } = props

  const ContactButton = ({ title }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setTimeout(() => {
        setModalVisible(true);
      }, 300)}
      style={[styles.ContactButtonContainer, globalStyle.elevationBlue]}>
      <Text style={styles.ContactButtonText}>{title}</Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ width: '100%', flexDirection: 'row', paddingVertical: 0, justifyContent: 'flex-end', marginTop: -10, marginRight: -10, }}>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
              >
                <View style={{ height: 20, paddingLeft: 10, paddingTop: 5, right: 0 }}>
                  <Image source={icons.Close} />
                </View>
              </Pressable>
            </View>
            <View style={{ height: 15 }}></View>
            <View style={styles.buttonContainer}>
              {phone ? <Button
                title={`Tel : ${phone}`}
                _style={[styles.buttonBlue, globalStyle.elevationBlue]}
                styleBtnTxt={styles.btnTxt}
                size=""
                isDisable={true}
              /> : null}
              <Button
                title={DETAIL_PROFIL.MAIL_TITLE}
                _style={[styles.buttonBlue, globalStyle.elevationBlue]}
                styleBtnTxt={styles.btnTxt}
                size=""
                onPress={() => Linking.openURL(`mailto:${email}`)}
              />

              <Button
                title={DETAIL_PROFIL.WEB_TITLE}
                _style={[styles.buttonBlue, globalStyle.elevationBlue]}
                styleBtnTxt={styles.btnTxt}
                size=""
                onPress={() => Linking.openURL(`https://${web}`)}
              />
              <Pressable
                style={[styles.buttonAnnuler]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textBtnSecondary}>Annuler</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.containerAreaButton}>
        <View style={styles.ButtonBloc}>
          <View style={styles.screenContainer}>
            <ContactButton
              title="Contacter l'entreprise"
              size=""
              backgroundColor="#01129E"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Popup
import React, {useEffect} from 'react';
import {Modal, Text, ActivityIndicator, View} from 'react-native';
import styles from './styles';
import { COLORS } from '../../../../resources/constants';

export const Loader = () => {
  return (
    <View style={styles.centeredView}>
      <Modal transparent={true} visible={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Loader;

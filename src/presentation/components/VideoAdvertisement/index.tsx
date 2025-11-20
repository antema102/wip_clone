import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, View, Image, Modal, Pressable } from 'react-native'
import { images, icons } from '../../../resources/constants';
import styles from './styles';
import './styles.css';

interface Props {
  visible: any;
  setVisible: any,
  showQuit?: boolean,
  filePath: any,
  link: any,
  setShowQuitVideo: any,
}

const VideoAdvertisement = ({
  visible,
  setVisible,
  showQuit,
  filePath,
  link,
  setShowQuitVideo
}: Props) => {
  const handleQuit = () => {
    setVisible(false);
    setShowQuitVideo(false);
  }

  const redirectToExternalLink = () => {
    if (link) {
      const newTab = window.open(`https://${link}`, '_blank');
      newTab.focus();
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={handleQuit}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {showQuit && (
              <View
                style={styles.iconClose}>
                <Pressable onPress={handleQuit}>
                  <View
                    style={{
                      height: 20,
                      paddingLeft: 10,
                      paddingTop: 5,
                      paddingRight: 20,
                      right: 0,
                    }}>
                    <Image source={icons.Close} style={{ tintColor: 'white', height: 20, width: 20 }} />
                  </View>
                </Pressable>
              </View>
            )}
            <View style={styles.container}>
               <video onClick={() => redirectToExternalLink()} width={'100%'} height={'100%'} controls style={styles.videoShape}>
                    <source src={filePath} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VideoAdvertisement;
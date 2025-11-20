import React, { Fragment, useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';

import { images, icons } from '../../../resources/constants';
import styles from './styles';
import './styles.css';

interface Props {
  visible: any;
  setVisible: any,
  showQuit?: boolean,
  filePath: any,
  link: any,
  setShowQuitVideo: any}

const VideoAdvertisement = {
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
    <div style={styles.centeredView}>
      <Dialog
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={handleQuit}>
        <div style={styles.centeredView}>
          <div style={styles.modalView}>
            {showQuit && (
              <div
                style={styles.iconClose}>
                <button onClick={handleQuit}>
                  <div
                    style={{
                      height: 20,
                      paddingLeft: 10,
                      paddingTop: 5,
                      paddingRight: 20,
                      right: 0}}>
                    <img src={icons.Close} style={{ tintColor: 'white', height: 20, width: 20 }} />
                  </div>
                </button>
              </div>
            )}
            <div style={styles.container}>
               <video onClick={() => redirectToExternalLink()} width={'100%'} height={'100%'} controls style={styles.videoShape}>
                    <source src={filePath} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default VideoAdvertisement;
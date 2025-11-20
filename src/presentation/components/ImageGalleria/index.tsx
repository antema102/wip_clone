import React, { Fragment, useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';

import { Galleria } from 'primereact/galleria';
import { images, icons } from '../../../resources/constants';
import { adjustingImage } from '../../globalStyle/responsive';
import styles from './styles';
import './styles.css';


interface data {
  img: string;
  alt: string;
  link?: string
}

interface Props {
  visible: any;
  setVisible: any,
  showQuit?: boolean,
  data: any,
  firstItem: number}

const ImageGalleria = {
  visible,
  setVisible,
  showQuit,
  data,
  firstItem}: Props) => {
  const imageHeight = adjustingImage(60);
  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  const redirectToExternalLink = (item: data) => {
    if (item?.link) {
      const newTab = window.open(`https://${item?.link}`, '_blank');
      newTab?.focus();
    }
  };

  const itemTemplate = (item: data) => {
    return <img src={item.img} alt={item.alt} onClick={() => redirectToExternalLink(item)} style={{ display: 'contain', width: '100%', height: imageHeight, cursor: 'pointer' }} />;
  }

  const thumbnailTemplate = (item: data) => {
    return (
      <img src={item.img} alt={item.alt} style={{ display: 'block', width: 50, height: 50 }} />
    )
  }

  const caption = (item: { title: string, alt: string }) => {
    return (
      <React.Fragment>
        <span style={styles.name} numberOfLines={2}>
          {item.title}
        </span>
        <span
          style={styles.descriptionText}>{item.alt}</span>
      </React.Fragment>
    );
  }

  const handleQuit = () => {
    setVisible(false)
  }

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
                      marginTop: -10,
                      paddingRight: 20,
                      right: 0}}>
                    <img src={{ uri: icons.Close }} style={{ tintColor: 'white', height: 20, width: 20 }} />
                  </div>
                </button>
              </div>
            )}
            <div style={styles.container}>
              <Galleria value={data} responsiveOptions={responsiveOptions} numVisible={3} showIndicators={true}
                item={itemTemplate} thumbnail={thumbnailTemplate} caption={caption} style={{}} autoPlay={true} transitionInterval={5000} circular={true} activeIndex={firstItem} />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ImageGalleria;
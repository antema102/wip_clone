import React, {isValidElement, useEffect, useState} from 'react';

import {Header} from '../../../components/Header';

import CustomButton from '../../../components/Button/button';

import {HOME} from '../../../../data/constants/strings';
import styles from '../styles';
import {globalStyle} from '../../../globalStyle';
import {useFocusEffect} from '@react-navigation/native';
import {COLORS, icons, images, SIZES} from '../../../resources/constants';

import {useSelector} from 'react-redux';

const LOCAL_DATA = 'localEvents';
const IntermediateCv = (props: any) => {
  const {navigation} = props;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      // BackHandler removed (web)

      return () =>
        // BackHandler removed (web)
    }, []),
  );

  return (
    <div style={{backgroundColor: '#fff'}}>
      <Header {...props} noback={true} style={{elevation: 2}} />
      <div style={styles.containerTitle}>
        <span style={styles.titleItem}>Mon CV</span>
      </div>
      <div>
        <span style={globalStyle.titleHome}>{'Pour commencer, veuillez'}</span>
      </div>
      <div style={globalStyle.btnContainer}>
        <CustomButton
          onClick={() => navigation.navigate('CreateCV', {isCreate: true})}
          title={HOME.PARCOURS}
          _style={[globalStyle.elevationBlue, styles.buttonHomeActionsaisir]}
          color={'red'}
          icon={icons.filetext}
          styleBtnTxt={styles.bigBtnTxt}
        />
      </div>
    </div>
  );
};
export const IntermediateCvScreen: any = IntermediateCv;

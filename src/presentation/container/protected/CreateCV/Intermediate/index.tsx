import React, {isValidElement, useEffect, useState} from 'react';
import {View, BackHandler, Text} from 'react-native';
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
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <View style={{backgroundColor: '#fff'}}>
      <Header {...props} noback={true} style={{elevation: 2}} />
      <View style={styles.containerTitle}>
        <Text style={styles.titleItem}>Mon CV</Text>
      </View>
      <View>
        <Text style={globalStyle.titleHome}>{'Pour commencer, veuillez'}</Text>
      </View>
      <View style={globalStyle.btnContainer}>
        <CustomButton
          onPress={() => navigation.navigate('CreateCV', {isCreate: true})}
          title={HOME.PARCOURS}
          _style={[globalStyle.elevationBlue, styles.buttonHomeActionsaisir]}
          color={'red'}
          icon={icons.filetext}
          styleBtnTxt={styles.bigBtnTxt}
        />
      </View>
    </View>
  );
};
export const IntermediateCvScreen: any = IntermediateCv;

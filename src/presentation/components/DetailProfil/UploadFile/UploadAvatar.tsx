import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';

import { DETAIL_PROFIL } from '../../../../data/constants/strings';
import Popup from '../../CreateCV/Popup';
import Loader from '../../Loader';
import { ErrorCode } from '../../../../data/constants/errorCode';
import { styles } from './styles';
import { UploadFileService } from '../../../../service/applicatif/UploadFile.sa';
import { icons, images } from '../../../../resources/constants';
import * as stringsEn from '../../../../data/constants/strings_en';
import * as stringsFr from '../../../../data/constants/strings';
import { useLang } from '../../../../data/translation';
import { useSelector } from 'react-redux';

type UploadProps = {
  value: string;
  onChange?: any;
  style?: Record<string, any>;
  isChangeable?: boolean;
};

export default ({ value, onChange, style, isChangeable }: UploadProps) => {
  const { uploadImage } = UploadFileService();
  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;
  const [isLoading, setIsLoading] = useState(false);
  const { sessionID } = useSelector(({ user }) => user);

  const [popupData, setPopupData] = useState({
    message: '',
    isVisible: false,
  });
  const setPopupVisible = (value: boolean) => {
    setTimeout(() => {
      setPopupData({ ...popupData, isVisible: value });
    }, 300);
  };

  const handleChangeAvatar = async (dataToSend?: string[]) => {
    if (dataToSend !== null) {
      await uploadImage(dataToSend, sessionID);
      setIsLoading(false);
      setTimeout(() => {
        setPopupData({
          message: activeString.DETAIL_PROFIL.SUCCESS_UPLOAD,
          isVisible: true,
        });
      }, 300);
    } else {
      setTimeout(() => {
        setPopupData({ message: activeString.DETAIL_PROFIL.CHOOSE_IMAGE, isVisible: true });
      }, 300);
    }
  };

  const chooseFile = async (type: string) => {
    const options = {
      mediaType: type,
      maxWidth: 1000,
      maxHeight: 1000,
    };
    try {
      // const response: any = await launchImageLibrary(options);
      const response: any = null;
      if (response.didCancel) {
        return;
      } else if (response.errorCode === ErrorCode.cameraUnavailable) {
        setTimeout(() => {
          setPopupData({
            message: activeString.DETAIL_PROFIL.CAMERA_UNAVAILABLE,
            isVisible: true,
          });
        }, 300);
        return;
      } else if (response.errorCode === ErrorCode.cameraPermission) {
        setTimeout(() => {
          setPopupData({ message: activeString.DETAIL_PROFIL.PERMISSION, isVisible: true });
        }, 300);
        return;
      } else if (response.errorCode === ErrorCode.others) {
        setTimeout(() => {
          setPopupData({ message: response.errorMessage, isVisible: true });
        }, 300);
        return;
      } else {
        const responseAvatar = response?.assets[0];
        setIsLoading(true);
        onChange(responseAvatar?.uri);
        handleChangeAvatar(responseAvatar);
      }
    } catch (exception) { }
  };

  return (
    <>
      {typeof onChange === 'function' ? (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Image
            source={value ? { uri: value } : { uri: images.avatar_6 }}
            style={[styles.imageStyle, style]}
          />
          {isChangeable && (
            <View style={styles.badgeContainer}>
              <Image
                style={styles.badgeIcon}
                source={{ uri: icons.camera }}
              />
            </View>
          )}
          <Popup
            message={popupData.message}
            visible={popupData.isVisible}
            validation={setPopupVisible}
            btnTitle="Ok"
          />
        </TouchableOpacity>
      ) : (
        <View>
          <Image
            source={value ? { uri: value } : { uri: images.avatar_6 }}
            style={[styles.imageStyle, style]}
          />
        </View>
      )}
      {isLoading ? <Loader /> : null}
    </>
  );
};

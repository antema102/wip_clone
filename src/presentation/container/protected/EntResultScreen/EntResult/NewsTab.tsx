import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';

import Popup from './Popup';
import styles from './styles';
import VideoPlayer from '../../../../components/VideoPlayer';
import Loader from '../../../../components/Loader';
import calendar from '../../../../../resources/assets/icons/calendar.png';
import map from '../../../../../resources/assets/icons/map.png';
import globe from '../../../../../resources/assets/icons/globe.png';
import mail from '../../../../../resources/assets/icons/mail.png';
import { UserSA } from '../../../../../service/applicatif/User.sa';

export const NewsTab = props => {
  const [information, setInformation] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const { companyId, ItemDetail, compatibility } = props?.stateValue || {};
  const id = companyId || ItemDetail?.idSender;
  const { accessToken } = useSelector(({ auth }) => auth);
  const [progressBar, setProgressBar] = useState(0);
  const [filePath, setFilePath] = useState('');
  const { getUserById, displayUserVideoPresentation } = UserSA();

  const getUser = async () => {
    const res = await getUserById(id, accessToken);
    if (res.isError) {
      setIsLoading(false);
    } else {
      setInformation(res.data);
      setIsLoading(false);
    }
  };


  const displayVideo = async () => {
    const response = await displayUserVideoPresentation(
      id,
      accessToken,
      setProgressBar,
      'presentationEntreprise'
    );
    if (response) {
      setFilePath(response);
    }
  };

  useEffect(() => {
    getUser();
    displayVideo();
  }, []);
  return (
    <View style={styles.pageContainer}>
      <View style={styles.itemWrapper}>
        <Image
          style={styles.iconActus}
          source={calendar}
        />
        <Text style={styles.valueActus} numberOfLines={2}>
          Depuis {information?.yearOfCreation}
        </Text>
      </View>
      <View style={styles.itemWrapper}>
        <Image
          style={styles.iconActus}
          source={map}
        />
        <Text style={styles.valueActus} numberOfLines={2}>
          {information?.headQuarter}
        </Text>
      </View>
      <View style={styles.itemWrapper}>
        <Image
          style={styles.iconActus}
          source={globe}
        />
        <Text style={styles.valueActus} numberOfLines={2}>
          {information?.url}
        </Text>
      </View>
      <View style={styles.itemWrapper}>
        <Image
          style={styles.iconActus}
          source={mail}
        />
        <Text style={styles.valueActus} numberOfLines={2}>
          {information?.email}
        </Text>
      </View>

      {
      filePath !== '' ? (
        <View style={styles.candidateExpContainer}>
          <VideoPlayer filePath={filePath} poster={'https://i.picsum.photos/id/866/1600/900.jpg'} />
        </View>
      )
        : null
      }
      <Popup
        email={information?.email}
        web={information?.url}
        compatibility={compatibility}
        phone={information?.phone}
      />
      {isLoading && <Loader />}
    </View>
  );
};

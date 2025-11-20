import React, { useState, useEffect } from 'react';
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
export const NewsTab = (props) => {
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
    <div style={styles.pageContainer}>
      <div style={styles.itemWrapper}>
        <img style={styles.iconActus} src={calendar} />
        <span style={styles.valueActus} numberOfLines={2}>
          Depuis {information?.yearOfCreation}
        </span>
      </div>
      <div style={styles.itemWrapper}>
        <img style={styles.iconActus} src={map} />
        <span style={styles.valueActus} numberOfLines={2}>
          {information?.headQuarter}
        </span>
      </div>
      <div style={styles.itemWrapper}>
        <img style={styles.iconActus} src={globe} />
        <span style={styles.valueActus} numberOfLines={2}>
          {information?.url}
        </span>
      </div>
      <div style={styles.itemWrapper}>
        <img style={styles.iconActus} src={mail} />
        <span style={styles.valueActus} numberOfLines={2}>
          {information?.email}
        </span>
      </div>

      {filePath !== '' ? (
        <div style={styles.candidateExpContainer}>
          <VideoPlayer
            filePath={filePath}
            poster={'https://i.picsum.photos/id/866/1600/900.jpg'}
          />
        </div>
      ) : null}
      <Popup
        email={information?.email}
        web={information?.url}
        compatibility={compatibility}
        phone={information?.phone}
      />
      {isLoading && <Loader />}
    </div>
  );
};

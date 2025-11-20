import React, { useEffect, useState } from 'react';
;
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { styles } from './styles';
import NotificationItem from '../../../../components/NotificationItem';
import { UserSA } from '../../../../../service/applicatif/User.sa';
import { COLORS, images } from '../../../../../resources/constants';
import SidePageHeader from '../../../../components/SidePageHeader';
import { CONTACT_CANDIDAT, ROLEACCOUNT } from '../../../../../data/constants/strings';
import MainPageHeader from '../../../../components/MainPageHeader';
import * as stringsFr from '../../../../../data/constants/strings';
import * as stringsEn from '../../../../../data/constants/strings_en';
import { useLang } from '../../../../../data/translation';
import MiniLoader from '../../../../components/MiniLoader';
import TitleRefont from '../../../../components/TitleRefont';

export const Notification = (props: any) => {
  const { route } = props;
  const navigate = useNavigate();
  const [notificationsList, setNotificationsList] = useState();
  const { getUserMessage, updateMessageCount } = UserSA();
  const { accessToken, user } = useSelector(({ auth }: any) => auth);
  const [loading, setLoading] = useState(true);
  const { notifications } = useSelector(({ user }) => user);

  const getAllNotifications = async () => {
    const response = await getUserMessage(user?.id, accessToken);
    setNotificationsList(response.data.items);
    setLoading(false)
  };

  const getUpdateMessageCount = async () => {
    await updateMessageCount(user?.id);
  }

  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;

  const displayDetail = (ItemDetail: any) => {
    if (user?.role === activeString.ROLEACCOUNT.candidate) {
      navigate('/EnterpriseOfferDetailsScreen', {
        state: {
          id: ItemDetail.offerId,
          candidat: true}
      })
    } else {
      navigate('/CandidatDetailScreen', {
        state: {
          id: ItemDetail.cvId,
          candidatId: ItemDetail.senderId,
          offerId: ItemDetail.offerId}
      });
    }
  };

  useEffect(() => {
    getAllNotifications();
  }, [notifications]);


  useEffect(() => {
    getUpdateMessageCount();
  }, []);

  if (loading) {
    return (<MiniLoader CustomStyle={{ position: 'fixed' }} />)
  }

  return (
    <div
      style={styles.containers}>
      {notificationsList?.length === 0 ? <>
        <div style={styles.container_no_notification}>
          <TitleRefont title={activeString.CONTACT_CANDIDAT.NOTIFICATION_TITLE} />
          <div style={styles.contentImage}>
            <img
              src={images.noNotification}
              style={styles.imagesDimension}
            />
            <div>
              <span style={styles.textContent}>
                {activeString.CONTACT_CANDIDAT.ZERO_NOTIFICATION_TEXT}</span>
            </div>
          </div>
        </div>
      </>
        :
        <div style={styles.itemList}>
          {notificationsList &&
            <div
              data={notificationsList}
              renderItem={({ item }) =>
                <NotificationItem item={item} displayDetail={displayDetail} />
              }
              keyExtractor={item => item.id}
            />}
        </div>}
    </div>
  );
};

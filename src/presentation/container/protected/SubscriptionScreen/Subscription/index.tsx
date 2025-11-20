import React, { useEffect, useState } from 'react';

import { connect, useSelector } from 'react-redux';
import { styles } from './styles';
import MainPageHeader from '../../../../components/MainPageHeader';
import { SubscriptionComponent } from '../../../../components/Subscription';
import { useSubscription } from '../../../../../service/redux/ducks/subscription';
import TitleRefont from '../../../../components/TitleRefont';
import Loader from '../../../../components/Loader';
import * as stringsEn from '../../../../../data/constants/strings_en';
import * as stringsFr from '../../../../../data/constants/strings';
import { useLang } from '../../../../../data/translation';
export const Subcription = (props: any) => {
  const { route } = props;
  const isCredit = route?.params?.isCredit;
  const [refreshing, setRefreshing] = useState(false);
  const [isNotAvailable, setIsNotAvailable] = useState(false);
  const [data, setData] = useState();
  const { getAllSubscriptionByRole } = useSubscription();
  const { accessToken } = useSelector(({ auth }) => auth);
  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;
  const getSubscriptions = async () => {
    setRefreshing(true);
    const response = await getAllSubscriptionByRole(accessToken);
    setData(response);
    setRefreshing(false);
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <div style={styles.containers}>
      {!refreshing && (
        <TitleRefont
          title={
            isCredit
              ? activeString.SUBSCRIPTION.LIST_OF_PACKS
              : activeString.SUBSCRIPTION.LIST_OF_SUBSCRIPTIONS
          }
        />
      )}
      {refreshing ? (
        <Loader />
      ) : (
        <div
          style={{
            margin: 40,
            borderWidth: 1,
            borderColor: 'rgba(207, 231, 255, 0.8)',
            borderRadius: 10,
          }}
        >
          <div
            data={data}
            renderItem={({ item }) => <SubscriptionComponent item={item} />}
            keyExtractor={(item) => item.id}
          />
        </div>
      )}
    </div>
  );
};

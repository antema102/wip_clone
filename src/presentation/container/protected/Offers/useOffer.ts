import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useOfferr } from '../../../services/redux/ducks/offer';

export function useOffre(props: any) {
  const [refreshing, setRefreshing] = useState(false);

  const [allJob, setAllJob] = useState([]);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {});

  const { allOfferJob } = useOfferr();
  useFocusEffect(
    React.useCallback(() => {
      getAllOfferJob();
    }, [])
  );
  useFocusEffect(
    React.useCallback(() => {
      getToken();
    }, [])
  );

  const getToken = async () => {
    await AsyncStorage.getItem('accessToken').then((response: any) => {
      setToken(response);
    });
  };

  const getAllOfferJob = () => {
    allOfferJob(token)
      .then((response: any) => {
        const { items } = response.data;
        const itemsType = items.map((x) => {
          return { id: x.type.id, name: x.type.name };
        });
        const itemsFiltered = itemsType.filter((x) => x.id !== undefined);
        const key = 'id';
        const arrayUniqueByKey = [
          ...new Map(itemsFiltered.map((item) => [item[key], item])).values(),
        ];
        setAllJob(arrayUniqueByKey);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    init();
    setRefreshing(false);
  }, []);

  const init = () => {
    setRefreshing(true);
  };

  const f1 = () => {
  };

  return {
    refreshing,
    allJob,
    isLoading,
    init,
    f1};
}

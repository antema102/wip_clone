import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useOfferr } from '../../../service/redux/ducks/offer';


export const useHomeCompany = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingJob, setIsLoadingJob] = useState(true);
  const [allJob, setAllJob] = useState([]);
  const [allHistory, setAllHistory] = useState('');
  const { allOfferJobByEnt } = useOfferr();
  const { history } = useOfferr();
  const {
    user,
    accessToken
  } = useSelector(({ auth }) => auth);
    useEffect(() => {
      getAllOfferJob()
    }, [])

  const getAllOfferJob = () => {
    allOfferJobByEnt(accessToken, user?.id).then((response: any) => { 
      const { items } = response.data;
      setAllJob((items.length > 0)? items?.slice(0, 3) : items)
      setIsLoadingJob(false)
    }).catch((error) => {
      setIsLoadingJob(false)

    })

  }
    useEffect(() => {
      getAllHistory()
    }, [])
  const getAllHistory = () => {
    history(accessToken).then((response: any) => {
      const { items } = response.data;
      setAllHistory((items.length > 0) && items)
      setIsLoading(false)
    }).catch((error) => {
      setIsLoading(false)
    })
  }
  return {
    allHistory,
    allJob,
    isLoading,
    isLoadingJob
  };
};

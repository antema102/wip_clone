import React,{useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import { useOfferr } from '../../../../../service/redux/ducks/offer';

export const useOfferList = idType => {
  const [allJob, setAllJob] = useState([]);
  const [lastJobs, setLastJobs] = useState([]);
  const [id, setId] = useState(idType);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [jobList, setJobList] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const {allOfferJobByType, allOfferJob} = useOfferr();

  
    useEffect(() => {
      getAllOfferJob(id);
    }, [id]);

  useEffect(() => {
      getToken();
    }, []);

  const getToken = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if(token) setToken(token)
    } catch (error) {
    }
  };

  const getResult = res => {
    const itemsType = res.map(x => {
      return {id: x.type.id, name: x.type.name};
    });
    itemsType.push({id: 'final', name: 'Toutes'});
    const itemsFiltered = itemsType.filter(x => x.id !== undefined);
    const key = 'id';
    const arrayUniqueByKey = [
      ...new Map(itemsFiltered.map(item => [item[key], item])).values(),
    ];
    const lastOffer = res.length > 3 ? res.slice(0, 2) : res;
    setLastJobs(lastOffer);
    setAllJob(res);
    setJobList(arrayUniqueByKey);
    setIsLoading(false);
    const total = arrayUniqueByKey.length;
    const totalR = total - 1;
    setTotalValue(totalR);
  };

  const getAllOfferJob = async id => {
    setIsLoading(true);
    if (id !== 'final') {
      try {
        const res = await allOfferJobByType(token, id);
        const {items} = res.data;
        getResult(items);
      } catch {
        setIsLoading(false);
      }
    } else {
      try {
        const res = await allOfferJob(token);
        const {items} = res.data;
        getResult(items);
      } catch {
        setIsLoading(false);
      }
    }
  };

  return {
    lastJobs,
    allJob,
    getAllOfferJob,
    isLoading,
    jobList,
    totalValue};
};

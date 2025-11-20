import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFavorites } from '../../../../../service/redux/ducks/favorites';

export const useFavoris = () => {
  const { allFavorites, addFavorite, deleteFavoris } = useFavorites();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allFavoris, setAllFavoris] = useState([]);
  const [dateFav, setDateFav] = useState('');


    React.useEffect(() => {
      getAllFavorites()
    }, []);

  const {
    user,
  } = useSelector(({ auth }) => auth);

  useEffect(() => {
    init();
    setRefreshing(false);
  }, []);

  const init = () => {
    setRefreshing(true);
  };
  const getAllFavorites = async () => {
    try {
      const response = await allFavorites(user?.accessToken)
      if (!response?.isError) {
        const response = await allFavorites(user?.accessToken)
        const { items } = response.data
        setDateFav(items[0]["createdAt"] || '')
        setAllFavoris(items[0]["job"] || [])
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAllFavoris([])
    }
  }
  
  const addFavoris = async (offerId) => {
    setIsLoading(false);
    try {
      const response = await addFavorite(user?.accessToken, offerId)
      if (!response?.isError) {
        await getAllFavorites()
      }
    } catch (error) {
      setAllFavoris([])
    }
  }

  
  const removeFavoris = async (offerId) => {
    setIsLoading(false);
    try {
      const response = await deleteFavoris(user?.accessToken, offerId)

      if (!response?.isError) {
        await getAllFavorites()
      }
    } catch (error) {
      setAllFavoris([])
    }
  }

  return {
    refreshing,
    isLoading,
    allFavoris,
    addFavoris,
    init,
    dateFav,
    removeFavoris
  };
}

import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { NewsService } from '../../../../../service/applicatif/News.sa';


const useNews = (category: string) => {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const { allNews } = NewsService();
  const { accessToken} = useSelector(({ auth }:any) => auth);

  useEffect(() => {
    getNewsList(category);
  }, [category]);

  const getNewsList = async (category: string) => {
    setIsLoading(true)
    const res: any = await allNews(accessToken, category)
    if (!res.isError){
      setNewsList(res.data.items)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  };

  return {
    newsList,
    isLoading};
};

export default useNews;

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


export function useResult(matching: any) {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resultMatching, setResultMatching] = useState([]);

  useEffect(() => {
    init();
    setRefreshing(false);
  }, []);

  const init = () => {
    setRefreshing(true);
  };

  // const { matching } = useSelector(({ matching }) => matching);

  useEffect(() => {
    if (typeof matching !== "undefined" && matching?.data) { 
      setResultMatching(matching.data.filter(x=>x.score>9));
    }
    setIsLoading(false)
  }, [matching]);
  
  return {
    refreshing,
    resultMatching,
    isLoading,
    init,
  }
}

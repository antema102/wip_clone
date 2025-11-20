import {useEffect, useState} from 'react';

export function useHome(props: any) {
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    init();
    setRefreshing(false);
  }, []);

  const init = () => {
    setRefreshing(true);
  };

  return {
    refreshing,
    init,
  };
}

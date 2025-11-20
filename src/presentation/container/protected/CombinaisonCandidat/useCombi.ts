import {useEffect, useState} from 'react';

export function useCombi(props: any) {
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    init();
    setRefreshing(false);
  }, []);

  const init = () => {
    setRefreshing(true);
  };

  const f1 = () => {};

  return {
    refreshing,
    init,
    f1,
  };
}

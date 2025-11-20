import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MobileActionType } from '../redux/ducks/mobile';

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobileStatus = width <= 991;
      setIsMobile(mobileStatus);
      dispatch({ type: MobileActionType.setMobile, payload: mobileStatus });
      setLoading(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  return { isMobile, loading };
};

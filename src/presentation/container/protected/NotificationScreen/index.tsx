import React from 'react';
;
import Container from '../../../components/Container';
import { useLocation } from 'react-router-dom';
import { Notification } from './Notification';

const NotificationScreen = (): any => {
  const { state } = useLocation();
  return <Notification stateValue={state} />;
};

export default NotificationScreen;

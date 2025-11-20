import React from 'react';
import Container from '../../../components/Container';
import { useLocation } from 'react-router-dom';
import { Subcription } from './Subscription';
const SubscriptionScreen = (): any => {
  const { state } = useLocation();
  return <Subcription stateValue={state} />;
};

export default SubscriptionScreen;

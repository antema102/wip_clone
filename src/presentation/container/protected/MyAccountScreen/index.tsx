import React from 'react';
import { View } from 'react-native';
import Container from '../../../components/Container';
import { useLocation } from 'react-router-dom';
import { MyAccount } from './MyAccount';

const MyAccountScreen = (): any => {
  const { state } = useLocation();
  return <MyAccount stateValue={state} />;
};

export default MyAccountScreen;

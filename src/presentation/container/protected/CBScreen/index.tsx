import React from 'react';
import { View } from 'react-native';
import Container from '../../../components/Container';
import { useLocation } from 'react-router-dom';
import { CB } from './CB';

const CBScreen = (): any => {
  const { state } = useLocation();
  return <CB stateValue={state} />;
};

export default CBScreen;

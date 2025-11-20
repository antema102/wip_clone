import React from 'react';
import EnterpriseOfferDetails from './EnterpriseOfferDetails';
import { useLocation } from 'react-router-dom';

const EnterpriseOfferDetailsScreen = (): any => {
  const { state } = useLocation();
  return <EnterpriseOfferDetails stateValue={state} />;
};

export default EnterpriseOfferDetailsScreen;

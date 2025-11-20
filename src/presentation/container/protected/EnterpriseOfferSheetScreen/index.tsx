import React from 'react';
import EnterpriseOfferSheet from './EnterpriseOfferSheet';
import { useLocation } from 'react-router-dom';

const EnterpriseOfferSheetScreen = (): any => {
  const { state } = useLocation();
  return <EnterpriseOfferSheet stateValue={state} />;
};
export default EnterpriseOfferSheetScreen;

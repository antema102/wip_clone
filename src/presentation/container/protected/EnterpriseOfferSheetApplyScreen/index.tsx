import React from 'react';
import { useLocation } from 'react-router-dom';
import EnterpriseOfferSheetApply from './EnterpriseOfferSheetApply';

const EnterpriseOfferSheetApplyScreen = (): any => {
    const { state } = useLocation();
    return <EnterpriseOfferSheetApply id={state} />;
}
export default EnterpriseOfferSheetApplyScreen;


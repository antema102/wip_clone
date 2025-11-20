import React from 'react'
import EntrepriseOfferCreate from './EntrepriseOfferCreate';
import { useLocation } from 'react-router-dom';

const EnterpriseOfferCreateScreen = (): any => {
    const {state} = useLocation();
return <EntrepriseOfferCreate {...state} />;
};

export default EnterpriseOfferCreateScreen
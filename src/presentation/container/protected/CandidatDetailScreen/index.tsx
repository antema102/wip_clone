import React from 'react';
;
import Container from '../../../components/Container';
import { useLocation } from 'react-router-dom';
import CandidatDetail from './CandidatDetail';

const CandidatDetailScreen = (): any => {
  const { state } = useLocation();
  return <CandidatDetail stateValue={state} />
};

export default CandidatDetailScreen;


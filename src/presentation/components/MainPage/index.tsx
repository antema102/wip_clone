import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import HomeCandidat from '../HomeCandidat';
import HomeEntreprise from '../HomeEntreprise';
import 'primeicons/primeicons.css';
import './styles.css';
import CombinaisonCandidatScreen from '../../container/protected/CombinaisonCandidat';

const MainPage = (): any => {
  const { user } = useSelector(({ auth }: any) => auth);
  return (
    <Fragment>
      {user?.role === 'candidate' ? <CombinaisonCandidatScreen /> : <HomeEntreprise />}
    </Fragment>

  );
};

export default MainPage;

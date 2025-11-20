import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Container from '../components/Container';

interface ProtectType {
  isSignedIn: boolean;
  children: ReactNode;
}

const Protected = ({ isSignedIn, children }: ProtectType): any => {
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Container MainContent={children} />;
};

export default Protected;

import React from 'react';
import { View } from 'react-native';
import Container from '../../../components/Container';
import { useLocation } from 'react-router-dom';
import { FindTalentList } from './FindTalentList';

const MatchingEnterpriseList = (): any => {
  const { state } = useLocation();
  const { dataList, matching, response } = state;
  return <FindTalentList matching={matching} dataList={dataList} response={response} />
};

export default MatchingEnterpriseList;


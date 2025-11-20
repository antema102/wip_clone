import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../resources/constants';
import styles from './styles';
import { useMobile } from '../../../service/hooks/useMobile';

interface Props {
  listJobs?: string[];
  navigateCombinaisonCandidat?: any
  navigateItemByCategory?: any
  countFormations?: number
}

const DynamicBox = ({ listJobs, navigateCombinaisonCandidat, navigateItemByCategory, countFormations }: Props) => {
  const { isMobile } = useMobile()
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        justifyContent: listJobs?.length === 2 ? 'flex-start' : 'space-between',
        overflow: 'hidden',
        backgroundColor: COLORS.white,
      }}>
      <>
        {listJobs &&
          listJobs?.map((item, index) => (
            <TouchableOpacity
              onPress={() => navigateCombinaisonCandidat(item, index)}
              style={[styles.tagNavContainer, isMobile ? { width: '45%' } : { width: '30%' },
              listJobs?.length === 2 && !isMobile ? { marginLeft: 20 } : { marginLeft: 10 }]}
              key={index}>
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          ))}
        {countFormations && (
          <TouchableOpacity
            onPress={navigateItemByCategory}
            style={[styles.tagNavContainer, isMobile ? { width: '45%' } : { width: '30%' }]}
            key={listJobs && listJobs?.length + 1 || 1}>
            <Text style={styles.text}>Formation, Stage, Alternance</Text>
          </TouchableOpacity>
        )}
      </>
    </View>
  );
};

export default DynamicBox;
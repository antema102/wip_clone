import React, { useState, useEffect } from 'react';
import { COLORS } from '../../../resources/constants';
import styles from './styles';
import { useMobile } from '../../../service/hooks/useMobile';
interface Props {
  listJobs?: string[];
  navigateCombinaisonCandidat?: any;
  navigateItemByCategory?: any;
  countFormations?: number;
}

const DynamicBox = ({
  listJobs,
  navigateCombinaisonCandidat,
  navigateItemByCategory,
  countFormations,
}: Props) => {
  const { isMobile } = useMobile();
  return (
    <div
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        justifyContent: listJobs?.length === 2 ? 'flex-start' : 'space-between',
        overflow: 'hidden',
        backgroundColor: COLORS.white,
      }}
    >
      <>
        {listJobs != null &&
          listJobs?.map((item, index) => (
            <button
              onClick={() => navigateCombinaisonCandidat(item, index)}
              style={{
                ...styles.tagNavContainer,
                ...(isMobile ? { width: '45%' } : { width: '30%' }),
                ...(listJobs?.length === 2 && !isMobile
                  ? { marginLeft: 20 }
                  : { marginLeft: 10 }),
              }}
              key={index}
            >
              <span style={styles.text}>{item}</span>
            </button>
          ))}
        {countFormations && (
          <button
            onClick={navigateItemByCategory}
            style={{
              ...styles.tagNavContainer,
              ...(isMobile ? { width: '45%' } : { width: '30%' }),
            }}
            key={(listJobs != null && listJobs?.length + 1) || 1}
          >
            <span style={styles.text}>Formation, Stage, Alternance</span>
          </button>
        )}
      </>
    </div>
  );
};

export default DynamicBox;

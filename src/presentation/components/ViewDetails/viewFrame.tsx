import React from 'react';
import ViewDeatails from './viewDetails';
import { COLORS } from '../../../resources/constants';
import { viewStyles } from './style';
interface Props {
  data: any;
}

const ViewFrame = ({ data }: Props) => {
  const tab = [
    'lieu',
    'contrat',
    'experience',
    'disponibility',
    'profil',
    'salaire',
  ];
  return (
    <div
      style={{
        backgroundColor: COLORS.blue_back,
        paddingBottom: 10,
        borderRadius: 10,
      }}
    >
      <div style={viewStyles.candidateAboutContainer}>
        {Object.entries(data).map((value, index) => {
          return tab.includes(value[0]) ? (
            <div style={viewStyles.candidateAboutItem}>
              <ViewDeatails label={value[0]} value={value[1]} />
            </div>
          ) : (
            <div />
          );
        })}
      </div>
    </div>
  );
};

export default ViewFrame;

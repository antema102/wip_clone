import React from 'react';
;
import { styles } from './styles';
import { dateToString } from '../../../data/factory/dateFactory';

interface HistoryType {
  item: {
    id: string,
    arrondissement: string,
    ville: string,
    region: string,
    desiredPost: { [key: string]: string },
    activitySector: { [key: string]: string },
    createdAt: Date,
    lastjobType: { [key: string]: string },
    filiere: { [key: string]: string }},
  displayHistoryDetail: (id: string) => void}

export const History = (props: HistoryType) => {
  const { item, displayHistoryDetail } = props;
  const {
    arrondissement,
    ville,
    region,
    desiredPost,
    activitySector,
    createdAt,
    lastjobType,
    filiere} = item;

  const getValue = (value: string) => Object.keys(value).length !== 0 && region;

  const getActivitySector = (value: string) => {
    switch (value) {
      case 'agrifood':
        return 'Agroalimentaire';
      case 'chemistry':
        return 'Chimie / Parachimie';
      case 'machinery':
        return 'Machines et équipements / Automobile';
      case 'clothing':
        return 'Textile / Habillement / Chaussure';
      case 'construction':
        return 'BTP / Matériaux de construction';
      case 'trade':
        return 'Commerce / Négoce';
      case 'electronics':
        return 'Électronique / Électricité';
      case 'it':
        return 'Informatique / Télécoms';
      case 'hotels':
        return 'Tourisme / Hôtellerie';
      case 'communication':
        return 'Édition / Communication / Multimédia';
      default:
        return value;
    }
  };

  const date = dateToString(createdAt);

  return (
    <button
      style={styles.candidateContainer}
      onClick={() => {
        displayHistoryDetail(item.id);
      }}>
      <div style={styles.candidateDetailsContainer}>
        {/** A propos du candidat */}
        <span style={styles.candidatName}>{date}</span>
        <span style={styles.candidatPost}>
          {[
            activitySector?.value && activitySector?.value !== 'string'
              ? getActivitySector(activitySector.value)
              : '',
            desiredPost?.value && desiredPost?.value !== 'string'
              ? desiredPost.value
              : '',
            lastjobType?.value && lastjobType?.value !== 'string'
              ? lastjobType.value
              : '',
            filiere?.value && filiere?.value !== 'string' ? filiere.value : '',
          ]
            .filter(Boolean)
            .join(' , ')}
        </span>
        <span style={styles.historyplace}>
          {getValue(region)} {getValue(ville)} {getValue(arrondissement)}{' '}
        </span>
      </div>
    </button>
  );
};

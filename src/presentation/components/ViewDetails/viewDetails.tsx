import React from 'react';
import { images } from '../../../resources/constants';
import { viewStyles } from './style';
interface Props {
  label: string;
  value: string;
}

const getLabel = (label, value) => {
  switch (label) {
    case 'experience':
      if (parseInt(value) > 1) return `${label}s`;
      else return label;
    case 'disponibility':
      return 'travail';
    default:
      return label;
  }
};

const ViewDetails = ({ label, value }: Props) => {
  return (
    <div style={[viewStyles.container]}>
      <div style={viewStyles.viewBlue}>
        <img src={images.pointBlue} style={viewStyles.pointBlue} />
      </div>
      <div style={viewStyles.viewText}>
        <span style={viewStyles.label}>{getLabel(label, value)} :</span>
        <span style={viewStyles.value}>{value}</span>
      </div>
    </div>
  );
};

export default ViewDetails;

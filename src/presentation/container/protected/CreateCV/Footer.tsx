import React from 'react';
import {buttonsStyles} from '../../boutonStyle';
import Label from '../../components/Inputs/Label';
import {formsStyles} from '../../formStyles';

export const Footer = (props: any) => {
  const {creerCompte} = props;
  return (
    <div>
      <div>
        <div style={{...buttonsStyles.displaySpacedBtween}}>
          <Label title="Pas encore inscrit ? " type="paragraph" />
          <div style={formsStyles.line} />
        </div>

        <div style={{...buttonsStyles.displayHorizontal}}>
          <button onClick={creerCompte}>
            <Label title="Job ->" type="linkblue" />
          </button>
        </div>
      </div>
    </div>
  );
};

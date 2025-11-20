import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { buttonsStyles } from '../../Button/style';
import globalStyle from '../../../globalStyle/globalStyle';

export const WhiteButtons = (props: any) => {
  const {submitAction, submitTitle} = props;
  return (
    <Button
      onClick={submitAction}
      styleBtnTxt={buttonsStyles.btnValiderWhite}
      styleBtnOuter={[
        buttonsStyles.btnValiderOuterWhite,
      ]}
      title={submitTitle}
      type="valider"
    />
  );
};

WhiteButtons.propTypes = {
  submitAction: PropTypes.func,
  submitTitle: PropTypes.string};

WhiteButtons.defaultProps = {
  submitTitle: 'Valider'};

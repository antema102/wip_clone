import React from 'react';
import PropTypes from 'prop-types';
import { formsStyles } from '../../../globalStyle/formStyles';
import { COLORS } from '../../../../resources/constants';
export const TitleLabel = (props: any) => {
  const { label, required } = props;
  return (
    <div>
      {label && (
        <span style={[formsStyles.labelStyle]}>
          {label} {required && <span style={{ color: COLORS.orange }}>*</span>}
        </span>
      )}
    </div>
  );
};

TitleLabel.prototype = {
  label: PropTypes.string,
  required: PropTypes.bool,
};
TitleLabel.defaultProps = {
  label: '',
  required: false,
};

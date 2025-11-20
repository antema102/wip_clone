import React from 'react';
import { formsStyles } from '../../../formStyles';
import PropTypes from 'prop-types';
export const TitleLabel = (props: any) => {
  const { label, required } = props;
  return (
    <div>
      {label && (
        <span style={[formsStyles.labelStyle]}>
          {label} {required && <span>*</span>}
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

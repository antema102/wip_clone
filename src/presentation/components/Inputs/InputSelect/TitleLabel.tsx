import React from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import { formsStyles } from '../../../globalStyle/formStyles';
import { COLORS } from '../../../../resources/constants';
export const TitleLabel = (props: any) => {
  const {label, required} = props;
  return (
    <View>
      {label && (
        <Text style={[formsStyles.labelStyle]}>
          {label} {required && <Text style={{color:COLORS.orange}}>*</Text>}
        </Text>
      )}
    </View>
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

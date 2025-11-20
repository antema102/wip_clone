import PropTypes from 'prop-types';
import React, { useState } from 'react';

interface Props {
  value?: any;
  required?: boolean;
  label?: string;
  error?: any;
  name?: any;
  showError?: boolean;
  onChange?: any;
  isEditable?: boolean;
  type?: any;
  todayDate?: any;
}
export const InputDatePicker = ({
  value,
  required,
  label,
  error,
  name,
  showError,
  onChange,
  isEditable,
  type,
  todayDate,
}: Props) => {
  return <div></div>;
};

InputDatePicker.propTypes = {
  value: PropTypes.any,
  required: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.string,
  showError: PropTypes.bool,
  isEditable: PropTypes.bool,
  type: PropTypes.string,
  todayDate: PropTypes.bool,
};
InputDatePicker.defaultProps = {
  value: new Date(),
  required: false,
  label: '',
  name: '',
  error: '',
  showError: false,
  isEditable: true,
  type: 'date',
  todayDate: false,
};

import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import DateInput from './DateInput';
import {DateToddmmyyyyFormat, DateToHHmmFormat} from '../../../../data/factory';
import {TitleLabel} from '../InputField/TitleLabel';
import { formsStyles } from '../../../globalStyle/formStyles';
import  styles  from '../style';

interface Props {
  value?: any;
  required?: boolean;
  label?: string;
  error?: any;
  name?: any;
  showError?: boolean;
  onChange?: any;
  isEditable?: boolean;
  todayDate?: boolean;
  type?: any;
  dateMin?: any;
  dateMax?: any;
  // minAge?: number;
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
  todayDate,
  type,
  dateMin,
  dateMax,
}: 
Props) => {
  const _date = value ? value : new Date();
  const _dateOk = typeof _date === 'string' ? new Date(_date) : _date;
  const [date, setDate] = useState(_dateOk);
  const [mode, setMode] = useState(type);
  const [show, setShow] = useState(false);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const futurDate = new Date();
  futurDate.setFullYear(futurDate.getFullYear() + 1);

  yesterday.setDate(yesterday.getDate());
  const showMode = (currentMode: any) => {
    setMode(currentMode);
  };

  const handleChange = (event: any, selectedDate: any) => {
    setShow(false);
    const currentDate = selectedDate || date;
    if (mode === 'time') {
      currentDate.setDate(currentDate.getDate() - 1);
    }
    setDate(currentDate);
    onChange(name, currentDate, true);
  };

  const showDatepicker = () => {
    !isEditable ? setShow(false) : setShow(true);
    // setIsDefault(false);
  };

  const showTimepicker = () => {
    setShow(true);
    // setIsDefault(false);
  };

  return (
    <View style={styles.container}>
      <TitleLabel label={label} required={required} />
      <DateInput
        type={mode}
        onPress={showDatepicker}
        value={value}
        showError={showError}
        todayDate={todayDate}
        isEditable={!isEditable}
        error={error}
        title={
          value === '' || value === null || value === undefined
            ? 'jj/mm/aaaa'
            : mode === 'date'
            ? DateToddmmyyyyFormat(date)
            : DateToHHmmFormat(date)
        }
        
      />

      {show && (
        <DateTimePicker
          style={formsStyles.itemInputStyle}
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          display="default"
          maximumDate={dateMax ? dateMax : todayDate ? futurDate : yesterday}
          minimumDate={dateMin && dateMin}
          onChange={handleChange}
          mode={mode}
        />
      )}
      {required && showError && error !== '' && (
        <Text style={styles.textError}>{error}</Text>
      )}
    </View>
  );
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
  todayDate: PropTypes.bool,
  type: PropTypes.string,
};

InputDatePicker.defaultProps = {
  value: new Date(),
  required: false,
  label: '',
  name: '',
  error: '',
  showError: false,
  isEditable: true,
  todayDate: false,
  type: 'date',
};

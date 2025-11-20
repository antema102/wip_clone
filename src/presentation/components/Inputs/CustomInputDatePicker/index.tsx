import PropTypes from 'prop-types';
import React, { useState } from 'react';
;
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fr from "date-fns/locale/fr";
import { TitleLabel } from '../InputField/TitleLabel';
import styles from '../style';
import './dateStyle.css';
import { parseISO, format } from 'date-fns'; // Import parseISO and format from date-fns
registerLocale("fr", fr);

interface Props {
  value?: string; // Change the type of value to string, assuming it's a date string
  required?: boolean;
  label?: string;
  error?: string; // Change the type of error to string
  name?: string; // Change the type of name to string
  showError?: boolean;
  onChange?: (name: string, date: string) => void; // Specify the type of onChange
  isEditable?: boolean;
  todayDate?: boolean;
  type?: string; // Change the type of type to string
  dateMin?: string | null; // Change the type of dateMin to string or null
  dateMax?: string | null; // Change the type of dateMax to string or null
}

export const CustomInputDatePicker = {
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
  dateMax}: Props) => {
  // Parse the value prop to ensure it's a valid Date object or null
  const _date = value ? parseISO(value) : null;

  const [date, setDate] = useState<Date | null>(_date);
  const [mode, setMode] = useState<string>(type);
  const [show, setShow] = useState<boolean>(false);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const futurDate = new Date();
  futurDate.setFullYear(futurDate.getFullYear() + 1);

  yesterday.setDate(yesterday.getDate());

  const showMode = (currentMode: string) => {
    setMode(currentMode);
  };

  const handleChange = (selectedDate: Date | null) => {
    setShow(false);

    if (selectedDate !== null) {
      // Format the selectedDate to a string before passing it to onChange
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      onChange(name, formattedDate);
    }

    setDate(selectedDate);
  };

  const showDatepicker = () => {
    if (!isEditable) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <div style={styles.container}>
      <TitleLabel label={label} required={required} />
      <div style={{ paddingVertical: 10 }}>
        <DatePicker
          selected={date}
          onChange={(e) => handleChange(e)}
          dateFormat="dd/MM/yyyy"
          display="default"
          readOnly={!isEditable}
          maxDate={dateMax ? parseISO(dateMax) : todayDate ? futurDate : yesterday}
          minDate={dateMin ? parseISO(dateMin) : null}
          locale="fr"
          portalId="root-portal"
        />
      </div>
      {required && showError && error !== '' && (
        <span style={styles.textError}>{error}</span>
      )}
    </div>
  );
};

CustomInputDatePicker.propTypes = {
  value: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string,
  showError: PropTypes.bool,
  onChange: PropTypes.func,
  isEditable: PropTypes.bool,
  todayDate: PropTypes.bool,
  type: PropTypes.string,
  dateMin: PropTypes.string,
  dateMax: PropTypes.string};

CustomInputDatePicker.defaultProps = {
  value: '', // Default value as an empty string
  required: false,
  label: '',
  error: '',
  name: '',
  showError: false,
  isEditable: true,
  todayDate: false,
  type: 'date',
  dateMin: null, // Default dateMin as null
  dateMax: null, // Default dateMax as null
};
